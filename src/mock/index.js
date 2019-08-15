const Mock = require('mockjs');
// 格式： Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/user/userInfo', 'get', require('./json/userInfo'));
Mock.mock('/home/banner', 'get', require('./json/homeBanner'));
Mock.mock('/home/radio', 'get', require('./json/radioStation'));
Mock.mock('/home/novel', 'get', require('./json/novel'));
Mock.mock('/home/Table', 'get', require('./json/table'));
