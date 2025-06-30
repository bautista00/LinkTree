
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 Inicializando galería artística...');
    
    initGalleryAnimations();
    initHoverEffects();
    
    console.log('✨ Galería cargada correctamente');
});


function initGalleryAnimations() {
    initScrollObserver();
}

function initScrollObserver() {
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
    
    document.querySelectorAll('.gallery-item, .section-title').forEach(el => {
        observer.observe(el);
    });
}

function initHoverEffects() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const image = item.querySelector('.gallery-image');
        
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
    
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', function() {
            createRippleEffect(this);
        });
    });
}

function createRippleEffect(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.transform = 'translate(-50%, -50%) scale(0)';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
    ripple.style.borderRadius = '50%';
    ripple.style.position = 'absolute';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'ripple 0.6s linear';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}


function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}


document.querySelectorAll('.gallery-image').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
        this.style.transform = 'scale(1)';
    });
    
    img.addEventListener('error', function() {
        this.style.opacity = '0.5';
        this.alt = 'Error al cargar la imagen';
    });
});


window.addEventListener('load', function() {
    initLazyLoading();
    
    document.body.style.opacity = '1';
    
    console.log('🎉 Galería completamente inicializada');
});

window.addEventListener('error', function(e) {
    console.error('💥 Error en la galería:', e.error);
});

const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
        }
    }
    
    .gallery-image {
        opacity: 0;
        transform: scale(0.9);
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .gallery-image.loaded {
        opacity: 1;
        transform: scale(1);
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
`;

document.head.appendChild(style); 