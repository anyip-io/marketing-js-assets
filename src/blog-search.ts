import '$utils/blog/blog-search.css';

import initBlogSearch from '$utils/blog/blog-search';
import initEllipsis from '$utils/blog/ellipsis';

window.Webflow ||= [];

window.Webflow.push(() => {
  initEllipsis();
  initBlogSearch();
});
