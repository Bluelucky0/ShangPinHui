import service from '../service'

// export const reqCategoryList =()=>service({url:'/product/getBaseCategoryList',method:'get'});
export const reqCategoryList = ()=>service.get('/product/getBaseCategoryList')