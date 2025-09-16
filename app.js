// Progress bar functionality
function updateProgressBar() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('progress-bar').style.width = scrolled + '%';
}

// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Vehicle image switching function
function switchImage(dot, imageIndex) {
    const vehicleCard = dot.closest('.vehicle-card');
    const images = vehicleCard.querySelectorAll('.vehicle-img');
    const dots = vehicleCard.querySelectorAll('.dot');
    
    // Remove active class from all images and dots
    images.forEach(img => img.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    // Add active class to selected image and dot
    images[imageIndex].classList.add('active');
    dot.classList.add('active');
}

// Animated counter function
function animateCounter(element, start, end, duration) {
    let startTime = null;
    
    function animate(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);
        
        // Format large numbers
        if (end >= 1000) {
            element.textContent = current.toLocaleString('en-IN');
        } else {
            element.textContent = current;
        }
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Final formatting for specific cases
            if (end >= 100000) {
                element.textContent = (end / 1000).toFixed(0) + 'K';
            } else if (end === 300) {
                element.textContent = '300+';
            } else {
                element.textContent = end.toLocaleString('en-IN');
            }
        }
    }
    
    requestAnimationFrame(animate);
}

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
            
            // Animate counters when they come into view
            if (entry.target.classList.contains('stat-number') || 
                entry.target.classList.contains('achievement-number')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, 0, target, 2000);
            }
            
            // Animate score bars
            if (entry.target.classList.contains('score-fill')) {
                const score = entry.target.getAttribute('data-score');
                setTimeout(() => {
                    entry.target.style.background = `linear-gradient(to right, var(--color-primary) 0%, var(--color-teal-300) ${score}%, var(--color-border) ${score}%, var(--color-border) 100%)`;
                }, 500);
            }
        }
    });
}, observerOptions);

// Enhanced scroll effects for navbar
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset > 50;
    
    if (scrolled) {
        navbar.style.background = 'rgba(19, 52, 59, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(19, 52, 59, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
}

// Active navigation highlight
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && 
            window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// Parallax effect for hero section
