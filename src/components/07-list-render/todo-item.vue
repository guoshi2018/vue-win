
<template>
  <li>
    <label :title="title">{{title}}</label>
    <input type="button" @click="$emit('remove')" value="Remove"/>
  </li>
</template>

<script lang="ts">
  /* eslint-disable no-dupe-class-members, no-dupe-keys */
  import { Options, Vue } from 'vue-class-component'
  @Options({
    props: ['title'],
    emits: ['remove'],
  })
  //export default class ComOrViewModel extends Vue { }     //ok
  //由于只有一个导出，故可使用匿名的默认导出：
  export default class extends Vue { }
</script>

<summary>
  官方文档例子，进行了一点点改动
  存在问题: 父组件必须使用ul标签，且只能包含todo-item组件，形成耦合。
</summary>

