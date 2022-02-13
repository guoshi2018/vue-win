<template>
  <div>
    <h3>{{title}}</h3>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    title: String
  }
})
export default class extends Vue {}
</script>

