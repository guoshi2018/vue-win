<template>
  <div>
    <header>
      <slot name="header"/>
    </header>
    <main>
      <!--省略name屬性的插槽，自动生成 name='default'-->
      <slot/>
    </main>
    <footer>
      <slot name="footer"/>
    </footer>
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

