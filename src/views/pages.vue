<template>
  <div class="topic">
    <div class="wrap">
      <ul>
        <router-link v-for="item in topicData" :key="item.id" :to="'topic/' + item.slug" tag="li">
        <div class="thumb"><img :src='item._embedded["wp:featuredmedia"][0].source_url' alt=""></div>
        <div class="title" v-html="item.title.rendered"></div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import {WPBlogSiteUrl,apiUrl} from '../utils/api.js';

export default {
  data() {
    return {
      topicData: null,
      siteUrl: WPBlogSiteUrl
    };
  },
  mounted() {
    this.showPGConfig();
    this.getTopic();
  },
  methods: {
    showPGConfig(){
      this.$store.commit('newTitle', this.PGTitle.topic);// page title
      this.$store.commit('showFooter', true);// footer if show
    },
    getTopic() {
      apiUrl.get('pages',{
        params: {
          _embed: true
        }
      }).then(res => {
        console.log(res.data);
        let newImgData = [];
        for (const i in res.data) {
          if (res.data.hasOwnProperty(i)) {
            if (res.data[i]._embedded["wp:featuredmedia"] !== undefined) {
              res.data[i]._embedded["wp:featuredmedia"][0].source_url = this.siteUrl + res.data[i]._embedded["wp:featuredmedia"][0].source_url;
              newImgData.push(res.data[i]);
            }
          }
        }
        this.topicData = newImgData;
      });
    },
  }
};
</script>