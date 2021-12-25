import Service from '../service'

export const reqUserLogin = (data)=>Service({
    url:'/user/passport/login',
    method:'post',
    data
})