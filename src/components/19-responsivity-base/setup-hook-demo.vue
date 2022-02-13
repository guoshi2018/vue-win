<template>
  <div>
    <h3>{{title}}</h3>
  </div>
</template>

<script lang="ts">
  import {
    ref,
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onUpdated,
    onBeforeUnmount,
    onUnmounted,
    defineComponent,
  } from "vue";

  export default defineComponent({
    data() {
      return {
        title: 'setup hook demo',
      };
    },
    setup() {
      console.log('setup hook demo......')
      const strObj = ref({ age: 18 });
      onBeforeMount(() => {
        console.log('setup onBeforeMount...');
      });
      onMounted(() => {
        console.log('setup mounted...');
      });
      onBeforeUpdate(() => {
        console.log('setup onBeforeUpdate...');
      });
      onUpdated(() => {
        console.log('setup onUpdated...');
      });
      onBeforeUnmount(() => {
        console.log('setup onBeforeUnmount...');
      });
      onUnmounted(() => {
        console.log('setup onMounted...');
      });
    }
  });
</script>

