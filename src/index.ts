import initMetaTags from '$utils/meta-tags';
import initPaymentSlider from '$utils/payment-slider';
import initScrollToAnchor from '$utils/scroll-to-anchor';
import initStructuredData from '$utils/structured-data';
import initTopNavigationWrapper from '$utils/top-navigation-wrapper';
import initVendors from '$utils/vendors';

window.Webflow ||= [];

window.Webflow.push(() => {
  initMetaTags();
  initPaymentSlider();
  initScrollToAnchor();
  initVendors();
  initTopNavigationWrapper();
  initStructuredData();
});
