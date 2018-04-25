<template>
  <div class="banner">
    <div class="wrap" style="padding:0;">
      <swiper :options="swiperOption" style="text-align: center;">
        <swiper-slide v-for="item in swiperStickyData" :key="item.id"><img :src="item.featured_media" alt="item.slug" /></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import { WPBlogSiteUrl, apiUrl } from "../utils/api.js";

export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      },
      swiperStickyData: []
    };
  },
  mounted: function() {
    this.getStickyPosts();
  },
  methods: {
    // get sticky artile list
    // get -> posts
    /* page:       number
       per_page:   number
       sticky:     *boolean
       categories: each categories id
       _embed:     *boolean if true, output article featured image
    */
    getStickyPosts() {
      apiUrl.get("posts/",{
        params: {
          _embed: true,
          sticky: true,
          page: 1,
          per_page: 5
        }
      }).then(res => {
        let newRes = this.replaceFeaturesImg(res.data);
        this.swiperStickyData = newRes;
      }).catch(err => {
        if(err.response) {
          if (err.response.status !== 200) {
            this.weui.topTips(err.response.data.message,3000);
          }
        }else{
          this.weui.topTips(this.APLang.unknownMistake,3000);
        }
        this.weui.loading().hide();
      });
    }
  }
};
</script>



