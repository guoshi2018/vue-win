
//用法 import {...} from '@/common/mixins/func.ts'

const guidString = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return 's' + v.toString(16);
  });
};
const sleep = (ms: number): Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => resolve('timeout'), ms);
  });
};

/**
 * 原生实现跨域,需要服务器端参数名为callback,代表客户端的回调函数名称
 * @param destUrl:目的地址
 * @param callback :客户端的回调函数
 * @param callbackNameInServer:服务器端指示回调函数值的参数名称
 */
const corsData = (destUrl: string, callback: (data: any) => void, callbackNameInServer: string) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  // 传参一个回调函数名给后端，方便后端返回时执行这个在前端定义的回调函数
  //script.src = url + '?callback=fillTable';
  script.src = `${destUrl}?${callbackNameInServer}=${callback.name}`;
  script.addEventListener('load', function () {
    document.head.removeChild(script);
  }, false);
  document.head.appendChild(script);
};

/**
 * 生成索引形式的字符串.例如指定先导字串为"pre",则使用返回的生成器g的next()
 * 方法,可依次获取字串:pre1 pre2 pre3 ... 
 * @param prefix 先导字串
 */
const indexicalString = function* (prefix: string): Generator<string, string> {
  let seed = 0;
  while (true) {
    seed++;
    yield `${prefix}${seed}`;
  }
}

export {
  guidString, sleep, corsData, indexicalString,
};

