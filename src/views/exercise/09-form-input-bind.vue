<template>
  <accordion-hull header="表单输入绑定">
    <accordion-item caption="使用v-model" show>
      <ul>
        <li>
          <span>
            v-model默认忽略所有表单元素的 value、checked、selected attribute
            的初始值
          </span>
          <span> 注意，&lt;input v-model="searchText" /&gt;等价于 </span>
          <span>
            &lt;input :value="searchText" @input="searchText =
            $event.target.value" /&gt;
          </span>
        </li>
        <li>
          <span>input text 使用v-mode:</span>
          <input type="text" v-model="inputText" />{{ inputText }}
          <span>如果value属性同时设置，将引发异常</span>
        </li>
        <li>
          <span>textarea使用v-model:</span>
          <textarea v-model="textareaText">内嵌内容被忽略</textarea
          >{{ textareaText }}
        </li>
        <li>
          <span>input checkbox使用v-model:</span>
          <input type="checkbox" v-model="chxChecked" checked />{{ chxChecked }}
          <span>预设的checked被忽略</span>
        </li>
        <li>
          <span>多个复选框，绑定到同一数组</span>
          <div>
            <span
              >Tom <input type="checkbox" value="Tom" v-model="chxValues"
            /></span>
            <span
              >123<input type="checkbox" value="123" v-model="chxValues"
            /></span>
            <span
              >now<input type="checkbox" :value="now" v-model="chxValues"
            /></span>
            <span
              >complex object<input
                type="checkbox"
                :value="complexObj"
                v-model="chxValues"
            /></span>
            <span
              >Jane<input type="checkbox" value="Jane" v-model="chxValues"
            /></span>
            <span>result:{{ chxValues }}</span>
          </div>
        </li>
        <li>
          <span>单个 input radio使用v-model：</span>
          <input type="radio" v-model="radioChecked" checked />{{
            radioChecked
          }}
          <span>预设的checked生效，初始选中,且无法切换</span>
        </li>
        <li>
          <span>多个单选框组成的单选框组，绑定到一个属性</span>
          <div>
            <span
              >Tom <input type="radio" value="Tom" v-model="radioGroupValue"
            /></span>
            <span
              >123<input type="radio" value="123" v-model="radioGroupValue"
            /></span>
            <span
              >now<input type="radio" :value="now" v-model="radioGroupValue"
            /></span>
            <span
              >complex object<input
                type="radio"
                :value="complexObj"
                v-model="radioGroupValue"
            /></span>
            <span
              >Jane<input type="radio" value="Jane" v-model="radioGroupValue"
            /></span>
            <span>result:{{ radioGroupValue }}</span>
          </div>
        </li>
        <li>
          <span>select 使用v-model</span>
          <input type="button" value="切換单选多选" @click="singleOrMultip" />
          <select v-model="selectedStus" :multiple="multip">
            <option disabled value="" selected>
              please select one student
            </option>
            <option v-for="stu in students" :key="stu.name" :value="stu">
              {{ stu.name }}
            </option>
          </select>
          <span>result:</span>
          <span>{{ selectedStus }}</span>
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="值绑定">
      <ul>
        <li>
          <span>
            默认状态下,对于单选按钮，复选框及选择框的选项， v-model
            绑定的值通常是静态字符串 (对于复选框也可以是布尔值)：
          </span>
        </li>
        <li>
          <span
            >复选框,需要预先设置好v-model对应的属性的类型，与tru-value
            false-value呼应</span
          >
          <!--这个位置报错.但官方文档就这么写的,暂时注释掉
          <input
            type="checkbox"
            v-model="toggle"
            true-value="yes"
            false-value="no"
          />
          <span>result : {{ toggle }}</span> -->
        </li>
        <li>
          <span>单选框,甚至可以绑定到对象</span>
          <input type="radio" v-model="pick" v-bind:value="guoshi" />
          <span>pick is {{ pick }}</span
          ><span>guoshi is {{ guoshi }}</span>
          <span>pick === guoshi :{{ pick === guoshi }}</span>
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="修饰符">
      <ul>
        <li>
          <span>
            v-model同步数据使用的事件默认时input，添加.lazy修饰符，可转为change事件
          </span>
          <input v-model.lazy="inputText" />
          <span>result:{{ inputText }}</span>
        </li>
        <li>
          <span>
            .number修饰符，用于type='text'的input。尽量转换为数字，转换失败则保留原版字串
          </span>
          <input v-model.number="inputText" type="text" />
          <span>result:{{ inputText }}</span>
        </li>
        <li>
          <span>
            如果是type='number'的input,则无需.number修饰符,效果在上述基础上，转换失败则
            绑定的inputText值为空
          </span>
          <input v-model="inputText" type="number" />
          <span>result:{{ inputText }}</span>
        </li>
      </ul>
    </accordion-item>
  </accordion-hull>
</template>

<script lang="ts">
/* eslint-disable no-dupe-class-members, no-dupe-keys */
//import { Options, Vue } from "vue-class-component";
import { defineComponent } from "vue";
//// import AccordionHull from "@/components/accordion/accordion-hull.vue"; // 子组件 @ is an alias to /src
// import AccordionItem from "@/components/accordion/accordion-item.vue";

type Scores = {
  chinese: number;
  music: number;
};
type Student = {
  name: string;
  scores: Scores;
};
interface Data {
  inputText: string;
  textareaText: string;
  chxChecked: boolean;
  radioChecked: boolean;
  radioGroupValue: null;
  multip: boolean;
  toggle: string;
  pick: object;
  guoshi: Student;
  chxValues: Array<object>;
  selectedStus: Array<Student>;
  students: Array<Student>;
  now: Date;
  complexObj: object;
}

export default defineComponent({
  data(): Data {
    return {
      inputText: "this is input text",
      textareaText: "this is a long long long content from textarea",
      chxChecked: false,
      radioChecked: false,
      selectedStus: [],
      chxValues: [],
      multip: false,
      toggle: "yes",
      pick: {},
      guoshi: {
        name: "bclz_gxy",
        scores: {
          chinese: 77,
          music: 88,
        },
      },
      radioGroupValue: null,
      students: [
        {
          name: "guoshi",
          scores: {
            chinese: 89,
            music: 92,
          },
        },
        {
          name: "niudun",
          scores: {
            chinese: 101,
            music: 83,
          },
        },
        {
          name: "aiyinsitan",
          scores: {
            chinese: 62,
            music: 81,
          },
        },
        {
          name: "bill gates",
          scores: {
            chinese: 98,
            music: 56,
          },
        },
      ],
      now: new Date(),
      complexObj: {
        a: "hello",
        b: { m: "qq", n: 98.4 },
      },
    };
  },
  methods: {
    singleOrMultip() {
      this.multip = !this.multip;
    },
  },
  components: {},
});
</script>
