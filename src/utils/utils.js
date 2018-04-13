exports.install = function (Vue, options) {
  Vue.prototype.formatTime = formatTime;
  Vue.prototype.formatTTime = formatTTime;
  Vue.prototype.PGTitle = AllPageTitle;
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
-------  All static Page title  -------
----------------------------------------*/
let AllPageTitle = {
  home: "文章列表"
};