import {reqCartList} from '@/api/service/reqCartList'
import { reqDeleteCartById } from '@/api/service/reqDeleteCartById'
import { reqUpdateCheckById } from '@/api/service/reqUpdateCheckById'
const state ={
    cartList:[]
}
const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }
}
const actions={
    //获取购物车列表
    async getCartList ({commit}){
        let result = await reqCartList()
        // console.log(result);
        if(result.code == 200){
            commit('GETCARTLIST',result.data)
        }
    },
    //购物车删除操作  返回的是操作的结果---成功或失败
    async deleteCartById({commit},suiId){
        let result = await reqDeleteCartById(suiId)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //购物车列表是否勾选
    async getUpdateCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckById(skuId,isChecked)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //删除全部勾选的商品
    //context：小仓库--commit【提交mutations修改state】、getters【计算属性】、dispatch【派发action】 所以我们把dispatch和getters解构出来
    deleteCheckedCartAll({dispatch,getters}){
        //获取购物车中全部勾选的产品，数组
         let PromiseAll = []
         //对计算属性中的cartInfoList进行遍历，找出所有被勾选的，把ID带过去发请求返回的是一个Promise对象，而遍历会产生多个Promise
         //所以同意放到一个数组中
         getters.cartList.cartInfoList.forEach(item => {
             let Promise = item.isChecked == 1 ?dispatch('deleteCartById',item.skuId):''
             PromiseAll.push(Promise)
         });
         //Promise.all只有所有的都返回成功，才返回成功，只要有一个失败就返回失败
         return Promise.all(PromiseAll)
    },
    //修改全部选中的产品状态
    updateAllCartIschecked({dispatch,state},isChecked){
        let promiseALL = []
        state.cartList[0].cartInfoList.forEach((item)=>{
            let Promise = dispatch('getUpdateCheckedById',{skuId:item.skuId,isChecked})
            promiseALL.push(Promise)
        })
        return Promise.all(promiseALL)
    }
}
const getters={
    cartList(state){
        return state.cartList[0]||{}
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}