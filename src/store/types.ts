
/*
使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。这样可以使
 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者
 对整个 app 包含的 mutation 一目了然：
mutations type:
*/
const INCREMENT = "increment";
const ADD_COUNT = "addCount";
const ADD_TODO = "addTodo";
const ADD_USING_OBJECT_STYLE = "addUsingObjectStyle";
const REVERSE = "reverse";


/**
 * 比拟代办事项
 */
type Todo = {
	/**
	 * 编号
	 */
	id: number,
	/**
	 * 事项描述
	 */
	description: string,
	/**
	 * 是否已完成
	 */
	done: boolean,
};
/**
 * 载荷类型
 */
type Payload = {
	/**
	 * count增加的数量
	 */
	amount: number,
	/**
	 * 待办事项
	 */
	todo: Todo,
};

/**
 * 实验使用的载荷类型
 */
type ExamPayload = {
	/**
	 * 延时的毫秒数
	 */
	msDelay: number,
	/**
	 * 话语
	 */
	saying: string,
	/**
	 * 如果在模块内部调用其他action或mutation,是否调用根级
	 */
	nextCallRoot?: boolean,
};


/**
 * 描述 vue state 接口
 */
interface IVueState {
	/**
	 * 当前计数值
	 */
	count: number,
	/**
	 * 话语
	 */
	utterance: string,
	/**
	 * 待办事项数组
	 */
	todos: Todo[],
}

/**
 * 国家枚举:
 * 举例:obj.country=Coutry.Canada,则
 * 		使用Country[obj.country]得到字符串而非数字
 */
enum Country {
	/**
	 * 美国
	 */
	US,
	/**
	 * 中国
	 */
	CN,
	/**
	 * 英国
	 */
	UN,
	/**
	 * 加拿大
	 */
	Canada,
	/**
	 * 阿尔及利亚
	 */
	Alerjiaya,
	/**
	 * 澳大利亚
	 */
	Australia,
	/**
	 * 韩国
	 */
	Koria,
}

/**
 * 妻子
 */
type Wife = {
	/**
	 * 姓名
	 */
	name: string,
	/**
	 * 国籍
	 */
	country: Country,
	/**
	 * 生日
	 */
	birth: Date,
	/**
	 * 薪水
	 */
	salary: number,
};
/**
 * 用户信息
 */
type UserInfo = {
	/**
	 * 昵称
	 */
	nickName: string,
	/**
	 * 是否Vip
	 */
	isVip: boolean,
	/**
	 * 加盟时间
	 */
	joinTime: Date,
	/**
	 * 妻子数组
	 */
	wifes: Wife[],
};

/**
 * 书籍
 */
type Book = {
	/**
	 * 编号
	 */
	id: string,
	/**
	 * 书名
	 */
	name: string,
	/**
	 * 出版日期
	 */
	publishTime: Date,
	/**
	 * 售价
	 */
	price: number,
};
/**
 * 作家
 */
type Author = {
	/**
	 * 姓名
	 */
	name: string,
	/**
	 * 国籍
	 */
	country: Country,
	/**
	 * 出版的书籍
	 */
	books: Array<Book>,
};

/**
 * 实验使用的对象,用于返回值
 */
type TrialUnit = {
	/**
	 * 必须的返回描述,以标识与众不同
	 */
	description: string,
	/**
	 * 参数数组
	 */
	args: Array<any>,
}

type Student = {
	name: string,
	age: number,
};



export {
	TrialUnit,
};
export {
	INCREMENT, ADD_COUNT, ADD_TODO, ADD_USING_OBJECT_STYLE, REVERSE,
};
export {
	Todo, Payload, IVueState, ExamPayload,
};
export {
	Country, UserInfo, Wife, Book, Author,
};
export {
	Student,
}


