<template>
  <div class="detail">
    <van-sticky :offset-top="0">
      <van-nav-bar
        :title="info.name"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
    <div class="content">
      <div class="banner">
        <img :src="info.poster" alt="" />
      </div>
      <div class="film-detail">
        <div class="film-tile">
          <div class="title">
            <span class="film-name">{{ info.name }}</span>
            <span class="filmType">{{ name }}</span>
          </div>
          <div class="film-grade">
            <span class="grade">{{ info.grade }}</span>
            <span class="grade-title">分</span>
          </div>
        </div>
        <div class="film-category">{{ info.category }}</div>
        <div class="film-premiereAt">
          {{ info.premiereAt | formatDate }}上映
        </div>
        <div class="film-runtime">
          {{ info.nation }} | {{ info.runtime }}分钟
        </div>
        <van-collapse v-model="activeNames">
          <van-collapse-item :title="txt" name="1"
            ><div>{{ txtcontent }}</div></van-collapse-item
          >
        </van-collapse>
      </div>
      <div class="line"></div>
      <div class="film-actors">
        <div class="actors">
          <span class="actors-name">演职人员</span>
        </div>
        <div class="actors-list">
          <ul>
            <li
              v-for="(i, index) in info.actors"
              :key="index"
              style="width: 85px; min-width: 85px;"
            >
              <dl>
                <dt><img :src="i.avatarAddress" alt="" /></dt>
                <dd style="margin-top:5px">{{ i.name }}</dd>
                <dd class="duty">{{ i.role }}</dd>
              </dl>
            </li>
          </ul>
        </div>
      </div>
      <div class="line"></div>
      <div class="photos">
        <div class="photos-name">
          <span class="photos-title">剧照</span>
          <span class="photos-all">全部(5)</span>
        </div>
        <div class="photos-list">
          <ul>
            <li v-for="(i, index) in info.photos" :key="index">
              <img :src="i" alt="" />
              <div class="demo-image__preview"></div>
            </li>
          </ul>
        </div>
      </div>
      <router-link
        :to="{
          name: 'Address',
          query: {
            id: info.filmId,
            title: info.name,
            cid: this.$route.query.cid,
          },
        }"
      >
        <div class="goSchedule">选座购票</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Deatil",
  data() {
    return {
      info: "",
      name: "",
      txt: "",
      txtcontent: "",
      activeNames: [],
      /* srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
      ], */
    };
  },
  filters: {
    formatDate: function(value) {
      let date = new Date(Number(value) * 1000);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + MM + "-" + d;
    },
  },
  created() {
    axios({
      url: `https://m.maizuo.com/gateway?filmId=${this.$route.query.id}`,
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606908525779884456574977","bc":"410100"}',
        "X-Host": "mall.film-ticket.film.info",
      },
    }).then((res) => {
      // console.log(res.data.data.film);
      this.txt = res.data.data.film.synopsis.substring(0, 48);
      this.txtcontent = res.data.data.film.synopsis.substring(48);
      this.info = res.data.data.film;
      this.srcList = res.data.data.film.photos;
      // console.log(this.srcList);
      this.name = res.data.data.film.filmType.name;
    });
  },
  methods: {
    /* goback() {
      this.$router.go(-1);
    }, */
    onClickLeft() {
      this.$router.go(-1);
    },
    /* getImg(index) {
      ImagePreview({
        images: this.srcList, // 预览图片的那个数组
        showIndex: true,
        loop: false,
        startPosition: index, // 指明预览第几张图
      });
    }, */
  },
};
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
}
* {
  margin: 0;
  padding: 0;
}
ul li {
  list-style: none;
}
.banner {
  width: 100%;
  height: 232px;
  overflow: hidden;
  position: relative;
}
.banner img {
  width: 100%;
  position: absolute;
  top: -70%;
}
.film-detail {
  padding: 15px;
  padding-top: 12px;
}
.goback {
  width: 96%;
  height: 40px;
  position: absolute;
}
.goback img {
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 1;
  background-color: silver;
  border-radius: 50%;
  opacity: 0.5;
}
.film-tile {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.title {
  width: 256px;
}
.film-name {
  color: #191a1b;
  font-size: 18px;
  height: 24px;
  line-height: 24px;
  margin-right: 7px;
}
.filmType {
  font-size: 9px;
  color: #fff;
  background-color: #d2d6dc;
  height: 14px;
  line-height: 14px;
  padding: 0 2px;
  border-radius: 2px;
  display: inline-block;
}
.film-grade {
  width: calc(100% - 250px);
  text-align: right;
  color: #ffb232;
}
.grade {
  font-size: 18px;
  font-style: italic;
}
.grade-title {
  font-size: 10px;
}
.film-category {
  font-size: 13px;
  color: #797d82;
  margin-top: 4px;
}
.film-premiereAt {
  font-size: 13px;
  color: #797d82;
  margin-top: 4px;
}
.film-runtime {
  font-size: 13px;
  color: #797d82;
  margin-top: 4px;
  margin-bottom: 10px;
}

.line {
  height: 10px;
  margin-top: 10px;
  background-color: #f4f4f4;
}
.actors {
  padding: 15px;
}
.actors-name {
  font-size: 16px;
  text-align: left;
  color: #191a1b;
  display: inline-block;
  height: 22.5px;
  line-height: 22px;
}
.actors-list {
  overflow-x: auto;
  overflow-y: hidden;
}
.actors-list ul {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  width: 100%;
}
.actors-list li dl {
  text-align: center;
  padding-left: 5px;
}
.actors-list li dt img {
  width: 100%;
}
li dl dd {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
.photos {
  margin-top: 10px;
}
.photos-name {
  height: 32px;
  display: flex;
  justify-content: space-between;
}
.photos-list {
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
}
.photos-list ul {
  display: flex;
  /* flex: 1;
  overflow-x: auto;
  overflow-y: hidden; */
}
.photos-list ul li {
  min-width: 150px;
  height: 100px;
  margin-right: 10px;
}
.photos-list ul li {
  margin-bottom: 60px;
}
.photos-list ul li img {
  width: 100%;
  height: 100%;
  margin-bottom: 30px;
}

.goSchedule {
  z-index: 99;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 49px;
  width: 100%;
  text-align: center;
  background-color: #ff5f16;
  color: #fff;
  font-size: 16px;
  line-height: 49px;
}
</style>
