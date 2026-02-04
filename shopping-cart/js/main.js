// Home page logic (index.html)

function getCartFromStorage() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCartToStorage(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
    const cart = getCartFromStorage();
    const countSpan = document.getElementById("cartCount");
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (countSpan) {
        countSpan.textContent = totalItems;
    }
}

function displayProducts() {
    const productList = document.getElementById("productList");
    if (!productList || !Array.isArray(products)) return;

    productList.innerHTML = "";

    products.forEach((product) => {
        productList.innerHTML += `
      <div class="card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
    });
}

function addToCart(id) {
    let cart = getCartFromStorage();

    const product = products.find((p) => p.id === id);
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else if (product) {
        cart.push({ ...product, quantity: 1 });
    }

    saveCartToStorage(cart);
    updateCartCount();
    alert("Item added to cart!");
}

function goToCart() {
    window.location.href = "cart.html";
}

// Initialize on page load
window.addEventListener("DOMContentLoaded", () => {
    displayProducts();
    updateCartCount();
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});
