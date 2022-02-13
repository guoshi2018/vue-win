<template>
  <div>
    <h3>this is second-parent-com</h3>
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { Options, Vue } from 'vue-class-component'
  import ChildCom from '@/components/18-teleport-apply/child-com.vue';

@Options({
  components: {
    ChildCom,
  },
})
export default class extends Vue {}
</script>

