<template>
  <accordion-hull header="组件基础(注:此处包含第11节的部分内容)">
    <accordion-item caption="导言：原生input的双向绑定问题">
      <ul>
        <li>
          <span>searchText的值跟踪：{{ searchText }}</span>
        </li>
        <li>
          <span>单纯的:value是非双向绑定的,仅仅是赋值而已</span>
          <input :value="searchText" type="text" />
        </li>
        <li>
          <span
            >添加@input事件后，可以实现双向绑定，注意event是原生而没有处理过的</span
          >
          <input
            :value="searchText"
            type="text"
            @input="searchText = ($event.target as HTMLInputElement)?.value"
          />
          <span>等价于，或者说使用v-model简化为：</span>
          <input v-model="searchText" type="text" />
        </li>
        <li>
          <span>或者，使用@change双向绑定,注意切换焦点后才双向绑定</span>
          <input
            :value="searchText"
            type="text"
            @change="searchText = ($event.target as HTMLInputElement)?.value"
          />
          <span>仿照上面，使用v-model.lazy简化为</span>
          <input v-model.lazy="searchText" type="text" />
        </li>
      </ul>
    </accordion-item>
    <accordion-item
      caption="不受原生的:value和v-model束缚，自定义组件的值属性为任意，例如florid"
    >
      <ul>
        <li>
          <span> searchText的值跟踪：{{ searchText }} </span>
        </li>
        <li>
          <span>单纯的:florid，类似于:value，不双向绑定</span>
          <custom-input :florid="searchText" />
        </li>
        <li>
          <span
            >添加组件定义的类似于input的事件@moving，实现即时双向绑定，但此时还无类似v-model的简写</span
          >
          <custom-input
            :florid="searchText"
            @moving="searchText = $event.target.value"
          />
        </li>
        <li>
          <span>
            使用类似于change的事件@moved,实现失焦后双向绑定,但由于事件名需要
            在消费端指定，故也不方便指定类似v-model.lazy的修饰符
          </span>
          <custom-input
            :florid="searchText"
            @moved="searchText = $event.target.value"
          />
        </li>
      </ul>
    </accordion-item>
    <accordion-item
      caption="为了享受v-model的缩写福利，组件的值属性采用约定modelValue,这是custom-input-std"
    >
      <ul>
        <li>
          <span> searchText的值跟踪：{{ searchText }} </span>
        </li>
        <li>
          <span>单纯采用 :modelValue形式，非双向绑定</span>
          <custom-input-std :modelValue="searchText" />
        </li>
        <li>
          <span>:modelValue结合@update:modelValue,实现双向绑定，</span>
          <custom-input-std
            :modelValue="searchText"
            @update:modelValue="searchText = $event"
          />
        </li>
        <li>
          <span>使用短横线分割，效果一样。后续略</span>
          <custom-input-std
            :model-value="searchText"
            @update:model-value="searchText = $event"
          />
        </li>
        <li>
          <span
            >使用v-model简化：条件是组件的update:model-value事件参数$event为value</span
          >
          <custom-input-std v-model="searchText" />
          <span>使用传统的.lazy修饰符</span>
          <custom-input-std
            v-model.lazy="searchText"
            description="测试lazy修饰符"
          />
        </li>
        <li>
          <span
            >根据下面的更改默认modelValue的方案，说明上面是这两个的简写</span
          >
          <custom-input-std
            v-model:modelValue="searchText"
            description="采用v-mode:modelValue='...'"
          />
          <custom-input-std
            v-model:model-value="searchText"
            description="采用v-mode:model-value='...'"
          />
        </li>
        <li>
          <span>对应的lazy形式</span>
          <custom-input-std
            v-model:modelValue.lazy="searchText"
            description="采用v-model:modelValue.lazy='...'"
          />
          <custom-input-std
            v-model:model-value.lazy="searchText"
            description="采用v-model:model-value.lazy='...'"
          />
        </li>
      </ul>
    </accordion-item>
    <accordion-item
      caption="享受v-model的福利的同时，又不想用默认的modelValue属性名"
    >
      <ul>
        <li>
          <span> searchText的值跟踪：{{ searchText }} </span>
        </li>
        <li>
          <custom-input-ex
            v-model:florid="searchText"
            description="改为v-model:florid后可实现双向绑定，
                           原因在于需要指名道姓组件内部使用的属性名"
          />
        </li>
        <li>
          <custom-input-ex
            v-model:florid.lazy="searchText"
            description="v-model:florid.lazy实现change版本"
          />
        </li>
      </ul>
    </accordion-item>

    <accordion-item caption="多个v-model绑定">
      <ul>
        <li>
          <span>fn监视：{{ fn }}</span>
          <span>ln监视：{{ ln }}</span>
          <span>searchText监视：{{ searchText }}</span>
        </li>
        <li>
          <custom-input-ex
            v-model:first-name="fn"
            v-model:last-name="ln"
            v-model:florid="searchText"
            description="三个v-model各管各的"
          />
        </li>
        <li>
          <custom-input-ex
            v-model:firstName.lazy="fn"
            v-model:lastName.lazy="ln"
            v-model:florid.lazy="searchText"
            description="lazy版本"
          />
        </li>
      </ul>
    </accordion-item>

    <accordion-item caption="动态切换鼠标事件">
      <ul>
        <li>
          <input
            type="button"
            @click="switchMouseEvent"
            value="switch mouse event"
          />
          <input
            v-on:[mouseEventName]="mouseHandle"
            type="button"
            value="event-test"
          />
        </li>
      </ul>
    </accordion-item>

    <accordion-item
      caption="动态组件，为今之计，只有把组件们可能用到的prop，全部提供。"
    >
      <ul>
        <li>
          <input type="button" value="switch" @click="switchComp" />
        </li>
        <li>
          <keep-alive>
            <component
              :is="myCompName"
              v-model="searchText"
              :todos="planes"
              msg="终于成功了"
            ></component>
          </keep-alive>
        </li>
      </ul>
    </accordion-item>
  </accordion-hull>
