import { v4 as uuidv4 } from 'uuid'
//引入uuid，可以生成一个随机值，作为临时身份的token值带给服务器

export const getUUID=()=>{
    //先从本地存储中取出个人的token 值
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    //如果没有，就调用uuid随机生成一个，然后存储到本地存储中
    if(!uuid_token){
        uuid_token = uuidv4()
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    return uuid_token
}