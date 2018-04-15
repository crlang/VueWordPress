import axios from "axios";

/* default chinese, options: chinese english */
export let siteLanguage = 'chinese';
/* WordPress site URL, do not add http:// */
export let WPBlogSiteUrl = "wordpress.com";
/* if true, the site mush be HTTPS protocol*/
const siteIsSafe = false;


/*!!!!!!!!!!!!!!!!!!!!!!!!!!!! danger !!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
/*!!!!!!!!!!!!!!!!!!!!! ojbk , do not modify !!!!!!!!!!!!!!!!!!!!!*/
if (siteIsSafe) {
  WPBlogSiteUrl = "https://" + WPBlogSiteUrl;
}else{
  WPBlogSiteUrl = "http://" + WPBlogSiteUrl;
}

export const apiUrl = axios.create({
  baseURL: WPBlogSiteUrl + `/wp-json/wp/v2/`,
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'Authorization': 'Bearer {token}'
  }
});