
import { Ref, PropType } from "vue";

/**
 * 暴露给父组件的属性名称为model-value时, 并以此作为组件的内部meter的value属性的代理时,
 * 为实现双向绑定, 需要引发的事件名称
 */
export const UpdateModelValue = "update:model-value";
/**
 * 暴露给父组件的属性名称为value时, 并以此作为组件的内部meter的value属性的代理时,
 * 为实现双向绑定, 需要引发的事件名称
 */
export const UpdateValue = "update:value";

/**
 * meter的value值变化事件.参数为变化后的新值.
 * 注意,事件仅在组件内引发, meter的value值若因外界引起的变化,则与之无关.
 */
export const ValueChanged = "value-changed";

/**
 * 仅对axis-label有效. 点击delete按钮时引发, 表示请求外界删除组件
 */
export const RequestDelete = "request-delete";

/**
 * axis-label axis-solo-old axis-solo组件在引发事件时的参数
 * axis-label: 		适用于 UpdateModelValue ValueChanged RequestDelete
 * axis-solo-old: 	适用于 UpdateModelValue UpdateValue ValueChanged
 * axis-solo:			适用于 UpdateModelValue UpdateValue ValueChanged
 */
export interface AxisEvent {
	/**
	 * 事件的实际类型
	 */
	readonly type:
	| typeof UpdateModelValue
	| typeof UpdateValue
	| typeof ValueChanged
	| typeof RequestDelete;

	/**
	 * 由于这些事件起源于组件内的原生html事件,这里记录的就是它
	 */
	readonly originalEvent: Event;

	/**
	 * 就组件外界看来, 事件的发起者,即组件模板的顶级html
	 * axis-lable: 为其顶级标签div
	 * axis-solo-old: 为实际被渲染并工作的meter(另一个未渲染), 与下面的meter属性相同
	 * axis-solo: 为内部唯一的元素meter, 与下面的meter属性相同
	 */
	readonly sender: HTMLElement;

	/**
	 * 内部使用的原生meter
	 * axis-label: 为内部的meter
	 * axis-solo-old和axis-solo渲染后, 均为单根组件, 故meter与sender相同:
	 */
	readonly meter: HTMLMeterElement;

	/**
	 * 当前采用的是哪一个属性,作为内部meter的value属性值映射
	 */
	who2value: string;
}

/**
 * 切换器, 根据当前使用value还是model-value属性,以实现两种情况下的响应性
 * 仅适用于axis-solo组件
 */
export interface MeterSuitChoice {
	/**
	 * meter的value属性, 当前应该绑定的变量
	 * 定义成 number类型, 然后简单切换值则失败
	 */
	meterValue: Ref<number>;

	/**
	 * 双向绑定, 对应于当前使用的是value还是model-value, 应该发送的事件名称
	 */
	updateEventName: typeof UpdateModelValue | typeof UpdateValue;

	/**
	 * 当前采用的是哪一个属性,映射到meter的value属性值
	 */
	who2value: string;
}
