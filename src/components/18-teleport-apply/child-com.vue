<template>
  <div>
    <h3>this is child-com</h3>
    <p>hello,{{name}}</p>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    name: String
  }
})
export default class extends Vue {}
</script>

