<template>
  <div>
    <div v-for="a in data" :key="a.key">
      <div>{{a.value}}</div>
      <button @click="inputintroduce(a.key, a.value)">提交</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'girl-group',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  methods: {
    inputintroduce (key, value) {
      console.log(key, value)
      this.$router.push('/Weather')
      this.$emit('introduce', {
        name: key,
        age: value
      })
    }
  }
}
</script>
