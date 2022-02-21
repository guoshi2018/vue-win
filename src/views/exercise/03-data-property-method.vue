<template>
  <div class="test">
    <h2>防抖和节流</h2>
    <section class="test">
      <h3>防抖和节流实例,采用鼠标在按钮上的move操作</h3>
      <ul>
        <li>
          <span
            >简单实现，存在的问题：对于可复用组件有潜在的问题，因为它们都共享相同的防抖函数。</span
          >
          <input
            type="button"
            @mousemove="commonDebounce"
            value="普通实现的防抖"
          />
        </li>
        <li>
          <span
            >为使组件实例彼此独立，在声明周期的created添加（定义）防抖函数</span
          >
          <input
            type="button"
            @mousemove="processedDebounce"
            value="created时定义的防抖"
          />
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
//const temp = require('@/common/js/lodash.js');

/* eslint-disable no-dupe-class-members, no-dupe-keys */
import { defineComponent } from "vue";
import _ from "lodash-js";

export default defineComponent({
  created() {
    this.processedDebounce = _.debounce(this.processMove, 2000);
  },
  unmounted() {
    // this.processedDebounce.cancel();
  },
  methods: {
    commonDebounce: _.debounce(() => {
      console.log("common debouce move");
    }, 500),
    processMove() {
      console.log("processed debouce move");
    },
    processedDebounce() {},
  },
});
</script>
