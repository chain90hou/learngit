<template>
  <div id="container">
    <div class="login_layout">
      <el-form ref="form" :model="form" label-width="80px"  class="login_form">
        <el-form-item label="账户">
          <el-input v-model="form.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-row>
            <el-col :span="12"><el-input v-model="form.check" placeholder="请输入验证码"></el-input></el-col>
            <el-col :offset="1" :span="11"><img id="imgcode" @click="refreshcode" alt="验证码" /></el-col>
          </el-row>
        </el-form-item>
        <div class="login_trans">
          <a href="#/forget">忘记密码</a>
          <a href="#/register">注册</a>
        </div>
        <el-button type="primary" @click="onSubmit('form')">登录</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import './../../assets/js/jquery.min.js';
import { setToken } from './../../utiles/authority';
import qs from 'qs';
import Vue from 'vue';
// import puppeteer from 'puppeteer';
export default {
  data () {
    return {
      form: {
        account: '',
        password: '',
        check: '',
        mark: ''
      }
    }
  },
  mounted() {
    document.getElementById('container').style.height = screen.availHeight - 150 + 'px';
    this.form.mark = this.rand();
    this.refreshcode();
  },
  methods: {
    onSubmit: function (form) {
      // console.log(document.cookie, $.cookie);
      this.$ajax.post('http://erp.com/qx/login.php', qs.stringify({...this.form, })).then((res) => {
        if (res.data) {
          setToken(res.data);
          this.$router.push({ path: '/Home' });
        }
      });
    },
    refreshcode: function () {
      // this.$ajax.get('http://erp.com/qx/yzm.php?a=' +  this.form.mark).then((res) => {
      //   console.log(res);
      //   $('#imgcode').attr('src', res.data);
      // });
      console.log(1321);
      $('#imgcode').attr('src', 'http://erp.com/qx/yzm.php?a=' +  this.form.mark);
    },
    rand: function () {
      var total = '';
      for (var i = 0; i < 10; i++) {
        total += Math.floor(Math.random() * 10);
      }
      return total;
    }
  }
 
}
</script>


<style>
  .login_layout {
    background: rgba(0,0,0,0.7);
    width: 350px;
    height: 300px;
    padding: 2%;
    margin: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 5px;
    
  }
  .el-button {
    width: 100%;
  }
  .login_form {
    margin: 10% 0;
  }
  
  
  .el-form-item__label {
    color: #fff;
  }
  #container {
    background: url(./../../assets/images/background_1.jpg) no-repeat fixed;
    background-size: cover;
  }
  .login_trans {
    margin: 0 0 3% 0;
    text-align: right;
  }
  .login_trans a:nth-child(1){
    text-decoration: none;
    display: inline-block;
    margin: 0 10%;
    color: #fff;
  }
  .login_trans a:nth-child(2){
    text-decoration: none;
    display: inline-block;
    color: #fff;
  }
  #imgcode {
    width: 100%;
    height: 40px;
  }
  .el-form-item__content { 
    line-height: 15px;
  }

</style>
