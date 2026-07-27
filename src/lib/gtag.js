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
export const event = ({ action, category, label, value }) => {
  if (isProduction && typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
