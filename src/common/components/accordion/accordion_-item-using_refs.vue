<template>
  <div class="accordion-item">
    <!--:id="headerId" 不能是这个方式-->
    <h3 class="accordion-header" ref="header">
      <button
        :data-bs-target="'#' + contentId"
        :aria-controls="contentId"
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        aria-expanded="false"
      >
        {{ caption }}
      </button>
    </h3>
    <!--:id="contentId" 同上-->
    <div
      :data-bs-parent="'#' + parentId"
      :aria-labelledby="headerId"
      :class="['accordion-collapse', 'collapse', show && 'show']"
      ref="content"
    >
      <section class="accordion-body">
        <slot>暂时未填写内容</slot>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
//注意，由于这里面用到vue 不支持的this.$refs属性，所以不能使用
//import {defineComponent} from "vue" 改良;
import { Options, Vue } from "vue-class-component";
//import Func from "@/common/mixins/func.vue"; //ok,but production failed
import { guidString as gs } from "@/common/mixins/func.ts"; //ok

@Options({
  //mixins: [Func],
  props: {
    caption: {
      type: String,
      required: false,
      default: "未命名caption",
    },
    show: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      headerId: "",
      contentId: "",
      parentId: "",
    };
  },
  mounted() {
    console.log("according-item mounting.....Unable to improve！");
    //this.headerId = gs();
    //this.contentId = gs();
    //this.headerId = this.guidString();  //production faild
    //this.contentId = this.guidString();

    this.$refs.header.id = this.headerId = gs();
    this.$refs.content.id = this.contentId = gs();

    //mounted事件，子组件先于父组件引发，而此时父组件id可能为空，
    //故在子组件获取父组件id，必须使用事件
    //否则，只能到子组件的beforeupdate或updated事件里获取，这样又浪费资源
    //注意，parentElement id 很重要，故应该监视其变化
    this.parentId = this.$el.parentElement.id;
    this.$el.parentElement.addEventListener("id-changed", () => {
      this.parentId = this.$el.parentElement.id;
    });
  },
  //methods: {
  //  //获取guid字符串,已使用func.vue混入
  //  guidString(): string {
  //    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
  //      const r = Math.random() * 16 | 0;
  //      const v = c == 'x' ? r : (r & 0x3 | 0x8);
  //      return 's' + v.toString(16);
  //    });
  //  },
  //},
})
export default class extends Vue {}
</script>
