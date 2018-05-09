<template>
  <div class="register">
    <div class="wrap">
      <form @submit.prevent="submitRegister" id="register">
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">{{Tran_user}}</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="text" v-model="userData.username" :placeholder="Tran_username"/>
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">{{Tran_mail}}</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="text" v-model="userData.email" :placeholder="Tran_email" autocomplete="email"/>
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">{{Tran_pwd}}</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="password" v-model="userData.password" :placeholder="Tran_password" autocomplete="current-password"/>
          </div>
        </div>
        <router-link class="weui-cells__tips" :to="'/login'">{{Tran_haveAccount}}</router-link>
      </div>
      <div class="weui-btn-area">
        <button type="submit" class="weui-btn weui-btn_primary">{{Tran_register}}</button>
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
import { WPBlogSiteUrl,apiUrl } from "../../utils/api.js";
import axios from "axios";

export default {
  data() {
    return {
      userData: [],
      curUserToken: '',
      Tran_username: this.APLang.forms.username,
      Tran_email: this.APLang.forms.email,
      Tran_password: this.APLang.forms.password,
      Tran_register: this.APLang.register,
      Tran_user: this.APLang.forms.form.username,
      Tran_mail: this.APLang.forms.form.useremail,
      Tran_pwd: this.APLang.forms.form.userpassword,
      Tran_haveAccount: this.APLang.msg.haveAccount
    };
  },
  mounted: function() {
    this.showPGConfig();
    this.getLoginStatus();
  },
  methods: {
    showPGConfig(){
      this.$store.commit('newTitle', this.APLang.register);// page title
      this.$store.commit('showFooter', false);// footer if show
    },

    // If not logged in, return to login
    getLoginStatus() {
      let self = this;
      if (!sessionStorage.getItem("userToken")) {
        self.weui.confirm(self.APLang.msg.registerTip,{
          title: self.APLang.msg.registerFail,
          buttons: [{
            label: self.APLang.popAction.ok,
            type: 'primary',
            onClick: function(){
              self.$router.push("/login");
            }
          }]
        });
        return false;
      }
    },

    // add new user [Not registered]
    // post -> users
    /*
     * username: *user name
     * password: *user password
    */
    submitRegister() {
      let self = this;
      self.checkToken(self);

      if (!self.userData.username || !self.userData.password || !self.userData.email) {
        self.weui.topTips(self.APLang.msg.emptyInput,800);
        return false;
      }

      apiUrl.post("users",{
        username: self.userData.username,
        email: self.userData.email,
        password: self.userData.password
      }).then(res => {
        if(res.status === 201) {
          self.weui.confirm(self.APLang.msg.loginThisAccount,{
            buttons: [{
              label: self.APLang.popAction.cancel,
              type: 'default',
              onClick: function(){
                self.$router.push("/");
              }
            }, {
              label: self.APLang.popAction.ok,
              type: 'primary',
              onClick: function(){
                self.loginNew();
              }
            }]
          });
        }
      }).catch(err => {
        self.responseError(err);
      });
    },

    // login this register user
    // post -> siteURL + /wp-json/jwt-auth/v1/token
    /*
     * username: *user name
     * password: *user password
    */
    loginNew() {
      let self = this;
      sessionStorage.removeItem("userToken");
      axios.post(WPBlogSiteUrl + "/wp-json/jwt-auth/v1/token",{
        username: self.userData.username,
        password: self.userData.password
      }).then(res => {
        if(res.data.token) {
          sessionStorage.setItem("userToken", res.data.token);
          self.weui.topTips(self.APLang.msg.loginSuccess, {
            duration: 1200,
            className: 'weui-toptips_succ',
            callback: function(){
              self.$router.push("/member");
              window.location.reload();
            }
          });
        }
      }).catch(err => {
        self.responseError(err);
      });
    }
  }
};
</script>
