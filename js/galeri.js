// Define your gallery images with paths from img/ folder
const galleryImages = [
    { src: "images/aboutus.jpg" },
    { src: "images/airterjun.jpeg" },
    { src: "images/bambu.jpeg" },
    { src: "images/bg1.jpeg" },
    { src: "images/bg2.jpg" },
    { src: "images/bg3.jpg" },
    { src: "img/sungai2.jpg" },
    { src: "images/bg4.jpg" },
    { src: "images/bg5.jpg" },
    { src: "images/bukitgolo.jpg" },
    { src: "images/danau1.jpg" },
    { src: "img/kopi.jpg" },
    { src: "images/danau2.jpg" },
    { src: "img/sungai.jpg" },
    { src: "images/gua.jpeg" },
    { src: "images/kedaikopi.jpg" },
    { src: "img/birdwatching.jpg" },
    { src: "images/mancing.jpeg" },
    { src: "images/rivercamp.jpeg" },
    { src: "img/rivertracking.jpg" },
    { src: "img/flyingfox.jpeg" },
    { src: "images/rivertubbing.jpeg" },
    { src: "img/gua.jpg" },
    { src: "images/bersepeda.jpeg" },
    { src: "images/tuak.jpeg" },
    { src: "img/rivertubbing.jpg" },
    { src: "img/homestay2.jpeg" }
];

// Gallery initialization function
function initGallery() {
    const container = document.getElementById('galeriGalleryContainer');
    container.innerHTML = '';

    // Determine number of columns based on screen width
    let numCols;
    const width = window.innerWidth;

    if (width < 600) {
        numCols = 1; // Single column for mobile
    } else if (width < 1000) {
        numCols = 2; // Two columns for tablets
    } else {
        numCols = 3; // Three columns for desktop
    }

    // Create column containers
    const columns = [];
    for (let i = 0; i < numCols; i++) {
        const col = document.createElement('div');
        col.className = `galeri-gallery-column galeri-column-${i + 1}`;
        container.appendChild(col);
        columns.push(col);
    }

    // Process all images
    galleryImages.forEach((image, index) => {
        const colIndex = index % numCols;
        const itemElement = document.createElement('div');
        itemElement.className = 'galeri-gallery-item';

        // Create image element
        const imgElement = document.createElement('img');
        imgElement.className = 'galeri-gallery-img';
        imgElement.src = image.src;
        imgElement.alt = image.alt;
        imgElement.loading = "lazy"; // Enable lazy loading for performance

        // Add loading state
        itemElement.classList.add('galeri-gallery-item-loading');

        // Handle image load
        imgElement.onload = function () {
            itemElement.classList.remove('galeri-gallery-item-loading');
            // Optional: force layout recalculation if using additional JS layout
            // masonry.layout();
        };

        // Error handling
        imgElement.onerror = function () {
            itemElement.classList.add('galeri-gallery-item-error');
            itemElement.innerHTML = `<div class="galeri-gallery-error">Image not found</div>`;
        };

        itemElement.appendChild(imgElement);
        columns[colIndex].appendChild(itemElement);
    });
}

// Initialize gallery on load
document.addEventListener('DOMContentLoaded', initGallery);

// Reinitialize on window resize
let resizeTimer;
window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initGallery, 250);
});