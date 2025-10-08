document.addEventListener('DOMContentLoaded', function() {
    // Safely access the elements once the DOM is loaded
    const navbar = document.getElementById('navbar');
    const navButton = document.getElementById('nav-button');

    // Open the modal to access the webcam
    function openModal() {
        const modal = document.getElementById('modal');
        if (modal) {
            modal.classList.add('active');
        }

        // Initialize the webcam here if needed
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                const video = document.getElementById('video');
                if (video) {
                    video.srcObject = stream;
                }
            })
            .catch(err => {
                console.error("Error accessing webcam: ", err);
            });
    }

    // Close the modal and stop the webcam stream
    function closeModal() {
        const modal = document.getElementById('modal');
        if (modal) {
            modal.classList.remove('active');
        }

        const video = document.getElementById('video');
        if (video && video.srcObject) {
            video.srcObject.getTracks().forEach(track => track.stop()); // Stop the webcam
        }
    }

    // Capture image from the webcam and process it
    function captureImage() {
        const canvas = document.getElementById('canvas');
        const video = document.getElementById('video');
        if (canvas && video) {
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
        }

        // Here you can add your image processing and prediction code

        // Redirect to another page after capturing the image
        window.location.href = '/index3.html'; // Adjust this path if necessary
    }



    // Toggle the expanded state of the navbar
    function toggleMenu() {
        if (navbar) {
            navbar.classList.toggle('expanded');
        }
    }

    // Detect click outside the navbar to close it
    document.addEventListener('click', function(event) {
        if (navbar && navButton) {
            // Check if the click is outside of the navbar and navButton
            if (!navbar.contains(event.target) && !navButton.contains(event.target)) {
                navbar.classList.remove('expanded');
            }
        }
    });

    // Attach the toggle function to the nav button
    if (navButton) {
        navButton.addEventListener('click', toggleMenu);
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('navbar');
    const navButton = document.getElementById('nav-button');
    const logoutButton = document.getElementById('logout-button');
    const logoutModal = document.getElementById('logout-modal');
    const logoutYes = document.getElementById('logout-yes');
    const logoutNo = document.getElementById('logout-no');

    // Navbar toggle functionality
    function toggleMenu() {
        if (navbar) {
            navbar.classList.toggle('expanded');
        }
    }

    // Close navbar when clicking outside
    document.addEventListener('click', function (event) {
        if (navbar && navButton) {
            if (!navbar.contains(event.target) && !navButton.contains(event.target)) {
                navbar.classList.remove('expanded');
            }
        }
    });

    // Attach the toggle function to the nav button
    if (navButton) {
        navButton.addEventListener('click', toggleMenu);
    }

    // Logout Modal Logic
    if (logoutButton) {
        logoutButton.addEventListener('click', function (event) {
            event.preventDefault();
            logoutModal.classList.add('active');
        });
    }

    if (logoutNo) {
        logoutNo.addEventListener('click', function () {
            logoutModal.classList.remove('active');
        });
    }

    if (logoutYes) {
        document.getElementById('logout-yes').addEventListener('click', function () {
            // Redirect to the logout page
            window.location.href = logoutRedirectUrl;
        });        
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const homeButton = document.getElementById('home-button');
    const homeRedirectUrl = homeButton ? homeButton.getAttribute('data-home-url') : null;
    const navbar = document.getElementById('navbar');
    const navButton = document.getElementById('nav-button');
    const homeModal = document.getElementById('home-modal');
    const homeYes = document.getElementById('home-yes');
    const homeNo = document.getElementById('home-no');

    // Navbar toggle functionality
    function toggleMenu() {
        if (navbar) {
            navbar.classList.toggle('expanded');
        }
    }

    // Close navbar when clicking outside
    document.addEventListener('click', function (event) {
        if (navbar && navButton) {
            if (!navbar.contains(event.target) && !navButton.contains(event.target)) {
                navbar.classList.remove('expanded');
            }
        }
    });

    // Attach the toggle function to the nav button
    if (navButton) {
        navButton.addEventListener('click', toggleMenu);
    }

    // Logout Modal Logic
    if (homeButton) {
        homeButton.addEventListener('click', function (event) {
            event.preventDefault();
            homeModal.classList.add('active');
        });
    }

    if (homeNo) {
        homeNo.addEventListener('click', function () {
            homeModal.classList.remove('active');
        });
    }

    if (homeYes && homeRedirectUrl) {
        homeYes.addEventListener('click', function () {
            // Redirect to the home page
            window.location.href = homeRedirectUrl;
        });
    }
});
