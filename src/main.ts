import { createApp, defineComponent } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import toasting from "@/common/plugins/toast";
import globalComponent from "@/common/plugins/global-component";

createApp(App).use(toasting).use(store).use(router).use(globalComponent).mount('#app');