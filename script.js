// DOM Elements
const header = document.querySelector('header');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const heroImage = document.querySelector('.hero-image');
const personImg = document.querySelector('.person-img');
const decorativeElements = document.querySelectorAll('.element');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const dots = document.querySelectorAll('.dot');
const playButton = document.querySelector('.play-button');

// Typing Animation
const textLines = [
    'Build Your',
    'Awesome',
    'Platform'
];

const typingSpeed = 100; // milliseconds per character
const reverseTypingSpeed = 50; // milliseconds per character when reversing
const lineDelay = 500; // delay between lines
const wordDelay = 1000; // delay before starting to reverse type
let currentLineIndex = 0;
let currentCharIndex = 0;
let isReversing = false;
let isTypingComplete = false;

function typeText() {
    const lines = document.querySelectorAll('.typing-text .line');
    const currentLine = lines[currentLineIndex];
    const currentText = textLines[currentLineIndex];

    if (!isReversing) {
        // Forward typing
        if (currentCharIndex < currentText.length) {
            currentLine.textContent += currentText[currentCharIndex];
            currentCharIndex++;
            setTimeout(typeText, typingSpeed);
        } else {
            currentLine.classList.add('typed');
            if (currentLineIndex < textLines.length - 1) {
                // Move to next line
                currentLineIndex++;
                currentCharIndex = 0;
                setTimeout(() => {
                    lines[currentLineIndex].classList.add('typing');
                    typeText();
                }, lineDelay);
            } else {
                // All lines typed, start reverse typing after delay
                isTypingComplete = true;
                setTimeout(() => {
                    isReversing = true;
                    currentLineIndex = textLines.length - 1;
                    typeText();
                }, wordDelay);
            }
        }
    } else {
        // Reverse typing
        const currentText = currentLine.textContent;
        if (currentText.length > 0) {
            currentLine.textContent = currentText.slice(0, -1);
            setTimeout(typeText, reverseTypingSpeed);
        } else {
            currentLine.classList.remove('typed', 'typing');
            if (currentLineIndex > 0) {
                // Move to previous line
                currentLineIndex--;
                setTimeout(typeText, lineDelay);
            } else {
                // Reset for next cycle
                isReversing = false;
                currentLineIndex = 0;
                currentCharIndex = 0;
                isTypingComplete = false;
                setTimeout(() => {
                    lines[0].classList.add('typing');
                    typeText();
                }, wordDelay);
            }
        }
    }
}

// Start typing animation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const firstLine = document.querySelector('.typing-text .line1');
    if (firstLine) {
        firstLine.classList.add('typing');
        setTimeout(typeText, 1000); // Start after 1 second
    }
});

// Mobile Navigation
if (hamburger) {
    hamburger.addEventListener('click', () => {
        if (!document.querySelector('.mobile-menu')) {
            createMobileMenu();
        }
        toggleMobileMenu();
    });
}

function createMobileMenu() {
    const mobileMenu = document.createElement('div');
    mobileMenu.classList.add('mobile-menu');
    
    // Clone navigation
    const navLinksClone = navLinks.cloneNode(true);
    const contactBtn = document.querySelector('header .btn-outline').cloneNode(true);
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('close-btn');
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    
    // Add elements to mobile menu
    mobileMenu.appendChild(closeBtn);
    mobileMenu.appendChild(navLinksClone);
    mobileMenu.appendChild(contactBtn);
    
    // Style mobile menu
    Object.assign(mobileMenu.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100vh',
        backgroundColor: 'var(--dark-bg)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '1000',
        transform: 'translateY(-100%)',
        transition: 'transform 0.3s ease'
    });
    
    // Style navigation items
    navLinksClone.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 30px;
        text-align: center;
        margin: 40px 0;
    `;
    
    // Style close button
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
    `;
    
    document.body.appendChild(mobileMenu);
    
    // Add event listeners
    closeBtn.addEventListener('click', toggleMobileMenu);
    navLinksClone.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });
}

