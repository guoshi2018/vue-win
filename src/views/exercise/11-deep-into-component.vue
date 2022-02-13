
<template>
  <accordion-hull header="深入组件">
    <accordion-item caption="为组件属性传入需要的布尔值" show>
      <ul>
        <li><blog-post title="不包含isPublished 和 :is-published，则启用内部默认值" /></li>
        <li><blog-post title="包含 is-published 但不赋值，则意味着true" is-published /></li>
        <li><span>包含 :is-published 但不赋值，则编译错误</span></li>
        <li>
          <blog-post title="包含 is-published ,赋值任何值例如空字符，均意味着true" is-published="" />
          <blog-post title="包含 is-published ,赋值任何值甚至是false字串，均意味着true。
                     但有警告。消费端以字符串赋值boolean属性" is-published="false" />
        </li>
        <li>
          <blog-post title=":is-published='0' 则赋值false ,并警告" :is-published="0" />
          <blog-post title=":is-published='123' 则赋值true,并警告" :is-published="123" />
          <blog-post title=":is-published='{}' 对象被强制转换为true, 并警告" :is-published="{}" />
          <blog-post title=":is-published='false',则赋值false," :is-published="false" />
          <blog-post title=":is-published='null' 则赋值false" :is-published="null" />
          <blog-post title=":is-published='NaN' 则赋值false" :is-published="null" />
          <blog-post title=":is-published='undefined' 则启用默认值" :is-published="undefined" />
        </li>
        <li>
          <span>
            总结，只有两种情况启用默认值：<br />
            1)同时不包含is-published :is-published,<br />
            2)采用 :is-published='undefined'
          </span>
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="v-bind={...}的方式传递对象的各属性，赋值给组件的对应属性">
      <ul><li><blog-post v-bind="obj1" /></li></ul>
      <ul><li><blog-post v-bind="obj2" /></li></ul>
      <ul><li><blog-post v-bind="obj3" /></li></ul>
      <ul><li><blog-post v-bind="obj4" /></li></ul>
    </accordion-item>
    <accordion-item caption="组件prop及自定义事件的验证">
      <ul>
        <li>完整版参看Validation.vue</li>
        <li>
          注意 prop 会在一个组件实例创建之前进行验证，
          所以实例的 property (如 data、computed 等) 在 default 或 validator 函数中是不可用的。
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="禁用 Attribute 继承,即默认的非prop属性，自动添加到根节点">
      <ul>
        <li>
          <span>
            禁用 attribute 继承的常见场景是需要将 attribute 应用于根节点之外的其他元素。
          </span>
          <span>
            如果需要将所有非 prop 的 attribute 应用于 input 元素而不是根 div 元素，可以使用 v-bind 缩写来完成。
          </span>
        </li>
        <li>
          <span>手工改动blog-post的inheritAttrs未false和true,查看控制台信息</span>
          <span>
            如果inheritAttrs=true,同时某非根节点标记 v-bind="attrs"，则下面的one tow属性，
            将同时出现在根节点和该非跟节点上.根节点可为多个，且不论层次。
          </span>
          <span>
            实验结论:inheriteAttrs=true|false仅仅是在根节点上是否自动添加 v-bind="attrs"的
            快捷方式，换言之，即使inheriteAttrs=false,如果手工在根节点上添加 v-bind="attrs",
            根节点上仍然可以继承所有非prop属性。
          </span>
          <span>
            一句话总结：v-bind="attrs"在谁身上谁继承，inheriteAttrs=true可以自动为根节点添加。
          </span>
          <blog-post one="my god" tow="you win"/>
        </li>
      </ul>
    </accordion-item>
  </accordion-hull>
</template>

<script lang="ts">
  /* eslint-disable no-dupe-class-members, no-dupe-keys */
  import { Options, Vue } from 'vue-class-component'
  import AccordionHull from '@/components/accordion/accordion-hull.vue' // 子组件 @ is an alias to /src
  import AccordionItem from '@/components/accordion/accordion-item.vue';
  import BlogPost from '@/components/11-deep-into-component/blog-post.vue';

  // interface Data {
  // }
  // type Yyy = {
  // };
  @Options({
    data() {
      return {
        obj1: {
          title: 'obj-1的标题',
          content: 'obj-1的内容,obj1的字段与组件比较，不多不少',
          'is-published': true,
        },
        obj2: {
          content: 'obj-2的内容,obj2不包含title字段',
          'is-published': true,
        },
        obj3: {
          content: 'obj-3的内容，obj3不包含title字段，但是包含多余字段pnp',
          'is-published': true,
          pnp: 'hello,world',
        },
        obj4: {
          title: 'obj-4的标题',
          content: 'obj-4的内容，包含所有字段，还包含多余字段npn',
          'is-published': true,
          npn: new Date(),
        },
      };
    },
    // data()也可以这样写：
    // data () {
    //   return {

    //   } as Data
    // },
    // mounted (): void {
    // },
    // methods: {

    // },
    components: {
      AccordionHull,
      AccordionItem,
      BlogPost,
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

