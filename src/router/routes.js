import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'

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
        //路由元组件  可以用来当footer组件是否显示的判断条件
        meta:{show:true}
    },
    {
        path:'/addcartsuccess',
        name:'addcartsuccess',
        component:AddCartSuccess,
        //路由元组件  可以用来当footer组件是否显示的判断条件
        meta:{show:true}
    },
    {
        path:'/shopcart',
        name:'shopcart',
        component:ShopCart,
        //路由元组件  可以用来当footer组件是否显示的判断条件
        meta:{show:true}
    },
]