// Initialize the webcam and start processing
window.onload = function () {
    const video = document.getElementById('video');
    const statusMessage = document.getElementById('status-message');
    const lightingMessage = document.getElementById('lighting-message');
    const captureButton = document.getElementById('capture-btn');
    const predictionMessage = document.getElementById('prediction-message');

    // Access the webcam
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            // Assign the video stream to the video element
            video.srcObject = stream;
            video.onloadedmetadata = () => {
                video.play(); // Play the video stream once it's loaded
                processWebcam(); // Start processing the webcam feed
            };

            // Handle capture button click
            captureButton.addEventListener('click', () => {
                if (video.readyState >= 2) { // Ensure the video is loaded enough to capture
                    try {
                        captureImage(video, stream);
                    } catch (error) {
                        console.error('Error capturing image:', error);
                        statusMessage.innerText = 'Error capturing image. Please try again.';
                    }
                } else {
                    console.error('Video element not fully loaded.');
                    statusMessage.innerText = 'Video is not ready. Please wait.';
                }
            });
        })
        .catch(err => {
            console.error('Error accessing webcam: ', err);
            statusMessage.innerText = 'Error: Unable to access the webcam.';
            updateStatus('error');  // Update UI on webcam access failure
        });
};

// Process the webcam feed for face detection and lighting analysis
function processWebcam() {
    const video = document.getElementById('video');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', { willReadFrequently: true });

    // Process video feed every second
    setInterval(() => {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Get image data for analysis
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            analyzeImage(imageData);
        }
    }, 1000); // Analyze every second
}

// Analyze the image for face detection and lighting quality
function analyzeImage(imageData) {
    const statusMessage = document.getElementById('status-message');
    const lightingMessage = document.getElementById('lighting-message');

    const averageBrightness = calculateAverageBrightness(imageData.data);

    // Lighting analysis
    if (averageBrightness < 50) {
        lightingMessage.innerText = 'Lighting: Too dark, please sit in proper lighting.';
        updateStatus('lighting-poor');
    } else {
        lightingMessage.innerText = 'Lighting: Adequate.';
        updateStatus('lighting-good');
    }

    // Simulate face detection by checking if the center is dark (as an approximation)
    const faceDetected = detectFaceCenter(imageData, imageData.width, imageData.height);
    if (faceDetected) {
        statusMessage.innerText = 'Status: Face detected!';
        updateStatus('face-detected');
    } else {
        statusMessage.innerText = 'Status: No face detected. Please center your face.';
        updateStatus('face-not-detected');
    }
}

// Calculate the average brightness of the image
function calculateAverageBrightness(data) {
    let totalBrightness = 0;
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        totalBrightness += brightness;
    }
    return totalBrightness / (data.length / 4);
}

// Simulate face detection by analyzing the center of the image
function detectFaceCenter(imageData, width, height) {
    const centerX = Math.floor(width / 2);
    const centerY = Math.floor(height / 2);
    const centerIndex = (centerY * width + centerX) * 4;  // Getting the pixel at the center of the image

    const r = imageData.data[centerIndex];
    const g = imageData.data[centerIndex + 1];
    const b = imageData.data[centerIndex + 2];
    const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // Threshold for detecting a face (you can adjust this as needed)
    return brightness < 100;  // Return true if brightness is low, indicating a face might be present
}

// Update the status and lighting indicators (colors)
function updateStatus(status) {
    const statusSection = document.getElementById('status-section');
    const statusMessage = document.getElementById('status-message');
    const lightingMessage = document.getElementById('lighting-message');

    // Remove previous classes
    statusSection.classList.remove('face-detected', 'lighting-good', 'lighting-poor', 'face-not-detected');

    // Apply new classes based on current status
    if (status === 'face-detected') {
        statusSection.classList.add('face-detected');
        statusMessage.classList.add('status-message-good');
    } else if (status === 'face-not-detected') {
        statusSection.classList.add('face-not-detected');
        statusMessage.classList.add('status-message-bad');
    }

    if (status === 'lighting-good') {
        statusSection.classList.add('lighting-good');
        lightingMessage.classList.add('lighting-message-good');
    } else if (status === 'lighting-poor') {
        statusSection.classList.add('lighting-poor');
        lightingMessage.classList.add('lighting-message-bad');
    }
}

// Initialize button states when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const productBtnForm = document.querySelector('form[action*="view_products"]');
    if (productBtnForm) {
        productBtnForm.style.display = 'none'; // Hide the products form initially
    }
});

// Add this at the start of your script3.js file
document.addEventListener('DOMContentLoaded', function() {
    // Hide products button form on page load
    const productBtnForm = document.querySelector('form[action*="view_products"]');
    if (productBtnForm) {
        productBtnForm.style.display = 'none';
    }
});

// Add this at the start of your script
document.addEventListener('DOMContentLoaded', function() {
    // Hide product button on page load
    const productBtn = document.getElementById('product-btn');
    if (productBtn) {
        productBtn.style.display = 'none';
        // Hide the parent btn div as well
        const btnContainer = productBtn.closest('.btn');
        if (btnContainer) {
            btnContainer.style.display = 'none';
        }
    }
});

