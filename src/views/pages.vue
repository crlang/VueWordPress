<template>
  <div class="topic">
    <div class="wrap">
      <ul>
        <router-link v-for="item in topicData" :key="item.id" :to="'topic/' + item.slug" tag="li">
        <div class="thumb"><img :src='item.featured_media' alt=""></div>
        <div class="title" v-html="item.title.rendered"></div>
        </router-link>
      </ul>
      <div class="list-loading">
        <a href="javascript:;" class="weui-btn weui-btn_default" @click="getMore" v-if="loadMore">{{Tran_loadMore}}</a>
        <div class="weui-loadmore weui-loadmore_line" v-else>
          <span class="weui-loadmore__tips">{{Tran_noneMore}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {WPBlogSiteUrl,apiUrl} from '../utils/api.js';

export default {
  data() {
    return {
      topicData: [],
      Tran_noneMore: this.APLang.noneMore,
      Tran_loadMore: this.APLang.loadMore,
      loadMore: false,
      pages: {
        page_count: 0,
        page: 1,
        per_page: 5
      },
      siteUrl: WPBlogSiteUrl
    };
  },
  mounted() {
    this.showPGConfig();
    this.getTopic();
  },
  methods: {
    showPGConfig(){
      this.$store.commit('newTitle', this.APLang.topic);// page title
      this.$store.commit('showFooter', true);// footer if show
    },

    // get topic
    // get -> topic
    /* page:       number, default 1
       per_page:   number, default 10
       exclude:    exclude some id
       orderby:    some way by order, options: [id,include,name,slug,include_slugs,term_group,description,count]
       order:      default asc, options: [asc,desc]
       _embed:     if true, output article featured image
    */
    getTopic() {
      this.weui.loading(this.APLang.loading);

      apiUrl.get('pages',{
        params: {
          page: this.pages.page,
          per_page: this.pages.per_page,
          _embed: true
        }
      }).then(res => {
        console.log(res.data);

        let newRes = this.replaceFeaturesImg(res.data);
        this.topicData = this.topicData.concat(newRes);

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
        console.log("err",err);
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

    // show more data
    getMore() {
      this.pages.page += 1;
      this.pages.page_count -= 1;
      this.loadMore = true;
      this.getTopic();
    }
  }
};
</script>