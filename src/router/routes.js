import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
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
    },
    {
        path:'/detail/:skuid',
        name:'Detail',
        component:Detail,
        meta:{show:true}
    },
    {
        path:'/addcartsuccess',
        name:'addcartsuccess',
        component:AddCartSuccess,
        meta:{show:true}
    },
    {
        path:'/shopcart',
        name:'shopcart',
        component:ShopCart,
        meta:{show:true}
    },
    {
        path:'/trade',
        name:'trade',
        component:Trade,
        meta:{show:true}
    },
    {
        path:'/pay',
        name:'pay',
        component:Pay,
        meta:{show:true}
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