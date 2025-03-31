import posthog from 'posthog-js';

// Declare PostHog on window object
declare global {
  interface Window {
    posthog: typeof posthog;
    scrollDepthTracked?: number[];
    blogTimeTracker?: number;
  }
}

// Initialize PostHog with your project API key
const POSTHOG_API_KEY = 'phc_EkLFWyh0N4wohGdk6U1nWfi0mtFaMmQZLeIgkIs1VvZ'; // Replace with your actual PostHog API key
const POSTHOG_HOST = 'https://ph.anyip.io'; // Replace with your PostHog host URL

// Initialize PostHog
export function initPostHog() {
  if (typeof window !== 'undefined') {
    posthog.init(POSTHOG_API_KEY, {
      api_host: POSTHOG_HOST,
    });

    // Attach PostHog to window object
    window.posthog = posthog;
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

// Function to track scroll depth for blog pages
export function trackBlogScrollDepth() {
  if (typeof window === 'undefined') return;

  // Only track if we're on a blog page
  if (!window.location.pathname.startsWith('/blog')) return;

  // Track scroll depth at 25%, 50%, and 75%
  document.addEventListener('scroll', function () {
    // Capture current page URL and pathname
    const currentUrl = window.location.href;
    const currentPathname = window.location.pathname;

    // Calculate the total scrollable page length
    const pageLength = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);

    // Get current scroll position
    const scrollPosition = window.scrollY || window.pageYOffset;
    const viewportHeight = window.innerHeight;

    // Calculate how far down the page the user has scrolled as a percentage
    const scrollPercentage = Math.round(((scrollPosition + viewportHeight) / pageLength) * 100);

    // Define the scroll depths we want to track
    const depthMarkers = [25, 50, 75];

    // Track which depths have been triggered
    if (!window.scrollDepthTracked) {
      window.scrollDepthTracked = [];
    }

    // Check if we've passed any of our target scroll depths
    depthMarkers.forEach(function (depth) {
      if (scrollPercentage >= depth && !window.scrollDepthTracked!.includes(depth)) {
        // Mark this depth as tracked so we don't trigger it again
        window.scrollDepthTracked!.push(depth);

        // Send the PostHog event with the specific depth and additional properties
        trackEvent('Scroll depth', {
          depth: depth,
          url: currentUrl,
          pathname: currentPathname,
          page_length: pageLength,
        });
      }
    });
  });
}

// Function to track time spent on blog pages
export function trackBlogTime() {
  if (typeof window === 'undefined') return;

  // Only track if we're on a blog page
  if (!window.location.pathname.startsWith('/blog')) return;

  let timer = 0;
  window.blogTimeTracker = 0;

  // Function to track time
  function trackTime() {
    timer += 1; // Increment by 1 second
    window.blogTimeTracker = timer;

    // Define when to send events
    const timeMilestones = [15, 30, 60, 120, 180, 240];

    if (timeMilestones.includes(timer)) {
      trackEvent('Time spent on blog', {
        time_spent: timer,
        url: window.location.href,
        pathname: window.location.pathname,
        page_length: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
      });
    }
  }

  // Start tracking every second
  setInterval(trackTime, 1000);
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
  trackBlogScrollDepth();
  trackBlogTime();
};
