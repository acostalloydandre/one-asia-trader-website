document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const countrySelect = document.getElementById('countryCode');

    // --- NEW: Dynamic Country Phone Rules ---
    // This maps each country code to its exact required digit length (excluding the country code itself)
    const phoneRules = {
        '+63': { length: 10, placeholder: "932 567 3984" }, // Philippines (10 digits)
        '+1':  { length: 10, placeholder: "212 555 1234" }, // USA (10 digits)
        '+44': { length: 10, placeholder: "7400 123456" },  // UK (Usually 10 digits)
        '+81': { length: 10, placeholder: "90 1234 5678" }, // Japan (10 digits)
        '+61': { length: 9,  placeholder: "412 345 678" }   // Australia (9 digits)
    };

    // Function to update the input field based on the selected dropdown value
    function updatePhoneRestrictions() {
        const rule = phoneRules[countrySelect.value];
        if (rule) {
            // Automatically set HTML restrictions
            phoneInput.setAttribute('minlength', rule.length);
            phoneInput.setAttribute('maxlength', rule.length);
            phoneInput.setAttribute('placeholder', rule.placeholder);
            
            // If the user already typed something too long before switching countries, trim it
            if (phoneInput.value.length > rule.length) {
                phoneInput.value = phoneInput.value.slice(0, rule.length);
            }
        }
    }

    // 1. Run once on page load to set the default state (Philippines)
    updatePhoneRestrictions();

    // 2. Listen for when the user changes the country code
    countrySelect.addEventListener('change', updatePhoneRestrictions);

    // 3. Real-time Name Validation: Prevent typing numbers
    nameInput.addEventListener('input', function() {
        this.value = this.value.replace(/[0-9]/g, '');
    });

    // 4. Real-time Phone Validation: Prevent typing letters/symbols
    phoneInput.addEventListener('input', function() {
        // Delete anything that is NOT a digit
        this.value = this.value.replace(/\D/g, '');
        
        // Enforce max length immediately (helpful if they try to paste a long number)
        const rule = phoneRules[countrySelect.value];
        if (this.value.length > rule.length) {
            this.value = this.value.slice(0, rule.length);
        }
    });

    // --- FORM SUBMISSION LOGIC ---
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

            // --- NEW: Strict Phone Length Check on Submit ---
            const requiredLength = phoneRules[countryCode].length;
            if (phone.length !== requiredLength) {
                alert(`Please enter exactly ${requiredLength} digits for this country code. You currently have ${phone.length}.`);
                return;
            }

            const fullPhoneNumber = `${countryCode} ${phone}`;
            console.log('Form Data Prepared for Sending:', { name, email, phone: fullPhoneNumber, message });
            
            alert(`Salamat, ${name}! Your message has been successfully sent to One Asia Trader.`);

            // Clear the form and reset phone restrictions to default
            contactForm.reset();
            updatePhoneRestrictions(); 
        });
    }
});

// Toggle button for logo
const logoToggleButton = document.getElementById('logo-nav-toggle');
const navMenu = document.querySelector('.nav-menu');

logoToggleButton.addEventListener('click', function(event) {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 992) {
        event.preventDefault(); 
        document.body.classList.toggle('nav-open');
    }
});

