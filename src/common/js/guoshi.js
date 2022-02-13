/* eslint-disable  */
(function (global, factory) {
    typeof exports === "object" && typeof module !== "undefined"
        ? factory(exports)
        : typeof define === "function" && define.amd
            ? define(["exports"], factory)
            : ((global = global || self), factory((global.window = global.window || {})));
})(this, function (exports) {
    "use strict";

    /**
     * 获取数值的小数位数
     * @param {any} num：要测试的数值，可以是任何对象，字符串，数值等等
     */
    const decimalBits = function (num) {
        /**
             * 测试：
                let nums = [2, 23, 189, 2., 23., 1001., 17.5, 29.789, 3e-5, 3e5,'3.', 'abc', {}, '12.38', '4e-4'];
                let nums = [2e+2, 3e-3, '2e+2', '3e-3','58.',9.];
                let bits = nums.map(v => guoshi.decimalBits(v));
     
                console.log(nums, bits);
                let nums = [1.234500032, -2.1298933];
                let fs = nums.map(v => v.toFixed(3));
                console.log(nums, fs);
             * */
        let n = Number(num) || 0; //为NaN时，为0
        let s = n.toString();
        let len = s.length; //长度最小为1
        let pos = s.indexOf(".");
        return pos == -1 ? 0 : len - pos - 1; //无小数点和最末一位是小数点均认为整数
    };

    /**
     * 模拟多线程下的睡眠，返回timeout时的时间戳
     * @param {any} ms ：毫秒数
     */
    const sleep = function (ms) {
        return new Promise((resolve, _) => {
            setTimeout(() => resolve(new Date().getTime()), ms);
        });
    };

    /**
     * 步进显示数值
     * @param {any} obj:包含要逐步变化的数值的对象
     * @param {any} expenseSecond:从当前值变化到目标值，需要花费的时间（秒）
     * @param {any} fields:上述数值字段名组成的对象，各字段的值为该字段名在obj中的目标值
     * @returns:目标值为元素组成的数组
     */
    const steppingNumber = async function (obj, expenseSecond, fields) {
        let target = [];
        let gap = 100; //隔多长时间变化一次(ms)
        let times = (expenseSecond * 1000) / gap; // 变化次数: (次)
        for (let f in fields) {
            let prevtgt = obj[Symbol.for("prev_" + f)] || obj[f]; //obj[Symbol.for('prev_' + f)]保存上次目标值
            let curtgt = fields[f]; //当前值,目标值
            let dbs = decimalBits(curtgt); //采用目标值的小数位数作为递增值的小数位数
            //console.log(`prev target:${prevtgt},current target:${curtgt}`);
            let part = Number(((curtgt - prevtgt) / times).toFixed(dbs)); //每次递增的数值
            //console.log(`part is ${part}`);
            obj[Symbol.for("prev_" + f)] = curtgt; //更新上次目标值，以便在递增完成前发生点击，得到准确的上次目标值
            for (let i = 1; i < times; i++) {
                //递增
                await sleep(gap); //如此，方能使得各异步叠加继发
                obj[f] += part;
            }
            await sleep(gap); //由于存在四舍五入，最后一次增量可能与前不一样
            obj[f] = curtgt;
            target.push(obj[f]);
        }
        return target;
    };

    /**
     * 获取guid字符串
     * */
    const guidString = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8;
            return "s" + v.toString(16);
        });
    };

    const innerByTarget = function (rootEle) {
        console.log('rootEle..........', rootEle)
        const re = rootEle || document;
        const links = re.getElementsByTagName("a");
        [].forEach.call(links, (link) => {
            link.innerHTML = link.title = link.href;
        });
    };

    exports.guoshi = {
        steppingNumber,
        sleep,
        decimalBits,
        guidString,
        innerByTarget,
    };

    if (typeof window === "undefined" || window !== exports) {
        Object.defineProperty(exports, "__esModule", { value: true });
    } else {
        delete window.default;
    }
});

/*
usage:以调用innerByTarget为例
    1. 使用require方式，即require即用
        const funcs = require("@/common/js/guoshi.js").guoshi;  //
        console.log(".........", funcs);
        funcs.innerByTarget(rootEle);
    2. 使用脚本顶部 import 指令的方式 
      顶部：
        import { guoshi as funcs } from "@/common/js/guoshi.js";
      调用：
        console.log("..............", funcs);
        funcs.innerByTarget(root.value);        
    3. 使用import()方法，异步调用：
        const objGuoshi = await import("@/common/js/guoshi.js");
        console.log("................", objGuoshi);
        objGuoshi.guoshi.innerByTarget(root.value);

*/
