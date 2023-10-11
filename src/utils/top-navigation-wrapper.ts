export default () => {
  const topNavigationWrap = document.querySelector('.top-navigation-wrap') as HTMLElement | null;

  // Event listener for the close button
  document.querySelector('.navigation-close-button-wrap')?.addEventListener('click', function () {
    if (topNavigationWrap !== null) {
      topNavigationWrap.style.display = 'none';
    }
  });
};
