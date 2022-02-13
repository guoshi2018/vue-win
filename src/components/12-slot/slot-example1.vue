<template>
  <div>
    <h4>{{title}}</h4>
    <slot>
      备用内容：default content
    </slot>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

  @Options({
    props: {
      title: {
        type: String,
        default: 'no-title',
        required: false,
      },
    }
})
export default class extends Vue {}
</script>

