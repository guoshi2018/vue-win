<template>
  <accordion-hull header="事件处理">
    <accordion-item
      caption="事件参数event,注意console(firefox显示有所不同,但就这么个意思)"
      show
    >
      <ul>
        <li>
          <input type="button" @click="warn" value="warn,事件参数采用默认" />
        </li>
        <li>
          <input
            type="button"
            @click="warn()"
            value="warn(),表示放弃事件参数，函数体内得到为undefined"
          />
        </li>
        <li>
          <input
            type="button"
            @click="warn('hello')"
            value="warn('...'),事件参数被替换为字符串"
          />
        </li>
        <li>
          <input
            type="button"
            @click="warn('hi', $event, 'hey', { a1: 188, birth: Date.now() })"
            value="warn('...',$event),自定义和原生事件参数兼而有之,甚至可以传递任意多个参数"
          />
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="多事件处理器">
      <button
        @click="warn($event), notice, warn('hello'), notice(), warn('hello')"
      >
        多个处理器依次执行,只写函数名称被忽略，重复方法也不放过
      </button>
    </accordion-item>
    <accordion-item
      caption="事件修饰符：.stop .prevent .capture .self .once .passive"
    >
      <ul>
        <li>
          <span>不修饰，观察a的点击事件的冒泡以及默认动作（打开href网页）</span>
          <span class="square" @click="queryTarget">
            <a
              @click="queryTarget"
              target="_blank"
              href="http://www.guitarchina.com"
              >吉他中国</a
            >
          </span>
        </li>
        <li>
          <span>.stop修饰符，阻止事件继续冒泡</span>
          <span class="square" @click="queryTarget">
            <a
              @click.stop="queryTarget"
              target="_blank"
              href="http://www.guitarchina.com"
              >吉他中国</a
            >
          </span>
        </li>
        <li>
          <span>.prevent修饰符，阻止默认动作（打开href网页）</span>
          <span class="square" @click="queryTarget">
            <a
              @click.prevent="queryTarget"
              target="_blank"
              href="http://www.guitarchina.com"
              >吉他中国</a
            >
          </span>
        </li>
        <li>
          <span
            >.stop和prevent修饰符并用,顺序随意，可阻止冒泡和默认动作（打开href网页）</span
          >
          <span class="square" @click="queryTarget">
            <a
              @click.stop.prevent="queryTarget"
              target="_blank"
              href="http://www.guitarchina.com"
              >吉他中国</a
            >
          </span>
        </li>
        <li>
          <span
            >.capture修饰符，使用事件捕获模式，即内部元素触发的事件先在此处理后，才交由内部元素处理</span
          >
          <span class="square" @click.capture="queryTarget">
            <input type="button" value="btn" @click="queryTarget" />
          </span>
        </li>
        <li @click="queryTarget">
          <span>
            .self修饰符，只当在 event.target
            是当前元素自身时触发处理函数,即不理会内部元素事件的冒泡,
            但冒泡至上级，不影响li的处理
          </span>
          <span class="square" @click.self="queryTarget">
            <input type="button" value="btn" @click="queryTarget" />
          </span>
        </li>
        <li>
          <span>.once修饰符，控制只处理一次</span>
          <span class="square" @click.capture="queryTarget">
            <input type="button" value="btn" @click.once="queryTarget" />
          </span>
        </li>
        <li>
          <span>
            .passive修饰符，表示事件的默认处理（例如a的打开href网页），
            不会等到手工定义的事件处理完毕才执行，而是立即触发.故不要和.prevent一起使用，
            否则会收到警告。不过该修饰符在pc浏览器端貌似无效,但据说能够提升移动端的性能
          </span>
          <input type="text" placeholder="heavy work时，无法响应输入" />
          <a
            @click="heavyWork"
            target="_blank"
            href="http://www.guitarchina.com"
            >common</a
          >
          <a
            @click.passive="heavyWork"
            target="_blank"
            href="http://www.guitarchina.com"
            >passive</a
          >
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="按键修饰符:">
      <ul>
        <li>
          <span
            >使用别名.enter .tab .delete .esc .space .up .down .left
            .right</span
          >
          <input
            @keyup.down="notice"
            type="button"
            value="聚焦后，按down arrow响应"
          />
        </li>
        <li>
          <span>使用原名，例如.page-down</span>
          <input
            @keyup.page-down="notice"
            type="button"
            value="聚焦后，按page down响应"
          />
        </li>
        <li>
          <span>
            系统修饰键：配合鼠标键盘事件。.ctrl .alt .shift
            .meta(对应win键或command键)
          </span>
          <input
            type="button"
            @keyup.alt.enter="notice"
            value="聚焦后抬起alt + enter触发"
          />
        </li>
        <li>
          <span>
            .exact修饰符，用以控制精确的系统修饰符组合。即不按多也不按少
          </span>
          <span>
            <input
              type="button"
              @click.ctrl="notice"
              value="无.exact修饰符，按下多个系统键，只要包含ctrl即可触发"
            />
            <input
              type="button"
              @click.ctrl.exact="notice"
              value="有.exact修饰符,有且只有ctrl键按下才触发"
            />
            <input
              type="button"
              @click.exact="notice"
              value="只有.exact修饰符，表示在无任何系统键按下才触发"
            />
          </span>
        </li>
        <li>
          <span> 鼠标按钮修饰符 .left .right .middle </span>
          <input
            type="button"
            @click.left="notice"
            value=".left修饰符，为默认的鼠标左键触发"
          />
          <input
            type="button"
            @click.right="notice"
            value=".right修饰符，右键触发"
          />
          <input
            type="button"
            @click.middle="notice"
            value=".middle修饰符，中建触发"
          />
          <input
            type="button"
            @click.left.right="notice"
            value=".left和.right并用，不触发"
          />
          <input
            type="button"
            @click.left.right.middle="notice"
            value="三个修饰符全中，也不触发"
          />
        </li>
      </ul>
    </accordion-item>
  </accordion-hull>
</template>

<script lang="ts">
/* eslint-disable no-dupe-class-members, no-dupe-keys */
import { defineComponent } from "vue";
import { print } from "@/common/mixins/func";
const debug = false;

export default defineComponent({
  methods: {
    warn(...args: Array<object> | any) {
      print(debug,"warn1 function called,all arguments are ", args);
    },
    notice() {
      print(debug,"notice funciton called", arguments);
    },
    queryTarget(evt: MouseEvent) {
      print(debug,
        "queryTarget called.currentTarget,relatedTarget,target  are :---------------------"
      );
      print(debug,evt.currentTarget, evt.relatedTarget, evt.target);
    },
    heavyWork() {
      const d1: number = Date.now();
      print(debug,"heavy work begin.", d1);

      let d2: number;
      do {
        d2 = Date.now();
      } while (d2 - d1 <= 3000);
      print(debug,"heavy work done.", d2);
    },
  },
  components: {},
});
</script>
