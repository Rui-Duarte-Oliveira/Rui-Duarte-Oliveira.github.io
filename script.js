document.documentElement.classList.add('js');

(() => {
    const hiddenElements = document.querySelectorAll('.hidden');

    const revealAll = () => {
        hiddenElements.forEach((element) => element.classList.add('show'));
    };

    try {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            revealAll();
        } else {
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show');
                        currentObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            hiddenElements.forEach((element) => observer.observe(element));
        }

        // Mouse Tracking Spotlight
        const spotlight = document.getElementById('spotlight-overlay');

        if (!spotlight) {
            return;
        }

        if (prefersReducedMotion || !hasFinePointer) {
            spotlight.style.display = 'none';
            return;
        }

        let frameId = null;
        let pointerX = window.innerWidth / 2;
        let pointerY = window.innerHeight / 2;

        const renderSpotlight = () => {
            spotlight.style.background = `radial-gradient(600px circle at ${pointerX}px ${pointerY}px, rgba(6, 182, 212, 0.1), transparent 40%)`;
            frameId = null;
        };

        window.addEventListener('pointermove', (event) => {
            if (event.pointerType !== 'mouse') {
                return;
            }

            pointerX = event.clientX;
            pointerY = event.clientY;

            if (frameId === null) {
                frameId = window.requestAnimationFrame(renderSpotlight);
            }
        }, { passive: true });

        renderSpotlight();
    } catch (error) {
        revealAll();
    }
})();
