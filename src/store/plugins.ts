import { createLogger, Mutation, MutationPayload, Action, Store } from 'vuex'


const localStoragePlugin = (store: Store<Guoshi.Types.Student>) => {
  store.subscribe((mut: MutationPayload, sta: Guoshi.Types.Student) => {
    // try {
    //   console.log('prepare to set to window local storage...', mutation, todos);
    //   window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    //   console.log(`write item:${todos}`);
    // } catch (err) {
    //   console.log('store subscribe failed.', store, mutation);
    // }
    console.log("plugin for mutaion called,", mut, sta);
  })
}

export default process.env.NODE_ENV !== 'production'
  ? [createLogger(), localStoragePlugin]
  : [localStoragePlugin]
