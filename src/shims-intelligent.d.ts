// import { Store } from '@/store';
// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     $store: Store<Student>,
//   }
// }

import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { IVueState, UserInfo, Author } from '@/store/types';
// // import AccordionHull from "@/components/accordion/accordion-hull.vue"; // 子组件 @ is an alias to /src
// // import AccordionItem from "@/components/accordion/accordion-item.vue";

declare module '@vue/runtime-core' {
  // 声明自己的 store state
  interface Student {
    ModA: IVueState,
    ModB: UserInfo,
    ModC: Author,
  }


  // 为 `this.$store` 提供类型声明
  interface ComponentCustomProperties {

    $store: Store<Student>;
  }

  // interface MethodOptions {
  //   $toast: (opts: IOptions) => void;
  // }

  // interface ComponentCustomOptions {
  //   components: {
  //     
  //     
  //   },
  // }
}
