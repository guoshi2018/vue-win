<template>
  <accordion-hull header="模板引用">
    <accordion-item
      caption="为了访问子组件，使用ref属性为子组件取个名，该属性自动添加到父组件的$refs对象中"
    >
      <ol>
        <li>
          <span>注意得到的引用，是原生dom对象。这在accordion-item组件中有应用</span>
          <input type="text" value="第一个input，初始不聚焦" />
          <input type="text" value="第二个input，初始聚焦并选定文字" ref="mitan" />
        </li>
      </ol>
    </accordion-item>
    <accordion-item caption="使用v-once标志，确保某段模板只求值一次" show>
      <ol>
        <li>
          <div v-once>
            <h2>Terms of Service</h2>
            <p>content...</p>
            <p>content...</p>
            <p>{{ words }}</p>
            <p>content...</p>
          </div>
        </li>
      </ol>
    </accordion-item>
  </accordion-hull>
</template>

<script lang="ts">
/* eslint-disable no-dupe-class-members, no-dupe-keys */
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      words: "hello,world.",
    };
  },
  mounted(): void {
    const ele = this.$refs.mitan as HTMLInputElement;
    ele.focus(); //聚焦
    setTimeout(() => {
      ele.select(); //选定文本
      this.words = "this is new text after 3 seconds."; //v-once存在,则不响应
    }, 3000);
  },
  // methods: {

  // },
  components: {},
});
</script>
