<template>
  <div class="toast-wrap">
    {{ message }}
  </div>
</template>

<script>
import { ref, watch } from "vue";
export default {
  name: "my-toast",
  //vue2模式
  // data(){
  //   return {
  //     message:""
  //   }
  // },
  //   props: {
  //     message: {
  //       type: String,
  //       default: "",
  //     },
  //   },
  //vue3模式
  setup(props, conText) {
    const message = ref("");
    //监听父组件传过来的值，使用props.message接收index.ts文件中vm.component.props.message传过来的值
    watch(
      () => props.message,
      (newVal, oldVal) => {
        message.value = newVal;
      }
    );
    return {
      message,
    };
  },
};
</script>

<style scoped>
.toast-wrap {
  background-color: rgba(0, 0, 0, 0.8);
  padding: 8px 15px;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  position: fixed;
  z-index: 99;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
}
</style>
