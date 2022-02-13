
<template>
  <div class="test">
    <h2>条件渲染</h2>
    <section>
      <h3>使用template包裹，实现一点切换多个元素的渲染</h3>
      <ul>
        <li>
          <template v-if="groupRender">
            <h1>Title</h1>
            <p>content content content</p>
            <p>paragraph ...paragraph ...paragraph ...paragraph ...</p>
            <input type="button" value="click me" />
          </template>
          <span v-else>hello,world using v-if</span>
        </li>
      </ul>
    </section>
    <section>
      <h3>完整包含v-if v-else-if v-else的例子</h3>
      <ul>
        <li>
          <p v-if="solar === 0">
            spring
          </p>
          <p v-else-if="solar === 1">
            summer
          </p>
          <p v-else-if="solar === 2">
            autumn
          </p>
          <p v-else-if="solar === 3">
            winter
          </p>
          <p v-else>
            beaty
          </p>
        </li>
      </ul>
    </section>
    <section>
      <h3>v-show的原理则是将dispaly临时变更为none</h3>
      <ul>
        <li>
          <span v-show="groupRender">hello,world, using v-show</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
  /* eslint-disable no-dupe-class-members, no-dupe-keys */
  //import { Options, Vue } from 'vue-class-component'
  import { defineComponent } from 'vue';

  enum Season {
    spring,
    summer,
    autumn,
    winter,
    beauty,
  }
  interface Data {
    groupRender: boolean;
    solar: Season;
  }
  // type Yyy = {
  // };
  export default defineComponent({
    data(): Data {
      return {
        groupRender: true,
        solar: Season.summer,
      };
    },
    mounted() {
      this.loopSwitch();
      console.log(this.solar);
    },
    methods: {
      loopSwitch() {
        const delay = Math.floor((Math.random() * 4 + 1) * 1000) //1000 到 5000(不包含5000)
        setTimeout(() => {
    //      console.log(`delay is ${delay},`);
          this.groupRender = delay % 3 != 0;
          this.solar = delay % 5;
          this.loopSwitch();
        }, delay);
      },
    },
  });

</script>

<summary>
  View形式的组件，还需要到/router/index.ts中注册，在App.vue的适当位置设置链接
  若引用到.js文件，使用import时，需要到shims-vue.d.ts中declare一下。
</summary>

