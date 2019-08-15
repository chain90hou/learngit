<template>
  <el-col id="slider" :span="3">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="0">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu v-for="(item, index) in routerlist" v-bind:key="index" :index="index">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{index}}</span>
        </template>
        <el-menu-item v-for="itm in item" v-bind:key="itm.key" @click="routerChange(itm)">{{itm.key}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-col>
</template>
<script>
export default {
  data () {
    return {
      routerlist: {
        '运营': [{key: '成单', value: '/OP/Become'}, {key: '产品分类', value: '/OP/Productsort'}, {key: '小说', value: '/OP/Novel'}, {key: '测试', value: '/OP/Test'}],
        '统计': [{key: '复制统计', value: '/ST/Copyst'}, {key: '识别统计', value: '/ST/Spotst'}, {key: '点击统计', value: '/ST/Clickst'}, {key: '访问统计', value: '/ST/Accesst'}],
        '消耗管理': [{key: '消耗列表', value: '/EG/ExpendList'}],
        '推广': [{key: '站点', value: '/ED/site'}, {key: '渠道', value: '/ED/canal'}, {key: '渠道分类', value: '/ED/canalsprt'}, {key: '域名备案检测', value: '/ED/domainname'}],
        '文案': [{key: '文案收藏', value: '/CW/cwcollect'}, {key: '百度创意', value: '/CW/bdorigin'}, {key: '关键词', value: '/CW/keyword'}]
      }
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    routerChange (e) {
      this.$router.push({path: e.value})
    }
  }
}
</script>
<style>
.el-menu-item {
  min-width: auto!important;
}
.el-menu {
  text-align: left;
}
</style>


