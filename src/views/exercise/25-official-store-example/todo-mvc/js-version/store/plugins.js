import { print } from "@/common/mixins/func";

import { createLogger } from 'vuex'
import { STORAGE_KEY } from './mutations'

const debug = true;

//将plugin硬塞到store的子模块中, 并无效果. plugin只能定义在根store里
//从语法上讲是因为,plugins只是store的属性, 而module没有该属性
const localStoragePlugin = store => {
  store.subscribe((mutation, { todos }) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    print(debug, `write item:${todos}`);
  })
}

export default process.env.NODE_ENV !== 'production'
  ? [createLogger(), localStoragePlugin]
  : [localStoragePlugin]
