<template>
	<div class="course">
		<div class="container clearfix">
			<ul class="coursebox">
			  <li v-for="(category,index) in categorylist" :key="category.id"
            :class="{active:index===currentindex}" @click="currentindexhandle(index,category.id)">
			  	{{category.name}}
			  </li>
			</ul>
			<div class="courseList" >
				<div class="detail" v-for="(course,index) in coursedetail" :key="course.id"
              @click="detailhandler(course.id)">
					<div class="head">
						<img :src="course.course_img" alt="" class="backImg">
						<b class="mask" :style="{backgroundColor:bgColors[index]}"></b>
						<p>{{course.name}}</p>
					</div>
					<div class="content">
						<p>{{course.teacher_description}}</p>
						<div class="content-detail">
							<div>
								<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTFweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTEgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ4LjIgKDQ3MzI3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5TaGFwZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJSZWN0YW5nbGUtMiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3LjAwMDAwMCwgLTkxLjAwMDAwMCkiPgogICAgICAgIDxnIGlkPSLkuKrkurrkuK3lv4MiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE3LjAwMDAwMCwgOTEuMDAwMDAwKSIgZmlsbD0iIzlCOUI5QiIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPHBhdGggZD0iTTYuNzU4MjMwODEsNi42MjU2MzEwOCBMNC4yNDEzMzM5Miw2LjYyNTYzMTA4IEMxLjkwMjMxNTc1LDYuNjI1NjMxMDggMCw4LjQxNDM0Nzg0IDAsMTAuNjEzNjY4OSBMMCwxMC44NTAyOTE3IEMwLDEyIDEuODcxODkwNjUsMTIgNC4yNDEzMzM5MiwxMiBMNi43NTgyNDUzMiwxMiBDOS4wMzQ0NTQ2MSwxMiAxMSwxMiAxMSwxMC44NTAyOTE3IEwxMSwxMC42MTM2Njg5IEMxMSw4LjQxNDc3MDM2IDkuMDk3MTkwOTUsNi42MjU2MzEwOCA2Ljc1ODIzMDgxLDYuNjI1NjMxMDggWiBNNS4zNzQwNDEyNiw2LjMyMTI0MjAyIEM3LjIyNjIxNDM2LDYuMzIxMjQyMDIgOC43MzMxOTI0Nyw0LjkwMzU2Mjg4IDguNzMzMTkyNDcsMy4xNjA2Mjc4MiBDOC43MzMxOTI0NywxLjQxNzc3NDU0IDcuMjI2MjE0MzYsMCA1LjM3NDA0MTI2LDAgQzMuNTIxOTI2MiwwIDIuMDE0ODAzLDEuNDE4MDc0MzkgMi4wMTQ4MDMsMy4xNjA2OTU5NyBDMi4wMTQ4MDMsNC45MDMxODEyNSAzLjUyMTkyNjIsNi4zMjEyNDIwMiA1LjM3NDA0MTI2LDYuMzIxMjQyMDIgWiIgaWQ9IlNoYXBlIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K" alt="">
							         <span class="span5">学习人数:{{course.learn_number}}</span>
							         <span class="span3" v-if="course.has_price">
							         	  <span class="s">¥{{course.price}}</span>
							            <span  class="t">免费</span>
                       </span>
                       <span class="span4" v-else>{{course.price}}</span>

							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'Course',
  data(){
    return{
      categorylist:[],    //分类列表
      currentindex:0,    //分类列表选中
      categorid:0,    //获取所有的课程列表id
      coursedetail:[],  //课程详情数据
      bgColors:['#4AB2BF','#1895C6','#4C87E0','#A361D9','#F7AE6A','#FF14A0','#61F0E1',
        '#6282A7','#27998E','#3C74CC','#A463DA','#F0A257','#DD4B7A','#59C6BD','#617FA1',
        '#1B92C3','#30A297','#3B73CB','#9E57CA','#A463DA','#1895C6','#A361D9','#FF14A0'],//课程背景色

    }
  },
  methods:{
    //获取分类列表
    getcategory(){
      this.$http.categorys()  //调用函数
      .then(res=>{
        if(!res.error_no){
          this.categorylist=res.data; //取得所有课程
          let allcategory={id:0,category:0,name:'全部'};
          this.categorylist.unshift(allcategory);   //插入“全部”之一项目
        }
      })
      .catch(err=>{
        console.log(err);
      });
    },
    //分类别获取课程详情
    getallcategorys(){
      console.log(this.categorid);
      this.$http.allcategorys(this.categorid)
      .then(res=>{
        console.log(res);
        if(!res.error_no){
          this.coursedetail=res.data;
        }
      })
      .catch(err=>{
        console.log(err)
      });
},
    currentindexhandle(index,id){
      this.currentindex=index;
      this.categorid=id;
      this.getallcategorys();
    },
    //单个课程详情事件操作
    detailhandler(id){
      this.$router.push({
        name:'course_detail',
        params:{detailid:id}
      })
    }
  },
  //生命周期
  created() {
    this.getcategory();
    this.getallcategorys();
  }
};
</script>

<style lang="css" scoped>
.course{
	width: 100%;
	height: 1000px;
	background: #f3f3f3;
}
.coursebox{
	padding: 24px 0;
	font-size: 14px;
	color: #666;
	letter-spacing: .41px;
	font-family: PingFangSC-Regular;
	overflow: hidden;
}
ul li{
	float: left;
	margin-right: 24px;
	cursor: pointer;
}
.active{
	color: #00b4e4;
}
.courseList{
	width: 100%;
	height: auto;
	overflow: hidden;
}
.detail{
	float: left;
	width: 248px;
	height: auto;
	margin-right: 16px;
	margin-bottom: 30px;
	position: relative;
	padding: 0 20px;
	background: #fff;
   	 box-shadow: 0 2px 6px 0 #e8e8e8;
   	 transition: all .2s linear;
   	 cursor: pointer;
}
.detail:hover{
	box-shadow: 0 8px 15px rgba(0,0,0,.15);
    	transform: translate3d(0,-3px,0);
}
.detail:nth-of-type(4n){
	margin-right: 0;
}
.head{
	width: 100%;

    	height: 144px;
}
.detail .head img{
	   width: 100%;
	    height: 144px;
	    position: absolute;
	    left: 0;
	    top: 0;
}
.detail .head b{
     width: 100%;
    height: 144px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: .9;
    background: #56CBC4;
}
.detail .head p{
	position: absolute;
	width: 248px;
	height:144px;
	left: 0;
	top: 0;
	text-align: center;
	font-family: PingFangSC-Medium;
	font-size: 24px;
	color: #fff;
	overflow: hidden;
	display: flex;
	align-items:center;
	padding: 0 20px;
	justify-content: space-around;
}
.content{
    width: 248px;

    height: 118px;
    padding-top: 30px;

}
.content p{
     width: 100%;
    height: 40px;
    font-size: 14px;
    color: #666;
    cursor: pointer;
    letter-spacing: .6px;
    margin-bottom: 20px;
    font-family: PingFangSC-Regular;
    overflow: hidden;
}
.content-detail{
	width: 100%;
	height: 40px;
	line-height: 40px;
	position: relative;

}
.content-detail .span3{
	position: absolute;
	right: 0;

}
.content-detail .span3 .s{
	text-decoration: line-through;
}
.content-detail .span4{
	/*margin-left: 100px;*/
	position: absolute;
	right: 0;
	color: #FC0107;
}
.content-detail .span3 .t{
	color: #000;
	margin-left: 5px;
	text-decoration: none !important;
	color: #FC0107;
}
.span5{
  float: left;
}
</style>
