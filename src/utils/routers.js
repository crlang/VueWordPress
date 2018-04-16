import Vue from 'vue';
import Router from 'vue-router';
import ArticleList from '../views/articles.vue';
import Article from '../views/article.vue';
import pageList from '../views/pages.vue';
import page from '../views/page.vue';
import post from '../views/post.vue';
import tags from '../views/tags.vue';
import tag from '../views/tag.vue';
import member from '../views/member.vue';

Vue.use(Router);

export default new Router({
  linkActiveClass: "weui-bar__item_on",
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: ArticleList
    },
    {
      path: '/article/:id',
      component: Article
    },
    {
      path: '/topic',
      name: 'topic',
      component: pageList
    },
    {
      path: '/topic/:slug',
      component: page
    },
    {
      path: '/post',
      name: 'post',
      component: post
    },
    {
      path: '/tags',
      name: 'tags',
      component: tags
    },
    {
      path: '/tag/:id',
      component: tag
    },
    {
      path: '/member',
      name: 'member',
      component: member
    }
  ]
});