import Vue from "vue";
import axios from 'axios';
import App from "./app.vue";
import store from "./store/index.js";


/*----------------------------------------
-----------------  weui  -----------------
----------------------------------------*/
import weui from "./assets/js/weui.min.js";
import "./assets/css/weui.min.css";
/* weui end */




/*----------------------------------------
----------------  router  ----------------
----------------------------------------*/
import router from './utils/routers.js';
Vue.use(router);
/* router end */



/*----------------------------------------
-----------  register loading  -----------
----------------------------------------*/
import Loading from "./compoments/loading/index.js";
Vue.use(Loading);
/* register loading end */



/*----------------------------------------
-------  register global function  -------
----------------------------------------*/
import Functions from './utils/utils.js';//引用
Vue.use(Functions);//将全局函数当做插件来进行注册
/* register global function end */



/*----------------------------------------
-------------  style assets  -------------
----------------------------------------*/
import "./assets/css/reset.css";
import "./assets/fonts/iconfont.css";
import "./assets/css/style.scss";



/*----------------------------------------
--------------  debug mode  --------------
----------------------------------------*/
Vue.config.productionTip = true;



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