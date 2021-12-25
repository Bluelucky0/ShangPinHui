import Service from '../service'

export const reqGetCode=(phone)=>Service({
    url:`/user/passport/sendCode/${phone}`,
    method:'get'
})