<template>
  <accordion-hull header="Class 与 Style 绑定">
    <accordion-item
      caption="class 的对象语法:字段值(true/false)切换class的存在与否"
      show
    >
      <ul>
        <li>
          <span :class="{ active: judges.isActive }"
            >传给:class一个对象{active:isActive}</span
          >
        </li>
        <li>
          <span :class="{ active: !judges.isActive }"
            >上述布尔字段取反得到</span
          >
        </li>
        <li>
          <span
            :class="{
              active: judges.isActive,
              'red-border': judges.isRedBorder,
            }"
            class="my-italic"
          >
            对象包含多个class属性绑定，并与普通class共存.渲染结果时class="active
            red-border my-italic"
          </span>
        </li>
        <li>
          <span :class="judges.obj_class"
            >可以使用对象打包各个类名key和对应boolean值</span
          >
        </li>
        <li>
          <span :class="calcObjClass">使用计算属性返回对象，达到上述目的</span>
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="class 数组语法:数组元素代表的背后的class名称">
      <ul>
        <li>
          <span :class="[objCns.acc, objCns.rbc, objCns.itc]">
            传递多个元素组成的临时数组给:class,数组元素的值是具体的css类名称
          </span>
        </li>
        <li>
          <span :class="arrCns">直接将数组名传递给:class也可以</span>
        </li>
        <li>
          <span :class="['active', 'red-border', 'my-italic']"
            >放屁脱裤子的数组传递方式</span
          >
        </li>
        <li>
          <span
            :class="[judges.isRedBorder ? objCns.rbc : arrCns[3], objCns.itc]"
            >三元运算符结合属性组成的临时数组</span
          >
        </li>
        <li>
          <span
            :class="[
              { active: judges.isActive, 'red-border': judges.isRedBorder },
              objCns.itc,
            ]"
          >
            将临时对象作为元素，与普通元素组成临时数组
          </span>
        </li>
        <li>
          <span :class="[judges.obj_class, objCns.itc]">
            将现有的以描述css类名称是否为true为属性的对象作为元素，与普通元素也可组成临时数组
          </span>
        </li>
      </ul>
    </accordion-item>
    <accordion-item
      caption="Style的对象语法:普通的内联style,各属性值采用变量动态定义"
    >
      <ul>
        <li>
          <span
            :style="{
              color: objStyle.clr,
              fontSize: objStyle.fs + 'px',
              'background-color': objStyle.bgclr,
            }"
          >
            看起来像内联css style,但其实时javascript对象。属性名需要驼峰式写法，
            或引号括起来的短横线分割形式写法命名。
          </span>
        </li>
        <li>
          <span :style="stdObjStyle">
            直接使用描述style的对象绑定，更清晰，但要求属性为标准css属性名，非标准的，无用多余的属性被忽略
          </span>
        </li>
        <li>
          <span :style="calcObjStyle1">
            同样可以结合返回对象的计算属性使用，这是返回css属性作为属性的对象。
          </span>
        </li>
        <li>
          <span :style="calcObjStyle2">
            但如果返回以上述对象为属性的包裹对象，就没有效果了。（被作为无效字段而扔弃，无法识别）
          </span>
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="style的数组语法">
      <ul>
        <li>
          <span :style="[stdObjStyle, stdObjStyle2]">
            其实是将上述多个对象作为元素，组成的数组,同名字段后面的覆盖前面的。其他特点：css属性值自动添加前缀，
            同时，可以为 style 绑定中的 property 提供一个包含多个值的数组，
            常用于提供多个带前缀的值,这样写只会渲染数组中最后一个被浏览器支持的值。
          </span>
        </li>
        <li></li>
      </ul>
    </accordion-item>
  </accordion-hull>
</template>

<script lang="ts">
/* eslint-disable no-dupe-class-members, no-dupe-keys */
import { defineComponent } from "vue";
import AccordionHull from "@/components/accordion/accordion-hull.vue"; // 子组件 @ is an alias to /src
import AccordionItem from "@/components/accordion/accordion-item.vue";
interface Data {
  judges: object;
  objCns: object;
  arrCns: string[];
  objStyle: object;
}
// type Yyy = {
// };
export default defineComponent({
  data() {
    return {
      judges: {
        isActive: true,
        isRedBorder: false,
        obj_class: {
          active: true,
          "red-border": true,
        },
      },
      objCns: {
        acc: "active",
        rbc: "red-border",
        itc: "my-italic",
      },
      arrCns: ["active", "red-border", "my-italic", "yellow-border"],
      objStyle: {
        clr: "green",
        fs: 19,
        bdr: "3px solid blue",
        bgclr: "grey",
      },
      stdObjStyle: {
        color: "green",
        fontSize: "19px",
        border: "3px solid blue",
        "background-color": "grey",
        abcd: "no such css property,then be ignored.",
      },
      stdObjStyle2: {
        "font-style": "italic",
        "text-underline-position": "under",
        color: "violet",
        display: ["-webkit-box", "-ms-flexbox", "flex"],
      },
    } as Data;
  },
  computed: {
    calcObjClass() {
      const t = new Date().getTime();
      return {
        active: t % 4 == 0,
        "red-border": t % 3 == 0,
        "my-italic": t % 5 == 0,
      };
    },
    calcObjStyle1() {
      return {
        color: "green",
        fontSize: "19px",
        border: "3px solid blue",
        "background-color": "grey",
        abcd: "no such css property,then be ignored.",
      };
    },
    calcObjStyle2() {
      return {
        theObj: {
          color: "green",
          fontSize: "19px",
          border: "3px solid blue",
          "background-color": "grey",
          abcd: "no such css property,then be ignored.",
        },
      };
    },
  },
  components: {
    AccordionHull,
    AccordionItem,
  },
});
</script>
