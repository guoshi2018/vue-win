<description>
  licence:
    guoshi 2022.06.16

  属性:
    value, modelValue 均可在组件内映射为meter的value值, 其中modelValue优先级较高.

  事件:
    value-changed :
          事件参数参见axis-data.ts
    update:model-value 和 update:value :
          该两事件参数均为修改后的meter的value新值. 该事件以被组件内
          用来实现双向绑定(响应), 外围一般不用

  使用方法:
    <axis-solo-old
      min="0"
      max="200"
      low="130"
      high="170"
      @="alValueChangedHandler"
    />

  特点:
    1)点击/拖拽实现meter的meter值更新, 并引发事件value-changed 
    2)除value和modelValue以外, 可任意配置meter属性, 包括但不限于 min max low high class,
  与在<meter></meter>标签内配置一致,并生效, 这些值如果不设置, 遵从原生meter的原则生成默认值.
    3)组件的value和modelValue属性,内部均映射称为meter的value属性.
    4)无论静态初始化还是单向,双向绑定,
  :model-value="19" 和 v-model:moduleValue="number变量"(或者其简写:v-model="number变量"),
  优先级均高于
  :value="91" 和 v-model:value="另一个number变量"

  注意:
    该组件贯彻单一职责原则. 取消axis-label中多余的, 应由外部提供的操作和功能.并修正了axis-label中
    存在的问题.
</description>

<template>
  <meter
    :value="switcher.meterValue.value"
    :title="`${equate.toFixed(2)}%`"
    @mousedown="mousedownHandler"
    @mousemove="mousemoveHandler"
    ref="theMeter"
  ></meter>
</template>

<script lang="ts">
import { Ref, ref, toRef, defineComponent, computed, watchEffect, isVNode } from "vue";
import * as Axis from "./axis-data";

import { print, getType } from "@/common/mixins/func";
import { boolean } from "yargs";
const debug = true;

export default defineComponent({
  inheritAttrs: true,
  emits: [Axis.UpdateModelValue, Axis.ValueChanged, Axis.UpdateValue],
  props: {
    /**
     * 双向绑定之value部分 1/2
     */
    value: {
      type: Number,
      default: 18,
      required: false,
    },
    /**
     * 双向绑定之modelValue部分 1/2
     */
    modelValue: {
      type: Number,
      default: NaN,
      required: false,
    },
  },
  setup(props, context) {
    const theMeter = ref() as Ref<HTMLMeterElement>;

    const temp = ref("hello");

    const switcher = computed(
      (): Axis.MeterSuitChoice => {
        /**
         * 当前使用的是value,而不是modelValue属性?
         */
        const usingValue = Number.isNaN(props.modelValue);

        //优先使用modelValue形式的meter,以便消费端启用v-model=""实现双向绑定
        return {
          //这是关键, 写成 usingValue ? props.value : props.modelValue则失败
          meterValue: usingValue ? ref(props.value) : ref(props.modelValue),
          updateEventName: usingValue ? Axis.UpdateValue : Axis.UpdateModelValue,
          who2value: usingValue ? "value" : "modelValue",
        };
      }
    );

    //当前值等效于0-100范围内的值,
    const equate = computed(() => {
      const ele = theMeter.value;
      const min = ele?.min || 0;
      const max = ele?.max || 1;
      const v = switcher.value.meterValue.value;
      return ((v - min) / (max - min)) * 100;
    });

    const fixValue = (evt: MouseEvent) => {
      const ele = evt.target as HTMLMeterElement;
      const left = ele.clientLeft;
      const width = ele.clientWidth;
      const min = ele.min;
      const max = ele.max;
      const current = min + ((evt.offsetX - left) / width) * (max - min);

      //消费端如果不要求双向绑定,则这句为必须
      switcher.value.meterValue.value = current;

      context.emit(switcher.value.updateEventName, current); // 双向绑定关键 2/2

      const e: Axis.AxisEvent = {
        type: Axis.ValueChanged,
        sender: theMeter.value,
        meter: theMeter.value,
        originalEvent: evt,
        who2value: switcher.value.who2value,
      };
      context.emit(Axis.ValueChanged, e);
    };

    const mousedownHandler = (evt: MouseEvent) => fixValue(evt);
    const mousemoveHandler = (evt: MouseEvent) => evt.buttons & 1 && fixValue(evt);

    return {
      theMeter,
      switcher,
      /**
       * 当前值等效于0-100范围内的值(即百分数乘以100), 保留两位小数
       */
      equate,
      mousedownHandler,
      mousemoveHandler,
      temp,
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
