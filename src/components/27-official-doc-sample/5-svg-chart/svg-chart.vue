<template>
  <section
    v-if="debugInput || debugMeter || debugAxisLabel || debugAxisSoloOld || debugAxisSolo"
  >
    <h3>正在测试....</h3>
    <div v-if="debugInput">
      <h4>测试 原生input 的 value :value v-model model-value :model-value的关系</h4>
      <ul>
        <li>
          <span>use value="static hello"</span>
          <input type="text" value="static hello" /><br />
        </li>
        <li>
          <span>use :value="words_single"</span>
          <input type="text" :value="words_single" /><br />
        </li>
        <li>
          <span>use value="static hello" and :value="words_single" at the same time</span>
          ----------not allowed!<br />
          <!--
      <input type="text" value="static hello" :value="words_single" />-->
        </li>
        <li>
          <span>use v-model="words_both"</span>
          <input type="text" v-model="words_both" /><br />
        </li>
        <li>
          <span>use v-model:model-value="words_both"</span>
          ----------------not allowd!<br />
          <!--
      <input type="text" v-model:model-value="words_both" />-->
        </li>
        <li>
          <span>use model-value="static hello". **********but ignored.</span>
          <input type="text" model-value="static hello" /><br />
        </li>
        <li>
          <span>use :model-value="words_both". **********but ignored.</span>
          <input type="text" :model-value="words_both" /><br />
        </li>
        <li>
          <span>use v-model="words_both" value="hi".</span>
          -------------not allowed<br />
          <!--
      <input type="text" v-model="words_both" value="hi" /> -->
        </li>

        <li>
          <span>use v-model="words_both" :value="words_single"</span>
          -------------not allowed<br />
          <!--
      <input type="text" v-model="words_both" :value="words_single" />-->
        </li>
        <li>
          <h4 class="conclusion">
            综上所述,原生 input 只有以下三种写法有效且不被忽略, 同时,
            这三种写法任意两种都无法共存
          </h4>
          <ul>
            <li>value="static hello"</li>
            <li>:value="words_single",其中words_single是字符串变量</li>
            <li>v-model="words_both",其中words_both是字符串变量</li>
          </ul>
        </li>
      </ul>
      <hr />
    </div>
    <div v-if="debugMeter">
      <h4 class="conclusion">原生meter测试, 不支持v-model双向 绑定</h4>
      <meter :value="mv" min="0" max="100" />
      <input type="number" v-model="mv" />
      <span>监控: {{ mv }}</span>
      <hr />
    </div>
    <div v-if="debugAxisLabel">
      <h4 class="conclusion">
        测试axis-label,双向绑定,v-model:model-value="mv"或者v-model="mv"均可,
        v-model:value="mv"不行, 因其内部未曾实现value的映射
      </h4>
      <axis-label
        :min="200"
        :max="0"
        @request-delete="alRequestDeleteHandler"
        @value-changed="alValueChangedHandler"
        v-model="mv"
      />
      <hr />
    </div>
    <div v-if="debugAxisSoloOld">
      <h4 class="conclusion">
        测试axis-solo-old:详细测试略, 总之由于开发原理比较原始,
        虽然功能行为与axis-solo完全一致,但已遭废弃
      </h4>
      <hr />
    </div>
    <div v-if="debugAxisSolo">
      <h4>测试axis-solo</h4>
      <ul>
        <li>
          <span>定值初始化, 则无响应. :value="97"形式. 可点击拖拽当前值: 正常</span>
          <axis-solo
            v-if="debugAxisSolo"
            @value-changed="alValueChangedHandler"
            max="100"
            min="0"
            low="55"
            optimum="32"
            high="83"
            :value="97"
          />
        </li>
        <li>
          <span>
            定值初始化, 则无响应. :model-value="97"形式. 可点击拖拽当前值: 正常.
            但由于书写麻烦,一般不这样用
          </span>
          <axis-solo
            v-if="debugAxisSolo"
            @value-changed="alValueChangedHandler"
            max="100"
            min="0"
            low="55"
            optimum="32"
            high="83"
            :model-value="97"
          />
        </li>
        <li>
          <span>
            变量初始化, :value="mv"形式, 形成单向绑定. 响应, 点击拖拽当前值均正常.
          </span>
          <axis-solo
            v-if="debugAxisSolo"
            @value-changed="alValueChangedHandler"
            max="100"
            min="0"
            low="55"
            optimum="32"
            high="83"
            :value="mv"
          />
        </li>
        <li>
          <span>
            变量初始化, :model-value="mv"形式, 形成单向绑定. 响应, 点击拖拽当前值均正常.
            但由于书写麻烦,一般不这样用
          </span>
          <axis-solo
            v-if="debugAxisSolo"
            @value-changed="alValueChangedHandler"
            max="100"
            min="0"
            low="55"
            optimum="32"
            high="83"
            :model-value="mv"
          />
        </li>
        <li>
          <span>
            变量初始化并绑定, v-model:value="mv"形式, 形成双向绑定. 响应,
            点击拖拽当前值均正常. 但由于书写麻烦,一般不这样用
          </span>
          <axis-solo
            v-if="debugAxisSolo"
            @value-changed="alValueChangedHandler"
            max="100"
            min="0"
            low="55"
            optimum="32"
            high="83"
            v-model:value="mv"
          />
        </li>
        <li>
          <span>
            变量初始化并绑定采用标准格式,
            v-model="mv"其实就是v-model:modelValue的简写形式, 形成双向绑定.
            响应,点击拖拽当前值均正常. 推荐使用的形式
          </span>
          <axis-solo
            v-if="debugAxisSolo"
            @value-changed="alValueChangedHandler"
            max="100"
            min="0"
            low="55"
            optimum="32"
            high="83"
            v-model="mv"
          />
        </li>
        <li>
          <span> 如果:value="10" 和:modelValue="80"并存,则modelValue享有优先权 </span>
          <axis-solo
            v-if="debugAxisSolo"
            @value-changed="alValueChangedHandler"
            max="100"
            min="0"
            low="55"
            optimum="32"
            high="83"
            :value="10"
            :model-value="80"
          />
        </li>
        <li>
          <span>
            如果:value="mv" 和:modelValue="mv2"并存,则modelValue享有优先权,
            这可通过whichForMeterValue看出
          </span>
          <axis-solo
            v-if="debugAxisSolo"
            @value-changed="alValueChangedHandler"
            max="100"
            min="0"
            low="55"
            optimum="32"
            high="83"
            :value="mv"
            :model-value="mv2"
          />
        </li>
        <li>
          <span>
            如果v-model:value="mv" 和v-model="mv2"并存,则v-model享有优先权,
            因为v-model采用的是modelValue映射到内部meter的value,
            这可通过whichForMeterValue看出
          </span>
          <axis-solo
            v-if="debugAxisSolo"
            @value-changed="alValueChangedHandler"
            max="100"
            min="0"
            low="55"
            optimum="32"
            high="83"
            v-model:value="mv"
            v-model="mv"
          />
        </li>
        <li>
          <span>
            如果v-model:value="mv" 和:model-value="mv2"并存,则v-model享有优先权,
            v-model:value仍然被忽略, 仍然保持model-value的单向绑定
          </span>
          <axis-solo
            v-if="debugAxisSolo"
            @value-changed="alValueChangedHandler"
            max="100"
            min="0"
            low="55"
            optimum="32"
            high="83"
            v-model:value="mv"
            :model-value="mv"
          />
        </li>
        <li>
          <span>
            如果:value="mv" 和v-model="mv2"并存,则v-model享有优先权, :value仍然被忽略,
            保持model-value的双向绑定
          </span>
          <axis-solo
            v-if="debugAxisSolo"
            @value-changed="alValueChangedHandler"
            max="100"
            min="0"
            low="55"
            optimum="32"
            high="83"
            :value="mv"
            v-model="mv"
          />
        </li>
        <li>
          <h4 class="conclusion">
            综上所述, axis-solo组件, 无论静态初始化还是单向,双向绑定,
            :model-value,和v-model享有绝对的优先权
          </h4>
        </li>
      </ul>
      <hr />
    </div>
  </section>
  <section v-else class="run">
    <div class="first">
      <svg :width="svgsize.first.size.width" :height="svgsize.first.size.height">
        <g>
          <polygon :points="points1"></polygon>
          <circle
            :cx="svgsize.first.center.x"
            :cy="svgsize.first.center.y"
            :r="svgsize.first.radius"
          ></circle>
        </g>
      </svg>
      <div class="control">
        <p v-for="(stat, index) in stats1" :key="index">
          <span>{{ stat.label }}</span>
          <axis-solo
            v-model="stat.distance"
            min="0"
            :max="svgsize.first.radius"
            :low="svgsize.first.radius * 0.53"
            :high="svgsize.first.radius * 0.82"
            :optimum="svgsize.first.radius * 0.48"
          />
          <span>{{ stat.distance.toFixed(1) }}</span>
          <input type="button" value="delete" @click="deleteHandler(stat)" />
        </p>
        <form class="add">
          <input type="text" name="new-label" v-model="newLabel" />
          <input type="number" name="new-distance" v-model="newDistance" />
          <input type="button" name="add" @click="addHandler" value="add state" />
        </form>
        <footer>{{ points1 }}</footer>
      </div>
    </div>
    <div class="data">
      <pre>{{ stats1 }}</pre>
    </div>
    <div class="second">
      <svg>
        <g>
          <line
            v-for="(p, index) in points2Arr"
            :key="index"
            :x1="svgsize.second.center.x"
            :y1="svgsize.second.center.y"
            :x2="p.x"
            :y2="p.y"
          ></line>
          <circle
            @mousedown="circleMousedownHandler"
            @mousemove="circleMousemoveHandler"
            :cx="svgsize.second.center.x"
            :cy="svgsize.second.center.y"
            :r="svgsize.second.max"
          ></circle>
        </g>
      </svg>
      <div class="control">
        <form>
          <p>
            <label for="input-max">input max:</label>
            <input name="input-max" type="number" v-model="svgsize.second.max" />
          </p>

          <p>
            <label for="input-x">input x:</label>
            <input name="input-x" type="number" v-model="svgsize.second.center.x" />
          </p>

          <p>
            <label for="input-y">input y:</label>
            <input name="input-y" type="number" v-model="svgsize.second.center.y" />
          </p>

          <p>
            <label for="ax-parts">adjust parts:</label>
            <axis-solo
              min="0"
              max="100"
              low="52"
              high="82"
              v-model="svgsize.second.parts"
            />
            <span>{{ Math.floor(svgsize.second.parts) }}</span>
          </p>
        </form>
      </div>
      <div class="data">
        <pre>{{ points2Arr }}</pre>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, PropType, computed, onUnmounted } from "vue";
