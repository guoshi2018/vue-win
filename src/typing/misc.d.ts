declare module '*.vue' {
	import { defineComponent } from 'vue'
	const Component: ReturnType<typeof defineComponent>
	export default Component
};



declare module 'bootstrap-js'
declare module 'lodash-js'
declare module 'guoshi-js'