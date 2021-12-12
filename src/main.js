import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store'

//注册全局组件---左侧导航栏
//第一个参数：全局组件的名字   第二个参数： 哪一个组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
//引入mock数据
import '@/mock/mockServer'
//引入swiper的样式
import 'swiper/css/swiper.css'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //配置全局时间总线$bus
  beforeMount(){
    Vue.prototype.$bus = this
  },
  router,
  store
}).$mount('#app')
