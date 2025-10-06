// Mouse parallax effect for video
const parallaxSection = document.getElementById('parallax-section');
const parallaxVideo = document.querySelector('.parallax-video');
let ticking = false;

function updateParallax(e) {
    // Get mouse position relative to the section
    const rect = parallaxSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate movement relative to center (normalize to -1 to 1)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const moveX = (x - centerX) / centerX;
    const moveY = (y - centerY) / centerY;

    // Apply parallax movement (adjust multiplier for intensity)
    const parallaxStrength = 15; // pixels of movement
    const translateX = moveX * parallaxStrength;
    const translateY = moveY * parallaxStrength;

    // Apply transform to both the ::before pseudo-element and video
    parallaxSection.style.setProperty('--mouse-x', `${translateX}px`);
    parallaxSection.style.setProperty('--mouse-y', `${translateY}px`);

    ticking = false;
}

function requestTick(e) {
    if (!ticking) {
        requestAnimationFrame(() => updateParallax(e));
        ticking = true;
    }
}

// Add event listeners
parallaxSection.addEventListener('mousemove', requestTick);

// Reset position when mouse leaves
parallaxSection.addEventListener('mouseleave', () => {
    parallaxSection.style.setProperty('--mouse-x', '0px');
    parallaxSection.style.setProperty('--mouse-y', '0px');
});

// Initialize CSS custom properties
parallaxSection.style.setProperty('--mouse-x', '0px');
parallaxSection.style.setProperty('--mouse-y', '0px');


// Background images array with better quality images
const backgroundImages = [
    "img/bg1.jpg",
    "img/bg2.jpg",
    "img/bg3.jpeg",
    "img/bg4.jpeg",
    "img/bg5.jpeg",
];

let currentSlide = 0;
let autoSlideInterval;
const bgSlider = document.getElementById("bgSlider");
const prevPreview = document.getElementById("prevPreview");
const nextPreview = document.getElementById("nextPreview");
const indicatorsContainer = document.getElementById("indicators");
const slideCounter = document.getElementById("slideCounter");

// Initialize slider
function initSlider() {
    // Set initial background
    bgSlider.style.backgroundImage = `url(${backgroundImages[0]})`;

    // Create floating indicators
    backgroundImages.forEach((_, index) => {
        const indicator = document.createElement("div");
        indicator.className = `indicator ${index === 0 ? "active" : ""}`;
        indicator.setAttribute("data-tooltip", `Slide ${index + 1}`);
        indicator.addEventListener("click", () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    // Initialize preview images
    updatePreviewImages();

    // Update slide counter
    updateSlideCounter();
}

// Update preview images
function updatePreviewImages() {
    const prevIndex =
        (currentSlide - 1 + backgroundImages.length) %
        backgroundImages.length;
    const nextIndex = (currentSlide + 1) % backgroundImages.length;

    prevPreview.style.backgroundImage = `url(${backgroundImages[prevIndex]})`;
    nextPreview.style.backgroundImage = `url(${backgroundImages[nextIndex]})`;
}

// Change background image
function changeBackground(index) {
    bgSlider.style.backgroundImage = `url(${backgroundImages[index]})`;
    currentSlide = index;
    updateIndicators();
    updatePreviewImages();
    updateSlideCounter();

    // Reset auto-slide timer
    resetAutoSlide();
}

// Update indicators
function updateIndicators() {
    const indicators = document.querySelectorAll(".indicator");
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle("active", index === currentSlide);
    });
}

// Update slide counter with animation
function updateSlideCounter() {
    // Add updating animation class
    slideCounter.classList.add('updating');

    // Update the text content
    slideCounter.textContent = `${currentSlide + 1} / ${backgroundImages.length
        }`;

    // Remove animation class after animation completes
    setTimeout(() => {
        slideCounter.classList.remove('updating');
    }, 300);
}

// Go to specific slide
function goToSlide(index) {
    changeBackground(index);
}

// Next slide
function nextSlide() {
    const nextIndex = (currentSlide + 1) % backgroundImages.length;
    changeBackground(nextIndex);
}

// Previous slide
function prevSlide() {
    const prevIndex =
        (currentSlide - 1 + backgroundImages.length) %
        backgroundImages.length;
    changeBackground(prevIndex);
}

// Auto slide functions
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 6000); // Change slide every 6 seconds
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
}

function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

// Event listeners
nextPreview.addEventListener("click", nextSlide);
prevPreview.addEventListener("click", prevSlide);

// Keyboard navigation
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        prevSlide();
    } else if (e.key === "ArrowRight") {
        nextSlide();
    } else if (e.key === " ") {
        e.preventDefault();
        if (autoSlideInterval) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    }
});

