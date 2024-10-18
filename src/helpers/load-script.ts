export default (
  FILE_URL: string,
  defer = true,
  type = 'text/javascript'
): Promise<{ status: boolean; message?: string }> => {
  return new Promise((resolve, reject) => {
    try {
      const scriptEle = document.createElement('script');
      scriptEle.type = type;
      scriptEle.defer = defer;
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

      document.getElementsByTagName('head')[0].appendChild(scriptEle);
    } catch (error) {
      reject({
        status: false,
        message: `An error occurred while loading the script ${FILE_URL}`,
      });
    }
  });
};
