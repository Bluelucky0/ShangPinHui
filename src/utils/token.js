//存储token---调用的时候把token传进来
export const setToken = (token)=>{
    localStorage.setItem('TOKEN',token)
}

//获取token
export const getToken = ()=>{
    return localStorage.getItem('TOKEN')
}

//清除token
export const removeItem= () =>{
    localStorage.removeItem('TOKEN')
}