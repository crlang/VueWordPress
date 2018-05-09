import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    title: '',
    footer: false,
    userToken: ''
  },
  mutations: {
    newTitle(state,msg) {
      state.title = msg;
    },
    showFooter(state,msg) {
      state.footer = msg;
    },
    setUserToken(state,token) {
      state.userToken = token;
    }
  }
});

export default store;