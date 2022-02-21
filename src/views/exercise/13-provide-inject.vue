<template>
  <accordion-hull header="Provide和Inject,用于解决组件嵌套时的属性值传递问题">
    <accordion-item caption="provide提供，inject接收" show>
      <dl>
        <dt>
          provide以对象的字段提供，inject以数组元素接收,元素是provide对象内的字段名
          父组件测试:模板语法并不能读取provide中的字段.它只读取data所定义.
        </dt>
        <dd>
          <span
            >user,age在data中与provide中的定义不一致,模板语法得到的只会是data所定义,所以
            user = {{ user }};age = {{ age }}</span
          >
          <span
            >count,在data中未定义,虽然在provide中取值是visitors.length,在此仍然未undefined,
            即 count== undefined :{{ count == undefined }}</span
          >
          <span> vistors被原封不动provide出去:{{ visitors }} </span>
        </dd>
        <dt>
          子组件测试:data,props中存在与inject中同名字段,例如下面的overlap,则inject的被忽略,
          而data与props因优先级一致而互斥,只能存其一
        </dt>
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
          通常情况下，改变提供方的实例属性，被inject的组件，虽然可以响应属性本省,但不会察觉属性的子属性的，
          即provide/inject绑定不是响应式的。
        </dt>
        <dd>
          <input
            type="button"
            value="添加vistors数组元素，由于visitors是引用类型,故上面子组件fourth-layer的visitor会变化,但count并不会变化"
            @click="addVisitor"
          />
          <input
            type="button"
            value="递增age,由于age是基本值类型,故上面的age不变"
            @click="increaseAge"
          />
          <span
            >这里是父组件模板:current visitors:{{ visitors }},current age:{{
              age
            }}</span
          >
        </dd>
        <dt>
          分配一个组合式API computed property，则可以实现响应式，例如age字段
          (官方文档这么说，但是对于单文件组件Vue.computed方法报告错误：未定义。所以暂时放弃)
          故将引用传递的对象或数组，作为provide的字段，则可以实现响应式。例如上述的visitors数组。
          单文件组件下的组合式api中使用provide/inject示范,参看13-provide-inject2.vue
        </dt>
        <dd>byebye</dd>
      </dl>
    </accordion-item>
  </accordion-hull>
</template>

<script lang="ts">
/* eslint-disable no-dupe-class-members, no-dupe-keys */
import { defineComponent } from "vue";
import { Vue } from "vue-class-component";
import AccordionHull from "@/components/accordion/accordion-hull.vue"; // 子组件 @ is an alias to /src
import AccordionItem from "@/components/accordion/accordion-item.vue";
import FirstLayer from "@/components/13-provide-inject/first-layer.vue";
import SecondLayer from "@/components/13-provide-inject/second-layer.vue";
import ThirdLayer from "@/components/13-provide-inject/third-layer.vue";
import FourthLayer from "@/components/13-provide-inject/fourth-layer.vue";

export default defineComponent({
  data() {
    return {
      visitors: ["niudun", "foo", "bar", "ket"],
      age: 29,
      user: "bclz_gxy",
    };
  },
  methods: {
    addVisitor() {
      this.visitors.push("bill gates");
    },
    increaseAge() {
      ++this.age;
    },
  },
  // provide: {
  //   user: "guoshi", //提供直接量 ok
  //   //count:this.visitors.length,     //编译错误：
  //   count() {
  //     //这样在注入端，得到的count是函数,但是注入端调用发生this.visitors未定义错误
  //     return this.visitors.length;
  //   },
  // },
  //结论：如果提供的字段包含实例prop，则只有将provide转换为返回对象的函数
  provide() {
    return {
      user: "guoshi",
      visitors: this.visitors,
      count: this.visitors.length,
      age: this.age + 10, // Vue.computed(() => ++this.age),失败 computed未定义（对于单文件组件）
      overlap: {
        url: "www.baidu.com",
        ceo: "liyanhong",
      },
    };
  },
  components: {
    AccordionHull,
    AccordionItem,
    FirstLayer,
    SecondLayer,
    ThirdLayer,
    FourthLayer,
  },
});
</script>
