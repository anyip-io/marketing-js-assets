export default () => {
  document.addEventListener('DOMContentLoaded', () => {
    // Extract FAQ questions and answers starting from the <h2> with content "FAQs"
    const allH2s: NodeListOf<HTMLElement> = document.querySelectorAll('#content h2');
    let startElement: HTMLElement | null = null;

    allH2s.forEach((h2: HTMLElement) => {
      if (h2.textContent && h2.textContent.trim() === 'FAQs') {
        startElement = h2;
      }
    });

    if (startElement === null) return; // Exit if the starting point is not found

    startElement = startElement as HTMLElement;

    let currentElement: Element | null = startElement.nextElementSibling as HTMLElement | null;
    const faqStructuredData: { [key: string]: any } = {
      '@type': 'FAQPage',
      mainEntity: [],
    };

    while (currentElement) {
      // Look for <h3> elements, assuming they are the questions
      if (currentElement.tagName === 'H3') {
        const question: string = currentElement.textContent
          ? currentElement.textContent.trim()
          : '';

        // Gather subsequent <p> elements as the answer
        let answerText = '';
        let answerElement: Element | null = currentElement.nextElementSibling;
        while (answerElement && answerElement.tagName !== 'H3') {
          answerText += answerElement.textContent ? answerElement.textContent.trim() + ' ' : '';
          answerElement = answerElement.nextElementSibling;
        }

        faqStructuredData.mainEntity.push({
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: answerText.trim(),
          },
        });
      }

      currentElement = currentElement.nextElementSibling;
    }

    // Fetch the existing structured data and augment it with the FAQPage structured data
    const structuredDataScript: HTMLScriptElement | null = document.querySelector(
      'script[type="application/ld+json"]'
    );
    if (structuredDataScript && structuredDataScript.textContent) {
      const structuredData: { [key: string]: any } = JSON.parse(structuredDataScript.textContent);
      structuredData['@graph'].push(faqStructuredData);

      // Update the structured data in the document
      structuredDataScript.textContent = JSON.stringify(structuredData);
    }
  });
};
