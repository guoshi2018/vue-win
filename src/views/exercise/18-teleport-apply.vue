<template>
  <accordion-hull
    header="Teleport,允许我们控制在 DOM 中哪个父节点下渲染了 HTML"
  >
    <accordion-item caption="teleport技术">
      <dl>
        <dt>
          Vue 鼓励我们通过将 UI 和相关行为封装到组件中来构建
          UI。我们可以将它们嵌套在另一个内部， 以构建一个组成应用程序 UI 的树。
          然而，有时组件模板的一部分逻辑上属于该组件，而从技术角度来看，最好将模板的这一部分移动到
          DOM 中 Vue app 之外的其他位置。
          一个常见的场景是创建一个包含全屏模式的组件。在大多数情况下，你希望模态框的逻辑存在于组件中，
          但是模态框的快速定位就很难通过 CSS 来解决，或者需要更改组件组合。
        </dt>
        <dd>
          <span
            >不采用teleport技术的first-modal-dialog,模态框只能以最近的relative祖先定位</span
          >
          <div style="position: relative">
            <h2>Tooltips without Vue3 teleport technoligy!</h2>
            <div>
              <first-modal-dialog />
            </div>
          </div>
        </dd>
        <dd>
          <span>
            给first-modal-dialog的模态部分div加一层 &lt;teleport
            to='body'&gt;外套,即可实现全屏定位,
            与body为直接上级,而不用理会往上哪一级祖先具备position:relative.
          </span>
          <div style="position: relative">
            <h2>Tooltips without Vue3 teleport technoligy!</h2>
            <div>
              <second-modal-dialog />
            </div>
          </div>
        </dd>
      </dl>
    </accordion-item>
    <accordion-item caption="与components一起使用" show>
      <ol>
        <li>
          <span>
            插入&lt;teleport&gt;,不影响插入前存在的上下级组件的父子逻辑关系,也不影响prop的传递
          </span>
        </li>
        <li>
          <span>
            将child-com直接安插在first-parent-com中,并用teleport包裹child-com,
            注意此时渲染得到的html显示child-com和parent无父子关系,但逻辑上必然有,因为
            在parent中传递给child-com的prop已然收到
          </span>
          <first-parent-com />
        </li>
        <li>
          <span>
            second-parent中本身不包含child子组件,而是采用slot的方式,在此融合.效果同上
          </span>
          <second-parent-com>
            <teleport to="body">
              <child-com name="Bill Gates" />
            </teleport>
          </second-parent-com>
        </li>
        <li>
          在同一目标上使用多个
          teleport,如上所示,顺序将是一个简单的追加——稍后挂载将位于
          目标元素中较早的挂载之后,而且与该teleport包裹内容当前是否显示无关
        </li>
      </ol>
    </accordion-item>
  </accordion-hull>
</template>

<script lang="ts">
/* eslint-disable no-dupe-class-members, no-dupe-keys */
import { Options, Vue } from "vue-class-component";
import AccordionHull from "@/components/accordion/accordion-hull.vue"; // 子组件 @ is an alias to /src
import AccordionItem from "@/components/accordion/accordion-item.vue";
import FirstModalDialog from "@/components/18-teleport-apply/first-modal-dialog.vue";
import SecondModalDialog from "@/components/18-teleport-apply/second-modal-dialog.vue";
import FirstParentCom from "@/components/18-teleport-apply/first-parent-com.vue";
import SecondParentCom from "@/components/18-teleport-apply/second-parent-com.vue";
import ChildCom from "@/components/18-teleport-apply/child-com.vue";

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
    AccordionHull,
    AccordionItem,
    FirstModalDialog,
    SecondModalDialog,
    FirstParentCom,
    SecondParentCom,
    ChildCom,
  },
})
//export default class ComOrViewModel extends Vue { }     //ok
//由于只有一个导出，故可使用匿名的默认导出：
export default class extends Vue {}
</script>

<summary>
  View形式的组件，还需要到/router/index.ts中注册，在App.vue的适当位置设置链接
  若引用到.js文件，使用import时，需要到shims-vue.d.ts中declare一下。
</summary>
