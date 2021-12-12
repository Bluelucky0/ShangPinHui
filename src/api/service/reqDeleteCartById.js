import Service from '../service'

export const reqDeleteCartById = (skuId) =>Service({
    url:`/cart/deleteCart/${skuId}`,
    method:'delete'
})