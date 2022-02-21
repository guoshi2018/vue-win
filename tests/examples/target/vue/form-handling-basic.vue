<template>
  <div>
    <input type="email" v-model="email" />

    <button @click="submit">Submit</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      email: "",
    };
  },
  methods: {
    submit() {
      this.$emit("submit", this.email);
    },
  },
});
</script>
