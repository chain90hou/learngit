<template>
  <div>
    <el-row>
      <el-col :span="8" v-for="(item, index) in dataList" :key="index" class="novel_col">
        <a :href="item[5]" class="href" target="_blank">
          <el-card class="novel_card">
            <div class="img_style"><img :src="item[1]" class="image"></div>
            <div>
              <div class="novel_name"><span>{{item[3]}}</span></div>
              <div><span>作者:</span>{{item[4]}}</div>
              <div class="novel_detail">{{item[2]}}</div>
            </div>
          </el-card>
        </a>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'Novel',
  data () {
    return {
      dataList: []
    }
  },
  mounted () {
    this.$ajax.get('http://localhost/test.php').then((res) => {
      if (res.status === 200) {
        this.dataList = res.data;
      }
    });
  }

}
</script>
<style>
.href {
  text-decoration: none;
  display: block;
}
.novel_col {
  padding: 1% 1%;
}
.img_style {
  /* width: 100%; */
  padding: 3% 5%;
}
.image {
  width: 180px;
  height: 240px;
  display: block;
  margin: auto auto;
}
.novel_card {
  
  margin: 10px auto;
  height: 450px;
  text-align: center;
}
.novel_detail {
  color: #999;
  text-align: left;
  text-indent: 2rem;
  overflow: hidden;
  height: 94px;
  line-height: 24px;
  /* padding-bottom: 10px; */
  /* white-space: nowrap; */
  /* text-overflow: ellipsis; */
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  display: -webkit-box;
}
.novel_name {
  font-size: 18px;
  color: rgba(0, 0, 0, 1);
  font-weight: 800;
}
.novel_name:hover {
  color: #1890FF;
}
</style>


