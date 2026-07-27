/**
 * openWhatsAppQuote
 * Opens WhatsApp Web with a pre-filled, professional quote request message
 * tailored to the specific service the user clicked.
 *
 * @param {string} serviceName - The exact service/package name from the card
 */
export function openWhatsAppQuote(serviceName) {
  const phone = "919392251739";

  const message = [
    "Hello Digital Marketing TenX! 👋",
    "",
    "I'm interested in your *" + serviceName + "* service and would like to request a quote.",
    "",
    "Could you please share the following details:",
    "• Pricing & packages available",
    "• Estimated timeline for delivery",
    "• What's included in the service",
    "• Next steps to get started",
    "",
    "Looking forward to hearing from you!",
  ].join("\n");

  const url =
    "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);

  window.open(url, "_blank");
}
