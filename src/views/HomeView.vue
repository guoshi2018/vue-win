<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App " />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
@Options({
  components: {
    HelloWorld,
  },
  mounted() {
    console.log("in home-view mounted,this.$route is ", this.$route);
  },
})
export default class HomeView extends Vue {}
</script>
