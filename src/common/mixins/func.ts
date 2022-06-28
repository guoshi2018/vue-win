import {
  getCurrentInstance,
  ComponentInternalInstance,
  ComponentCustomProperties,
} from "vue";
//用法 import {...} from '@/common/mixins/func'

const guidString = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;
    return "s" + v.toString(16);
  });
};
const sleep = (ms: number): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("timeout"), ms);
  });
};

/**
 * 原生实现跨域,需要服务器端参数名为callback,代表客户端的回调函数名称
 * @param destUrl:目的地址
 * @param callback :客户端的回调函数
 * @param callbackNameInServer:服务器端指示回调函数值的参数名称
 * @summary 使用示例,参见asp.net core6 项目 WebApiSample6.0 WeatherForecast
 */
const corsData = (
  destUrl: string,
  callback: (data: any) => void,
  callbackNameInServer: string
): void => {
  const script = document.createElement("script");
  script.type = "text/javascript";
  // 传参一个回调函数名给后端，方便后端返回时执行这个在前端定义的回调函数
  //script.src = url + '?callback=fillTable';
  script.src = `${destUrl}?${callbackNameInServer}=${callback.name}`;
  script.addEventListener(
    "load",
    function () {
      document.head.removeChild(script);
    },
    false
  );
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
};

/**
 * 调试打印相关数据到控制台
 * @param debug 当前是调试状态
 * @param args 无穷多个数据组成的数组
 */
const print = function (debug: boolean, ...args: any[]): void {
  if (debug) {
    console.log(...args);
  }
};

/**
 * 获取给定值的类型(尽量具体)
 * @param o 要获取类型的值
 * @returns 原生类型为: Number Boolean String Undefined Null Object Function Array RegExp Date
 * 自定义类型为类的名称
 */
const getType = function (o: any): string {
  const t = Object.prototype.toString.call(o).slice(8, -1); // [object XXX]
  return t == "Object" ? o.constructor.name : t;
};

/**
 * 根据已知条件求目标点的屏幕坐标系坐标.
 * @param source 源点坐标
 * @param distance 与源点坐标的距离,为负数则得到与期望坐标关于源点对称的点坐标
 * @param angle 从源点出发到目标点连线与横坐标夹角, x轴正方向, 顺时针为正, 逆时针为负. 单位:度
 * @returns 所求坐标的绝对坐标, 即已经叠加个源点, 非相对坐标
 */
const pointFrom = function (source: Point, distance: number, angle: number): Point {
  return {
    x: source.x + distance * Math.cos((angle * Math.PI) / 180),
    y: source.y + distance * Math.sin((angle * Math.PI) / 180),
  };
};

/**
 * 获取指定源点周围的一定数量的点坐标.
 * @param source 源点坐标
 * @param amount 数量, 负数则取绝对值. 以此为360度均分, 然后结合距离定位各个点坐标
 * @param distance 与源点的距离, 负数则代表各个点距离取0到|distance|之间的随机值
 * @returns 点坐标数组. 绝对坐标, 即已经叠加个源点, 非相对坐标
 */
const pointsAround = function (source: Point, amount: number, distance: number): Point[] {
  const pts = new Array<Point>();
  const amt = Math.floor(Math.abs(amount));
  const angle = 360 / amt;
  for (let i = 0; i < amt; i++) {
    pts.push(
      pointFrom(
        source,
        distance >= 0 ? distance : Math.random() * Math.abs(distance),
        i * angle
      )
    );
  }
  return pts;
};

/**
 * 获取当前的组合式风格组件的相关信息
 * @returns 全局应用对象app, 当前组件实例(实际上是其属性集, 以便调用.d.ts中声明的方法时智能提示)
 * @description 必须在 setup 或生命周期钩子中调用。
 */
const useCom = () => {
  const instance = getCurrentInstance() as ComponentInternalInstance;
  return {
    /**
     * 全局应用对象app
     */
    app: instance.appContext.app,
    /**
     * 当前组件实例(实际上是其属性集, 以便调用.d.ts中声明的方法时智能提示)
     */
    com: instance.appContext.app.config.globalProperties as ComponentCustomProperties,
  };
};

export {
  guidString,
  sleep,
  corsData,
  indexicalString,
  print,
  getType,
  pointFrom,
  pointsAround,
  useCom,
};
