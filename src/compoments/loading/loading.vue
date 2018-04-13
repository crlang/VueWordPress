<template>
  <div class="page-loading" v-if="loading">
    <div class="v-dot v-dot1">
      <div class="v-dot v-dot2">
      </div>
      <div class="v-dot v-dot3">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
};
</script>