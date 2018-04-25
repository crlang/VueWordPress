import {siteLanguage} from "./api.js";

/*----------------------------------------
-------  All static Page title  -------
----------------------------------------*/
let AllPageLanguage = '';
if (siteLanguage === 'english') {
  AllPageLanguage = {
    home: "Home",
    back: "Back",
    topic: "Topic",
    post: "Post",
    article: "Article",
    articles: "Article List",
    tag: "Tag",
    tags: "Tags",
    member: "Member",
    about: "About",
    search: "Search",
    author: "Author",
    time: "Time",
    date: "Date",
    loading: "Loading...",
    noneMore: "No data",
    loadMore: "Load More",
    unknownMistake: "Unknown Mistake",
    media: "Media",
    comments: "Comments",
    comment: "comment",
    newcomment: "default",
    oldcomment: "older",
    commentLink: "Post Link",
    login: "Login In",
    register: "Login Up",
    homeCategories: {
      media: "Gallery",
      article: "Article",
      comments: "Comments",
      login: "Login"
    },
    fixedfooter: {
      home: "home",
      topic: "topic",
      post: "post",
      tags: "tags",
      member: "member"
    }
  };
}else if(siteLanguage === 'chinese') {
  AllPageLanguage = {
    home: "首页",
    back: "返回",
    topic: "专题中心",
    post: "发布文章",
    article: "文章",
    articles: "文章列表",
    tag: "标签",
    tags: "标签云",
    member: "用户中心",
    about: "关于",
    search: "搜索",
    author: "作者",
    time: "时间",
    date: "日期",
    loading: "正在加载",
    noneMore: "暂无数据",
    loadMore: "加载更多",
    unknownMistake: "未知错误",
    media: "图库中心",
    comments: "言论中心",
    comment: "评论",
    newComments: "最新评论",
    oldComments: "最旧评论",
    commentLink: "文章链接",
    login: "登陆",
    register: "注册",
    homeCategories: {
      media: "图库",
      article: "文章",
      comments: "言论",
      login: "登陆"
    },
    fixedfooter: {
      home: "首页",
      topic: "专题",
      post: "发布",
      tags: "标签",
      member: "我的"
    }
  };
}
export default AllPageLanguage;