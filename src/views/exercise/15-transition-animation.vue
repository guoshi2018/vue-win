
<template>
  <accordion-hull header="过渡&动画概述">
    <accordion-item caption="基于 class 的动画和过渡">
      <ol>
        <li>
          <span>
            Push this button to do something you shouldn't be doing:
          </span>
          <div :class="{shake:noActived}">
            <button @click="noActived = !noActived">Click me</button>
            <span v-if="noActived">Oh no!</span>
          </div>
        </li>
      </ol>
    </accordion-item>
    <accordion-item caption="一些过渡效果可以通过插值的方式来实现，例如在发生交互时将样式绑定到元素上。">
      <div @mousemove="coordinate"
           :style="{backgroundColor:`hsl(${(x+y)/2},80%,50%)`}"
           class="movearea">
        <h3>Move your mouse across the screen...</h3>
        <span>x:{{x}},y:{{y}}</span>
      </div>
    </accordion-item>
    <accordion-item caption="纯css的缓动效果">
      <button class="easing-button">Hover me </button>
    </accordion-item>
    <accordion-item show caption="缓动效果也可以用来表达动画元素的材质">
      <h2>注意,compass变量导入有错,暂时不能运行</h2>
      <div class='container'>
        <div class='unit'>
          <div class='ball ball1'></div>
          <div class='ball-shadow'></div>
        </div>
        <div class='unit'>
          <div class='ball ball2'></div>
          <div class='ball-shadow'></div>
        </div>
      </div>
      <div class='overlay'></div>
    </accordion-item>
  </accordion-hull>
</template>

<script lang="ts">
  /* eslint-disable no-dupe-class-members, no-dupe-keys */
  import { Options, Vue } from 'vue-class-component'
  import AccordionHull from '@/components/accordion/accordion-hull.vue' // 子组件 @ is an alias to /src
  import AccordionItem from '@/components/accordion/accordion-item.vue';

  // interface Data {
  // }
  // type Yyy = {
  // };
  @Options({
    data() {
      return {
        noActived: false,
        x: 0,
        y: 0,
      };
    },
    // data()也可以这样写：
    // data () {
    //   return {

    //   } as Data
    // },
    // mounted (): void {
    // },
    methods: {
      coordinate(evt: MouseEvent) {
        this.x = evt.clientX;
        this.y = evt.clientY;
      }
    },
    components: {
      AccordionHull,
      AccordionItem,
    },
  })
  //export default class ComOrViewModel extends Vue { }     //ok
  //由于只有一个导出，故可使用匿名的默认导出：
  export default class extends Vue { }
</script>

<style lang="css" scoped>
  .shake {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    /*以下任意一个，实现对元素进行硬件加速 */
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
  }

  @keyframes shake {
    10%,90% {
      transform: translate3d(-1px,0,0);
    }

    30%,50%,70% {
      transform: translate3d(-4px,0,0,0);
    }

    40%, 60% {
      transform: translate3d(4px,0,0);
    }
  }

  .movearea {
    transition: 0.2s background-color ease;
    height:8em;
  }
</style>

<style scoped lang="scss">
  .easing-button {
    background: #1b8f5a;
    transition: background 0.25s ease-in;
    border-radius: 4px;
    display: inline-block;
    border: none;
    padding: 0.75rem 1rem;
    margin: 0;
    text-decoration: none;
    color: #ffffff;
    font-family: sans-serif;
    font-size: 1rem;
    cursor: pointer;
    text-align: center;
    -webkit-appearance: none;
    -moz-appearance: none;

    &:hover, &:focus {
      transition: background 0.3s ease-out;
      background: #3eaf7c;
    }

    &:focus {
      outline: 1px solid #fff;
      outline-offset: -4px;
    }
  }
</style>

<style scoped lang="scss">
  @import "compass/css3";
  /*
  .container {
    width: 500px;
    margin: 10px auto;
    border: 1px solid #333;
    height: 280px;
    background: #111;
    overflow: hidden;
  }

  .unit {
    float: left;
    width: 249px;
    height: 280px;
    background-color: #222426; // Old browsers
    @include filter-gradient(#222426, #111111, horizontal); // IE6-9 fallback on horizontal gradient
    @include background-image(radial-gradient(center, ellipse cover, #222426 0%,#111111 100%));

    &:first-child {
      border-right: 1px solid #333;
    }
  }

  .overlay {
    position: absolute;
    background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/grain.png");
    top: 10px;
    width: 500px;
    height: 280px;
    left: 50%;
    margin-left: -250px;
    z-index: 1000;
    opacity: 0.11;
    animation: filmgrain 0.4s steps(3) infinite;
  }

  .ball {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #959595; // Old browsers
    @include filter-gradient(#959595, #494949, horizontal); // IE6-9 fallback on horizontal gradient
    @include background-image(radial-gradient(center, ellipse cover, #959595 0%,#4e4e4e 79%,#494949 100%));
    transform: translateZ(0);
    margin: 30px auto;
    position: relative;
    z-index: 300;
  }

  .ball-shadow {
    position: absolute;
    width: 50px;
    height: 5px;
    border-radius: 50%;
    background: #000;
    top: 280px;
    margin-left: 100px;
    z-index: 2;
    opacity: 0;
    box-shadow: 0 0 10px 5px rgba(0,0,0,0.2);
    animation: boom 1.6s 0.7s ease-in-out infinite;
  }

  @keyframes boom {
    50% {
      opacity: 0.8;
    }
  }

  @keyframes filmgrain {
    100% {
      background-position: 200% 0%;
    }
  }*/
</style>

<summary>
  View形式的组件，还需要到/router/index.ts中注册，在App.vue的适当位置设置链接
  若引用到.js文件，使用import时，需要到shims-vue.d.ts中declare一下。
</summary>

