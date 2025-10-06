const galleryImages = [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'
];

let currentImageIndex = 0;
let startX = 0;
let startY = 0;
let distX = 0;
let distY = 0;

// Elements
const galleryButton = document.querySelector('.accommodation-gallery');
const overlay = document.getElementById('galleryOverlay');
const popup = document.getElementById('galleryPopup');
const closeBtn = document.getElementById('galleryClose');
const mainImage = document.getElementById('mainImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const thumbnailsContainer = document.getElementById('thumbnails');
const currentIndexSpan = document.getElementById('currentIndex');
const totalImagesSpan = document.getElementById('totalImages');

// Initialize gallery
function initGallery() {
    totalImagesSpan.textContent = galleryImages.length;
    createThumbnails();
    showImage(0);
}

// Create thumbnail images
function createThumbnails() {
    thumbnailsContainer.innerHTML = '';
    galleryImages.forEach((src, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = src;
        thumbnail.className = 'gallery-thumbnail';
        thumbnail.addEventListener('click', () => showImage(index));
        thumbnailsContainer.appendChild(thumbnail);
    });
}

// Show specific image
function showImage(index) {
    currentImageIndex = index;
    mainImage.src = galleryImages[index];
    currentIndexSpan.textContent = index + 1;

    // Update active thumbnail
    document.querySelectorAll('.gallery-thumbnail').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });

    // Scroll thumbnail into view
    const activeThumbnail = document.querySelectorAll('.gallery-thumbnail')[index];
    activeThumbnail.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
    });
}

// Navigation functions
function showPrevImage() {
    const newIndex = currentImageIndex === 0 ? galleryImages.length - 1 : currentImageIndex - 1;
    showImage(newIndex);
}

function showNextImage() {
    const newIndex = currentImageIndex === galleryImages.length - 1 ? 0 : currentImageIndex + 1;
    showImage(newIndex);
}

// Touch/Swipe functionality
function handleTouchStart(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
}

function handleTouchMove(e) {
    e.preventDefault();
}

function handleTouchEnd(e) {
    distX = e.changedTouches[0].clientX - startX;
    distY = e.changedTouches[0].clientY - startY;

    // Only trigger swipe if horizontal distance is greater than vertical
    if (Math.abs(distX) > Math.abs(distY) && Math.abs(distX) > 50) {
        if (distX > 0) {
            showPrevImage();
        } else {
            showNextImage();
        }
    }
}

// Event listeners
galleryButton.addEventListener('click', () => {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
});

overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

prevBtn.addEventListener('click', showPrevImage);
nextBtn.addEventListener('click', showNextImage);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('active')) return;

    switch (e.key) {
        case 'Escape':
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            break;
        case 'ArrowLeft':
            showPrevImage();
            break;
        case 'ArrowRight':
            showNextImage();
            break;
    }
});

// Touch events for mobile swipe
mainImage.addEventListener('touchstart', handleTouchStart, { passive: true });
mainImage.addEventListener('touchmove', handleTouchMove, { passive: false });
mainImage.addEventListener('touchend', handleTouchEnd, { passive: true });

// Initialize gallery when page loads
initGallery();