<comments>
  基于com-user，将route.params设置为组件的props
</comments>
<template>
  <div class="test">
    <h2>Hi,this is information of prop-user：</h2>
    <ul>
      <li>
        <span>$route.params = {{ $route.params }}</span>
      </li>
      <li>
        <span>$route.query = {{ $route.query }}</span>
      </li>
      <li>
        <span>$route.meta = {{ $route.meta }}</span>
      </li>
      <li>
        <span>$route.params.userId to property: userId --- {{ userId }}</span>
      </li>
      <li>
        <span>$route.params.userName to property: userName --- {{ userName }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-dupe-class-members, no-dupe-keys */
import { defineComponent } from "vue";

export default defineComponent({
  props: ["userId", "userName"],
});
</script>