// CTA Button handler
function handleCTAClick() {
    // Smooth scroll to attraction section
    const attractionSection = document.getElementById('attraction');
    if (attractionSection) {
        attractionSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Theme Toggle Function for new switch
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');

    if (!themeToggle) {
        return;
    }

    const savedTheme = localStorage.getItem('theme') || 'light';

    // Set initial theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'dark';

    console.log('Theme initialized:', savedTheme);

    // Add event listener
    themeToggle.addEventListener('change', function () {
        const newTheme = this.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        console.log('Theme changed to:', newTheme);
    });
}

// Navigation functionality
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const translationMenu = document.querySelector('.translation-menu');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Hamburger menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }

    // Dropdown functionality
    navItems.forEach(item => {
        const dropdown = item.querySelector('.dropdown');
        if (dropdown) {
            // Add keyboard navigation
            const navLink = item.querySelector('.nav-link');
            navLink.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    dropdown.classList.toggle('show');
                }
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', function (e) {
                if (!item.contains(e.target)) {
                    dropdown.classList.remove('show');
                }
            });

            // Close dropdown when mouse leaves the nav item
            item.addEventListener('mouseleave', function () {
                dropdown.classList.remove('show');
            });
        }
    });

    // Translation menu functionality
    if (translationMenu) {
        const translationToggle = translationMenu.querySelector('.translation-toggle');
        const translationDropdown = translationMenu.querySelector('.translation-dropdown');
        const translationLinks = translationMenu.querySelectorAll('.translation-link');

        // Keyboard navigation for translation menu
        translationToggle.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                translationDropdown.classList.toggle('show');
            }
        });

        // Handle language selection
        translationLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const flag = this.querySelector('.language-flag').src;
                const label = this.querySelector('span').textContent.trim();
                const shortCode = label.toLowerCase().startsWith('eng') ? 'EN' : 'ID';

                // Update the toggle display
                translationToggle.querySelector('.language-flag').src = flag;
                translationToggle.querySelector('span').textContent = shortCode;

                // Hide dropdown
                translationDropdown.classList.remove('show');

                // Here you would implement actual language switching
                console.log('Language changed to:', label);
            });
        });

        // Close translation dropdown when clicking outside
        document.addEventListener('click', function (e) {
            if (!translationMenu.contains(e.target)) {
                translationDropdown.classList.remove('show');
            }
        });

        // Close dropdown when mouse leaves the translation menu
        translationMenu.addEventListener('mouseleave', function () {
            translationDropdown.classList.remove('show');
        });
    }
}

// Touch/swipe support for mobile
let startX = 0;
let startY = 0;

document.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

document.addEventListener("touchend", (e) => {
    if (!startX || !startY) return;

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = startX - endX;
    const diffY = startY - endY;

    // Only trigger swipe if horizontal movement is greater than vertical
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (Math.abs(diffX) > 50) {
            // Minimum swipe distance
            if (diffX > 0) {
                nextSlide(); // Swipe left = next slide
            } else {
                prevSlide(); // Swipe right = previous slide
            }
        }
    }

    startX = 0;
    startY = 0;
});

// Header scroll effect
window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    if (window.scrollY > 50) {
        header.style.background = "rgba(0, 0, 0, 0.9)";
    } else {
        header.style.background = "rgba(255, 255, 255, 0.1)";
    }
});

// Pause auto-slide on hover
document.addEventListener("mouseenter", stopAutoSlide);
document.addEventListener("mouseleave", startAutoSlide);

// Sticky Video Effect
function initStickyVideo() {
    const aboutSection = document.querySelector('.about-section');
    const aboutVideo = document.querySelector('.about-video');

    if (!aboutSection || !aboutVideo) return;

    // Check if device is mobile (768px and below)
    function isMobile() {
        return window.innerWidth <= 768;
    }

    function updateStickyVideo() {
        // Skip sticky behavior on mobile
        if (isMobile()) {
            aboutVideo.classList.remove('sticky-active');
            return;
        }

        const sectionRect = aboutSection.getBoundingClientRect();
        const sectionTop = sectionRect.top;
        const sectionBottom = sectionRect.bottom;
        const windowHeight = window.innerHeight;

        // Check if section is in viewport
        const sectionInView = sectionTop < windowHeight && sectionBottom > 0;

        // Calculate progress through section (0 to 1)
        const sectionHeight = sectionRect.height;
        const scrollProgress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (sectionHeight + windowHeight)));

        if (sectionInView && scrollProgress > 0.1 && scrollProgress < 0.9) {
            // Video should be sticky and visible
            setTimeout(() => {
                // timer
                aboutVideo.style.display = 'block';
                aboutVideo.classList.add('sticky-active');
            }, 500);
        } else {
            // Video should be hidden
            aboutVideo.classList.remove('sticky-active');
            setTimeout(() => {
                aboutVideo.style.display = 'none';
            }, 500);
        }
    }

    // Throttled scroll handler for better performance
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateStickyVideo();
                ticking = false;
            });
            ticking = true;
        }
    }

    // Handle resize events to toggle sticky behavior
    function handleResize() {
        updateStickyVideo();
    }

    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Initial check
    updateStickyVideo();
}

