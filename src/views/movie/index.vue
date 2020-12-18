<template>
  <div id="movie" :class="addclassname">
    <div class="yanshen">
      <div class="biaotou">
        <ul class="herder">
          <li class="dizhi" @click="clickHandel">
            <span>{{ this.id }}</span>
            <van-icon name="arrow-down" />
          </li>
          <li>
            <h4>电影</h4>
          </li>
        </ul>

        <van-tabs v-model="activeName">
          <van-tab title="正在热映" name="a" to="/movie/main"></van-tab>
          <van-tab title="即将上映" name="b" to="/movie/round"></van-tab>
        </van-tabs>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      addclassname: "",
      activeName: "a",
    };
  },
  computed: {},
  watch: {},
  methods: {
    clickHandel() {
      this.$router.push({
        name: "City",
      });
    },
    //     btn_pos:function(){
    //     //滚动条的高度
    //     var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    //     // console.log(scrollTop)
    //   //滚动条的高度>可视区的高度
    //     if(scrollTop>200){
    //          let a = document.querySelector('.biaotou')
    //         a.style.display="block"
    //     }else{
    //          let a = document.querySelector('.biaotou')
    //         a.style.display="none"
    //     }
    // }
  },
  created() {
    // this.$router.push('/movie/main')
    this.id = this.$route.query.id;
    console.log(this.$route.query.cid);
  },

  mounted() {
    // 进入首页显示main内容，否则只能点击后显示
    this.$router.push({ path: "/movie/main", id: this.$route.query.cid });
    window.addEventListener("scroll", this.btn_pos);
  },
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
* {
  margin: 0;
  padding: 0;
}
.yanshen {
  // width: 23.4rem;
  height: 5rem;
  background-color: #fff;
}
.herder {
  width: 23rem;
  height: 2.6rem;
  background-color: #ffffff;
}
li {
  float: left;
}
.dizhi {
  padding: 0.6rem;
}
h4 {
  margin-left: 7rem;
  margin-top: 0.6rem;
}
.biaotou {
  position: fixed;
  top: 0;
}
#movie {
  display: flex;
  // align-items: ;
  justify-content: center;
}
</style>
