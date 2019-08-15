<template>

<div class="layout">
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="活动名称" style='text-align:left;'>
      <span>骨病文案</span>
    </el-form-item>
    <el-form-item label="活动区域">
      <el-col :span="8">
        <el-select v-model="form.region" style='width:100%;' placeholder="请选择活动区域">
          <el-option label="上海" value="shanghai"></el-option>
          <el-option label="北京" value="beijing"></el-option>
        </el-select>
      </el-col>
    </el-form-item>
     <el-form-item label="姓名" style='text-align:left;'>
      <el-col :span="11">
        <el-input v-model="form.name"></el-input>
      </el-col>
    </el-form-item>
     <el-form-item label="电话" style='text-align:left;'>
      <el-col :span="11">
        <el-input v-model="form.tel"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="活动时间">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" value-format="yyyyMMdd" style="width: 100%;"></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="活动性质">
      <el-checkbox-group v-model="form.type">
        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
        <el-checkbox label="地推活动" name="type"></el-checkbox>
        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="特殊资源">
      <el-radio-group v-model="form.resource">
        <el-radio label="线上品牌商赞助"></el-radio>
        <el-radio label="线下场地免费"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="活动形式">
      <el-input type="textarea" v-model="form.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">提交</el-button>
      <el-button @click="resetForm('form')">取消</el-button>
    </el-form-item>
  </el-form>
  <!-- <form id="upload" class="upload" enctype="multipart/form-data">
    <label for="file">文件名：</label>
    <input type="file" name="file" id="file"><br>
    <input @click="picsubmit" type="button" value="提交">
  </form> -->
  <form id="uploads" class="upload" enctype="multipart/form-data">
    <label for="file">文件名：</label>
    <input type="file" name="file" id="files" @change="picOnchange"><br>
    <input @click="piclistsubmit" type="button" value="提交">
  </form>
<div class="picDis">
 <img src="" alt="">
</div>
<el-row class="picDislist clear">

</el-row>
</div>
</template>
<script>
import qs from 'qs';
import './../../assets/js/jquery.min.js';
export default {
  namespace: 'spotstatic',
  data () {
    return {
      form: {
        name: '',
        tel: '',
        region: '',
        date1: '',
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  mounted () {
   
    
  },
  methods: {
    picOnchange (e) {
      // console.log(e.target, $('#files').val());
      // var url = this.getObjectURL(e.target.files[0]);
          var url = getPath(document.getElementById("files"));
           var oFReader = new FileReader();
          var file = document.getElementById('files').files[0];
         
          oFReader.readAsDataURL(file);
          oFReader.onloadend = function(oFRevent){
              var src = oFRevent.target.result;
              // $('.content').attr('src',src);
              // alert();
               console.log(src);
               $('.picDislist').append(`
                <div class="pic_modle">
                  <div class="picdelete">X</div>
                  <img src="${src}" alt="">
                </div>
              `);
          }

      function getPath(obj) {
        if (obj) {
          if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
            obj.select();
            return document.selection.createRange().text;
          } else if (window.navigator.userAgent.indexOf("Firefox") >= 1) {
            if (obj.files) {
              return obj.files.item(0).getAsDataURL();
            }
            return obj.value;
          }
          return obj.value;
        }
      }
      console.log(url);
      if (e && e.target.files) {
        if(e.target.files.length > 5) {
          alert('最多上传5张图片');
          return;
        }
      }
    },
    picsubmit() {
      var formData = new FormData();
      console.log($('#file'), $('#file').val(), $('#file')[0].files[0]);
      formData.append('file',$('#file')[0].files[0]);
      console.log(formData);
      this.$ajax.post('http://localhost/up_load.php', formData, {
        emulateJSON: true
      }).then((res) => {
        console.log(res);
        $('.picDis img').attr('src', res.data);
      });
    },
    piclistsubmit() {
      var data = new FormData($('#uploads')[0]);
      
      this.$ajax.post('http://localhost/uploads.php', data, {
        emulateJSON: true
      }).then((res) => {
        var that = this;
        if (res.status === 200) {
          var piclist = res.data.map(item => {
            return `
                <div class="pic_modle">
                  <div class="picdelete" title="${item}">X</div>
                  <img src="${item}" alt="">
                </div>
              `;
          });
          $('.picDislist').html(piclist.join(' '));
          $('.picdelete').click(function (e) {
            var $tar = $(e.target);

            $tar.parent().remove();
            var imgUrl = $tar.attr('title');
            var url = imgUrl.split('/upload')[1];
            that.picdelete('upload' + url);
            that.resetForm('form');
          });
        }
        
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.form);
          var valus = {
            ...this.form,
            type: JSON.stringify(this.form.type),
          };
          this.$ajax.post('http://localhost/form.php', qs.stringify(valus), {
            emulateJSON: true
          }).then((res) => {
            console.log('res', res);
            
            if (res) {
              if (res.data === 0) {
                alert("您输入的用户已存在！");
              } else if (res.data === 1) {
                alert("提交成功");
              } else {
                alert("提交失败" + res.data);
              }
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    picdelete (value) {
      var values = {
        imgUrl: value
      };
      this.$ajax.post('http://localhost/imgdelete.php', qs.stringify(values), {
        emulateJSON: true
      }).then((res) => {
        console.log(res);
      });
    },
    getObjectURL(file) {
        var url = null;
        console.log(window.createObjectURL)
        console.log(window.URL)
        if (window.createObjectURL != undefined) {
            url = window.createObjectURL(file)
        } else if (window.URL != undefined) {
            url = window.URL.createObjectURL(file)
        } else if (window.webkitURL != undefined) {
            url = window.webkitURL.createObjectURL(file)
        }
        return url
    }
  }
}
</script>
<style>
.layout {
  text-align: center;
  width: 90%;
  margin-top: 20px;
  margin: 5% 5%;
}
.clear {
  content: '';
  display: block;
  clear: both;
}
.picDislist {
  width: 100%;
}
.picDislist > div {
  float: left;
}
.picDislist img {
  width: 100%;
}
.pic_modle {
  position: relative;
  width: 150px;
  height: 150px;
  padding: 2px;
  border: 1px solid #666;
  border-radius: 3px;
  margin: 1%;

}
.pic_modle > div {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 26px;
  color: #fff;
}

</style>

