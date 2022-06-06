
//export 除的常量配置与store-helper的对应值不需要一致, 但一致却又能提高输入速度和可读性
//#region chat store:
export const js_chat = {
	/**
	 * action部分的方法名称,字段名和实际定义的方法名称(字符串)已经严格一致
	 */
	action: {
		getAllMessages: "getAllMessages",
		sendMessage: "sendMessage",
		switchThread: "switchThread",
	},
	/**
	 * getter部分的方法名称,字段名和实际定义的方法名称(字符串)已经严格一致
	 */
	getter: {
		threads: "threads",
		currentThread: "currentThread",
		currentMessages: "currentMessages",
		unreadCount: "unreadCount",
		sortedMessages: "sortedMessages",
	},
	/**
	 * mutation部分的方法名称,字段名和实际定义的方法名称(字符串)已经严格一致
	 */
	mutation: {
		receiveAll: "receiveAll",
		receiveMessage: "receiveMessage",
		switchThread: "switchThread",
	},
};
export const ts_chat = {
	action: {
		init: "init",
		saveMessageOptions: "saveMessageOptions",
	},
	getter: {
		threads: "threads",
		threadIds: "threadIds",
		currentThread: "currentThread",
		currentThreadId: "currentThreadId",
		currentMessages: "currentMessages",
		unreadThreadCount: "unreadThreadCount",
		sortedMessages: "sortedMessages",
	},
	mutation: {
		saveAsMessages: "saveAsMessages",
		saveAsMessage: "saveAsMessage",
		setCurrentThread: "setCurrentThread",
	},
	other: {
		/**
		 * 用于在消费端产生的新Chat线程使用的线程id前缀
		 */
		threadIdSpotPrefix: "th_id_spot_",
	}
}
//#endregion

//#region counter store:
export const counter = {
	action: {
		increment: "increment",
		decrement: "decrement",
		incrementIfOdd: "incrementIfOdd",
		incrementAsync: "incrementAsync",
	},
	getter: {
		evenOrOdd: "evenOrOdd",
		currentCount: "currentCount",
	},
	mutation: {
		increment: "increment",
		decrement: "decrement",
	}
}

export const hot_counter = {
	action: counter.action,
	getter: {
		currentCount: "currentCount",
		test: "test",
		recentHistory: "recentHistory",
	},
	mutation: counter.mutation,
	other: {
		limit: 5,
	}
}
//#endregion

//#region other

//#endregion


