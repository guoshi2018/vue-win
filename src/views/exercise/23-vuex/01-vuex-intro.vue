<comments>
  由于模块A使用默认的namespaced:false,所以除了其state以外,mutation getter action 均属于全局
  划分子命名空间的版本,见02-vuex-ns.vue
</comments>

<template>
  <accordion-hull header="Vuex介绍">
    <accordion-item caption="各状态监视">
      <ul>
        <li>
          <span>模块A(firstModule)状态监视:</span>
          <span>使用this.$store.state.modA.count: {{ $store.state.modA.count }}</span>
          <span>使用useStore().state.modA.count:{{ store.state.modA.count }}</span>
          <span>utterance: {{ store.state.modA?.utterance }}</span>
          <span>待办事项监视todos:</span>
          <ul>
            <li v-for="(todo, i) in $store.state.modA?.todos" :key="i">
              <span>{{ i + 1 }}.{{ todo.description }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="状态属性转换为计算属性,以count为例.">
      <ul>
        <li>
          <span>store.state.modA.count:{{ localCount1 }}</span>
        </li>
        <li>
          <span>this.stateA.count:{{ localCount2 }}</span>
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="使用mapState,生成计算属性.">
      <ul>
        <li>
          <span>localCount3: (state) => state.modA.count,方式:{{ localCount3() }}</span>
        </li>
        <li>
          <span>
            localUtterance3: (state) => state.modA.utterance方式:
            {{ localUtterance3() }}
          </span>
        </li>
        <li>
          <span
            >以指定命名空间(路径),方可采用字符串映射的方法, localCount4: "count" :{{
              localCount3()
            }}</span
          >
        </li>
        <li>
          <span
            >以指定命名空间(路径),方可采用字符串映射的方法,localUtterance4: "utterance":
            {{ localUtterance3() }}
          </span>
        </li>
        <li>
          <span
            >不指定命名空间(路径),字符串映射方法,只能拿到顶级state的属性name:{{
              localName()
            }}</span
          >
        </li>
        <li>
          <span
            >不指定命名空间(路径),字符串映射方法,只能拿到顶级state的属性age:{{
              localAge()
            }}</span
          >
        </li>
        <li>
          <span
            >不指定命名空间(路径),字符串数组同名方法,只能拿到顶级state的属性name,而且无法感知该属性:{{
              name()
            }}</span
          >
        </li>
        <li>
          <span
            >不指定命名空间(路径),字符串数组同名方法,只能拿到顶级state的属性age,而且无法感知该属性:{{
              age()
            }}</span
          >
        </li>
        <li>
          <span>
            字符串数组形式, 带命名空间, 可以指向ModB/ModC的country:{{ country() }}
          </span>
        </li>
        <li>
          <span>
            字符串数组形式, 带命名空间, 可以指向ModB/ModC的books:
            <pre>{{ books() }}</pre>
          </span>
        </li>

        <li>
          <span>与本地数据合并,必须使用常规函数:{{ totalCount() }}</span>
        </li>
      </ul>
    </accordion-item>
    <accordion-item
      caption="getter的常规使用,getter被认为是全局的,通过store.getters属性访问"
    >
      <ul>
        <li>
          <span>$store.getters.doneTodos:</span>
          <span>{{ $store.getters.doneTodos }}</span>
        </li>
        <li>
          <span>$store.getters.doneTodosCount:</span>
          <span>{{ $store.getters.doneTodosCount }}</span>
        </li>
        <li>
          <span>带参数的getter: $store.getters.getTodoById(2):</span>
          <span>{{ $store.getters.getTodoById(2) }}</span>
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="getter也可以手工转化为计算属性访问,为的是不用写这一大串">
      <ul>
        <li>
          <span>getter属性examGetRoot(位于顶级)转为计算属性:</span>
          <pre>{{ localExamGetRoot1 }}</pre>
        </li>
        <li>
          <span>getter属性doneTodosCount(位于ModA)转为计算属性:</span>
          <span>{{ localDoneTodosCount1 }}</span>
        </li>
        <li>
          <span>getter属性doneTodos(位于ModA)转为计算属性:</span>
          <span>{{ localDoneTodos1 }}</span>
        </li>
        <li>
          <span>getter之getTodoById(2)(位于ModA)带参数属性:</span>
          <span>{{ localGetTodoById1(2) }}</span>
        </li>
      </ul>
    </accordion-item>
    <accordion-item
      caption="mapGetters辅助函数,使用数组风格同名映射getter为局部计算属性,注意组合式Vue,
        该计算属性在模板中引用,应以方法调用的形式:foo()"
    >
      <ul>
        <li>
          <span>映射得到examGetRoot(位于顶级)的同名计算属性:</span>
          <pre>{{ examGetRoot() }}</pre>
        </li>
        <li>
          <span>映射得到doneTodosCount(位于ModA)的同名计算属性:</span>
          <span>{{ doneTodosCount() }}</span>
        </li>
        <li>
          <span>映射得到doneTodos(位于ModA)的同名计算属性:</span>
          <span>{{ doneTodos() }}</span>
        </li>
        <li>
          <span>映射得到getTodoById(id)(位于ModA)的同名计算属性:</span>
          <span>{{ getTodoById()(2) }}</span>
        </li>
        <li>
          <span>映射得到examGetC(位于ModB/modC)的同名计算属性:</span>
          <span>{{ examGetC() }}</span>
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="mapGetters辅助函数,使用对象风格改名映射getter为局部计算属性">
      <ul>
        <li>
          <span>映射得到examGetRoot(位于顶级)的同名计算属性:</span>
          <pre>{{ examGetRoot2() }}</pre>
        </li>
        <li>
          <span>映射得到doneTodosCount(位于ModA)的同名计算属性:</span>
          <span>{{ doneTodosCount2() }}</span>
        </li>
        <li>
          <span>映射得到doneTodos(位于ModA)的同名计算属性:</span>
          <span>{{ doneTodos2() }}</span>
        </li>
        <li>
          <span>映射得到getTodoById(id)(位于ModA)的同名计算属性:</span>
          <span>{{ getTodoById2()(2) }}</span>
        </li>
        <li>
          <span>映射得到examGetC(位于ModB/modC)的同名计算属性:</span>
          <span>{{ examGetC2() }}</span>
        </li>
      </ul>
    </accordion-item>

    <accordion-item
      caption="直接使用store提交mutation事件,
      层级模块的mutation名称是否需要限定名, 在于其逻辑位置"
    >
      <ul>
        <li>
          <input
            type="button"
            value="demo1: store.commit(Guoshi.Consts.INCREMENT)"
            @click="demo1"
          />
        </li>
        <li>
          <input type="button" value="demo2: store.commit(REVERSE)" @click="demo2" />
        </li>
        <li>
          <input
            type="button"
            value="demo3: store.commit(Guoshi.Consts.ADD_COUNT, 15)载荷风格,载荷为简单number类型"
            @click="demo3"
          />
        </li>
        <li>
          <input
            type="button"
            value="demo4: store.commit(Guoshi.Consts.ADD_TODO,{...})载荷风格,载荷为Todo对象类型"
            @click="demo4"
          />
        </li>
        <li>
          <input
            type="button"
            value="demo5: 对象风格,载荷为该对象的一个属性,本例仅包含count的增量"
            @click="demo5"
          />
        </li>
        <li>
          <input
            type="button"
            value="demo6: 对象风格,载荷为该对象的一个属性,本例仅包含新增的todo"
            @click="demo6"
          />
        </li>
        <li>
          <input
            type="button"
            value="demo7: 对象风格,载荷为该对象的一个属性,本例包含上述两者"
            @click="demo7"
          />
        </li>
        <li>
          <input
            type="button"
            value="demo8: 对象风格,载荷为该对象的一个属性,使用载荷创建字段获取state的字段值"
            @click="demo8"
          />
        </li>
        <li>
          <input type="button" value="demo9: 提交根部的mutation" @click="demo9" />
        </li>
        <li>
          <input
            type="button"
            value="demo10: 提交逻辑位置为ModB/ModC的模块的mutation.需要添加路径"
            @click="demo10"
          />
        </li>
      </ul>
    </accordion-item>
    <accordion-item
      caption="利用mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用"
    >
      <h3>使用数组形式的同名映射:</h3>
      <ul>
        <li>
          <input type="button" value="方法名:increment" @click="increment" />
        </li>
        <li>
          <input
            type="button"
            value="方法名addTodo, 带荷载参数"
            @click="
              addTodo({
                id: 199,
                description: 'welcome',
                done: false,
              })
            "
          />
        </li>
        <li>
          <input
            type="button"
            value="数组形式,结合命名空间路径,方法名:examMutaC"
            @click="examMutaC(59)"
          />
        </li>
        <li>
          <input
            type="button"
            value="方法addCount未同名映射, 调用失败"
            @click="addCount(4000)"
          />
        </li>
      </ul>
      <hr />
      <h3>使用对象形式的改名映射:</h3>
      <ul>
        <li>
          <input
            type="button"
            value="原mutation名:addCount; 本地方法名:mutAddCount"
            @click="mutAddCount(3000)"
          />
        </li>
        <li>
          <input
            type="button"
            value="原mutation名: addUsingObjectStyle; 本地方法名:mutAddUsingObjectStyle"
            @click="
              mutAddUsingObjectStyle({
                type: 'addUsingObjectStyle',
                amount: 38,
                todo: {
                  id: 199,
                  description: 'hi,you win',
                  done: true,
                },
              })
            "
          />
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="action的常规用法:store.dispatch">
      <ul>
        <li>
          <input
            type="button"
            value="以载荷方式加10"
            @click="store.dispatch('addCountAsync', 10)"
          />
        </li>
        <li>
          <input
            type="button"
            value="以对象方式加25"
            @click="
              store.dispatch({
                type: 'addUsingObjectStyleAsync',
                amount: 25,
              })
            "
          />
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="action的映射用法,映射成组件methods之一">
      <ul>
        <li>
          <span> this.reverse()映射为store.dispatch('reverse') </span>
          <input type="button" value="逆转字串" @click="reverse" />
        </li>
        <li>
          <span
            >addUsingObjectStyleAsync({...})到$store.dispatch({type='add...',...}),对象风格</span
          >
          <input
            type="button"
            value="递增17"
            @click="
              addUsingObjectStyleAsync({
                type: 'addUsingObjectStyleAsync',
                amount: 17,
              })
            "
          />
        </li>
        <li>
          <span
            >act_add_count映射为store.dispatch('addCountAsync',amount:number).载荷风格</span
          >
          <input type="button" value="递增19" @click="actAddCountAsync(19)" />
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="action的异步特征及使用,与await组合等">
      <ul>
        <li>
          <span>
            action:incrementAsync,无promise返回,仅仅以延时模拟异步递增count
            实验结果:dispatch方法本身虽然返回promise,但由于此action并未做过Promise雕琢.
            所以该promise的返回值为undefined.
          </span>
          <input type="button" value="demo11: only dispatch" @click="demo11" />
          <input type="button" value="demo12: dispatch and then" @click="demo12" />
          <input type="button" value="demo13: await dispatch" @click="demo13" />
        </li>
        <li>
          <span>
            让action返回Promise,store.dispatch可以处理该Promise，
            并且store.dispatch仍旧返回 Promise：
          </span>
          <input type="button" value="demo14: dispatch & then" @click="demo14" />
          <input type="button" value="demo15: await dispatch" @click="demo15" />
          <input type="button" value="demo16: nested commit dispatch" @click="demo16" />
        </li>
      </ul>
    </accordion-item>
    <accordion-item
      caption="store之严格模式下的表单绑定导致的非mutation提交的state修改引发的问题"
    >
      <ul>
        <li>
          <span
            >使用v-model的双向绑定到state的对象之属性, 在用户输入时, 因为v-model试图修改
            该属性(Guoshi.Interfaces.Student.name), 由于这个修改不是在 mutation
            函数中执行的, 这里会抛出一个错误。 当然, 非严格模式则无此问题</span
          >
          <input v-model="stateA.utterance" />
        </li>
        <li>
          <span>解决方案1, 较繁琐: 绑定value,侦听input事件, 在回调中调用mutation</span>
          >
          <input :value="stateA.utterance" @input="updateUtt" />
        </li>
        <li>
          <span>解决方案2, 与上基本一致, 但使用的是change事件</span>
          >
          <input :value="stateA.utterance" @change="updateUtt" />
        </li>
        <li>
          <span>使用带有setter的双向绑定计算属性</span>
          <input v-model="cmpUtt" />
        </li>
      </ul>
    </accordion-item>
  </accordion-hull>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, computed, ref, Ref } from "vue";
