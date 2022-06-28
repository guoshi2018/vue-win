import { ChatMessageOptions } from './options';
import msgOpts from './mock-data';
import { LATENCY } from './const';
import { sleep } from "@/common/mixins/func";
import LoadingStateManager from "@/views/data-loading/manager.class";

const manager = LoadingStateManager.getInstance();
/**
 * 模拟从网络加载原有消息数据
 * @returns 承诺, 相应数据为消息数组
 */
async function messageOptionsFromServer(): Promise<Array<ChatMessageOptions>> {
  manager.loading('正在获取ts_chat所有消息...');
  await sleep(LATENCY);
  manager.loaded('获取ts-chat消息结束');
  return msgOpts as Array<ChatMessageOptions>;
}

/**
 * 模拟上传消息到服务器
 * @param msgOpt 以此代表消息各项信息
 */
async function messageOptionsToServer(msgOpt: ChatMessageOptions): Promise<void> {
  manager.loading('正在上传ts_chat所有消息...');
  await sleep(LATENCY);
  manager.loaded('上传ts-chat消息结束');
}

export default {
  messageOptionsFromServer,
  messageOptionsToServer,
}
