<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handle"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["skuImageList"],
  data() {
    return {
      currentIndex: 0,
    };
  },
  computed: {
    //子接收到父传过来的值，也是当数据还没回来的时候，skuImageList[0]对象是一个undefined，取属性值也会报错
    //控制台的报错不会影响程序的运行，但是控制台会报红
    //所以我们需要对skuImageList[0]对象进行加工，至少保证他是一个空对象
    imgObj() {
      return this.skuImageList[this.currentIndex] || {};
    },
  },
  mounted() {
    this.$bus.$on("getIndex", (index) => {
      this.currentIndex = index;
    });
  },
  methods: {
    handle(event) {
      //通过ref获取元素
      let mask = this.$refs.mask;
      let big = this.$refs.big;
      //计算出偏移量
      let left = event.offsetX - mask.offsetWidth / 2;
      let top = event.offsetY - mask.offsetHeight / 2;
      //范围遮罩层的约束
      if (left < 0) left = 0;
      if (left >= mask.offsetWidth) left = mask.offsetWidth;
      if (top < 0) top = 0;
      if (top >= mask.offsetHeight) top = mask.offsetHeight;
      //遮罩和大图通过计算出的偏移量来移动
      mask.style.left = left + "px";
      mask.style.top = top + "px";
      big.style.left = -2 * left + "px";
      big.style.top = -2 * top + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>