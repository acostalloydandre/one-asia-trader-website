// Contact Form JS
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const countrySelect = document.getElementById('countryCode');

    const phoneRules = {
        '+63': { length: 10, placeholder: "932 567 3984" },
        '+1':  { length: 10, placeholder: "212 555 1234" },
        '+44': { length: 10, placeholder: "7400 123456" },
        '+81': { length: 10, placeholder: "90 1234 5678" },
        '+61': { length: 9,  placeholder: "412 345 678" }
    };

    function updatePhoneRestrictions() {
        const rule = phoneRules[countrySelect.value];
        if (rule) {
            phoneInput.setAttribute('minlength', rule.length);
            phoneInput.setAttribute('maxlength', rule.length);
            phoneInput.setAttribute('placeholder', rule.placeholder);
            
            if (phoneInput.value.length > rule.length) {
                phoneInput.value = phoneInput.value.slice(0, rule.length);
            }
        }
    }

    updatePhoneRestrictions();

    countrySelect.addEventListener('change', updatePhoneRestrictions);


    nameInput.addEventListener('input', function() {
        this.value = this.value.replace(/[0-9]/g, '');
    });

    phoneInput.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '');
        
        const rule = phoneRules[countrySelect.value];
        if (this.value.length > rule.length) {
            this.value = this.value.slice(0, rule.length);
        }
    });

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = nameInput.value.trim();
            const email = document.getElementById('email').value.trim();
            const countryCode = countrySelect.value;
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

            const requiredLength = phoneRules[countryCode].length;
            if (phone.length !== requiredLength) {
                alert(`Please enter exactly ${requiredLength} digits for this country code. You currently have ${phone.length}.`);
                return;
            }

            const fullPhoneNumber = `${countryCode} ${phone}`;
            console.log('Form Data Prepared for Sending:', { name, email, phone: fullPhoneNumber, message });
            
            alert(`Salamat, ${name}! Your message has been successfully sent to One Asia Trader.`);

            contactForm.reset();
            updatePhoneRestrictions(); 
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

