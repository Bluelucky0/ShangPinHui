<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 根据是否有searchParams.categoryName来判断是否显示面包屑  分类-->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 根据是否有searchParams.keyword来判断是否显示面包屑  关键字-->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removekeyword">×</i>
            </li>
            <!-- trademark 的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="removetrademark">×</i>
            </li>
            <!-- 平台售卖属性的面包屑 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}
              <i @click="removeAttrValue(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <!-- 在父元素的子标签中使用自定义事件，子给父传值 -->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 动态确定选中样式的显示 -->
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a>
                    综合
                    <!-- 图标  首先根据样式来显示图标  动态判断是显示向上图标还是向下图标-->
                    <span
                      v-show="isOne"
                      class="iconfont"
                      :class="{
                        'icon-arrowTop': isAsc,
                        'icon-xiajiantou': isDesc,
                      }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a>
                    价格
                    <span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{
                        'icon-arrowTop': isAsc,
                        'icon-xiajiantou': isDesc,
                      }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(good, index) in goodsList"
                :key="good.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img :src="good.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>&nbsp;
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :continues="5"
            :total="total"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      searchParams: {
        //一级分类ID
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        //搜索时输入的关键字
        keyword: "",
        //对结果进行排序 1--综合  2--价格  asc--升序  desc--降序
        order: "1:desc",
        //当前第几页
        pageNo: 1,
        //一页展示多少个
        pageSize: 3,
        //平台售卖的属性参数
        props: [],
        //品牌
        trademark: "",
      },
    };
  },
  //在组件挂载之前之前执行一次
  beforeMount() {
    //es6新增语法，和并对象，把后面的对象合并到第一个参数中
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    //挂载完成后先请求一次
    this.getData();
  },
  computed: {
    ...mapGetters(["goodsList"]),
    //判断order中是否是1（综合）
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    //判断order中是否为asc(升序)
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),
  },
  methods: {
    //向服务器发请求获取search数据，在mounted中请求只会发一次，但是我们需要根据不同的参数发多次请求
    //所以把发请求封装为一个函数，需要的时候去调用
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    //点击面包屑后面的取消
    removeCategoryName() {
      //因为面包屑的显示是根据searchParams.categoryName是否存在判断的，当取消面包屑时就应该把searchParams.categoryName删掉，面包屑就会被删掉
      //可以置空，但是考虑到性能，如果置为undefined的话，当发请求时，值为undefined的就不会放到参数里面，所以把它们置为undefined性能会比较好
      this.searchParams.categoryName = undefined;
      //面包屑不显示了之后，要考虑到一级二级三级ID问题，所以也要置为undefined
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      //面包屑删除之后要重新根据参数发送请求
      this.getData();
      //考虑地址栏参数问题 也应该根据参数修改地址栏参数
      //面包屑是query参数，删掉面包屑时，要考虑是否有params参数，有就保留
      if (this.$route.params) {
        //根据路由跳转来修改地址栏信息 ，自己跳自己
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    removekeyword() {
      this.searchParams.keyword = undefined;
      this.getData();
      //使用全局事件总线触发清除输入框的关键字
      this.$bus.$emit("clearKeyword");
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    //接受子组件传过来的参数
    trademarkInfo(trademark) {
      //对参数进行整理，格式为{ID：名字}
      // console.log(trademark);
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getData();
    },
    removetrademark() {
      this.searchParams.trademark = undefined;
      this.getData();
    },
    attrInfo(attr, attrValue) {
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      this.searchParams.props.push(props);
      this.getData();
    },
    removeAttrValue(index) {
      this.searchParams.props.splice(index, 1);
      this.getData();
    },
    changeOrder(flag) {
      //flag为点击时传过来的是综合（1）还是价格（2）
      // let originOrder = this.searchParams.order
      //取出原始的flag
      let originFlag = this.searchParams.order.split(":")[0];
      //取出原始的状态 升序（asc）还是降序(desc)
      let originSort = this.searchParams.order.split(":")[1];
      let newOrder = "";
      //如果传过来的flag和原始的一样，说明点击的是同一个按钮，我们应该改变他的状态，如果不等于说明点击了另外一个按钮
      if (flag == originFlag) {
        //拼接新的order为1：asc这种形式
        newOrder = `${originFlag}:${originSort == "desc" ? "asc" : "desc"}`;
      } else {
        newOrder = `${flag}:${"desc"}`;
      }
      //把新的赋给原来的，并重新发起请求
      this.searchParams.order = newOrder;
      this.getData();
    },
    getPageNo(pageNo) {
      //整理参数，从新发请求
      this.searchParams.pageNo = pageNo;
      this.getData();
    },
  },
  //在mounted或者beforeMounted请求都是只发一次，而我们需要用户每次点击新的，我们都要去发请求获取新的数据
  //那怎么判断什么时候去发新的请求？？  用户每次点击或搜索query或params参数都会在路由中发生改变，所以通过监听$router的变化来判断什么时候发起新的请求
  watch: {
    $route(newValue, oldValue) {
      //在监听$route时，参数合并只在beforeMounted中合并了一次，所以在监听发新的请求时也应该合并参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      //参数发生变化去发请求
      this.getData();
      //每次获取新的参数时，一级二级三级的ID是不确定的，所以在发完请求之后我们应该把上次请求的参数ID置空
      //如第一次我选中的是1ID去发请求，在下次我选中了2ID去发请求，如果ID没有置空，那下次发请求的时候就会有1ID和2ID同时存在
      //其他参数下次选择的时候都会被新的参数覆盖，所以不用置空
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>