
<template>
  <accordion-hull header="组合式API的模板引用">
    <accordion-item caption="为了获得对模板内元素或组件实例的引用，我们可以像往常一样声明 ref 并从 setup() 返回" show>
      <ol>
        <li>
          <span>返回ref</span>
          <first-model-ref />
        </li>
        <li>
          <span>返回模板(包含使用jsx)</span>
          <second-model-ref />
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
    <accordion-item caption="">

    </accordion-item>
    <accordion-item caption="">

    </accordion-item>
  </accordion-hull>
</template>

<script lang="ts">
  /* eslint-disable no-dupe-class-members, no-dupe-keys */

  import AccordionHull from '@/components/accordion/accordion-hull.vue'; // 子组件 @ is an alias to /src
  import AccordionItem from '@/components/accordion/accordion-item.vue';
  import FirstModelRef from '@/components/14-template-ref2/first-model-ref.vue';
  import SecondModelRef from '@/components/14-template-ref2/second-model-ref.vue';
  import ThirdModelRef from '@/components/14-template-ref2/third-model-ref.vue';
  import FourthModelRef from '@/components/14-template-ref2/fourth-model-ref.vue';
  import FifthModelRef from '@/components/14-template-ref2/fifth-model-ref.vue';

  export default {
    components: {
      AccordionHull,
      AccordionItem,
      FirstModelRef,
      SecondModelRef,
      ThirdModelRef,
      FourthModelRef,
      FifthModelRef,
    },
  };
</script>

<summary>
  View形式的组件，还需要到/router/index.ts中注册，在App.vue的适当位置设置链接
  若引用到.js文件，使用import时，需要到shims-vue.d.ts中declare一下。
</summary>

