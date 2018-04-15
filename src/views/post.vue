<template>
  <div class="post">
    <div class="wrap">
      post page
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
      this.$store.commit('newTitle', this.PGTitle.topic);// page title
      this.$store.commit('showFooter', true);// footer if show
    },
  }
};
</script>
