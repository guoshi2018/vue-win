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
      value="由于注入的变量,当@ts-ignore后,方可使用先导this指针,修改可以直达源头数据"
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
    //@ts-ignore
    print(debug,
      "injected property in fourth-layer:",
      //@ts-ignore
      this.user,
      //@ts-ignore
      this.count,
      //@ts-ignore
      this.age,
      //@ts-ignore
      this.visitors,
      this
      //结论,各变量已经成功注入,但是ts语法检测错误,故只有将其忽略
    );
  },
  methods: {
    modify() {
      //@ts-ignore
      this.visitors.push("hey");
    },
  },
});
</script>
