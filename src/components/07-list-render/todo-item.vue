<template>
  <li>
    <label :title="title">{{ title }}</label>
    <input type="button" @click="$emit('remove')" value="Remove" />
  </li>
</template>

<script lang="ts">
/* eslint-disable no-dupe-class-members, no-dupe-keys */
import { defineComponent } from "vue";
export default defineComponent({
  props: ["title"],
  emits: ["remove"],
});
</script>

<summary>
  官方文档例子，进行了一点点改动
  存在问题: 父组件必须使用ul标签，且只能包含todo-item组件，形成耦合。
</summary>
