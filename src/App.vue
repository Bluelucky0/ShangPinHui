<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <!-- 判断footer组件是否显示，home,search显示，login，register不显示 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    //因为在app.js中，mounted只会挂载一次，挂载完成去请求数据也是请求一次，
    //而在组件中，每次跳转的时候都要重新挂载，会很好性能
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
</style>
