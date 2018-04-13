import PGLoading from "./loading.vue";

const Loading = {
  install: function(Vue){
    Vue.component("Loading",PGLoading);
  }
};

export default Loading;