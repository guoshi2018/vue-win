<template>
  <accordion-hull header="插槽">
    <accordion-item caption="插槽的渲染作用域">
      <ul>
        <li>
          <span>
            父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。
          </span>
          <slot-example-one title="data one - title">
            <span>{{ data1.content }}</span>
            <span
              >title是子模板的prop，如在此访问，将得到undefined，而显示为空:&lt;{{
                title
              }}&gt;</span
            >
          </slot-example-one>
        </li>
        <li>
          <span>备用内容的展现</span>
          <slot-example-one title="data one - another title"></slot-example-one>
        </li>
        <li></li>
      </ul>
    </accordion-item>
    <accordion-item caption="具名插槽">
      <ul>
        <li>
          <span>
            对于具名插槽，提供内容需要使用template元素包裹即使只有一个元素，并以v-slot提供名称。
            特例：只有一个插槽（称独占插槽）时，可以使用其他标签，而不是template.例如accordion-item
          </span>
          <span>
            <slot-example-two>
              <template v-slot:header>
                <h2>header caption</h2>
              </template>
              <!--改成这样就会报错
              <h2 v-slot:header>header caption</h2>-->

              <template v-slot:footer>
                <span
                  >这是footer插槽的内容，虽然在此排列在default之前，实际渲染时仍然在底部</span
                >
              </template>
              <template v-slot:default>
                <p>A paragraph for the main content.</p>
                <p>And another one.</p>
              </template>
            </slot-example-two>
          </span>
        </li>
      </ul>
    </accordion-item>
    <accordion-item
      caption="将插槽内需要给父作用域引用的字段打包到对象，暴露给父级"
    >
      <dl>
        <dt>
          例如，对于循环展示的数组内容，插槽负责展示顺序，父级定制展示内容(这有点类似于策略模式).
          绑定在 &lt;slot&gt; 元素上的 attribute 被称为插槽
          prop。在父级通过自定义对象名引出.
        </dt>
        <dt>
          注意下面的outerProps.item的传递:
          父级data3==>子级todos==>子级通过&lt;slot :item="item"
          暴露给父级==>父级使用outerProps连同子级暴露的其余的字段:index,reserve打包,然后在父级使用
        </dt>
        <dd>
          <slot-example-three :todos="data3" v-slot:default="outerProps">
            <i>{{ outerProps.index }}</i>
            <ins>{{ outerProps.item }}</ins>
            <b>{{ outerProps.reserve }}</b>
          </slot-example-three>
        </dd>
      </dl>
    </accordion-item>
    <accordion-item caption="独占插槽">
      <dl>
        <dt>
          独占插槽，允许消费端将v-slot直接用在组件上，就像上面的slot-example-three.由于时默认插槽，
          故还可以再简单,如下：
        </dt>
        <dd>
          <slot-example-three :todos="data3" v-slot="outerProps">
            <span>{{ outerProps.item }}</span>
          </slot-example-three>
        </dd>
      </dl>
    </accordion-item>
    <accordion-item
      caption="对于多个插槽，各插槽暴露给消费端的字段包裹对象，必须各就各位"
      show
    >
      <dl>
        <dt>
          只要出现多个插槽，请始终为所有的插槽使用完整的基于 &lt;template
          v-slot:XXX &gt; 的语法：
        </dt>
        <dt>
          而如果需要操作子级数据,则在上述基础上,进一步变为: &lt;template
          v-slot:XXX=子级数据的打包对象 &gt;
        </dt>
        <dd>
          <slot-example-four>
            <template v-slot:default="defObj">
              hello,{{ defObj.mi }}...
            </template>
            <template v-slot:footer="footObj">
              {{ footObj.fi }},this is tail added.
            </template>
            <template v-slot:header="headObj">
              no more info,{{ headObj.hi }}
            </template>
          </slot-example-four>
        </dd>
        <dt>
          而且各slot内的包裹对象是隔离的，即不同slot甚至可以用同样的包裹对象名
        </dt>
        <dd>
          <slot-example-four>
            <template v-slot:default="obj">
              {{ obj.mi }}
            </template>
            <template v-slot:footer="obj">
              {{ obj.fi }}
            </template>
            <template v-slot:header="obj">
              {{ obj.hi }}
            </template>
          </slot-example-four>
        </dd>
        <dt>
          解构插槽prop,即将outerProp包裹对象，书写成指定的需要的变量名构成的即时对象
        </dt>
        <dd>
          <slot-example-four>
            <template v-slot:default="{ mi, mi2 }">
              <span
                >这里的v-slot:default="{}"也可以简写为v-slot="{}",结合后面的#写法,还可进一步简写成#="{}"</span
              >
              <sub>{{ mi }}</sub>
              <sup>{{ mi2 }}</sup>
            </template>
            <template v-slot:footer="{ fi2 }">
              <sup>{{ fi2 }}</sup>
            </template>
            <template v-slot:header="{ hi2, hi }">
              <sup>{{ hi }}</sup>
              <sub>{{ hi2 }}</sub>
            </template>
          </slot-example-four>
        </dd>
        <dt>解构插槽prop,结合重命名。注意原名在前，新名在后</dt>
        <dd>
          <slot-example-four>
            <template v-slot:default="{ mi: mi_new, mi2: mi2_new }">
              <sub>{{ mi_new }}</sub>
              <sup>{{ mi2_new }}</sup>
            </template>
            <template v-slot:footer="{ fi2: fi2_new }">
              <sup>{{ fi2_new }}</sup>
            </template>
            <template v-slot:header="{ hi2, hi: hi_new }">
              <sup>{{ hi_new }}</sup>
              <sub>{{ hi2 }}</sub>
            </template>
          </slot-example-four>
        </dd>
        <dt>动态插槽名</dt>
        <dd>
          <slot-example-four>
            <template v-slot:[objSlotName.slotName1]> 第一段文字 </template>
            <template v-slot:[objSlotName.slotName2]> 第二段文字 </template>
            <template v-slot:[objSlotName.slotName3]> 第三段文字 </template>
          </slot-example-four>
        </dd>
        <dt>具名插槽的缩写,即把参数之前的所有内容 (v-slot:) 替换为字符 #</dt>
        <dd>
          <slot-example-four>
            <template #header>this is header </template>
            <template #footer>this is footer</template>

            <template #default>
              <span>可以简写成:&lt;template #&gt;</span>
              <span>this is default </span>
            </template>
          </slot-example-four>
        </dd>
      </dl>
    </accordion-item>
  </accordion-hull>
