import Service from '../../service'

//结算地址获取用户地址信息
export const reqUserAddressInfo = ()=>Service({
    url:'/user/userAddress/auth/findUserAddressList',
    method:'get'
})

//获取结算订单交易页信息
export const reqUserTradeInfo = ()=>Service({
    url:'/order/auth/trade',
    method:'get'
})

//提交订单
export const reqSubmitOrder = (tradeNo,data)=>Service({
    url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method:'post'
})

//13.获取订单支付信息
export const reqPayInfo = (orderId)=>Service({
    url:`/payment/weixin/createNative/${orderId}`,
    method:'get'
})

//查询支付订单状态
export const reqPayStatus = (orderId)=>Service({
    url:`/payment/weixin/queryPayStatus/${orderId}`,
    method:'get'
})

//获取我的订单列表
export const reqMyOrderList = (page,limit) =>Service({
    url:`/order/auth/${page}/${limit}`,
    method:'get'
})