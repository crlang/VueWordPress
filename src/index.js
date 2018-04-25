import Vue from "vue";
import axios from 'axios';
import App from "./app.vue";
import store from "./store/index.js";



/*----------------------------------------
----------------  router  ----------------
----------------------------------------*/
import router from './utils/routers.js';
Vue.use(router);
/* router end */



/*----------------------------------------
-------  register global function  -------
----------------------------------------*/
import Functions from './utils/utils.js';
Vue.use(Functions);// Register global functions as plugins
/* register global function end */



/*----------------------------------------
-------------  style assets  -------------
----------------------------------------*/
import "./assets/css/reset.css";
import "./assets/fonts/iconfont.css";
import "./assets/css/weui.css";
import "./assets/css/style.scss";
/* style assets end */



/*----------------------------------------
----------  Vue Awesome Swiper  ----------
----------------------------------------*/
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)
/* Vue Awesome Swiper end */



/*----------------------------------------
--------------  debug mode  --------------
----------------------------------------*/
Vue.config.productionTip = true;
/* debug mode end */



/*----------------------------------------
-------------  axios config  -------------
----------------------------------------*/
/* eslint-disable no-new */
axios.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
/* axios config end */



/*----------------------------------------
---------------  new  vue  ---------------
----------------------------------------*/
new Vue({
  el: '#app',
  router: router,
  store: store,
  components: { App },
  template: '<App/>'
});