<template>
  <div class="type-nav">
    <div class="container">
      <!-- 用事件委派来清除鼠标移出效果  -->
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 加过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: getIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{ display: getIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                        <!-- <em>
                      <a href="">文学</a>
                    </em>
                    <em>
                      <a href="">经管</a>
                    </em>
                    <em>
                      <a href="">畅读VIP</a>
                    </em> -->
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <!-- <div class="item">
            <h3>
              <a href="">家用电器</a>
            </h3>
            <div class="item-list clearfix">
              <div class="subitem">
                <dl class="fore">
                  <dt>
                    <a href="">电子书1</a>
                  </dt>
                  <dd>
                    <em>
                      <a href="">免费</a>
                    </em>
                    <em>
                      <a href="">小说</a>
                    </em>
                    <em>
                      <a href="">励志与成功</a>
                    </em>
                    <em>
                      <a href="">婚恋/两性</a>
                    </em>
                    <em>
                      <a href="">文学</a>
                    </em>
                    <em>
                      <a href="">经管</a>
                    </em>
                    <em>
                      <a href="">畅读VIP</a>
                    </em>
                  </dd>
                </dl>
                <dl class="fore">
                  <dt>
                    <a href="">数字音乐</a>
                  </dt>
                  <dd>
                    <em>
                      <a href="">通俗流行</a>
                    </em>
                    <em>
                      <a href="">古典音乐</a>
                    </em>
                    <em>
                      <a href="">摇滚说唱</a>
                    </em>
                    <em>
                      <a href="">爵士蓝调</a>
                    </em>
                    <em>
                      <a href="">乡村民谣</a>
                    </em>
                    <em>
                      <a href="">有声读物</a>
                    </em>
                  </dd>
                </dl>
                <dl class="fore">
                  <dt>
                    <a href="">音像</a>
                  </dt>
                  <dd>
                    <em>
                      <a href="">音乐</a>
                    </em>
                    <em>
                      <a href="">影视</a>
                    </em>
                    <em>
                      <a href="">教育音像</a>
                    </em>
                    <em>
                      <a href="">游戏</a>
                    </em>
                  </dd>
                </dl>
                <dl class="fore">
                  <dt>文艺</dt>
                  <dd>
                    <em>
                      <a href="">小说</a>
                    </em>
                    <em>
                      <a href="">文学</a>
                    </em>
                    <em>
                      <a href="">青春文学</a>
                    </em>
                    <em>
                      <a href="">传记</a>
                    </em>
                    <em>
                      <a href="">艺术</a>
                    </em>
                  </dd>
                </dl>
                <dl class="fore">
                  <dt>人文社科</dt>
                  <dd>
                    <em>
                      <a href="">历史</a>
                    </em>
                    <em>
                      <a href="">心理学</a>
                    </em>
                    <em>
                      <a href="">政治/军事</a>
                    </em>
                    <em>
                      <a href="">国学/古籍</a>
                    </em>
                    <em>
                      <a href="">哲学/宗教</a>
                    </em>
                    <em>
                      <a href="">社会科学</a>
                    </em>
                  </dd>
                </dl>
                <dl class="fore">
                  <dt>经管励志</dt>
                  <dd>
                    <em>
                      <a href="">经济</a>
                    </em>
                    <em>
                      <a href="">金融与投资</a>
                    </em>
                    <em>
                      <a href="">管理</a>
                    </em>
                    <em>
                      <a href="">励志与成功</a>
                    </em>
                  </dd>
                </dl>
                <dl class="fore">
                  <dt>生活</dt>
                  <dd>
                    <em>
                      <a href="">家庭与育儿</a>
                    </em>
                    <em>
                      <a href="">旅游/地图</a>
                    </em>
                    <em>
                      <a href="">烹饪/美食</a>
                    </em>
                    <em>
                      <a href="">时尚/美妆</a>
                    </em>
                    <em>
                      <a href="">家居</a>
                    </em>
                    <em>
                      <a href="">婚恋与两性</a>
                    </em>
                    <em>
                      <a href="">娱乐/休闲</a>
                    </em>
                    <em>
                      <a href="">健身与保健</a>
                    </em>
                    <em>
                      <a href="">动漫/幽默</a>
                    </em>
                    <em>
                      <a href="">体育/运动</a>
                    </em>
                  </dd>
                </dl>
                <dl class="fore">
                  <dt>科技</dt>
                  <dd>
                    <em>
                      <a href="">科普</a>
                    </em>
                    <em>
                      <a href="">IT</a>
                    </em>
                    <em>
                      <a href="">建筑</a>
                    </em>
                    <em>
                      <a href="">医学</a>
                    </em>
                    <em>
                      <a href="">工业技术</a>
                    </em>
                    <em>
                      <a href="">电子/通信</a>
                    </em>
                    <em>
                      <a href="">农林</a>
                    </em>
                    <em>
                      <a href="">科学与自然</a>
                    </em>
                  </dd>
                </dl>
                <dl class="fore">
                  <dt>少儿</dt>
                  <dd>
                    <em>
                      <a href="">少儿</a>
                    </em>
                    <em>
                      <a href="">0-2岁</a>
                    </em>
                    <em>
                      <a href="">3-6岁</a>
                    </em>
                    <em>
                      <a href="">7-10岁</a>
                    </em>
                    <em>
                      <a href="">11-14岁</a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="item">
            <h3>
              <a href="">手机、数码、充值</a>
            </h3>
            <div class="item-list clearfix">
              <div class="subitem">
                <dl class="fore">
                  <dt>
                    <a href="">充值</a>
                  </dt>
                  <dd>
                    <em>
                      <a href="recharge.html">充值</a>
                    </em>
                  </dd>
                </dl>
                <dl class="fore">
                  <dt>
                    <a href="">电子书2</a>
                  </dt>
                  <dd>
                    <em>
                      <a href="">免费</a>
                    </em>
                    <em>
                      <a href="">小说</a>
                    </em>
                    <em>
                      <a href="">励志与成功</a>
                    </em>
                    <em>
                      <a href="">婚恋/两性</a>
                    </em>
                    <em>
                      <a href="">文学</a>
                    </em>
                    <em>
                      <a href="">经管</a>
                    </em>
                    <em>
                      <a href="">畅读VIP</a>
                    </em>
                  </dd>
                </dl>
                <dl class="fore">
                  <dt>
                    <a href="">数字音乐</a>
                  </dt>
                  <dd>
                    <em>
                      <a href="">通俗流行</a>
                    </em>
                    <em>
                      <a href="">古典音乐</a>
                    </em>
                    <em>
                      <a href="">摇滚说唱</a>
                    </em>
                    <em>
                      <a href="">爵士蓝调</a>
                    </em>
                    <em>
                      <a href="">乡村民谣</a>
                    </em>
                    <em>
                      <a href="">有声读物</a>
                    </em>
                  </dd>
                </dl>
                <dl class="fore">
                  <dt>
                    <a href="">音像</a>
                  </dt>
                  <dd>
                    <em>
                      <a href="">音乐</a>
                    </em>
                    <em>
                      <a href="">影视</a>
                    </em>
                    <em>
                      <a href="">教育音像</a>
                    </em>
                    <em>
                      <a href="">游戏</a>
                    </em>
                  </dd>
                </dl>
                <dl class="fore">
                  <dt>文艺</dt>
                  <dd>
                    <em>
                      <a href="">小说</a>
                    </em>
                    <em>
                      <a href="">文学</a>
                    </em>
                    <em>
                      <a href="">青春文学</a>
                    </em>
                    <em>
                      <a href="">传记</a>
                    </em>
                    <em>
                      <a href="">艺术</a>
                    </em>
                  </dd>
                </dl>
                <dl class="fore">
                  <dt>人文社科</dt>
                  <dd>
                    <em>
                      <a href="">历史</a>
                    </em>
                    <em>
                      <a href="">心理学</a>
                    </em>
                    <em>
                      <a href="">政治/军事</a>
                    </em>
                    <em>
                      <a href="">国学/古籍</a>
                    </em>
                    <em>
                      <a href="">哲学/宗教</a>
                    </em>
                    <em>
                      <a href="">社会科学</a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div> -->
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//按需引入  引入lodash下面的节流函数
import throttle from "lodash/throttle";
// console.log(throttle);
export default {
  name: "TypeNav",
  data() {
    return {
      getIndex: -1,
      show: true,
    };
  },
  mounted() {
    //把请求数据放在app.js中，mounted只会挂载一次，挂载完成去请求数据也是请求一次，
    //而在组件中，每次跳转的时候都要重新挂载，会很好性能
    // this.$store.dispatch("categoryList");
    //跳转到search路由时，mounted会重新渲染，所以判断不为home路由时，三级菜单隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    // changeIndex(index) {
    //   this.getIndex = index;
    // },
    //使用lodash封装的节流函数
    changeIndex: throttle(function (index) {
      this.getIndex = index;
    }, 50),
    // closeIndex() {
    //   this.getIndex = -1;
    // },
    goSearch(event) {
      //使用event获取到触发回调的元素
      let element = event.target;
      //dataset可以获取到自定义属性 并把它们的自定义属性结构出来
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      if (categoryname) {
        //整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        //判断一级二级三级分类
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }

        //合并参数
        //在search组件中，我们只传了params参数，而在TypeNav中，我们只传了query参数，当实际跳转的时候，
        //两者只能存在一个，如果我们需要两种参数的结合体去请求数据，就不能实现，所以我们要合并params和query参数
        if(this.$route.params){
          location.params = this.$route.params
          location.query = query;
        }
        
        this.$router.push(location);
      }
    },
    enterShow() {
      this.show = true;
    },
    leaveShow() {
      this.getIndex = -1;
      //在search路由中，鼠标离开时要隐藏菜单，而home路由不需要
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
  },
};
</script>

<style lang='less' scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 27.5px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }

    //过渡动画的样式
    //开始
    .sort-enter {
      height: 0;
    }
    //结束
    .sort-enter-to {
      height: 462px;
    }
    //过渡动画
    .sort-enter-active {
      transition: all 0.5s linear;
    }
    // .sort-enter-to-active {
    //   transition: all 0.5s linear;
    // }
  }
}
</style>