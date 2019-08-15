/*
* 开发环境服务器配置
* @Author: wujiang
* @Date: 2018-08-16 11:32:36
* @Last Modified by: wujiang
* @Last Modified time: 2018-08-18 23:04:34
*/
module.exports = {
  // 开发环境代理服务器
  devProxy: {
      host: '0.0.0.0', // ip/localhost都可以访问
      port: 8080
  },
  // 后端服务器地址
  servers: {
    default: 'http://localhost:8081/springboot-girl',
    jsp: 'http://localhost:8082/springboot-jsp'
  }
}
