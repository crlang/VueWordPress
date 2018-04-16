<template>
  <div id="app">
    <fixed_header></fixed_header>
    <router-view></router-view>
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
    };
  },
  components: {
    fixed_header,
    fixed_footer
  },
  mounted: function () {
  },
  methods: {
  }
};
</script>
