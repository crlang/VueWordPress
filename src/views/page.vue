<template>
  <div class="page">
    <div class="wrap">
      <div class="title" v-html="pageData.title.rendered"></div>
      <div class="meta">
        <span>{{pageData.date}}</span>
      </div>
      <div class="page-content" v-html="this.replaceImgUrl(pageData.content.rendered)"></div>
    </div>
  </div>
</template>

<script>
import {apiUrl} from "../utils/api.js";
export default {
  data() {
    return {
      pageData: {
        title: {
          rendered: ''
        },
        date: '',
        content: {
          rendered: ''
        }
      }
    };
  },
  mounted: function() {
    this.showPGConfig();
    this.getPage();
  },
  computed: {
    slug() {
      return this.$route.params.slug;
    }
  },
  methods: {
    showPGConfig(data){
      this.$store.commit('newTitle', data);// page title
      this.$store.commit('showFooter', false);// footer if show
    },

    // get page content
    // get -> pages
    /* slug: *this page slug
    */
    getPage() {
      this.weui.loading(this.APLang.loading);

      apiUrl.get("pages",{
        params: {
          slug: this.slug,
        }
      }).then(res => {
        this.showPGConfig(res.data[0].title.rendered);
        res.data[0].date = this.formatTime(res.data[0].date);
        this.pageData = res.data[0];
        this.weui.loading().hide();
      }).catch(err => {
        this.responseError(err);
        this.weui.loading().hide();
      });
    }
  }
};
</script>

