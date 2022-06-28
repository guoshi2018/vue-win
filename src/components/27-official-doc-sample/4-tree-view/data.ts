//export namespace TreeView {
export const BeforeCollapseChange = "before-collapse-change";
export const AfterCollapseChange = "after-collapse-change";
export const BeforeLeafToBranch = "before-leaf-to-branch";
export const AfterLeafToBranch = "after-leaf-to-branch";
export const BeforeAddItem = "before-add-item";
export const AfterAddItem = "after-add-item";

/**
 * 表针树的一个节点, 可以是leaf或branch
 */
export interface TreeNode {
	title?: String;
	children?: TreeNode[];
}

/**
 * TreeNode的事件基接口
 */
export interface TreeNodeEvent {
	/**
	 * TreeView事件的具体类型
	 */
	readonly type:
	| typeof BeforeCollapseChange
	| typeof AfterCollapseChange
	| typeof BeforeLeafToBranch
	| typeof AfterLeafToBranch
	| typeof BeforeAddItem
	| typeof AfterAddItem;
	/**
	 * 事件发送者
	 */
	readonly sender: TreeNode;
	/**
	 * 原始 Html 事件对象
	 */
	readonly originalEvent: Event;

	/**
	 * 仅对Before系列的事件有效
	 * 是否取消该事件引发的treeview自身的效果,
	 */
	cancel: boolean;

	/**
	 * 当前的折叠状态
	 */
	currentCollapse?: Boolean;

	/**
	 * 仅对新建节点有效:
	 * 新建节点的title
	 */
	newTitle?: string;

	/**
	 * 仅对转换节点事件有效:
	 * leaf to branch后, 父节点是否处于折叠
	 */
	nextCollapse?: boolean;
}

export const events = {
	beforeCollapseChange: BeforeCollapseChange,
	afterCollapseChange: AfterCollapseChange,
	beforeLeafToBranch: BeforeLeafToBranch,
	afterLeafToBranch: AfterLeafToBranch,
	beforeAddItem: BeforeAddItem,
	afterAddItem: AfterAddItem,
};
