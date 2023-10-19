export default () => {
  // Get the URL from the browser without query parameters and fragments
  const urlPath = window.location.origin + window.location.pathname;

  // Check for the meta og:url tag
  const ogURL = document.querySelector('meta[property="og:url"]');

  // Add the meta og:url tag if not found
  if (!ogURL) {
    const meta = document.createElement('meta');
    meta.setAttribute('property', 'og:url');
    meta.setAttribute('content', urlPath);
    document.head.appendChild(meta);
  } else {
    // If the og:url meta tag already exists, update its content
    ogURL.setAttribute('content', urlPath);
  }
};
