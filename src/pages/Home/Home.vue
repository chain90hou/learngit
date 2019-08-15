<template>
  <div id="app">
    <el-row id="header">
      <div class="logout">
        <el-dropdown @command="loginout">
          <span class="el-dropdown-link">
            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-row>
    <el-row>
      <Slider />
      <!-- <img src="./../assets/logo.png"> -->
      <el-col :span="21" id="content">
        <router-view/>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Slider from './../SM/SliderMenu';
import request from './../../utiles/server';
export default {
  name: 'App',
  components: {
    Slider
  },
  mounted: function () {
    // document.getElementById('app').style.height = '200px'
    document.getElementById('slider').style.height = screen.availHeight - 160 + 'px';
    document.getElementById('content').style.height = screen.availHeight - 160 + 'px';
    console.log(document.cookie);
  },
  methods: {
    loginout: function () {
      localStorage.removeItem('token');
      this.$router.push({ path: '/' });
    }
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
body {
  margin: 0;
  padding: 0;
}
#slider {
  background-color: rgb(84, 92, 100);
}
#content {
  overflow-y: auto;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.1);
}
.el-menu {
  border: 0;
}
#header {
  width: 100%;
  height: 60px;
  background-color: rgb(84, 92, 100);
}
.logout {
  float: right;
  padding:20px;
}
.el-dropdown {
  color: #fff;
}   

</style>