</template>

<script lang="ts">
/* eslint-disable no-dupe-class-members, no-dupe-keys */
import { defineComponent } from "vue";
import AccordionHull from "@/components/accordion/accordion-hull.vue"; // 子组件 @ is an alias to /src
import AccordionItem from "@/components/accordion/accordion-item.vue";
import CustomInput from "@/components/10-component-base/custom-input.vue";
import CustomInputStd from "@/components/10-component-base/custom-input-std.vue";
import CustomInputEx from "@/components/10-component-base/custom-input-ex.vue";
import Todos from "@/components/01-intro/1-todos.vue";
import HelloWorld from "@/components/HelloWorld.vue";

interface Data {
  searchText: string;
  desc: string;
  myCompName: string;
  compIdx: number;
  planes: Array<object>;
  fn: string;
  ln: string;
  mouseEventName: string;
}
export default defineComponent({
  data() {
    return {
      searchText: "初始文字",
      desc: "自定义组件的input框简述",
      myCompName: "custom-input",
      compIdx: 0,
      planes: [
        {
          id: 1,
          content: "Learn babel",
          done: true,
        },
        {
          id: 2,
          content: "learn webpack",
          done: false,
        },
        {
          id: 3,
          content: "build a project",
          done: false,
        },
      ],
      fn: "Galinue",
      ln: "Washington",
      mouseEventName: "mouseenter",
    } as Data;
  },
  // mounted (): void {
  // },
  methods: {
    switchComp() {
      if (++this.compIdx > 2) {
        this.compIdx = 0;
      }
      switch (this.compIdx) {
        case 0:
          this.myCompName = "custom-input";
          break;
        case 1:
          this.myCompName = "todos";
          break;
        case 2:
          this.myCompName = "hello-world";
          break;
        default:
          break;
      }
    },
    mouseHandle(evt: Event) {
      console.log("mouse event.....", evt);
    },
    switchMouseEvent() {
      this.mouseEventName =
        this.mouseEventName == "mouseenter" ? "mouseleave" : "mouseenter";
    },
  },
  components: {
    AccordionHull,
    AccordionItem,
    CustomInput,
    CustomInputStd,
    CustomInputEx,
    Todos,
    HelloWorld,
  },
});
</script>
