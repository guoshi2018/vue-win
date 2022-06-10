<template>
  <div id="counter" :title="title" class="test">
    <h2>介绍</h2>
    <section>
      <h3>简单绑定和事件示范</h3>
      <ul>
        <li>
          <span v-if="timer">Counter:{{ counter }}</span>
        </li>
        <li>
          <input type="button" :value="btnText" @click="switchStatus" />
        </li>
        <li>
          <span v-show="!timer">您現在看到的文字,走字时卻不可见</span>
        </li>
        <li>
          <input
            type="text"
            placeholder="这里的文本已与整个div的title绑定"
            v-model="title"
          />
        </li>
      </ul>
    </section>
    <section>
      <Todos :todos="plans"></Todos>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Todos from "@/components/01-intro/1-todos.vue"; // @ is an alias to /src

interface Data {
  counter: number;
  btnText: string;
  timer: any;
  title: string;
  plans: Array<{ id: number; content: string; done: boolean }>;
}

export default defineComponent({
  data() {
    return {
      counter: 0,
      btnText: "",
      timer: 0,
      title: "这里的提示文字，可通过下面的编辑框修改",
      plans: [
        {
          id: 1,
          content: "Learn babel",
          done: true,
        },
        {
          id: 2,
          content: "learn webpack",
          done: false,
        },
        {
          id: 3,
          content: "build a project",
          done: false,
        },
      ],
    } as Data;
  },
  mounted(): void {
    this.switchStatus();
  },
  methods: {
    createTimer() {
      return setInterval((): void => {
        this.counter++;
      }, 1000);
    },
    switchStatus(): void {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = 0;
        this.btnText = "resume";
      } else {
        this.timer = this.createTimer();
        this.btnText = "pause";
      }
    },
  },
  components: {
    Todos,
  },
});
</script>
