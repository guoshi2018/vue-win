import api from './network';
import { ChatMessageOptions } from './options';
import ChatThread from './ChatThread.class';
import ChatMessage from './ChatMessage.class';
/**
 * 描述 vue state 类
 */
export default class {
	/**
	 * 定义当前线程对象, 内部使用
	 */
	protected _currentThread: ChatThread;
	/**
	 * 获取当前线程对象
	 */
	public get currentThread(): ChatThread {
		return this._currentThread;
	}
	/**
	 * 设置指定的线程对象或者线程id为当前值, 如果指定的线程不在范围内, 则忽略
	 */
	public setCurrentThread(value: ChatThread | string): void {
		if (typeof value == "string") {
			const th = this._getThreadById(value);
			if (th && this.threads.includes(th)) {
				this._currentThread = th;
				th.isRead = true;
			}
		} else {
			if (this.threads.includes(value)) {
				this._currentThread = value;
				value.isRead = true;
			}
		}
	}
	/**
	 * 获取包含最新消息的线程
	 * @returns 包含最新消息的线程
	 */
	public get newestThread(): ChatThread {
		return this.threads.reduce((newestTh: ChatThread, currTh: ChatThread) => {
			return currTh.newestMessage.timestamp > newestTh.newestMessage.timestamp ? currTh : newestTh;
		}, ChatThread.EmptyThread);
	}
	/**
	 * 获取没有查看过的线程总数
	 * @returns 线程总数
	 */
	public get unreadThreadCount(): number {
		return this.threads.reduce(
			(count, th) => th.isRead ? count : count + 1, 0);
	}
	/**
	 * 获取当前线程包含的所有消息, 按时间先后排列后的拷贝
	 * @returns 注意返回的是拷贝, 原版的Set顺序并没改变
	 */
	public get sortedCurrentMessages(): ChatMessage[] {
		return this._currentThread.underMessages.slice()
			.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
	}
	/**
	 * 获取所有的chat线程构成的Set
	 */
	public readonly threads: Array<ChatThread>;

	/**
	 * 
	 * @returns 获取所有的线程id构成的数组
	 */
	public getThreadIds(): string[] {
		return this.threads.map(th => th.id);
	}

	/**
	 * 创建ChatState对象,默认线程为空Set,当前线程为空线程
	 */
	public constructor() {
		this.threads = [];
		this._currentThread = ChatThread.EmptyThread;
	}

	/**
	 * 将给定的消息选项对象数组,保存为消息对象数组
	 * @param messages 消息选项对象数组
	 */
	public saveAsMessages(msgOpts: ChatMessageOptions[]): void {
		msgOpts.forEach(msgOpt => {
			this._createMessage(msgOpt);
		})
	}

	/**
	 * 将给定的消息选项对象,保存为消息对象
	 * @param msgOpt 消息选项对象
	 */
	public saveAsMessage(msgOpt: ChatMessageOptions): void {
		this._createMessage(msgOpt);
	}

	/**
	 * 清空数据
	 */
	public empty(): void {
		this.threads.forEach(th => {
			th.underMessages.length = 0;
		});
		this.threads.length = 0;
	}

	private _getThreadById(id: string) {
		return this.threads.find(th => th.id == id);
	}

	/**
 * 根据ChatMessageOptions指定的选项,生成ChatMessage,并安置到合适的thread.
 * @param msgOpt 选项, 用来创建ChatMessage
 */
	private _createMessage(msgOpt: ChatMessageOptions) {
		const message = new ChatMessage(msgOpt);
		let hostThread = this._getThreadById(message.hostThreadId);
		if (!hostThread) {
			hostThread = new ChatThread({
				id: msgOpt.hostThreadId,
			});
			this.threads.push(hostThread);
		}
		hostThread.underMessages.push(message);
	}
}
