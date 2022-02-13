
<comments>
  注意，消费端暂无法启动 .lazy修饰符,因暂找不到合适方法监听修饰符，以后再说
</comments>
<template>
  <span>{{description}}</span>
  <input type="text"
         :value="florid"
         @[eventName.florid]="$emit('update:florid',$event.target.value)" />
  <input type="text"
         :value="firstName"
         @[eventName.firstName]="$emit('update:first-name',$event.target.value)" />
  <input type="text"
         :value="lastName"
         @[eventName.lastName]="$emit('update:last-name',$event.target.value)" />
</template>


<script lang="ts">
  import { Options, Vue } from 'vue-class-component'
  @Options({
    data() {
      return {
        eventName: {
          florid: 'input',
          firstName: 'input',
          lastName: 'input',
        },
      };
    },
    created() {
      for (const name in this.eventName) {
        if (this.$attrs[name + 'Modifiers']?.lazy) {
          this.eventName[name] = 'change';
        }
      }



      //if (this.$attrs.floridModifiers?.lazy) {
      //  this.floridEventName = 'change';
      //}
    },
    props: {
      description: {
        type: String,
        default: '未添加表述',
        required: false,
      },
      florid: {
        type: String,
        default: '',
        required: false,
      },
      firstName: String,
      lastName: String,
    },
    emits: ['update:florid', 'update:first-name', 'update:last-name'],
  })
  export default class extends Vue { }
</script>
