import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

//重写push|replace
// location :告诉原来的push方法，你往那边跳转（传递那些参数）
//resolve ：成功的回调
//reject ：失败的回调
//call|apply的区别
//相同点：都可以调用函数一次，都可以篡改函数的上下文一次
//不同点：call和apply传递参数，call的参数用逗号隔开，apply的参数用数组
let originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
let originReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,resolve,reject)
    }
}

export default new VueRouter({
    routes:[
        {
            path:'*',
            redirect:'/home'
        },
        {
            path:'/home',
            name:'Home',
            component:Home,
            //路由元组件  可以用来当footer组件是否显示的判断条件
            meta:{show:true}
        },
        {
            path:'/search/:keyword?',
            name:'search',
            component:Search,
            meta:{show:true}
        },
        {
            path:'/login',
            name:'login',
            component:Login,
            meta:{show:false}
        },
        {
            path:'/register',
            name:'register',
            component:Register,
            meta:{show:false}
        }
    ]
})