
<template>
  <div id="par-cont" class="accordion accordion-flush test">
    <h2>节标题</h2>
    <div class="accordion-item">
      <h3 id="header1" class="accordion-header">
        <button data-bs-target="#content1" aria-controls="content1"
                class="accordion-button collapsed" type="button"
                data-bs-toggle="collapse" aria-expanded="false">
          区标题
        </button>
      </h3>
      <div data-bs-parent="#par-cont" aria-labelledby="header1"
           id="content1" class="accordion-collapse collapse">
        <section class="accordion-body">
          <ul>
            <li>

            </li>
            <li>

            </li>
          </ul>
        </section>
      </div>
    </div>

    <div class="accordion-item">
      <h3 id="header2" class="accordion-header">
        <button data-bs-target="#content2" aria-controls="content2"
                class="accordion-button collapsed" type="button"
                data-bs-toggle="collapse" aria-expanded="false">
          区标题
        </button>
      </h3>
      <div data-bs-parent="#par-cont" aria-labelledby="header2"
           id="content2" class="accordion-collapse collapse">
        <section class="accordion-body">
          <ul>
            <li>

            </li>
            <li>

            </li>
          </ul>
        </section>
      </div>
    </div>

    <div class="accordion-item">
      <h3 id="header3" class="accordion-header">
        <button data-bs-target="#content3" aria-controls="content3"
                class="accordion-button collapsed" type="button"
                data-bs-toggle="collapse" aria-expanded="false">
          区标题
        </button>
      </h3>
      <div data-bs-parent="#par-cont" aria-labelledby="header3"
           id="content3" class="accordion-collapse collapse">
        <section class="accordion-body">
          <ul>
            <li>

            </li>
            <li>

            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  /* eslint-disable no-dupe-class-members, no-dupe-keys */
  import { Options, Vue } from 'vue-class-component'
  import HelloWorld from '@/components/HelloWorld.vue' // 子组件 @ is an alias to /src
  // interface Data {
  // }
  // type Yyy = {
  // };
  @Options({
    // data(): Data {
    //   return {
    //   };
    // },
    // data()也可以这样写：
    // data () {
    //   return {

    //   } as Data
    // },
    // mounted (): void {
    // },
    // methods: {

    // },
    components: {
      HelloWorld
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

