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
//注意，由于这里面用到vue 不支持的this.$refs属性，所以改良起来变动较大，注意看
import { ref, onMounted, defineComponent } from "vue";
//import Func from "@/common/mixins/func.vue"; //ok,but production failed
import { guidString as gs } from "@/common/mixins/func"; //ok

export default defineComponent({
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
  setup(props, context) {
    const header = ref(null);
    const content = ref(null);
    const headerId = ref("");
    const contentId = ref("");
    const parentId = ref("");
    onMounted(() => {
      //this.$refs.header.id = this.headerId = gs();
      //this.$refs.content.id = this.contentId = gs();

      const docHeader = header.value as unknown as HTMLElement;
      const docContent = content.value as unknown as HTMLElement;
      docHeader.id = headerId.value = gs();
      docContent.id = contentId.value = gs();
      const docParent = docHeader.parentElement?.parentElement;
      if (docParent) {
        parentId.value = docParent.id;
        //mounted事件，子组件先于父组件引发，而此时父组件id可能为空，
        //故在子组件获取父组件id，必须使用事件
        //否则，只能到子组件的beforeupdate或updated事件里获取，这样又浪费资源
        //注意，parentElement id 很重要，故应该监视其变化
        docParent.addEventListener("id-changed", () => {
          parentId.value = docParent.id;
        });
      }
    });
    return {
      props,
      header,
      content,
      headerId,
      contentId,
      parentId,
    };
  },
});
</script>
