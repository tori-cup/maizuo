<template>
  <div id="main">
    <ul class="kapian" v-for="item in showlist" :key="item.filmId">
      <li @click="clickHandel" class="tupian">
        <img :src="item.poster" alt="" />
      </li>
      <li @click="clickHandel" class="wenzi">
        <h4>{{ item.name }}</h4>
        <p class="zhuyan">
          主演：<span v-for="item in item.actors" :key="item.id">{{
            item.name
          }}</span>
        </p>
        <p>
          上映日期：<span>{{ item.premiereAt | formatDate }}</span>
        </p>
      </li>
      <li class="goumai">
        <button>预约</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Film",
  data() {
    return {
      activeName: "first",
      looplist: "",
      hotlist: "",
      showlist: "",
    };
  },
  filters: {
    formatDate: function(value) {
      let week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      let date = new Date(Number(value) * 1000);
      // let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      // let h = date.getHours();
      // h = h < 10 ? ('0' + h) : h;
      // let m = date.getMinutes();
      // m = m < 10 ? ('0' + m) : m;
      // let s = date.getSeconds();
      // s = s < 10 ? ('0' + s) : s;
      let w = week[date.getDay()];
      return w + "" + MM + "月" + d + "日";
      // return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s+'-'+w;
    },
  },
  created() {
    /* axios({
        url: "https://m.maizuo.com/gateway?cityId=410100&pageNum=1&pageSize=10&type=1&k=2325598",
        headers: {
          "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"15610855429195524981146"}',
          "X-Host": "mall.cfg.common-banner",
        },
      }).then((res) => {
        this.looplist=res.data.data
      }); */
    axios({
      url:
        "https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=2&k=5915652",
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606908525779884456574977"}',
        "X-Host": "mall.film-ticket.film.list",
      },
    }).then((res) => {
      // console.log(res.data.data.films);
      this.showlist = res.data.data.films;
    });
  },

  //  mounted() {
  //   window.addEventListener('scroll',this.handleScroll,true)
  // },
  methods: {
    // handleScroll(){
    //     let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    //     console.log(scrollTop);
    //   }
    clickHandel(id) {
      console.log(id);
      this.$router.push({
        path: "movie/detail",
        query: { id: id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.kapian {
  width: 100%;
  min-height: 2rem;
  margin-left: 1rem;
  margin: 0.5rem auto;
  // background: yellow;
  border-bottom: solid 1px rgb(204, 202, 202);
}
.kapian li {
  float: left;
}
.tupian img {
  width: 5rem;
}
.wenzi {
  margin-top: 0.5rem;
  width: 14.315rem;
  margin-left: 0.5rem;
}
.zhuyan {
  margin-top: 2rem;
  width: 14rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.goumai button {
  margin-top: 2.8rem;
  color: #ff5f16;
  background-color: #fff;
  border: solid 1px #ff5f16;
}
</style>
