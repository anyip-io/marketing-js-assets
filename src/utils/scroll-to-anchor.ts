export default () => {
  document.addEventListener('DOMContentLoaded', function () {
    // Select all headings from h1 to h6
    const headings = document.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6');

    headings.forEach((heading: HTMLElement) => {
      // Generate a unique ID for each heading based on its text content
      const id: string =
        heading.textContent
          ?.toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '') || '';

      // Assign the generated ID to the heading
      heading.id = id;
    });

    // Get the anchor from the URL (if any)
    const url: URL = new URL(window.location.href);
    const anchor: string = url.hash.substring(1); // Remove the '#' symbol

    if (anchor) {
      // Find the element with that ID
      const element = document.getElementById(anchor);

      if (element) {
        // Scroll to the element
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
};
