
import { ChatMessageOptions } from './options';

//各个数据有意参差不齐
export default [
  {
    text: 'Hey Jing, want to give a Flux talk at ForwardJS?',
    timestamp: Date.now() + 99999,
    hostThreadId: 't_1',
  },
  {
    id: 'm_2',
    speaker: 'Bill',
    hostThreadId: 't_3',
  },
  {
    id: 'm_3',
    text: 'Sounds good.  Will they be serving dessert?',
    timestamp: Date.now() - 79999,

  },
  {
  },
  {
    hostThreadId: 't_1',
  },
  {
    id: 'm_6',
    hostThreadId: 't_1',
  },
  {
    id: 'm_7',
    text: 'At ForwardJS?  Yeah, of course.  See you there!',
    timestamp: Date.now() - 39999,
    speaker: 'Brian',
  },
  {
    id: 'm_8',
    text: '模块动态注册功能使得其他 Vue 插件可以通过',
    timestamp: Date.now() + 399999212,
    speaker: 'guoshi',
    hostThreadId: 't_2',
  },
  {
    id: 'm_9',
    text: '而不是以路径字符串的形式传递给 module。',
    timestamp: Date.now() + 12345,
  },
  {
    id: 'm_10',
    text: '明模块的状态，那么这个状态对象会通过',
    hostThreadId: 't_2',
  }
] as ChatMessageOptions[];
