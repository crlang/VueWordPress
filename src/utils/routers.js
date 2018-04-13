import Vue from 'vue';
import Router from 'vue-router';
import ArticleList from '../views/articles.vue';
import Article from '../views/article.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ArticleList',
      component: ArticleList
    },
    {
      path: '/article/:id',
      name: 'Article',
      title: '',
      component: Article
    }
  ]
});