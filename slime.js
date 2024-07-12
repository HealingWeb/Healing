const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

let frame = 0;
let x = 100;
const speed = 2; // Movement speed
const slimeWidth = 80;
const slimeHeight = 40;

// Adjust canvas size to fit the window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Draw the slime
function drawSlime(x, y, frame) {
    const waveOffset = Math.sin(frame / 20) * 10;
    const heightVariation = Math.cos(frame / 20) * 5;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw slime
    ctx.beginPath();
    ctx.ellipse(x, y, slimeWidth + waveOffset, slimeHeight + heightVariation, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'green';
    ctx.fill();

    // Draw eyes (optional, for a cute effect)
    const eyeOffsetX = 20;
    const eyeOffsetY = 10;
    ctx.beginPath();
    ctx.arc(x - eyeOffsetX, y - eyeOffsetY, 5, 0, Math.PI * 2);
    ctx.arc(x + eyeOffsetX, y - eyeOffsetY, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();

    // Draw pupils
    const pupilOffsetX = 22;
    const pupilOffsetY = 12;
    ctx.beginPath();
    ctx.arc(x - pupilOffsetX, y - pupilOffsetY, 2, 0, Math.PI * 2);
    ctx.arc(x + pupilOffsetX, y - pupilOffsetY, 2, 0, Math.PI * 2);
    ctx.fillStyle = 'black';
    ctx.fill();
}

function animate() {
    frame++;
    x += speed; // Move the slime to the right

    if (x > canvas.width) {
        x = -slimeWidth; // Reset position when off-screen
    }

    const y = canvas.height / 2; // Center vertically
    drawSlime(x, y, frame);

    requestAnimationFrame(animate);
}

// Initial setup
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
animate();
