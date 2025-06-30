

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 Inicializando animaciones...');
    
    initMagicButton();
    initAudioVisualizer();
    initTypewriterEffect();
    initAnimationObserver();
    
    console.log('✨ Animaciones cargadas correctamente');
});



function initMagicButton() {
    const magicButton = document.getElementById('magicBtn');
    if (!magicButton) return;

    let clickCount = 0;
    const colors = [
        '#667eea', '#764ba2', '#f093fb', '#f5576c', 
        '#4facfe', '#00f2fe', '#43e97b', '#38f9d7'
    ];

    magicButton.addEventListener('click', function(e) {
        clickCount++;
        

        const buttonText = magicButton.querySelector('.button-text');
        buttonText.textContent = `¡Clic ${clickCount}!`;
        

        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        magicButton.style.background = `linear-gradient(135deg, ${randomColor}, ${adjustBrightness(randomColor, 20)})`;
        

        createClickParticles(e, randomColor);
        

        magicButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            magicButton.style.transform = 'scale(1)';
        }, 150);
    });
}

function createClickParticles(event, color) {
    const rect = event.target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 12; i++) {
        createParticle(centerX, centerY, color);
    }
}

function createParticle(x, y, color) {
    const particle = document.createElement('div');
    particle.className = 'magic-particle';
    

    particle.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        box-shadow: 0 0 10px ${color};
        left: ${x}px;
        top: ${y}px;
    `;
    
    document.body.appendChild(particle);
    

    const angle = Math.random() * Math.PI * 2;
    const velocity = 150 + Math.random() * 100;
    const gravity = 300;
    
    let posX = x;
    let posY = y;
    let velX = Math.cos(angle) * velocity;
    let velY = Math.sin(angle) * velocity;
    let opacity = 1;
    let scale = 1;
    
    const startTime = Date.now();
    const duration = 1000;
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;
        
        if (progress >= 1) {
            particle.remove();
            return;
        }
        
        const deltaTime = 16 / 1000; // 60fps
        velY += gravity * deltaTime;
        posX += velX * deltaTime;
        posY += velY * deltaTime;
        
        opacity = 1 - progress;
        scale = 1 - progress * 0.5;
        
        particle.style.transform = `translate(-50%, -50%) scale(${scale})`;
        particle.style.left = posX + 'px';
        particle.style.top = posY + 'px';
        particle.style.opacity = opacity;
        
        requestAnimationFrame(animate);
    }
    
    requestAnimationFrame(animate);
}



function initAudioVisualizer() {
    const audioToggle = document.getElementById('audioToggle');
    const audioBars = document.querySelectorAll('.audio-bar');
    
    if (!audioToggle || !audioBars.length) return;
    
    let isPlaying = false;
    let animationId = null;
    
    audioToggle.addEventListener('click', function() {
        isPlaying = !isPlaying;
        
        const icon = audioToggle.querySelector('i');
        if (isPlaying) {
            icon.className = 'fas fa-pause';
            startAudioAnimation();
        } else {
            icon.className = 'fas fa-play';
            stopAudioAnimation();
        }
    });
    
    function startAudioAnimation() {
        audioBars.forEach((bar, index) => {
            bar.style.animationPlayState = 'running';
            bar.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    function stopAudioAnimation() {
        audioBars.forEach(bar => {
            bar.style.animationPlayState = 'paused';
        });
    }
}



function initTypewriterEffect() {
    const typewriterElement = document.getElementById('typewriterText');
    if (!typewriterElement) return;
    
    const texts = [
        'Desarrollador Web...',
        'Frontend Developer...',
        'JavaScript Expert...',
        'CSS Animator...',
        'React Developer...'
    ];
    
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentText = texts[currentTextIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % texts.length;
                setTimeout(typeWriter, 500); 
                return;
            }
        } else {
            typewriterElement.textContent = currentText.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            
            if (currentCharIndex === currentText.length) {
                isDeleting = true;
                setTimeout(typeWriter, 2000); 
                return;
            }
        }
        
        setTimeout(typeWriter, isDeleting ? 50 : 100);
    }
    
    setTimeout(typeWriter, 1000);
}



function initAnimationObserver() {
    const animationCards = document.querySelectorAll('.animation-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    
    animationCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}



function adjustBrightness(color, amount) {
    const usePound = color[0] === '#';
    const col = usePound ? color.slice(1) : color;
    
    const num = parseInt(col, 16);
    let r = (num >> 16) + amount;
    let g = (num >> 8 & 0x00FF) + amount;
    let b = (num & 0x0000FF) + amount;
    
    r = r > 255 ? 255 : r < 0 ? 0 : r;
    g = g > 255 ? 255 : g < 0 ? 0 : g;
    b = b > 255 ? 255 : b < 0 ? 0 : b;
    
    return (usePound ? '#' : '') + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
}



document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.animation-card');
    
    cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        });
    });
});


window.addEventListener('scroll', function() {
    const circles = document.querySelectorAll('.floating-circle');
    const scrolled = window.pageYOffset;
    
    circles.forEach((circle, index) => {
        const rate = scrolled * (0.5 + index * 0.1);
        circle.style.transform = `translateY(${rate}px)`;
    });
});

function throttle(func, wait) {
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


const throttledScrollHandler = throttle(function() {
    const circles = document.querySelectorAll('.floating-circle');
    const scrolled = window.pageYOffset;
    
    circles.forEach((circle, index) => {
        const rate = scrolled * (0.3 + index * 0.1);
        circle.style.transform = `translateY(${rate}px)`;
    });
}, 16); 

window.addEventListener('scroll', throttledScrollHandler);



function logAnimation(animationName, status) {
    console.log(`🎯 ${animationName}: ${status}`);
}


document.addEventListener('animationend', function(e) {
    if (e.target.classList.contains('animation-card')) {
        logAnimation('Card Animation', 'completada');
    }
});


document.addEventListener('click', function(e) {
    if (e.target.closest('.magic-button')) {
        logAnimation('Magic Button', 'click detectado');
    }
    if (e.target.closest('.audio-toggle')) {
        logAnimation('Audio Visualizer', 'toggle activado');
    }
}); 