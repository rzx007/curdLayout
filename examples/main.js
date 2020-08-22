import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import '../packages/theme-default/src/index.scss';

// 导入组件库
import curdLayout from '~/index.js'
// 注册组件库
Vue.use(ViewUI);
Vue.use(curdLayout)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
