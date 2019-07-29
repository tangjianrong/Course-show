<template>
	<div class="wrap">
		<div class="web-course-banner">
			<div class="container">
				<div class="title">
					<img src="../../../static/images/play.png" height="67" width="67" alt="">
					<h1 class="course-title">{{coursedetailtop.name}}</h1>
				</div>
				<span class="course-text">Python语言下最强大优秀的WEB框架从入门到进阶</span>
				<div class="course-list">
					<ul>
					    <li class="detail-item">
					    	难度：{{coursedetailtop.level}}
					    </li>
					    <li class="sep"></li>
					    <li class = detail-item>时长：{{coursedetailtop.hours}}小时</li>
					    <li class="sep"></li>
					     <li class = detail-item>学习人数：{{coursedetailtop.learn_number}}人</li>
					    <li class="sep"></li>
					    <li class = detail-item>评分 10.0</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="course-review">
			<ul class="review-head-wrap">
				<li class="head-item">课程概述</li>
				<li class="head-item">课程章节</li>
				<li class="head-item">用户评价(10)</li>
			</ul>
		</div>
		<!-- 课程详情 -->
		<div class="course-detail">
			<div class="container">
				<div class="course-detail-text">
					<h3>课程概述</h3>
          <div v-html="coursedetail.content"></div>
				</div>
				<div class="course-img">
					<img src="https://www.luffycity.com/static/img/web-introduce.d075499.png" alt="">
				</div>
			</div>
		</div>
		<div class="course-price">
			<div class="container">
				<span>可以根据不同的学习情况购买不一样的学习套餐哦！</span>
				<ul class="course-price-item">
					<li v-for="(item,index) in prices" :key="item.id"
                :class='{active:index===currentindex}' @click="pricehandler(index)">
						<p class="price" ref="price" :class='{active:index===currentindex}'>
              ¥{{item.multiple*coursepayment_info.price}}</p>
						<p class="time" ref="time" :class='{active:index===currentindex}'>{{item.msg}}</p>
					</li>
				</ul>
				<div class="course-action">
					<button class="left">购买</button>
					<button class="right" @click="addshopcar">加入购物车</button>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
export default {
  name: 'DjangoDev',
  data(){
    return{
      currentindex:null,   //选中的id，默认为0
      coursereviews:'',    //评论
      coursemenu:[],       //课程详情菜单
      coursedetailtop:{},  //课程顶部详情
      coursedetail:'',     //课程概述
      coursepayment_info:'',  //课程支付信息
      prices:[
        {id:1,multiple:1,day:100,msg:'一个月有效期'},
        {id:2,multiple:2,day:400,msg:'两个月有效期'},
        {id:3,multiple:3,day:600,msg:'三个月有效期'},
        {id:4,multiple:4,day:1000,msg:'四个月有效期'}
      ]
    }
  },
  methods:{
    //加入购物车
    addshopcar(){
      console.log('选中的商品number',this.currentindex+1);
      if (this.prices[this.currentindex]){
        console.log(111);
        if (window.localStorage.getItem('access_token')){
          console.log(222);
          //已经登录，进行购买
          this.$message('已经登录啦');
          let course = {  //传课程id与有效期
  					course_id: this.$route.params.detailid,
  					valid_period:this.prices[this.currentindex].day
  				};
          let v={
            products:[{course_id:this.$route.params.detailid,
              valid_period:this.prices[this.currentindex].day}],
            is_degree:0
          };
          console.log(course);
  				this.$http.addshopCart(v)
  				.then(res=>{
  					if (!res.error_no) {     //添加成功
  						console.log('添加到购物车',res);
  					}
  					if(res.error_no===-1){
  					  console.log(res);
            }else{    //更新成功；error_no=-1
  						console.log('更新到购物车',res);
  					}
  				})
  				.catch(err=>{
  					console.log(err);
  				})
        }else{
          //尚未登录，跳转到登录页面；使用编程式导航
          this.$message({message:'你还没登录呢',type:'warning'});
          this.$router.push({                     //转到登录页面
            name: 'Login',
            query:{
              return_url:window.location.href     //当前url
            }});
        }
      }else{
        this.$message({
          message:'你没选中商品！',
          type:'warning',
          center:true
        })
      }
    },
    //套餐选中操作
    pricehandler(index){
      this.currentindex=index;
      console.log(this.$refs.price[index].innerHTML,this.$refs.time[index].innerHTML);
    },
    getcoursedetailtop(){
      this.$http.coursedetailtop(this.$route.params.detailid)
        .then(res=>{
          if(!res.error_no){
            this.coursedetailtop=res.data;
          }
        })
        .catch(err=>{
          console.log(err)
        })
    },
    getcoursedetail(){
      this.$http.coursedetail(this.$route.params.detailid)
        .then(res=>{
          console.log('coursedetail',res);
          if(!res.error_no){
            this.coursedetail=res.data;
          }
        })
        .catch(err=>{
          console.log(err)
        })
    },
    getcoursepayment_info(){
      this.$http.coursepayment_info(this.$route.params.detailid)
        .then(res=>{
          console.log('单个课程价格情况',res);
          if(!res.error_no){
            console.log('coursepayment_info',res.data);
            this.coursepayment_info=res.data;
          }
        })
        .catch(err=>{
          console.log(err)
        })
    },
    getcoursereviews(){
      this.$http.coursereviews(this.$route.params.detailid)
        .then(res=>{
          console.log('单个课程评论',res);
          if(!res.error_no){
            this.coursereviews=res.data;
            console.log(this.coursereviews);
          }
        })
        .catch(err=>{
          console.log(err)
        })
    }
  },
  created() {
    this.getcoursedetailtop();
    this.getcoursedetail();
    this.getcoursepayment_info();
    this.getcoursereviews();
  }
};
</script>

