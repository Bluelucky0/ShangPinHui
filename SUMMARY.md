## jsconfig.json

给 SRC 配置别名

## 路由组件与非路由组件的区别？

1、路由组件一般放在 pages|views 文件夹中，非路由组件一般放置 components 文件夹中
2、路由组件一般需要在 router 文件夹中进行注册（渲染在 APP.vue 组件的<router-view/>标签位置），非路由组件在使用的时候，一般都是以标签的形式使用（在使用的时候注册，渲染的时候直接在 APP.vue 组件直接用<路由名/>）
3、注册完路由，不管是路由组件，还是非路由组件，身上都有$route、$router 属性

$route ：一般获取路由的信息【路径，query，params等】
$router ：一般进行编程式导航时进行路由的跳转【push|replace】

## 路由的跳转？

1： 声明式导航 router-link（务必要有 to 属性），可以进行路由的跳转
2：编程式导航$router.push|replace，可以进行路由的跳转

编程式导航：声明式导航能做的，编程式导航都可以，但是编程式导航除了可以进行路由跳转，还可以做一些其他的业务

## 路由传参？

params 参数：属于路径当中的一部分，需要注意，在配置路由的时候，需要提前占位（path:'/home/params'）
query 参数：不属于路径的一部分，类似于 ajax 中的 queryString,直接在后面？xx=xx&xx=xx，不需要提前占位

路由传参：
第一种：字符串形式
this.$router.push('/search/'+this.keyword +'?k=' +this.keyword.toUpperCase())
   第二种：模板字符串形式
   this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
第三种：对象
this.$router.push({name:'search',params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}})

## 路由传参面试题？

## 1、路由传递参数（对象的写法）path 是否可以结合 params 参数一起使用？

this.$router.push({path:'search',params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()} //会报错
答：路由跳转传参的时候，对象的写法可以是 name，path 形式，但是不能一起用

## 2、如何指定 params 参数可传可不传？

如果路由要求传递 params 参数（配置路由的时候已经占位），但是没有传，此时 URL 地址会出错
解决：配置路由占位的时候在占位后面加一个？，表示可以传可不传

## 3、params 参数可以传参也可以不传参，但如果传参为空串，如何解决？

答：undefined
this.$router.push({name:'search',params:{keyword:''||undefined},query:{k:this.keyword.toUppercase()}})

## 4、路由组件能不能传递 props 数据？

答：三种
1、布尔值写法：params
{
path:'xxx',
...
props:true
}
2、对象写法：{a:1,b:2}
{
path:'xxx',
...
props:{a:1,b:2}
}
3、函数写法
{
path:'xxx',
...
props:($route)=>{
           return {keyword:$route.params.keyword,k:$route.query.k}
}
}

## 重写 push|replace

当重复点击路由时，会报警告错误？？？
声明式导航跳转，多次点击不会有这种问题，因为 vue-router 底层已经处理好了
编程式路由导航多次点击会报错，原因是因为最新的 vue-router 引入了一个 Promise，通过 push 方法传递响应的成功、失败的回调函数

    this.$router.push()中，$router是VueRouter的一个实例，而push则是VueRouter身上的方法，也就是原型对象身上的方法。所以我们机也可以通过对原型身上的push方法进行封装解决问题。

第一种方法：直接加成功和失败回调 ()=>{},()=>{}
this.$router.push({name:'search',xxx,xxx,()=>{},()=>{}})
【治标不治本】
第二种方法：
在路由配置中重写 push 方法
location :告诉原来的 push 方法，你往那边跳转（传递那些参数）
resolve ：成功的回调
reject ：失败的回调

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

## call|apply 的区别

    相同点：都可以调用函数一次，都可以篡改函数的上下文一次
    不同点：call和apply传递参数，call的参数用逗号隔开，apply的参数用数组
