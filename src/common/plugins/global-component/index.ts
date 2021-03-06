import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import { App } from "vue";
import { print } from "@/common/mixins/func";
const debug = false;

export default {
	install: (app: App<Element>): void => {
		const requireComponent = require.context(
			// 组件目录的相对路径
			"@/common/components",
			// 是否查询其子目录
			true,
			// 匹配组件文件名的正则表达式
			/\w+\.(vue)$/
		);

		requireComponent.keys().forEach((filename: string) => {
			// 获取组件配置
			const componentConfig = requireComponent(filename);

			// 获取组件的 PascalCase 命名
			const componentName = upperFirst(
				camelCase(
					// 获取和目录深度无关的文件名
					//@ts-ignore
					filename
						.split(/\/|\\/)
						.pop()
						.replace(/\.\w+$/, "")
				)
			);

			print(debug, `prepare to reg global componennt:${componentName}`);

			// 全局注册组件
			app.component(
				componentName,
				// 如果这个组件选项是通过 `export default` 导出的，
				// 那么就会优先使用 `.default`，
				// 否则回退到使用模块的根。
				componentConfig.default || componentConfig
			);
		});
	},
};

/*

const requireComponent = require.context(
	// 组件目录的相对路径
	'@/common/components',
	// 是否查询其子目录
	true,
	// 匹配基础组件文件名的正则表达式
	/\w+\.(vue)$/
)

requireComponent.keys().forEach((filename: string) => {
	// 获取组件配置
	const componentConfig = requireComponent(filename)

	// 获取组件的 PascalCase 命名
	const componentName = upperFirst(
		camelCase(
			// 获取和目录深度无关的文件名
			//@ts-ignore
			filename.split(/\/|\\/).pop().replace(/\.\w+$/, '')
		)
	)

	print(debug,`prepare to reg global componennt:${componentName}`);

	// 全局注册组件
	app.component(
		componentName,
		// 如果这个组件选项是通过 `export default` 导出的，
		// 那么就会优先使用 `.default`，
		// 否则回退到使用模块的根。
		componentConfig.default || componentConfig
	)
})
*/
