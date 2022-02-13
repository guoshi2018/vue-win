<template>

</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

  @Options({
  //完整的属性验证方式表达
    props: {
      // 基础的类型检查 (`null` 和 `undefined` 值会通过任何类型验证)
      propA: Number,

      // 多个可能的类型
      propB: [String, Number],

      // 必填的字符串
      propC: {
        type: String,
        required: true
      },

      // 带有默认值的数字
      propD: {
        type: Number,
        default: 100
      },

      // 带有默认值的对象
      propE: {
        type: Object,
        // 对象或数组的默认值必须从一个工厂函数返回
        default() {
          return { message: 'hello' }
        }
      },

      // 自定义验证函数
      propF: {
        validator(value:string) {
          // 这个值必须与下列字符串中的其中一个相匹配
          return ['success', 'warning', 'danger'].includes(value)
        }
      },

      // 具有默认值的函数
      propG: {
        type: Function,
        // 与对象或数组的默认值不同，这不是一个工厂函数——这是一个用作默认值的函数
        default() {
          return 'Default function'
        }
      }
    },

    //自定义事件的验证
    emits: {
      // 没有验证
      click: null,

      // 验证 submit 事件
      submit: (email: any, password: any) => { //原版是 { email, password}
        if (email && password) {
          return true
        } else {
          console.warn('Invalid submit event payload!')
          return false
        }
      }
    },
    methods: {
      submitForm(email:any, password:any) {
        this.$emit('submit', { email, password })
      }
    },
  })
export default class extends Vue {}
</script>

