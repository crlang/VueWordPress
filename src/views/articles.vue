<template>
  <div class="articles">
    <div class="articles-nav">
      <ul>
        <li :class="{'active': active === null}" @click="homeMy()">{{Tran_Home}}</li><li v-for="(item,index) in categoriesData" @click="categorie(index)" :class="{ 'active': active == index }" :key="index">{{item.name}}</li>
      </ul>
    </div>
    <div class="wrap">
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
        <a href="javascript:;" class="weui-btn weui-btn_default" v-if="loadMore"><i class="weui-loading"></i>{{Tran_loading}}</a>
        <div v-else>
          <div class="weui-loadmore weui-loadmore_line" v-if="noneMore">
            <span class="weui-loadmore__tips">{{Tran_noneMore}}</span>
          </div>
          <a href="javascript:;" class="weui-btn weui-btn_default" @click="needMore" v-else>{{Tran_loadMore}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { WPBlogSiteUrl, apiUrl } from "../utils/api.js";
import axios from "axios";
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
      Tran_Home: this.PGTitle.home,
      Tran_loading: this.PGTitle.loading,
      Tran_noneMore: this.PGTitle.noneMore,
      Tran_loadMore: this.PGTitle.loadMore,
      active: null,
      noneMore: false,
      titleLength: 30,
      loadMore: false
    };
  },
  mounted: function() {
    this.showPGConfig();
    this.getArticleList();
    this.getCategories();
  },
  methods: {
    // site config
    showPGConfig(){
      this.siteConfig(data=>{
        this.$store.commit('newTitle', data.name);
      });// page title
      this.$store.commit('showFooter', true);// footer if show
    },

    // get artile list
    // get -> posts
    /* page:       *number
       per_page:   *number
       categories: categories id
       _embed:     if true, output article featured image
    */
    getArticleList() {
      apiUrl.get("posts",{
        params: {
          _embed: true,
          page: this.pages.page,
          per_page: this.pages.per_page,
          categories: this.categories
        }
      }).then(res => {
        console.log(res.data);
        this.onShowLoading();
        for (let i in res.data) {
          if (res.data.hasOwnProperty(i)) {
            res.data[i].date = this.formatTime(res.data[i].date);
            if (res.data[i].title.rendered.length > this.titleLength) {
              res.data[i].title.rendered = res.data[i].title.rendered.substring(0,this.titleLength) + "...";
            }
          }
        }
        this.articleData = this.articleData.concat(res.data);
        if(res.data.length < this.pages.per_page) {
          this.loadMore = false;
          this.noneMore = true;
          // return false;
        }else{
          this.loadMore = false;
          this.noneMore = false;
        }
      }).catch(err => {
        if(err.response.data.code === "rest_post_invalid_page_number"){
          this.loadMore = false;
          this.noneMore = true;
          this.onShowLoading();
          return false;
        }
      });
      this.onShowLoading();
    },

    getThumbnail(item) {
      let defaultIMG = '/src/assets/images/logo.png';
      if (item._embedded['wp:featuredmedia'] === undefined) {
        return defaultIMG;
      }else{
        if (item._embedded['wp:featuredmedia'][0].source_url !== undefined) {
          return WPBlogSiteUrl + item._embedded['wp:featuredmedia'][0]['source_url'];
        }else{
          if (item._embedded['wp:featuredmedia'][0].data.status === 404) {
            return defaultIMG;
          }
        }
      }
    },

    // go to article
    viewArticle(index) {
      let ids = this.articleData[index].id;
      this.$router.push({
        path: "../article/" + ids
      });
    },

    // get all categories
    // get -> categories
    getCategories() {
      apiUrl.get("categories").then(res => {
        this.categoriesData = res.data;
      });
    },

    // filter categor
    categorie(index) {
      this.categories = this.categoriesData[index].id;
      this.pages.page = 1;
      this.active = index;
      this.articleData = [];
      this.getArticleList();
    },

    // show more article
    needMore() {
      this.pages.page += 1;
      this.loadMore = true;
      this.getArticleList();
    },

    // loading display
    onShowLoading(val) {
      this.$emit("xxxloading",val);
    },

    // if click home
    homeMy(){
      this.pages.page = 1;
      this.active = null;
      this.articleData = [];
      this.getArticleList();
    }
  }
};
</script>