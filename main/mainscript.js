const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');
console.log(canvas, ctx); // to check if canvas and ctx are valid

window.addEventListener('load', () => {
    const enterSound = document.getElementById('enter-sound');
    if (enterSound) {
        enterSound.play().catch(error => {
            console.log('Autoplay prevented. Adding a user interaction to play the sound.');
            document.body.addEventListener('click', () => {
                enterSound.play();
            }, { once: true });
        });
    }
});


let particlesArray;
const mouse = {
    x: null,
    y: null,
    radius: 150
};

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
});

class Particle {
    constructor(x, y, size, color, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;
        this.baseX = x;
        this.baseY = y;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15; // blur
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
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

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = mouse.radius - this.size;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * this.size;
            let directionY = forceDirectionY * force * this.size;

            this.x += directionX;
            this.y += directionY;
        }

        this.draw();
    }
}



// Draw lines between particles
function connectParticles() {
    const maxDistance = 100;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
            const dx = particlesArray[a].x - particlesArray[b].x;
            const dy = particlesArray[a].y - particlesArray[b].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(255, 255, 255,' + (1 - distance / maxDistance) + ')';
                ctx.lineWidth = 0.5;
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

// Initialize particles
function init() {
    particlesArray = [];
    const numberOfParticles = 150;

    for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 5 + 1;
        const x = Math.random() * (canvas.width - size * 2) + size;
        const y = Math.random() * (canvas.height - size * 2) + size;
        const speedX = (Math.random() - 0.5) * 3;
        const speedY = (Math.random() - 0.5) * 3;
        const color = '#fff';

        particlesArray.push(new Particle(x, y, size, color, speedX, speedY));
    }

    console.log(particlesArray); // to check if particlesArray is populated
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach(particle => {
        particle.update();
    });

    connectParticles();
    requestAnimationFrame(animate);
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

// Handle click event
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    particlesArray.forEach(particle => {
        const dx = particle.x - mouseX;
        const dy = particle.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const forceRadius = 100; // Radius within which particles will be affected
        const forceStrength = 0.1; // Strength of the force applied to particles

        if (distance < forceRadius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (forceRadius - distance) / forceRadius * forceStrength;

            particle.applyForce(forceDirectionX * force, forceDirectionY * force);
        }
    });
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

document.addEventListener('DOMContentLoaded', () => {
    // Pyramid page
    const pyramidContainer = document.getElementById('pyramid-container');
    const pyramid = document.getElementById('pyramid');
    const centerTextPyramid = document.getElementById('center-text-pyramid');
    const startButtonPyramid = document.getElementById('start-button-pyramid');

    if (pyramidContainer) {
        pyramidContainer.addEventListener('click', () => {
            pyramidContainer.classList.add('clicked');
            //pyramid.classList.add('fade-out');
            setTimeout(() => {
                centerTextPyramid.classList.remove('hidden');
                centerTextPyramid.classList.add('fade-in');
                startButtonPyramid.classList.add('fade-in');    
                startButtonPyramid.classList.remove('hidden');    
                pyramid.classList.add('hidden');
                //pyramid.classList.remove('fade-out');
            }, 500);
        });

        centerTextPyramid.addEventListener('click', () => {
            centerTextPyramid.classList.add('fade-out');
            startButtonPyramid.classList.add('fade-out');
            setTimeout(() => {
                centerTextPyramid.classList.add('hidden');
                startButtonPyramid.classList.add('hidden');
                centerTextPyramid.classList.remove('fade-out');
                startButtonPyramid.classList.remove('fade-out');
                //pyramid.classList.add('fade-in');
                pyramid.classList.remove('hidden');
            }, 500);
            
        });

        startButtonPyramid.addEventListener('click', () => {
            window.location.href = '/page1/page1.html';
        });
    }

    // Ripple page
    const rippleContainer = document.getElementById('ripple-container');
    const transparentButton = document.getElementById('transparent-button');
    const centerTextRipple = document.getElementById('center-text-ripple');
    const startButtonRipple = document.getElementById('start-button-ripple');

    if (transparentButton) {
        transparentButton.addEventListener('click', () => {
            rippleContainer.classList.add('clicked');
            transparentButton.classList.remove('fade-out');
            setTimeout(() => {
                transparentButton.classList.add('hidden');
                transparentButton.classList.remove('fade-out');
                rippleContainer.classList.add('hidden');
                rippleContainer.classList.remove('fade-out');
                centerTextRipple.classList.add('fade-in');
                centerTextRipple.classList.remove('hidden');
                startButtonRipple.classList.add('fade-in');
                startButtonRipple.classList.remove('hidden');
            }, 500);
        });

        centerTextRipple.addEventListener('click', () => {
            centerTextRipple.classList.add('fade-out');
            startButtonRipple.classList.add('fade-out');
            setTimeout(() => {
                centerTextRipple.classList.add('hidden');
                startButtonRipple.classList.add('hidden');
                centerTextRipple.classList.remove('fade-out');
                startButtonRipple.classList.remove('fade-out');
                rippleContainer.classList.add('fade-in');
                rippleContainer.classList.remove('hidden');
                transparentButton.classList.add('fade-in');
                transparentButton.classList.remove('hidden');
            }, 500);
        });

        startButtonRipple.addEventListener('click', () => {
            window.location.href = '/page2/page2.html';
        });
    }
});


const pyramidLink = document.querySelector('.pyramid-link');


function createRipple(x, y) {
    const rippleContainer = document.getElementById('ripple-container'); // Ensure this is correct

    // Generate the rain line
    const rainLine = document.createElement('div');
    rainLine.className = 'rain-line';
    rainLine.style.left = `${x}px`; // Center line
    rainLine.style.top = `0px`; // Start from the top of the viewport
    rainLine.style.height = `${y}px`; // Set the height to reach the ripple center
    rippleContainer.appendChild(rainLine);

    rainLine.addEventListener('animationend', () => {
        rainLine.remove();

        // Generate ripple effects
        for (let i = 0; i < 3; i++) {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`; // Center ripple
            ripple.style.top = `${y}px`; // Center ripple
            ripple.style.width = `${50 * (i + 0.7)}px`; // Increase size of each ripple
            ripple.style.height = `${25 * (i + 0.7)}px`; // Make the ripple an oval shape
            ripple.style.marginLeft = `-${25 * (i + 0.7)}px`; // Adjust to center the ripple horizontally
            ripple.style.marginTop = `-${12 * (i + 0.7)}px`; // Adjust to center the ripple vertically
            ripple.style.animationDelay = `${i * 0.3}s`; // Delay each ripple slightly
            rippleContainer.appendChild(ripple);

            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        }

        // Generate bubble effects
        for (let i = 0; i < 2; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            bubble.style.left = `${x}px`;
            bubble.style.top = `${y}px`;
            bubble.style.animation = `bubble-effect-${i} 1.5s ease-in`;
            bubble.style.animationDelay = `${i * 0.7}s`;
            bubble.style.width = '10px';
            bubble.style.height = '10px';
            bubble.style.marginLeft = '-7px'; // Adjust to center the bubble horizontally
            bubble.style.marginTop = '-7px'; // Adjust to center the bubble vertically
            bubble.style.borderRadius = '50%';
            rippleContainer.appendChild(bubble);

            bubble.addEventListener('animationend', () => {
                bubble.remove();
            });
        }
    });
}

// Function to generate random ripple and bubble effects
function generateCenterRippleEffect() {
    const width = window.innerWidth / 2;
    const height = window.innerHeight / 2;
    createRipple(width, height);
}

function startRippleEffectOnThirdSection() {
    const thirdSection = document.querySelector('.third-content');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setInterval(generateCenterRippleEffect, 3000); // 3 seconds interval for ripple effect
                observer.disconnect(); // Stop observing once the ripple effect has started
            }
        });
    });
    observer.observe(thirdSection);
}

window.onload = () => {
    startRippleEffectOnThirdSection();
};

// Ensure ripple container exists
const rippleContainerDiv = document.createElement('div');
rippleContainerDiv.id = 'ripple-container';
rippleContainerDiv.style.position = 'absolute';
rippleContainerDiv.style.top = '50%';
rippleContainerDiv.style.left = '50%';
rippleContainerDiv.style.transform = 'translate(-50%, -50%)';
rippleContainerDiv.style.width = '100%';
rippleContainerDiv.style.height = '100%';
rippleContainerDiv.style.pointerEvents = 'none';
rippleContainerDiv.style.overflow = 'hidden';
document.body.appendChild(rippleContainerDiv);

