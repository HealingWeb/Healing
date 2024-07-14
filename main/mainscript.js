// Interactive background animation using HTML5 Canvas API

const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

let particlesArray;

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Particle class definition
class Particle {
    constructor(x, y, size, color, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) {
            this.speedX = -this.speedX;
        }
        if (this.y < 0 || this.y > canvas.height) {
            this.speedY = -this.speedY;
        }
        this.draw();
    }
}

// Initialize particles
function init() {
    particlesArray = [];
    const numberOfParticles = 100;

    for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 5 + 1;
        const x = Math.random() * (canvas.width - size * 2) + size;
        const y = Math.random() * (canvas.height - size * 2) + size;
        const speedX = (Math.random() - 0.5) * 3;
        const speedY = (Math.random() - 0.5) * 3;
        const color = '#fff';

        particlesArray.push(new Particle(x, y, size, color, speedX, speedY));
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach(particle => {
        particle.update();
    });
}

// Initialize and start animation
init();
animate();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

// Scroll animation to the next section
const scrollDownButtons = document.querySelectorAll('.scroll-down');
const scrollUpButtons = document.querySelectorAll('.scroll-up');
const sections = document.querySelectorAll('.section');

let currentSectionIndex = 0;
let isAnimating = false;

// Function to handle scroll to section
function scrollToSection(index) {
    isAnimating = true;
    sections[index].scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
        isAnimating = false;
    }, 1000); // Adjust as needed to match animation duration
}

// Scroll down button click event
scrollDownButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (!isAnimating && currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
            scrollToSection(currentSectionIndex);
        }
    });
});

// Scroll up button click event
scrollUpButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (!isAnimating && currentSectionIndex > 0) {
            currentSectionIndex--;
            scrollToSection(currentSectionIndex);
        }
    });
});

// Wheel event handling
window.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
        if (!isAnimating && currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
            scrollToSection(currentSectionIndex);
        }
    } else {
        if (!isAnimating && currentSectionIndex > 0) {
            currentSectionIndex--;
            scrollToSection(currentSectionIndex);
        }
    }
});


// 3D Pyramid Code
const PI2 = Math.PI * 2; // constant of circle in radians

class GlowParticle {
    constructor(x, y, radius, rgb) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.rgb = rgb;

        this.vx = Math.random() * 4; // velocities
        this.vy = Math.random() * 4;

        this.sinValue = Math.random(); // bouncing effect
    }

    animate(ctx, stageWidth, stageHeight) {
        this.sinValue += 0.01; // updating position & size
        this.radius += Math.sin(this.sinValue);

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) { // reverse direction if hit the canvas
            this.vx *= -1;
            this.x += 10;
        } else if (this.x > stageWidth) {
            this.vx *= -1;
            this.x -= 10;
        }

        if (this.y < 0) {
            this.vy *= -1;
            this.y += 10;
        } else if (this.y > stageHeight) {
            this.vy *= -1;
            this.y -= 10;
        }

        ctx.beginPath(); // apply glow effect
        const g = ctx.createRadialGradient(this.x, this.y, this.radius * 0.01, this.x, this.y, this.radius); // gradient effect from inner to outer circle

        g.addColorStop(0, `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, 1)`); // start of gradient
        g.addColorStop(1, `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, 0)`); // end of gradient

        ctx.fillStyle = g;
        ctx.arc(this.x, this.y, this.radius, 0, PI2, false); // create circle
        ctx.fill();
    }
}

const pyramidLink = document.querySelector('.pyramid-link');

pyramidLink.addEventListener('click', (event) => {
    // Prevent default link behavior
    event.preventDefault();
    
    // Navigate to the target page
    const targetUrl = event.currentTarget.href;
    window.location.href = targetUrl;
});