</template>

<script lang="ts">
/* eslint-disable no-dupe-class-members, no-dupe-keys */
import { defineComponent } from "vue";
// import AccordionHull from "@/components/accordion/accordion-hull.vue"; // 子组件 @ is an alias to /src
// import AccordionItem from "@/components/accordion/accordion-item.vue";
import SlotExampleOne from "@/components/12-slot/slot-example1.vue";
import SlotExampleTwo from "@/components/12-slot/slot-example2.vue";
import SlotExampleThree from "@/components/12-slot/slot-example3.vue";
import SlotExampleFour from "@/components/12-slot/slot-example4.vue";

export default defineComponent({
  data() {
    return {
      data1: {
        content: "hello data one",
      },
      data3: ["do a dinner", "place an order", "go to bed", "happy new year"],
      timer: 0,
      objSlotName: {
        slotName1: "",
        slotName2: "",
        slotName3: "",
        slotNameSeqs: [
          ["header", "default", "footer"],
          ["header", "footer", "default"],
          ["default", "header", "footer"],
          ["default", "footer", "header"],
          ["footer", "header", "default"],
          ["footer", "default", "header"],
        ],
      },
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      const rdm = Math.floor(Math.random() * 6);
      [
        this.objSlotName.slotName1,
        this.objSlotName.slotName2,
        this.objSlotName.slotName3,
      ] = this.objSlotName.slotNameSeqs[rdm];
    }, 1000);
  },
  unmounted() {
    clearInterval(this.timer);
  },
  components: {
    SlotExampleOne,
    SlotExampleTwo,
    SlotExampleThree,
    SlotExampleFour,
  },
});
</script>
