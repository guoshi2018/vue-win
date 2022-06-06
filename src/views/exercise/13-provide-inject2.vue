<template>
  <accordion-hull header="组合式 API 中使用 provide/inject。">
    <accordion-item caption="在 setup() 中使用 provide方法" show>
      <ul>
        <li>
          <span>location跟踪:{{ location }}</span>
          <span
            >geolocation跟踪:{{ geolocation.longitude }},{{
              geolocation.latitude
            }}</span
          >
        </li>
        <li>
          <span>父组件(provide端)发起修改:</span>
          location:<input type="text" v-model="location" /><br />
          longitude:<input
            type="number"
            v-model="geolocation.longitude"
          /><br />
          latitude:<input type="number" v-model="geolocation.latitude" /><br />
        </li>
        <li>
          <span>观察first-mark组件注入情况:</span>
          <first-mark></first-mark>
        </li>
        <li>
          <span
            >尽可能将对响应式 property 的所有修改限制在定义 provide
            的组件内部</span
          >
          <input type="button" @click="updateLocation" value="修改location" />
        </li>
      </ul>
    </accordion-item>
  </accordion-hull>
</template>

<script lang="ts">
/* eslint-disable no-dupe-class-members, no-dupe-keys */
import { provide, reactive, ref, readonly, defineComponent } from "vue";
// import AccordionHull from "@/components/accordion/accordion-hull.vue"; // 子组件 @ is an alias to /src
// import AccordionItem from "@/components/accordion/accordion-item.vue";
import FirstMark from "@/components/13-provide-inject2/FirstMark.vue";

export default defineComponent({
  components: {
    FirstMark,
  },
  setup() {
    //这样看不到provide和inject之间的响应性,也无法在消费端跟踪
    //provide('location', 'North Pole');
    //provide('geolocation', {
    //  longitude: 90,
    //  latitude:135,
    //});

    //为了增加 provide 值和 inject 值之间的响应性，我们可以在 provide 值时使用 ref 或 reactive。
    const location = ref("North Pole");
    const geolocation = reactive({
      longitude: 98,
      latitude: 146,
    });

    //尽可能将对响应式 property 的所有修改限制在定义 provide 的组件内部。
    const updateLocation = () => {
      location.value += " h";
      geolocation.longitude += 10;
      geolocation.latitude -= 10;
    };

    //provide('location', location);
    //确保不被inject方更改,可使用readonly.但inject方依然可以通过调用
    //provide方暴露的更新方法的方式修改.
    provide("location", readonly(location));

    provide("geolocation", geolocation);
    provide("updateLocation", updateLocation); //必要时provide出去

    return {
      location,
      geolocation,
      updateLocation,
    };
  },
});
</script>
