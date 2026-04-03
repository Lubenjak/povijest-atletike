// Scroll animations for reakcije.html
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Observer za ostale elemente - dvosmerne animacije
const regularObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, observerOptions);

// Observe all elements with scroll animation classes
document.addEventListener('DOMContentLoaded', () => {
    // Ostali elementi - dvosmerne animacije
    const regularElements = document.querySelectorAll('.reaction-test h2, .instructions, .footer-content');
    regularElements.forEach(el => regularObserver.observe(el));
});
