<template>
  <div class="login">
    <div class="wrap">
      login page
    </div>
  </div>
</template>

<script>
import { apiUrl } from "../../utils/api.js";

export default {
  data() {
    return {
      userData: []
    };
  },
  mounted () {
    this.showPGConfig();
    this.submitLogin();
  },
  methods: {
    // site config
    showPGConfig(){
      this.$store.commit('newTitle', this.APLang.login);// page title
      this.$store.commit('showFooter', false);// footer if show
    },

    submitLogin() {
    }
  }
};
</script>
