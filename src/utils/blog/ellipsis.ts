export default () => {
  const pTags: NodeListOf<HTMLElement> = document.querySelectorAll('.limited-text-80');

  pTags.forEach((pTag: HTMLElement) => {
    const text: string = pTag.innerHTML;

    if (text.length > 80) {
      const visibleText: string = text.substring(0, 80) + '...';
      pTag.innerHTML = visibleText;
    }
  });
};
