import Service from '../service'

export const reqUserInfo = () =>Service({
    url:'/user/passport/auth/getUserInfo',
    method:'get'
})