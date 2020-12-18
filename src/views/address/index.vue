<template>
  <div class="address">
    <van-sticky :offset-top="0">
      <van-nav-bar
        :title="name"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
    <van-tabs>
      <van-tab
        v-for="index in week"
        :key="index.showDate"
        :title="index.showDate | formatDate"
      >
        <div class="cinema-list-wrap">
          <ul class="cinema-list">
            <li
              class="cinema-list-item"
              v-for="item in address"
              :key="item.cinemaId"
            >
              <div class="cinema-info-lf">
                <span class="cinema-name">{{ item.name }}</span>
                <span class="cinema-address">{{ item.address }}</span>
              </div>
              <div class="cinema-info-rt">
                <div>
                  <span class="cinema-lowPrice price-fmt">
                    <i>￥</i>
                    <span class="interge">{{ item.lowPrice / 100 }}</span>
                    <span style="display:none">.</span>
                    <span class="decimal" style="font-size:10px;display:none"
                      >00</span
                    >
                  </span>
                  <span class="upon">起</span>
                </div>
                <span class="cinema-gpsAddress"></span>
              </div>
            </li>
          </ul>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Address",
  data() {
    return {
      week: [],
      name: "",
      address: [],
    };
  },
  filters: {
    formatDate: function(value) {
      let week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      let date = new Date(Number(value) * 1000);
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let w = week[date.getDay()];
      return w + "" + MM + "月" + d + "日";
    },
  },
  created() {
    this.name = this.$route.query.title;
    axios({
      url: `https://m.maizuo.com/gateway/?filmId=${this.$route.query.id}&cityId=410100&k=7438915`,
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606908525779884456574977","bc":"410100"}',
        "X-Host": "mall.film-ticket.cinema.film-show-cinema",
      },
    }).then((res) => {
      this.week = res.data.data.showCinemas;
    });
    axios({
      url: `https://m.maizuo.com/gateway?cityId=${this.$route.query.cid}&ticketFlag=1&k=9213403`,
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606908525779884456574977","bc":"410100"}',
        "X-Host": "mall.film-ticket.cinema.list",
      },
    }).then((res) => {
      this.address = res.data.data.cinemas;
    });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.cinema-list-wrap {
  padding-bottom: 49px;
  z-index: 100;
  .cinema-list {
    list-style: none;
    padding: 0;
    margin: 0;
    .cinema-list-item {
      position: relative;
      background-color: #fff;
      padding: 15px;
      .cinema-info-lf {
        width: 80%;
        // height: 75px;
        text-align: left;
        padding-right: 15px;
        // float: left;
        .cinema-name {
          // float: left;
          height: 20px;
          color: #191a1b;
          font-size: 15px;
          float: left;
        }
        .cinema-address {
          float: left;
          color: #797d82;
          font-size: 12px;
          margin-top: 5px;
          display: block;
          max-width: 80%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .cinema-info-rt {
        width: 70px;
        margin-top: -40px;
        text-align: center;
        float: right;
        margin-right: -5px;
        .price-fmt {
          font-size: 15px;
          color: #ff5f16;
          height: 0 !important;
          display: inline-table !important;
          i {
            font-size: 11px;
            font-style: normal;
          }
          .interge {
            font-size: 15px;
          }
        }
        .upon {
          color: #ff5f16;
          font-size: 10px;
        }
      }
    }
  }
}
.cinema-info-lf,
.cinema-address span {
  display: block;
  max-width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.price-fmt span {
  float: none !important;
}
.cinema-gpsAddress {
  display: block;
  font-size: 11px;
  color: #797d82;
  margin-top: 5px;
}
</style>
