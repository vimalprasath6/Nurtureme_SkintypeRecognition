document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
    const container = document.querySelector('.container');
    const signInButton = document.getElementById('signInButton');
    const signUpButton = document.getElementById('signUpButton');
    const signUpForm = document.getElementById('signUpForm');
    const passwordContainers = document.querySelectorAll('.password-container');

    // Event listener to switch to Sign-In form
    signInButton?.addEventListener('click', () => toggleActiveClass(false));

    // Event listener to switch to Sign-Up form
    signUpButton?.addEventListener('click', () => toggleActiveClass(true));

    // Handle form submission for Sign-Up
    signUpForm?.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        // Get password and confirm password fields
        const passwordInput = signUpForm.querySelector('input[name="password"]');
        const confirmPasswordInput = signUpForm.querySelector('input[name="confirm_password"]');

        // Validate if passwords match
        if (passwordInput?.value !== confirmPasswordInput?.value) {
            alert('Passwords do not match. Make sure that your password and confirm password are the same.');
            return; // Stop submission
        }

        alert('Sign-Up Successful! Switching to Sign-In form.');
        toggleActiveClass(false); // Switch to Sign-In form after successful Sign-Up
        signUpForm.submit(); // Manually submit the form if validation passes
    });

    // Add toggle functionality for password visibility
    passwordContainers.forEach((container) => {
        const passwordField = container.querySelector('input[type="password"]');
        const icon = container.querySelector('i');

        icon?.addEventListener('click', () => {
            if (passwordField.type === "password") {
                passwordField.type = "text"; // Show password
                icon.classList.replace('fa-eye', 'fa-eye-slash'); // Change icon to 'eye-slash'
            } else {
                passwordField.type = "password"; // Hide password
                icon.classList.replace('fa-eye-slash', 'fa-eye'); // Change icon back to 'eye'
            }
        });
    });

    // Switch forms based on URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    if (tab === 'signin') {
        toggleActiveClass(false); // Show Sign-In form by default if "tab=signin" is in the URL
    } else if (tab === 'signup') {
        toggleActiveClass(true); // Show Sign-Up form if "tab=signup" is in the URL
    }

    /**
     * Toggle the active class on the container.
     * @param {boolean} isSignUp - If true, activate Sign-Up form; otherwise, activate Sign-In form.
     */
    function toggleActiveClass(isSignUp) {
        if (container) {
            container.classList.toggle('active', isSignUp); // Toggle active class
            updateUrl(isSignUp ? 'signup' : 'signin'); // Update URL
        }
    }

    /**
     * Update the browser's URL without reloading the page.
     * @param {string} tabName - The active tab ('signin' or 'signup').
     */
    function updateUrl(tabName) {
        const newUrl = `/?tab=${tabName}`;
        window.history.pushState({}, '', newUrl);
    }
});
