<comments>
  注意，启动 .lazy修饰符,目前有三种表达方法，三种情况均要考虑
</comments>
<template>
  <span>{{ description }}</span>
  <input
    type="text"
    :value="modelValue"
    @[responseEventName]="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      responseEventName: "input",
    };
  },
  created() {
    //print(debug,this.$attrs.modelModifiers, this.$attrs.modelValueModifiers, this.$attrs['model-valueModifiers']);

    if (
      (this.$attrs.modelModifiers as Record<string, any>)?.lazy || //v-model.lazy形式
      (this.$attrs.modelValueModifiers as Record<string, any>)?.lazy || //v-model:modelValue.lazy形式
      (this.$attrs["model-valueModifiers"] as Record<string, any>)?.lazy
    ) {
      //v-model:model-value.lazy形式
      this.responseEventName = "change";
    }
  },
  props: {
    description: {
      type: String,
      default: "未添加表述",
      required: false,
    },
    modelValue: {
      type: String,
      default: "",
      required: false,
    },
  },
  emits: ["update:modelValue"],
});
</script>
