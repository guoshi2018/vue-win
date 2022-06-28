<description>

  prop: model-value min max 切记不要设置value; 双向绑定时采用 v-model="" 即可

  event: "value-changed" "request-delete" "update:model-value",最后这个一般不用

  用法, 注意没有 value属性, 而是 modelValue,即v-model="mv"是v-model 
      <axis-label
      v-if="debugAxisLabel"
      :min="-290"
      :max="-294"
      @request-delete="alRequestDeleteHandler"
      @value-changed="alValueChangedHandler"
      v-model="mv"
    />

  特点:
  双向绑定: v-model:model-value="mv"或者v-model="mv"均可,v-model:value="mv"不行, 
      因其内部未曾实现value的映射
  拖拽/点击定位meter当前值

  切记, 如果使用value属性, 可能会引起行为不正常.
  本想通过设置inheritAttrs=false,以忽略value,但这样也阻止了class style等可能需要的非prop属性的配置

  注意: 该组件某种程度上已经违反了单一职责原则. 请尽可能使用 axis-solo
</description>

<template>
  <div ref="theRoot">
    <meter
      :value="modelValue"
      :max="realMax"
      :min="realMin"
      :title="`${equate.toFixed(2)}%`"
      :low="low"
      :high="high"
      @mousedown="mousedownHandler"
      @mousemove="mousemoveHandler"
      ref="theMeter"
    ></meter>
    <span class="watch">
      {{ modelValue.toFixed(2) }}[{{ realMin.toFixed(2) }},{{ low.toFixed(2) }},
      {{ high.toFixed(2) }},{{ realMax.toFixed(2) }}]</span
    >
    <button @click="deleteClickHandler">delete</button>

    <!--
    <h2>下面是MSN上的例子</h2>
    <p>Heat the oven to <meter min="200" max="500" value="350">350 degrees</meter>.</p>
    <p>
      He got a <meter low="50.001" high="65" max="100" value="65.01">B</meter> on the
      exam.
    </p>-->
  </div>
</template>

<script lang="ts">
import {Ref, ref, defineComponent, computed, isVNode } from "vue";
import * as Axis from "./axis-data";

import { print, getType } from "@/common/mixins/func";
const debug = true;

export default defineComponent({
  emits: [Axis.RequestDelete, Axis.UpdateModelValue, Axis.ValueChanged],
  props: {
    /**
     * 初始, 在0-100之间
     * :value="modelValue"为双向绑定之 1/2
     */
    modelValue: {
      type: Number,
      default: 50,
      required: false,
    },
    max: {
      type: Number,
      default: 100,
      required: false,
    },

    min: {
      type: Number,
      default: 0,
      required: false,
    },
  },
  setup(props, context) {
    const theRoot = ref() as Ref<HTMLDivElement>;
    const theMeter = ref() as Ref<HTMLMeterElement>;
    const realMax = ref(Math.max(props.max, props.min));
    const realMin = ref(Math.min(props.max, props.min));

    //目的是配合约定配置区域颜色, 注意:不考虑optimum时, low必须大于50%位置,方能显示三色 绿 黄 红
    const low = ref(realMax.value - (realMax.value - realMin.value) * 0.4);
    const high = ref(realMax.value - (realMax.value - realMin.value) * 0.2);

    //print(debug, "hey:", realMin, low, high, realMax);

    //当前值等效于0-100范围内的值
    const equate = computed(
      () => ((props.modelValue - realMin.value) / (realMax.value - realMin.value)) * 100
    );

    const fixValue = (evt: MouseEvent) => {
      const m = evt.target as HTMLMeterElement;
      const current =
        realMin.value +
        ((evt.offsetX - m.clientLeft) / m.clientWidth) * (realMax.value - realMin.value);
      m.value = current;

      context.emit(Axis.UpdateModelValue, current); // 双向绑定关键 2/2

      const e: Axis.AxisEvent = {
        type: Axis.ValueChanged,
        sender: theRoot.value,
        meter: theMeter.value,
        originalEvent: evt,
        who2value: "model-value",
      };
      context.emit(Axis.ValueChanged, e);
    };

    const deleteClickHandler = (evt: MouseEvent) => {
      const e: Axis.AxisEvent = {
        type: Axis.RequestDelete,
        sender: theRoot.value,
        meter: theMeter.value,
        originalEvent: evt,
        who2value: "model-value",
      };
      context.emit(Axis.RequestDelete, e);
    };

    const mousedownHandler = (evt: MouseEvent) => fixValue(evt);
    const mousemoveHandler = (evt: MouseEvent) => {
      if (evt.buttons & 1) {
        //包含左键
        fixValue(evt);
      }
    };

    return {
      theRoot, //不返回,则前面的方法中获取不到实在的根元素
      theMeter,
      realMax,
      realMin,
      low,
      high,

      /**
       * 当前值等效于0-100范围内的值(即百分数乘以100), 保留两位小数
       */
      equate,

      mousedownHandler,
      mousemoveHandler,
      deleteClickHandler,
    };
  },
});
</script>
<style lang="scss" scoped>
span {
  display: inline;
}
meter {
  width: 20em;
  height: 2em;
  border: 0;
}
span,
meter,
button {
  margin-right: 0.8em;
}
.watch {
  color: rgba(94, 5, 167, 0.9);
}
</style>
