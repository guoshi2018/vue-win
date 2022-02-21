<template>
  <div>
    <h3>this is fourth layer component.</h3>
    <p>user from inject:&lt;{{ user }}&gt;</p>
    <!--<p>count from inject:&lt;{{count()}}&gt;</p>-->
    <p>count from inject:&lt;{{ count }}&gt;</p>
    <p>age from inject:&lt;{{ age }}&gt;</p>
    <p>visitors:&lt; {{ visitors }}&gt;</p>
    <p>overlapObj:{{ overlap }}</p>
    <input
      type="button"
      value="由于注入的变量,无法使用先导this指针,故无法修改,即注入量为只读"
      @click="modify"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  //如果data或props中存在与inject中同名字段,则inject的被忽略,而data与props因优先级一致而互斥,只能存其一
  data() {
    // return {
    //   overlap: "hello,overlap by data()",
    // };
  },
  props: {
    overlap: {
      type: String,
      required: false,
      default: "hello,overlap by props",
    },
  },
  inject: ["user", "count", "age", "visitors"],
  //无法使用this.<inject量>
  mounted() {
    console.log(
      "injected property in fourth-layer:",
      //this.user,
      //this.count
      //this.age
      //this.visitors
      this
    );
  },
  methods: {
    modify() {
      //.visitors.push("hey");
    },
  },
});
</script>
