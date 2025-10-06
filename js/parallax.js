document.addEventListener('DOMContentLoaded', function() {
    const parallaxSection = document.querySelector('.aboutus-iklim');
    
    if (!parallaxSection) return;

    // Check if device supports hover (not a touch device)
    const canHover = window.matchMedia('(hover: hover)').matches;
    if (!canHover) return;

    let rect = parallaxSection.getBoundingClientRect();

    function handleMouseMove(e) {
        // Only apply parallax if section is in viewport
        rect = parallaxSection.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;

        // Calculate mouse position relative to the section
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate percentage (-20px to 20px movement range)
        const moveX = ((mouseX / rect.width) - 0.5) * 40;
        const moveY = ((mouseY / rect.height) - 0.5) * 40;

        // Apply smooth transform to the background
        parallaxSection.style.setProperty('--moveX', `${moveX}px`);
        parallaxSection.style.setProperty('--moveY', `${moveY}px`);
        
        // Apply transform with transition
        parallaxSection.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
    }

    // Update rectangle size on resize
    window.addEventListener('resize', () => {
        rect = parallaxSection.getBoundingClientRect();
    });

    // Add mousemove event only when section is in viewport
    function checkVisibility() {
        rect = parallaxSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            document.addEventListener('mousemove', handleMouseMove);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
        }
    }

    // Reset position when mouse leaves the section
    parallaxSection.addEventListener('mouseleave', () => {
        parallaxSection.style.backgroundPosition = '50% 50%';
    });

    // Check visibility on scroll
    window.addEventListener('scroll', checkVisibility);
    
    // Initial check
    checkVisibility();
});
