<template>
  <div class="tags">
    <div class="wrap">
      <div class="tags-content">
        <ul>
          <router-link v-for="item in tagsData" :key="item.id" v-html="item.name + '(' + item.count+ ')'" :to="'tag/' + item.id" tag="li" ref="ele"></router-link>
        </ul>
        <div class="list-loading">
          <a href="javascript:;" class="weui-btn weui-btn_default" @click="getMore" v-if="loadMore">{{Tran_loadMore}}</a>
          <div class="weui-loadmore weui-loadmore_line" v-else>
            <span class="weui-loadmore__tips">{{Tran_noneMore}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {apiUrl} from '../utils/api.js';

export default {
  data() {
    return {
      tagsData: [],
      Tran_noneMore: this.APLang.noneMore,
      Tran_loadMore: this.APLang.loadMore,
      loadMore: false,
      pages: {
        page_count: 0,
        page: 1,
        per_page: 35
      }
    };
  },
  created() {
  },
  mounted() {
    this.showPGConfig();
    this.getTages();
  },
  destroyed() {

  },
  methods: {
    showPGConfig(){
      this.$store.commit('newTitle', this.APLang.tags);// page title
      this.$store.commit('showFooter', true);// footer if show
    },

    // get tag list
    // get -> tags
    /*
     * orderby:    some way by order, options: [id,include,name,slug,include_slugs,term_group,description,count]
     * order:      default asc, options: [asc,desc]
     * _embed:     if true, output article featured image
    */
    getTages() {
      this.weui.loading(this.APLang.loading);

      apiUrl.get("tags",{
        params: {
          orderby: 'count',
          order: 'desc',
          page: this.pages.page,
          per_page: this.pages.per_page
        }
      }).then(res => {
        this.tagsData = this.tagsData.concat(res.data);

        if (this.pages.page_count === 0) {
          this.pages.page_count = parseInt(res.headers['x-wp-totalpages']);
        }
        if(this.pages.page_count > 1) {
          this.loadMore = true;
        }else{
          this.loadMore = false;
        }
        this.weui.loading().hide();
      }).catch(err => {
        this.responseError(err);
        this.weui.loading().hide();
      });
    },

    // show more data
    getMore() {
      this.pages.page += 1;
      this.pages.page_count -= 1;
      this.loadMore = true;
      this.getTages();
    },
  }
};
</script>