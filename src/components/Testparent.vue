<template>
<div>
  <div>{{this.$router.query}}</div>
  <Soncomponent
    :data="dataList"
    @introduce="inputintroduce"
  />
</div>
</template>
<script>
import Soncomponent from './Soncomponent'
export default {
  name: 'soncomponent',
  components: {
    Soncomponent
  },
  data () {
    return {
      dataList: [{
        key: 1,
        value: 'fssfs'
      }, {
        key: 2,
        value: 'fssfs'
      }]
    }
  },
  mounted () {
    console.log(this.$router)
  },
  methods: {
    inputintroduce (e) {
      console.log(e)
    }
  }
}
</script>
