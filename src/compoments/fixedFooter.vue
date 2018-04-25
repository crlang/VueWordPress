<template>
  <div class="fixed-footer" v-if="footerShow">
    <div class="weui-tab">
      <div class="weui-tabbar">
        <router-link :to="{name:'home'}" class="weui-tabbar__item">
          <span class="weui-tabbar__icon"><i class="iconfont icon-home"></i></span>
          <p class="weui-tabbar__label">{{Tran_home}}</p>
        </router-link>
        <router-link :to="{name:'topic'}" class="weui-tabbar__item">
          <span class="weui-tabbar__icon"><i class="iconfont icon-topic"></i></span>
          <p class="weui-tabbar__label">{{Tran_topic}}</p>
        </router-link>
        <router-link :to="{name:'post'}" class="weui-tabbar__item">
          <span class="weui-tabbar__icon"><i class="iconfont icon-post"></i></span>
          <p class="weui-tabbar__label">{{Tran_post}}</p>
        </router-link>
        <router-link :to="{name:'tags'}" class="weui-tabbar__item">
          <span class="weui-tabbar__icon"><i class="iconfont icon-tags"></i></span>
          <p class="weui-tabbar__label">{{Tran_tags}}</p>
        </router-link>
        <router-link :to="{name:'member'}" class="weui-tabbar__item">
          <span class="weui-tabbar__icon"><i class="iconfont icon-member"></i></span>
          <p class="weui-tabbar__label">{{Tran_member}}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "fixed-footer",
    data() {
      return {
        Tran_home: this.APLang.fixedfooter.home.toUpperCase(),
        Tran_topic: this.APLang.fixedfooter.topic.toUpperCase(),
        Tran_post: this.APLang.fixedfooter.post.toUpperCase(),
        Tran_tags: this.APLang.fixedfooter.tags.toUpperCase(),
        Tran_member: this.APLang.fixedfooter.member.toUpperCase(),
      };
    },
    mounted: function() {

    },
    computed: {
      footerShow() {
        return this.$store.state.footer;
      }
    },
    methods: {
    }
  };
</script>