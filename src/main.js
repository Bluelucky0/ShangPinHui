import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store'

//注册全局组件---左侧导航栏
//第一个参数：全局组件的名字   第二个参数： 哪一个组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name,TypeNav)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
