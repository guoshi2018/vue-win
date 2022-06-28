<template>
  <select>
    <slot></slot>
  </select>
</template>

<style lang="scss" scoped>
select {
  min-width: 18.75em;
}
</style>

<script lang="ts">
// 必要时采用/* eslint-disable no-dupe-class-members, no-dupe-keys */
import { defineComponent } from "vue";
import $ from "jquery";
import "select2";
import { getType, print } from "@/common/mixins/func";

const debug = true;

export default defineComponent({
  props: ["options", "modelValue"],
  // template: "#select2-template",
  mounted() {
    //  const vm = this;
    $(this.$el)
      // init select2
      .select2({ data: this.options })
      .val(this.modelValue)
      .trigger("change")
      //emit event on change.
      .on("change", (evt: Event) => {
        const s = evt.target as HTMLSelectElement;
        this.$emit("update:modelValue", s.value);
      });
  },
  watch: {
    modelValue(value) {
      // update value
      //$(this.$el).val(value).trigger("change"); //感觉原版的trigger("change")不必
      $(this.$el).val(value);
    },
    options(options) {
      // update options
      $(this.$el).empty().select2({ data: options });
    },
  },
  unmounted() {
    $(this.$el).off().select2("destroy");
  },
});
</script>
