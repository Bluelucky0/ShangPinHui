import Service from '../service'

export const reqUserRegister = (data) =>Service({
    url:'/user/passport/register',
    method:'post',
    data
})