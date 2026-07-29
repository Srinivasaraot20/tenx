export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Prevent errors if gtag is not available (e.g., during development or if blocked by adblockers)
const isProduction = process.env.NODE_ENV === "production";

// https://developers.google.com/analytics/devguides/collection/ga4/views?client_type=gtag
export const pageview = (url) => {
  if (isProduction && typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/ga4/events?client_type=gtag
export const event = (eventName, params = {}) => {
  if (isProduction && typeof window !== "undefined" && window.gtag) {
    // If called with older object signature {action, category, label, value}
    if (typeof eventName === "object" && eventName.action) {
      window.gtag("event", eventName.action, {
        event_category: eventName.category,
        event_label: eventName.label,
        value: eventName.value,
        ...params
      });
      return;
    }

    // Modern GA4 custom event tracking
    const device_type = window.innerWidth <= 768 ? "Mobile" : window.innerWidth <= 1024 ? "Tablet" : "Desktop";
    const page_url = window.location.pathname;

    window.gtag("event", eventName, {
      device_type,
      page_url,
      ...params,
    });
  }
};