import {
  useStore as useStoreSystem, //注释, 改为使用自定义useStore,可以提供类型支持
  mapState,
  mapGetters,
  mapMutations,
  mapActions,
  Store,
  CommitOptions,
} from "vuex";
import { useStore, studentAsTopstoreKey } from "@/store/setup";
import { Guoshi } from "@/common/type/guoshi";
//import {useStore} from '@/store';
import ChatState from "@/views/exercise/25-official-store-example/chat/ts-version/api/ChatState.class";
import { print } from "@/common/mixins/func";
const debug = true;

//为了store.state及以下能智能感知, 使用第一套还是第二套方案
//注意需要同时切换main.ts的 use(store) 方式
const plan = 2;

//这里是组合式和选项式混装一起的用法
export default defineComponent({
  setup() {
    //以此证明store的singleton特点
    if (debug) {
      let s0, s1, s2, s3, s4, s5, s6;
      if (plan < 2) {
        //第一套: 类型已经内定好.注意切换main.ts
        s0 = s1 = s2 = s3 = s4 = s5 = s6 = useStore();
      } else {
        s0 = useStoreSystem(studentAsTopstoreKey);
        s1 = useStoreSystem<Guoshi.Interfaces.Student>(
          studentAsTopstoreKey
        ) as Store<any>;
        s2 = useStoreSystem<Guoshi.Interfaces.VueState>(
          studentAsTopstoreKey
        ) as Store<any>;
        s3 = useStoreSystem<Guoshi.Interfaces.UserInfo>(
          studentAsTopstoreKey
        ) as Store<any>;
        s4 = useStoreSystem<Guoshi.Interfaces.Author>(studentAsTopstoreKey) as Store<any>;
        s5 = useStoreSystem<ChatState>(studentAsTopstoreKey) as Store<any>;
        s6 = useStoreSystem<{}>(studentAsTopstoreKey) as Store<any>;
      }
      print(
        debug,
        "all store are the same :",
        s0,
        s0 == s1, //true
        s1 == s2, //true
        s2 == s3, //true
        s3 == s4, //true
        s4 == s5, //true
        s5 == s6 //true
      );
    }
    //#endregion

    //准备
    let store: Store<Guoshi.Interfaces.StudentPro>;
    if (plan < 2) {
      store = useStore(); //方案一
    } else {
      store = useStoreSystem(studentAsTopstoreKey); //方案二
    }
    const stateA = store.state.modA as Guoshi.Interfaces.VueState;

    //#region 手工实现的state的计算属性代理state字段
    const localCount1 = computed(() => store.state.modA?.count);
    const localCount2 = computed(() => stateA.count);
    //#endregion

    //#region 手工实现的getter的计算属性代理
    //使用计算属性代理状态的getter属性, 注意最后一个带参数
    const localExamGetRoot1 = computed(() => store.getters.examGetRoot);
    const localDoneTodosCount1 = computed(() => store.getters.doneTodosCount);
    const localDoneTodos1 = computed(() => store.getters.doneTodos);
    const localGetTodoById1 = computed(() => (id: number) =>
      store.getters.getTodoById(id)
    );

    //#endregion

    //#region 直接手工commmit("mutation-name",...)
    const demo1 = () => {
      // store.state.modA?.count?++; // 这样居然也可以，虽然不太文明
      store.commit(Guoshi.Consts.INCREMENT); //ok
    };
    const demo2 = () => {
      store.commit(Guoshi.Consts.REVERSE); //ok,
    };
    const demo3 = () => {
      store.commit(Guoshi.Consts.ADD_COUNT, 15);
    };
    const demo4 = () => {
      store.commit(Guoshi.Consts.ADD_TODO, {
        id: 88,
        description: "hello,world",
        done: true,
      });
    };
    const demo5 = () => {
      store.commit({
        type: Guoshi.Consts.ADD_USING_OBJECT_STYLE,
        amount: 11,
      });
    };
    const demo6 = () => {
      store.commit({
        type: Guoshi.Consts.ADD_USING_OBJECT_STYLE,
        todo: {
          id: 99,
          description: "do something suable",
          done: true,
        },
      });
    };
    const demo7 = () => {
      store.commit({
        type: Guoshi.Consts.ADD_USING_OBJECT_STYLE,
        amount: 38,
        todo: {
          id: 199,
          description: "hi,you gay",
          done: true,
        },
      });
    };
    const demo8 = () => {
      const theObj = {
        type: "_getCount", //
      };
      store.commit(theObj);
      print(debug, "theObj back:", theObj); //这样也可以拿到state的相关数据
    };
    const demo9 = () => {
      store.commit("examMutaRoot", 13, {
        silent: true,
        root: false,
      } as CommitOptions);
    };
    const demo10 = () => {
      store.commit("modB/modC/examMutaC", 2);
      store.commit("modC/examMutaC", 3); //模块C同时也在根部注册过.

      //这样就找不到 mutation: [vuex] unknown mutation type: examMutaC
      //   store.commit("examMutaC", 100);
    };
    //#endregion

    //直接手工dispatch("action-name",...)见模板内

    //#region 组合action测试:
    const demo11 = () => {
      const t = store.dispatch("incrementAsync");
      print(debug, "dispatch over", t);
    };
    const demo12 = () => {
      store.dispatch("incrementAsync").then((data: any) => {
        print(debug, "dipatch ,then over", data);
      });
    };
    const demo13 = async () => {
      const t = await store.dispatch("incrementAsync");
      print(debug, "await dipatch,and over", t);
    };
    const demo14 = () => {
      const t = store.dispatch("actionA").then((obj: any) => {
        print(debug, "resolve data is object with current count: ", obj);
      });
      print(debug, "dispatch is ", t);
    };
    const demo15 = async () => {
      const resp = await store.dispatch("actionA");
      print(debug, "await dispatch actionA finish.resp is ", resp);
    };
    const demo16 = async () => {
      const resp = await store.dispatch("actionB");
      print(debug, "await dispatch actionB finish,resp is ", resp);
    };
    //#endregion

    //#region 严格模式下, 非mutation提交形式的state修改将引发错误值解决方案
    //方案一: 这里写得简单, 但是模板设置比较繁琐
    const updateUtt = (evt: Event) => {
      store.commit(
        Guoshi.Consts.UPDATE_UTTERANCE,
        (evt.target as HTMLInputElement).value
      );
    };
    //方案二: 可充分利用v-model语法, 模板简练
    const cmpUtt = computed({
      get() {
        return stateA.utterance;
      },
      set(value) {
        store.commit(Guoshi.Consts.UPDATE_UTTERANCE, value);
      },
    });
    //#endregion

    return {
      store,
      stateA,
      ownData: 100,
      //#region 计算属性
      localCount1,
      localCount2,
      localExamGetRoot1,
      localDoneTodosCount1,
      localDoneTodos1,
      localGetTodoById1,
      //#endregion

      //#region 手工commit mutation
      demo1,
      demo2,
      demo3,
      demo4,
      demo5,
      demo6,
      demo7,
      demo8,
      demo9,
      demo10,
      //#endregion

      //#region 手工dispatch action
      demo11,
      demo12,
      demo13,
      demo14,
      demo15,
      demo16,
      //#endregion

      //#region mapState
      //组合式api下, 映射得到的计算属性, 使用时必须带括号
      ...mapState({
        //方法型:  参数必须是any类型
        localCount3: (state: any) => state.modA.count,
        localUtterance3: (state: any) => state.modA.utterance,

        //为了获取局部状态, 拿到ownData,必须用常规函数
        totalCount: function (state: any) {
          return this.ownData + state.modA.count;
        },
      }),
      //字符串型, 记住默认有先导 state. 注意此时只能得到根state
      ...mapState({
        localName: "name", // state.name
        localAge: "age", // state.age
      }),
      //虽然ModA的namespaced为false, 但路径确实存在.
      ...mapState("modA", {
        localCount4: "count",
        localUtterance4: "utterance",
      }),
      //字符串数组形式的, 不带命名空间, 指向顶级state
      ...mapState(["age", "name"]),
      //字符串数组形式, 带命名空间, 可以指向下级
      ...mapState("modB/modC", ["country", "books"]),
      //#endregion

      //#region mapGetters
      //原名称映射,后三个虽然不位于根部而位于ModA, 但ModA的namespaced为false.所以找得到.
      //这个和mapState表现稍有不同. mapState是讲路径, mapGetters是讲空间
      ...mapGetters(["examGetRoot", "doneTodosCount", "doneTodos", "getTodoById"]),
      //下面的examGetC位于ModB/modC, 故需要指明空间
      ...mapGetters("modB/modC", ["examGetC"]),

      //换名映射
      ...mapGetters({
        examGetRoot2: "examGetRoot",
        doneTodosCount2: "doneTodosCount",
        doneTodos2: "doneTodosCount",
        getTodoById2: "getTodoById",
      }),
      ...mapGetters("modB/modC", {
        examGetC2: "examGetC",
      }),
      //#endregion

      //#region mapMutations
      //同名映射mutation到本地method: increment , addTodo
      ...mapMutations([Guoshi.Consts.INCREMENT, Guoshi.Consts.ADD_TODO]),
      //使用对象参数形式, 改名映射
      ...mapMutations({
        //commit("addCount") 映射成本地方法 mutAddCount
        mutAddCount: Guoshi.Consts.ADD_COUNT,
        //commit('addUsingObjectStyle')映射成本地方法mutAddUsingObjectStyle
        mutAddUsingObjectStyle: Guoshi.Consts.ADD_USING_OBJECT_STYLE,
      }),
      //子模块的examMutaC映射,映射成本地同名方法.注意添加命名空间(逻辑位置)
      ...mapMutations("modB/modC", ["examMutaC"]),
      //#endregion

      //#region mapActions 带逻辑路径的action,与 mapMutations mapGetters类似.
      ...mapActions([
        //将 `this.reverse()` 映射为 `store.dispatch('reverse')`
        Guoshi.Consts.REVERSE,
        //对象风格的载荷映射:this.addUsingObjectStyleAsync({...})到$store.dispatch({type="add...",...});
        "addUsingObjectStyleAsync",
      ]),
      ...mapActions({
        //this.act_Guoshi.Consts.ADD_COUNT映射为$store.dispatch('addCountAsync',amount:number).
        actAddCountAsync: "addCountAsync",
      }),
      //#endregion

      //#region 严格模式下的state绑定到v-model的最佳解决方案
      cmpUtt,
      updateUtt,
      //#endregion
    };
  },
});
</script>
