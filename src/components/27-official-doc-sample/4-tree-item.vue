<description>
  官方原版https://v3.cn.vuejs.org/examples/tree-view.html
  问题:
    1. 生成目录逻辑(makeFolder)以及添加条目(addItem)位于组件外. 
      应全部集成于组件内部, 然后引发目录已生成事件. 
    2. 组件以 li 为跟标签, 要求组件只能位于 ul 标签内. 考虑改为 ul
    3. item 的类型为 Object, 缺乏强类型提示.
    4. 为采用vue3的组合式api(这可能倒不算什么问题)
  修订版见tree-view组件.
</description>
<template>
  <li>
    <header :class="{ bold: isFolder }" @click="toggle" @dblclick="makeFolder">
      {{ item.name }}
      <span v-if="isFolder">[{{ isOpen ? "-" : "+" }}]</span>
    </header>
    <ul v-show="isOpen" v-if="isFolder">
      <tree-item
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
        @make-folder="$emit('make-folder', $event)"
        @add-item="$emit('add-item', $event)"
      ></tree-item>
      <li class="add" @click="$emit('add-item', item)">+</li>
    </ul>
  </li>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

export default defineComponent({
  name: "TreeItem",
  components: {},
  emits: ["make-folder", "add-item"],
  data() {
    return {
      isOpen: false,
    };
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      },
      required: true,
    },
  },
  computed: {
    isFolder: function () {
      return this.item.children?.length > 0;
    },
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
      }
    },
    makeFolder: function () {
      if (!this.isFolder) {
        this.$emit("make-folder", this.item);
        this.isOpen = true;
      }
    },
  },
});
</script>
<style lang="scss" scoped>
li {
  cursor: pointer;
}
.bold {
  font-weight: bold;
}
ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: dot;
}
//以防上级已经修改
span {
  display: inline;
}
</style>
