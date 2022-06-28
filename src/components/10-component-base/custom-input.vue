<!--
默认情况下，组件上的 v-model 使用 modelValue 作为 prop 和 update:modelValue 作为事件。
<template>
  <span>{{description}}</span>
  <input type="text"
         :value="innerValue"
         @input="$emit('update:innerValue',$event.target.value)" />
</template>-->

<!--必须起名modelValue
<template>
  <span>{{description}}</span>
  <input type="text"
         :value="modelValue"
         @input="inputOccur"
         @changed="changedOccur"/>
</template>
-->
<comments>
  注意，本组件未启用 .lazy修饰符,故其中的@change没什么用
  除非通过属性的方式，通知组件启用 .lazy修饰符
</comments>
<template>
  <span>{{ description }}</span>
  <input
    type="text"
    :value="florid"
    @input="inputOccur"
    @change="changeOccur"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { print } from "@/common/mixins/func";
const debug = false;

export default defineComponent({
  props: {
    description: {
      type: String,
      default: "未添加表述",
      required: false,
    },
    florid: {
      type: String,
      default: "",
      required: false,
    },
  },
  methods: {
    inputOccur(evt: Event) {
      print(debug,"custom-input input event handler:", evt);
      this.$emit("moving", evt);
    },
    changeOccur(evt: Event) {
      print(debug,"custom-input change event handler:", evt);
      this.$emit("moved", evt);
    },
  },
  emits: ["moving", "moved"],
});
</script>
