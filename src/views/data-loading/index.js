import { sleep } from "@/common/mixins/func";
import LoadingStateManager from "@/views/data-loading/manager.class";

const data = require('./mock-data')
const LATENCY = 5000;     //ms



export async function getAllMessages(cb) {

  const mgr = LoadingStateManager.getInstance();

  mgr && mgr.loading('正在获取js-chat所有消息...');

  await sleep(LATENCY);
  cb(data);

  mgr && mgr.loaded('获取js-chat消息结束');
}

export async function createMessage({ text, thread }, cb) {

  const mgr = LoadingStateManager.getInstance();
  mgr && mgr.loading("正在上传js-chat消息...");

  const timestamp = Date.now()
  const id = 'm_' + timestamp
  const message = {
    id,
    text,
    timestamp,
    threadID: thread.id,
    threadName: thread.name,
    authorName: 'Evan'
  }
  await sleep(LATENCY);
  cb(message);

  mgr && mgr.loaded("上传js-chat消息成功!");
}


