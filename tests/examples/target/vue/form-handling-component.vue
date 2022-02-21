<comments>
  当用到组件库或自定义组件时,仍然可以使用setValue,但是查询组件对象应使用 wrapper.findComponent({ref:"..."})
</comments>
<template>
  <form>
    <v-textarea v-model="description" ref="description" />
    <button @click="handleClick" class="submit">Send</button>
  </form>
</template>

<script>
export default {
  name: "CustomTextarea",
  data() {
    return {
      description: "",
    };
  },
  methods: {
    handleClick() {
      this.$emit("submit", this.description);
    },
  },
};
</script>
