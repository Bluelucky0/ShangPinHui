import Service from '../../service'

//获取验证码
export const reqGetCode=(phone)=>Service({
    url:`/user/passport/sendCode/${phone}`,
    method:'get'
})

//退出登录
export const reqLogout = ()=>Service({
    url:'/user/passport/logout',
    method:'get'
})

//获取用户信息
export const reqUserInfo = () =>Service({
    url:'/user/passport/auth/getUserInfo',
    method:'get'
})
//用户登录
export const reqUserLogin = (data)=>Service({
    url:'/user/passport/login',
    method:'post',
    data
})
//用户注册
export const reqUserRegister = (data) =>Service({
    url:'/user/passport/register',
    method:'post',
    data
})