import Vue from 'vue';
import Router from 'vue-router';
import ArticleList from '../views/articles.vue';
import Article from '../views/article.vue';
import pageList from '../views/pages.vue';
import page from '../views/page.vue';
import post from '../views/post.vue';
import tags from '../views/tags.vue';
import member from '../views/member.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: ArticleList
    },
    {
      path: '/article/:id',
      component: Article
    },
    {
      path: '/topic',
      component: pageList
    },
    {
      path: '/topic/:slug',
      component: page
    },
    {
      path: '/post',
      component: post
    },
    {
      path: '/tags',
      component: tags
    },
    {
      path: '/member',
      component: member
    }
  ]
});