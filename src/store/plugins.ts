import { createLogger, Mutation, MutationPayload, Action, Store } from "vuex";

import { Guoshi } from "@/common/type/guoshi";

import { print } from "@/common/mixins/func";
const debug = false;

const localStoragePlugin = (store: Store<Guoshi.Interfaces.Student>) => {
  store.subscribe((mut: MutationPayload, sta: Guoshi.Interfaces.Student) => {
    // try {
    //   print(debug,'prepare to set to window local storage...', mutation, todos);
    //   window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    //   print(debug,`write item:${todos}`);
    // } catch (err) {
    //   print(debug,'store subscribe failed.', store, mutation);
    // }
    print(debug, "plugin for mutaion called,", mut, sta);
  });
};

export default process.env.NODE_ENV !== "production"
  ? [createLogger(), localStoragePlugin]
  : [localStoragePlugin];
