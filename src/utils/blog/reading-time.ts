export default () => {
  const content: HTMLElement | null = document.querySelector('.read-content');

  if (!content) {
    return;
  }
  const txt: string = content.textContent || '';

  const wordCount: number = txt.replace(/[^\w ]/g, '').split(/\s+/).length;

  const readingTimeInMinutes: number = Math.floor(wordCount / 228) + 1;
  const readingTimeAsString: string = readingTimeInMinutes + ' min';

  const readTimeElement: HTMLElement | null = document.querySelector('.read-time');
  if (readTimeElement) {
    readTimeElement.innerHTML = readingTimeAsString;
  }
};
