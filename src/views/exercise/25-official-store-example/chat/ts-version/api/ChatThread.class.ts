
import { indexicalString } from '@/common/mixins/func';
import { ChatThreadOptions } from './options';
import ChatMessage from './ChatMessage.class';
import { THREAD_ID_PREF, EMPTY_THREAD } from './const';

export default class ChatThread {
	/**
 * 线程编号id
 */
	public id: string;
	// /**
	//  * 线程名称
	//  */
	// name?: String;
	/**
	 * 该线程的所有消息
	 */
	public readonly underMessages: Array<ChatMessage>;
	/**
	 * 最近一个消息id, 以时间最新为依据, 而不一定是消息的窗体发送时间
	 * 因为要考虑伪造的消息生成时间戳
	 */
	public get newestMessage(): ChatMessage {
		return this.underMessages.reduce((tgt: ChatMessage, cur: ChatMessage) => {
			return tgt.timestamp < cur.timestamp ? cur : tgt;
		}, ChatMessage.EarliestMessage);
	}
	/**
	 * 是否已经看过
	 */
	public isRead: boolean;
	/**
	 * 唯一性,可保证对于THREAD_ID_PREF,获得的id值不同
	 */
	private static ThreadIdGenerator = indexicalString(THREAD_ID_PREF);

	public constructor(threadOpt: ChatThreadOptions) {
		this.id = threadOpt.id || ChatThread.ThreadIdGenerator.next().value;
		this.isRead = threadOpt.isRead || false;
		this.underMessages = [];
	}

	public static EmptyThread = new ChatThread({
		id: EMPTY_THREAD,
	});

	// /**
	//  * 添加消息到线程, 重复添加被忽略
	//  * @param message 待添加的消息
	//  */
	// public acceptMessage(message: ChatMessage) {
	// 	this.underMessages.add(message);
	// }

	// /**
	//  * 将消息从线程抛弃, 如果
	//  * @param message 待抛弃的消息
	//  */
	// public rejectMessage(message: ChatMessage) {
	// 	this.underMessages.delete(message);
	// }

}