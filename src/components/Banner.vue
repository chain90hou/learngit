<template>
<div>
  <div>{{ msg }}</div>
  <button @click="add()">jaiyou</button>
  <button @click="res()">jaiyou</button>
  <div>{{$store.state.count}}</div>
  <div>
    <div v-for="a in mesList" v-bind:key="a.key" @click="target(a)">{{a.key}}</div>
  </div>
  <div v-if="status">的睡眠，人体内储存的葡萄糖已被消耗殆尽</div>
  <button @click="transfer()">跳转</button>
  <i class="el-icon-edit"></i>
  <i class="el-icon-share"></i>
  <i class="el-icon-delete"></i>
  <el-button type="primary" icon="el-icon-search">搜索</el-button>
  <el-upload
    class="upload-demo"
    action="https://jsonplaceholder.typicode.com/posts/"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    multiple
    :limit="3"
    :on-exceed="handleExceed"
    :file-list="fileList">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
</div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Banner',
  data () {
    return {
      msg: 123,
      status: true,
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      mesList: [{
        key: '0',
        content: '刘',
        value: '3经过一夜的睡眠，人体内储存的葡萄糖已被消耗殆尽，这时急需补充能量与营养，早上不进食，就不能弥补夜间丧失的水分和营养素，使血粘度增加，不利于一夜间产生的废物排出，从而增加患结石以及中风、心肌梗死的危险。从中医角度看，要想护好胃，应该注意以下两点'
      }, {
        key: '1',
        content: '吴',
        value: '2经过一夜的睡眠，人体内储存的葡萄糖已被消耗殆尽，这时急需补充能量与营养，早上不进食，就不能弥补夜间丧失的水分和营养素，使血粘度增加，不利于一夜间产生的废物排出，从而增加患结石以及中风、心肌梗死的危险。从中医角度看，要想护好胃，应该注意以下两点'
      }, {
        key: '2',
        content: '霞',
        value: '1经过一夜的睡眠，人体内储存的葡萄糖已被消耗殆尽，这时急需补充能量与营养，早上不进食，就不能弥补夜间丧失的水分和营养素，使血粘度增加，不利于一夜间产生的废物排出，从而增加患结石以及中风、心肌梗死的危险。从中医角度看，要想护好胃，应该注意以下两点'
      }]
    }
  },
  methods: {
    add: function () {
      this.msg++
      this.getNunver(5)
    },
    res: function () {
      this.msg--
    },
    target: function (e) {
      console.log(e.value)
    },
    transfer: function () {
      this.$router.push({name: 'Testparent', params: { userid: 12313 }})
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了${files.length} 个文件，共选择了${files.length + fileList.length}个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除${file.name}？`)
    },
    ...mapMutations(['getNunver'])
  },
  computed: {
  },
  watch: {
  }
}
</script>
<style>
  button {
    width: 100px;
    height: 30px;
    background: blue;
    color: #fff;
  }
</style>
