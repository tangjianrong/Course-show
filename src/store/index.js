import Vue from 'vue'
//导入vuex
import Vuex from 'vuex'
Vue.use(Vuex);    //调用

var store=new Vuex.Store({
  state:{
    count:1,
    userinfo:{}
  },
  //修改state的唯一方法是提交mutation
  mutations:{
    getuserinfo(state,user){
      state.userinfo=user;
    }
  },
  actions:{
    getuserinfo({commit},user){
      commit('getuserinfo',user)
    }
  }
});
export default store;     //抛出
