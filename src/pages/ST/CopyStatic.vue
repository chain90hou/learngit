<template>
  <div>
   <CopySon ref="getInput"/>
   <el-button @click="RenderCallback">提交</el-button>
   <el-row>
    <el-col :span="1" v-for="item in dataSize" v-bind:key="item.key">
      <span class="font_size">{{item.value}}</span>
    </el-col>
  </el-row>
  </div>
</template>
<script>
import CopySon from './CopyStatic_son';
import Request from './../../utiles/server';
import './../../assets/js/jquery.min.js'
export default {
  components: {
    CopySon
  },
  data () {
    return {
      dataList: [],
      dataSize: [{
        key: 'A',
        value: 'A',
      }, {
        key: 'B',
        value: 'B',
      }, {
        key: 'C',
        value: 'C',
      }, {
        key: 'D',
        value: 'D',
      }, {
        key: 'E',
        value: 'E',
      }, {
        key: 'F',
        value: 'F',
      }, {
        key: 'G',
        value: 'G',
      }, {
        key: 'H',
        value: 'H',
      }, {
        key: 'I',
        value: 'I',
      }, {
        key: 'J',
        value: 'J',
      }, {
        key: 'K',
        value: 'K',
      }]
    }
  },
  mounted () {
    var columns = [{
  data: 'opdate',
  name: '',
  searchable: true,
  orderable: true,
  search: {
    value: '',
    regex: false,
  }
}, {
  data: 'adv_code',
  name: '',
  searchable: true,
  orderable: true,
  search: {
    value: '',
    regex: false,
  }
}, {
  data: 'adv_name',
  name: '',
  searchable: true,
  orderable: true,
  search: {
    value: '',
    regex: false,
  }
}, {
  data: 'adv_companyname',
  name: '',
  searchable: true,
  orderable: true,
  search: {
    value: '',
    regex: false,
  }
}, {
  data: 'yestoday_amount',
  name: '',
  searchable: true,
  orderable: true,
  search: {
    value: '',
    regex: false,
  }
}, {
  data: 'today_spendamount',
  name: '',
  searchable: true,
  orderable: true,
  search: {
    value: '',
    regex: false,
  }
}, {
  data: 'today_payamount',
  name: '',
  searchable: true,
  orderable: true,
  search: {
    value: '',
    regex: false,
  }
} ,{
  ata: 'today_amount',
  name: '',
  searchable: true,
  orderable: true,
  search: {
    value: '',
    regex: false,
  }
}, {
  ata: 'adv_code',
  name: '',
  searchable: true,
  orderable: true,
  search: {
    value: '',
    regex: false,
  }
}];
var search = {
  value: '',
  regex: false
};
var order = [{
  column: 0,
  dir: 'desc'
}];
var data = {
  draw: 1,
  start: 0,
  length: 10,
  order,
  search,
  columns
};
Request('http://www.daishudong.com/adv/adBalanceSingleJson', {
  data : data,
  dataType: 'json',
  type : 'POST',
  xhrFields: {
    withCredentials: true
  },
  crossDomain: true,
  contentType: "application/json",
}).then((res) => {
  console.log(res);
});
Request('http://www.daishudong.com/adv/adBalanceSingleJson', {
  data: data,
  dataType: 'json',
  type: 'post',
  xhrFields: {
    withCredentials: true
  }
}).then((res) => {
  console.log(res);
})
// $.ajax({
//   url : 'http://www.daishudong.com/adv/adBalanceSingleJson',
//   data : data,
//   dataType: 'json',
//   type : 'POST',
//   xhrFields: {
//     withCredentials: true
//   },
//   crossDomain: true,
//   contentType: "application/json",
// }).then((res) => {
//   console.log(res);
// });
    console.log($);
    // var that = this.$ajax;
    $('.font_size').click((e) => {
      var $ele = $(e.target);
      $('.font_size').removeClass('active');
      $ele.addClass('active');
      if ($ele.html() == 'A') {
        this.$ajax.get('/home/Table').then((res) => {
          console.log(res);
        });
      }

    })
    
  },
  methods: {
    RenderCallback: function () {
      console.log(this.$refs.getInput.multipleSelection);
    }
  }
}
</script>
<style>
  .active {
    color: #dd5145;
    transform: scale(1.5);
  }
  .font_size {
    display: inline-block;
    padding: 5px;
    cursor: pointer;
  }
  .font_size:hover {
    color: #dd5145;
    transform: scale(1.5);
  }
</style>


