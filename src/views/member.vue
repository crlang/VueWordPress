<template>
  <div class="member">
    <div class="wrap">
      <div class="user-bg">
        <div class="user-avatar"><img :src="userData.avatar_urls[96]"></div>
        <p class="user-name">{{userData.name}}</p>
      </div>
      <div class="user-myself">
        <ul>
          <li><i class="iconfont icon-article"></i><p>{{Tran_Lang.myArticle}}</p></li>
          <li><i class="iconfont icon-pic"></i><p>{{Tran_Lang.myMedia}}</p></li>
          <li><i class="iconfont icon-comment"></i><p>{{Tran_Lang.myComment}}</p></li>
        </ul>
      </div>
      <div class="user-list">
        <ul>
          <li>{{Tran_Lang.mySetting}}<span><i class="iconfont icon-back"></i></span></li>
          <li>{{Tran_Lang.myLanguage}}<span><i class="iconfont icon-back"></i></span></li>
          <li>{{Tran_Lang.myHistory}}<span>{{Tran_Lang.myHistoryTip}}<i class="iconfont icon-back"></i></span></li>
        </ul>
        <ul>
          <li @click="logoutUser">{{Tran_Lang.myLogout}}<span><i class="iconfont icon-back"></i></span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {apiUrl} from "../utils/api.js";

export default {
  data() {
    return {
      Tran_Lang: {
        myArticle: this.APLang.members.myArticle,
        myComment: this.APLang.members.myComment,
        myMedia: this.APLang.members.myMedia,
        mySetting: this.APLang.members.setting,
        myLanguage: this.APLang.members.language,
        myLogout: this.APLang.members.logout,
        myHistory: this.APLang.members.history,
        myHistoryTip: this.APLang.members.historyTip
      },
      userData: {
        avatar_urls: {
          '96': '/src/assets/images/logo.png'
        },
        name: 'Hello Darlang'
      }
    };
  },
  mounted: function() {
    this.showPGConfig();
    this.getUserInfo();
  },
  methods: {
    showPGConfig(){
      this.$store.commit('newTitle', this.APLang.member);// page title
      this.$store.commit('showFooter', true);// footer if show
    },

    // get user info
    // get -> users/me
    getUserInfo(){
      apiUrl.get("users/me").then(res => {
        this.userData = res.data;
      }).catch(err => {
        this.responseError(err);
        this.weui.loading().hide();
      });
    },

    logoutUser() {
      let self = this;
      if(sessionStorage.getItem("userToken")) {
        self.weui.dialog({
          title: '',
          content: self.APLang.msg.logged,
          buttons: [{
            label: self.APLang.popAction.cancel,
            type: 'default',
            onClick: function () {
              //
            }
          }, {
            label: self.APLang.popAction.ok,
            type: 'primary',
            onClick: function () {
              sessionStorage.removeItem("userToken");
              self.weui.topTips(self.APLang.msg.logoutSuccess,{
                duration: 600,
                callback: function(){
                  window.location.reload();
                  self.$router.push("/");
                }
              });
            }
          }]
        });
      }
    }
  }
};
</script>