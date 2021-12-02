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
};
</script>

<style>
</style>
