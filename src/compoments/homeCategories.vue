<template>
  <div class="home-categories" v-show="ku">
    <div class="wrap">
      <ul>
        <router-link :to="'media'" tag="li">
          <i class="iconfont icon-gallery"></i>
          <p>{{Tran_media}}</p>
        </router-link>
        <router-link :to="'articles'" tag="li">
          <i class="iconfont icon-article"></i>
          <p>{{Tran_article}}</p>
        </router-link>
        <router-link :to="'comments'" tag="li">
          <i class="iconfont icon-comment"></i>
          <p>{{Tran_comments}}</p>
        </router-link>
        <router-link :to="'login'" tag="li">
          <i class="iconfont icon-login"></i>
          <p>{{Tran_login}}</p>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Tran_media: this.APLang.homeCategories.media,
      Tran_article: this.APLang.homeCategories.article,
      Tran_comments: this.APLang.homeCategories.comments,
      Tran_login: this.APLang.homeCategories.login,
      ku: false
    };
  },
  mounted: function() {
    this.ku = true;
  }
};
</script>
