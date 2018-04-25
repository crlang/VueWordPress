<template>
  <div class="comments">
    <div class="wrap">
      <div class="comments-order">
        <span class="weui-btn weui-btn_mini" @click="newComments()" :class=" order === 'asc' ? 'weui-btn_primary' : 'weui-btn_default'">{{Tran_new}}</span>
        <span class="weui-btn weui-btn_mini" @click="oldComments()" :class=" order === 'desc' ? 'weui-btn_primary' : 'weui-btn_default'">{{Tran_old}}</span>
      </div>
      <div class="comments-content">
        <ul>
          <li v-for="(item,index) in commentsData" :key="index">
            <div class="comment-content">
              <div class="comment-avatar"><img :src="item.author_avatar_urls[48]" :alt="item.author_name"></div>
              <div class="comment-desc">
                <div class="comment-response" v-html="item.content.rendered"></div>
                <div class="comment-info"><span>{{item.author_name}}</span> | <span class="comment-date">{{item.date}}</span><router-link class="fl-r" :to="'article/' + item.post">{{Tran_link}}</router-link></div>
              </div>
            </div>
          </li>
        </ul>
        <div class="list-loading">
          <a href="javascript:;" class="weui-btn weui-btn_default" @click="getMore" v-if="loadMore">{{this.APLang.loadMore}}</a>
          <div class="weui-loadmore weui-loadmore_line" v-else>
            <span class="weui-loadmore__tips">{{this.APLang.noneMore}}</span>
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
      commentsData: [],
      Tran_link: this.APLang.commentLink,
      Tran_new: this.APLang.newComments,
      Tran_old: this.APLang.oldComments,
      pages: {
        page_count: 0,
        page: 1,
        per_page: 10
      },
      loadMore: false,
      order: "asc",
      orderBy: "date_gmt"
    };
  },
  mounted: function () {
    this.showPGConfig();
    this.getComments();
  },
  methods: {
    // site config
    showPGConfig(){
      this.$store.commit('newTitle', this.APLang.comments);// page title
      this.$store.commit('showFooter', true);// footer if show
    },

    getComments() {
      this.weui.loading(this.APLang.loading);

      apiUrl.get("comments",{
        params: {
          order: this.order,
          orderby: this.orderBy
        }
      }).then(res => {
        console.log(res.data);

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
        if(this.pages.page_count > 1) {
          this.loadMore = true;
        }else{
          this.loadMore = false;
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
    newComments() {
      this.order = 'asc';
      this.getComments();
    },
    oldComments() {
      this.order = 'desc';
      this.getComments();
    },
    // show more data
    getMore() {
      this.pages.page += 1;
      this.pages.page_count -= 1;
      this.loadMore = true;
      this.getComments();
    },
  }
};
</script>
