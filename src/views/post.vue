<template>
  <div class="post">
    <div class="wrap">
      <form @submit.prevent="postArticle">
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" v-model="postData.title" :placeholder="Tran_title"/>
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <textarea class="weui-textarea" v-model="postData.content" @input="inputCountNum" :placeholder="Tran_content" rows="8"></textarea>
              <div class="weui-textarea-counter">{{inputCount}}</div>
            </div>
          </div>
        </div>
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell weui-cell_switch">
            <div class="weui-cell__bd">{{Tran_postNow}}</div>
            <div class="weui-cell__ft">
              <input class="weui-switch" type="checkbox" v-model="postNow"/>
            </div>
          </div>
          <div class="weui-cells__tips" v-if="postNow">{{Tran_nonePermissions}}</div>
          <div class="weui-cell weui-cell_switch" v-if="postNow">
            <div class="weui-cell__bd">{{Tran_postTop}}</div>
            <div class="weui-cell__ft">
              <input class="weui-switch" type="checkbox" v-model="postTop" :disabled="postPrivate || postPrivate || postPassword"/>
            </div>
          </div>
        </div>
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell weui-cell_switch">
            <div class="weui-cell__bd">{{Tran_postMoreOption}}</div>
            <div class="weui-cell__ft">
              <input class="weui-switch" type="checkbox" v-model="postMoreOptions"/>
            </div>
          </div>
          <div class="weui-cell weui-cell_switch" v-if="postMoreOptions">
            <div class="weui-cell__bd">{{Tran_postExcerpt}}</div>
            <div class="weui-cell__ft">
              <input class="weui-switch" type="checkbox" v-model="postExcerpt"/>
            </div>
          </div>
          <div class="weui-cell" v-if="postExcerpt">
            <div class="weui-cell__bd">
              <textarea class="weui-textarea" v-model="postData.excerpt" :placeholder="Tran_excerpt" rows="2"></textarea>
            </div>
          </div>
          <div class="weui-cell weui-cell_switch" v-if="postMoreOptions">
            <div class="weui-cell__bd">{{Tran_postComment}}</div>
            <div class="weui-cell__ft">
              <input class="weui-switch" type="checkbox" checked v-model="postComment"/>
            </div>
          </div>
          <div class="weui-cell weui-cell_switch" v-if="postMoreOptions">
            <div class="weui-cell__bd">{{Tran_postFuture}}{{postTime}}</div>
            <div class="weui-cell__ft">
              <input class="weui-switch" type="checkbox" v-model="postFuture" :disabled="postPrivate"/>
            </div>
          </div>
          <div class="weui-cell" v-if="postFuture">
            <div class="weui-cell__hd"><label for="" class="weui-label">{{Tran_postTime}}</label></div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="datetime-local" value="" v-model="postTime" :placplaceholder="Tran_postSetTime">
            </div>
          </div>
          <div class="weui-cell weui-cell_switch" v-if="postMoreOptions">
            <div class="weui-cell__bd">{{Tran_postPrivate}}</div>
            <div class="weui-cell__ft">
              <input class="weui-switch" type="checkbox" v-model="postPrivate" :disabled="postPassword"/>
            </div>
          </div>
          <div class="weui-cell weui-cell_switch" v-if="postMoreOptions" >
            <div class="weui-cell__bd">{{Tran_postProtected}}</div>
            <div class="weui-cell__ft">
              <input class="weui-switch" type="checkbox" v-model="postPassword" :disabled="postPrivate"/>
            </div>
          </div>
          <div class="weui-cell" v-if="postPassword">
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" v-model="postData.password" :placeholder="Tran_password"  :disabled="postPrivate"/>
            </div>
          </div>
        </div>
        <div class="weui-btn-area">
          <button type="submit" class="weui-btn" :class="postNow ? 'weui-btn_primary' : 'weui-btn-default'"><i class="iconfont icon-post"></i> <span v-if="postNow">{{Tran_postArticle}}</span><span v-else>{{Tran_postDraft}}</span></button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.weui-btn {
  padding: 0;
  i {
    font-size: 18px;
  }
}
.weui-input {
  padding: 0;
}
.weui-cells_form {
  box-shadow: 0 0 20px #eee;
}
.weui-switch[disabled] {
  border-color: #eee;
  &::after {
    background: #eee
  }
}
</style>


<script>
import { WPBlogSiteUrl,apiUrl } from "../utils/api.js";

