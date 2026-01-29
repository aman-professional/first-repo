// Main App JavaScript - Handles cart and product loading

// API Base URL
const API_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && !window.location.origin.includes('5000')
    ? 'http://localhost:5000/api'
    : '/api';

// Update cart count in navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('#cart-count');
    badges.forEach(badge => {
        badge.textContent = count;
    });
}

// Add product to cart (localStorage)
function addToCart(productId, productName, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            productId,
            name: productName,
            price,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${productName} added to cart!`);
}

// Load featured products on home page
async function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;

    try {
        const response = await fetch(`${API_URL}/products`);
        const products = await response.json();

        // Show only first 3 products as featured
        const featured = products.slice(0, 3);

        if (!featured || featured.length === 0) {
            container.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">Loading products...</p>';
            return;
        }

        container.innerHTML = featured.map(product => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="description">${product.description}</p>
                    <p class="price">Rs. ${product.price.toFixed(2)}</p>
                    <button class="btn btn-add-to-cart" onclick="addToCart('${product._id}', '${product.name.replace(/'/g, "\\'")}', ${product.price})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading featured products:', error);
        if (container) {
            container.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">Error loading products.</p>';
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    loadFeaturedProducts();

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            // Animate menu toggle icon (optional but nice)
            const spans = menuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('open')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
});
