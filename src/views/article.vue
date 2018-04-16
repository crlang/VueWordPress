<template>
  <div class="article">
    <div class="wrap">
      <h1 class="title">{{articleData.title.rendered}}</h1>
      <p class="meta"><span>{{Tran_author}}: {{articleData.author}}</span><span> {{Tran_date}} {{articleData.date}}</span></p>
      <div class="article-desc" v-html="articleData.excerpt.rendered"></div>
      <div class="article-content" v-html="this.replaceImgUrl(articleData.content.rendered)"></div>
    </div>
  </div>
</template>

<style scoped>
@import "../assets/css/highlight.css";
</style>


<script>
import { WPBlogSiteUrl, apiUrl } from "../utils/api.js";
// import weui from "weui.js";
export default {
  data() {
    return {
      Tran_author: this.PGTitle.author,
      Tran_date: this.PGTitle.date,
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
      }
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
    // get -> posts
    /* 
     * id:     *this article id
     * _embed: if true, output article featured image
    */
    getArticle() {
      this.weui.loading(this.PGTitle.loading);

      apiUrl.get("posts/" + this.$route.params.id).then(res => {
        this.showPGConfig(res.data.title.rendered);
        res.data.date = this.formatTime(res.data.date);
        this.articleData = res.data;
        this.weui.loading().hide();
      }).catch(err => {
        console.log("err",err.response);
        if(err.response) {
          if (err.response.status !== 200) {
            this.weui.topTips(err.response.data.message,3000);
          }
        }else{
          this.weui.topTips(this.PGTitle.unknownMistake,3000);
        }
        this.weui.loading().hide();
      });
    }
  }
};
</script>