export default {
  data() {
    return {
      inputCount: 0,
      postCount: 200,
      postNow: false,
      postTop: false,
      postMoreOptions: false,
      postPrivate: false,
      postPassword: false,
      postFuture: false,
      postExcerpt: false,
      postComment: true,
      postTime: '',
      initPostData: [],
      postData: {
        title: '',
        content: '',
        excerpt: null,
        status: null,
        sticky: false,
        date: null,
        slug: null,
        password: null
      },
      Tran_password: this.APLang.forms.password,
      Tran_title: this.APLang.forms.title,
      Tran_content: this.APLang.forms.content,
      Tran_excerpt: this.APLang.forms.excerpt,
      Tran_postNow: this.APLang.posts.postNow,
      Tran_postTop: this.APLang.posts.postTop,
      Tran_postMoreOption: this.APLang.posts.postMoreOption,
      Tran_postExcerpt: this.APLang.posts.postExcerpt,
      Tran_postComment: this.APLang.posts.postComment,
      Tran_postFuture: this.APLang.posts.postFuture,
      Tran_postTime: this.APLang.posts.postTime,
      Tran_postSetTime: this.APLang.posts.postSetTime,
      Tran_postPrivate: this.APLang.posts.postPrivate,
      Tran_postProtected: this.APLang.posts.postProtected,
      Tran_postArticle: this.APLang.posts.postArticle,
      Tran_postDraft: this.APLang.posts.postDraft,
      Tran_postModifyArticle: this.APLang.posts.postModifyArticle,
      Tran_postModifyDraft: this.APLang.posts.postModifyDraft,
      Tran_nonePermissions: this.APLang.msg.nonePermissions
    };
  },
  mounted: function() {
    this.showPGConfig();
    this.initPostData = this.postData;
  },
  filters: {
    trim: function(value) {
      return value.trim();
    }
  },
  methods: {
    showPGConfig(){
      this.$store.commit('newTitle', this.APLang.post);// page title
      this.$store.commit('showFooter', true);// footer if show
    },

    inputCountNum() {
      this.inputCount = this.postData.content.length;
    },

    // post article
    // post -> posts
    /*
     * title:       *the title
     * content_raw: *the content
     * excerpt_raw: *the excerot
     * status:      the status
     * date:        the date, if status is future
    */
    postArticle() {


      let self = this;
      console.log(this.initPostData);

      // post now
      if(self.postNow) {
        // post word count
        if (self.postData.content.length < self.postCount) {
          let errTip = this.APLang.msg.noneWordCount.replace("{Num}",self.postCount);
          self.weui.topTips(errTip,5000);
          return false;
        }
        if (self.postData.title.length === 0) {
          self.weui.topTips(this.APLang.msg.nonePostTitle,5000);
          return false;
        }

        // post sticky
        if (self.postTop) {
          self.postData.sticky = true;
        }

        // post future / now post
        if (self.postFuture) {
          self.postData.status = 'future';
          if (self.postData.date !== null) {
            self.postData.date = self.postTime;
          }else {
            self.weui.topTips(this.APLang.msg.nonePostTime,5000);
            return false;
          }
        }else if (self.postPrivate) {
          self.postData.status = 'private';
        }else {
          self.postData.status = 'publish';
        }
      }else{
        // post draft
        self.weui.dialog({
          title: '',
          content: this.APLang.msg.confirmDraft,
          buttons: [{
            label: this.APLang.popAction.cancel,
            type: 'default',
            onClick: function () {
              // return false;
            }
          }, {
            label: this.APLang.popAction.ok,
            type: 'primary',
            onClick: function () {
              self.postData.status = 'draft';
              self.postArticle();
            }
          }]
        });
        if (self.postData.status === null) {
          return false;
        }
      }

      // post password
      if (self.postPassword) {
        if (self.postData.password === null) {
          self.weui.topTips(self.APLang.msg.nonePassword,5000);
          return false;
        }
      }

      // post comment status
      if (self.postComment) {
        self.postData.comment_status = "open";
      }else {
        self.postData.comment_status = "close";
      }

      console.log(self.postData);
      self.weui.loading(self.APLang.submitting);
      apiUrl.post("posts",self.postData).then(res => {
        console.log(res);
        if(res.status === 201) {
          if(res.data.status === "publish") {
            self.weui.dialog({
              title: self.APLang.posts.postSuccess,
              content: res.data.title.rendered,
              buttons: [{
                label: self.APLang.posts.postView,
                type: 'primary',
                onClick: function () {
                  self.$router.push("/article/" + res.data.id);
                }
              }]
            });
          }else if(res.data.status === "draft") {
            self.weui.topTips(self.APLang.posts.postDraftSuccess,5000);
          }else if(res.data.status === "pending") {
            self.weui.dialog({
              title: self.APLang.posts.postPending,
              content: res.data.title.rendered,
              buttons: [{
                label: self.APLang.posts.postView,
                type: 'primary',
                onClick: function () {
                  self.$router.push("/article/" + res.data.id);
                }
              }]
            });
          }else {
            self.weui.topTips(self.APLang.posts.postSuccess,5000);
          }
          this.postData = this.initPostData;
        }
        self.weui.loading().hide();
      }).catch(err => {
        self.responseError(err);
        self.weui.loading().hide();
      });
    }
  }
};
</script>
