<template>
  <transition name="md-dlg">
    <div class="md-dlg-mask">
      <div class="md-dlg-wrapper">
        <div class="md-dlg-container">
          <div class="md-dlg-header">
            <slot name="header"> default header </slot>
          </div>

          <div class="md-dlg-body">
            <slot name="body"> default body </slot>
          </div>

          <div class="md-dlg-footer">
            <slot name="footer"> default footer </slot>
            <button class="md-dlg-default-button" @click="$emit('close')">OK</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

export default defineComponent({
  components: {},
  //props: {},
  //setup(props, context) {},
});
</script>
<style lang="scss" scoped>
.md-dlg-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  .md-dlg-wrapper {
    display: table-cell;
    vertical-align: middle;
    .md-dlg-container {
      width: 25em;
      margin: 0px auto;
      padding: 1.25em 1.875em;
      background-color: #fff;
      border-radius: 1.25em;
      box-shadow: 0 0.25em 0.6em rgba(0, 0, 0, 0.67);
      font-family: Helvetica, Arial, sans-serif;
      .md-dlg-header {
        margin-top: 0;
      }

      .md-dlg-body {
        margin: 20px 0;
      }
      .md-dlg-footer {
        .md-dlg-default-button {
          display: block;
          margin: 1em auto;
          width: 4em;
        }
      }
    }
  }
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.md-dlg-enter-active,
.md-dlg-leave-active {
  transition: opacity 0.5s ease;
}

.md-dlg-enter-from,
.md-dlg-leave-to {
  opacity: 0;
}
</style>
