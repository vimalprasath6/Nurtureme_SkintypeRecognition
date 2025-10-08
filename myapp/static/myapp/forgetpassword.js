document.addEventListener("DOMContentLoaded", () => {
    const forgotPasswordCard = document.querySelector(".forgot-password-card");
    const securityCodeCard = document.querySelector(".security-code-card");
    const emailSubmitButton = document.getElementById("mailsubmit");

    // Handle "Send Reset Link" button click
    emailSubmitButton.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent default button behavior

        const emailInput = document.getElementById("email").value;

        if (validateEmail(emailInput)) {
            console.log("Valid email entered:", emailInput);

            // Add slide-out animation to forgot-password-card
            forgotPasswordCard.classList.add("slide-out");

            forgotPasswordCard.addEventListener("animationend", () => {
                // Hide forgot-password-card and reset its state
                forgotPasswordCard.style.display = "none";
                forgotPasswordCard.classList.remove("slide-out");

                // Show and animate the security-code-card
                securityCodeCard.style.display = "block";

                securityCodeCard.classList.add("slide-in");
                console.log("Slide-in animation triggered.");
            });
        } else {
            alert("Please enter a valid Gmail address.");
            console.log("Invalid email entered.");
        }
    });

    // Function to validate email
    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return emailRegex.test(email);
    }
});


document.getElementById("mailsubmit").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission for testing

    // Get containers
    const forgotPasswordContainer = document.getElementById("forgot-password");
    const securityCodeContainer = document.getElementById("security-code");

    // Slide out the first container
    forgotPasswordContainer.classList.remove("active");
    forgotPasswordContainer.classList.add("hidden");

    // Slide in the second container
    setTimeout(() => {
        securityCodeContainer.classList.remove("hidden");
        securityCodeContainer.classList.add("active");
    }, 500); // Match the transition duration
});

