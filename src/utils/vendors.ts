/* eslint-disable */
// @ts-nocheck

const loadScript = (
  FILE_URL: string,
  async = true,
  type = 'text/javascript'
): Promise<{ status: boolean; message?: string }> => {
  return new Promise((resolve, reject) => {
    try {
      const scriptEle = document.createElement('script');
      scriptEle.type = type;
      scriptEle.async = async;
      scriptEle.src = FILE_URL;

      scriptEle.addEventListener('load', () => {
        resolve({ status: true });
      });

      scriptEle.addEventListener('error', () => {
        reject({
          status: false,
          message: `Failed to load the script ${FILE_URL}`,
        });
      });

      document.body.appendChild(scriptEle);
    } catch (error) {
      reject({
        status: false,
        message: `An error occurred while loading the script ${FILE_URL}`,
      });
    }
  });
};

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
