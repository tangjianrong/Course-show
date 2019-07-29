import Vue from 'vue'
import Router from 'vue-router'


//导入自定义组件
import Home from '../components/Home/Home'
import FreeCourse from '../components/FreeCourse/FreeCourse'
import DegreeCourse from '../components/DegreeCourse/DegreeCourse'
import LightCourse from '../components/LightCourse/LightCourse'
import DjangoDev from '../components/FreeCourse/DjangoDev'
import Login from '../components/Login/Login'
import Shopcart from '../components/Cart/Shopcart'

Vue.use(Router);

export default new Router({
  linkActiveClass:'is-active',      //刷新后还是在本页
  mode:'history',  //消去网址中的“#”
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path:'/home',
      name:'home',
      component:Home
    },
    {
      path:'/freecourse',
      name:'freecourse',
      component:FreeCourse
    },
    {
      path:'/degreecourse',
      name:'degreecourse',
      component:DegreeCourse
    },
    {
      path:'/lightcourse',
      name:'lightcourse',
      component:LightCourse
    },
    {
      path:"/course/:detailid/payment_info",
      name:"course_detail",
      component:DjangoDev
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path:'/purchase/shopcart',
      name:'purchse.shopcart',
      component:Shopcart
    }

  ]
})
