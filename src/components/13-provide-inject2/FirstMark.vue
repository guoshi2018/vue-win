<template>
  <div>
    <h5>这里可以修改仅仅作为演示inject和provide可实现双向绑定,但实际应该将修改能力限制在定义provide的组件中</h5>
    <label for=" loc_id">location:</label><input id="loc_id" type="text" v-model="userLocation" /><br />
    <label for="lgt_id">longitude:</label><input id="lgt_id" type="number" v-model="userGeolocation.longitude" /><br />
    <label for="ltt_id">latitude:</label><input id="ltt_id" type="number" v-model="userGeolocation.latitude" />
    <input type="button" value="子组件内调用provide方的方法,实现location的更新" @click="userUpdateLocation" />
  </div>
</template>

<script lang="ts">
  import { inject } from 'vue';

  export default {
    setup() {
      const userLocation = inject('location', 'The Universe');
      const userGeolocation = inject('geolocation');
      const userUpdateLocation = inject('updateLocation');
      return {
        userLocation,
        userGeolocation,
        userUpdateLocation,
      };
    }
  }
</script>

