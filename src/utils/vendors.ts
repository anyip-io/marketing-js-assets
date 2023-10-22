/* eslint-disable */
// @ts-nocheck

import loadScript from "$helpers/load-script";



export default () => {
    const bentoInit = () => {
      bento$(function() {
        bento.trackSubdomains(['dashboard.anyip.io']);
        bento.showChat();
        bento.view();
      });
    }
    loadScript("https://ab.anyip.io/c8f1fa765828a5914ee25b321165dc54.js", true, "text/javascript")
    .then(() => {
      if (typeof(bento$) !== 'undefined') {
        bentoInit();
      } else {
        window.addEventListener("bento:ready", function () {
          bentoInit();
        });
      }
    })
    .catch((error) => {});
  
  // @ts-nocheck
  loadScript("https://script.tapfiliate.com/tapfiliate.js", true, "text/javascript")
    .then(() => {
      
      (function(t: any, a: string, p: any) {
        t.TapfiliateObject = a;
        t[a] = t[a] || function() {
          (t[a].q = t[a].q || []).push(arguments);
        };
      })(window, 'tap');
  
      tap('create', '39657-462bef', { integration: "javascript" });
      tap('detect');
    })
    .catch((error) => {});
};
