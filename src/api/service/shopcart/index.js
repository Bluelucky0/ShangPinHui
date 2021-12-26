import Service from '../../service'

//获取购物车信息
export const reqCartList = ()=>Service({
    url:'/cart/cartList',
    method:'get'
})

//根据ID删除购物车商品
export const reqDeleteCartById = (skuId) =>Service({
    url:`/cart/deleteCart/${skuId}`,
    method:'delete'
})

//根据ID修改购物车商品信息
export const reqUpdateCheckById = (skuId,isChecked) =>Service({
    url:`/cart/checkCart/${skuId}/${isChecked}`,
    method:'get'
})