import AxisLabel from "./axis-label.vue";
import AxisSolo from "./axis-solo.vue";
import * as Axis from "./axis-data";

import { print, pointsAround, pointFrom } from "@/common/mixins/func";
const debug = true;

export default defineComponent({
  components: { AxisLabel, AxisSolo },
  props: {
    debugInput: Boolean,
    debugMeter: Boolean,
    debugAxisLabel: Boolean,
    debugAxisSoloOld: Boolean,
    debugAxisSolo: Boolean,
    stats1: {
      type: Object as PropType<Array<Stat>>,
      required: true,
      //任意一个最大距离不能小于0,怪异:此会扰乱ts智能感知, 设置频频报错
      // validator(states: Array<Stat>) {
      //   return !states.some((v) => {
      //     return v.distance < 0;
      //   });
      // },
    },
  },
  setup(props, context) {
    //#region debug
    const mv = ref(10);
    const mv2 = ref(30);

    const words_single = ref("single dir responsable text");
    const words_both = ref("both dir responsable text");

    const alValueChangedHandler = (evt: Axis.AxisEvent) => {
      print(debug, "value changed:", evt);
    };
    const alRequestDeleteHandler = (evt: Axis.AxisEvent) => {
      print(debug, "info...", evt, evt.meter?.max, evt.meter?.min, evt.meter?.value);
      if (Date.now() % 3 == 0) {
        print(debug, "now delete axis label", evt);
        evt.sender?.remove();
      } else {
        print(debug, "sorry,deleting was ignored.", evt);
      }
    };
    //#endregion

    //#region svg-chart

    //#region common
    const base = 260,
      gap = 15;
    const svgsize = ref({
      first: {
        center: {
          x: base / 2,
          y: base / 2,
        },
        size: {
          width: base,
          height: base,
        },
        radius: base / 2 - gap,
      },
      second: {
        center: {
          x: base / 2,
          y: base / 2,
        } as Point,
        max: base / 2 - gap,
        parts: 48, //圆周平均分成几份
      },
    });
    //#endregion
    //#region first
    const points1 = computed(() => {
      const ang = 360 / props.stats1.length;
      return props.stats1
        .map((stat, idx) => {
          return pointFrom(
            { x: svgsize.value.first.center.x, y: svgsize.value.first.center.y },
            stat.distance,
            idx * ang
          );
        })
        .reduce((prev, curr) => {
          return `${prev} ${curr.x},${curr.y}`;
        }, "");
    });

    const deleteHandler = function (stat: Stat) {
      if (props.stats1.length > 3) {
        /* eslint-disable-next-line vue/no-mutating-props */
        props.stats1.splice(props.stats1.indexOf(stat), 1);
      } else {
        print(debug, "deletion to limit");
      }
    };

    const newLabel = ref(""),
      newDistance = ref(100);
    const addHandler = function (evt: MouseEvent) {
      if (newLabel.value.length && newDistance.value) {
        /* eslint-disable-next-line vue/no-mutating-props */
        props.stats1.push({
          label: newLabel.value,
          distance: newDistance.value,
        } as Stat);
        // newLabel.value = "";
        // newDistance.value = 100;
      }
    };
    //#endregion

    //#region second

    //#region 静态显示, 可以与下面的动态实时显示互换
    // const points2Arr = computed(() =>
    //   pointsAround(
    //     svgsize.value.second.center,
    //     svgsize.value.second.parts,
    //     -Math.abs(svgsize.value.second.max)
    //   )
    // );
    //#endregion

    //#region 动态实时显示,可与上面的静态显示互换
    const points2Arr = ref<Point[]>([]);
    const timer = ref(
      setInterval(() => {
        points2Arr.value = pointsAround(
          svgsize.value.second.center,
          svgsize.value.second.parts,
          -Math.abs(svgsize.value.second.max)
        );
      }, 200)
    );
    onUnmounted(() => {
      if (timer.value) {
        clearInterval(timer.value as NodeJS.Timeout);
      }
    });
    //#endregion

    //#region 实现鼠标左键拖动circle,
    let centerStart: Point, mouseStart: Point;
    const circleMousedownHandler = function (evt: MouseEvent) {
      if (evt.buttons & 1) {
        centerStart = {
          x: svgsize.value.second.center.x,
          y: svgsize.value.second.center.y,
        };
        mouseStart = {
          x: evt.offsetX,
          y: evt.offsetY,
        };
      }
    };
    const circleMousemoveHandler = function (evt: MouseEvent) {
      if (evt.buttons & 1) {
        svgsize.value.second.center.x = centerStart.x + (evt.offsetX - mouseStart.x);
        svgsize.value.second.center.y = centerStart.y + (evt.offsetY - mouseStart.y);
      }
    };
    //#endregion

    //#endregion

    //#endregion

    return {
      //#region debug
      mv,
      mv2,
      alValueChangedHandler,
      alRequestDeleteHandler,

      words_single,
      words_both,
      //#endregion

      svgsize,
      points1,

      deleteHandler,
      addHandler,
      newLabel,
      newDistance,

      points2Arr,
      timer,
      circleMousedownHandler,
      circleMousemoveHandler,
    };
  },
});
</script>
<style lang="scss" scoped>
ul {
  list-style: decimal;
}
.conclusion {
  background-color: rgb(196, 195, 201);
  color: rgb(22, 14, 6);
}

section.run {
  border: 1px solid rgb(206, 13, 109);
  //  position: relative;
  display: flex;
  align-content: flex-end;
  .first,
  .second {
    border: 1px solid green;
    width: 40%;
    svg {
      border: 1px solid rgb(92, 48, 12);
      margin: 1em 1em;
      fill: transparent;
      stroke: red;
      circle {
        stroke: #999;
        cursor: move;
      }
      polygon {
        fill: rgb(201, 114, 56);
        opacity: 0.73;
      }
    }
    .control {
      margin-top: 1em;
      input {
        width: auto !important;
        margin-right: 1em;
      }
      form p {
        margin-left: 2em;
        label {
          width: 10em;
          font-weight: bolder;
        }
      }
    }
  }

  .second svg {
    width: 90%;
    height: 40em;
    margin-left: auto;
    margin-right: auto;
    display: block;
    overflow: scroll;
  }

  div.data pre {
    margin: 2em;
  }
  span {
    margin: 0 1.2em;
  }
}
</style>
