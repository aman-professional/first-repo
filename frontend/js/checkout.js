// Checkout page logic - handles order submission with geolocation

document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.getElementById('checkout-form');
    const getLocationBtn = document.getElementById('get-location-btn');
    const locationStatus = document.getElementById('location-status');
    const latitudeInput = document.getElementById('latitude');
    const longitudeInput = document.getElementById('longitude');
    const mapPreview = document.getElementById('map-preview');
    const orderItemsContainer = document.getElementById('order-items');
    const totalAmountSpan = document.getElementById('total-amount');

    // Check if cart has items
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Your cart is empty!');
        window.location.href = 'products.html';
        return;
    }

    // Calculate and display total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalAmountSpan.textContent = total.toFixed(2);

    // Sync amounts for QR and eSewa
    const qrAmt = document.getElementById('qr-amount');
    const esewaAmt = document.getElementById('esewa-amount');
    if (qrAmt) qrAmt.textContent = total.toFixed(2);
    if (esewaAmt) esewaAmt.textContent = total.toFixed(2);

    window.togglePaymentUI = (method) => {
        const qrDisplay = document.getElementById('qr-display');
        const esewaDisplay = document.getElementById('esewa-display');
        const proofSection = document.getElementById('proof-upload-section');

        qrDisplay.style.display = (method === 'QR') ? 'flex' : 'none';
        esewaDisplay.style.display = (method === 'eSewa') ? 'block' : 'none';

        // Show proof upload for online payments
        if (proofSection) {
            proofSection.style.display = (method === 'QR' || method === 'eSewa') ? 'block' : 'none';
        }
    };

    // Handle Proof Preview
    const proofInput = document.getElementById('payment-proof');
    const proofPreview = document.getElementById('proof-preview');
    const proofImg = document.getElementById('proof-img-preview');
    let paymentProofBase64 = '';

    if (proofInput) {
        proofInput.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    paymentProofBase64 = event.target.result;
                    if (proofImg) proofImg.src = paymentProofBase64;
                    if (proofPreview) proofPreview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Display order items
    orderItemsContainer.innerHTML = cart.map(item => `
        <div class="order-item">
            <span>${item.quantity}x ${item.name}</span>
            <span>Rs. ${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');

    // Get Location Button
    getLocationBtn.addEventListener('click', (e) => {
        e.preventDefault();

        if (!navigator.geolocation) {
            locationStatus.textContent = '❌ Geolocation not supported';
            locationStatus.style.color = '#d32f2f';
            return;
        }

        getLocationBtn.disabled = true;
        getLocationBtn.textContent = '📍 Getting location...';
        locationStatus.textContent = 'Requesting location permission...';
        locationStatus.style.color = '#666';

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                // Store coordinates
                latitudeInput.value = latitude;
                longitudeInput.value = longitude;

                // Update UI
                getLocationBtn.textContent = '✓ Location Captured';
                getLocationBtn.style.backgroundColor = '#4CAF50';
                locationStatus.textContent = `✓ Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
                locationStatus.style.color = '#4CAF50';

                // Show map preview
                showMapPreview(latitude, longitude);
            },
            (error) => {
                getLocationBtn.disabled = false;
                getLocationBtn.textContent = '📍 Get My Live Location';

                let errorMsg = 'Unable to get location. ';
                if (error.code === error.PERMISSION_DENIED) {
                    errorMsg += 'Please enable location permissions in your browser settings.';
                } else if (error.code === error.POSITION_UNAVAILABLE) {
                    errorMsg += 'Location information is unavailable.';
                } else if (error.code === error.TIMEOUT) {
                    errorMsg += 'Request timed out.';
                } else {
                    errorMsg += 'Unknown error occurred.';
                }

                locationStatus.textContent = '❌ ' + errorMsg;
                locationStatus.style.color = '#d32f2f';
                console.error('Geolocation error:', error);
            }
        );
    });

    // Show map preview
    function showMapPreview(latitude, longitude) {
        const mapHTML = `
            <iframe 
                width="100%" 
                height="100%" 
                frameborder="0" 
                style="border: none; border-radius: 10px;" 
                src="https://maps.google.com/maps?q=${latitude},${longitude}&hl=en&z=15&output=embed" 
                allowfullscreen="" 
                loading="lazy">
            </iframe>
        `;
        mapPreview.innerHTML = mapHTML;
    }

    // Form submission
    checkoutForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const latitude = latitudeInput.value;
        const longitude = longitudeInput.value;

        // Validation
        if (!name || !phone) {
            alert('Please fill in all required fields');
            return;
        }

        if (!latitude || !longitude) {
            alert('Please click "Get My Live Location" to capture your delivery location');
            return;
        }

        if (cart.length === 0) {
            alert('Your cart is empty');
            return;
        }

        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

        // Validation for Online Payment Proof
        if ((paymentMethod === 'QR' || paymentMethod === 'eSewa') && !paymentProofBase64) {
            alert('Please upload a screenshot of your payment to proceed!');
            return;
        }

        // Prepare order data
        const orderData = {
            name,
            phone,
            location: {
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude)
            },
            cartItems: cart,
            totalAmount: total,
            paymentMethod: paymentMethod,
            paymentStatus: (paymentMethod === 'COD') ? 'pending' : 'paid (simulated)',
            paymentProof: paymentProofBase64
        };

        // Submit order
        const API_BASE = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && !window.location.origin.includes('5000')
            ? 'http://localhost:5000/api'
            : '/api';

        try {
            const response = await fetch(`${API_BASE}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                const result = await response.json();

                // Clear cart
                localStorage.removeItem('cart');

                // Show confirmation
                alert('✓ Order placed successfully!\n\nCustomer: ' + name + '\nTotal: Rs. ' + total.toFixed(2));

                // Redirect to home
                window.location.href = 'index.html';
            } else {
                const error = await response.json();
                alert('Error placing order: ' + (error.message || 'Unknown error'));
            }
        } catch (err) {
            console.error('Order submission error:', err);
            alert('Error connecting to server. Make sure the backend is running on localhost:5000');
        }
    });

    // Update cart count
    function updateCartCount() {
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        const badges = document.querySelectorAll('#cart-count');
        badges.forEach(badge => {
            badge.textContent = count;
        });
    }

    updateCartCount();
});
