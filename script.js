document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded.');

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // Mouse Tracking Spotlight
    const spotlight = document.getElementById('spotlight-overlay');

    if (spotlight) {
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;

            // Subtle radial gradient following the mouse
            // 600px radius, cyan/blue tint
            spotlight.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(6, 182, 212, 0.1), transparent 40%)`;
        });
    }
});
