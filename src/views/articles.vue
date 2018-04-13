<template>
  <div class="articles">
    <div class="articles-nav">
      <ul>
        <li :class="{'active': active === null}" @click="homeMy()">首页</li><li v-for="(item,index) in categoriesData" @click="categorie(index)" :class="{ 'active': active == index }" :key="index">{{item.name}}</li>
      </ul>
    </div>
    <div class="articles-list">
      <ul>
        <li v-for="(item,index) in articleData" :key="index" @click="viewArticle(index)">
          <div class="cont-prev">
            <div class="title" v-html="item.title.rendered"></div>
            <div class="desc" v-html="item.excerpt.rendered"></div>
            <div class="time" v-text="item.date"></div>
          </div>
          <div class="img-prev" :style="{backgroundImage:'url(' + getThumbnail(item) + ')'}"></div>
        </li>
      </ul>
      <a href="javascript:;" class="weui-btn weui-btn_default" v-if="loadMore"><i class="weui-loading"></i>正在加载</a>
      <div v-else>
        <div class="weui-loadmore weui-loadmore_line" v-if="noneMore">
          <span class="weui-loadmore__tips">暂无数据</span>
        </div>
        <a href="javascript:;" class="weui-btn weui-btn_default" @click="needMore" v-else>加载更多</a>
      </div>
    </div>
  </div>
</template>

<script>
import { WPBlogSiteUrl, apiUrl } from "../utils/api.js";

export default {
  data() {
    return {
      articleData: [],
      pages: {
        page: 1,
        per_page: 5
      },
      categories: null,
      categoriesData: [],
      active: null,
      noneMore: false,
      titleLength: 30,
      loadMore: false
    };
  },
  mounted: function() {
    this.getArticleList();
    this.getCategories();
    this.showPGConfig();
  },
  methods: {
    showPGConfig(){
      this.$store.commit('newTitle', this.PGTitle.home); // page title
      this.$store.commit('showFooter', true);// footer if show
    },
    getArticleList() {
      apiUrl.get("posts?_embed",{
        params: {
          page: this.pages.page,
          per_page: this.pages.per_page,
          categories: this.categories
        }
      }).then(res => {
        console.log(res.data);
        this.onShowLoading();
        for (let i in res.data) {
          if (res.data.hasOwnProperty(i)) {
            if (res.data[i].title.rendered.length > this.titleLength) {
              res.data[i].title.rendered = res.data[i].title.rendered.substring(0,this.titleLength) + "...";
            }
          }
        }
        if(res.data.length < this.pages.per_page) {
          this.loadMore = false;
          this.noneMore = true;
          // return false;
        }else{
          this.loadMore = false;
        }
        this.articleData = this.articleData.concat(res.data);
        this.loadMore = false;
      }).catch(err => {
        if(err.response.data.code === "rest_post_invalid_page_number"){
          this.loadMore = false;
          this.noneMore = true;
          return false;
        }
      });
      this.onShowLoading();
    },

    getThumbnail(item) {
      if (item._embedded['wp:featuredmedia'] === undefined) {
        return WPBlogSiteUrl + '/wp-content/themes/darlang/screenshot.png';
      }else{
        return WPBlogSiteUrl + item._embedded['wp:featuredmedia'][0]['source_url'];
      }
    },

    viewArticle(index) {
      let ids = this.articleData[index].id;
      this.$router.push({
        path: "../article/" + ids
      });
    },

    getCategories() {
      apiUrl.get("categories").then(res => {
        this.categoriesData = res.data;
      });
    },

    categorie(index) {
      this.categories = this.categoriesData[index].id;
      this.pages.page = 1;
      this.active = index;
      this.articleData = [];
      this.getArticleList();
    },

    needMore() {
      this.pages.page += 1;
      this.loadMore = true;
      this.getArticleList();
    },

    onShowLoading(val) {
      this.$emit("xxxloading",val);
    },

    homeMy(){
      this.pages.page = 1;
      this.active = null;
      this.articleData = [];
      this.getArticleList();
    }
  }
};
</script>