
import { indexicalString } from '@/common/mixins/func';
import { ChatMessageOptions } from './options';
import { MESSAGE_ID_PREF, SPEAKER_PREF, NO_TEXT, THREAD_ID_PREF } from './const';

export default class ChatMessage {
	/**
 * 编号,只读属性
 */
	public readonly id: string;
	/**
	 * 消息时间戳,只读属性
	 */
	public readonly timestamp: number;
	/**
	 * 消息发送者名称,只读属性
	 */
	public readonly speaker: string;
	/**
 * 该消息所属的线程id,只读属性
 */
	public hostThreadId: string;
	/**
	 * 消息文本
	 */
	public text: string;

	/**
	 * 唯一性,可保证对于MESSAGE_ID_PREF,获得的id值不同
	 */
	private static MessageIdGenerator = indexicalString(MESSAGE_ID_PREF);
	/**
	 * 唯一性,可保证对于SPEAKER_PREF,获得的speaker值不同
	 */
	private static SpeakerGenerator = indexicalString(SPEAKER_PREF);
	/**
	 * 唯一性,可保证对于THREAD_ID_PREF,获得的hostThreadId值不同
	 */
	private static HostThreadIdGenerator = indexicalString(THREAD_ID_PREF);

	public constructor(msgOpt: ChatMessageOptions) {
		this.id = msgOpt.id || ChatMessage.MessageIdGenerator.next().value;
		this.text = msgOpt.text || NO_TEXT;
		this.timestamp = msgOpt.timestamp || Date.now();
		this.speaker = msgOpt.speaker || ChatMessage.SpeakerGenerator.next().value;
		this.hostThreadId = msgOpt.hostThreadId || ChatMessage.HostThreadIdGenerator.next().value;
	}

	public static EarliestMessage = new ChatMessage({
		timestamp: -1,
	});
}
