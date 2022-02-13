<template>
  <div>
    <h3>this is fourth layer component.</h3>
    <p>user from inject:&lt;{{user}}&gt;</p>
    <!--<p>count from inject:&lt;{{count()}}&gt;</p>-->
    <p>count from inject:&lt;{{count}}&gt;</p>
    <p>age from inject:&lt;{{age}}&gt;</p>
    <p>{{visitors}}</p>
    <slot />
  </div>
</template>

<script lang="ts">
  import { Options, Vue } from 'vue-class-component'

  @Options({
    inject: ['user', 'count', 'age', 'visitors'],
    created() {
      console.log(`injected property in fourth-layer:${this.user}`);
    },
  })
  export default class extends Vue { }
</script>

