import {reqGetCode} from '../../api/service/reqGetCode'
import { reqUserRegister } from '../../api/service/reqUserRegister'
import { reqUserLogin } from '../../api/service/reqUserLogin'
import { reqUserInfo } from '../../api/service/reqUserInfo'
import { setToken,getToken,removeItem } from '../../utils/token'
import {reqLogout} from '../../api/service/reqLogout'
const state ={
    code:'',
    //初始值是没有的为null，第一次登录成功后会返回一个token会覆盖这个null，下次刷新后仓库中token没了，然后就通过getToken()调用本地存储的持久化token
    token:getToken(),
    userInfo:{}
}
const mutations={
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    USERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    CLEAR(state){
        state.token = ''
        state.userInfo = ''
        removeItem()
    }
}
const actions={
    //获取验证码  正常情况下，我们只需要把手机号带给服务器，然后由后代去给客户发送验证码，但是会收费，所以这里我们直接显示到页面上面
    async getCode({commit},phone){
        let result = await reqGetCode(phone)
        if(result.code == 200){
            commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('falie'))
        }
    },
    //获取验证码
    async getUserRegister({commit},data){
        let result = await reqUserRegister(data)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //用户登录
    async userLogin({commit},user){
        let result = await reqUserLogin(user)
        if(result.code == 200){
            commit('USERLOGIN',result.data.token)
            //服务器返回的token，调用setToken把token存储到本地存储中，存仓库中（非持久化存储）的时候也同时存储到了本地存储（持久化存储）
            setToken(result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //用户登录之后获取用户信息
    async userInfo({commit}){
        let result = await reqUserInfo()
        console.log(result);
        if(result.code == 200){
            commit('USERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //退出登录
    async userLogout({commit}){
        let result = await reqLogout()
        if(result.code == 200){
            commit('CLEAR')
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters={}
export default{
    state,
    mutations,
    actions,
    getters
}