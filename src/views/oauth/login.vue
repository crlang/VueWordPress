<template>
  <div class="login">
    <div class="wrap">
      <form @submit.prevent="submitLogin" id="login">
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">{{Tran_user}}</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="text" v-model="userData.username" :placeholder="Tran_username" autocomplete="username"/>
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">{{Tran_pwd}}</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="password" v-model="userData.password" :placeholder="Tran_password" autocomplete="current-password"/>
          </div>
        </div>
        <div class="weui-cell weui-cell_switch">
          <div class="weui-cell__bd">{{Tran_autoLogin}}</div>
          <div class="weui-cell__ft">
            <input class="weui-switch" type="checkbox"/>
          </div>
        </div>
        <router-link class="weui-cells__tips" :to="'/register'">{{Tran_noneAccount}}</router-link>
      </div>
      <div class="weui-btn-area">
        <button type="submit" class="weui-btn weui-btn_primary">{{Tran_login}}</button>
      </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.weui-cell {
  padding: 10px 0;
}
.weui-cell:before {
  left: 0;
}
.weui-btn {
  padding: 0 14px;
}
input.weui-input {
  width: 100%;
  border: 0;
  outline: 0;
  -webkit-appearance: none;
  background-color: transparent;
  font-size: inherit;
  color: inherit;
  height: 1.47058824em;
  line-height: 1.47058824;
}
</style>

<script>
import { WPBlogSiteUrl } from "../../utils/api.js";
import axios from "axios";

export default {
  data() {
    return {
      userData: [],
      userInfo: [],
      userToken: '',
      Tran_username: this.APLang.forms.username,
      Tran_password: this.APLang.forms.password,
      Tran_autoLogin: this.APLang.msg.autoLogin,
      Tran_noneAccount: this.APLang.msg.noneAccount,
      Tran_login: this.APLang.login,
      Tran_user: this.APLang.forms.form.username,
      Tran_pwd: this.APLang.forms.form.userpassword
    };
  },
  mounted () {
    this.showPGConfig();
    this.checkLogin();
  },
  methods: {
    // site config
    showPGConfig(){
      this.$store.commit('newTitle', this.APLang.login);// page title
      this.$store.commit('showFooter', false);// footer if show
    },

    // Login and Exchange Authentication
    // post -> siteURL + /wp-json/jwt-auth/v1/token
    /*
     * username: *user name
     * password: *user password
    */
    submitLogin() {
      let self = this;
      self.checkLogin();

      if (!self.userData.username || !self.userData.password) {
        self.weui.topTips(self.APLang.msg.emptyInput,800);
        return false;
      }

      axios.post(WPBlogSiteUrl + "/wp-json/jwt-auth/v1/token",{
        username: self.userData.username,
        password: self.userData.password
      }).then(res => {
        if(res.data.token) {
          sessionStorage.setItem("userToken", res.data.token);
        }
        self.weui.confirm(self.APLang.msg.loginSuccess,{
          buttons: [{
            label: self.APLang.popAction.return,
            type: 'primary',
            onClick: function(){
              self.$router.push("/member");
              window.location.reload();
            }
          }]
        });
      }).catch(err => {
        self.responseError(err);
        self.weui.loading().hide();
      });
    }
  }
};
</script>
