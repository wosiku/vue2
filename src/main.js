import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 配置默认请求头/基地址（可选）
axios.defaults.baseURL = 'http://192.168.20.157:8087'
axios.defaults.timeout = 5000
axios.defaults.headers.common['Authorization'] = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2tleSI6Ijk3MDk2YjBkLWRiZTUtNDNhZS05NjM4LWE5MmYyODk2Yjg1OCIsInVzZXJuYW1lIjoiYWRtaW4ifQ.o2orTLZHHoVrSLYSG8_QHnC3fOPHsa0YMmFC_xnV4xRIPaM_h91-FXonFmJ0M4E273wgeLg5HSn3anIHqlUVsA'
// 挂载到 Vue 原型（所有组件可通过 this.$http 访问）
Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
