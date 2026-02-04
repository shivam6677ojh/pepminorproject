// Cart page logic (cart.html)

function getCartFromStorage() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCartToStorage(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
    const cart = getCartFromStorage();
    const cartItems = document.getElementById("cartItems");
    const totalPrice = document.getElementById("totalPrice");
    const emptyMessage = document.getElementById("emptyMessage");
    const cartContent = document.getElementById("cartContent");

    if (!cartItems || !totalPrice) return;

    let total = 0;
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        if (emptyMessage) emptyMessage.style.display = "block";
        if (cartContent) cartContent.style.display = "none";
        if (totalPrice) totalPrice.textContent = "Total: ₹0";
    } else {
        if (emptyMessage) emptyMessage.style.display = "none";
        if (cartContent) cartContent.style.display = "block";

        cart.forEach((item, index) => {
            total += item.price * item.quantity;

            cartItems.innerHTML += `
        <div class="cart-item">
          <h3>${item.name}</h3>
           <img src="${item.image}" alt="${item.name}" width="100">  
          <p>₹${item.price}</p>
          <input type="number" value="${item.quantity}" min="1" onchange="updateQty(${index}, this.value)">
          <button onclick="removeItem(${index})">Remove</button>
        </div>
      `;
        });

        totalPrice.textContent = "Total: ₹" + total;
    }
}

function updateQty(index, qty) {
    let cart = getCartFromStorage();
    const quantity = Number(qty);
    if (quantity < 1 || Number.isNaN(quantity)) return;
    if (!cart[index]) return;

    cart[index].quantity = quantity;
    saveCartToStorage(cart);
    loadCart();
}

function removeItem(index) {
    let cart = getCartFromStorage();
    if (!cart[index]) return;

    cart.splice(index, 1);
    saveCartToStorage(cart);
    loadCart();
}

function goToCheckout() {
    window.location.href = "checkout.html";
}

function goBack() {
    window.location.href = "index.html";
}

window.addEventListener("DOMContentLoaded", () => {
    loadCart();
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});
