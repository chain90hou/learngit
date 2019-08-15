<template>
<div>
  <a href="http://luzi.im/ceshi/lsl/24">测绘</a>
  <div class="register">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules" class="register_form">
      <el-form-item label="账户" prop="account">
        <el-input v-model="form.account" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
       <el-form-item label="确认密码" prop="repassword">
        <el-input v-model="form.repassword" type="password" placeholder="请确认密码"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-button type="primary" @click="Submit('form')">提交</el-button>
    </el-form>
  </div>
</div>
</template>
<script>
import qs from 'qs';
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.repassword !== '') {
          this.$refs.form.validateField('repassword');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    const Email = (rule, value, callback) => {
      let rex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else if (!rex.test(value)) {
        callback(new Error('请输入正确的邮箱格式'));
      } else {
        callback();
      }
    }
    return {
      form: {
        account: '',
        password: '',
        email: '',
        repassword: ''
      },
      rules: {
        account: [{ required: true, message: '请填写活动形式', trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
        repassword: [{ validator: validatePass2, trigger: 'blur' }],
        email: [{ validator: Email, trigger: 'blur' }]
      }
    }
  },
  mounted () {

  },
  methods: {
    Submit: function (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$ajax.post('http://erp.com/qx/register.php', qs.stringify(this.form), {
            emulateJSON: true
          }).then((res) => {
            console.log(res);
          });
        } else {
          console.log(valid);
        }
      })
    }
  }
}
</script>
<style>
body {
  background: url(./../../assets/images/register.jpg) no-repeat;
  background-size: cover;
}
.register {
  background: rgba(0,0,0,0.3);
  height: 400px;
  width: 500px;
  margin: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  padding: 0 2%;
  border-radius: 5px;
}
.register_form {
  margin: 10% 0;
}
.register .el-form-item__label {
  color: #000;
}
.el-button {
  width: 100%;
}    
</style>


