<comments>
  基于prop-user，props改为一个对象
</comments>
<template>
  <div class="test">
    <h2>Hi,this is information of obj-user：</h2>
    <ul>
      <li>
        <span>$route.params = {{ $route.params }}</span>
      </li>
      <li>
        <span>$route.params.userId to property: userId --- {{ userInfo?.userId }}</span>
      </li>
      <li>
        <span
          >$route.params.userName to property: userName --- {{ userInfo?.userName }}</span
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-dupe-class-members, no-dupe-keys */
import { defineComponent, PropType } from "vue";

interface Info {
  userId: string;
  userName: string;
}
export default defineComponent({
  props: {
    userInfo: {
      type: Object as PropType<Info>,
      required: false,
    },
  },
});
</script>
