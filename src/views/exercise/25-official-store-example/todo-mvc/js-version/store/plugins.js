import { createLogger } from 'vuex'
import { STORAGE_KEY } from './mutations'


//将plugin硬塞到store的子模块中, 并无效果. plugin只能定义在根store里
const localStoragePlugin = store => {
  store.subscribe((mutation, { todos }) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    console.log(`write item:${todos}`);
  })
}

export default process.env.NODE_ENV !== 'production'
  ? [createLogger(), localStoragePlugin]
  : [localStoragePlugin]
