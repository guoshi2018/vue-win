<comments>
  注意，消费端启动 .lazy修饰符,但组件包含多个input时,就需要各个input分别对待,
  而不是只凭一个笼统的v-model.
</comments>
<template>
  <span>{{ description }}</span>
  <input
    type="text"
    :value="florid"
    @[eventName.florid]="$emit('update:florid', $event.target.value)"
  />
  <input
    type="text"
    :value="firstName"
    @[eventName.firstName]="$emit('update:first-name', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @[eventName.lastName]="$emit('update:last-name', $event.target.value)"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      eventName: {
        florid: "input",
        firstName: "input",
        lastName: "input",
      },
    };
  },
  created() {
    for (const name in this.eventName) {
      if (this.$attrs[name + "Modifiers"]?.lazy) {
        this.eventName[name] = "change";
      }
    }

    //if (this.$attrs.floridModifiers?.lazy) {
    //  this.floridEventName = 'change';
    //}
  },
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
    firstName: String,
    lastName: String,
  },
  emits: ["update:florid", "update:first-name", "update:last-name"],
});
</script>
