// Image data with reliable placeholder URLs
const images = [
    // ... (keep all your existing image data)
   {
        src: 'https://picsum.photos/id/1018/800/600',
        alt: 'Mountain landscape at sunset',
        category: 'nature'
    },
    {
        src: 'https://picsum.photos/id/1015/800/600',
        alt: 'Cliff overlooking the ocean',
        category: 'nature'
    },
    {
        src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'A Beautiful girl\'s face',
        category: 'people'
    },
    {
        src: 'https://picsum.photos/id/1019/800/600',
        alt: 'Tropical beach with crystal clear water',
        category: 'nature'
    },
    {
        src: 'https://wallpaperaccess.com/full/2677531.jpg',
        alt: 'Urban skyline with modern architecture',
        category: 'architecture'
    },
    {
        src: 'https://th.bing.com/th/id/OIP.HVYiCV49sfBoOzO1qNq1WAHaE8?w=304&h=203&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
        alt: 'Ancient stone bridge',
        category: 'architecture'
    },
    {
        src: 'https://th.bing.com/th/id/OIP.WSYHcIUPTJDFoaB0gwOCKQHaHa?rs=1&pid=ImgDetMain',
        alt: 'Delicious pasta dish',
        category: 'food'
    },
    {
        src: 'https://static.vecteezy.com/system/resources/previews/029/267/147/large_2x/colorful-fruit-platter-visual-delight-vitamins-generative-ai-photo.jpeg',
        alt: 'Colorful fruit platter',
        category: 'food'
    },
    {
        src: 'https://picsum.photos/id/1021/800/600',
        alt: 'Snowy mountain peaks',
        category: 'travel'
    },
    {
        src: 'https://th.bing.com/th/id/OIP.hMkdo1zObBPYy1kbQjMNmwHaE7?w=248&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
        alt: 'Historic European street',
        category: 'travel'
    },
    {
        src: 'https://picsum.photos/id/1023/800/600',
        alt: 'Cozy cabin in the woods',
        category: 'travel'
    },
    {
        src: 'https://picsum.photos/id/1024/800/600',
        alt: 'Wild Eagle in forest',
        category: 'animal'
    },
    {
        src: 'https://picsum.photos/id/1025/800/600',
        alt: 'Golden retriever puppy',
        category: 'animal'
    },
    {
        src: 'https://picsum.photos/id/1026/800/600',
        alt: 'Train Track',
        category: 'travel'
    },
    
    {
        src: 'https://picsum.photos/id/1045/800/600',
        alt: 'Cloud-Kissed Mountain Peak',
        category: 'nature'
    },
    {
        src: 'https://media.istockphoto.com/id/1358997053/photo/young-man-stock-phooto.webp?a=1&b=1&s=612x612&w=0&k=20&c=NbXhMBtw4mUq5cZBoq8Zz0Bt0qLIHS2kHPNOSKd2Kpw=',
        alt: 'A man in yellow background',
        category: 'people'
    }
];

// DOM elements
const gallery = document.getElementById('gallery');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const filterBtns = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

// State variables
let currentPage = 1;
const itemsPerPage = 8;
let filteredImages = [...images];
let currentLightboxIndex = 0;

// Initialize gallery
function initGallery() {
    renderGallery();
    updateNavButtons();
}

// Render gallery items
function renderGallery() {
    gallery.innerHTML = '';
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedImages = filteredImages.slice(startIndex, endIndex);
    
    if (paginatedImages.length === 0) {
        gallery.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No images found in this category</p>';
        return;
    }
    
    paginatedImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.index = startIndex + index;
        
        galleryItem.innerHTML = `
            <div class="loading">
                <div class="loading-spinner"></div>
            </div>
            <img src="${image.src}" alt="${image.alt}" class="gallery-img" onload="this.previousElementSibling.style.display='none'" onerror="handleImageError(this)">
            <div class="gallery-caption">${image.alt}</div>
        `;
        
        galleryItem.addEventListener('click', () => openLightbox(startIndex + index));
        gallery.appendChild(galleryItem);
    });
}

// Handle image loading errors
function handleImageError(img) {
    const loadingElement = img.previousElementSibling;
    loadingElement.style.display = 'none';
    img.src = 'https://picsum.photos/id/1/800/600';
    img.alt = 'Image not available';
}

// Update navigation buttons
function updateNavButtons() {
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === Math.ceil(filteredImages.length / itemsPerPage);
}

// Filter images by category
function filterImages(category) {
    if (category === 'all') {
        filteredImages = [...images];
    } else {
        filteredImages = images.filter(image => image.category === category);
    }
    
    currentPage = 1;
    renderGallery();
    updateNavButtons();
}

// Navigate gallery pages
function navigateGallery(direction) {
    if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    } else if (direction === 'next' && currentPage < Math.ceil(filteredImages.length / itemsPerPage)) {
        currentPage++;
    }
    renderGallery();
    updateNavButtons();
}

// Open lightbox
function openLightbox(index) {
    currentLightboxIndex = index;
    lightboxImg.src = filteredImages[index].src;
    lightboxCaption.textContent = filteredImages[index].alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Navigate lightbox
function navigateLightbox(direction) {
    if (direction === 'prev' && currentLightboxIndex > 0) {
        currentLightboxIndex--;
    } else if (direction === 'next' && currentLightboxIndex < filteredImages.length - 1) {
        currentLightboxIndex++;
    }
    
    lightboxImg.src = filteredImages[currentLightboxIndex].src;
    lightboxCaption.textContent = filteredImages[currentLightboxIndex].alt;
}

// Event listeners for gallery navigation buttons
prevBtn.addEventListener('click', () => navigateGallery('prev'));
nextBtn.addEventListener('click', () => navigateGallery('next'));

// Event listeners for filter buttons
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterImages(btn.dataset.category);
    });
});

// Event listeners for lightbox controls
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => navigateLightbox('prev'));
lightboxNext.addEventListener('click', () => navigateLightbox('next'));

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        // Lightbox is open - handle lightbox navigation
        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                navigateLightbox('prev');
                break;
            case 'ArrowRight':
                navigateLightbox('next');
                break;
        }
    } else {
        // Lightbox is closed - handle gallery navigation
        switch (e.key) {
            case 'ArrowLeft':
                if (!prevBtn.disabled) {
                    navigateGallery('prev');
                }
                break;
            case 'ArrowRight':
                if (!nextBtn.disabled) {
                    navigateGallery('next');
                }
                break;
        }
    }
});

// Initialize the gallery
initGallery();
