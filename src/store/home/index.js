//home的小仓库
import {reqCategoryList} from '@/api/service/reqCategoryList'
import {reqBannersList} from '@/api/service/reqBannersList'
import { reqFloorsList } from '@/api/service/reqFloorsList'
//state :仓库存放数据的地方
const state = {
    categoryList:[],
    bannersList:[],
    floorsList:[]
}
//mutations :唯一修改state的地方
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    BANNERSLIST(state,bannersList){
        state.bannersList = bannersList
    },
    FLOORSLIST(state,floorsList){
        state.floorsList = floorsList
    }
}
//actions :处理state，也可以书写自己的业务逻辑，还有异步处理
const actions = {
    //三级菜单的数据
    async categoryList({commit}){
        let result = await reqCategoryList()
        // console.log(result)
        if(result.code == 200){
            commit('CATEGORYLIST',result.data)
        }
    },
    //首页轮播图的数据
    async bannersList({commit}){
        let result = await reqBannersList()
        // console.log(result)
        if(result.code == 200){
            commit('BANNERSLIST',result.data)
        }
    },
    //首页floor列表
    async floorsList({commit}){
        let result = await reqFloorsList()
        if(result.code == 200){
            commit('FLOORSLIST',result.data)
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