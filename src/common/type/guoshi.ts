// import { Guoshi} from "@/common/type/guoshi";
export namespace Guoshi {
	export namespace Consts {
		//#region const
		/*
		使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。这样可以使
		linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者
		对整个 app 包含的 mutation 一目了然：
		mutations type:
		*/
		export const INCREMENT = "increment";
		export const ADD_COUNT = "addCount";
		export const ADD_TODO = "addTodo";
		export const ADD_USING_OBJECT_STYLE = "addUsingObjectStyle";
		export const REVERSE = "reverse";
		export const UPDATE_UTTERANCE = "updateUtterance";
		//#endregion

		export const I18N = {
			apply: "应用",
			model: "模板",
			compute: "计算",
			data: "数据",
			watch: "侦听",
			listen: "监听",
			condition: "条件",
			hello: "您好",
		};
	}

	export namespace Enums {
		//#region enum
		/**
		 * 国家枚举:
		 * 举例:obj.country=Coutry.Canada,则
		 * 		使用Country[obj.country]得到字符串而非数字
		 */
		export enum Country {
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
		//#endregion
	}

	export namespace Types {
		//#region type
		/**
		 * 比拟代办事项
		 */
		export type Todo = {
			/**
			 * 编号
			 */
			id: number;
			/**
			 * 事项描述
			 */
			description: string;
			/**
			 * 是否已完成
			 */
			done: boolean;
		};

		export type Range = "all" | "done" | "undone";

		/**
		 * 载荷类型
		 */
		export type Payload = {
			/**
			 * count增加的数量
			 */
			amount: number;
			/**
			 * 待办事项
			 */
			todo: Todo;
		};

		/**
		 * 实验使用的载荷类型
		 */
		export type ExamPayload = {
			/**
			 * 延时的毫秒数
			 */
			msDelay: number;
			/**
			 * 话语
			 */
			saying: string;
			/**
			 * 如果在模块内部调用其他action或mutation,是否调用根级
			 */
			nextCallRoot?: boolean;
		};

		/**
		 * 妻子
		 */
		export type Wife = {
			/**
			 * 姓名
			 */
			name: string;
			/**
			 * 国籍
			 */
			country: Enums.Country;
			/**
			 * 生日
			 */
			birth: Date;
			/**
			 * 薪水
			 */
			salary: number;
		};
		/**
		 * 书籍
		 */
		export type Book = {
			/**
			 * 编号
			 */
			id: string;
			/**
			 * 书名
			 */
			name: string;
			/**
			 * 出版日期
			 */
			publishTime: Date;
			/**
			 * 售价
			 */
			price: number;
		};

		/**
		 * 实验使用的对象,用于返回值
		 */
		export type TrialUnit = {
			/**
			 * 必须的返回描述,以标识与众不同
			 */
			description: string;
			/**
			 * 参数数组
			 */
			args: Array<any>;
		};

		// 声明自己的 store state
		/**
		 * 试验用的学生接口
		
		interface Student {
			ModA: VueState,
			ModB: UserInfo,
			ModC: Author,
		}*/
		export type LoadingState = {
			loadingReqs: number;
		};
		//#endregion
	}

	export namespace Interfaces {
		//#region
		/**
		 * 容器, 包含多个不同的方法. 这些方法根据td内包含的数据类型的不同,得到不同的比较关键字
		 */
		export interface SortKeyMethodContainer {
			[name: string]: (jele: JQuery<HTMLElement>) => string | Date | number;
		}

		/**
		 * toast插件的相关选项
		 */
		export interface ToastOptions {
			/**
			 * 提示的消息文本
			 */
			message?: string;
			/**
			 * 延时多久自动关闭
			 */
			duration?: number;
			/**
			 * toast关闭后的回调函数
			 */
			onClose?: () => void;
		}

		/**
		 * i18n插件的安装时采用的参数
		 */
		export interface I18nStrings {
			[key: string]: string;
		}

		/**
		 * root: 根store的state的具体类型
		 */
		export interface Student {
			/**
			 * 顶级state的字段(属性)之一
			 */
			name: string;
			/**
			 * 顶级state的字段(属性)之二
			 */
			age: number;
		}
		/**
		 * A: 子级store模块modA的state的具体类型
		 */
		export interface VueState {
			/**
			 * 当前计数值
			 */
			count: number;
			/**
			 * 话语
			 */
			utterance: string;
			/**
			 * 待办事项数组
			 */
			todos: Types.Todo[];
		}
		/**
		 * B: 子级store模块modB的state的具体类型
		 */
		export interface UserInfo {
			/**
			 * 昵称
			 */
			nickName: string;
			/**
			 * 是否Vip
			 */
			isVip: boolean;
			/**
			 * 加盟时间
			 */
			joinTime: Date;
			/**
			 * 妻子数组
			 */
			wifes: Types.Wife[];
		}
		/**
		 * C: 子级store模块modC的state的具体类型
		 */
		export interface Author {
			/**
			 * 姓名
			 */
			name: string;
			/**
			 * 国籍
			 */
			country: Enums.Country;
			/**
			 * 出版的书籍
			 */
			books: Array<Types.Book>;
		}

		//以下带Pro后缀的接口,是为适应vuex查找子模块的state的语法:
		//store.state.childMod1.childMod2.prop
		//以达到ts智能感知, 并消除红波浪线的目的
		/**
		 * for modC wrapper,暂无子级
		 */
		export interface AuthorPro extends Author {
			other: any; //暂无
		}
		/**
		 * for modB wrapper
		 */
		export interface UserInfoPro extends UserInfo {
			/**
			 * 为了ts智能感知, 简化处理.
			 * 如果下级还有下级, 应该是其对应wrapper, 即AuthorPro
			 */
			modC: Author;
		}
		/**
		 * for modA wrapper
		 */
		export interface VueStatePro extends VueState {
			other: any; //暂无
		}

		/**
		 * for root wrapper
		 */
		export interface StudentPro extends Student {
			/**
			 * store模块A
			 */
			modA: VueState;
			/**
			 * store模块B
			 */
			modB: UserInfoPro;
			/**
			 * store模块C
			 */
			modC: Author;


		}

		//#endregion
	}
}
