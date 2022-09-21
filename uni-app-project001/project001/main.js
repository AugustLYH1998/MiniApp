import Vue from 'vue'
import App from './App'

// 导入网络请求的包
import {
  $http
} from '@escook/request-miniprogram'

uni.$http = $http


// 设置请求根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net';


// 请求拦截器
// // 请求开始之前做一些事情
$http.beforeRequest = function(option) {
  uni.showLoading({
    title: '数据加载中...'
  })
}

// 响应拦截器
// 请求完成之后做一些事情
$http.afterRequest = function() {
  // do something...
  uni.hideLoading();
}

// 封装弹框方法
uni.$showMsg = function(title = '数据请求失败', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
