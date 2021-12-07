import Service from '../service'

//参数至少是一个空对象
export const reqGetSearchList =(params)=>Service({
    url:'/list',
    method:'post',
    data:params
})