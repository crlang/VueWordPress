import {WPBlogSiteUrl, apiUrl} from "./api.js";
import AllPageLanguage from "./language.js";
import as from "axios";
import weuijs from "weui.js";

exports.install = function (Vue, options) {
  Vue.prototype.formatTime = formatTime;
  Vue.prototype.formatTTime = formatTTime;
  Vue.prototype.APLang = AllPageLanguage;
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

/*----------------------------------------
----  Add website URL prefix for url  ----
----------------------------------------*/
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

/*----------------------------------------
---------  replace Features Img  ---------
----------------------------------------*/
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