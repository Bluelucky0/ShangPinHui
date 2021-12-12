<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <!-- 判断1和...的显示与隐藏
    当startPageAndEndPage的开始页大于1 的时候再让1按钮显示，其他就隐藏，下面同理
     -->
    <button
      v-if="startPageAndEndPage.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>

    <button v-if="startPageAndEndPage.start > 2">···</button>

    <!-- 一个坑：在同一个元素上不能同时使用v-for和v-if，因为有优先级问题
    v-for的优先级大于v-if，会先遍历然后进行v-if显示隐藏，判断的时候已经遍历完了都存在，所以所有的元素都会被隐藏掉
    在逻辑上不符

    先遍历startPageAndEndPage的结束页大小会从1开始遍历，但是我们只需要从大于startPageAndEndPage开始页开始，所以其他隐藏
     -->
    <button
      v-for="(page, index) in startPageAndEndPage.end"
      :key="index"
      v-show="page >= startPageAndEndPage.start"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <button v-if="startPageAndEndPage.end < totalPage - 1">···</button>
    <button
      v-if="startPageAndEndPage.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "continues", "total"],
  computed: {
    //根据数据计算总共有多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    //分页器中间连续分页的开始页和结束页
    startPageAndEndPage() {
      //解构
      const { continues, pageNo, totalPage } = this;
      let start = 0,
        end = 0;
      //如果连续的分页数大于总共的页数，就让起始页为1，结束页为totalPage
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        //else说明连续的分页数小于总共的页数，起始页为当前页数减去连续页数除2的取整
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        //对上面的起始页和结束页进行纠正  两个极端
        //当计算出来的起始页小于1时，就让起始页为1，结束页为连续页的大小
        if (start < 1) {
          start = 1;
          end = continues;
        }
        //当计算出来的结束页大于总页数时，就让结束页为总共页数的大小，开始页为总共页数减去连续页数的大小加1
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }
      return { start, end };
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>