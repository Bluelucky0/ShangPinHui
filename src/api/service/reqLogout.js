import Service from '../service'

export const reqLogout = ()=>Service({
    url:'/user/passport/logout',
    method:'get'
})