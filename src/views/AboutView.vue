<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <!-- 
  <router-view></router-view>-->
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({
  components: {},
  mounted() {
    console.log("in about-view mounted,this.$route is ", this.$route);
  },
})
export default class AboutView extends Vue {}
</script>
