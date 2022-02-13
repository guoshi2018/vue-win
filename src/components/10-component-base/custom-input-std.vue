
<comments>
  注意，启动 .lazy修饰符,目前有三种表达方法，三种情况均要考虑
</comments>
<template>
  <span>{{description}}</span>
  <input type="text"
         :value="modelValue"
         @[responseEventName]="$emit('update:modelValue', $event.target.value)" />
</template>

<script lang="ts">
  import { Options, Vue } from 'vue-class-component'
  @Options({
    data() {
      return {
        responseEventName: 'input',
      };
    },
    created() {
      //console.log(this.$attrs.modelModifiers, this.$attrs.modelValueModifiers, this.$attrs['model-valueModifiers']);
      if (this.$attrs.modelModifiers?.lazy ||           //v-model.lazy形式
        this.$attrs.modelValueModifiers?.lazy ||        //v-model:modelValue.lazy形式
        this.$attrs['model-valueModifiers']?.lazy) {    //v-model:model-value.lazy形式
        this.responseEventName = 'change';
      }
    },
    props: {
      description: {
        type: String,
        default: '未添加表述',
        required: false,
      },
      modelValue: {
        type: String,
        default: '',
        required: false,
      },
    },
    emits: ['update:modelValue'],
  })
  export default class extends Vue { }
</script>
