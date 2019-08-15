<template>
  <div class="radio_layout">
    <el-row class='radio_card'>
      <el-col :span="7" class="radio_modle" v-for="item in datalist" v-bind:key="item.title">
        <a class="flex" :href="item.HttpUrl" target="_blank">
          <!-- <div class="flex_img"><img src="./../../assets/images/k_h_logo.jpg" alt=""></div> -->
           <div class="flex_img"><img :src="item.imgUrl" alt=""></div>
          <div class="flex_content">
            <p class="flex_title">{{item.title}}</p>
            <p class="flex_detail">{{item.detail}}</p>
          </div>
        </a>
      </el-col>
    </el-row>
  </div>
  
</template>
<script>
// import request from './../../utiles/server';

export default {
  name: 'radio',
  data () {
    return {
      imageUrl: [],
      datalist: []
    }
  },
  mounted () {
    this.$ajax.get('/home/radio').then((res) => {
      console.log(res);
      if (res.status === 200) {
        this.datalist = res.data.data;
      }
      console.log(this.datalist[0].imgUrl);
      console.log(res.data);
    });
  }
}
</script>
<style>
.radio_layout {
  width: 98%;
}
.radio_card {
  padding-top: 20px;
}
.radio_card img {
  width: 100%;
}
.flex {
  display: flex;
  text-decoration: none;
}
.radio_modle {
  background: #fff;
  height: 150px;
  margin: 10px 2%;
}
.flex_content {
  margin: auto 0;
}
.flex_img {
  /* height: 50px; */
  width:300px;
  margin: auto 3%;

}
.flex_img img {
  width:100px;
}
.flex_title {
  font-size: 16px;
  color: rgba(0, 0, 0);
  text-align: left;
}
.flex_title:hover {
  color: #1890FF;
}
.flex_detail {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  height: 76px;
  overflow: hidden;
  box-sizing: border-box;
  text-align: left;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  
}
</style>

