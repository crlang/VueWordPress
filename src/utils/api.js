import axios from "axios";

/* WordPress Site URL */
export let WPBlogSiteUrl = "wordpress.com";
/* If The Site Is HTTPS*/
const siteIsSafe = false;

/*!!! danger !!!*/
/*!!! ojbk, do not modify !!!*/
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