<template>
  <div class="tags">
    <div class="wrap">
      tags page
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
      this.$store.commit('newTitle', this.PGTitle.tags);// page title
      this.$store.commit('showFooter', true);// footer if show
    },
  }
};
</script>