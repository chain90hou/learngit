<template>
  <div class="become">
    <div style="height: 500px;">


      
      <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide"><img src="./../../assets/images/1.jpg" alt=""></div>
            <div class="swiper-slide"><img src="./../../assets/images/2.jpg" alt=""></div>
            <div class="swiper-slide"><img src="./../../assets/images/3.jpg" alt=""></div>
            <div class="swiper-slide"><img src="./../../assets/images/4.jpg" alt=""></div>
        </div>
        
        <!-- Add Pagination -->
        <!-- <div class="swiper-pagination"></div> -->
        <!-- Add Arrows -->
        <!-- <div class="swiper-button-next"></div> -->
        <!-- <div class="swiper-button-prev"></div> -->
      </div>
    </div>
    <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="审批人">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialogVisible = true">添加</el-button>
        </el-form-item>
        <el-dialog
          title="添加"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
          <div class="modle_style">
            <el-form-item label="活动区域" prop="region">
              <el-select v-model="formInline.region1" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="province"
        label="省份"
        width="120">
      </el-table-column>
      <el-table-column
        prop="city"
        label="市区"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="300">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="邮编"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" disabled>已审核</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Api from './../../store/api'
import request from './../../utiles/server'
import './../../assets/js/jquery.min.js'
// import './../../assets/css/swiper.css'
import Swiper from 'Swiper'
export default {
  name: 'Become',
  components: {
    Api
  },
  
  data () {
    return {
      formInline: {
        user: '',
        region: '',
        region1: ''
      },
      dialogVisible: false,
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    }
  },
  mounted () {
    var swiper = new Swiper('.swiper-container', {
            // spaceBetween: 30,
            // centeredSlides: true,
            loop: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
        });
    console.log(Api['成单'])
    console.log($);
    request('/admin/succeed/index?page=1&limit=20', {
      method: 'GET',
      body: {
        method: 'get'
      }
    })
  },
  methods: {
    handleClick (row) {
      console.log(row)
    },
    onSubmit () {
      console.log(this.formInline);
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
}
</script>
<style>
@import '../../../node_modules/swiper/dist/css/swiper';
.el-table td, .el-table th{
  text-align: center;
}
.become {
  margin-top: 20px;
}
.modle_style {
  text-align: left;
}
.modle_style_title {
  background: rgba(0,0,0,0.2);
}
.el-dialog__header {
  background: rgba(0,0,0,0.2)
}
.el-dialog__close {
  color: #fff;
  
}
.demo-form-inline {
  text-align: left;
  margin-left: 3%;
}
 html,
        body {
            position: relative;
            height: 100%;
        }
        
        body {
            background: #eee;
            font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
            font-size: 14px;
            color: #000;
            margin: 0;
            padding: 0;
        }
        
        .swiper-container {
            width: 100%;
            height: 100%;
        }
        
        .swiper-slide {
            text-align: center;
            font-size: 18px;
            background: #fff;
            /* Center slide text vertically */
            display: -webkit-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            -webkit-justify-content: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            -webkit-align-items: center;
            align-items: center;
        }
        
        .swiper-slide img {
            width: 100%;
        }
        
        .file-box {
            position: relative;
            display: inline-block;
            width: 100px;
            height: 100px;
            background: rebeccapurple;
            /* background: url('images/uploadPc.png')no-repeat; */
            background-size: 100px 100px;
        }
        
        #input_file {
            width: 100%;
            height: 100%;
            opacity: 0;
            filter: alpha(opacity=0);
        }
</style>
