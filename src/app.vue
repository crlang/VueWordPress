<template>
  <div id="app">
    <fixed_header></fixed_header>
    <router-view v-on:xxxloading = "onShowLoadingChange"></router-view>
    <Loading :loading="loading"></Loading>
    <fixed_footer></fixed_footer>
  </div>
</template>

<script>
import fixed_header from "./compoments/fixedHeader.vue";
import fixed_footer from "./compoments/fixedFooter.vue";

export default {
  name: "app",
  data() {
    return {
      loading: false
    };
  },
  components: {
    fixed_header,
    fixed_footer
  },
  mounted: function () {
    this.isHome = true;
  },
  methods: {
    onShowLoadingChange() {
      this.loading = !this.loading;
    }
  }
};
</script>
