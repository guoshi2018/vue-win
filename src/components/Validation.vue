<template></template>

<script lang="ts">
import { PropType, defineComponent } from "vue";

type TheMessage = {
  message: string;
};

// function HelloPerson(firstName: string, lastName: string) {
//   this.firstName = firstName;
//   this.lastName = lastName;
// }

export default defineComponent({
  //完整的属性验证方式表达
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 值会通过任何类型验证)
    propA: Number,

    // 多个可能的类型
    propB: [String, Number],

    // 必填的字符串
    propC: {
      type: String,
      required: true,
    },

    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100,
    },

    // 带有默认值的对象
    propE: {
      type: Object as PropType<TheMessage>,
      // 对象或数组的默认值必须从一个工厂函数返回
      default() {
        return { message: "hello" };
      },
    },

    // 自定义验证函数
    propF: {
      validator(value: string) {
        // 这个值必须与下列字符串中的其中一个相匹配
        return ["success", "warning", "danger"].includes(value);
      },

      //但是类似上面如此简单的验证, 使用参数类型即可达到目的:
      validator2(value: "success" | "warning" | "danger") {
        // 这个值必须与下列字符串中的其中一个相匹配
        return true;
      },
    },

    // 具有默认值的函数
    propG: {
      type: Function,
      // 与对象或数组的默认值不同，这不是一个工厂函数——这是一个用作默认值的函数
      default() {
        return "Default function";
      },
    },

    //验证 author prop 的值是否是通过 new Person 创建的
    //但是其中的this引起大片代码报警,故注释
    // propH: {
    //   author: HelloPerson,
    // }
  },

  //自定义事件的验证
  emits: {
    // 验证 submit 事件
    submit({ email, password }) {
      //原版是 { email, password}
      if (email && password) {
        return true;
      } else {
        console.warn("Invalid submit event payload!");
        return false;
      }
    },

    /**
     * 为触发的事件注解一个有效载荷
     */
    addBook(payload: { bookName: string }) {
      //perform runtime validation
      return payload.bookName.length > 0;
    },

    // 没有验证
    click: null,
  },
  methods: {
    submitForm(email: string, password: number) {
      this.$emit("submit", { email, password });
      this.$emit("addBook", {
        bookName: "987", // bookName:987 则报告类型错误
      });
    },
  },
});
</script>