// Scroll-triggered Animations
function initScrollAnimations() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // If user prefers reduced motion, make all elements visible immediately
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.classList.add('visible');
        });
        return;
    }

    // Intersection Observer for better performance
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements with animate-on-scroll class
        document.querySelectorAll('.animate-on-scroll').forEach((el, index) => {
            // Add staggered delay for attraction cards
            if (el.classList.contains('attraction-card')) {
                el.style.transitionDelay = `${(index * 0.07)}s`;
            }
            observer.observe(el);
        });
    } else {
        // Fallback for browsers without Intersection Observer
        function animateOnScroll() {
            const elements = document.querySelectorAll('.animate-on-scroll:not(.visible)');

            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;

                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        }

        // Debounced scroll handler
        let scrollTimeout;
        function handleScroll() {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(animateOnScroll, 10);
        }

        window.addEventListener('scroll', handleScroll);
        animateOnScroll(); // Run once on load
    }
}

// Enhanced sticky video with fade-in animation
function enhanceVideoAnimations() {
    const attractionVideo = document.querySelector('.attraction-video');

    if (attractionVideo) {
        // Add fade-in animation when video becomes sticky
        const originalUpdateFunction = updateStickyVideo;

        // Override the sticky video function to add animations
        window.updateStickyVideo = function () {
            if (typeof originalUpdateFunction === 'function') {
                originalUpdateFunction();
            }

            // Add fade-in animation class when video becomes active
            if (attractionVideo.classList.contains('sticky-active')) {
                attractionVideo.classList.add('animate-fade-in');
            } else {
                attractionVideo.classList.remove('animate-fade-in');
            }
        };
    }
}

// Comprehensive Attraction Section Animations
function initAttractionAnimations() {
    console.log('Initializing attraction section animations...');

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        console.log('Reduced motion detected, skipping animations');
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.classList.add('visible');
        });
        return;
    }

    // Intersection Observer for scroll-triggered animations
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('Element entering viewport:', entry.target.className);
                    entry.target.classList.add('visible');

                    // Add special effects for categories
                    if (entry.target.classList.contains('attraction-category')) {
                        setTimeout(() => {
                            entry.target.style.transform = 'translateY(0) scale(1)';
                        }, 100);
                    }

                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all animation elements
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        console.log('Intersection Observer set up for attraction animations');
    } else {
        // Fallback for older browsers
        console.log('Using fallback scroll detection');

        function checkAnimations() {
            const elements = document.querySelectorAll('.animate-on-scroll:not(.visible)');

            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;

                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        }

        let scrollTimeout;
        function handleScroll() {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(checkAnimations, 16);
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        checkAnimations();
    }
}

// Parallax effect for attraction section
function initAttractionParallax() {
    const attractionSection = document.querySelector('.attraction-section');
    if (!attractionSection) return;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const sectionTop = attractionSection.offsetTop;
        const sectionHeight = attractionSection.offsetHeight;
        const windowHeight = window.innerHeight;

        // Check if section is in viewport
        if (scrolled + windowHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
            const parallaxValue = (scrolled - sectionTop) * 0.1;
            attractionSection.style.setProperty('--scroll-y', `${parallaxValue}px`);
        }
    }

    let ticking = false;
    function handleParallaxScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', handleParallaxScroll, { passive: true });
}

// Enhanced hover effects for attraction categories
function initAttractionInteractions() {
    const categories = document.querySelectorAll('.attraction-category');

    categories.forEach(category => {
        category.addEventListener('mouseenter', () => {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 0;
                        height: 0;
                        background: radial-gradient(circle, var(--primary-light) 0%, transparent 70%);
                        border-radius: 50%;
                        transform: translate(-50%, -50%);
                        opacity: 0.3;
                        pointer-events: none;
                        z-index: 1;
                        transition: all 0.6s ease-out;
                    `;

            category.appendChild(ripple);

            // Animate ripple
            setTimeout(() => {
                ripple.style.width = '200px';
                ripple.style.height = '200px';
                ripple.style.opacity = '0';
            }, 10);

            // Remove ripple after animation
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
    console.log('DOM Content Loaded');
    initThemeToggle(); // Initialize theme toggle
    initNavigation(); // Initialize navigation
    initSlider();
    startAutoSlide();
    initStickyVideo(); // Initialize sticky video effect
    initAttractionAnimations(); // Initialize attraction animations
    initAttractionParallax(); // Initialize parallax effects
    initAttractionInteractions(); // Initialize interactive effects
});/*  */

// about video fullscreen
function fullscreenVideo() {
    const video = document.querySelector('.about-video video');
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    }
}

// Preload images for smoother transitions
function preloadImages() {
    backgroundImages.forEach((src) => {
        const img = new Image();
        img.src = src;
    });
}

// Call preload function
preloadImages();


// Smooth scroll for anchor links
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

// Loading functionality moved to js/loading-manager.js for better organization
