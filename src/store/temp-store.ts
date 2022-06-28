//用以测试store动态切换之用

import { createStore } from "vuex";
import { Guoshi } from "@/common/type/guoshi";
import { print } from "@/common/mixins/func";
const debug = true;

export default createStore({
  /*
		在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，
		将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。
		且是全局的.子模块无法覆盖此设置
	*/
  strict: process.env.NODE_ENV != "production",
  state() {
    return {
      temp1: 18,
      temp2: "hey",
    };
  },
  getters: {
    tempGet: (...rest): Guoshi.Types.TrialUnit => {
      return {
        description: "temp desc",
        //	args: rest,
        args: ["one", "two", "three"],
      };
    },
  },

  mutations: {
    tempMut: (...rest): void => {
      print(debug, "temp mutation:", rest);
    },
  },

  actions: {
    tempAct(context, payload: Guoshi.Types.ExamPayload, ...rest) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          context.commit("tempMut", payload, ...rest);
          resolve({
            description: "examActRoot resolve for promise.",
            args: [context, payload, rest],
          });
        }, payload.msDelay);
      });
    },
  },
});
