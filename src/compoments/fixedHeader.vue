<template>
  <div class="fixed-header">
    <div class="top-bar">
      <div class="pg-back"><i class="iconfont icon-back" @click="backPage"></i></div>
      <div class="pg-title">{{showPGTitle}}</div>
      <div class="pg-nav" v-if="PGNav" @click="showPGNav()"><i class="iconfont icon-lists2"></i></div>
    </div>
    <div class="pg-nav-content" v-if="PGNav && PGNavContent" :class="{show : PGNavShow}">
      <div class="weui-cells">
        <a class="weui-cell weui-cell_access" href="javascript:;">
          <div class="weui-cell__bd">
              <p>首页</p>
          </div>
          <div class="weui-cell__ft">
          </div>
        </a>
        <a class="weui-cell weui-cell_access" href="javascript:;">
          <div class="weui-cell__bd">
            <p>搜索</p>
          </div>
          <div class="weui-cell__ft">
          </div>
        </a>
        <a class="weui-cell weui-cell_access" href="javascript:;">
          <div class="weui-cell__bd">
            <p>关于</p>
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
        PGNav: true,
        PGNavContent: false,
        PGNavShow: false
      };
    },
    mounted: function(){
    },
    computed: {
      showPGTitle() {
        console.log("666",this.$store);
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
      backPage(){
        this.$router.go(-1);
      }
    }
  }
</script>