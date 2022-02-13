
<template>
  <accordion-hull header="Provide和Inject,用于解决组件嵌套时的属性值传递问题">
    <accordion-item caption="provide提供，inject接收" show>
      <dl>
        <dt>
          provide以对象的字段提供，inject以数组元素接收实验证明,provide端提供的字段如果未在data中注册,全部是undefined
          user: 'guoshi',
          visitors: this.visitors,
          count: this.visitors.length,
          age: this.age,
        </dt>
        <dd>
          <span>user未在data中定义,所以 user == undefined : {{user == undefined}}</span>
          <span>visitors,在data中已定义,所以打印的其实是data内的,非undefined:{{visitors}}</span>
          <span>count,在data中未定义,虽然取值是visitors.length,在此仍然未undefined, 即 count== undefined :{{count == undefined}}</span>
          <span>age,与visitors类似,非undefined:{{age}}</span>
        </dd>
        <dd>
          <first-layer>
            <second-layer>
              <third-layer>
                <fourth-layer></fourth-layer>
              </third-layer>
            </second-layer>
          </first-layer>
        </dd>
        <dt>
          通常情况下，改变提供方的实例属性，被inject的组件，是不会察觉，即provide/inject绑定不是响应式的。
        </dt>
        <dd>
          <input type="button" value="添加vistors数组元素，上面fourth-layer的count并不会变化" @click="addVisitor" />
          <br />current visitors:{{visitors}}
        </dd>
        <dt>
          分配一个组合式API computed property，则可以实现响应式，例如age字段
          (官方文档这么说，但是对于单文件组件Vue.computed方法报告错误：未定义。所以暂时放弃)
          故将引用传递的对象或数组，作为provide的字段，则可以实现响应式。例如上述的visitors数组。
          单文件组件下的组合式api中使用provide/inject示范,参看13-provide-inject2.vue
        </dt>
        <dd>
          byebye
        </dd>
      </dl>
    </accordion-item>
    <accordion-item caption="">

    </accordion-item>
    <accordion-item caption="">

    </accordion-item>
  </accordion-hull>
</template>

<script lang="ts">
  /* eslint-disable no-dupe-class-members, no-dupe-keys */
  import { Options, Vue, } from 'vue-class-component'
  import AccordionHull from '@/components/accordion/accordion-hull.vue' // 子组件 @ is an alias to /src
  import AccordionItem from '@/components/accordion/accordion-item.vue';
  import FirstLayer from '@/components/13-provide-inject/first-layer.vue';
  import SecondLayer from '@/components/13-provide-inject/second-layer.vue';
  import ThirdLayer from '@/components/13-provide-inject/third-layer.vue';
  import FourthLayer from '@/components/13-provide-inject/fourth-layer.vue';


  // interface Data {
  // }
  // type Yyy = {
  // };
  @Options({
    data() {
      return {
        visitors: ['niudun', 'foo', 'bar', 'ket'],
        age: 29,
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
      addVisitor() {
        this.visitors.push('bill gates');
      },
      increaseAge() {
        ++this.age;
      }
    },
    //provide: {
    //  user: 'guoshi',     //提供直接量 ok
    //  //count:this.visitors.length,     //编译错误：
    //  count() {                   //这样在注入端，得到的count是函数,但是注入端调用发生this.visitors未定义错误
    //    return this.visitors.length;
    //  },
    //},
    //结论：如果提供的字段包含实例prop，则只有将provide转换为返回对象的函数
    provide() {
      return {
        user: 'guoshi',
        visitors: this.visitors,
        count: this.visitors.length,
        age: this.age,     // Vue.computed(() => ++this.age),失败 computed未定义（对于单文件组件）
      };
    },
    components: {
      AccordionHull,
      AccordionItem,
      FirstLayer,
      SecondLayer,
      ThirdLayer,
      FourthLayer,
    }
  })
  //export default class ComOrViewModel extends Vue { }     //ok
  //由于只有一个导出，故可使用匿名的默认导出：
  export default class extends Vue { }
</script>

<summary>
  View形式的组件，还需要到/router/index.ts中注册，在App.vue的适当位置设置链接
  若引用到.js文件，使用import时，需要到shims-vue.d.ts中declare一下。
</summary>

