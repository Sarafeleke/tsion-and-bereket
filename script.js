// Envelope Opening Animation
document.addEventListener('DOMContentLoaded', function() {
    const envelope = document.getElementById('envelope');
    const envelopeFlap = document.getElementById('envelope-flap');
    const invitationCard = document.getElementById('invitation-card');
    const envelopeContainer = document.getElementById('envelope-container');
    const mainWebsite = document.getElementById('main-website');
    const openBtn = document.getElementById('open-btn');

    // Auto-open envelope after 2 seconds
    setTimeout(() => {
        openEnvelope();
    }, 2000);

    // Click to open envelope
    envelope.addEventListener('click', openEnvelope);
    openBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        openMainWebsite();
    });

    function openEnvelope() {
        envelopeFlap.classList.add('open');
        invitationCard.classList.add('show');
    }

    function openMainWebsite() {
        envelopeContainer.classList.add('hidden');
        mainWebsite.classList.remove('hidden');
        
        // Remove blinking animation from button
        openBtn.style.animation = 'none';
        
        setTimeout(() => {
            mainWebsite.classList.add('visible');
        }, 100);
    }

    // Initialize countdown timer
    initCountdown();
    
    // Initialize gallery lightbox
    initGallery();
    
    // Initialize RSVP form
    initRSVP();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize 3D tilt effects
    initTiltEffects();
});

// Countdown Timer
function initCountdown() {
    // Set to 37 days for display
    const targetDays = 37;
    const targetHours = 0;
    const targetMinutes = 0;
    const targetSeconds = 0;
    
    // Calculate target timestamp (37 days from now)
    const now = new Date().getTime();
    const targetTime = now + (targetDays * 24 * 60 * 60 * 1000);
    
    function updateCountdown() {
        const currentTime = new Date().getTime();
        const distance = targetTime - currentTime;
        
        if (distance < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update with animation
        animateNumber('days', days);
        animateNumber('hours', hours);
        animateNumber('minutes', minutes);
        animateNumber('seconds', seconds);
    }
    
    function animateNumber(id, value) {
        const element = document.getElementById(id);
        const currentValue = element.textContent;
        const newValue = value.toString().padStart(2, '0');
        
        if (currentValue !== newValue) {
            element.style.transform = 'scale(1.2)';
            element.textContent = newValue;
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        }
    }
    
    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Gallery Lightbox
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            lightboxImage.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeLightbox.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// RSVP Form
function initRSVP() {
    const rsvpForm = document.getElementById('rsvp-form');
    
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(rsvpForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            attending: formData.get('attending'),
            message: formData.get('message')
        };
        
        // Validate form
        if (!data.name || !data.email || !data.attending) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = rsvpForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Thank you for your RSVP! We\'ll be in touch soon.', 'success');
            rsvpForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Notification System
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #4caf50, #45a049)' : 'linear-gradient(135deg, #f44336, #da190b)'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 3000;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
        max-width: 300px;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Add animate-in class styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// 3D Tilt Effects
function initTiltEffects() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', handleTilt);
        element.addEventListener('mouseleave', resetTilt);
    });
    
    function handleTilt(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        this.style.transition = 'transform 0.1s ease';
    }
    
    function resetTilt() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        this.style.transition = 'transform 0.3s ease';
    }
}

// Smooth scrolling for navigation (if navigation is added)
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add touch-friendly swipe support for gallery on mobile
let touchStartX = 0;
let touchEndX = 0;
let currentImageIndex = 0;
const galleryImages = document.querySelectorAll('.gallery-item img');

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left - next image
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        openImage(currentImageIndex);
    }
    if (touchEndX > touchStartX + 50) {
        // Swipe right - previous image
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        openImage(currentImageIndex);
    }
}

function openImage(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    lightboxImage.src = galleryImages[index].src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Add touch events to gallery items
galleryImages.forEach((img, index) => {
    img.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        currentImageIndex = index;
    });
    
    img.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
});

// Form validation enhancements
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        
        field.classList.remove('error');
        
        if (!value && field.hasAttribute('required')) {
            field.classList.add('error');
            return false;
        }
        
        if (fieldType === 'email' && value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                field.classList.add('error');
                return false;
            }
        }
        
        return true;
    }
});

// Add error styling
const errorStyle = document.createElement('style');
errorStyle.textContent = `
    .error {
        border-color: #f44336 !important;
        box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.2) !important;
    }
    
    .notification {
        animation: slideIn 0.3s ease;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(errorStyle);

// Performance optimization - Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Add loading states
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);
