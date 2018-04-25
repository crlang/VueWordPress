<template>
  <div class="member">
    <div class="wrap">
      member page
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
      this.$store.commit('newTitle', this.APLang.member);// page title
      this.$store.commit('showFooter', true);// footer if show
    },
  }
};
</script>