interface IQuestionAnswer {
  '@type': string;
  name: string;
  acceptedAnswer: {
    '@type': string;
    text: string;
  };
}

interface IFAQPage {
  '@type': string;
  mainEntity: IQuestionAnswer[];
}

interface IImageObject {
  '@type'?: string;
  url?: string | null;
  contentUrl?: string | null;
  caption?: string | null;
  inLanguage?: string;
}

interface IHowToStep {
  '@type': string;
  name: string;
  text: string;
  position: number;
  url: string;
  image: IImageObject;
}

interface IHowTo {
  '@context': string;
  '@type': string;
  name: string;
  step: IHowToStep[];
}

export default () => {
  // Find the existing structured data
  const structuredDataScript = document.querySelector(
    'script[type="application/ld+json"]'
  ) as HTMLScriptElement;
  const structuredData = JSON.parse(structuredDataScript.textContent || '');

  // Find all question and answer pairs
  const faqs = document.querySelectorAll('.faq-singel-wrapper');
  const faqStructuredData: IFAQPage = {
    '@type': 'FAQPage',
    mainEntity: [],
  };

  faqs.forEach((faq) => {
    const question =
      (faq.querySelector('.faq-question') as HTMLElement).textContent
        ?.trim()
        .replace(/^\d+\.\s*/, '') || '';
    const answer =
      (faq.querySelector('.paragraph.for-faq') as HTMLElement).textContent?.trim() || '';

    faqStructuredData.mainEntity.push({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    });
  });

  if (faqStructuredData.mainEntity.length > 0) {
    // Add the FAQPage structured data to the existing structured data
    structuredData['@graph'].push(faqStructuredData);
  }

  // Update the structured data script in the DOM
  structuredDataScript.textContent = JSON.stringify(structuredData);

  // Get all the steps based on a consistent selector (e.g., .best-features-mini-title)
  const steps = document.querySelectorAll('.best-features-mini-title');

  // Extract the name for the HowTo schema
  const howToNameElem = document.querySelector(
    '.section.best-features .section-title'
  ) as HTMLElement;
  const howToName = howToNameElem
    ? howToNameElem.textContent?.trim() || ''
    : 'How to Get Started with anyIP';

  const lang = document.documentElement.getAttribute('lang') || 'en';

  const howToSteps: IHowToStep[] = [];

  steps.forEach((stepElem: Element, index: number) => {
    // Locate the parent that holds both the title and details for the step
    const stepParent = stepElem.closest('.best-features-grid-wrapper') as HTMLElement;

    const titleElem = stepParent.querySelector('.best-features-title') as HTMLElement;
    const detailElem = stepParent.querySelector('.best-features-details') as HTMLElement;
    const imgElem = stepParent.querySelector('.best-features-chart') as HTMLImageElement;

    // Extracting the image URL and creating an ImageObject schema
    let imageSchema: IImageObject = {};
    if (imgElem) {
      const imageUrl = imgElem.getAttribute('src');
      imageSchema = {
        '@type': 'ImageObject',
        url: imageUrl,
        contentUrl: imageUrl,
        caption: imgElem.getAttribute('alt') || '',
        inLanguage: lang,
      };
    }

    // Extracting the URL to the step, anchored to the step's title
    const stepUrl = `${window.location.href}#${titleElem.textContent
      ?.trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .toLowerCase()}`;

    // Create the schema for this step
    const stepSchema = {
      '@type': 'HowToStep',
      name: titleElem.textContent?.trim() || '',
      text: detailElem.textContent?.trim() || '',
      position: index + 1,
      url: stepUrl,
      image: imageSchema,
    };

    howToSteps.push(stepSchema);
  });

  // Complete the HowTo schema
  const howToSchema: IHowTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howToName,
    step: howToSteps,
  };

  // Append this schema to the existing structured data
  const existingSchemaScript = document.querySelector(
    'script[type="application/ld+json"]'
  ) as HTMLScriptElement;
  const existingSchema = JSON.parse(existingSchemaScript.textContent || '');

  if (howToSchema.step.length > 0) {
    existingSchema['@graph'].push(howToSchema);
  }

  // Update the structured data in the document
  existingSchemaScript.textContent = JSON.stringify(existingSchema);
};
