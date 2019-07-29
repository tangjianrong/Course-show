<template>
	<div class="shopping-cart-wrap">
		<h3 class="shopping-cart-tit">我的购物车<small>共{{len_shopcartlist}}门课程</small></h3>
		<div class="row">
			<el-table
        ref="multipleTable"
        :data="shopcartlist"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="课程名称"
          width="500">
          <template slot-scope="scope">
            <img :src="scope.row.imgsrc" alt="">
            <a href="javasvript:void(0)">{{scope.row.name}}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="有效期"
          width="500">
          <template>
            <select>
              <option v-for="(item,index) in T" :value="item" :key="index">
                有效期{{item*30}}天
              </option>
            </select>
          </template>
        </el-table-column>
        <el-table-column
          label="单价">
          <template slot-scope="scope">
            ￥{{scope.row.price}}
          </template>
        </el-table-column>
        <el-table-column
          label="移除">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, shopcartlist)">delete
             </el-button>
          </template>
        </el-table-column>
      </el-table>
		</div>
		<div class="total">
			<el-button type="primary">去结算</el-button>
			<h3>总计: ¥{{total_price}}</h3>
		</div>
	</div>
</template>

<script>
export default {
  name:'Shopcart',
  data(){
    return{
      T:[1,2,3,4],
      multipleSelection:[],  //存放选中的当前数据
      shopcartlist:[
        {
          date:'2016-05-03',
          name:'python开发',
          imgsrc: 'https://hcdn1.luffycity.com/static/frontend/degreecourse/5/bg1_1518162420.7960355.jpeg',
          price:199
        },
        {
          date: '2016-05-02',
          name: '前端开发',
          imgsrc:'https://www.baidu.com/img/bd_logo1.png?where=super',
          price:209
        }],
      len_shopcartlist:0,   //计算课程数
    }
  },
  computed:{
    total_price(){    //计算被选中商品的总价格
      let sums=0;
      this.multipleSelection.forEach((item,index)=>{
        console.log(item.price);
        sums += parseInt(item.price)
      });
      return sums;
    }
  },
  methods:{
    handleDelete(index,rows) { //删除课程
        console.log(index);
        console.log(rows);
        rows.splice(index,1);
    },
    handleSelectionChange(val){
      console.log('选中了一个');
      this.multipleSelection=val;
    },
    getshopcartlist(){    //获取购物车列表
      this.$http.shopCartList()
        .then(res=>{
          console.log('===',res)
        })
        .catch(err=>{
          console.log(err)
        })
    }
  },
  created() {
    this.len_shopcartlist=this.shopcartlist.length;
    this.getshopcartlist();
  }
};
</script>

<style lang="css" scoped>
.shopping-cart-wrap{
	width: 100%;
}
.shopping-cart-wrap h3,.row{
	width: 1200px;
	margin: 0 auto;
}
.shopping-cart-wrap h3{
	padding: 50px 0 ;
}
.el-table .warning-row {
	background: #22C8C5;
}
.cell img{
	vertical-align: middle;
	width: 170px;
}
.cell a{
	color: #000;
	margin-left: 30px;
}
select {
    border: 0;
    outline: none;
    font-size: 12px;
    color: #666;
    line-height: 18px;
    width: 117px;
    height: 28px;
    padding-left: 16px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
}
.total{
	width: 1200px;
	margin: 0 auto;
	/*display: flex;*/
	/*justify-content:flex-end;*/

}
.shopping-cart-wrap .total button{
	float: right;
	margin-top: 20px;
}

.shopping-cart-wrap .total h3{
	padding: 0;
	float: right;
	width: 100px;
	height: 30px;
	margin-top: 30px;
}

</style>
