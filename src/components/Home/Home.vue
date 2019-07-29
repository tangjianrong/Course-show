<template>
  <div>
    <el-carousel>
      <el-carousel-item v-for="item in lunboImgs" :key="item.id">
        <img :src="item.imgSrc" alt="你好吗">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
    export default {
      name: "Home",
      data(){
        return{
            lunboImgs:[
              {
                id:1,
                imgSrc:'https://hcdn1.luffycity.com/static/frontend/index/banner1(4)_1539945492.0492468.png'
              },
               {
                id:2,
                imgSrc:'https://hcdn1.luffycity.com/static/frontend/index/骑士(1)_1539945488.713867.png'
               },
                 {
                  id:3,
                  imgSrc:'https://hcdn1.luffycity.com/static/frontend/index/banner11_1538122470.2779157.png'
                },
                {
                  id:4,
                  imgSrc:'https://hcdn1.luffycity.com/static/frontend/index/home-banner4_1535545832.4715614.png'
                }
      ]
          }
      },
      created() {
        console.log('localStorage',localStorage)
      }
    }
</script>

<style scoped>
    .el-carousel__item h3 {
      height: 300px;
      width: 100%;
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 150px;
      margin: 0;
    }
    img{
     height: 400px;
      width: 100%;
    }


  el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }

  el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>