function captureImage(video, stream) {
    // Check if video is ready
    if (!video || !video.videoWidth || video.readyState !== video.HAVE_ENOUGH_DATA) {
        console.error('Video element not available or not fully loaded', video.readyState);
        const statusMessage = document.getElementById('status-message');
        statusMessage.innerText = 'Video is not ready. Please wait.';
        return;
    }

    // Get required elements
    const statusSection = document.getElementById('status-section');
    const loadingStatus = document.querySelector('.loading-status');
    const captureBtn = document.getElementById('capture-btn');
    const productBtn = document.getElementById('product-btn');
    let canvas = document.getElementById('capture-canvas');

    // Hide status section and show loading status
    if (statusSection) {
        statusSection.style.display = 'none';
    }
    if (loadingStatus) {
        loadingStatus.style.display = 'block';
        startAnimation();
    }
    
    // Hide capture button and its container
    if (captureBtn) {
        const captureBtnContainer = captureBtn.closest('.btn');
        if (captureBtnContainer) {
            captureBtnContainer.style.display = 'none';
        }
        captureBtn.closest('form').style.display = 'none';
    }

    // Show product button after a slight delay
    setTimeout(() => {
        if (productBtn) {
            productBtn.style.display = 'block';
            productBtn.classList.add('show');
            // Show the parent btn div as well
            const btnContainer = productBtn.closest('.btn');
            if (btnContainer) {
                btnContainer.style.display = 'block';
            }
        }
    }, 10000);

    // Rest of your existing captureImage function code...
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'capture-canvas';
        canvas.style.display = 'none';
        document.body.appendChild(canvas);
    }

    const context = canvas.getContext('2d');
    if (!context) {
        console.error('Unable to get 2D context from canvas');
        return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png');

    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    video.srcObject = null;

    video.style.display = 'none';
    const img = document.createElement('img');
    img.src = imageData;
    img.id = 'captured-image';
    video.parentNode.appendChild(img);

    sendToServer(imageData);
}

// Add click handler for product button
document.addEventListener('DOMContentLoaded', function() {
    const productBtn = document.getElementById('product-btn');
    if (productBtn) {
        productBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const redirectUrl = this.getAttribute('data-home-url');
            if (redirectUrl) {
                window.location.href = redirectUrl;
            }
        });
    }
});

// When the page loads, initially hide the product button
document.addEventListener('DOMContentLoaded', function() {
    const productBtn = document.getElementById('product-btn');
    if (productBtn) {
        productBtn.closest('form').style.display = 'none';
    }
});

// Function to get the CSRF token from cookies
function getCSRFToken() {
    let cookieValue = null;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('csrftoken=')) {
            cookieValue = cookie.substring('csrftoken='.length, cookie.length);
            break;
        }
    }
    return cookieValue;
}

// Modify the sendToServer function to keep loading animation visible
function sendToServer(imageData) {
    const url = '/predict_skin_type/';
    const csrfToken = getCSRFToken();

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({ image: imageData }),
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errorMsg => {
                throw new Error(`Server responded with error: ${errorMsg}`);
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('Skin type prediction:', data);
        displayPrediction(data);
    })
    .catch(error => {
        console.error('Error sending image to server:', error);
        
        // Calculate total animation duration for error case too
        const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0);
        const bufferTime = 1000;

        setTimeout(() => {
            document.querySelector('.loading-status').style.display = 'none';
            const predictionMessage = document.getElementById('prediction-message');
            predictionMessage.innerText = `Error: ${error.message}`;
        }, totalDuration + bufferTime);
    });
}

// Loading animation functions
const steps = [
    { id: 'step1', duration: 2000 },
    { id: 'step2', duration: 5000 },
    { id: 'step3', duration: 2000 }
];

let currentStep = 0;
const progress = document.querySelector('.progress');

function updateProgress() {
    const progressPercentage = ((currentStep + 1) / steps.length) * 100;
    progress.style.width = `${progressPercentage}%`;
}

function activateStep(stepIndex) {
    if (stepIndex > 0) {
        const prevStep = document.getElementById(steps[stepIndex - 1].id);
        prevStep.classList.add('exit');
    }

    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
        step.querySelector('.icon').classList.remove('animate');
    });

    const currentStepElement = document.getElementById(steps[stepIndex].id);
    currentStepElement.classList.remove('exit');
    currentStepElement.classList.add('active');
    currentStepElement.querySelector('.icon').classList.add('animate');
    
    updateProgress();
}

function resetSteps() {
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active', 'exit');
        step.querySelector('.icon').classList.remove('animate');
    });
}

function startAnimation() {
    resetSteps();
    currentStep = 0;
    progress.style.width = '0';
    
    steps.forEach((step, index) => {
        const delay = steps
            .slice(0, index)
            .reduce((sum, s) => sum + s.duration, 0);
            
        setTimeout(() => {
            currentStep = index;
            activateStep(index);
        }, delay);
    });
}

// Display the prediction result from the server
function displayPrediction(data) {
    // Calculate total animation duration
    const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0);
    
    // Add a slight buffer after animation (1 second)
    const bufferTime = 1000;

    // Wait for animation to complete before showing prediction
    setTimeout(() => {
        // Hide loading status
        document.querySelector('.loading-status').style.display = 'none';
        
        // Show prediction
        const predictionMessage = document.getElementById('prediction-message');
        if (data.skinType) {
            predictionMessage.innerText = `Predicted Skin Type: ${data.skinType}`;
        } else {
            predictionMessage.innerText = 'Prediction failed. Please try again.';
        }
    }, totalDuration + bufferTime);
}

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




  



  


