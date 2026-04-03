// Scroll animations for o-meni.html
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Observer za hero sekciju - jednosmerne animacije
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Ne uklanjaj klasu kada element izadje iz viewa
        }
    });
}, observerOptions);

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
    // Hero elementi - jednosmerne animacije
    const heroElements = document.querySelectorAll('.page-title, .page-subtitle');
    heroElements.forEach(el => heroObserver.observe(el));
    
    // Ostali elementi - dvosmerne animacije
    const regularElements = document.querySelectorAll('.section-title, .profile-card, .history-item, .back-button, .footer-content');
    regularElements.forEach(el => regularObserver.observe(el));
});
