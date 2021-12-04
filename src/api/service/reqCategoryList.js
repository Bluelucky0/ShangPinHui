import service from '../service'

export const reqCategoryList =()=>service({url:'/product/getBaseCategoryList',method:'get'});