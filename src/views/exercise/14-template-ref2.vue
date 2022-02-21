<template>
  <accordion-hull header="组合式API的模板引用">
    <accordion-item
      caption="为了获得对模板内元素或组件实例的引用，我们可以像往常一样声明 ref 并从 setup() 返回"
      show
    >
      <ol>
        <li>
          <input type="button" value="打印所有的ref" @click="showAllRefs" />
        </li>
        <li>
          <span>返回ref</span>
          <first-model-ref ref="myFirst" />
          <input
            type="button"
            value="查询该组件的refs"
            @click="queryHtml($refs.myFirst)"
          />
        </li>
        <li>
          <span>返回模板(包含使用jsx)</span>
          <second-model-ref ref="mySecond" />
          <input
            type="button"
            value="查询该组件的refs"
            @click="queryHtml($refs.mySecond)"
          />
        </li>
        <li>
          <span>用于v-for之中</span>
          <third-model-ref />
        </li>
        <li>
          <span>侦听模板引用</span>
          <fourth-model-ref />
        </li>
        <li>
          <span>侦听模板配合flush</span>
          <fifth-model-ref />
        </li>
      </ol>
    </accordion-item>
  </accordion-hull>
</template>

<script lang="ts">
/* eslint-disable no-dupe-class-members, no-dupe-keys */
import { defineComponent } from "vue";
import AccordionHull from "@/components/accordion/accordion-hull.vue"; // 子组件 @ is an alias to /src
import AccordionItem from "@/components/accordion/accordion-item.vue";
import FirstModelRef from "@/components/14-template-ref2/first-model-ref.vue";
import SecondModelRef from "@/components/14-template-ref2/second-model-ref.vue";
import ThirdModelRef from "@/components/14-template-ref2/third-model-ref.vue";
import FourthModelRef from "@/components/14-template-ref2/fourth-model-ref.vue";
import FifthModelRef from "@/components/14-template-ref2/fifth-model-ref.vue";

export default defineComponent({
  methods: {
    showAllRefs() {
      console.clear();
      console.log("this.$refs:", this.$refs);
    },
    queryHtml(refName: any) {
      console.log(refName.$refs);
    },
  },
  computed: {},
  components: {
    AccordionHull,
    AccordionItem,
    FirstModelRef,
    SecondModelRef,
    ThirdModelRef,
    FourthModelRef,
    FifthModelRef,
  },
});
</script>
