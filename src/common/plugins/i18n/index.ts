/*
    1.每当这个插件被添加到应用程序中时，如果它是一个对象，就会调用 install 方法。
如果它是一个 function，则函数本身将被调用。在这两种情况下——它都会收到两个参数：
由 Vue 的 createApp 生成的 app 对象和用户传入的选项。

    2.让我们从设置插件对象开始。建议在单独的文件中创建它并将其导出，如下所示，
以保持包含的逻辑和分离的逻辑。
    3.我们想要一个函数来翻译整个应用程序可用的键，因此我们将使用 app.config.globalProperties 暴露它。
该函数将接收一个 key 字符串，我们将使用它在用户提供的选项中查找转换后的字符串。

    4.使用插件
      1)在使用 createApp() 初始化 Vue 应用程序后，你可以通过调用 use() 方法将插件添加到你的应用程序中。
use() 方法有两个参数。第一个是要安装的插件，在这种情况下为 i18nPlugin。它还会自动阻止你多次使用同一插件，
因此在同一插件上多次调用只会安装一次该插件。第二个参数是可选的，并且取决于每个特定的插件。
在演示 i18nPlugin 的情况下，它是带有转换后的字符串的对象。
*/
import { App, createVNode, render, version } from "vue";
import { Guoshi } from "@/common/type/guoshi";

export default {
  install: (app: App<Element>, args: Guoshi.Interfaces.I18nStrings): void => {
    /**
     * 根据.分隔的多个字符串组成的字符串,获取对应的i18n字符串,多个则以.分隔
     * @param keys 键字串
     * @returns 对应的i18n字符串
     */
    app.config.globalProperties.$translate = (keys: string): string => {
      const str = keys.split(".").reduce((acc: string, cur: string) => {
        let temp = "";
        if (typeof args[cur] !== "undefined") {
          temp = `.${args[cur]}`;
        }
        return `${acc}${temp}`;
      }, "");
      return str.replace(/^./, "");
    };

    // Object.defineProperty(app, "hello", {
    //   value: function () {
    //     return "this is world";
    //   },
    //   writable: true,
    //   enumerable: true,
    //   configurable: true,
    // });

    //插件还允许我们使用 inject 为插件的用户提供功能或 attribute。
    //例如，我们可以允许应用程序访问 options 参数以能够使用翻译对象。
    app.provide("i18n", `hello,${args}`);

    //由于我们可以访问 app 对象，因此插件可以使用所有其他功能，例如使用 mixin 和 directive
    app.directive("my-directive", {
      mounted(el, binding, vnode, oldVnode) {
        //...some logic
      },
      //...
    });
    app.mixin({
      created() {
        //...some logic
      },
      //...
    });
  },
};
