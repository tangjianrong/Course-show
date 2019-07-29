// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);         //调用插件

//store仓库的引入，并在后面挂载到Vue，组件中 this.$store 可获取本实例仓库
import store from './store/index.js'

//导入全局css样式
import '../static/global/global.css'

//导入gt.js
import '../static/global/gt.js'
//导入axios
// import Axios from 'axios'
// Vue.prototype.$http=Axios;  //挂载到原型
// Axios.defaults.baseURL='https://www.luffycity.com/api/v1/'; //公共URL，组件中的axios url会拼接上这个后面

//导入所有api
import * as api from './resful/api'
Vue.prototype.$http=api;    //全局声明
Vue.config.productionTip = false;

//全局路由守卫，处理所有路由请求
router.beforeEach((to,from,next)=>{
  if(localStorage.getItem('username')){
    var user_msg={
      access_token:localStorage.getItem('access_token'),
      username:localStorage.getItem('username'),
      shop_car_num:localStorage.getItem('shop_car_num'),
      avatar:localStorage.getItem('avatar'),
      notice_num:localStorage.getItem('notice_num')
    };
    store.dispatch('getuserinfo',user_msg);
}
  next();
});

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