function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const currentTransform = mobileMenu.style.transform;
    mobileMenu.style.transform = currentTransform === 'translateY(0%)' ? 'translateY(-100%)' : 'translateY(0%)';
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Decorative Elements Animation
if (decorativeElements.length > 0) {
    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const moveX = clientX * 0.05;
        const moveY = clientY * 0.05;
        
        decorativeElements.forEach(element => {
            element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}

// Portfolio Slider
let currentSlide = 0;
const totalSlides = portfolioItems.length;

function updateSlider(index) {
    // Update slides
    portfolioItems.forEach((item, i) => {
        item.style.transform = `translateX(${100 * (i - index)}%)`;
        item.style.opacity = i === index ? '1' : '0.5';
    });
    
    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

if (dots.length > 0) {
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider(currentSlide);
        });
    });
    
    // Initialize slider
    updateSlider(currentSlide);
}

// Play Button Animation
if (playButton) {
    playButton.addEventListener('click', () => {
        playButton.classList.add('clicked');
        
        setTimeout(() => {
            playButton.classList.remove('clicked');
            // Here you would normally implement video play functionality
            alert('Video would play here');
        }, 200);
    });
}

// Scroll Animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .portfolio-item, .section-header');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.8 && elementBottom > 0) {
            element.classList.add('animate');
        }
    });
};

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes
    const elements = document.querySelectorAll('.service-card, .portfolio-item, .section-header');
    elements.forEach(element => {
        element.classList.add('animate-init');
    });
    
    // Trigger initial animations
    setTimeout(animateOnScroll, 100);
});

// Scroll event listener
window.addEventListener('scroll', () => {
    // Header background
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Scroll animations
    animateOnScroll();
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
});

// Hero Image Animation
if (heroImage && personImg) {
    let isHovered = false;
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    heroImage.addEventListener('mouseenter', () => {
        isHovered = true;
        heroImage.classList.add('animated');
    });

    heroImage.addEventListener('mouseleave', () => {
        isHovered = false;
        heroImage.classList.add('animated');
        // Reset position
        targetX = 0;
        targetY = 0;
    });

    heroImage.addEventListener('mousemove', (e) => {
        if (!isHovered) return;

        // Get relative mouse position
        const rect = heroImage.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;

        // Convert to -1 to 1 range
        targetX = (mouseX / rect.width - 0.5) * 20;
        targetY = (mouseY / rect.height - 0.5) * 20;
    });

    // Smooth animation
    function animate() {
        if (isHovered) {
            currentX += (targetX - currentX) * 0.1;
            currentY += (targetY - currentY) * 0.1;
        } else {
            currentX += (0 - currentX) * 0.1;
            currentY += (0 - currentY) * 0.1;
        }

        // Apply transform
        personImg.style.transform = `
            scale(${isHovered ? 1.02 : 1})
            rotateX(${-currentY}deg)
            rotateY(${currentX}deg)
            translateZ(0)
        `;

        // If movement is very small and not hovered, remove animated class
        if (!isHovered && Math.abs(currentX) < 0.01 && Math.abs(currentY) < 0.01) {
            heroImage.classList.remove('animated');
        }

        requestAnimationFrame(animate);
    }

    animate();
}

// Contact Form
const contactForm = document.getElementById('contactForm');

// Initialize EmailJS
emailjs.init("Ex4ZaRdUZiQQ13tRK"); // You'll need to replace this with your actual EmailJS public key

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const email = document.getElementById('email').value;
        const title = document.getElementById('title').value;
        const message = document.getElementById('message').value;
        
        // Format the message to include sender's email and title
        const formattedMessage = `
From: ${email}
Title: ${title}

Message:
${message}
`;
        
        // Send email
        emailjs.send("service_ezkfokh", "template_3u645vj", {
            to_email: "sharnadeep2812@gmail.com",
            from_email: email,
            subject: title,
            message: formattedMessage
        })
        .then(function(response) {
            showSuccessModal();
            contactForm.reset();
        }, function(error) {
            alert('Failed to send message. Please try again later.');
            console.error('Error:', error);
        });
    });
}

function showSuccessModal() {
    let modal = document.getElementById('successModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'successModal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <p>Message has sent successfully</p>
            </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector('.modal-close').onclick = closeSuccessModal;
        modal.querySelector('.modal-overlay').onclick = closeSuccessModal;
    }
    modal.style.display = 'flex';
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'none';
    }
}