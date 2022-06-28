<template>
  <div>
    <h5>
      这里可以修改仅仅作为演示inject和provide可实现双向绑定,但实际应该将修改能力限制在定义provide的组件中
    </h5>
    <label for="loc_id">
      location(由于provide端已经使用readonly,故这里的修改不会反应到provide端):
    </label>
    <input id="loc_id" type="text" v-model="userLocation" /> <br />
    <label for="lgt_id">longitude(provide端未使用readonly):</label>
    <input id="lgt_id" type="number" v-model="userGeolocation.longitude" /><br />
    <label for="ltt_id">latitude(provide端未使用readonly): </label>
    <input id="ltt_id" type="number" v-model="userGeolocation.latitude" />
    <input
      type="button"
      value="子组件内调用provide的方法,可实现全部inject变量(包括location)的更新"
      @click="userUpdateLocation"
    />
  </div>
</template>

<script lang="ts">
import { inject, defineComponent } from "vue";

export default defineComponent({
  setup() {
    const userLocation = inject("location", "The Universe");
    const userGeolocation = inject("geolocation") as Record<string, number>;
    const userUpdateLocation = inject("updateLocation") as (payload: MouseEvent) => void;
    return {
      userLocation,
      userGeolocation,
      userUpdateLocation,
    };
  },
});
</script>
