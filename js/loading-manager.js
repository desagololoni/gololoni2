// Enhanced Loading Screen Manager with Session-Based Logic
class EnhancedLoadingManager {
    constructor() {
        this.loadingScreen = document.querySelector('.loading-screen');
        this.progressFill = document.querySelector('.loading-progress-fill');
        this.percentageText = document.querySelector('.loading-percentage');
        this.statusText = document.querySelector('.loading-status');

        // Configuration
        this.duration = 300; // Reduced to 3 seconds for better UX
        this.sessionTimeout = 30 * 60 * 1000; // 30 minutes in milliseconds
        this.startTime = null;
        this.animationId = null;
        this.resourcesLoaded = false;
        this.shouldShowLoading = false;

        this.statusMessages = [
            'Memuat Desa Wisata Golo Loni...',
            'Menyiapkan konten wisata...',
            'Hampir selesai...',
            'Selamat datang!'
        ];

        this.init();
    }

    init() {
        // Check if loading screen should be shown
        this.shouldShowLoading = this.shouldShowLoadingScreen();
        
        if (!this.shouldShowLoading) {
            // Hide loading screen immediately if not needed
            this.hideLoadingScreenImmediately();
            return;
        }

        // Prevent scrolling during loading
        document.body.style.overflow = 'hidden';

        // Start loading detection
        this.detectPageLoad();
    }

    shouldShowLoadingScreen() {
        try {
            const lastVisit = localStorage.getItem('gololoni_last_visit');
            const hasSeenLoading = sessionStorage.getItem('gololoni_loading_shown');
            const currentTime = Date.now();

            // Show loading if:
            // 1. First time visitor (no localStorage entry)
            // 2. Returning after session timeout
            // 3. Haven't seen loading in current session
            // 4. Page was refreshed (check performance navigation API)
            
            const isPageRefresh = performance.navigation && 
                                 performance.navigation.type === performance.navigation.TYPE_RELOAD;
            
            const isFirstVisit = !lastVisit;
            const isAfterTimeout = lastVisit && (currentTime - parseInt(lastVisit)) > this.sessionTimeout;
            const isNewSession = !hasSeenLoading;

            return isFirstVisit || isAfterTimeout || isNewSession || isPageRefresh;
        } catch (error) {
            console.warn('Error checking loading screen conditions:', error);
            // Default to showing loading screen if there's an error
            return true;
        }
    }

    detectPageLoad() {
        // Track resource loading
        let resourcesLoaded = 0;
        let totalResources = 0;

        // Count images and other resources
        const images = document.querySelectorAll('img');
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        const scripts = document.querySelectorAll('script[src]');
        
        totalResources = images.length + stylesheets.length + scripts.length;

        // If no resources to load, start animation immediately
        if (totalResources === 0) {
            this.startLoadingAnimation();
            return;
        }

        // Track image loading
        images.forEach(img => {
            if (img.complete) {
                resourcesLoaded++;
            } else {
                img.addEventListener('load', () => {
                    resourcesLoaded++;
                    this.checkResourcesComplete(resourcesLoaded, totalResources);
                });
                img.addEventListener('error', () => {
                    resourcesLoaded++;
                    this.checkResourcesComplete(resourcesLoaded, totalResources);
                });
            }
        });

        // Use multiple loading detection methods
        const loadingMethods = [
            // Method 1: Window load event
            new Promise(resolve => {
                if (document.readyState === 'complete') {
                    resolve();
                } else {
                    window.addEventListener('load', resolve);
                }
            }),
            
            // Method 2: Document ready state
            new Promise(resolve => {
                if (document.readyState === 'complete') {
                    resolve();
                } else {
                    const checkReady = () => {
                        if (document.readyState === 'complete') {
                            resolve();
                        } else {
                            setTimeout(checkReady, 100);
                        }
                    };
                    checkReady();
                }
            }),

            // Method 3: Timeout fallback
            new Promise(resolve => setTimeout(resolve, 5000))
        ];

        // Start animation when any method completes
        Promise.race(loadingMethods).then(() => {
            this.resourcesLoaded = true;
            this.startLoadingAnimation();
        });

        // Also check initial resource state
        this.checkResourcesComplete(resourcesLoaded, totalResources);
    }

    checkResourcesComplete(loaded, total) {
        if (loaded >= total && !this.resourcesLoaded) {
            this.resourcesLoaded = true;
            this.startLoadingAnimation();
        }
    }

    startLoadingAnimation() {
        this.startTime = performance.now();
        this.animate();
        this.updateStatus();
    }

    animate() {
        const currentTime = performance.now();
        const elapsed = currentTime - this.startTime;
        const progress = Math.min(elapsed / this.duration, 1);

        // Smooth easing function (ease-out)
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        // Update progress bar
        const percentage = Math.floor(easedProgress * 100);
        this.progressFill.style.width = `${percentage}%`;
        this.percentageText.textContent = `${percentage}%`;

        if (progress < 1) {
            this.animationId = requestAnimationFrame(() => this.animate());
        } else {
            this.completeLoading();
        }
    }

    updateStatus() {
        let messageIndex = 0;
        const messageInterval = this.duration / this.statusMessages.length;

        const updateMessage = () => {
            if (messageIndex < this.statusMessages.length && this.statusText) {
                this.statusText.textContent = this.statusMessages[messageIndex];
                messageIndex++;

                if (messageIndex < this.statusMessages.length) {
                    setTimeout(updateMessage, messageInterval);
                }
            }
        };

        updateMessage();
    }

    completeLoading() {
        // Ensure 100% is shown
        if (this.progressFill) this.progressFill.style.width = '100%';
        if (this.percentageText) this.percentageText.textContent = '100%';
        if (this.statusText) this.statusText.textContent = 'Selamat datang di Golo Loni!';

        // Update session storage and localStorage
        this.updateVisitTracking();

        // Hide loading screen after a brief delay
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 300);
    }

    updateVisitTracking() {
        try {
            const currentTime = Date.now();
            localStorage.setItem('gololoni_last_visit', currentTime.toString());
            sessionStorage.setItem('gololoni_loading_shown', 'true');
        } catch (error) {
            console.warn('Error updating visit tracking:', error);
        }
    }

    hideLoadingScreen() {
        if (!this.loadingScreen) return;

        this.loadingScreen.classList.add('hidden');

        // Remove from DOM after transition completes
        setTimeout(() => {
            if (this.loadingScreen && this.loadingScreen.parentNode) {
                this.loadingScreen.style.display = 'none';
            }
        }, 500);

        // Enable scrolling
        document.body.style.overflow = 'auto';
    }

    hideLoadingScreenImmediately() {
        if (!this.loadingScreen) return;

        this.loadingScreen.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Public method to force show loading (for testing or special cases)
    forceShow() {
        sessionStorage.removeItem('gololoni_loading_shown');
        localStorage.removeItem('gololoni_last_visit');
        location.reload();
    }
}

// Initialize enhanced loading manager
document.addEventListener('DOMContentLoaded', () => {
    new EnhancedLoadingManager();
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnhancedLoadingManager;
}
