import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'

export default[
    {
        path:'*',
        redirect:'/home'
    },
    {
        path:'/home',
        name:'Home',
        //路由懒加载，只有在使用的时候才引入
        component:()=>import('@/pages/Home'),
        //路由元组件  可以用来当footer组件是否显示的判断条件
        meta:{show:true}
    },
    {
        path:'/search/:keyword?',
        name:'search',
        component:()=>import('@/pages/Search'),
        meta:{show:true}
    },
    {
        path:'/login',
        name:'login',
        component:()=>import('@/pages/Login'),
        meta:{show:false}
    },
    {
        path:'/register',
        name:'register',
        component:()=>import('@/pages/Register'),
        meta:{show:false}
    },
    {
        path:'/detail/:skuid',
        name:'Detail',
        component:()=>import('@/pages/Detail'),
        meta:{show:true}
    },
    {
        path:'/addcartsuccess',
        name:'addcartsuccess',
        component:()=>import('@/pages/AddCartSuccess'),
        meta:{show:true}
    },
    {
        path:'/shopcart',
        name:'shopcart',
        component:()=>import('@/pages/ShopCart'),
        meta:{show:true}
    },
    {
        path:'/trade',
        name:'trade',
        component:()=>import('@/pages/Trade'),
        meta:{show:true},
        //路由独享守卫，进入这个路由的前提条件只能是从购物车过来的
        beforeEnter: (to, from, next) => {
            if(from.path == '/shopcart'){
                next()
            }else{
                //代表从哪里还会到那去
                next(false)
            }
        }
    },
    {
        path:'/pay',
        name:'pay',
        component:Pay,
        meta:{show:true},
        beforeEnter: (to, from, next) => {
            if(from.path == '/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:'/paysuccess',
        name:'paysuccess',
        component:PaySuccess,
        meta:{show:true}
    },
    {
        path:'/center',
        name:'center',
        component:Center,
        meta:{show:true},
        children:[
            {               
                path:'myorder',
                name:'myorder',
                component:myOrder,           
            },
            {               
                path:'grouporder',
                name:'grouporder',
                component:groupOrder,           
            },
            {               
                path:'/center',
              redirect:'/center/myorder'           
            },
        ]
    },
]