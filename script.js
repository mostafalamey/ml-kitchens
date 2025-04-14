// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }

    lastScroll = currentScroll;
});

// Intersection Observer for animations
const animateOnScroll = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .testimonial-card').forEach((element) => {
        observer.observe(element);
    });
};

// Floating animation for hero image
const heroImage = document.querySelector('.hero img');
if (heroImage) {
    heroImage.classList.add('animate-float');
}

// Form validation and submission handling
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerText;

        // Show loading state
        submitButton.innerHTML = '<span class="loading"></span> Sending...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success message
        submitButton.innerHTML = '✓ Sent Successfully';
        submitButton.classList.add('success');

        // Reset form
        setTimeout(() => {
            form.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            submitButton.classList.remove('success');
        }, 3000);
    });
});

// Price toggle animation
const priceToggle = document.querySelector('.price-toggle');
if (priceToggle) {
    priceToggle.addEventListener('click', () => {
        priceToggle.classList.toggle('active');
    });
}

// FAQ accordion functionality
const faqItems = document.querySelectorAll('.faq-content');
faqItems.forEach(item => {
    const button = item.previousElementSibling;
    button.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Close all other items
        faqItems.forEach(faq => faq.classList.remove('active'));

        // Toggle current item
        if (!isOpen) {
            item.classList.add('active');
        }
    });
});

// Mobile menu animation
const mobileMenuButton = document.querySelector('[x-data]');
if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
        document.querySelector('.mobile-menu').classList.toggle('show');
    });
};

// Theme Switching Functionality
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Changed default to dark
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggleState(savedTheme);
}

function updateThemeToggleState(theme) {
    const toggleButtons = document.querySelectorAll('.theme-toggle');
    toggleButtons.forEach(button => {
        const handle = button.querySelector('.theme-toggle-handle');
        if (handle) {
            if (theme === 'dark') {
                handle.style.transform = 'translateX(20px)';
            } else {
                handle.style.transform = 'translateX(0)';
            }
        }
    });
}

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggleState(newTheme);
}

// Set initial theme as early as possible
initTheme();

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();

    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');

        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
});

// Add custom cursor effect for interactive elements
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    element.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});