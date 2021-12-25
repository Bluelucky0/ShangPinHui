<template>
  <div>
    <!-- 全局组件可以直接使用，不用在引入了 -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <!-- 在父组件里面进行，对子组件进行遍历，然后通过props把值传给组件floor -->
    <Floor v-for="(floor, index) in floorsList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>

<script>
import Brand from "./Brand/index.vue";
import Floor from "./Floor";
import Like from "./Like";
import ListContainer from "./ListContainer";
import Rank from "./Rank";
import Recommend from "./Recommend";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    Brand,
    Floor,
    Like,
    ListContainer,
    Rank,
    Recommend,
  },
  mounted() {
    this.$store.dispatch("floorsList");
    //用户登录成功之后派发请求获取用户的账户信息
    // this.$store.dispatch("userInfo");
  },
  computed: {
    ...mapState({
      floorsList: (state) => state.home.floorsList,
    }),
  },
};
</script>

<style>
</style>