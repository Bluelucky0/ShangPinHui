import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store'

//注册全局组件---左侧导航栏
//第一个参数：全局组件的名字   第二个参数： 哪一个组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import { MessageBox } from 'element-ui';
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
//element-ui按需引入的注册
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入mock数据
import '@/mock/mockServer'
//引入swiper的样式
import 'swiper/css/swiper.css'

//统一引入接口文件
// import * as API from '@/api/service/index'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //配置全局时间总线$bus
  beforeMount(){
    Vue.prototype.$bus = this
    // Vue.prototype.$API = API
  },
  router,
  store
}).$mount('#app')
