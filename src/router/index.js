import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Banner from '@/components/Banner'
import Testparent from '@/components/Testparent'
import Weather from './../pages/CM/Weather'
import Slider from './../pages/SM/SliderMenu'
import Become from './../pages/OP/Become'
import Test from './../pages/OP/Test'
import RadioStation from './../pages/RS/RadioStation'
import Novel from './../pages/NL/Novel'
import CopyStatic from './../pages/ST/CopyStatic'
import SpotStatic from './../pages/ST/SpotStatic'
import ShotStatic from './../pages/ST/ShotStatic'
import Accesst from './../pages/ST/Accesst'
import Register from './../pages/SI/Register'
import Login from './../pages/SI/Login'
import Home from './../pages/Home/Home'
import { getToken } from './../utiles/authority'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Banner',
      component: Banner
    },
    {
      path: '/ST/Accesst',
      name: 'Accesst',
      component: Accesst
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      children: [{
        path: '/test',
        name: 'Testparent',
        component: Testparent
      }, {
        path: '/OP/Become',
        name: 'Become',
        component: Become
      },
      {
        path: '/weather',
        name: 'Weather',
        component: Weather
      },
      {
        path: '/OP/Productsort',
        name: 'RadioStation',
        component: RadioStation
      },
      {
        path: '/OP/Novel',
        name: 'Novel',
        component: Novel
      },
      {
        path: '/OP/test',
        name: 'Test',
        component: Test
      },
      {
        path: '/slider',
        name: 'Slider',
        component: Slider
      },
      {
        path: '/ST/Copyst',
        name: 'CopyStatic',
        component: CopyStatic
      },
      {
        path: '/ST/Spotst',
        name: 'SpotStatic',
        component: SpotStatic
      },
      {
        path: '/ST/Clickst',
        name: 'ShotStatic',
        component: ShotStatic
      }]
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = getToken();
  if (token) {
            //如果用户信息存在则往下执行。
          next()
   } else {
    //如果用户token不存在则跳转到login页面
  if (to.path === '/login' || to.path === '/register' || to.path === '/forget') {
      next()
    } else {
      next('/login')
    }    
  } 
  
});

export default router
