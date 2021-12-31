import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import routes from "./routes";
//在仓库中拿到token，用来判断用户是否已经登录
import store from "@/store";

//重写push|replace
// location :告诉原来的push方法，你往那边跳转（传递那些参数）
//resolve ：成功的回调
//reject ：失败的回调
//call|apply的区别
//相同点：都可以调用函数一次，都可以篡改函数的上下文一次
//不同点：call和apply传递参数，call的参数用逗号隔开，apply的参数用数组
let originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(this, location, resolve, reject);
  }
};

let router = new VueRouter({
  routes,
  // 当切换到新路由时，页面滚到顶部
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 };
  },
});

//全局路由守卫
router.beforeEach(async (to, from, next) => {
  //先从仓库中获取token
  let token = store.state.user.token;
  //从仓库中获取用户信息
  let name = store.state.user.userInfo.name;
  //判断是否有token，有就代表已经登录
  if (token) {
    //登录之后，判断是不是要跳转到login登录或注册页面，是的话就不放行
    if (to.path == "/login" || to.path == '/register') {
      next("/");
    } else {
      //else代表登录之后跳转的不是login页面，然后判断一下是否有用户信息，有就放行
      if (name) {
        next();
      } else {
        //else代表没有用户信息，派发action获取用户信息，try-catch捕获，获取用户信息成功就放行
        try {
          await store.dispatch("userInfo");
          next();
        } catch (error) {
          //catch获取用户信息不成功，可能是token过期，派发action清除token以及用户信息，并跳转到登录页面重新登录
          await store.dispatch("userLogout");
          next("/login");
        }
      }
    }
  } else {
    //else代表没有token，用户未登录
    // to.Path在获取未登录的情况下点击想去的页面
    let toPath = to.path
    //判断没有登录下要去交易页面/支付页面/个人中心页面等就跳转到登录页面
    if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
      //登录成功后跳转到自己没有登录时想去的页面
      next('/login?redirect='+toPath)
    }else{
      next()
    }
  }
});
export default router;
