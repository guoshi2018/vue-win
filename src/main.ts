import { createApp, version } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

import store from "./store";
import { studentAsTopstoreKey } from "./store/setup";

import toasting from "@/common/plugins/toast";
import i18nPlugin from "@/common/plugins/i18n";
import configuration from "./common/plugins/configuration";
import { Guoshi } from "@/common/type/guoshi";

import globalComponent from "@/common/plugins/global-component";
import * as tester from "@/common/mixins/test";

const app = createApp(App)
	.use(toasting)
	.use(i18nPlugin, Guoshi.Consts.I18N)
	//.use(store) //第一方案, 慎用. 因为25-official-store-example全部采用的是第二方案
	.use(store, studentAsTopstoreKey) //第二方案在此贴上key标签,则useStore时必须指明
	.use(router)
	.use(globalComponent);
app.use(configuration); //添加自定义配置,如果和上面的use连缀,可能会宕机.
app.mount("#app");

//tester.testGetType();
tester.testConfig(app);
//tester.raiseError();
