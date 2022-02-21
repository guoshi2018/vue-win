<template>
  <accordion-hull header="风琴组件测试">
    <accordion-item caption="测试栏目1-5" show>
      <ul>
        <li v-for="num in 5" :key="num">
          {{ num }}
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="测试栏目6-10" show>
      <ul>
        <li v-for="num in [6, 7, 8, 9, 10]" :key="num">
          {{ num }}
        </li>
      </ul>
    </accordion-item>
  </accordion-hull>
</template>

<script lang="ts">
/* eslint-disable no-dupe-class-members, no-dupe-keys */
import { Options, Vue } from "vue-class-component";
import AccordionHull from "@/components/accordion/accordion-hull.vue"; // 子组件 @ is an alias to /src
import AccordionItem from "@/components/accordion/accordion-item.vue";

@Options({
  components: {
    AccordionHull,
    AccordionItem,
  },
})
//export default class ComOrViewModel extends Vue { }     //ok
//由于只有一个导出，故可使用匿名的默认导出：
export default class extends Vue {}
</script>
