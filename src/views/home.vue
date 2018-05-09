<template>
  <div class="articles">
    <home_banner></home_banner>
    <home_categories></home_categories>
    <div class="articles-nav" v-show="categoriesData.length > 0">
      <div class="wrap">
      <ul>
        <li :class="{'active': active === null}" @click="homeMy()">{{Tran_Home}}</li><li v-for="(item,index) in categoriesData" @click="categorie(index)" :class="{ 'active': active == index }" :key="index">{{item.name}}</li>
      </ul>
      </div>
    </div>
    <div class="wrap">
      <div class="articles-list" v-if="articleData.length > 0">
        <ul>
          <li v-for="(item,index) in articleData" :key="index" @click="viewArticle(index)">
            <div class="cont-prev">
              <div class="title" v-html="item.title.rendered"></div>
              <div class="desc" v-if="!item.excerpt.protected" v-html="item.excerpt.rendered"></div>
              <div class="desc" v-else>文章具有密码保护！</div>
              <div class="time" v-text="item.date"></div>
            </div>
            <div class="img-prev" :style="{backgroundImage:'url('+ item.featured_media +')'}"></div>
          </li>
        </ul>
      </div>
      <div class="weui-loadmore weui-loadmore_line" v-else>
        <span class="weui-loadmore__tips">{{this.APLang.noneMore}}</span>
      </div>
      <home_footer></home_footer>
    </div>
  </div>
</template>

<script>
import { WPBlogSiteUrl, apiUrl } from "../utils/api.js";
import home_banner from '../compoments/homeBanner.vue';
import home_categories from '../compoments/homeCategories.vue';
import home_footer from "../compoments/homeCopyright.vue";

export default {
  data() {
    return {
      articleData: [],
      Tran_Home: this.APLang.home,
      Tran_noneMore: this.APLang.noneMore,
      Tran_loadMore: this.APLang.loadMore,
      loadMore: false,
      pages: {
        page_count: 0,
        page: 1,
        per_page: 5
      },
      categories: null,
      categoriesData: [],
      active: null,
      titleLength: 30
    };
  },
  components: {
    home_banner: home_banner,
    home_categories: home_categories,
    home_footer: home_footer
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
    /* page:       number
       per_page:   number
       categories: each categories id
       _embed:     if true, output article featured image
    */
    getArticleList() {
      this.weui.loading(this.APLang.loading);

      apiUrl.get("posts",{
        params: {
          _embed: true,
          context: 'embed',
          page: this.pages.page,
          per_page: this.pages.per_page,
          categories: this.categories
        }
      }).then(res => {
        for (let i in res.data) {
          if (res.data.hasOwnProperty(i)) {
            res.data[i].date = this.formatTime(res.data[i].date);
            if (res.data[i].title.rendered.length > this.titleLength) {
              res.data[i].title.rendered = res.data[i].title.rendered.substring(0,this.titleLength) + "...";
            }
          }
        }

        let newRes = this.replaceFeaturesImg(res.data);
        this.articleData = this.articleData.concat(newRes);
        if (this.pages.page_count === 0) {
          this.pages.page_count = parseInt(res.headers['x-wp-totalpages']);
        }
        if(this.pages.page_count > 1) {
          this.loadMore = true;
        }else{
          this.loadMore = false;
        }

        this.weui.loading().hide();
      }).catch(err => {
        this.responseError(err);
        this.weui.loading().hide();
      });
    },

    // go to article
    viewArticle(index) {
      this.$router.push({
        path: "../article/" + this.articleData[index].id
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
      this.pages.page_count = 0;
      this.active = index;
      this.articleData = [];
      this.getArticleList();
    },

    // show more data
    getMore() {
      this.pages.page += 1;
      this.pages.page_count -= 1;
      this.loadMore = true;
      this.getArticleList();
    },

    // if click home
    homeMy(){
      this.pages.page = 1;
      this.active = null;
      this.categories = null;
      this.articleData = [];
      this.getArticleList();
    }
  }
};
</script>