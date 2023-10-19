import './toc.css';

export default () => {
  const observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const id: string | null = entry.target.getAttribute('id');

        if (entry.isIntersecting) {
          document.querySelectorAll('.active').forEach((z: Element) => {
            z.classList.remove('active');
          });
          const anchorElement: Element | null = document.querySelector(`a[href="#${id}"]`);
          if (anchorElement) {
            anchorElement.classList.add('active');
          }
        }
      });
    },
    { rootMargin: '0px 0px -75% 0px' }
  );

  function strip(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }

  document
    .getElementById('content')
    ?.querySelectorAll('h2,h3')
    .forEach((heading: Element) => {
      observer.observe(heading);
      const strippedInnerHtml: string = strip(heading.innerHTML);
      const str: string = strippedInnerHtml
        .replace(/\s+/g, '-')
        .replace(/[°&\/\\#,+()$~%.'":;*?<>{}]/g, '')
        .toLowerCase();
      heading.setAttribute('id', str);
      const item: HTMLAnchorElement = document.createElement('a');
      const displayText: string = strippedInnerHtml;
      const MAX_LENGTH = 120;
      const truncatedItem: string =
        displayText.length > MAX_LENGTH ? displayText.slice(0, MAX_LENGTH - 1) + '…' : displayText;
      item.innerHTML = truncatedItem;
      'h2,h3'.split(/[, ]+/).forEach((x: string) => {
        if (heading.tagName.toLowerCase() === x) {
          item.classList.add('toc-item', 'toc-' + x);
        }
      });
      item.setAttribute('href', '#' + str);
      document.querySelector('#toc')?.appendChild(item);
    });
};
