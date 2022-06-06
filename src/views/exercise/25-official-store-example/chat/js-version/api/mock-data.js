module.exports = [
  {
    id: 'm_1',
    threadID: 't_1',
    threadName: 'Jing and Bill',
    authorName: 'Bill',
    text: 'Hey Jing, want to give a Flux talk at ForwardJS?',
    timestamp: Date.now() + 99999
  },
  {
    id: 'm_2',
    threadID: 't_1',
    threadName: 'Jing and Bill',
    authorName: 'Bill',
    text: 'Seems like a pretty cool conference.',
    timestamp: Date.now() //有意让该message成为lastMessage
  },
  {
    id: 'm_3',
    threadID: 't_1',
    threadName: 'Jing and Bill',
    authorName: 'Jing',
    text: 'Sounds good.  Will they be serving dessert?',
    timestamp: Date.now() - 79999
  },
  {
    id: 'm_4',
    threadID: 't_2',
    threadName: 'Dave and Bill',
    authorName: 'Bill',
    text: 'Hey Dave, want to get a beer after the conference?',
    timestamp: Date.now() + 69999
  },
  {
    id: 'm_5',
    threadID: 't_2',
    threadName: 'Dave and Bill',
    authorName: 'Dave',
    text: 'Totally!  Meet you at the hotel bar.',
    timestamp: Date.now() - 59999
  },
  {
    id: 'm_6',
    threadID: 't_3',
    threadName: 'Functional Heads',
    authorName: 'Bill',
    text: 'Hey Brian, are you going to be talking about functional stuff?',
    timestamp: Date.now() - 49999
  },
  {
    id: 'm_7',
    threadID: 't_3',
    threadName: 'Bill and Brian',
    authorName: 'Brian',
    text: 'At ForwardJS?  Yeah, of course.  See you there!',
    timestamp: Date.now() - 39999
  },
  {
    id: 'm_8',
    threadID: 't_4',
    threadName: 'here and there',
    authorName: 'guoshi',
    text: '模块动态注册功能使得其他 Vue 插件可以通过',
    timestamp: Date.now() + 399999212
  },
  {
    id: 'm_9',
    threadID: 't_4',
    threadName: 'here and there',
    authorName: 'niudun',
    text: '而不是以路径字符串的形式传递给 module。',
    timestamp: Date.now() + 12345
  },
  {
    id: 'm_10',
    threadID: 't_4',
    threadName: 'another thread whose is t_4',
    authorName: 'heiniu',
    text: '明模块的状态，那么这个状态对象会通过',
    timestamp: Date.now() - 39999
  }
]
