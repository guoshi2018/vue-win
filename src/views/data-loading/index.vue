<template>
  <div class="data-loading" v-show="requests">
    <img src="./imgs/(16).gif" />
    <span>未完成请求:{{ requests }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import loadingStore from "./store";
import LoadingStoreConst from "./const";
import { useStore } from "vuex";

export default defineComponent({
  setup(props, contxt) {
    const store = useStore();
    if (!store.hasModule(LoadingStoreConst.path)) {
      loadingStore.namespaced = true;
      store.registerModule(LoadingStoreConst.path, loadingStore);
    }
    // console.log("after,using data-loading store:", store);
    return {
      requests: computed(
        () =>
          store.getters[
            `${LoadingStoreConst.path}/${LoadingStoreConst.conduct.getters.requests}`
          ]
      ),
    };
  },
});
</script>

<style lang="scss" scoped>
.data-loading {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  background-color: rgba(37, 57, 94, 0.178);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
}
.data-loading img {
  width: 10em;
  height: 10em;
  max-width: 30vw;
  max-height: 30vw;
}
</style>
