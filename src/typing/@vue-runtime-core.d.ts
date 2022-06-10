

import { Store } from 'vuex'


declare module '@vue/runtime-core' {


  // 为 `this.$store` 提供类型声明
  interface ComponentCustomProperties {

    /**
     * 智能感知this.$store, 
     */
    $store: Store<Guoshi.Types.Student>;

    /**
     * 显示toast消息框
     */
    $toast: (opts?: Guoshi.ToastOptions) => void;
  }
}
