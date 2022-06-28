<!-- 
  可以使用组件的 $attrs property 将 attribute 应用到其它元素上，
  该 property 包括组件 props 和 emits property 中未包含的所有属性 
  (例如，class、style、v-on 监听器等)。
-->
<template>
  <div v-bind="$attrs">
    <input type="checkbox" v-bind:checked="isPublished" />
    <span>{{ title }}</span>
    <span>默认值是false</span>
    <p v-bind="$attrs">{{ content }}</p>
    <section>
      <!-- 
        v-bind="$attr"用来接收父级的非prop属性, 
      v-bind:one="tempProp"用来将变量绑定到自身属性.
      属性名相同而发生冲突时,后者覆盖前者,例如下面的one属性
      -->
      <aside v-bind="$attrs" v-bind:one="tempProp" v-bind:three="tempProp">
        no other use
      </aside>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { print } from "@/common/mixins/func";
const debug = false;

export default defineComponent({
  //启用Attribute继承，即默认的非prop属性，自动添加到根节点
  inheritAttrs: true,
  props: {
    title: {
      type: String,
      default: "未命名标题",
      required: false,
    },
    content: {
      type: String,
      default: "未书写文章内容",
      required: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
      required: false,
    },
    tempProp: {
      type: String,
      default: "hello",
    },
  },
  mounted() {
    print(debug,
      `blog-post is mounted,title=<${this.title}>,isPublish=<${this.isPublished}>`
    );
  },
});
</script>
<style lang="scss" scoped>
span {
  display: inline-block;
}
</style>
