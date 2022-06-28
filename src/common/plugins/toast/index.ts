
//使用示范: 25-official-store-example
import MyToast from "./toast.vue";
import { App, createVNode, render, version } from "vue";
import { Guoshi } from "@/common/type/guoshi";
import { print } from "@/common/mixins/func";
const debug = false;

// interface IOptions {
// 	message?: string,
// 	duration?: number,
// 	onClose?: () => void,
// }

export default {
	install: (app: App<Element>): void => {

		const defaultOptions: Guoshi.Interfaces.ToastOptions = {
			message: '未定义的toast消息',
			duration: 2800,
			onClose: () => {
				print(debug, 'toast已关闭!');
			},
		};

		//防止销毁前的重入
		let isToast = false;

		//注册全局方法，相当于vue2的Vue.prototype.$myToast
		app.config.globalProperties.$toast = function (opts?: Guoshi.Interfaces.ToastOptions): void {
			if (!isToast) {
				isToast = true;

				const o = Object.assign({}, defaultOptions, opts);

				//准备元素, container的目的,在于方便removeChild的调用
				const vm = createVNode(MyToast); //就是所谓的 h
				const container = document.createElement("div");
				render(vm, container);
				document.body.appendChild(container);

				//根据版本不同, 采用不同赋值方式
				const ver = Number(version.split('.')[0]);
				if (ver >= 2) {
					//@ts-ignore 
					vm.component[ver == 2 ? "data" : "props"].message = o.message;
				} else {
					throw new Error('toast遇到不支持的vue版本');
				}

				//定时销毁
				setTimeout(() => {
					document.body.removeChild(container);
					isToast = false;
					if (o.onClose) {
						o.onClose();
					}
				}, o.duration);
			}
		}
	}
}
