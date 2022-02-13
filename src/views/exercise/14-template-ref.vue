
<template>
  <accordion-hull header="模板引用">
    <accordion-item caption="为了访问子组件，使用ref属性为子组件取个名，该属性自动添加到父组件的$refs对象中" show>
      <ol>
        <li>
          <span>注意得到的引用，是原生dom对象。这在accordion-item组件中有应用</span>
          <input type="text" value="第一个input，初始不聚焦" />
          <input type="text" value="第二个input，初始聚焦并选定文字" ref="mitan" />
        </li>
      </ol>
    </accordion-item>
    <accordion-item caption="使用v-once标志，确保某段模板只求值一次">
      <ol>
        <li>
          <div v-once>
            <h2>Terms of Service</h2>
            <p>content...</p>
            <p>content...</p>
            <p>{{data1}}</p>
            <p>content...</p>
          </div>
        </li>
      </ol>
    </accordion-item>
    <accordion-item caption="">

    </accordion-item>
  </accordion-hull>
</template>

<script lang="ts">
  /* eslint-disable no-dupe-class-members, no-dupe-keys */
  import { Options, Vue } from 'vue-class-component'
  import AccordionHull from '@/components/accordion/accordion-hull.vue' // 子组件 @ is an alias to /src
  import AccordionItem from '@/components/accordion/accordion-item.vue';

  // interface Data {
  // }
  // type Yyy = {
  // };
  @Options({
    data() {
      return {
        data1: 'hello,world.',
      };
    },
    // data()也可以这样写：
    // data () {
    //   return {

    //   } as Data
    // },
    mounted(): void {
      this.$refs.mitan.focus();   //聚焦
      this.$refs.mitan.select();  //选定文本
    },
    // methods: {

    // },
    components: {
      AccordionHull,
      AccordionItem,
    }
  })
  //export default class ComOrViewModel extends Vue { }     //ok
  //由于只有一个导出，故可使用匿名的默认导出：
  export default class extends Vue { }
</script>

<summary>
  View形式的组件，还需要到/router/index.ts中注册，在App.vue的适当位置设置链接
  若引用到.js文件，使用import时，需要到shims-vue.d.ts中declare一下。
</summary>

