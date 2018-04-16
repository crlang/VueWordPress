<template>
  <div class="articles">
    <div class="wrap">
      <div class="tag-content">
        <h1 class="title">{{tagName}}</h1>
        <div class="articles-list">
          <ul>
            <li v-for="(item,index) in tagData" :key="index" @click="goArticle(item.id)">
              <div class="cont-prev">
                <div class="title" v-html="item.title.rendered"></div>
                <div class="desc" v-html="item.excerpt.rendered"></div>
                <div class="time" v-text="item.date"></div>
              </div>
            </li>
          </ul>
          <div class="list-loading">
            <a href="javascript:;" class="weui-btn weui-btn_default" @click="getMore" v-if="loadMore">{{Tran_loadMore}}</a>
            <div class="weui-loadmore weui-loadmore_line" v-else>
              <span class="weui-loadmore__tips">{{Tran_noneMore}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { WPBlogSiteUrl, apiUrl } from "../utils/api.js";
export default {
  data() {
    return {
      tagName: '',
      tagData: [],
      Tran_noneMore: this.PGTitle.noneMore,
      Tran_loadMore: this.PGTitle.loadMore,
      loadMore: false,
      pages: {
        page_count: 0,
        page: 1,
        per_page: 33
      }
    };
  },
  mounted: function() {
    this.showPGConfig();
    this.getTagConfig();
    this.getTag();

  },
  computed: {
  },
  methods: {
    showPGConfig(data) {
      this.$store.commit('newTitle', data);
      this.$store.commit('showFooter', true);// footer if show
    },

    // get tag some info
    // get -> tags/{tag id}
    getTagConfig(){
      apiUrl.get("tags/" + this.$route.params.id).then(res => {
        this.tagName = res.data.name;
        this.showPGConfig(this.tagName);
      });
    },

    // get article with tag
    // get -> posts
    /* tags: *this tag id
    */
    getTag() {
      this.weui.loading(this.PGTitle.loading);
      apiUrl.get("posts",{
        params: {
          tags: this.$route.params.id
        }
      }).then(res => {
        console.log('res',res.data);
        for (let i in res.data) {
          if (res.data.hasOwnProperty(i)) {
            res.data[i].date = this.formatTime(res.data[i].date);
          }
        }
        this.tagData = this.tagData.concat(res.data);

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
    },

    goArticle(id) {
      this.$router.push({
        path: "../article/" + id
      });
    },

    // show more article
    getMore() {
      this.pages.page += 1;
      this.loadMore = true;
      this.getTag();
    },
  }
};
</script>