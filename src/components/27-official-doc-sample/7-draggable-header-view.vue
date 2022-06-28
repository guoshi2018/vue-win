<description>
  功能:
    实现伸缩性的header   
    根据官网原版改版, 使客户端不需要进行过多设置, 自适应header/content的实际宽度, 高度, 而无需设置

  属性:
    dragBlockColor : 拖拽块颜色, 字符串, 可选. 默认"rgb(170, 38, 231)", 接近紫色

  使用方法:
      <draggable-header-view
        class="draggable-container"
        :drag-block-color="headerBgColor"
      >
        <template v-slot:header>
          <header class="header">
            .......
          </header>
        </template>
        <template v-slot:content>
          <article class="content">
            ......
          </article>
        </template>
      </draggable-header-view>
  注意:
    template标签设置class/styel无效, 类似于组件内的slot标签设置无效一样
</description>
<template>
  <div
    class="draggable-header-view"
    @mousedown="startDrag"
    @touchstart="startDrag"
    @mousemove="onDrag"
    @touchmove="onDrag"
    @mouseup="stopDrag"
    @touchend="stopDrag"
    @mouseleave="stopDrag"
    ref="rootDiv"
  >
    <svg class="svgbg" :height="svgHeight">
      <path :d="pullBlockPath" :fill="dragBlockColor"></path>
    </svg>
    <div class="the-header" ref="headerDiv">
      <slot name="header"></slot>
    </div>
    <div class="the-content" :style="contentPosition">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.draggable-header-view {
  position: relative;
  overflow: hidden;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  .svgbg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%; //me
    z-index: 0; //不需要
  }
  .the-header,
  .the-content {
    position: relative;
    z-index: 1; //只要比.bg的高就可以
    //box-sizing: border-box; //这个是默认
    margin: 0;
    padding: 0;
  }
  .the-header {
    border: 1px solid transparent; //怪异:没有它,header内容高度计算不全
  }
}
</style>
<script lang="ts">
import { ref, Ref, reactive, defineComponent, computed, onMounted } from "vue";
import { getType, print } from "@/common/mixins/func";
import dynamics from "dynamics-js";

const debug = true;

export default defineComponent({
  components: {},
  props: {
    /**
     * 拉扯块的颜色
     */
    dragBlockColor: {
      type: String,
      default: "rgb(170, 38, 231)",
      required: false,
    },
  },
  setup(props, context) {
    const dragging = ref(false);

    const rootDiv = ref() as Ref<HTMLDivElement>;

    const headerDiv = ref() as Ref<HTMLDivElement>;

    // record drag start point
    const start = ref({ x: 0, y: 0 });

    /**
     * 拉扯块区域尺寸
     */
    const pullBlockSize = ref({ width: 0, height: 0 });

    // quadratic bezier control point
    const c = ref({ x: 0, y: 0 });

    onMounted(() => {
      pullBlockSize.value = {
        width: rootDiv.value.offsetWidth,
        height: headerDiv.value.offsetHeight,
      };

      c.value = { x: pullBlockSize.value.width / 2, y: pullBlockSize.value.height };

      //初始静止时,header容器(即svg)高度与拉扯块平齐
      //svgHeight.value = pullBlockSize.value.height;

      //  print(debug, "data....", pullBlockSize.value, c.value);
    });

    const pullBlockPath = computed(
      () =>
        // `M0,0 L320,0 320,${props.headerHeightInPixel}Q` +
        // c.value.x +
        // "," +
        // c.value.y +
        // ` 0,${props.headerHeightInPixel}`
        `M0,0 L${pullBlockSize.value.width},0 ` +
        `${pullBlockSize.value.width}, ${pullBlockSize.value.height}Q ` +
        `${c.value.x}, ${c.value.y} ` +
        `0, ${pullBlockSize.value.height}`
    );

    /**
     * 拉扯块的容器(即svg)高度,应与拉扯点的竖向位置同步
     */
    const svgHeight = computed(() => c.value.y);

    const contentPosition = computed(() => {
      //const dy = c.value.y - 160;
      //pullBlockSize.value.height是c.value.y的静止值.
      //所以根据dy正负判断, 这是下拉还是上推.
      const dy = c.value.y - pullBlockSize.value.height;
      const dampen = dy > 0 ? 2.2 : 2;
      print(debug, "adjust content position........................", dy / dampen);
      return {
        transform: "translate3d(0," + dy / dampen + "px,0)",
        //transform: "translate3d(0," + 800 + "px,0)",
      };
    });

    const startDrag = function () {
      const evt = arguments[0] as MouseEvent & TouchEvent;
      const e = evt.changedTouches ? evt.changedTouches[0] : evt;
      dragging.value = true;
      start.value.x = e.pageX;
      start.value.y = e.pageY;
    };
    const onDrag = function () {
      const evt = arguments[0] as MouseEvent & TouchEvent;
      const e = evt.changedTouches ? evt.changedTouches[0] : evt;
      if (dragging.value) {
        c.value.x = pullBlockSize.value.width / 2 + (e.pageX - start.value.x);
        // dampen vertical drag by a factor
        var dy = e.pageY - start.value.y;
        var dampen = dy > 0 ? 2.2 : 2;
        c.value.y = pullBlockSize.value.height + dy / dampen;
      }
    };
    const stopDrag = function () {
      if (dragging.value) {
        dragging.value = false;
        dynamics.animate(
          c.value,
          {
            x: pullBlockSize.value.width,
            y: pullBlockSize.value.height,
          },
          {
            type: dynamics.spring,
            duration: 700,
            friction: 280,
          }
        );
      }
    };

    return {
      svgHeight,
      rootDiv,
      headerDiv,
      pullBlockSize,
      dragging,
      c,
      start,
      pullBlockPath,
      contentPosition,

      startDrag,
      onDrag,
      stopDrag,
    };
  },
});
</script>
