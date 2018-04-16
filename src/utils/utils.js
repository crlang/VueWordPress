import {WPBlogSiteUrl, apiUrl, siteLanguage} from "./api.js";
import as from "axios";
import weuijs from "weui.js";

exports.install = function (Vue, options) {
  Vue.prototype.formatTime = formatTime;
  Vue.prototype.formatTTime = formatTTime;
  Vue.prototype.PGTitle = AllPageTitle;
  Vue.prototype.siteConfig = siteConfig;
  Vue.prototype.replaceImgUrl = replaceImgUrl;
  Vue.prototype.weui = weuijs;
  Vue.prototype.replaceFeaturesImg = replaceFeaturesImg;
};

/*----------------------------------------
-------------  format  time  -------------
----------------------------------------*/
function formatTime(val){
  var date = new Date(val);
  let result = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  return result;
}

/*----------------------------------------
---------  format time in china  ---------
----------------------------------------*/
function formatTTime(val) {
  // ...
  let resule = new Date(val).toLocaleString().replace(/[年月]/g,'-').replace(/[日上下午]/g,'');
  return resule;
}

// Add website URL prefix for url
function replaceImgUrl(strs){
  let hzreg = /((href|src)="\/)/g; // wordpress media path !!!
  var st = strs.replace(hzreg,function(a){
    if (a === 'href="/') {
      return 'href="' + WPBlogSiteUrl + '/';
    }else if(a === 'src="/') {
      return 'src="' + WPBlogSiteUrl + '/';
    }
  });
  return st;
}

// replace Features Img
function replaceFeaturesImg(data) {
  let newImgData = [],
    defaultIMG = '/src/assets/images/logo.png';
  for (const i in data) {
    if (data.hasOwnProperty(i)) {
      if (data[i]._embedded["wp:featuredmedia"] !== undefined) {
        if (data[i]._embedded["wp:featuredmedia"][0].code === "rest_post_invalid_id") {
          data[i].featured_media = defaultIMG;
        }else{
          data[i].featured_media = data[i]._embedded["wp:featuredmedia"][0].source_url;
        }
      }else{
        data[i].featured_media = defaultIMG;
      }
      newImgData.push(data[i]);
    }
  }
  console.log("n",newImgData);

  return newImgData;
}

/*----------------------------------------
-------------  site configs  -------------
----------------------------------------*/
function siteConfig(callback) {
  as.get(WPBlogSiteUrl + "/wp-json").then(res => {
    let result = {
      name: res.data.name,
      description: res.data.description,
      home: res.data.home,
      url: res.data.url
    };
    typeof callback === 'function' && callback.call(window,result);
    return result;
  });
}

/*----------------------------------------
-------  All static Page title  -------
----------------------------------------*/
let AllPageTitle = '';
if (siteLanguage === 'english') {
  AllPageTitle = {
    home: "Home",
    back: "Back",
    topic: "Topic",
    post: "Post",
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
    fixedfooter: {
      home: "home",
      topic: "topic",
      post: "post",
      tags: "tags",
      member: "member"
    }
  };
}else if(siteLanguage === 'chinese') {
  AllPageTitle = {
    home: "首页",
    back: "返回",
    topic: "专题中心",
    post: "发布文章",
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
    fixedfooter: {
      home: "首页",
      topic: "专题",
      post: "发布",
      tags: "标签",
      member: "我的"
    }
  };
}
