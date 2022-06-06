
/**
 * 聊天消息
 */
type ChatMessageOptions = {
	/**
	 * 编号
	 */
	id?: string,
	/**
	 * 消息文本
	 */
	text?: string,
	/**
	 * 消息时间戳
	 */
	timestamp?: number,
	/**
	 * 消息发送者名称
	 */
	speaker?: string,
	/**
	 * 所属线程的id
	 */
	hostThreadId?: string,
};

/**
 * 聊天线程
 */
type ChatThreadOptions = {
	/**
	 * 线程编号id
	 */
	id?: string;
	/**
	 * 是否已经看过
	 */
	isRead?: boolean;

};

export {
	ChatMessageOptions, ChatThreadOptions
}