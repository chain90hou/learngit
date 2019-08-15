<template>
  <div>
    <input type="text" v-model="form.sercret" placeholder="请输入密码"/>
    <select name="" v-model="form.service">
      <option value="">188服务器</option>
      <option value="">70服务器</option>
    </select>
    <select name="" v-model="form.load">
      <option value="">更新</option>
      <option value="">不更新</option>
    </select>
    <input type="text" v-model="form.site" idplaceholder="请输入站点ID"/>
    <button @click="submit" >提交</button>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data () {
    return {
      form: {
        load: '',
        sercret: '',
        site: '',
        service: ''
      }
    }
  },
  mounted() {
    
  },
  methods: {
    submit: function () {
      this.$ajax.post('http://erp.com/learn/testtwo.php', qs.stringify(this.form), {
        emulateJSON: true
      }).then((res) => {
        console.log(res);
      });
    }
  }
}
</script>
<style>


</style>


