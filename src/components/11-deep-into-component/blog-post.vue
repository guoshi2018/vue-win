<template>
  <div  v-bind="$attrs">
    <input type="checkbox" v-bind:checked="isPublished" />
    <span>{{title}}</span><span>默认值是false</span>
    <p v-bind="$attrs">{{content}}</p>
    <section>
      <aside v-bind="$attrs">no other use</aside>
    </section>
  </div>
</template>

<script lang="ts">
  import { Options, Vue } from 'vue-class-component'

  @Options({
    //禁用Attribute继承，即默认的非prop属性，自动添加到根节点
    inheritAttrs: true,
    props: {
      title: {
        type: String,
        default: '未命名标题',
        required: false,
      },
      content: {
        type: String,
        default: '未书写文章内容',
        required: false,
      },
      isPublished: {
        type: Boolean,
        default: false,
        required: false,
      },
    },
    mounted() {
      console.log(`blog-post is mounted,title=<${this.title}>,isPublish=<${this.isPublished}>`);
    },
    //data() {
    //  return {

    //  };
    //},
  })
  export default class extends Vue { }
</script>
<style lang="scss" scoped>
  span {
    display: inline-block;
  }
</style>

