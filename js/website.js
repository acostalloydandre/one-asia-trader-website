// Contact Form JS
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');

    if (nameInput) {
        nameInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
        });
    }

    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = nameInput.value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = phoneInput.value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !phone || !message) {
                alert('Please fill out all required fields.');
                return; 
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            alert(`Salamat, ${name}! Your message has been successfully sent to One Asia Trader.`);

            contactForm.reset();
        });
    }
});

const logoToggleButton = document.getElementById('logo-nav-toggle');
const navMenu = document.querySelector('.nav-menu');

logoToggleButton.addEventListener('click', function(event) {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 992) {
        event.preventDefault(); 
        document.body.classList.toggle('nav-open');
    }
});

