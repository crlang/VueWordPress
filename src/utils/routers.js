import Vue from 'vue';
import Router from 'vue-router';
import home from '../views/home.vue';
import ArticleList from '../views/articles.vue';
import Article from '../views/article.vue';
import pageList from '../views/pages.vue';
import page from '../views/page.vue';
import post from '../views/post.vue';
import tags from '../views/tags.vue';
import tag from '../views/tag.vue';
import media from '../views/media.vue';
import comments from '../views/comments.vue';
import login from '../views/oauth/login.vue';
import register from '../views/oauth/register.vue';
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
      component: home
    },
    {
      path: '/articles',
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
      path: '/login',
      component: login
    },
    {
      path: '/register',
      component: register
    },
    {
      path: '/member',
      name: 'member',
      component: member
    },
    {
      path: '/media',
      component: media
    },
    {
      path: '/comments',
      component: comments
    }
  ]
});