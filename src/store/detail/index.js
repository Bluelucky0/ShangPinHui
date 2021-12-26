// import {reqGoodsInfo} from '../../api/service/reqGoodsInfo'
// import {reqAddOrUpdataShaopCart} from '../../api/service/reqAddOrUpdataShopCart'
import {getUUID} from '../../utils/uuid_token'
import {reqGoodsInfo,reqAddOrUpdataShaopCart} from '../../api/service/detail'
const state={
    goodsInfo:{},
    uuid_token:getUUID()
}
const mutations={
    GETGOODSINFO(state,goodsInfo){
        state.goodsInfo=goodsInfo
    }
}
const actions={
    //请求商品信息
    async getGoodsInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId)
        if(result.code == 200){
            commit('GETGOODSINFO',result.data)
        }
    },
    //请求加入购物车
    //这个请求返回的只是一个状态值，告诉我们操作成功，所以不需要vuex三连环保存数据
    async addShopCart({commit},{skuid,skuNum}){
        let result = await reqAddOrUpdataShaopCart(skuid,skuNum)
        // console.log(result);
        //async函数返回的一定是一个Promise 对象，有返回值
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters={
    categoryView(state){
        //一定要加或为空对象，因为如果数据还没回来时，返回的就是一个undefined，而在页面上渲染返回的数据的属性值数据时undefined是没有的，所以控制台会报错
        return state.goodsInfo.categoryView||{}
    },
    skuInfo(state){
        return state.goodsInfo.skuInfo||{}
    },
    spuSaleAttrList(state){
        return state.goodsInfo.spuSaleAttrList||[]
    }
}

export default{
    state,
    mutations,
    actions,
    getters
}