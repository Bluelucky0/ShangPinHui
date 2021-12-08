//search的小仓库
import { reqGetSearchList } from '@/api/service/reqSearchList'
const state = {
    //根据服务器返回的数据格式来写
    searchList:{}
}
const mutations = {
    SEARCHLIST(state,searchList){
        state.searchList = searchList
    }
}
const actions = {
    //获取搜索数据
    //参数至少为一个空对象，否则会报错
    async getSearchList({commit},params={}){
        let result = await reqGetSearchList(params)
        // console.log(result);
        if(result.code == 200){
            commit('SEARCHLIST',result.data)
        }
    }
}
//计算属性  为简化数据而生，把数据变简单
const getters = {
    goodsList(state){
        //在这个里面直接用state中的数据，假如没有网络或其他问题请求未发送或数据还没成功返回
        //此时就会报错为undefined，所以后面加一个空对象保证不会报错
        return state.searchList.goodsList||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList||[]
    },
    attrsList(state){
        return state.searchList.attrsList||[]
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}