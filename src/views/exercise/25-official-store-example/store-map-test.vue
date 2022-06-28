<template>
  <div v-if="needRender" :key="divKey">
    <button @click="renderByV_IF">
      改变v-if=needRender,重新渲染本组件.产生两次更新:true->false->true
    </button>
    <button @click="renderByForceUpdate">
      使用forceUpdate方法重新渲染本组件.产生一次更新
    </button>
    <button @click="renderByChangKey">通过改变key重新渲染组件,产生一次更新,强推</button>
    <div>
      <h4>结论</h4>
      <p class="av">
        使用: unreadCount2 = {{ unreadCount2 }}, 注意:可用,但是书写太长问题,响应性不太好
        再获取一次:{{ unreadCount2 }} 当前时间:{{ Date.now() }}
      </p>
      <p class="av">
        上述unreadCount2其实根本就无响应性, 已找到原因:不能分开写,应一次写完:<br />
        const unreadCount200 = computed(()
        =>rootStore.getters[`${stores.js_chat.ns}/${js_chat.getter.unreadCount}`]):{{
          unreadCount200
        }}
      </p>
      <p class="av">
        uc3 = mapHelper.mapGetters({ abc: js_chat.getter.unreadCount, }).abc
        <br />
        定义:unreadCount3 = computed(() => uc3)
        注意,使用映射得到的计算属性,使用时虽然需要带括号(对于组合式组件),但却具备良好的响应性,unreadCount3():{{
          unreadCount3()
        }}
      </p>
    </div>
    <div>
      <h4>
        错误用法: uc1=chatMod.getters.unreadCount;原因在于chatMod是Model而不是store,
        所以无论怎么弄, 都无法实现愿望
      </h4>
      <div>
        <h5>定义:unreadCount1 = computed(() => uc1):</h5>
        <p>使用:unreadCount1 = {{ unreadCount1 }}</p>
        <p>使用:unreadCount1() = 异常</p>
      </div>
      <div>
        <h5>定义:unreadCount11 = computed(uc1): computed异常</h5>
      </div>
    </div>
    <hr />
    <div>
      <h4>
        uc2 = rootStore.getters[`${stores.js_chat.ns}/${js_chat.getter.unreadCount}`]
      </h4>
      <div>
        <h5>定义: unreadCount2 = computed(() => uc2):</h5>
        <p class="av">
          使用: unreadCount2 = {{ unreadCount2 }}, 注意:可用,但是书写太长问题,且无响应性.
        </p>
        <p>使用: unreadCount2() = 异常</p>
        <p>一次性写完,就好了. unreadCount200 = {{ unreadCount200 }}</p>
      </div>
      <div>
        <h5>定义: unreadCount22 = computed(uc2):异常</h5>
      </div>
    </div>
    <hr />
    <div>
      <h4>uc3 = mapHelper.mapGetters({ abc: js_chat.getter.unreadCount, }).abc</h4>
      <div>
        <h5>定义:unreadCount3 = computed(() => uc3)</h5>
        <p>使用:unreadCount3 = 异常</p>
        <p class="av">
          使用:unreadCount3() =
          {{ unreadCount3() }},注意:虽然是计算属性,却要跟括号,但却具备良好的响应性
        </p>
      </div>
      <div>
        <h5>定义:unreadCount33 = computed(uc3):异常</h5>
      </div>
    </div>
    <div>
      <h5>改造:将unreadCount3改造为不用括号的unreadCount4.改造失败,以后再说</h5>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  onMounted,
  onBeforeMount,
  onBeforeUpdate,
  onUpdated,
} from "vue";
import { useStore, createNamespacedHelpers } from "vuex";
import { studentAsTopstoreKey } from "@/store/setup";
import { js_chat } from "./const";
import { stores } from "./store-helper";
import { print, sleep } from "@/common/mixins/func";
const debug = true;

