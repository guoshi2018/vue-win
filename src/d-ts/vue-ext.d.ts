import { Store } from "vuex";
import { ComponentCustomProperties } from "@vue/runtime-core";
import AccordionHullVue from "@/common/components/accordion/accordion-hull.vue";
import AccordionItemVue from "@/common/components/accordion/accordion-item.vue";

import IconBaseVue from "@/common/components/icon/regular-icon/icon-base.vue";
import IconBoxVue from "@/common/components/icon/regular-icon/icon-box.vue";
import IconCalendarVue from "@/common/components/icon/regular-icon/icon-calendar.vue";
import IconEnvelopeVue from "@/common/components/icon/regular-icon/icon-envelope.vue";
import IconGarbageVue from "@/common/components/icon/regular-icon/icon-garbage.vue";
import IconImageVue from "@/common/components/icon/regular-icon/icon-image.vue";
import IconMoonVue from "@/common/components/icon/regular-icon/icon-moon.vue";
import iconWriteVue from "@/common/components/icon/regular-icon/icon-write.vue";

import IconHeartFaceVue from "@/common/components/icon/animated-icon/icon-heart-face.vue";
import IconPaletteVue from "@/common/components/icon/animated-icon/icon-palette.vue";
import IconScissorsVue from "@/common/components/icon/animated-icon/icon-scissors.vue";
import IconWatchVue from "@/common/components/icon/animated-icon/icon-watch.vue";

import { Guoshi } from "@/common/type/guoshi";

declare module "@vue/runtime-core" {

  export interface ComponentCustomProperties {
    /**
     * 整个项目的顶级store
     * 这里只是配合this.$store感知, 组合式还需要到项目的store文件内
     */
    $store: Store<Guoshi.Interfaces.StudentPro>;

    /**
     * 显示toast消息框
     */
    $toast: (opts?: Guoshi.Interfaces.ToastOptions) => void;

    /**
     * 在i18n中根据多个key, 查找适配的字符串
     */
    $translate: (keys: string) => string;
  }


  //实验证明,对于全局自定义组件的声明,
  //'vue'或'@vue/runtime-core', 搭配'ComponentCustomProperties'或'GlobalComponents'均可以
  //但官方推荐'@vue/runtime-core'搭配'GlobalComponents',
  //但也有不足: 属性无智能提示,自动完成. 甚至使用下面的方法,还是无效
  //原因是:ComponentCustomProperties设计用于声明全局属性类型，而不是全局组件类型
  //原文地址:https://juejin.cn/post/7066730414626308103
  //注意: 据说GlobalComponents只是在Volar中有定义, vue或 @vue/runtime-core中均为发现定义
  export interface GlobalComponents {
    // AccordionHull: typeof AH & {   //无效
    //   header: string | undefined,
    // };
    // AccordionItem: typeof AI & {
    //   caption: string | undefined
    // };

    AccordionHull: typeof AccordionHullVue;
    AccordionItem: typeof AccordionItemVue;

    IconBase: typeof IconBaseVue;
    IconBox: typeof IconBoxVue;
    IconCalendar: typeof IconCalendarVue;
    IconEnvelope: typeof IconEnvelopeVue;
    IconGarbage: typeof IconGarbageVue;
    IconImage: typeof IconImageVue;
    IconMoon: typeof IconMoonVue;
    IconWrite: typeof IconWriteVue;

    IconHeartFace: typeof IconHeartFaceVue;
    IconPalette: typeof IconPaletteVue;
    IconScissors: typeof IconScissorsVue;
    IconWatch: typeof IconWatchVue;
  }
}

