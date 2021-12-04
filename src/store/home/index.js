//home的小仓库
import {reqCategoryList} from '@/api/service/reqCategoryList'
//state :仓库存放数据的地方
const state = {
    categoryList:[]
}
//mutations :唯一修改state的地方
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    }
}
//actions :处理state，也可以书写自己的业务逻辑，还有异步处理
const actions = {
    async categoryList({commit}){
        let result = await reqCategoryList()
        console.log(result)
        if(result.code == 200){
            commit('CATEGORYLIST',result.data)
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