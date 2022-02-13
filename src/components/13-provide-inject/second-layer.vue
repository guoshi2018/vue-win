<template>
  <div>
    <h3>this is second layer component</h3>
    <slot/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
})
export default class extends Vue {}
</script>

