<template>
  <accordion-hull header="官方文档示例:https://v3.cn.vuejs.org/examples/markdown.html">
    <accordion-item caption="Markdown编辑器">
      <markdown-editor></markdown-editor>
    </accordion-item>
    <accordion-item caption="GitHub提交">
      <github-submit
        api-url="https://api.github.com/repos/vuejs/vue/commits?per_page=3"
      />
    </accordion-item>
    <accordion-item caption="自动排序以及超级自动排序的网格组件对比">
      <form id="search">
        Search <input name="query" v-model="searchQuery" placeholder="输入查询关键字词" />
      </form>
      <auto-sort-grid
        :records="gridData1"
        :columns="gridColumns"
        :filter-key="searchQuery"
      >
      </auto-sort-grid>
      <super-sort-grid
        :records="gridData2"
        :filter-key="searchQuery"
        :compares="compares"
      >
      </super-sort-grid>
    </accordion-item>
    <accordion-item caption="递归的树形视图,官方原版">
      <p>(You can double click on an item to turn it into a folder.)</p>
      <ul>
        <tree-item :item="treeData" @make-folder="makeFolder" @add-item="addItem" />
      </ul>
    </accordion-item>
    <accordion-item
      caption="递归的树形视图修订版.注意为了演示消费端的定制能力,展开折叠切换,添加item,转换节点已经被禁止"
    >
      <p>(You can double click on an item to turn it into a folder.)</p>
      <tree-view
        :tree-item="fullTree"
        @[events.beforeCollapseChange]="beforeCollapseChangedHandler"
        @[events.afterCollapseChange]="afterCollapseChangedHandler"
        @[events.beforeLeafToBranch]="beforeLeafToBranchHandler"
        @[events.afterLeafToBranch]="afterLeafToBranchHandler"
        @[events.beforeAddItem]="beforeAddItemHandler"
        @[events.afterAddItem]="afterAddItemHandler"
      />
      <tree-view :tree-item="titleTree" />
      <tree-view :tree-item="emptyTree" />

      <h3>2022.06.18修正后, 已兼容下面的配置</h3>
      <tree-view :tree-item="undefinedTree" />
      <tree-view />
    </accordion-item>
    <accordion-item caption="svg图表示范,官网原版略">
      <!-- <svg-chart
        debug-input
        debug-meter
        debug-axis-label
        debug-axis-solo-old
        debug-axis-solo
        debug-poly-graph
      /> -->
      <svg-chart :stats1="stats1" />
    </accordion-item>
    <accordion-item caption="模态组件, 做了一点点改动">
      <button @click="showModal = true">Show Modal Dialog</button>
      <modal-dialog v-if="showModal" @close="showModal = false">
        <template v-slot:header>
          <h4>将内容嵌入到指定插槽的标准写法:v-slot:header</h4>
        </template>
        <template #body>
          <h5>缩写: #header #default #body #footer</h5>
        </template>
        <template #footer>
          <h6>
            为子组件的内部数据开一个出口, 以供父组件使用: #body="theObj", 或结构:
            #header="{thePeace}"
          </h6>
        </template>
      </modal-dialog>
    </accordion-item>
    <accordion-item caption="具有伸缩性的header,官网原版改成组合式风格">
      <draggable-header-view
        class="draggable-container"
        :drag-block-color="headerBgColor"
      >
        <template v-slot:header>
          <header class="header">
            <h1>
              Elastic Draggable SVG Header Elastic Draggable SVG Header Elastic Draggable
              SVG Header Elastic Draggable SVG Header
            </h1>
            <p>
              with <a href="http://vuejs.org">Vue.js</a> +
              <a href="http://dynamicsjs.com">dynamics.js</a>
            </p>
          </header>
        </template>
        <template v-slot:content>
          <article class="content">
            <p>
              1.Note this is just an effect demo - there are of course many additional
              details if you want to use this in production, e.g. handling responsive
              sizes, reload threshold and content scrolling. Those are out of scope for
              this quick little hack. However, the idea is that you can hide them as
              internal details of a Vue.js component and expose a simple
              Web-Component-like interface.
            </p>
            <p>
              2.Note this is just an effect demo - there are of course many additional
              details if you want to use this in production, e.g. handling responsive
              sizes, reload threshold and content scrolling. Those are out of scope for
              this quick little hack. However, the idea is that you can hide them as
              internal details of a Vue.js component and expose a simple
              Web-Component-like interface.
            </p>
            <p>
              3.Note this is just an effect demo - there are of course many additional
              details if you want to use this in production, e.g. handling responsive
              sizes, reload threshold and content scrolling. Those are out of scope for
              this quick little hack. However, the idea is that you can hide them as
              internal details of a Vue.js component and expose a simple
              Web-Component-like interface.
            </p>
            <p>
              4.Note this is just an effect demo - there are of course many additional
              details if you want to use this in production, e.g. handling responsive
              sizes, reload threshold and content scrolling. Those are out of scope for
              this quick little hack. However, the idea is that you can hide them as
              internal details of a Vue.js component and expose a simple
              Web-Component-like interface.
            </p>
            <p>
              5.Note this is just an effect demo - there are of course many additional
              details if you want to use this in production, e.g. handling responsive
              sizes, reload threshold and content scrolling. Those are out of scope for
              this quick little hack. However, the idea is that you can hide them as
              internal details of a Vue.js component and expose a simple
              Web-Component-like interface.
            </p>
            <p>
              6.Note this is just an effect demo - there are of course many additional
              details if you want to use this in production, e.g. handling responsive
              sizes, reload threshold and content scrolling. Those are out of scope for
              this quick little hack. However, the idea is that you can hide them as
              internal details of a Vue.js component and expose a simple
              Web-Component-like interface.
            </p>
            <p>this is the end.</p>
          </article>
        </template>
      </draggable-header-view>
      <!-- <h4>注意:由于dynamics.js有些问题,暂时无法使用.以后用到再说</h4> -->
      <hr />
      <!-- <h5>最后的内嵌组件示例, TodoMVC, 基于vuejs 2.0 , 不模拟了, 烦呐!!</h5> -->
    </accordion-item>
    <accordion-item
      caption="jQuery 组件select2 内嵌到vue的示例.官方原版.options模式.
         对于firefox, 有点不正常.在于select2的问题. 以后再说"
      show
    >
      <!---->
      <div>
        <p>Selected: {{ selected }}</p>
        <jq-embed-select2 :options="options" v-model="selected">
          <option disabled value="0">Select one</option>
        </jq-embed-select2>
      </div>
    </accordion-item>
    <accordion-item caption="MVC 版本Todo, 根据官网改编">
      <todo-mvc />
    </accordion-item>
    <accordion-item caption="对svg的一些测试">
      <svg
        style="width: 600px; height: 500px; border: 5px solid red"
        viewBox="0 0 80 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>
          style内部或者width,height属性的设置, 被看做80个单位的宽度, 50个单位的高度.
          且两个方向的单位互相独立, 不相关.
        </title>
        <!--
  with relative unit such as percentage, the visual size
  of the square looks unchanged regardless of the viewBox
  -->
        <rect x="0" y="0" width="100%" height="100%" />

        <!--
  with a large viewBox the circle looks small
  as it is using user units for the r attribute:
  4 resolved against 100 as set in the viewBox
  -->
        <circle cx="50%" cy="50%" r="4" fill="white" />
      </svg>
      <hr />
      <svg
        viewBox="0 0 10 10"
        xmlns="http://www.w3.org/2000/svg"
        style="border: 5px solid red"
      >
        <!--
  with relative unit such as percentage, the visual size
  of the square looks unchanged regardless of the viewBox`
  -->

        <rect x="0" y="0" width="50%" height="100%" fill="brown" />

        <!--
  with a small viewBox the circle looks large
  as it is using user units for the r attribute:
  4 resolved against 10 as set in the viewBox
  -->
        <circle cx="50%" cy="50%" r="5" fill="blue" />
      </svg>
      <hr />
      <svg
        viewBox="-5 -5 10 10"
        xmlns="http://www.w3.org/2000/svg"
        style="border: 5px solid red"
      >
        <!--
  The point of coordinate 0,0 is now in the center of the viewport,
  and 100% is still resolve to a width or height of 10 user units so
  the rectangle looks shifted to the bottom/right corner of the viewport
  -->
        <rect x="0" y="0" width="100%" height="100%" />

        <!--
  With the point of coordinate 0,0 in the center of the viewport the
  value 50% is resolve to 5 which means the center of the circle is
  in the bottom/right corner of the viewport.
  -->
        <circle cx="50%" cy="50%" r="4" fill="white" />
      </svg>
    </accordion-item>
    <accordion-item
      caption="自定义svg图标,摘自官网https://github.com/sdras/vue-sample-svg-icons/"
      show
    >
      <svg-icon></svg-icon>
    </accordion-item>
  </accordion-hull>
</template>

<style lang="scss">
table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
}
.draggable-container {
  margin: 1em auto;
  width: 90%;
  background-color: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  color: #fff;
  font-size: 14px;
  font-weight: 300;
  .header {
    h1 {
      font-weight: 300;
      font-size: 1.8em;
      margin: 1em;
    }
    p {
      text-align: right;
      margin-right: 2em;
      a {
        color: #fff;
      }
    }
  }
  .content {
    width: 95%;
    color: #333;
    line-height: 1.5em;
    margin: 1em auto;
    padding: 0.5em;
  }
  svg {
    margin: 1em auto !important;
  }
}
</style>

<script lang="ts">
import { ref, defineComponent } from "vue";
import MarkdownEditor from "@/components/27-official-doc-sample/1-markdown-editor.vue";
import GithubSubmit from "@/components/27-official-doc-sample/2-github-submit.vue";
import AutoSortGrid from "@/components/27-official-doc-sample/3-auto-sort-grid.vue";
import SuperSortGrid from "@/components/27-official-doc-sample/3-super-sort-grid.vue";
import TreeItem from "@/components/27-official-doc-sample/4-tree-item.vue";
import TreeView from "@/components/27-official-doc-sample/4-tree-view/index.vue";
import SvgChart from "@/components/27-official-doc-sample/5-svg-chart/svg-chart.vue";
import ModalDialog from "@/components/27-official-doc-sample/6-modal-dialog.vue";
import DraggableHeaderView from "@/components/27-official-doc-sample/7-draggable-header-view.vue";
import JqEmbedSelect2 from "@/components/27-official-doc-sample/8-jq-embed-select2.vue";
import TodoMvc from "@/components/27-official-doc-sample/9-todo-mvc/view-controller.vue";
import SvgIcon from "@/components/27-official-doc-sample/10-svg-icon/index.vue";

import * as TV from "@/components/27-official-doc-sample/4-tree-view/data";
import { print, guidString } from "@/common/mixins/func";
const debug = true;

export default defineComponent({
  components: {
    MarkdownEditor,
    GithubSubmit,
    AutoSortGrid,
    SuperSortGrid,
    TreeItem,
    TreeView,
    SvgChart,
    ModalDialog,
    DraggableHeaderView,
    JqEmbedSelect2,
    TodoMvc,
    SvgIcon,
  },
  data() {
    return {
      /**
       * 同时用于auto-sort-grid和super-sort-grid 测试
       */
      searchQuery: "",

      //#region auto-sort-grid官方版 测试数据
      gridColumns: ["name", "power"],
      gridData1: [
        { name: "Chuck Norris", power: Infinity },
        { name: "Bruce Lee", power: 900 },
        { name: "Jackie Chan", power: 7000 },
        { name: "Jet Li", power: 8000 },
      ],
      //#endregion

      //#region super-sort-grid 测试数据
      gridData2: [
        {
          name: "Chuck Norris.Williams",
          power: Infinity,
          birth: new Date(1921, 3, 19),
          hehe: "only me ",
        },
        { name: "Bruce Lee", power: 900, birth: new Date(2021, 12, 23) },
        {
          name: "Jackie Chan",
          power: 7000,
          birth: new Date(1998, 3, 4),
          temp: "no such value",
        },
        { name: "Jet Li", power: 8000, birth: new Date(2010, 8, 19) },
      ],

      /**
       * 针对不同的列, 定制的比较器
       */
      compares: {
        birth: (first: Date, second: Date) => first.getDate() - second.getDate(),
        name: (first: string, second: string) => first.length - second.length,
      },
      //#endregion

      /**
       * tree-item 测试数据
       */
      treeData: {
        name: "My Tree",
        children: [
          { name: "hello" },
          { name: "wat" },
          {
            name: "child folder",
            children: [
              {
                name: "child folder",
                children: [{ name: "hello" }, { name: "wat" }],
              },
              { name: "hello" },
              { name: "wat" },
              {
                name: "child folder",
                children: [{ name: "hello" }, { name: "wat" }],
              },
            ],
          },
        ],
      },

      //#region tree-view 测试数据
      fullTree: {
        title: "top title",
        children: [
          {
            title: "first",
          },
          {
            title: "second",
            children: [
              {
                title: "second-1",
              },
              {
                title: "second-2",
                children: [
                  {
                    title: "second-2-1",
                  },
                  {
                    title: "second-2-2",
                    children: [
                      {
                        title: "second-2-2-1",
                      },
                      {
                        title: "second-2-2-2",
                      },
                    ],
                  },
                  {
                    title: "second-2-3",
                    children: [
                      {
                        children: [
                          {
                            title: "second-2-3-one,appending child prevented by customer",
                          },
                          {
                            title: "second-2-3-two,appending child prevented by customer",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      titleTree: {
        title: "only title",
      },
      emptyTree: {},
      undefinedTree: undefined,
      events: TV.events,
      //#endregion

      //#region svg-chart
      stats1: [
        { label: "A", distance: 100 },
        { label: "B", distance: -100 },
        { label: "C", distance: 100 },
        { label: "D", distance: 100 },
        { label: "E", distance: 100 },
        { label: "F", distance: 100 },
      ] as Stat[],

      //#endregion

      //#region modal dialog
      showModal: false,
      //#endregion

      //#region dragger-header
      headerBgColor: "#b94202",
      //#endregion

      //#region jq-embed-select2
      selected: 2,
      options: [
        { id: 1, text: "hello" },
        { id: 2, text: "world" },
      ],
      //#endregion

      //#region jq-embed-select2

      //#endregion
    };
  },
  methods: {
    //#region tree-item官方部分 event
    makeFolder: function (item: any) {
      item.children = [];
      this.addItem(item);
    },
    addItem: function (item: any) {
      item.children.push({
        name: "new stuff",
      });
    },
    //#endregion

    //#region tree-view 测试事件
    beforeCollapseChangedHandler: function (evt: TV.TreeNodeEvent) {
      if (evt.sender.title?.indexOf("-2-2") != -1 && evt.currentCollapse == false) {
        //不折叠包含 -2-2 的title 节点
        evt.cancel = true;
        print(debug, "prepare to change collapse status, but customer cancel it:", evt);
      }
    },
    afterCollapseChangedHandler: function (evt: TV.TreeNodeEvent) {
      print(
        debug,
        "collapse changed successfully.current collapse status:",
        evt.currentCollapse
      );
    },
    beforeLeafToBranchHandler: function (evt: TV.TreeNodeEvent) {
      print(debug, "prepare to convert leaf to branch...", evt);
      if (evt.sender.title?.indexOf("2-1") != -1) {
        evt.cancel = true;
      }
      if (evt.sender.title?.indexOf("staff") != -1) {
        evt.nextCollapse = true;
      }
    },
    afterLeafToBranchHandler: function (evt: TV.TreeNodeEvent) {
      print(
        debug,
        "leaf to branch successfully.current collapse status:",
        evt.currentCollapse,
        evt
      );
    },
    beforeAddItemHandler: function (evt: TV.TreeNodeEvent) {
      print(debug, "prepare to add item,", evt);
      if (evt.sender.title?.indexOf("second-2-3") != -1) {
        evt.cancel = true;
      }
      if (evt.sender.title?.indexOf("untitled")) {
        evt.newTitle = `hello,${guidString()}`;
      }
    },
    afterAddItemHandler: function (evt: TV.TreeNodeEvent) {
      print(debug, "add item successfully. new title is :", evt.newTitle);
    },

    //#endregion

    //#region modal dialog 关闭

    //#endregion
  },
  setup() {},
});
</script>

<summary>
  View形式的组件，还需要到/router/index.ts中注册，在App.vue的适当位置设置链接
  若引用到.js文件，使用import时，可能需要到shims-vue.d.ts中declare一下。
</summary>
