import posthog from 'posthog-js';

// Initialize PostHog with your project API key
const POSTHOG_API_KEY = 'phc_EkLFWyh0N4wohGdk6U1nWfi0mtFaMmQZLeIgkIs1VvZ'; // Replace with your actual PostHog API key
const POSTHOG_HOST = 'https://ph.anyip.io'; // Replace with your PostHog host URL

// Initialize PostHog
export function initPostHog() {
  if (typeof window !== 'undefined') {
    posthog.init(POSTHOG_API_KEY, {
      api_host: POSTHOG_HOST,
    });
  }
}

// Function to parse data-ph-track attribute
function parseTrackingData(element: HTMLElement): Record<string, string> | null {
  const trackingData = element.getAttribute('data-ph-track');
  if (!trackingData) return null;

  try {
    return trackingData.split('|').reduce((acc, item) => {
      const [key, value] = item.split(':');
      if (key && value) {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, string>);
  } catch (error) {
    console.error('Error parsing tracking data:', error);
    return null;
  }
}

// Function to get event name based on URL
function getEventNameForUrl(url: string): string | null {
  if (url.startsWith('https://meeting.anyip.io/meetings/benj/demo-call')) {
    return 'book_demo_click';
  }
  if (
    url.startsWith('https://anyip.io/account/register') ||
    url.startsWith('https://anyip.io/account/#/register')
  ) {
    return 'go_to_sign_up_page_click';
  }
  return null;
}

// Function to generate common context for tracking
function generateTrackingContext(
  element: HTMLElement,
  additionalContext: Record<string, any> = {}
): Record<string, any> {
  return {
    element_type: element.tagName.toLowerCase(),
    element_text: element.textContent?.trim(),
    action: 'click',
    ...additionalContext,
  };
}

// Function to track click events
export function trackClickEvents() {
  if (typeof window === 'undefined') return;

  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const element = target.closest('a, button, [data-ph-track]') as HTMLElement;

    if (element) {
      // Check for data-ph-track attribute first
      const trackingData = parseTrackingData(element);
      if (trackingData) {
        // Send event to PostHog using the name from trackingData
        posthog.capture(trackingData.name, {
          ...trackingData,
          ...generateTrackingContext(element),
        });
        return;
      }

      // Check for specific URLs
      const url = element.getAttribute('href');
      if (url) {
        const eventName = getEventNameForUrl(url);
        if (eventName) {
          posthog.capture(eventName, generateTrackingContext(element, { url }));
        }
      }
    }
  });
}

// Function to manually track custom events
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window === 'undefined') return;

  posthog.capture(eventName, {
    ...properties,
  });
}

// Export default initialization function
export default () => {
  initPostHog();
  trackClickEvents();
};
