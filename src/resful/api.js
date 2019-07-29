import Axios from 'axios'
Axios.defaults.baseURL='https://www.luffycity.com/api/v1/'; //公共URL

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
  if(localStorage.getItem('access_token')){//有值
    //config.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    // 全局的axios默认值，config指axios
    // console.log('config.headers',config.headers,config.headers.common);
    config.headers.Authorization=localStorage.getItem('access_token');
  }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

//分类列表api
export const categorys = ()=>{
  return Axios.get('course_sub/category/list/').then(res=>res.data);
};
//各类别下的课程：https://www.luffycity.com/api/v1/courses/?sub_category=11
export const allcategorys = (categoryid)=>{
  return Axios.get(`courses/?sub_category=${categoryid}`).then(res=>res.data)
};
//某个课程详情顶部数据
export const coursedetailtop=(courseid)=>{
  return Axios.get(`/course/${courseid}/top/`).then(res=>res.data)
}
//某个课程详情概述
export const coursedetail=(courseid)=>{
  return Axios.get(`/course/${courseid}/detail/`).then(res=>res.data)
}
//某个课程详情支付信息
export const coursepayment_info=(courseid)=>{
  return Axios.get(`/course/${courseid}/payment_info/`).then(res=>res.data)
}
//某个课程评论信息
export const coursereviews=(courseid)=>{
  return Axios.get(`/course/${courseid}/reviews/`).then(res=>res.data)
}

//geetest验证接口
export const geetest=()=>{
  return Axios.get(`captcha_check/`).then(res=>res.data)
}

//登录接口
export const userlogin=(params)=>{
  //这个参数至少包括五个字段：username,password以及验证的三个字段
  return Axios.post(`account/login/`,params).then(res=>res.data)
}

//提交课程到购物车接口
export const addshopCart=(course)=>{
  return Axios.post(`order/confirm/`,course).then(res=>res.data)
}

// 购物车的数据
export const shopCartList = ()=>{
	return Axios.get(`user/shop_cart/list/`).then(res=>res.data);
}

