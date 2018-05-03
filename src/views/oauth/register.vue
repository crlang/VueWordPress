<template>
  <div class="post">
    <div class="wrap">
      register page
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  mounted: function() {
    this.showPGConfig();
  },
  methods: {
    showPGConfig(){
      this.$store.commit('newTitle', this.APLang.register);// page title
      this.$store.commit('showFooter', true);// footer if show
    },
  }
};
</script>
