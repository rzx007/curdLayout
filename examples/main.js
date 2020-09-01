import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


// 导入组件库
import CurdLayout from '~/index.js'
// 注册组件库
Vue.use(ViewUI);
Vue.use(ElementUI);
Vue.use(CurdLayout)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
