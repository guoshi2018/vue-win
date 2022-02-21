<template>
  <div>
    <h3>this is first-parent-com</h3>
    <teleport to="body">
      <child-com name="John" />
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ChildCom from "@/components/18-teleport-apply/child-com.vue";

export default defineComponent({
  components: {
    ChildCom,
  },
});
</script>
