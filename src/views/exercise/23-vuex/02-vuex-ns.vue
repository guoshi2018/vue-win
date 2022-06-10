<template>
  <accordion-hull header="state模块的局部和全局分析">
    <accordion-item caption="store对象打印">
      <ul>
        <li>
          <span>顶级theStore.state包含各子模块state:</span>
          <span>{{ theStore.state }}</span>
        </li>
        <li>
          <span>moduleA的state:</span>
          <span>{{ theStore.state.ModA }}</span>
        </li>
        <li>
          <span>moduleB的state:</span>
          <span>{{ theStore.state.ModB }}</span>
        </li>
        <li>
          <span>moduleC的state:</span>
          <span>{{ theStore.state.ModB.ModC }}</span>
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="getter的参数,请查看控制台输出">
      <ul>
        <li>
          <span>结论,参数如下:</span>
          <ol type="a">
            <li>局部state(proxy)</li>
            <li>局部getters(object)</li>
            <li>根节点rootState(proxy)</li>
            <li>根节点rootGetters(object)</li>
          </ol>
        </li>
        <li>
          <span class="active" @click="rootGetterDemo"
            >模块的顶级(根节点)getter调用方式:this.theStore.getters.examGetRoot</span
          >
          <span>备注:对于顶级(根节点),局部即为根节点</span>
        </li>
        <li>
          <span class="active" @click="modAGetterDemo"
            >模块A由于是注册在全局命名空间,故getter调用方式:
            this.theStore.getters.examGetA</span
          >
          <span
            >备注:对于注册在全局命名空间的模块,state分局部和根部,节点则共用为根节点,所以,
            0 2 不同,但 1 3 相同
          </span>
        </li>
        <li>
          <span class="active" @click="modBGetterDemo"
            >模块B由于是注册在局部命名空间,故getter调用方式:
            this.theStore.getters["ModB/examGetB"]</span
          >
          <span
            >备注:对于注册在局部命名空间的模块,state分局部和根部,节点也分局部节点和根节点,所以,
            0 2 不同,且 1 3 也不同
          </span>
        </li>
        <li>
          <span class="active" @click="modCGetterDemo"
            >模块C又是模块B的局部命名空间模块.故getter调用方式:
            this.theStore.getters["ModB/ModC/examGetC"]</span
          >
          <span
            >备注:局部命名空间的模块,state和根对象均分局部和根,节点则共用为根节点,所以,
            0 2 不同,且 1 3 也不同
          </span>
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="mutation的参数,请查看控制台输出">
      <ul>
        <li>
          <span>结论,参数如下:</span>
          <ol type="a">
            <li>局部state(proxy)</li>
            <li>调用端附加的参数对象(如果有)</li>
            <li>后续如果有则被忽略</li>
          </ol>
        </li>
        <li>
          <span
            class="active"
            @click="theStore.commit('examMutaRoot', { say: 'hello root' })"
            >根节点mutation的载荷风格的commit方式:this.theStore.commit('examMutaRoot',{})</span
          >
          <span
            class="active"
            @click="
              theStore.commit({
                type: 'examMutaRoot',
                ...{ say: 'hello root' },
              })
            "
            >根节点mutation的对象风格的commit方式:this.theStore.commit({type:'examMutaRoot',...{}})</span
          >
          <span>备注:对于根节点,局部state就是根state</span>
        </li>
        <li>
          <span
            class="active"
            @click="theStore.commit('examMutaA', { say: 'hello A' })"
            >模块A(全局注册)mutation的载荷风格的commit方式:this.theStore.commit('examMutaModA',{})</span
          >
          <span
            class="active"
            @click="
              theStore.commit({ type: 'examMutaA', ...{ say: 'hello A' } })
            "
            >模块A(全局注册)mutation的对象风格的commit方式:this.theStore.commit({type:'examMutaModA',...{}})</span
          >
          <span>备注:局部state和附加参数</span>
        </li>
        <li>
          <span
            class="active"
            @click="theStore.commit('ModB/examMutaB', { say: 'hello B' })"
            >模块B(局部注册)mutation的载荷风格commit方式:this.theStore.commit('ModB/examMutaB',{})</span
          >
          <span
            class="active"
            @click="
              theStore.commit({ type: 'ModB/examMutaB', ...{ say: 'hello B' } })
            "
            >模块B(局部注册)mutation的对象风格commit方式:this.theStore.commit({type:'ModB/examMutaB',...{}})</span
          >
          <span>备注:局部state和附加参数</span>
        </li>
        <li>
          <span
            class="active"
            @click="theStore.commit('ModB/ModC/examMutaC', { say: 'hello C' })"
            >模块C(局部注册于模块B)mutation的载荷风格的commit方式:this.theStore.commit('ModB/ModC/examMutaC',{})</span
          >
          <span
            class="active"
            @click="
              theStore.commit({
                type: 'ModB/ModC/examMutaC',
                ...{ say: 'hello C' },
              })
            "
            >模块C(局部注册于模块B)mutation的对象风格的commit方式:this.theStore.commit({type:'ModB/ModC/examMutaC',...{}})</span
          >
          <span>备注:局部state和附加参数</span>
        </li>
      </ul>
    </accordion-item>
    <accordion-item
      caption="action的参数,请查看控制台输出.注意内部commit对应的mutation"
    >
      <ul>
        <li>
          <span>结论,参数如下:</span>
          <ol type="a">
            <li>
              <span>context对象,包含属性:</span>
              <ul>
                <li>commit:function</li>
                <li>dispatch:function</li>
                <li>getters:object,当前层级的getters(上层包括下层)</li>
                <li>rootGetters:object,根节点getters</li>
                <li>state:Proxy,当前层级的state</li>
                <li>rootState:Proxy,根节点的state</li>
              </ul>
            </li>
            <li>调用端附加的参数对象(如果有)</li>
            <li>后续如果有则被忽略</li>
          </ol>
        </li>
        <li>
          <span class="active" @click="rootActDemo1">
            根节点处的action的dispatch方式,使用载荷风格:this.theStore.dispatch('examActRoot',{ExamPayload对象})</span
          >
          <span class="active" @click="rootActDemo2">
            根节点处的action的dispatch方式,使用对象风格:this.theStore.dispatch({type:'examActRoot',...{ExamPayload对象})</span
          >
          <span>备注:当前层级即根级</span>
        </li>
        <li>
          <span class="active" @click="ModAActDemo1">
            模块A的action的dispatch方式,使用载荷风格:this.theStore.dispatch('examActA',{ExamPayload对象})</span
          >
          <span class="active" @click="ModAActDemo2">
            模块A的action的dispatch方式,使用对象风格:this.theStore.dispatch({type:'examActA',...{ExamPayload对象})</span
          >
          <span>备注:模块A注册为全局命名空间</span>
        </li>
        <li>
          <span class="active" @click="ModBActDemo1">
            模块B的action的dispatch方式,使用载荷风格:this.theStore.dispatch('ModB/examActB',{ExamPayload对象})</span
          >
          <span class="active" @click="ModBActDemo2">
            模块B的action的dispatch方式,使用对象风格:this.theStore.dispatch({type:'ModB/examActB',...{ExamPayload对象})</span
          >
          <span>备注:模块B注册为局部命名空间</span>
        </li>
        <li>
          <span class="active" @click="ModCActDemo1">
            模块C的action的dispatch方式,使用载荷风格:this.theStore.dispatch('ModB/ModC/examActC',{ExamPayload对象})</span
          >
          <span class="active" @click="ModCActDemo2">
            模块C的action的dispatch方式,使用对象风格:this.theStore.dispatch({type:'ModB/ModC/examActC',...{ExamPayload对象})</span
          >
          <span>备注:模块C在模块B内部,注册为局部命名空间</span>
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="当根节点和各模块存在相同名称的action时,注意控制台">
      <ul>
        <li>
          <span>
            结论:(注意如果在action内commit mutation,原理以此相同)
            <ol>
              <li>
                客户端调用:以完整名字区分action,多个重名action则从根部依次调用
              </li>
              <li>
                根模块或全局模块的内部调用:不论DispatchOptions的root如何设置,重名action仍然从根部依次调用
              </li>
              <li>
                局部模块的内部调用:根据DispatchOptions的root设置,重名模块只调用局部模块本身的或只调用
                全局的.注意如果调用全局的,则全局的所有重名action仍然从根部依次调用
              </li>
            </ol>
          </span>
        </li>
        <li>
          <span
            class="active"
            @click="
              theStore.dispatch(
                {
                  type: 'sameNameAct',
                  saying: 'no-use-words',
                }
                //  { root: false } // or true
              )
            "
            >根模块和各注册在全局命名空间的模块的action依次调用,
            此时即使添加DispatchOption,设置root为true/false也一样</span
          >
        </li>
        <li>
          <span
            class="active"
            @click="
              theStore.dispatch({
                type: 'anotherAct1',
                saying: 'no-use-words',
              })
            "
            >全局空间的模块A的action名为anotherAct1,内部调用sameNameAct,仍然依次进行</span
          >
        </li>
        <li>
          <span
            class="active"
            @click="
              theStore.dispatch({
                type: 'anotherAct2',
                saying: 'no-use-words',
                nextCallRoot: false,
              })
            "
            >全局空间的模块A的action名为anotherAct2,
            内部通过nextCallRoot区分根级还是自身模块的sameNameAct,以期区别调用.
            但结果还是依次调用.原因在于这是全局模块</span
          >
        </li>
        <li>
          <span
            class="active"
            @click="
              theStore.dispatch({
                type: 'ModB/ModC/anotherAct1',
                saying: 'no-use-words',
              })
            "
            >局部模块C的action名为anotherAct1,内部调用sameNameAct,
            在无下面的配置时,只会调用模块本身的sameNameAct</span
          >
        </li>
        <li>
          <span
            class="active"
            @click="
              theStore.dispatch({
                type: 'ModB/ModC/anotherAct2',
                saying: 'no-use-words',
                //    nextCallRoot: true,
              })
            "
            >局部模块C的action名为anotherAct2,内部使用nextCallRoot转化为DispatchOptions的root,
            可区别调用根级还是自身模块级的同名action.注意本例同名根级action有两个均调用</span
          >
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="在带命名空间的模块注册全局action">
      <ul>
        <li>
          在带命名空间的模块(局部模块)注册全局
          action,将action的定义,从方法,变成对象
        </li>
        <li>
          <span class="active" @click="globalActionOnLocalDemo"
            >局部模块C的action globalActionOnModC调用</span
          >
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="state的映射">
      <ul>
        <li>
          <span>自定义名称的繁琐的写法,</span>
          <ol>
            <li>state.ModB.ModC.name:{{ authorNameWordy }}</li>
            <li>state.ModB.ModC.country:{{ authorCountryWordy }}</li>
            <li>state.ModB.ModC.books:{{ authorBooksWordy }}</li>
          </ol>
          <span>同名映射的繁琐写法</span>
          <ol>
            <li>
              <span>对于模块内的state(不论全局还是局部),不起作用:</span>
              <span class="active" @click="sameNameModuleMappedStateDemo">
                this["ModB/ModC/name"],this["ModB/ModC/country"],this["ModB/ModC/books"]:
                均返回undefined.当然如果使用上下文绑定,也可正确返回.但同名会覆盖
              </span>
            </li>
            <li>
              <span>根级的state,可以使用:</span>
              <span class="active" @click="sameNameRootMappedStateDemo">
                this["name"],this["age"],均可正确返回.
              </span>
            </li>
          </ol>
        </li>
        <li>
          <span>简便的写法</span>
          <ol>
            <li>state.name:{{ authorNameSimple }}</li>
            <li>state.coutry:{{ authorCoutrySimple }}</li>
            <li>state.books:{{ authorBooksSimple }}</li>
          </ol>
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="getter的映射">
      <ul>
        <li>
          <span>同名映射</span>
          <span>对于根级和各级模块(全局或局部的):</span>
          <span class="active" @click="sameNameMappedGetterDemo">
            this.examGetRoot,this.examGetA,
            this["ModB/examGetB"],this["ModB/ModC/examGetC"],
            及简化的this.examGetB,this.examGetC 均有效
          </span>
        </li>
        <li>
          <span>改名映射</span>
          <span
            >使用mapGetters方法的数组形式参数,也可以添加前置路径字串参数减少书写量</span
          >
          <span class="active" @click="newNameMappedGetterDemo">
            分别映射成this.egr,this.ega,this.egb,this.egc
          </span>
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="mutation的映射">
      <ul>
        <li>
          <span>同名映射</span>
          <span>对于根级和各级模块(全局或局部的):</span>
          <span class="active" @click="sameNameMappedMutationDemo">
            this.examMutaRoot,this.examMutaA,
            this["ModB/examMutaB"],this["ModB/ModC/examMutaC"],
            及简化的this.examMutaB,this.examMutaC 均有效
          </span>
        </li>
        <li>
          <span>改名映射</span>
          <span
            >使用mapMutations方法的数组形式参数,也可以添加前置路径字串参数减少书写量</span
          >
          <span class="active" @click="newNameMappedMutationDemo">
            分别映射成this.emr,this.ema,this.emb,this.emc
          </span>
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="action的映射">
      <ul>
        <li>
          <span>同名映射</span>
          <span>对于根级和各级模块(全局或局部的):</span>
          <span class="active" @click="sameNameMappedActionDemo">
            this.examActRoot,this.examActA,this.globalActionOnModC
            this["ModB/examActB"],this["ModB/ModC/examActC"],
            及简化的this.examActB,this.examActC 均有效
          </span>
        </li>
        <li>
          <span>改名映射</span>
          <span
            >使用mapActions方法的数组形式参数,也可以添加前置路径字串参数减少书写量</span
          >
          <span class="active" @click="newNameMappedActionDemo">
            分别映射成this.ear,this.eaa,this.eab,this.eac,this.globalaoc
          </span>
        </li>
      </ul>
    </accordion-item>
    <accordion-item
      caption="定制的专门针对某一节点(局部模块)的mapState,mapMutations,mapGetters,mapActions方法"
    >
      <ul>
        <li>
          <span class="active" @click="customMapByModuleDemo">
            以模块C为例.注意,凡是在模块C内注册为全局的对象(例如globalActionOnModC)则找不到.
          </span>
        </li>
      </ul>
    </accordion-item>
    <accordion-item
      caption="测试动态管理模块,注意,无法卸载静态模块.(以后用到再说)"
      show
    >
      <ul>
        <li>
          <a
            href="https://vuex.vuejs.org/zh/guide/modules.html#%E6%A8%A1%E5%9D%97%E9%87%8D%E7%94%A8"
          >
            参见
          </a>
        </li>
        <li>
          <input
            type="button"
            value="注册不保留过去state"
            @click="registerModule1"
          />
        </li>
        <li>
          <input
            type="button"
            value="注册并保留过去state"
            @click="registerModule2"
          />
        </li>
        <li><input type="button" value="卸载" @click="unregModule" /></li>
      </ul>
    </accordion-item>
    <accordion-item caption="测试按钮">
      <input type="button" @click="test" value="测试" />
    </accordion-item>
  </accordion-hull>
</template>

<script lang="ts">
/* eslint-disable no-dupe-class-members, no-dupe-keys */
import { ref, defineComponent, onMounted } from "vue";
//import { Guoshi.Enums.Country, Guoshi.Types.ExamPayload } from "@/store/types";

// import AccordionHull from "@/components/accordion/accordion-hull.vue"; // 子组件 @ is an alias to /src
// import AccordionItem from "@/components/accordion/accordion-item.vue";
import {
  useStore,
  mapState,
  mapGetters,
  mapMutations,
  mapActions,
  ModuleTree,
  DispatchOptions,
  createNamespacedHelpers,
} from "vuex";
const mapHelper = createNamespacedHelpers("ModB/ModC");
export default defineComponent({
  components: {},
  data() {
    return {
      storeObj: {},
    };
  },
  setup() {
    // to use unique key to access store,注意与main.ts的use(store,..)对应
    //const theStore = useStore(Symbol.for("hey"));
    const theStore = useStore();
    onMounted(() => {
      //console.log("...............", theStore);
    });
    return {
      theStore,
    };
  },
  computed: {
    //any结合tsconfig.json的"noImplicitAny": false可消除错误提示的红色波浪线
    ...mapState(["name", "age"]), //仅对根级state有效
    ...mapState(["ModB/ModC/name", "ModB/ModC/country", "ModB/ModC/books"]), //或者使用 . 均对模块state无效
    ...mapState("ModB/ModC", ["name", "country", "books"]), //这样也可以,但同名会发生覆盖
    ...mapState({
      //繁琐写法
      authorNameWordy: (state: any) => state.ModB.ModC.name,
      authorCountryWordy: (state: any) => state.ModB.ModC.country,
      authorBooksWordy: (state: any) => state.ModB.ModC.books,
    }),
    ...mapState("ModB/ModC", {
      //简便写法,但层次越深时越有效
      authorNameSimple: (state: any) => state.name,
      authorCoutrySimple: (state: any) => Guoshi.Enums.Country[state.country], //得到枚举字符串
      authorBooksSimple: (state: any) => state.books,
    }),

    ...mapGetters([
      "examGetRoot",
      "examGetA",
      "ModB/examGetB",
      "ModB/ModC/examGetC",
    ]), //均有效
    ...mapGetters("ModB", ["examGetB"]),
    ...mapGetters("ModB/ModC", ["examGetC"]), //上下文绑定,均可能发生同名覆盖
    ...mapGetters({
      egr: "examGetRoot",
      ega: "examGetA",
      egb: "ModB/examGetB",
      egc: "ModB/ModC/examGetC",
    }),

    //使用绑定到ModC模块的mapState和mapGetters方法:
    ...mapHelper.mapState({
      chName: (state: any) => state.name,
      chCountry: (state: any) => Guoshi.Enums.Country[state.country],
      chBooks: (state: any) => state.books,
    }),
    ...mapHelper.mapGetters({
      chegc: "examGetC",
    }),
  },
  methods: {
    test() {
      //console.log("this.$store == this.store", this.$store == this.theStore); //true
      //console.log(mapHelper);
    },
    rootGetterDemo() {
      const obj = this.theStore.getters.examGetRoot;
      console.clear();
      console.log("顶级getter参数查看:", obj.args);
      console.log(
        `[0]==[2]:${obj.args[0] == obj.args[2]}`,
        `[1]=[3]:${obj.args[1] == obj.args[3]}`
      ); //true,true
      console.log("[0]:", obj.args[0]);
      console.log("[1]:", obj.args[1]);
    },
    modAGetterDemo() {
      const obj = this.theStore.getters.examGetA;
      console.clear();
      console.log("模块A的getter参数查看:", obj.args);
      console.log(
        `[0]==[2]:${obj.args[0] == obj.args[2]}`, //false
        `[1]=[3]:${obj.args[1] == obj.args[3]}` //true
      );
      console.log("[0]:", obj.args[0]);
      console.log("[1]:", obj.args[1]);
      console.log("[2]:", obj.args[2]);
    },
    modBGetterDemo() {
      const obj = this.theStore.getters["ModB/examGetB"];
      console.clear();
      console.log("模块B的getter参数查看:", obj.args);
      console.log(
        `[0]==[2]:${obj.args[0] == obj.args[2]}`, //false
        `[1]=[3]:${obj.args[1] == obj.args[3]}` //false
      );
      console.log("[0]:", obj.args[0]);
      console.log("[1]:", obj.args[1]);
      console.log("[2]:", obj.args[2]);
      console.log("[3]:", obj.args[3]);
    },
    modCGetterDemo() {
      const obj = this.theStore.getters["ModB/ModC/examGetC"];
      console.clear();
      console.log("模块C的getter参数查看:", obj.args);
      console.log(
        `[0]==[2]:${obj.args[0] == obj.args[2]}`, //false
        `[1]=[3]:${obj.args[1] == obj.args[3]}` //false
      );
      console.log("[0]:", obj.args[0]);
      console.log("[1]:", obj.args[1]);
      console.log("[2]:", obj.args[2]);
      console.log("[3]:", obj.args[3]);
    },

    //根级载荷风格调用Action
    async rootActDemo1() {
      const payload: Guoshi.Types.ExamPayload = {
        msDelay: 1000,
        saying: "using payload style,from root action.",
      };
      const response = await this.theStore.dispatch("examActRoot", payload);
      console.log("rootActDemo payload style Promise resolve:", response);
    },

    //根级对象风格调用Action
    async rootActDemo2() {
      const payload: Guoshi.Types.ExamPayload = {
        msDelay: 1000,
        saying: "using object style,from root action.",
      };
      const response = await this.theStore.dispatch({
        type: "examActRoot",
        ...payload,
      });
      console.log("rootActDemo object style Promise resolve:", response);
    },

    //模块A载荷风格调用Action
    async ModAActDemo1() {
      const payload: Guoshi.Types.ExamPayload = {
        msDelay: 1000,
        saying: "using payload style,from module A action.",
      };
      const response = await this.theStore.dispatch("examActA", payload);
      console.log("ModAActDemo payload style Promise resolve:", response);
    },

    //模块A对象风格调用Action
    async ModAActDemo2() {
      const payload: Guoshi.Types.ExamPayload = {
        msDelay: 1000,
        saying: "using object style,from module A action.",
      };
      const response = await this.theStore.dispatch({
        type: "examActA",
        ...payload,
      });
      console.log("ModAActDemo object style Promise resolve:", response);
    },

    //模块B载荷风格调用Action
    async ModBActDemo1() {
      const payload: Guoshi.Types.ExamPayload = {
        msDelay: 1000,
        saying: "using payload style,from module B action.",
      };
      const response = await this.theStore.dispatch("ModB/examActB", payload);
      console.log("ModBActDemo payload style Promise resolve:", response);
    },

    //模块B对象风格调用Action
    async ModBActDemo2() {
      const payload: Guoshi.Types.ExamPayload = {
        msDelay: 1000,
        saying: "using object style,from module B action.",
      };
      const response = await this.theStore.dispatch({
        type: "ModB/examActB",
        ...payload,
      });
      console.log("ModBActDemo object style Promise resolve:", response);
    },

    //模块C载荷风格调用Action
    async ModCActDemo1() {
      const payload: Guoshi.Types.ExamPayload = {
        msDelay: 1000,
        saying: "using payload style,from module C action.",
      };
      const response = await this.theStore.dispatch(
        "ModB/ModC/examActC",
        payload
      );
      console.log("ModCActDemo payload style Promise resolve:", response);
    },

    //模块C对象风格调用Action
    async ModCActDemo2() {
      const payload: Guoshi.Types.ExamPayload = {
        msDelay: 1000,
        saying: "using object style,from module C action.",
      };
      const response = await this.theStore.dispatch({
        type: "ModB/ModC/examActC",
        ...payload,
      });
      console.log("ModCActDemo object style Promise resolve:", response);
    },

    //局部模块C的action globalActionOnModC调用
    async globalActionOnLocalDemo() {
      console.clear();
      const response = await this.theStore.dispatch(
        "globalActionOnModC",
        {
          msDelay: 1200,
          saying: "global action at local module C",
        },
        {
          root: true,
        } as DispatchOptions //这个参数,在客户端(非模块内部)使用,仍然被忽略
      );
      console.log(response);
    },

    //mutation映射
    ...mapMutations([
      "examMutaRoot",
      "examMutaA",
      "ModB/examMutaB",
      "ModB/ModC/examMutaC",
    ]),
    ...mapMutations("ModB", ["examMutaB"]),
    ...mapMutations("ModB/ModC", ["examMutaC"]),
    ...mapMutations({
      emr: "examMutaRoot",
      ema: "examMutaA",
      emb: "ModB/examMutaB",
      emc: "ModB/ModC/examMutaC",
    }),

    //action映射
    ...mapActions([
      "examActRoot",
      "examActA",
      "ModB/examActB",
      "ModB/ModC/examActC",
      "globalActionOnModC",
    ]),
    ...mapActions("ModB", ["examActB"]),
    ...mapActions("ModB/ModC", ["examActC"]),
    ...mapActions({
      ear: "examActRoot",
      eaa: "examActA",
      eab: "ModB/examActB",
      eac: "ModB/ModC/examActC",
      globalaoc: "globalActionOnModC",
    }),

    //使用绑定到ModC模块的mapMutations和mapActions方法:
    ...mapHelper.mapMutations({
      chemc: "examMutaC",
    }),
    ...mapHelper.mapActions({
      cheac: "examActC",
      chglbac: "globalActionOnModC", //因为注册为全局,无法找到而成为滞留映射
    }),
    //----------------------------------下面是测试方法---------------------------//
    //测试使用同名映射state
    sameNameModuleMappedStateDemo() {
      console.clear();
      console.log(this["ModB/ModC/name"]); //undefined
    },
    //测试使用变名映射state
    sameNameRootMappedStateDemo() {
      console.clear();
      console.log(this.name); //ok,可能发生同名覆盖
      console.log(Guoshi.Enums.Country[this.country]);
      console.log(this.books);
    },

    //测试使用同名映射getter
    sameNameMappedGetterDemo() {
      console.clear();
      console.log(
        this.examGetRoot,
        this.examGetA,
        this["ModB/examGetB"],
        this["ModB/ModC/examGetC"],
        this.examGetB,
        this.examGetC
      );
    },
    //测试使用变名映射Getter
    newNameMappedGetterDemo() {
      console.clear();
      console.log(this.egr, this.ega, this.egb, this.egc);
    },

    //测试使用同名映射Mutation
    sameNameMappedMutationDemo() {
      console.clear();
      this.examMutaRoot();
      this.examMutaA();
      this["ModB/examMutaB"]();
      this["ModB/ModC/examMutaC"]();
      this.examMutaB();
      this.examMutaC();
    },
    //测试使用变名映射Mutation
    newNameMappedMutationDemo() {
      console.clear();
      this.emr();
      this.ema();
      this.emb();
      this.emc();
    },

    //测试使用同名映射Action
    async sameNameMappedActionDemo() {
      const pl = { msDelay: 1000 };
      console.clear();
      await this.examActRoot(pl);
      await this.examActA(pl);
      await this["ModB/examActB"](pl);
      await this["ModB/ModC/examActC"](pl);
      await this.examActB(pl);
      await this.examActC(pl);
      await this.globalActionOnModC(pl);
    },
    //测试使用改名映射Action
    async newNameMappedActionDemo() {
      const pl = { msDelay: 1000 };
      console.clear();
      await this.ear(pl);
      await this.eaa(pl);
      await this.eab(pl);
      await this.eac(pl);
      await this.globalaoc(pl);
    },

    //测试使用定制的map<...>工具,得到的state,getter,mutation,action的映射计算属性,方法
    async customMapByModuleDemo() {
      console.log(this.chName, this.chCountry, this.chBooks, this.chegc); //三个state字段,一个getter
      this.chemc("hello one c"); //mutation
      await this.cheac({ msDelay: 1000 });
      //  await this.chglbac({ msDelay: 2000 });  //滞留映射,无效
    },

    //测试动态管理模块:
    registerModule1() {},
    registerModule2() {},
    unregModule() {},
  },
});
</script>
