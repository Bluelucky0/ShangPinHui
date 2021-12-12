import Service from '../service'

export const reqAddOrUpdataShaopCart =(skuId,skuNum)=>Service({
    url:`/cart/addToCart/${skuId}/${skuNum}`,
    method:'post'
})