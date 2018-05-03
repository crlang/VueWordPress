<template>
  <div class="article">
    <div class="wrap">
      <h1 class="title">{{articleData.title.rendered}}</h1>
      <p class="meta" v-if="articleData.date"><span>{{Tran_author}}: {{articleData.author}}</span><span> {{Tran_date}} {{articleData.date}}</span></p>
      <div class="article-desc" v-if="articleData.excerpt.rendered.length > 0" v-html="articleData.excerpt.rendered"></div>
      <div class="article-content" v-if="!protected" v-html="this.replaceImgUrl(articleData.content.rendered)"></div>
      <div class="article-protected" v-else><input type="text" v-model="password" placeholder="请输入密码" @keyup.enter="enterPWD"><p>文章具有密码保护！</p></div>
      <div class="article-comments" v-if="articleData.comment_status === 'open'">
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
        <div class="pages-nav">
          <div class="prev-next">
            <div class="prev-page" :class="pages.page > 1 ? '': 'empty'" @click="getPrevPage">上一页</div>
            <div class="next-page" :class="pages.page < pages.page_count ? '': 'empty'" @click="getNextPage">下一页</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../assets/css/highlight.css";
</style>


<script>
import { WPBlogSiteUrl, apiUrl } from "../utils/api.js";
export default {
  data() {
    return {
      Tran_author: this.APLang.author,
      Tran_date: this.APLang.date,
      Tran_comment: this.APLang.comment,
      password: '',
      protected: false,
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
        per_page: 5
      },
    };
  },
  mounted: function() {
    this.showPGConfig();
    this.getArticle();
  },
  methods: {
    showPGConfig(data){
      this.$store.commit('newTitle', data);
      this.$store.commit('showFooter', false);// footer if show
    },

    // get artile
    // get -> posts/this article id
    /*
     * password: if the article is protected.
     * _embed: if true, output article featured image
    */
    getArticle() {
      this.weui.loading(this.APLang.loading);

      apiUrl.get("posts/" + this.$route.params.id,{
        params: {
          password: this.password
        }
      }).then(res => {
        console.log(res);
        this.showPGConfig(res.data.title.rendered);
        res.data.date = this.formatTime(res.data.date);
        this.articleData = res.data;
        this.weui.loading().hide();

        if (res.data.content.protected) {
          if(this.articleData.content.rendered.length === 0) {
            this.protected = true;
            this.weui.topTips("文章具有密码保护！",3000);
          }else{
            this.protected = false;
            this.getArticleComments();
          }
        }else {
          this.getArticleComments();
        }

      }).catch(err => {
        console.log("err",err.response);
        if(err.response) {
          if (err.response.status !== 200) {
            this.weui.topTips(err.response.data.message,3000);
          }
        }else{
          this.weui.topTips(this.APLang.unknownMistake,3000);
        }
        this.weui.loading().hide();
      });
    },

    enterPWD() {
      this.getArticle();
    },

    getArticleComments() {
      this.weui.loading(this.APLang.loading);

      apiUrl.get("comments",{
        params: {
          page: this.pages.page,
          per_page: this.pages.per_page,
          post: this.$route.params.id,
          password: this.password
        }
      }).then(res => {
        console.log(res);

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
        console.log("err.",err.response);
        if(err.response) {
          if (err.response.status !== 200) {
            this.weui.topTips(err.response.data.message,3000);
          }
        }else{
          this.weui.topTips(this.APLang.unknownMistake,3000);
        }
        this.weui.loading().hide();
      });
    },

    getNextPage() {
      let allPages = this.pages.page_count;
      if(this.pages.page < allPages) {
        this.pages.page += 1;
        this.commentsData = [],
        this.getArticleComments();
      }
    },

    getPrevPage() {
      let allPages = this.pages.page_count;
      if(this.pages.page > 1 && this.pages.page <= allPages) {
        this.pages.page -= 1;
        this.commentsData = [],
        this.getArticleComments();
      }
    }
  }
};
</script>