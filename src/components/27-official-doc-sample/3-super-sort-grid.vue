<summary>
  by guoshi. 2022.06.14

  超级自动排序/过滤的数据表格, 使用方法
    <super-sort-grid :records="gridData2" :filter-key="searchQuery" :compares="compares"/>

  与3-auto-sort-grid.vue一样, 表格的样式, 除了active,arrow,asc,dsc应由组件内定以外, 
  其余全部交由消费端(父组件)定制. 注意取消父组件style节的scoped标记

  其中属性含义如下:
    records:原始记录列表
    filter-key:查询用的过滤关键字词
    compares:针对各列的比较器, 未提供则采用普通的字符/数字顺序

  说明:在auto-sort-grid基础上, 弥补了它的缺陷:
    1. 列由组件内部自动识别, 且支持各条记录存在不同的列, 不存在该列, 则该条记录的对应值为undefined
    2. 支持针对各列的比较器配置.
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
          {{ prettyValue(row[key]) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, PropType, computed } from "vue";
import upperFirst from "lodash/upperFirst";
import { getType, print } from "@/common/mixins/func";
const debug = true;

export default defineComponent({
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
     * 针对每个列, 排序采用的比较方法.
     * 属性名对应列名, 值为比较方法. 未提供则采用默认的字符/数字/日期比较
     */
    compares: {
      type: Object as PropType<Record<string, (first: any, second: any) => number>>,
      default: () => {
        //这里不能写成 default: ()=>{}, 因歧义而导致ts认为返回void
        return {};
      },
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
    print(debug, "-------------", props);

    /**
     * 当前的索引关键字(当前的列名称)
     */
    const sortKey = ref("");

    /**
     * 记录所有列的当前排序方向(顺序还是逆序),
     * 属性名称为列名, 值为: 1,代表顺序; -1,代表逆序
     */
    const sortOrders = reactive<Record<string, 1 | -1>>({});
    props.records.forEach((rec) => {
      Object.keys(rec).forEach((key) => {
        if (!(key in sortOrders)) {
          sortOrders[key] = 1;
        }
      });
    });
    const columns = computed(() => Object.keys(sortOrders));

    /**
     * 获取处理(排序和/或过滤)后的record列表拷贝
     */
    const workedRecords = computed(() => {
      //对应原来的filterHeroes
      const fk = props.filterKey.toLowerCase();
      let recs: Record<string, any>[] = props.records;

      //需要过滤?
      if (fk.length > 0) {
        recs = recs.filter(function (rec) {
          return Object.values(rec).some((v: any) => {
            return String(v).toLowerCase().indexOf(fk) != -1;
          });
        });
      }

      //需要排序(首次加载时,则为原始顺序,不需排序.此时sortKey="")
      if (sortKey.value.length > 0) {
        recs = recs
          .slice()
          .sort((reca: Record<string, any>, recb: Record<string, any>) => {
            //sort会影响原数组
            const col = sortKey.value;
            const va = reca[col];
            const vb = recb[col];
            const cp = props.compares[col]; //是否定制比较器
            const temp = cp ? cp(va, vb) : va === vb ? 0 : va > vb ? 1 : -1;
            return temp * sortOrders[col];
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

    const prettyValue = (v: any): string => {
      let s = String(v);
      if (v instanceof Date) {
        s = (v as Date).toLocaleString();
      }
      return s;
    };

    return {
      /**
       * 当前的索引关键字(当前的列名称)
       */
      sortKey,

      columns,

      prettyValue,

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
