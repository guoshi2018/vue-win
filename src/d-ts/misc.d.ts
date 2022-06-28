//import { Guoshi, Interfaces, Student } from '@/common/type/guoshi.ts';

declare module "bootstrap-js";
declare module "lodash-js";
declare module "guoshi-js";
declare module "dynamics-js";
declare module "gsap-js";
declare module "currency-js";

declare module "*.vue" {
	import { defineComponent } from "vue";
	const Component: defineComponent<{}, {}, any>;
	const Component: ReturnType<typeof defineComponent>;
	export default Component;
}

/**
 * 表征屏幕坐标系平面上的一个点, 原点坐标相对于场景容器
 */
type Point = {
	/**
	 * 横坐标,水平向右为正
	 */
	x: number;
	/**
	 * 纵坐标,竖直向下为正
	 */
	y: number;
};

type Stat = {
	label: string;
	distance: number;
};

