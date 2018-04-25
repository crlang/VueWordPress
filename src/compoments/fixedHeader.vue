<template>
  <div class="fixed-header">
    <div class="top-bar">
      <div class="pg-back"><i class="iconfont icon-back" @click="backPage"></i></div>
      <div class="pg-title" v-html="showPGTitle"></div>
      <div class="pg-nav" v-if="PGNav" @click="showPGNav()"><i class="iconfont icon-list"></i></div>
    </div>
    <div class="pg-nav-content" v-if="PGNav && PGNavContent" :class="{show : PGNavShow}">
      <div class="weui-cells">
        <a class="weui-cell weui-cell_access" href="javascript:;" @click="goHome">
          <div class="weui-cell__bd">
              <p>{{Tranhome}}</p>
          </div>
          <div class="weui-cell__ft">
          </div>
        </a>
        <a class="weui-cell weui-cell_access" href="javascript:;">
          <div class="weui-cell__bd">
            <p>{{Transearch}}</p>
          </div>
          <div class="weui-cell__ft">
          </div>
        </a>
        <a class="weui-cell weui-cell_access" href="javascript:;">
          <div class="weui-cell__bd">
            <p>{{Tranabout}}</p>
          </div>
          <div class="weui-cell__ft">
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "fixed-header",
    data() {
      return {
        Tranhome: this.APLang.home,
        Transearch: this.APLang.search,
        Tranabout: this.APLang.about,
        PGNav: true,
        PGNavContent: false,
        PGNavShow: false
      };
    },
    mounted: function(){
    },
    computed: {
      showPGTitle() {
        return this.$store.state.title;
      }
    },
    methods: {
      showPGNav(){
        this.PGNavContent = !this.PGNavContent;
        setTimeout(() => {
          this.PGNavShow = !this.PGNavShow;
        }, 100);
      },
      goHome(){
        this.$router.push('/');
        this.isHome = true;
        this.showPGNav();
      },
      backPage(){
        this.$router.go(-1);
      }
    }
  };
</script>