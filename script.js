// DOM Elements
const mobileMenu = document.querySelector('.mobile-menu');
const nav = document.querySelector('nav');
const navMenu = document.querySelector('nav ul');
const form = document.getElementById('contactForm');

// Mobile Menu Toggle
mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Sticky Navigation
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({ behavior: 'smooth' });

        // Close mobile menu after clicking
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
        }
    });
});

// Section Animations
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    { threshold: 0.1 }
);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Form Validation
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(input, message) {
    const errorMessage = input.parentElement.querySelector('.error-message');
    errorMessage.style.display = 'block';
    input.classList.add('error');
}

function hideError(input) {
    const errorMessage = input.parentElement.querySelector('.error-message');
    errorMessage.style.display = 'none';
    input.classList.remove('error');
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    const email = form.querySelector('input[type="email"]');
    const message = form.querySelector('textarea');

    // Validate email
    if (!validateEmail(email.value)) {
        showError(email);
        isValid = false;
    } else {
        hideError(email);
    }

    // Validate message
    if (!message.value.trim()) {
        showError(message);
        isValid = false;
    } else {
        hideError(message);
    }

    // If form is valid, submit
    if (isValid) {
        alert('Thank you for your message! I will get back to you soon.');
        form.reset();
    }
});

// Input validation on blur
form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.type === 'email') {
            if (!validateEmail(this.value)) {
                showError(this);
            } else {
                hideError(this);
            }
        } else if (!this.value.trim()) {
            showError(this);
        } else {
            hideError(this);
        }
    });
});