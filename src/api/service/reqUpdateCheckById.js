import Service from '../service'

export const reqUpdateCheckById = (skuId,isChecked) =>Service({
    url:`/cart/checkCart/${skuId}/${isChecked}`,
    method:'get'
})