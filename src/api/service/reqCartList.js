import Service from '../service'

export const reqCartList = ()=>Service({
    url:'/cart/cartList',
    method:'get'
})