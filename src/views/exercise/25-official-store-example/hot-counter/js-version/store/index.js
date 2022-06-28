import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

const state = {
  test: 0,
  count: 0,
  history: [],
};

const store = {
  state,
  getters,
  actions,
  mutations,
};

//看不出有什么作用或变化,对于数据的持久
if (module.hot) {
  module.hot.accept(["./getters", "./actions", "./mutations"], () => {
    store.hotUpdate({
      getters: require("./getters").default,
      actions: require("./actions").default,
      mutations: require("./mutations").default,
    });
  });
}

export default store;
