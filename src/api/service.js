import axios from 'axios'
import nprogress from 'nprogress'
//引入nprogress的样式
import 'nprogress/nprogress.css'

const service = axios.create({
    baseURL:'/api',
    timeout:5000
})

//请求拦截器
service.interceptors.request.use((config)=>{
    //进度条的开始
    nprogress.start()
    return config
},(error)=>{
    return Promise.reject(error)
})

//响应拦截器
service.interceptors.response.use((res)=>{
    // if(res.status === 200){

    // }
    //进度条的结束
    nprogress.done()
    return res.data
},(error)=>{
    return Promise.reject(error)
})

export default service