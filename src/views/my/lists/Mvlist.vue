<template>
  <div class="movielists">
    <van-nav-bar
      title="电影订单"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <!-- <div id="movi">电影订单</div> -->

    <van-swipe-cell v-for="(item, index) in list" :key="index">
      <!-- 复选框 -->
      <van-checkbox-group v-model="item.checked" ref="checkboxGroup">
        <van-checkbox name="a" @click="getPrice(item, index)"
          >复选框</van-checkbox
        >
      </van-checkbox-group>

      <div class="mvlist">
        <van-card
          num="2"
          :price="item.runtime"
          :desc="'描述信息:' + item.synopsis"
          :title="'电影名称：' + item.name"
          :thumb="item.poster"
        >
          <template #tags>
            <van-tag plain type="danger">{{ item.category }}</van-tag>
            <van-tag plain type="danger">{{ item.grade }}</van-tag>
          </template>
          <!-- 加减商品 -->
          <template #footer>
            <!-- <van-stepper v-bind:value="value[index]" />
             -->
            <van-stepper v-model="item.value" />
            <!-- 单价 -->
            <p ref="pprice">{{ "单价：" + item.value * item.runtime }}</p>
            <!-- <p>{{ prices }}</p> -->
          </template>
        </van-card>
      </div>
      <template #right>
        <van-button square type="danger" text="删除" />
      </template>
    </van-swipe-cell>

    <!-- submiBar组件,总价 -->

    <!-- <van-submit-bar
      disabled
      :price="Totalprice * 100"
      button-text="提交订单"
      tip="你的收货地址不支持同城送, 我们已为你推荐快递"
      tip-icon="info-o"
    /> -->
    <van-submit-bar :price="Totalprice * 100" button-text="提交订单">
      <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
      <!-- <van-button type="info" @click="toggleAll">反选</van-button> -->
      <template #tip>
        你的收货地址不支持同城送,
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      prices: "",
      checked: false,
    };
  },
  computed: {
    //   计算总价
    // Totalprice() {
    //   var total = 0;
    //   for (var i = 0; i < this.list.length; i++) {
    //     total += Number(this.list[i].runtime * this.list[i].value);
    //   }
    //   return total;
    // },
    Totalprice() {
      var total = 0;
      for (var i = 0; i < this.list.length; i++) {
        // console.log(this.list[i].isSale);
        if (this.list[i].isSale == true) {
          // var item = this.list[i];
          // total += Number(item.value * item.runtime);
          // console.log(this.list[i].runtime);

          total += Number(this.list[i].runtime * this.list[i].value);
        }
      }
      console.log(total);
      return total;
    },
  },
  watch: {},
  methods: {
    onClickLeft() {
      // 返回上一级

      this.$router.push({
        path: "/my/info",
      });
    },
    //订单模块
    getList() {
      this.$http({
        //从后台取数据
        url:
          "https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=4082960",

        headers: {
          "X-Client-Info":
            '{"a": "3000","ch": "1002","v": "5.0.4","e": "16079319472103103750930433","bc": "410100"}',

          "X-Host": "mall.film-ticket.film.list",
        },
      }).then((res) => {
        this.list = res.data.data.films;
        for (var i in res.data.data.films) {
          //   console.log(res.data.data.films[i].runtime);
        }
      });
    },

    //单选计算价格
    // getPrice(item, index) {
    //   console.log(this.$refs.pprice[index]);
    //   console.log(item, index);
    //   this.list.forEach((items, idx) => {
    //     if (idx == index) {
    //       this.list[idx].isSale = !this.list[idx].isSale;
    //       var prices = items.value * items.runtime;
    //       this.prices = prices;
    //       console.log(this.prices);
    //     }
    //     // console.log(event.target.checked);
    //     // for (var i = 0; i < items.isSale.length; i++) {
    //     //   console.log(item.isSale.length);
    //     // }
    //   });

    // },

    //单选
    getPrice(item, index) {
      if (this.list[index].isSale === false) {
        this.list[index].isSale = true;
      } else {
        this.list[index].isSale = false;
        // this.isAllChecked = false;
      }
    },

    //全选计算总价
    checkAll() {
      // console.log(this.list.isSale);
      // console.log(this.list);
      // this.$refs.checkboxGroup.toggleAll(true);
      console.log(11);
      this.list.forEach((items, idx) => {
        console.log(this.list[idx].isSale);
        this.list[idx].isSale = true;
      });
    },
    //反选
    // toggleAll() {
    //   this.$refs.checkboxGroup.toggleAll();
    // },
  },
  created() {
    this.getList();
  },
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
.van-button {
  height: 100%;
}
</style>
