import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Vant from "vant";
import "vant/lib/index.css";

import "../public/css/iconfont/iconfont.css";
import "../public/css/common.css";
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";
Vue.use(MintUI);
//vant卡片组件
import { Card } from "vant";
Vue.use(Card);
//vant navbar组件
import { NavBar } from "vant";
Vue.use(NavBar);
//滑动单元格
import { SwipeCell } from "vant";
Vue.use(SwipeCell);
//购物车组件，数量组件
import { Stepper } from "vant";
Vue.use(Stepper);
//提交订单按钮
import { SubmitBar } from "vant";
Vue.use(SubmitBar);
//全选框，复选框组件
import { Checkbox, CheckboxGroup } from "vant";
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
import axios from "axios";
Vue.prototype.$http = axios;

Vue.use(Vant);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
