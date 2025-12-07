// js/app.js

// Simple in-memory cart
let cart = [];

// DOM elements
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const purchaseBtn = document.getElementById("purchase-btn");
const purchaseMessageEl = document.getElementById("purchase-message");

// Attach click handlers to "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

addToCartButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".product-card");
    const id = card.getAttribute("data-id");
    const name = card.getAttribute("data-name");
    const price = Number(card.getAttribute("data-price"));

    addToCart({ id, name, price });
  });
});

function addToCart(product) {
  cart.push(product);
  renderCart();
}

function renderCart() {
  cartItemsEl.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;

    cartItemsEl.appendChild(li);
  });

  cartTotalEl.textContent = total.toString();

  purchaseBtn.disabled = cart.length === 0;
}

// Handle purchase click
purchaseBtn.addEventListener("click", () => {
  if (cart.length === 0) return;

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  // Simple generated order ID and name
  const orderId = "ORDER_" + Date.now();
  const orderName = `Order for ${cart.length} item(s)`;
  const currency = "INR";

  // Convert cart items to GA4 ecommerce format
  const itemsForEcommerce = cart.map((item, index) => ({
    item_id: item.id,
    item_name: item.name,
    price: item.price,
    quantity: 1,
    index
  }));

  // ✅ Send to dataLayer (function from gtm-events.js)
  sendPurchaseToDataLayer({
    orderId,
    orderName,
    totalAmount,
    currency,
    items: itemsForEcommerce
  });

  // Show message in UI
  purchaseMessageEl.textContent =
    "Purchase event sent to GTM! Check Preview mode or GA4 DebugView.";

  // Clear cart
  cart = [];
  renderCart();
});
// app.js file 
