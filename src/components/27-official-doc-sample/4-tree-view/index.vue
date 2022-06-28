<description>
  tree-item的修订版, 彻底封装其行为, 同时以事件的形式, 通知父组件, 以便其定制行为:
   beforeCollapseChange  afterCollapseChange beforeLeafToBranch afterLeafToBranch
   beforeAddItem afterAddItem
  
  使用方式:
      <tree-view
        :tree-item="fullTree"
        @[events.beforeCollapseChange]="beforeCollapseChangedHandler"
        @[events.afterCollapseChange]="afterCollapseChangedHandler"
        @[events.beforeLeafToBranch]="beforeLeafToBranchHandler"
        @[events.afterLeafToBranch]="afterLeafToBranchHandler"
        @[events.beforeAddItem]="beforeAddItemHandler"
        @[events.afterAddItem]="afterAddItemHandler"
      />

  支持: 完整对象, 空对象{}, 零输入, undefined输入, 

  由于树形结构的递归性质, 要将事件发送到顶级父组件, 必须逐级向上传递.
</description>

<template>
  <header :class="{ bold: hasChild }" @click="toggle" @dblclick="leafToBranch">
    {{ treeItem.title || "title forgotten"
    }}<span v-if="hasChild">[{{ collapsed ? "+" : "-" }}]</span>
  </header>
  <ul v-show="!collapsed">
    <li v-for="(child, index) in treeItem.children" :key="index">
      <tree-view
        :tree-item="child"
        @[events.beforeCollapseChange]="passToTop"
        @[events.afterCollapseChange]="passToTop"
        @[events.beforeLeafToBranch]="passToTop"
        @[events.afterLeafToBranch]="passToTop"
        @[events.beforeAddItem]="passToTop"
        @[events.afterAddItem]="passToTop"
      />
    </li>
    <li class="add" @click="addItem">+</li>
  </ul>
</template>

<script lang="ts">
import {
  ref,
  reactive,
  toRef,
  toRefs,
  defineComponent,
  PropType,
  computed,
  ComputedRef,
} from "vue";
import * as TV from "./data";
import { print } from "@/common/mixins/func";
const debug = true;

export default defineComponent({
  name: "TreeView", //要递归(嵌套使用), 此为必须设置
  props: {
    treeItem: {
      type: Object as PropType<TV.TreeNode>,
      default: () => {
        //针对消费端的 :tree-item="undefinedTree" 以及零配置,
        //默认值必须采用reactive封装成响应式, 注意ref在这里不适用
        return reactive({
          title:
            "empty tree, will cause some problems,but already amended at 2022.06.18...... ",
        } as TV.TreeNode);
      },
      required: false,
    },
  },
  setup(props, { emit }) {
    //const ti = toRef(props, "treeItem");
    //const { treeItem: ti } = toRefs(props); //ok also
    /**
     * 当前是否折叠状态
     */
    const collapsed = ref(true);
    const hasChild: ComputedRef<Boolean> = computed(
      () => typeof props.treeItem.children !== "undefined"
    );

    //#region event
    const toggle = (evt: Event) => {
      if (hasChild.value) {
        print(debug, "toggle triggeredd");
        const e: TV.TreeNodeEvent = {
          type: TV.BeforeCollapseChange,
          sender: props.treeItem,
          cancel: false,
          originalEvent: evt,
          currentCollapse: collapsed.value,
        };
        emit(TV.BeforeCollapseChange, e);
        if (!e.cancel) {
          //消费端根据需要可以取消折叠/展开状态?
          collapsed.value = !collapsed.value;
          Object.assign(e, {
            type: TV.AfterCollapseChange,
            currentCollapse: collapsed.value,
          });
          emit(TV.AfterCollapseChange, e);
        }
      }
    };
    const leafToBranch = (evt: Event) => {
      if (!hasChild.value) {
        print(debug, "double clicked");
        const e: TV.TreeNodeEvent = {
          type: TV.BeforeLeafToBranch,
          sender: props.treeItem,
          cancel: false,
          originalEvent: evt,
          currentCollapse: collapsed.value,
          nextCollapse: false, //默认要求节点转换后,立即打开
        };
        emit(TV.BeforeLeafToBranch, e);
        if (!e.cancel) {
          print(
            debug,
            "current children is :",
            props.treeItem.children,
            "continue to transform..."
          );
          //一般情况, 修改props内的东东会被eslint-vue禁止编译,
          //这里旨在修改treeItem的内部字段,是有意而为之 属于特殊情况
          /* eslint-disable-next-line vue/no-mutating-props */
          props.treeItem.children = new Array<TV.TreeNode>();

          print(debug, "after transform,children is:", props.treeItem.children);

          collapsed.value = e.nextCollapse || false;
          Object.assign(e, {
            type: TV.AfterLeafToBranch,
            currentCollapse: collapsed.value,
          });

          print(debug, "hasChild:", hasChild.value);
          emit(TV.AfterLeafToBranch, e);
        }
      }
    };
    const addItem = (evt: Event) => {
      print(debug, "click + to add item ...");
      const e: TV.TreeNodeEvent = {
        type: TV.BeforeAddItem,
        sender: props.treeItem,
        cancel: false,
        originalEvent: evt,
      };
      emit(TV.BeforeAddItem, e);
      if (!e.cancel) {
        const child: TV.TreeNode = {
          title: e.newTitle || "untitled",
        };
        /* eslint-disable-next-line vue/no-mutating-props */
        props.treeItem.children?.push(child);
        Object.assign(e, {
          type: TV.AfterAddItem, //使用e.type赋值被ts阻止
        });
        emit(TV.AfterAddItem, e);

        print(debug, "after append child,children is :", props.treeItem.children);
      }
    };
    /**
     * 转发到上级
     * @param evt
     */
    const passToTop = (evt: TV.TreeNodeEvent) => {
      emit(evt.type, evt);
    };
    //#endregion

    return {
      collapsed,
      hasChild,
      toggle,
      leafToBranch,
      addItem,
      passToTop,
      events: TV.events,
    };
  },

  emits: [
    TV.BeforeCollapseChange,
    TV.AfterCollapseChange,
    TV.BeforeLeafToBranch,
    TV.AfterLeafToBranch,
    TV.BeforeAddItem,
    TV.AfterAddItem,
  ],
});
</script>
<style lang="scss" scoped>
header,
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
// li:last-child {
//   list-style-type: none;
// }
//以防上级已经修改
span {
  display: inline;
}
</style>
