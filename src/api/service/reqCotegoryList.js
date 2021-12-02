import service from '../service'

export const reqCotegoryList =()=>service({url:'/product/getBaseCategoryList',method:'get'});