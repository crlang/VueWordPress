<template>
  <div class="login">
    <div class="wrap">
      login page
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: []
    };
  },
  mounted () {
    this.showPGConfig();
  },
  methods: {
    // site config
    showPGConfig(){
      this.$store.commit('newTitle', this.APLang.login);// page title
      this.$store.commit('showFooter', false);// footer if show
    }
  }
};
</script>
