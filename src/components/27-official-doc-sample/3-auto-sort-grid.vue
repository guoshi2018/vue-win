<summary>
  by guoshi. 2022.06.14
  官方原版采用vue2成型, 这里改为vue3的组合式api制作.

  自动排序/过滤的数据表格, 使用方法
    <auto-sort-grid :records="gridData" :columns="gridColumns" :filter-key="searchQuery"/>

  表格的样式, 除了active,arrow,asc,dsc应由组件内定以外, 其余全部交由消费端(父组件)定制. 注意取消父组件
  style节的scoped标记

  其中属性含义如下:
    records:原始记录列表
    columns:记录的列名称组成的数组,必须与records对应
    filter-key:查询用的过滤关键字词

  存在的问题:
    1. 需要配置columns, 理想状况, 应由records生成.
    2. 排序使用的比较方法, 内部设定为普通的字符/字母/数字顺次比较大小, 理想情况, 应由父组件提供比较方法回调

  注: 以上问题, 以在4-super-sort-grid.vue中完美解决. 
</summary>
<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="key in columns"
          @click="configSort(key)"
          :class="{ active: sortKey == key }"
          :key="key"
        >
          {{ upperFirst(key) }}
          <span class="arrow" :class="sortOrders[key] == 1 ? 'asc' : 'dsc'"> </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, idxR) in workedRecords" :key="idxR">
        <td v-for="(key, idxK) in columns" :key="idxK">
          {{ row[key] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, PropType, computed } from "vue";
import upperFirst from "lodash/upperFirst";

export default defineComponent({
  //#region 原版
  // props: {
  //   heroes: Array,
  //   columns: Array,
  //   filterKey: String,
  // },
  // data() {
  //   const sortOrders = {};
  //   this.columns.forEach(function (key: string) {
  //     sortOrders[key] = 1;
  //   });
  //   return {
  //     sortKey: "",
  //     sortOrders,
  //   };
  // },
  // computed: {
  //   filteredHeroes() {
  //     const sortKey = this.sortKey;
  //     const filterKey = this.filterKey && this.filterKey.toLowerCase();
  //     const order = this.sortOrders[sortKey] || 1;
  //     let heroes = this.heroes;
  //     if (filterKey) {
  //       heroes = heroes.filter(function (row) {
  //         return Object.keys(row).some(function (key) {
  //           return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
  //         });
  //       });
  //     }
  //     if (sortKey) {
  //       heroes = heroes.slice().sort(function (a, b) {
  //         a = a[sortKey];
  //         b = b[sortKey];
  //         return (a === b ? 0 : a > b ? 1 : -1) * order;
  //       });
  //     }
  //     return heroes;
  //   },
  //   sortOrders() {
  //     const columnSortOrders = {};

  //     this.columns.forEach(function (key) {
  //       columnSortOrders[key] = 1;
  //     });

  //     return columnSortOrders;
  //   },
  // },
  // methods: {
  //   capitalize(str) {
  //     return str.charAt(0).toUpperCase() + str.slice(1);
  //   },
  //   sortBy(key) {
  //     this.sortKey = key;
  //     this.sortOrders[key] = this.sortOrders[key] * -1;
  //   },
  // },
  //#endregion
  components: {},
  props: {
    /**
     * 原始记录列表
     */
    records: {
      //对应原版的heroes
      type: Array as PropType<Record<string, any>[]>,
      default: () => [],
    },

    /**
     * 记录的列名称组成的数组,必须与records对应
     */
    columns: {
      type: Array as PropType<string[]>,
      default: () => [],
    },

    /**
     * 查询用的过滤关键字词
     */
    filterKey: {
      type: String,
      default: "",
    },
  },
  setup(props, context) {
    /**
     * 当前的索引关键字(当前的列名称)
     */
    const sortKey = ref("");

    /**
     * 记录所有列的当前排序方向(顺序还是逆序),
     * 属性名称为列名, 值为: 1,代表顺序; -1,代表逆序
     */
    const sortOrders = reactive<Record<string, 1 | -1>>({});

    props.columns.forEach(function (key: string) {
      sortOrders[key] = 1;
    });

    /**
     * 获取处理(排序和/或过滤)后的record列表拷贝
     */
    const workedRecords = computed(() => {
      //对应原来的filterHeroes
      const fk = props.filterKey.toLowerCase();
      let recs = props.records;

      //需要过滤?
      if (fk) {
        recs = recs.filter(function (rec) {
          return Object.values(rec).some((v: any) => {
            return String(v).toLowerCase().indexOf(fk) != -1;
          });
        });
      }

      //需要排序(首次加载时,则为原始顺序,不需排序.此时sortKey="")
      if (sortKey.value.length > 0) {
        recs = recs.slice().sort(function (reca, recb) {
          //sort会影响原数组
          const va = reca[sortKey.value];
          const vb = recb[sortKey.value];
          return (va === vb ? 0 : va > vb ? 1 : -1) * sortOrders[sortKey.value];
        });
      }
      return recs;
    });

    /**
     * 配置排序需要的参数:索引键和方向(升或降), 对应原版的sortBy
     */
    const configSort = (key: string) => {
      sortKey.value = key;
      sortOrders[key] *= -1;
    };

    return {
      /**
       * 当前的索引关键字(当前的列名称)
       */
      sortKey,

      /**
       * 记录所有列的当前排序方向(顺序还是逆序),
       * 属性名称为列名, 值为: 1,代表顺序; -1,代表逆序
       */
      sortOrders,

      /**
       * 配置排序需要的参数:索引键和方向(升或降), 对应原版的sortBy
       */
      configSort,

      upperFirst, //借用lodash的同名方法

      /**
       * 获取处理(排序和/或过滤)后的record列表拷贝
       */
      workedRecords,
    };
  },
});
</script>
<style lang="scss" scoped>
th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>
