import '$utils/blog/blog.css';

import initEllipsis from '$utils/blog/ellipsis';
import initEmailForm from '$utils/blog/email-form';
import initHighlight from '$utils/blog/highlight';
import initImageZoom from '$utils/blog/image-zoom';
import initReadingTime from '$utils/blog/reading-time';
import initStructuredData from '$utils/blog/structured-data';
import initToc from '$utils/blog/toc';

window.Webflow ||= [];

window.Webflow.push(() => {
  initEllipsis();
  initEmailForm();
  initHighlight();
  initToc();
  initReadingTime();
  initStructuredData();
  initImageZoom();
});
