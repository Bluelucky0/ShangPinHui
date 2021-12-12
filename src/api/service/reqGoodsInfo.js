import Service from '../service'

export const reqGoodsInfo = (skuId)=>Service({
    url:`/item/${skuId}`,
    method:'get'
})