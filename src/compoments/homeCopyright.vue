<template>
<div class="weui-footer">
  <p class="weui-footer__links">
    <a href="vuejs.org" class="weui-footer__link">Vue</a>
    <a href="wordpress.org" class="weui-footer__link">wordpress</a>
  </p>
  <p class="weui-footer__text">Copyright &copy; {{dateYear}} {{copy}}</p>
</div>
</template>

<script>
export default {
  data() {
    return {
      copy: '',
      dateYear: ''
    };
  },
  mounted: function () {
    this.getYear();
    this.siteConfig(data=>{
      this.copy = data.name;
    });
  },
  methods: {
    getYear(){
      let newYear = new Date();
      let curYear = newYear.getFullYear();
      this.dateYear = curYear;
    }
  }
};
</script>