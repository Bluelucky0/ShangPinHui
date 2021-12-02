//home的小仓库
import {reqCotegoryList} from '@/api/service/reqCotegoryList'
//state :仓库存放数据的地方
const state = {
    cotegoryList:[]
}
//mutations :唯一修改state的地方
const mutations = {
    COTEGORYLIST(state,cotegoryList){
        state.cotegoryList = cotegoryList
    }
}
//actions :处理state，也可以书写自己的业务逻辑，还有异步处理
const actions = {
    async cotegoryList({commit}){
        let result = await reqCotegoryList()
        console.log(result)
        if(result.code == 200){
            commit('COTEGORYLIST',result.data)
        }
    }
}
//getters :理解为计算属性，用于简化仓库的数据，让组件获取仓库更加方便
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}