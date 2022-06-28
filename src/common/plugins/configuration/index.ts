

import { App, ComponentPublicInstance, createVNode, render, version, AppConfig, RuntimeCompilerOptions } from "vue";
import { print, getType } from "@/common/mixins/func";
const debug = false;

// interface IOptions {
// 	message?: string,
// 	duration?: number,
// 	onClose?: () => void,
// }

export default {
	install: (app: App<Element>): void => {
		if (debug) {

			Object.assign(app.config, {

				//仅开发环境下生效
				warnHandler: (msg: string, instance: ComponentPublicInstance | null, trace: string) => {
					print(debug, 'warning:', instance, trace, msg);
				},

				// 处理组件渲染函数和侦听器执行期间抛出的未捕获错误,注意不是任何情况下的错误
				errorHandler: (err: unknown, instance: ComponentPublicInstance | null, info: string) => {
					print(debug, 'error:', instance, info, err);
				},

				//在此添加自定义属性, 任何组件都可以访问到.例如: this.author, this.date
				globalProperties: Object.assign({}, app.config.globalProperties, {
					author: 'Guo shi',
					date: new Date(2022, 6, 22),
				} as Record<string, any>),

				//是否启用在浏览器开发工具的 performance/timeline 面板中启用对组件初始化、
				//编译、渲染和更新的性能追踪
				performance: true,

				//运行时有效
				compilerOptions: Object.assign({}, app.config.compilerOptions, {

					//任何以 'guo-shi-' 开头的元素都会被识别为自定义元素,
					//无此, 则Vue会抛出 Unknown custom element 的警告
					isCustomElement: tag => tag.startsWith('guo-shi-'),

					//模板元素之间的空格怎么处理
					whitespace: "condense",	//default

					//模板内文本插值的分隔符,用于避免和同样使用双大括号语法的服务端框架发生冲突
					//delimiters: ['${', '}'], //似乎不起作用,至少在apache上

					//Html注释是否保留
					//comments: true,//似乎不起作用,至少在apache上

				} as RuntimeCompilerOptions),
			} as AppConfig);
		}

	}
}
