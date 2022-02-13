<template>
  <div>
    <header>
      <slot name="header" :hi="headinfo" :hi2="headinfo.toLocaleUpperCase()" />
    </header>
    <main>
      <!--省略name屬性的插槽，自动生成 name='default'-->
      <slot :mi="maininfo" :mi2="maininfo.toLocaleUpperCase()" />
    </main>
    <footer>
      <slot name="footer" :fi="footerinfo" :fi2="footerinfo.toLocaleUpperCase()" />
    </footer>
  </div>
</template>

<script lang="ts">
  import { Options, Vue } from 'vue-class-component'

  @Options({
    data() {
      return {
        res: 'thank you for telling me.',
        headinfo: 'this is header information',
        maininfo: 'this is main information',
        footerinfo: 'this is footer information',
      };
    },
    props: {
      todos: {
        type: Array,
        required: true,
      },
    }
  })
  export default class extends Vue { }
</script>

