
//用法 import {...} from '@/common/mixins/func.ts'

const guidString = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return 's' + v.toString(16);
  });
};
const sleep = (ms: number) => {
  return new Promise(resolve => {
    setTimeout(() => resolve('timeout'), ms);
  });
};

export {
  guidString, sleep,
};

