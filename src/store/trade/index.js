import {reqUserAddressInfo,reqUserTradeInfo} from '@/api/service/trade'
const state = {
    userAddress:[],
    tradeInfo:{}
}
const mutations = {
    GETUSERADDRESS(state,userAddress){
        state.userAddress = userAddress
    },
    GETTRADEINFO(state,tradeInfo){
        state.tradeInfo = tradeInfo
    },
}
const actions = {
    //获取用户地址信息
    async getUserAddress({commit}){
        let result = await reqUserAddressInfo()
        if(result.code == 200){
            commit('GETUSERADDRESS',result.data)
        }
    },
    //获取订单交易页信息
    async getTradeInfo({commit}){
        let result = await reqUserTradeInfo()
        // console.log(result);
        if(result.code == 200){
            commit('GETTRADEINFO',result.data)
        }
    }

}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}