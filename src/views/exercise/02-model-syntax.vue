<template>
  <div class="test">
    <h2>模板语法演练</h2>
    <section>
      <h3>
        通过使用 v-once
        指令，你也能执行一次性地插值，当数据改变时，插值处的内容不会更新。
        但请留心这会影响到该节点上的其它数据绑定：
      </h3>
      <ul>
        <li>
          <input type="text" v-model="content" />
        </li>
        <li>
          <span>响应,使用&lt;span&gt;的内嵌形式:{{ content }}</span>
        </li>
        <li>响应,使用span元素的v-text属性：<span v-text="content"></span></li>
        <li>
          <span v-once
            >能响应的唯一一次插值已经用掉,现在不能响应了：{{ content }}</span
          >
        </li>
        <li>
          <span v-html="content"></span>
        </li>
      </ul>
    </section>
    <section>
      <h3>使用v-bind或者其简写:,在html attribute中使用绑定。</h3>
      <ul>
        <li>
          <span v-bind:title="title.str">绑定不为空的title提示文本</span>
        </li>
        <li>
          <span :title="title.nl"
            >绑定为空的title提示文本，则该title attribute不渲染</span
          >
        </li>
      </ul>
      <h3>
        v-bind:disabled 属性值为
        0,false,null,undefined,NaN时，该元素的html属性disabled不渲染,即元素可用
      </h3>
      <ul>
        <li>
          <span>数值0:</span
          ><input :disabled="disabled.numzero" type="text" value="" />
        </li>
        <li>
          <span>false:</span
          ><input :disabled="disabled.falsy" type="text" value="" />
        </li>
        <li>
          <span>null:</span
          ><input :disabled="disabled.nl" type="text" value="" />
        </li>
        <li>
          <span>undefined:</span
          ><input :disabled="disabled.und" type="text" value="" />
        </li>
        <li>
          <span>NaN:</span>
          <input :disabled="disabled.nn" type="text" value="" />
        </li>
      </ul>
      <h3>其他值,均将该元素的html属性disabled渲染为 disabled=""</h3>
      <ul>
        <li>
          <span>对象:</span>
          <input :disabled="disabled.obj" type="text" value="" />
        </li>
        <li>
          <span>非0数值,即使是负数,小数: </span
          ><input :disabled="disabled.num" type="text" value="" />
        </li>

        <li>
          <span>非空字串:</span
          ><input :disabled="disabled.str" type="text" value="" />
        </li>
        <li>
          <span>空字串:</span
          ><input :disabled="disabled.empstr" type="text" value="" />
        </li>
        <li>
          <span>true:</span
          ><input :disabled="disabled.truthy" type="text" value="" />
        </li>
      </ul>
    </section>
    <section>
      <h3>每个绑定都只能包含单个表达式，所以下面的例子都不会生效。</h3>
      <ul>
        <li>
          绑定&#123; &#123; let
          a=1&#125;&#125;，将编译错误，因为它是语句，而不是表达式:
          <!--
          <span>这样绑定，导致编译错误:{{let a=1}}</span> -->
        </li>
        <li>
          流程控制, 例如 &#123; &#123; if(ok){return message} &#125;&#125;
          也不会生效:
        </li>
        <!--
        <li><span>绑定{{ if (ok) { return message } }}</span></li>编译错误-->
      </ul>
    </section>
    <section>
      <h3>指令，是带有 v- 前缀的特殊 attribute</h3>
      <ul>
        <li>
          <span v-if="directives.cond"
            >v-if为真,这个能看到，下一个就看不到了，连渲染都不渲染</span
          >
        </li>
        <li><span v-if="!directives.cond">看不到，因为没有渲染</span></li>
        <li>
          <span v-show="directives.cond"
            >v-show为真也能看到，下面为false，已经渲染，但是其display:none;</span
          >
        </li>
        <li>
          <span v-show="!directives.cond">渲染，但被隐藏</span>
        </li>
      </ul>
    </section>
    <section>
      <h3>动态attribute，事件综合演练</h3>
      <ul>
        <li :style="{ color: currentColor }">
          本段文字颜色，将随鼠标光标的进入和离开变化
        </li>
        <li>
          <input type="button" value="变色" v-on:[currentEvent]="switchMode" />
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-dupe-class-members, no-dupe-keys */
import { defineComponent } from "vue";
/*
interface Data {
  content: string;
  title: {
    str: string;
    nl: null;
  };
  disabled: {
    obj: object;
    num: number;
    numzero: number;
    str: string;
    empstr: string;
    truthy: boolean;
    falsy: boolean;
    nl: null;
    und: undefined;
  };
  directives: {
    cond: boolean;
  };
  currentEvent: string;
  mouseEvents: {
    evMouseEnter: string;
    evMouseLeave: string;
  };
  currentColor: string;
  colors: {
    redColor: string;
    blueColor: string;
  };
}*/
export default defineComponent({
  data() {
    return {
      content: "可以输入html标签看看",
      title: {
        str: "这是绑定的title提示",
        nl: null,
      },
      disabled: {
        obj: {},
        num: -123.93,
        numzero: 0,
        str: "hey",
        empstr: "",
        truthy: true,
        falsy: false,
        nl: null,
        und: undefined,
        nn: NaN,
      },
      directives: {
        cond: true,
      },
      currentEvent: "mouseenter",
      mouseEvents: {
        evMouseEnter: "mouseenter",
        evMouseLeave: "mouseleave",
      },
      currentColor: "grey",
      colors: {
        redColor: "red",
        blueColor: "blue",
      },
    };
  },
  methods: {
    switchMode() {
      this.currentColor =
        this.currentColor == this.colors.redColor
          ? this.colors.blueColor
          : this.colors.redColor;
      this.currentEvent =
        this.currentEvent == this.mouseEvents.evMouseEnter
          ? this.mouseEvents.evMouseLeave
          : this.mouseEvents.evMouseEnter;
      console.log(
        "mouse event and color changed,current mode : ",
        this.currentColor,
        this.currentEvent
      );
    },
  },
  components: {},
});
</script>

<!--
View形式的组件，还需要到/router/index.ts中注册，在App.vue的适当位置设置链接
-->
