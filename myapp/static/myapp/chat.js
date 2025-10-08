const messagesContainer = document.getElementById('messages');
        const userInput = document.getElementById('userInput');
        const sendButton = document.getElementById('sendButton');
        const typingIndicator = document.getElementById('typing');

        function addMessage(message, isUser) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
            messageDiv.textContent = message;
            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function simulateTyping() {
            typingIndicator.style.display = 'block';
            setTimeout(() => {
                typingIndicator.style.display = 'none';
                addMessage('This is a simulated response from the AI assistant.', false);
            }, 2000);
        }

        function handleSend() {
            const message = userInput.value.trim();
            if (message) {
                addMessage(message, true);
                userInput.value = '';
                simulateTyping();
            }
        }

        sendButton.addEventListener('click', handleSend);
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSend();
            }
        });





        document.addEventListener('DOMContentLoaded', function() {
            // Safely access the elements once the DOM is loaded
            const navbar = document.getElementById('navbar');
            const navButton = document.getElementById('nav-button');
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
        