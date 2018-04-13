<template>
  <div class="article">
    <h1 class="title">{{articleData.title.rendered}}</h1>
    <p class="meta"><span>作者：{{articleData.author}}</span><span>发布时间：{{articleData.date}}</span></p>
    <div class="article-desc" v-html="articleData.excerpt.rendered"></div>
    <div class="article-content" v-html="replaceImgUrl(articleData.content.rendered)"></div>
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
    this.getArticle();
    this.showPGConfig();
  },
  methods: {
    showPGConfig(){
      this.$store.commit('showFooter', false);// footer if show
    },
    getArticle() {
      let ids = this.$route.params.id;
      apiUrl.get("posts/"+ids).then(res => {
        this.$store.commit('newTitle', res.data.title.rendered);
        res.data.date = this.formatTime(res.data.date);
        this.articleData = res.data;
      });
    },
    replaceImgUrl(strs){
      let hzreg = /((href|src)="\/media)/g; // wordpress media path
      var st = strs.replace(hzreg,function(a){
        if (a === 'href="/media') {
          return 'href="' + WPBlogSiteUrl + '/media';
        }else if(a === 'src="/media') {
          return 'src="' + WPBlogSiteUrl + '/media';
        }
      });
      return st;
    }
  }
};
</script>