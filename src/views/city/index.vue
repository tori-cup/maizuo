<template>
  <div>
    <div class="biaotou">
      <ul class="herder">
        <li @click="clickHandel">
          <van-icon class="cha" name="cross" size="1.5rem" />
        </li>
        <li>
          <h4>当前城市</h4>
        </li>
      </ul>
    </div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <div class="remen0">
      <p class="remen">热门城市</p>
      <ul class="remenul">
        <li><button>北京</button></li>
        <li><button>上海</button></li>
        <li><button>郑州</button></li>
        <li><button>南京</button></li>
      </ul>
    </div>
    <van-index-bar v-for="item in list" :key="item.cityId">
      <van-index-anchor  />
      <van-cell @click="id(item.name)" :title=item.name />
    </van-index-bar>
  </div>
</template>

<script>
import { Toast } from 'vant';
import axios from 'axios';

export default {
  data() {
    return {
      value:'',
      cityList: [],
    };
    list:[]
  },
  created(){
    axios({
      url:
        "https://m.maizuo.com/gateway?k=1004439",
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"16079328292105148155363329"}',
        "X-Host": "mall.film-ticket.city.list",
      },
    }).then((res) => {
      this.cityList = res.data.data.cities;
        // console.log(this.cityList)
    });
  },
  methods: {
    clickHandel() {
      this.$router.go(-1);
    },
    onSearch(val) {
      Toast(val);
    },
    onCancel() {
      Toast('取消');
    },
    id(id){
      this.$router.push({
        name:'Movie',
        query:{id}
      })
    }
  },
  computed:{
    list(){
      return this.cityList.filter(
        (item)=>item.name.indexOf(this.value)>-1)
    }
  }
};
</script>

<style scoped>
.biaotou {
  width: 23rem;
  height: 2.5rem;
  /* background-color: rgb(236, 185, 185); */
}
.herder li {
  float: left;
}
.cha {
  padding: 0.3rem;
}
h4 {
  margin-left: 7rem;
  margin-top: 0.5rem;
}
.remen0{
  width: 23.rem;
  height: 8rem;
}
.remen{
  font-size: 0.8rem;
  color: #666;
  margin-left: 1rem;
}
.remenul li{
  float: left;
  width: 5rem;
  margin-top: 1rem;
  margin-left: 2rem;
}
.remenul li button{
  width: 4rem;
  height: 1.5rem;
}
</style>