const mapHelper = createNamespacedHelpers(stores.js_chat.ns);
export default defineComponent({
  setup() {
    const rootStore = useStore(studentAsTopstoreKey);

    //@ts-ignore 可以拿到model, 但是不文明
    const chatMod = rootStore._modulesNamespaceMap[`${stores.js_chat.ns}/`]._rawModule;
    print(debug, "..........", chatMod, rootStore);

    //setup下实现计算属性的最佳方式选择
    //由于它本身不是store, 故不能使用store.getters
    const uc1 = chatMod.getters.unreadCount;
    const uc2 = rootStore.getters[`${stores.js_chat.ns}/${js_chat.getter.unreadCount}`];

    const uc3 = mapHelper.mapGetters({
      abc: js_chat.getter.unreadCount,
    }).abc;

    const unreadCount1 = computed(() => uc1); //error,不可取
    const unreadCount2 = computed(() => uc2); //可用,常规计算属性书写,不跟括号, 但是书写太长
    const unreadCount3 = computed(() => uc3); //可用,因为这是返回计算属性的方法,所以使用时要带括号

    //unreadCount2的上述写法,无响应性,所以改正如下:
    const unreadCount200 = computed(
      () => rootStore.getters[`${stores.js_chat.ns}/${js_chat.getter.unreadCount}`]
    ); //现在可以具备充分的响应性了

    //const unreadCount4 = unreadCount3.value();
    //const unreadCount4 = ref(computed(() => unreadCount3.value()));

    //for needRender
    const needRender = ref(true);
    const divKey = ref(0);
    onBeforeMount(() => {
      print(debug, "before mount hook called....");
    });
    onMounted(() => {
      print(debug, "mounted hook called....");
    });
    onBeforeUpdate(() => {
      print(debug, "before update hook called....");
    });
    onUpdated(() => {
      print(debug, "updated hook called....");
    });

    return {
      unreadCount1,
      unreadCount2,
      unreadCount3,
      //unreadCount4,
      unreadCount200,
      needRender,
      divKey,
    };
  },
  methods: {
    renderByV_IF() {
      print(debug, "prepare to rerender by v-if,let needRender=false first.");
      this.needRender = false;
      this.$nextTick(async () => {
        await sleep(3000);
        this.needRender = true;
        print(debug, "next tick passed. now needRender=true");
      });
    },
    renderByForceUpdate() {
      print(debug, "prepare to rerender by this.$forceUpdate");
      this.$forceUpdate();
      print(debug, "rerender by this.$forceUpdate completed ");
    },
    renderByChangKey() {
      print(debug, "preare to rerender by increase key");
      this.divKey++;
      print(debug, "increase key completed.");
    },
  },
});
</script>
<style>
p.av {
  border: 3px solid brown;
}
</style>

<summary>
  最佳实践结论:
    1. 不推荐采用state.<prop>的形式直接返回state字段(属性),应尽量往getters里靠, 如果一定要使用:
      不论模块namespaced是否为true,字段的定位, 一律使用state.ModA.ModB.ModC....<prop.name>的形式.

    2. 采用classic风格的options构建的vue组件:
      1) const mapHelper = createNamespacedHelpers(<store-namespace>);
      2) 不简单采用数组形式,是为了html部分的智能感知. 注意getter可以有参数

        //state and getter :
        computed:{
          //state的直接使用:
          <local-name>: (state) => state.ModA.ModB.ModC.{...}.<prop-name>,

          ...mapHelper.mapState(
            <local-name>:<prop-name>
          ),
          ...mapHelper.mapGetters({       
            <local-name>: <getter-name>,
            ...
          }),
          <其他本地创建的计算属性>
        }, 

        //action and mutation
        methods:{
          ...mapHelper.mapActions({
            <local-name>: <action-name>,
            ...
          }),
          ...mapHelper.mapMutations({
            <local-name>: <mutation-name>,
            ...
          }),
        }, 
      3) 注意: 对于嵌套层次较深的模块, 使用mapHelper应一次到位.例如,这样是错误的:
          errorMapHelper = createNamespacedHelpers(<pathA>);
          errorMapHelper.mapAction("pathB",{
            <local-name>:<action-name>,
            ...
          });
          而是必须一次到位:
          mapHelper = createNamespacedHelpers(<pathA>/<pathB>);
          mapHelper.mapAction({
            <local-name>:<action-name>
          });

    3. 采用composite风格的options创建的vue组件(组合式):
      1) const store = useStore();
      2) state:
            const <local-name> = computed(
              () => store.state.ModA.ModB.ModC.{...}.<prop-name>);
      3) getter:
            const <local-name> = computed(
              () => store.getters[`${<mod-namspace>}/${<getter-name>}`]);
      4) action:
            const <local-name> = <payload> => store.dispatch(
              `${<mod-namespace>}/${<action-name>}`,<payload>);
      5) mutation:
            const <local-name> = <payload> => store.commit(
              `${<mod-namespace>}/${<mutation-name>}`,<payload>);
      6) 注意, 如果上述在setup内无调用, 简洁起见, 可以在return{}中将定义和返回一次完成.
    getter的转换,如果写成: 
        const xxx = store.getters[`${<mod-namspace>}/${<getter-name>}`];
        const <local-name> = computed(()=>xxx);
        如果发现已经丧失响应性, 请检查return语句是否包含他们 

</summary>
