import Service from '../../service'

//获取搜索列表，参数至少是一个空对象
export const reqGetSearchList =(params)=>Service({
    url:'/list',
    method:'post',
    data:params
})
