<template>
  <div id="myinfo">
    <div id="content1" v-if="hasLogin">
      <!-- 头像 -->
      <div id="bgimg" v-for="item in userlist" :key="item._id">
        <van-image id="bgs" round :src="item.imgurl" /><!-- :src="" -->
        <div id="status">用户名：{{ username }}</div>
      </div>
    </div>
    <ul id="movies">
      <router-link tag="li" class="list" to="lists/carlist"
        >商品订单</router-link
      >
      <router-link tag="li" class="list" to="lists/movielist"
        >电影订单</router-link
      >
    </ul>
    <div id="content2" v-if="hasLogin">
      <van-cell @click="editlogin" is-link>
        <div></div>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">修改昵称</span>
          <span class="custom-title"></span>
        </template>
      </van-cell>

      <!-- 卖座券-->
      <van-cell is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">优惠券</span>
        </template>
      </van-cell>
      <!-- 组合红包 -->
      <van-cell is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">组合红包</span>
        </template>
      </van-cell>
      <van-cell is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">余额</span>
        </template>
      </van-cell>
      <!-- 设置 -->
      <van-cell is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">设置</span>
        </template>
      </van-cell>
      <!-- 分割线 -->
      <van-cell @click.native="loginout" is-link to="/my/login">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">退出登陆</span>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import Three from "@/components/cinemathree2.vue";
// Token
import { getToken, setToken, removeToken } from "../../../util/cookie";

// import { Toast } from 'vant';

import { Toast, MessageBox } from "mint-ui";
export default {
  data() {
    return {
      hasLogin: getToken() || "",
      username: "",
      classList: "",

      userlist: [],
      //       page: 1,
      //       pagesize: 6,
      //       loading: false,
      //       showmore: false,
      //       showloading: false,
      //       loading: false,
      base_url: "http://localhost:8888/",
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 头像显示
    getuserlist() {
      var username = this.username;
      this.$http
        .get(`http://localhost:8888/users?`, {
          params: { username },
        })
        .then((res) => {
          console.log(res);
          var list = res.data.list;
          list.forEach((item) => {
            item.imgurl = this.base_url + item.imgurl;
          });
          this.userlist = this.userlist.concat(list);
          console.log(this.userlist);
          // if (list.length < this.pagesize) {
          //   //没有更多数据了,也就是说最后一页
          //   this.loading = true;
          //   this.showmore = true; //最后一页要显示没有数据样子
          // } else {
          //   this.page = this.page + 1; //有数据page+1可以上拉继续加载下一页
          //   this.loading = false; //还有数据那么开关要设成false
          // }
        });
    },

    // 修改
    editlogin() {
      this.$messagebox({
        $type: "prompt", // 弹窗类型
        title: "修改用户名称", // 弹窗标题
        message: "修改", // 弹窗内容
        showInput: true, // 是否显示输入框
        showCancelButton: true, // 是否显示取消按钮
        showConfirmButton: true, // 是否显示确定按钮
        confirmButtonText: "提交", // 确认按钮的文本
        inputValue: this.username, // 输入框的值
      }).then(({ value, action }) => {
        // 将新的输入框里的值更新到cookie，并调用展示
        document.cookie = `username=${value}`;
        this.showUsername();
      });
    },
    // 展示用户名
    showUsername() {
      if (this.hasLogin) {
        // 判断已经登录，取到cookie转为数组，循环
        var arr = document.cookie.split(";");
        for (let i = 0; i < arr.length; i++) {
          var newarr = arr[i].split("=");
          // 不知为何 修改昵称后 'username'变为' username'
          if (newarr[0] === "username") {
            this.username = newarr[1];
          } else if (newarr[0] === " username") {
            this.username = newarr[1];
          }
        }
      } else {
        console.log(2);
      }
    },
    // 注销
    loginout() {
      removeToken();
      this.hasLogin = "";
      this.username = "";
      this.password = "";
      // 点击退出 切换登录状态为'未登录'
      this.$store.commit("edit");
    },
  },
  created() {
    this.showUsername();
    this.getuserlist();
    // this.username = this.$route.query.username;
  },
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  components: {
    Three,
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 50px;
  height: 50px;
  border: 1px solid #000;
}
#bgimg {
  background: url("../../../assets/01.png");
  background-size: cover;
  position: relative;
  height: 100px;
  width: 100%;
}
#bgs {
  width: 50px;
  height: 50px;
  border: 1px solid red;
  border-radius: 50%;
  position: absolute;
  left: 20px;
  top: 20%;
}
#status {
  margin-left: 25%;
  position: absolute;
  bottom: 35px;
}
#movies {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-around;
  background-color: #ffffff;
  padding: 20px 0;
  box-sizing: border-box;
  ::v-deep.list {
    color: red;
    border-radius: 3px;
    border: 1px solid red;
    font-size: 18px;
    width: 80;
    height: 30px;
    text-align: center;
    line-height: 30px;
  }
  border-bottom: 0.5px solid #cecece;
}
</style>
