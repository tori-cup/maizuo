<template>
  <div class="movielists">
    <van-nav-bar
      title="商品订单"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- <div id="movi">电影订单</div> -->
    <van-swipe-cell>
      <!-- <template #right>
        <van-button square type="danger" text="删除" />
      </template> -->

      <div class="mvlist">
        <van-card
          num="2"
          price="2.00"
          desc="描述信息"
          title="商品标题"
          thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
        >
          <template #tags>
            <van-tag plain type="danger">标签</van-tag>
            <van-tag plain type="danger">标签</van-tag>
          </template>
          <template #footer>
            <van-button size="mini">删除</van-button>
            <van-button size="mini">按钮</van-button>
          </template>
        </van-card>
      </div>
      <template #right>
        <van-button square type="danger" text="删除" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    onClickLeft() {
      //   Toast("返回");
      this.$router.push({
        path: "/my/info",
      });
    },
  },
  created() {},
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  components: {},
};
</script>

<style lang="scss" scoped>
// #movi {
//   //   position: fixed;
//   //   top: 0;
//   width: 100%;
//   height: 50px;
//   background-color: red;
//   text-align: center;
//   line-height: 50px;
// }
.van-button {
  height: 100%;
}
</style>
