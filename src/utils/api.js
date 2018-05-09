import axios from "axios";

/* Your WordPress site URL, do not add http:// */
export let WPBlogSiteUrl = "wordpress.crlang.com";
/* default chinese, options: chinese english */
export let siteLanguage = 'chinese';
/* if true, the site mush be HTTPS protocol*/
const siteIsSafe = true;

/*!!!!!!!!!!!!!!!!!!!!!!!!!!!! danger !!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
/*!!!!!!!!!!!!!!!!!!!!! ojbk , do not modify !!!!!!!!!!!!!!!!!!!!!*/
if (siteIsSafe) {
  WPBlogSiteUrl = "https://" + WPBlogSiteUrl;
}else{
  WPBlogSiteUrl = "http://" + WPBlogSiteUrl;
}

let userToken = sessionStorage.getItem("userToken") || null;
if (userToken !== null) {
  userToken = 'Bearer' + userToken;
}else{
  userToken = '';
}
export const apiUrl = axios.create({
  baseURL: WPBlogSiteUrl + '/wp-json/wp/v2/',
  headers: {
    'content-type': 'application/json',
    'Authorization': userToken
  }
});