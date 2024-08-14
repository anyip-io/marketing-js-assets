/* eslint-disable */
// @ts-nocheck
import loadScript from '$helpers/load-script';

// Function to hide Section 1 and show Section 2
function showSearchResults(): void {
  const popularArticles = document.getElementById('popular-articles') as HTMLElement;
  const blogPost = document.getElementById('blog-post') as HTMLElement;

  if (popularArticles) {
    popularArticles.style.display = 'none';
  }

  if (blogPost) {
    blogPost.style.display = 'block';
  }
}

// Function to show Section 1 and hide Section 2
function showDefaultView(): void {
  const popularArticles = document.getElementById('popular-articles') as HTMLElement;
  const blogPost = document.getElementById('blog-post') as HTMLElement;

  if (popularArticles) {
    popularArticles.style.display = 'block';
  }

  if (blogPost) {
    blogPost.style.display = 'block';
  }
}

// Function to handle search input changes
function handleSearchInput(): void {
  const searchInput = document.getElementById('search') as HTMLInputElement;

  if (searchInput) {
    if (searchInput.value.trim() !== '') {
      // When there is text in the search input
      showSearchResults();

      // Trigger Jetboost search (replace 'your-jetboost-widget-id' with your actual ID)
      window.jetboost.search('search', searchInput.value.trim());
    } else {
      // When the search input is empty
      showDefaultView();
    }
  }
}

export default async () => {
  window.JETBOOST_SITE_ID = 'clmotuhd500x30qu7ckw9ezsy';

  await loadScript('https://cdn.jetboost.io/jetboost.js');

  const paginationButtonsWrapper = document.querySelector(
    '.pagination-button-wrapper'
  ) as HTMLElement;
  const paginationButtonClassName = 'pagination-button';

  const scrollTarget = document.querySelector('.blog-post-collection-wrapper') as HTMLElement;
  const scrollOffset = 300; // number in pixels for distance to stop from the top
  const scrollDelay = 0; // in milliseconds before starting scroll action

  paginationButtonsWrapper.addEventListener('click', function (e: Event) {
    const buttonTypes = ['A', 'BUTTON'];

    setTimeout(function () {
      const buttonElement = (e as MouseEvent).target as HTMLElement;
      const closestButtonElement = buttonElement.closest(
        `.${paginationButtonClassName}, .pagination-button-number`
      ) as HTMLElement | null;

      if (closestButtonElement && buttonTypes.includes(closestButtonElement.tagName)) {
        const y = scrollTarget.getBoundingClientRect().top + window.scrollY;
        window.scroll({
          top: y - scrollOffset,
          behavior: 'smooth',
        });
      }
    }, scrollDelay); // The delay in milliseconds (half a second)
  });

  // Attach event listener to the search input field
  const searchInput = document.getElementById('search') as HTMLInputElement;
  if (searchInput) {
    searchInput.addEventListener('input', handleSearchInput);
  }
};
