<template>
  <div>
    <div class='flex'>
      <div class='flex_time'>
        <div><span class='hour'>{{hour + ':' + minutes}}</span>&nbsp;&nbsp;<span>{{time}}</span></div>
        <div class='month_day'>{{month + '月' + day + '日'}}&nbsp;&nbsp;{{weekList[week]}}</div>
        <div class='city'>{{city}}</div>
      </div>
      <div class='flex_weather'>
        <div class='weather'>{{todayList.type}}</div>
        <div class='wendu'>{{wendu}}&nbsp;℃</div>
        <div class='low_high'>{{todayList.low && todayList.low.split(' ')[1]}}&nbsp;/&nbsp;{{todayList.high && todayList.high.split(' ')[1]}}</div>
      </div>
    </div>
    <div class='news'>
      <div class="news_banner">
        <div class="news_banner_title" v-for="(item, index) in newsBanner" v-bind:key="index" :value="index" @click="newsTransfer(index)">{{item}}</div>
      </div>
      <div class='news_type' v-for='item in autoNews' v-bind:key="item.docid">
        <div class="news_type_title">
          <div class="news_title">{{item.title}}</div>
          <div class="news_source">{{item.source}}</div>
          <div class="news_ptime">{{item.ptime}}</div>
        </div>
        <div class="news_type_img">
          <img :src="item.picInfo[0] && item.picInfo[0].url" alt="">
        </div>
      </div>
    </div>
    <!-- <div v-for="item in list" v-bind:key="item.date">
      <div>{{month + '月' + item.date}}</div>
      <div>{{item.fengxiang}}</div>
      <div>{{item.low}}~{{item.high}}</div>
      <div>{{item.type}}</div>
    </div> -->
  </div>
</template>
<script>
export default {
  name: 'weahter',
  data () {
    return {
      weekList: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      newsBanner: {auto: '汽车', dy: '社会', ent: '娱乐', money: '财经', sports: '运动', tech: '科技', toutiao: '头条', war: '国际'},
      newsList: {},
      list: [],
      todayList: {},
      month: '',
      day: '',
      week: '',
      hour: '',
      minutes: '',
      city: '',
      notice: '',
      wendu: '',
      time: '',
      autoNews: []
    }
  },
  mounted () {
    this.dayUpdate()
    setInterval(() => {
      this.dayUpdate()
    }, 30000)
    this.$ajax.get('https://www.apiopen.top/weatherApi?city=武汉')
      .then((res) => {
        this.list = res.data.data.forecast
        this.todayList = res.data.data.forecast[0]
        this.city = res.data.data.city
        this.notice = res.data.data.ganmao
        this.wendu = res.data.data.wendu
        console.log(res.data.data)
      })
      .catch(err => console.log(err))
    this.$ajax.get('https://www.apiopen.top/journalismApi')
      .then((res) => {
        if (res.data) {
          this.newsList = res.data.data
          this.autoNews = res.data.data.auto
        }
        console.log(res.data)
      })
      .catch(err => console.log(err))
  },
  methods: {
    dayUpdate: function () {
      var today = new Date()
      this.month = today.getMonth() + 1
      this.day = today.getDate()
      this.week = today.getDay()
      this.hour = today.getHours()
      this.minutes = today.getMinutes() < 10 ? ('0' + today.getMinutes()) : today.getMinutes()
      this.time = today.toLocaleTimeString().substring(0, 2)
    },
    newsTransfer: function (e) {
      this.autoNews = this.newsList[e]
    }
  }
}
</script>
<style>
  .flex {
    display: flex;
    width: 100%;
    background: #2c3e50;
    color: #fff;
  }
  .flex_time {
    width: 60%;
    border-right: 3px solid rgba(255, 255, 255, 0.1);
    text-align: right;
    padding-right: 5%;
  }
  .flex_weather {
    width: 40%;
  }
  .hour {
    font-size: 50px;
    font-weight: 400;
  }
  .weather {
    font-size: 36px;
    font-weight: 800;
  }
  .news_type {
    display: flex;
    width: 100%;
  }
  .news_type_title {
    width: 50%;
    margin: 0 5%;
  }
  .news_type_img {
    width: 40%;
  }
  .news_type_img img {
    width: 100%;
  }
  .news_title {
    font-size: 15px;
    margin: 10px 0;
    text-align: left;
  }
  .news_source {
    text-align: left;
    color: #999;
  }
  .news_ptime {
    text-align: left;
     color: #999;
  }
  .news_banner {
    display: flex;
    width: 100%;
  }
  .news_banner div {
    width: 12%;
    padding: 5px 0;
    font-size: 14px;
    cursor: pointer;
  }
  .news_banner_title {
    cursor: pointer;
  }
  .news_banner_title:hover {
    color: #de5448;
  } 
  .active {
    color: #de5448;
  }
</style>


