<template>
  <div class="fixed-footer" v-if="footerShow">
    <div class="weui-tab">
      <div class="weui-tabbar">
        <a href="javascript:;" class="weui-tabbar__item" :class="{'weui-bar__item_on':isHome}" @click="goHome">
          <span class="weui-tabbar__icon"><i class="iconfont icon-home"></i></span>
          <p class="weui-tabbar__label">{{Tran_home}}</p>
        </a>
        <a href="javascript:;" class="weui-tabbar__item" :class="{'weui-bar__item_on':isTopic}" @click="goTopic">
          <span class="weui-tabbar__icon"><i class="iconfont icon-topic"></i></span>
          <p class="weui-tabbar__label">{{Tran_topic}}</p>
        </a>
        <a href="javascript:;" class="weui-tabbar__item" :class="{'weui-bar__item_on':isPost}" @click="goPost">
          <span class="weui-tabbar__icon"><i class="iconfont icon-post"></i></span>
          <p class="weui-tabbar__label">{{Tran_post}}</p>
        </a>
        <a href="javascript:;" class="weui-tabbar__item" :class="{'weui-bar__item_on':isTags}" @click="goTags">
          <span class="weui-tabbar__icon"><i class="iconfont icon-tags"></i></span>
          <p class="weui-tabbar__label">{{Tran_tags}}</p>
        </a>
        <a href="javascript:;" class="weui-tabbar__item" :class="{'weui-bar__item_on':isMyself}" @click="goMember">
          <span class="weui-tabbar__icon"><i class="iconfont icon-member"></i></span>
          <p class="weui-tabbar__label">{{Tran_member}}</p>
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
        Tran_home: this.PGTitle.fixedfooter.home.toUpperCase(),
        Tran_topic: this.PGTitle.fixedfooter.topic.toUpperCase(),
        Tran_post: this.PGTitle.fixedfooter.post.toUpperCase(),
        Tran_tags: this.PGTitle.fixedfooter.tags.toUpperCase(),
        Tran_member: this.PGTitle.fixedfooter.member.toUpperCase(),
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
        this.isTopic = this.isPost = this.isTags = this.isMyself = false;
      },
      goTopic() {
        this.$router.push('/topic');
        this.isTopic = true;
        this.isHome = this.isPost = this.isTags = this.isMyself = false;
      },
      goPost() {
        this.$router.push('/post');
        this.isPost = true;
        this.isHome = this.isTopic = this.isTags = this.isMyself = false;
      },
      goTags() {
        this.$router.push('/tags');
        this.isTags = true;
        this.isHome = this.isTopic = this.isPost = this.isMyself = false;
      },
      goMember() {
        this.$router.push('/member');
        this.isMyself = true;
        this.isHome = this.isTopic = this.isPost = this.isTags = false;
      }
    }
  };
</script>