<style lang="css" scoped>
.course-price-item li{
  width: 100px;
  color: red;
}
.wrap{
	width: 100%;
}
.web-course-banner{
    width: 100%;
    height: 512px;
    background: url(../../../static/images/web-banner.1402933.png) no-repeat;
    background-size: 100% 100%;
    text-align: center;
    overflow: hidden;
}
.container{
	width: 1200px;
	margin: 182px auto 0;
	text-align: left;
}
.container img{
	vertical-align: middle;
}
.container h1{
	display: inline-block;
	font-size: 48px;
    color: #4a4a4a;
    letter-spacing: .37px;
    margin-left: 40px;
    font-family: PingFangSC-Light;
    font-weight: 500;
    line-height: 1.1;
    position: relative;
    top: 10px;
}
.course-text{
    width: 464px;
    display: inline-block;
    font-size: 22px;
    color: #4a4a4a;
    letter-spacing: .17px;
    line-height: 36px;
    margin-top: 33px;
}
.course-list{
	width: 100%;
}
.course-list ul{
	margin-top: 63px;
	display: flex;
	align-items: center;
	justify-content: flex-start;
}
.course-list ul li.detail-item{
    font-size: 18px;
    color: #4a4a4a;
    letter-spacing: .74px;
    height: 26px;
    padding: 0 20px;
}
.course-list ul li.sep{
	width: 2px;
	height: 14px;
	border-left: 1px solid #979797;
}
.course-review{
	width: 100%;
	height: 80px;
	background: #fafbfc;
	border-top: 1px solid #e8e8e8;
	box-shadow: 0 1px 0 0 #e8e8e8;
}
.review-head-wrap{
	width: 590px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
}
.review-head-wrap .head-item{
height: 80px;
    line-height: 80px;
    font-size: 16px;
    color: #555;
    cursor: pointer;
}
.course-detail{
	width: 100%;
	padding-top: 90px;

}
.course-detail .container{
	width: 1200px;
	margin: 0 auto;
	display: flex;
	justify-content:space-between;
}
.course-detail-text{
	width: 500px;
	text-align:left;

}
.course-detail-text h3{
	padding: 20px 0;
}
.course-detail-text p{
	    width: 100%;
	    height: 196px;
	    font-size: 14px;
	    color: #4A4A4A;
	    letter-spacing: 1.83px;
	    line-height: 30px;
	    text-align: left;
}
.course-price{
	width: 100%;
	background: #FAFAFA;

}
.course-price .container{
	width: 1200px;
	margin: 0 auto;
	text-align: center;
}
.course-price span{
	 font-size: 12px;
	    color: #9b9b9b;
	    letter-spacing: 1.57px;
	    display: inline-block;
	    margin-top: 102px
}
.course-price ul{
	/*width: 800px;*/
	margin: 50px auto;

	display: flex;
	flex-wrap: wrap;
	justify-content:space-between;
}
.course-price ul li{
	width: 200px;
	height: 112px;
	border: 1px solid #979797;
}
.course-price ul .active{
	background-color: #00CD23;
}
.course-price ul li p:first-child{
	font-size: 24px;
   	 letter-spacing: 1.92px;
    	color: #333;
    	margin-top: 17px;
}
.course-price ul li p:nth-child(2){

	    color: #9b9b9b;
	    font-size: 20px;
	    letter-spacing: 1.6px;
	    margin-top: 9px;
}
.course-action{
	width: 1000px;
	margin: 0 auto;
	padding-bottom: 80px;
	display: flex;
	justify-content: center;
}
.course-action button{
	border:none;
	outline: none;
	cursor: pointer;
	display: inline-block;
	width: 181px;
	    height: 51px;
	    font-size: 14px;
	    color: #fff;
	    letter-spacing: 1.12px;
	    text-align: center;
	    background: #f5a623;
	    border-radius: 82px;
}
.course-action button.left{
	background: #7ed321;
    	box-shadow: 0 2px 4px 0 #e8e8e8;
    	color: #fff;
    	margin-right: 48px;
    	padding: 0 20px;
}
.course-action button.right{
	background: #f5a623 url() no-repeat 125px 15px!important;
}


</style>
