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
        if(!countrySelect || !phoneInput) return;
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


    if(countrySelect) {
        updatePhoneRestrictions();
        countrySelect.addEventListener('change', updatePhoneRestrictions);
    }


    if (nameInput) {
        nameInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^a-zA-Z\s]/g, ''); 
        });
    }


    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, ''); 
            
            if(countrySelect) {
                const rule = phoneRules[countrySelect.value];
                if (rule && this.value.length > rule.length) {
                    this.value = this.value.slice(0, rule.length);
                }
            }
        });
    }


    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
 
            event.preventDefault(); 

            const name = nameInput ? nameInput.value.trim() : '';
            const email = document.getElementById('email') ? document.getElementById('email').value.trim() : '';
            const countryCode = countrySelect ? countrySelect.value : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const message = document.getElementById('message') ? document.getElementById('message').value.trim() : '';

    
            if (!name || !email || !phone || !message) {
                alert('Please fill out all required fields.');
                return; 
            }


            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            if(countrySelect) {
                const requiredLength = phoneRules[countryCode].length;
                if (phone.length !== requiredLength) {
                    alert(`Please enter exactly ${requiredLength} digits for this country code. You currently have ${phone.length}.`);
                    return;
                }
            }


            alert(`Salamat, ${name}! Your message has been successfully sent to One Asia Trader.`);
            
            contactForm.reset();
            if(countrySelect) updatePhoneRestrictions();
        });
    }
});

// Logo Phone Function
const logoToggleButton = document.getElementById('logo-nav-toggle');
const navMenu = document.querySelector('.nav-menu');

logoToggleButton.addEventListener('click', function(event) {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 992) {
        event.preventDefault(); 
        document.body.classList.toggle('nav-open');
    }
});

