<template>
 <el-container>
      <el-header height = '80px' >
            <div class="header">
                <div class="nav-left">
                    <img src="https://www.luffycity.com/static/img/head-logo.a7cedf3.svg" alt="">
                </div>
                <div class="nav-center">
                  	<ul>
                  		<li v-for="(ob,index) in headerdata" :key="ob.id">
                  			<router-link :to="{name:ob.route}">
                  			 {{ob.name}}
                  			</router-link>
                  		</li>
                  	</ul>
                </div>
<!--                <el-dropdown>-->
                  <div class="nav-right" v-if="userinfo.access_token"  @mouseenter="enterhandler"
                       @mouseleave="leavehandler">
                  <span class = 'el-dropdown-link'>学习中心</span>
                 	<span class="user">{{userinfo.username}}</span>
                 	<img :src="userinfo.avatar" alt="">
                  <ul class="my_account" v-show="ishow">
                      <li>
                        我的账户
                        <i>></i>
                      </li>
                      <li>
                        我的订单
                        <i>></i>
                      </li>
                      <li>
                        我的优惠券
                        <i>></i>
                      </li>
                      <li>
                        我的消息<span class="msg">({{userinfo.notice_num}})</span>
                        <i>></i>
                      </li>
                      <li @click="shopCartinfo">
                       购物车<span class="count">({{userinfo.shop_cart_num}})</span>
                        <i>></i>
                      </li>
                      <li>
                       退出
                        <i>></i>
                      </li>
                  </ul>
                </div>
<!--                </el-dropdown>-->
                <div class="nav-right" v-else>
                  <span>登录</span>
                  &nbsp;| &nbsp;
                  <span>注册</span>
                </div>

            </div>
      </el-header>
    </el-container>
</template>

<script>
export default {
  name: 'Header',
  data(){
    return{
      headerdata:[
        {id:1,name:'首页',route:'home'},
        {id:2,name:'学位课',route:'degreecourse'},
        {id:3,name:'免费课',route:'freecourse'},
        {id:4,name:'轻课',route:'lightcourse'}
      ],
      ishow:false
    }
  },
  methods:{
    //购物车信息
    shopCartinfo(){
      this.$router.push({
        name:'purchse.shopcart'   //登录成功，跳转到首页
      });
    },
    leavehandler(){
      this.ishow=false;
    },
    enterhandler(){
      this.ishow=true;
    }
  },
  computed:{
    userinfo(){
      return this.$store.state.userinfo
    }
  }
};
</script>

<style lang="css" scoped>
.el-header{
  border-bottom: #c9c9c9;
  box-shadow: 0 0.5px 0.5px 0 #c9c9c9;
}
.header{
  width: 1200px;
  height: 80px;
  line-height: 80px;
  margin: 0 auto;
}
.nav-left{
  float: left;
 margin-top: 10px;
}
.nav-center{
  float: left;
  margin-left: 100px;
  width:
}
.nav-center ul{
	overflow: hidden;
}
.nav-center  ul li{
	float: left;
	margin: 0 5px;
	/*width: 100px;*/
	padding: 0 20px;
	height: 80px;
	line-height: 80px;
	text-align: center;
}
.nav-center ul li a{
	color: #4a4a4a;
	width: 100%;
	height: 60px;
	display: inline-block;

}
.nav-center ul li a:hover{
	color: #B3B3B3;
}
.nav-center ul li a.is-active{
	    color: #4a4a4a;
    	     border-bottom: 4px solid #ffc210;
}
.nav-right{
  float: right;
  position: relative;
  z-index: 100;

}
.nav-right span{
  cursor: pointer;
}
.nav-right .user{
	margin-left: 15px;
}
.nav-right img{
	width: 26px;
	height: 26px;
	border-radius: 50%;
	display: inline-block;
	vertical-align: middle;
	margin-left: 15px;
}
.nav-right  ul{
  position: absolute;
  width: 221px;
  z-index: 100;
  font-size: 12px;
  top: 80px;
  background: #fff;
  border-top: 2px solid #d0d0d0;
    box-shadow: 0 2px 4px 0 #e8e8e8;
}
.nav-right ul li{
    height: 40px;
    color: #4a4a4a;
    padding-left: 30px;
    padding-right: 20px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: all .2s linear;
}
.nav-right ul li span.msg{
  margin-left: -80px;
  color: red;
}
.nav-right ul li span.count{
  margin-left: -100px;
  color: red;
}

</style>
