<template>
    <button @click="modalOpen = true">
      Open full screen modal!
    </button>
    <teleport to="body">
      <div v-if="modalOpen" class="tele-modal">
        <div>
          I'm a modal!
          <button @click="modalOpen = false">
            Close
          </button>
        </div>
      </div>
    </teleport>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  data() {
    return {
      modalOpen: false,
    };
  }
})
export default class HelloWorld extends Vue {}
</script>

<style scoped>
  .tele-modal {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width:80%;
    height:80%;
    margin:2px auto;
  }

    .tele-modal div {
      display: flex;
      flex-direction: row;
      align-items:center;
      justify-content:space-evenly;
      width: 80%;
      height: 80%;
      padding: 5px;
      background-color:darkgrey;
    }
</style>

