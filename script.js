// Wait for the DOM to load before adding event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Get the form element
    const form = document.getElementById('registrationForm');

    // Add event listener for form submission
    form.addEventListener('submit', function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get the input values and trim whitespace
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        // Get the message div to display feedback
        const messageDiv = document.getElementById('message');

        // Clear any previous messages
        messageDiv.textContent = '';
        messageDiv.className = '';

        // Client-side validation
        // Check if full name is provided
        if (!fullName) {
            messageDiv.textContent = 'Full Name is required.';
            messageDiv.className = 'error';
            return;
        }

        // Check if email is valid
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            messageDiv.textContent = 'Please enter a valid email address.';
            messageDiv.className = 'error';
            return;
        }

        // Check if password is at least 6 characters
        if (password.length < 6) {
            messageDiv.textContent = 'Password must be at least 6 characters long.';
            messageDiv.className = 'error';
            return;
        }

        // If validation passes, send data to the backend API
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullName: fullName,
                email: email,
                password: password,
            }),
        })
        .then(response => {
            // Check if the response is ok
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle the response data
            if (data.success) {
                messageDiv.textContent = 'Registration successful!';
                messageDiv.className = 'success';
                // Optionally, clear the form
                form.reset();
            } else {
                messageDiv.textContent = data.message || 'Registration failed.';
                messageDiv.className = 'error';
            }
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            messageDiv.textContent = 'An error occurred. Please try again.';
            messageDiv.className = 'error';
            console.error('Error:', error);
        });
    });
});