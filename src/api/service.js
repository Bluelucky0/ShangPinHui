import axios from 'axios'
import nprogress from 'nprogress'
//引入nprogress的样式
import 'nprogress/nprogress.css'
import store from '@/store'

const service = axios.create({
    baseURL:'/api',
    timeout:5000
})

//请求拦截器
service.interceptors.request.use((config)=>{
   //发请求之前先看看仓库里面有没有uuid_token，有的话就在请求头里面加上请求
    if(store.state.detail.uuid_token){
        config.headers.UserTempId = store.state.detail.uuid_token
    }
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }
     //进度条的开始
    nprogress.start()  
    return config
},(error)=>{
    return Promise.reject(error)
})

//响应拦截器
service.interceptors.response.use((res)=>{
    //进度条的结束
    nprogress.done()
    return res.data
},(error)=>{
    return Promise.reject(error)
})

export default service