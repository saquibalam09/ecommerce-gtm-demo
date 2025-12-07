// js/gtm-events.js

// Make sure dataLayer exists
window.dataLayer = window.dataLayer || [];

/**
 * Sends a purchase event to the dataLayer for GTM.
 * 
 * @param {Object} params
 * @param {string} params.orderId
 * @param {string} params.orderName
 * @param {number} params.totalAmount
 * @param {string} params.currency
 * @param {Array}  params.items
 */
function sendPurchaseToDataLayer({ orderId, orderName, totalAmount, currency, items }) {
  const eventData = {
    event: "purchase",
    order_id: orderId,
    order_name: orderName,
    order_value: totalAmount,
    order_currency: currency,
    // Recommended GA4 ecommerce structure:
    ecommerce: {
      transaction_id: orderId,
      value: totalAmount,
      currency: currency,
      items: items
    }
  };

  console.log("🔵 Pushing purchase event to dataLayer:", eventData);
  window.dataLayer.push(eventData);
}
