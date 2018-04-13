import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    title: '',
    footer: false
  },
  mutations: {
    newTitle(state,msg) {
      state.title = msg;
    },
    showFooter(state,msg) {
      state.footer = msg;
    }
  }
});

export default store;