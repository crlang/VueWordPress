<template>
  <div class="fixed-footer" v-if="footerShow">
    <div class="weui-tab">
      <div class="weui-tabbar">
        <a href="javascript:;" class="weui-tabbar__item" :class="{'weui-bar__item_on':isHome}" @click="goHome">
          <span class="weui-tabbar__icon"><i class="iconfont icon-home"></i></span>
          <p class="weui-tabbar__label">首页</p>
        </a>
        <a href="javascript:;" class="weui-tabbar__item" :class="{'weui-bar__item_on':isTopic}">
          <span class="weui-tabbar__icon"><i class="iconfont icon-topic"></i></span>
          <p class="weui-tabbar__label">专题</p>
        </a>
        <a href="javascript:;" class="weui-tabbar__item" :class="{'weui-bar__item_on':isPost}" @click="goPost">
          <span class="weui-tabbar__icon"><i class="iconfont icon-post"></i></span>
          <p class="weui-tabbar__label">发表</p>
        </a>
        <a href="javascript:;" class="weui-tabbar__item" :class="{'weui-bar__item_on':isTags}">
          <span class="weui-tabbar__icon"><i class="iconfont icon-tags"></i></span>
          <p class="weui-tabbar__label">标签</p>
        </a>
        <a href="javascript:;" class="weui-tabbar__item" :class="{'weui-bar__item_on':isMyself}">
          <span class="weui-tabbar__icon"><i class="iconfont icon-member"></i></span>
          <p class="weui-tabbar__label">我的</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "fixed-footer",
    data() {
      return {
        isHome: false,
        isTopic: false,
        isPost: false,
        isTags: false,
        isMyself: false
      };
    },
    mounted: function() {
      this.isHome = true;
    },
    computed: {
      footerShow() {
        return this.$store.state.footer;
      }
    },
    methods: {
      goHome(){
        this.$router.push('/');
        this.isHome = true;
      },
      goPost() {
        this.$router.push('/post');
        this.isPost = true;
      }
    }
  };
</script>