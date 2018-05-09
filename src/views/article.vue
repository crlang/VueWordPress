<template>
  <div class="article">
    <div class="wrap">
      <h1 class="title">{{articleData.title.rendered}}</h1>
      <p class="meta" v-if="articleData.date"><span>{{Tran_author}}: {{articleData.author}}</span><span> {{Tran_date}} {{articleData.date}}</span></p>
      <div class="article-desc" v-if="articleData.excerpt.rendered.length > 0" v-html="articleData.excerpt.rendered"></div>
      <div class="article-protected" v-if="protected"><input type="text" v-model="password" :placeholder="Tran_password" @keyup.enter="enterPWD"><p>{{Tran_protected}}</p></div>
      <div class="article-content" v-html="this.replaceImgUrl(articleData.content.rendered)" v-else></div>
      <div class="article-comments" v-if="articleData.comment_status === 'open' && commentsData.length > 0">
        <h3>{{Tran_comment}}</h3>
        <ul>
          <li v-for="(item,index) in commentsData" :key="index">
            <div class="comment-content">
              <div class="comment-avatar"><img :src="item.author_avatar_urls[48]" :alt="item.author_name"></div>
              <div class="comment-desc">
                <div class="comment-info"><span>{{item.author_name}}</span> | <span class="comment-date">{{item.date}}</span></div>
                <div class="comment-response" v-html="item.content.rendered"></div>
              </div>
            </div>
          </li>
        </ul>
        <div class="pages-nav" v-if="pages.page_count > 1">
          <div class="prev-next">
            <div class="prev-page" :class="pages.page > 1 ? '': 'empty'" @click="getPrevPage">{{Tran_prev}}</div>
            <div class="next-page" :class="pages.page < pages.page_count ? '': 'empty'" @click="getNextPage">{{Tran_next}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed-footer-nav">
      <form @submit.prevent="responsePost" id="response">
        <div class="fixed-response">
          <div class="response-input"><input type="text" name="" id="rp-input" v-model="responseData.content"></div>
          <div class="response-submit"><button type="submit"><i class="iconfont icon-post"></i></button></div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
@import "../assets/css/highlight.css";
</style>


<script>
import { apiUrl } from "../utils/api.js";
export default {
  data() {
    return {
      Tran_author: this.APLang.author,
      Tran_date: this.APLang.date,
      Tran_comment: this.APLang.comment,
      Tran_password: this.APLang.forms.password,
      Tran_protected: this.APLang.msg.articleProtected,
      Tran_prev: this.APLang.prev,
      Tran_next: this.APLang.next,
      password: '',
      protected: false,
      postID: null,
      articleData: {
        title: {
          rendered: ''
        },
        author: '',
        date: '',
        excerpt: {
          rendered: ''
        },
        content: {
          rendered: ''
        }
      },
      commentsData: [],
      pages: {
        page_count: 0,
        page: 1,
        per_page: 10
      },
      responseData: []
    };
  },
  mounted: function() {
    this.showPGConfig();
    this.getPostID();
    this.getArticle();
  },
  methods: {
    showPGConfig(data){
      this.$store.commit('newTitle', data);
      this.$store.commit('showFooter', false);// footer if show
    },

    // get artile
    // get -> posts/{this article id}
    /*
     * password: if the article is protected.
     * _embed: if true, output article featured image
    */
    getArticle() {
      let self = this;
      self.weui.loading(self.APLang.loading);

      apiUrl.get("posts/" + self.$route.params.id,{
        params: {
          password: self.password
        }
      }).then(res => {
        self.showPGConfig(res.data.title.rendered);
        res.data.date = self.formatTime(res.data.date);
        self.articleData = res.data;
        if (self.articleData.content.protected) {
          if(self.articleData.content.rendered.length === 0) {
            self.protected = true;
            self.weui.topTips(self.APLang.msg.articleProtected,3000);
          }else{
            self.protected = false;
          }
        }
        self.weui.loading().hide();
        self.getArticleComments();
      }).catch(err => {
        self.responseError(err);
        self.weui.loading().hide();
      });
    },

    enterPWD() {
      this.getArticle();
    },

    getPostID() {
      this.postID = this.$route.params.id;
    },

    // get this article comment
    // get -> comments
    /*
     * post: *this article id
     * password: if the article is protected.
    */
    getArticleComments() {
      this.weui.loading(this.APLang.loading);

      apiUrl.get("comments",{
        params: {
          page: this.pages.page,
          per_page: this.pages.per_page,
          post: this.postID,
          password: this.password
        }
      }).then(res => {
        for (let i in res.data) {
          if (res.data.hasOwnProperty(i)) {
            res.data[i].date = this.formatTime(res.data[i].date);
            res.data[i].date = res.data[i].date.substring(5);
          }
        }

        this.commentsData = this.commentsData.concat(res.data);
        if (this.pages.page_count === 0) {
          this.pages.page_count = parseInt(res.headers['x-wp-totalpages']);
        }
        this.weui.loading().hide();
      }).catch(err => {
        this.responseError(err);
        this.weui.loading().hide();
      });
    },

    // next comments
    getNextPage() {
      let allPages = this.pages.page_count;
      if(this.pages.page < allPages) {
        this.pages.page += 1;
        this.commentsData = [],
        this.getArticleComments();
      }
    },

    // prev comments
    getPrevPage() {
      let allPages = this.pages.page_count;
      if(this.pages.page > 1 && this.pages.page <= allPages) {
        this.pages.page -= 1;
        this.commentsData = [],
        this.getArticleComments();
      }
    },

    // response this article
    // post -> comments
    /*
     * post: *this article id
     * content: *the response content
    */
    responsePost() {
      let self = this;
      if (!self.responseData.content) {
        self.weui.topTips(self.APLang.msg.emptyResponse,1200);
        return false;
      }
      apiUrl.post("comments",{
        "post": self.postID,
        "content": self.responseData.content
      }).then(res => {
        if (res.status === 201) {
          self.weui.toast(self.APLang.popAction.success,{
            duration: 1200,
            callback: function(){
              self.commentsData = [];
              self.getArticleComments();
              self.responseData = '';
            }
          }
          );
        }
      }).catch(err => {
        self.responseError(err);
        self.weui.loading().hide();
      });
    }
  }
};
</script>