function handleParallax() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${rate}px)`;
    }
}

// Initialize counters with specific formatting
function initializeCounters() {
    // Special handling for kilometers
    const kmCounter = document.querySelector('[data-target="130000"]');
    if (kmCounter) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let start = 0;
                    const end = 130000;
                    const duration = 2000;
                    let startTime = null;
                    
                    function animate(currentTime) {
                        if (startTime === null) startTime = currentTime;
                        const progress = Math.min((currentTime - startTime) / duration, 1);
                        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                        const current = Math.floor(start + (end - start) * easeOutQuart);
                        
                        if (current >= 100000) {
                            kmCounter.textContent = (current / 1000).toFixed(0) + 'K';
                        } else {
                            kmCounter.textContent = current.toLocaleString('en-IN');
                        }
                        
                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            kmCounter.textContent = '1.3L';
                        }
                    }
                    
                    requestAnimationFrame(animate);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(kmCounter);
    }

    // Special handling for 300+ Process Automation
    const processCounter = document.querySelector('[data-target="300"]');
    if (processCounter) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let start = 0;
                    const end = 300;
                    const duration = 2000;
                    let startTime = null;
                    
                    function animate(currentTime) {
                        if (startTime === null) startTime = currentTime;
                        const progress = Math.min((currentTime - startTime) / duration, 1);
                        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                        const current = Math.floor(start + (end - start) * easeOutQuart);
                        
                        processCounter.textContent = current;
                        
                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            processCounter.textContent = '300+';
                        }
                    }
                    
                    requestAnimationFrame(animate);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(processCounter);
    }
}

// Enhanced click handlers for buttons
function setupButtonHandlers() {
    // CTA buttons
    const ctaButtons = document.querySelectorAll('.btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Handle specific button actions
            const text = this.textContent.trim();
            if (text === 'Start The Engine') {
                scrollToSection('love-story');
            } else if (text === 'Get In Touch') {
                scrollToSection('contact');
            } else if (text === 'Book Meeting') {
                // Simulate booking action
                this.textContent = 'Opening Calendar...';
                setTimeout(() => {
                    this.textContent = 'Book Meeting';
                    alert('Calendar integration would be implemented here!');
                }, 1000);
            } else if (text === 'See Work') {
                // Simulate portfolio action
                this.textContent = 'Loading Portfolio...';
                setTimeout(() => {
                    this.textContent = 'See Work';
                    alert('Portfolio link would be implemented here!');
                }, 1000);
            } else if (text === 'Get in Touch') {
                // Simulate contact action
                alert('Contact form or direct email link would be implemented here!\nEmail: kunal@growth.drive');
            }
        });
    });
}

// Enhanced speedometer animation
function enhanceSpeedometer() {
    const needle = document.querySelector('.needle');
    if (needle) {
        let rotation = 0;
        const maxRotation = 90;
        let increasing = true;
        
        setInterval(() => {
            if (increasing) {
                rotation += 2;
                if (rotation >= maxRotation) {
                    increasing = false;
                }
            } else {
                rotation -= 2;
                if (rotation <= 0) {
                    increasing = true;
                }
            }
            
            needle.style.transform = `translateX(-50%) rotate(${rotation}deg)`;
        }, 100);
    }
}

// Typewriter effect for hero title
function typewriterEffect() {
    const title = document.querySelector('.hero-title');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        title.style.borderRight = '2px solid var(--color-primary)';
        
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                setTimeout(() => {
                    title.style.borderRight = 'none';
                }, 1000);
            }
        }, 50);
    }
}

// Scroll-triggered card animations
function setupCardAnimations() {
    const cards = document.querySelectorAll('.stat-card, .connection-card, .achievement-card, .insight-card, .quote-card, .contact-card, .vehicle-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    cards.forEach(card => cardObserver.observe(card));
}

// Score bar animation with better visual feedback
function animateScoreBars() {
    const scoreFills = document.querySelectorAll('.score-fill');
    
    scoreFills.forEach(fill => {
        const scoreObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const score = entry.target.getAttribute('data-score');
                    setTimeout(() => {
                        entry.target.style.background = `linear-gradient(to right, var(--color-primary) 0%, var(--color-teal-300) ${score}%, var(--color-border) ${score}%, var(--color-border) 100%)`;
                        entry.target.style.backgroundSize = '100% 100%';
                        entry.target.style.transition = 'background 2s ease-in-out';
                    }, 300);
                    scoreObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        scoreObserver.observe(fill);
    });
}

// Auto-cycle vehicle images for Yoda (since it has 2 images)
function setupAutoImageCycling() {
    const yodaCard = document.querySelector('.vehicle-card');
    if (yodaCard) {
        const images = yodaCard.querySelectorAll('.vehicle-img');
        const dots = yodaCard.querySelectorAll('.dot');
        
        if (images.length > 1) {
            let currentImage = 0;
            
            setInterval(() => {
                // Remove active from current
                images[currentImage].classList.remove('active');
                dots[currentImage].classList.remove('active');
                
                // Move to next image
                currentImage = (currentImage + 1) % images.length;
                
                // Add active to new image
                images[currentImage].classList.add('active');
                dots[currentImage].classList.add('active');
            }, 4000); // Change every 4 seconds
        }
    }
}

// Image hover effects
function setupImageHoverEffects() {
    const storyImages = document.querySelectorAll('.story-image img, .drive-image img, .vehicle-img');
    
    storyImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Add CSS for active nav state
function addActiveNavStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .nav-links a.active {
            color: var(--color-primary);
        }
        .nav-links a.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
}

// Enhanced scroll reveal animation for story sections
function setupStoryAnimations() {
    const storyElements = document.querySelectorAll('.story-text, .drive-story');
    
    const storyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                storyObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    storyElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        element.style.transition = 'all 0.8s ease';
        storyObserver.observe(element);
    });
}

// Easter egg: Konami code
function setupKonamiCode() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    let currentInput = [];
    
    document.addEventListener('keydown', (e) => {
        currentInput.push(e.code);
        currentInput = currentInput.slice(-konamiCode.length);
        
        if (currentInput.join('') === konamiCode.join('')) {
            // Easter egg activated
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
                alert('🏎️ Turbo Mode Activated! Ready to drive Lane to success! 🏁');
            }, 2000);
        }
    });
    
    // Add rainbow animation
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add active nav styles
    addActiveNavStyles();
    
    // Set up scroll event listeners
    window.addEventListener('scroll', () => {
        updateProgressBar();
        handleNavbarScroll();
        updateActiveNav();
        handleParallax();
    });
    
    // Initialize observers for animations
    const animatedElements = document.querySelectorAll('.stat-number, .achievement-number, .score-fill');
    animatedElements.forEach(el => observer.observe(el));
    
    // Initialize other features
    initializeCounters();
    setupButtonHandlers();
    setupCardAnimations();
    animateScoreBars();
    enhanceSpeedometer();
    setupKonamiCode();
    setupAutoImageCycling();
    setupImageHoverEffects();
    setupStoryAnimations();
    
    // Delayed typewriter effect for hero
    setTimeout(typewriterEffect, 1000);
    
    // Initial calls
    updateProgressBar();
    handleNavbarScroll();
    updateActiveNav();
});

// Handle window resize
window.addEventListener('resize', () => {
    // Recalculate animations and positions
    updateProgressBar();
    updateActiveNav();
});

// Smooth scrolling for anchor links
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

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Preload images for better performance
    const imageUrls = [
        'https://raw.githubusercontent.com/kunal-20-06/Lane-Driving-Kunal/main/First-Drive.jpeg',
        'https://raw.githubusercontent.com/kunal-20-06/Lane-Driving-Kunal/main/800.jpeg',
        'https://raw.githubusercontent.com/kunal-20-06/Lane-Driving-Kunal/main/Yoda1.jpg',
        'https://raw.githubusercontent.com/kunal-20-06/Lane-Driving-Kunal/main/Yoda2.jpg',
        'https://raw.githubusercontent.com/kunal-20-06/Lane-Driving-Kunal/main/Cruze.jpg',
        'https://raw.githubusercontent.com/kunal-20-06/Lane-Driving-Kunal/main/Amaze.jpg',
        'https://raw.githubusercontent.com/kunal-20-06/Lane-Driving-Kunal/main/Stunner1.jpg'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events for better performance
window.addEventListener('scroll', throttle(() => {
    updateProgressBar();
    handleNavbarScroll();
    updateActiveNav();
}, 16)); // ~60fps

// Handle image loading errors with fallback
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            const caption = this.nextElementSibling;
            if (caption && caption.classList.contains('image-caption')) {
                caption.textContent = 'Image loading...';
                caption.style.color = 'var(--color-text-secondary)';
            }
        });
    });
});