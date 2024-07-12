const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

let hammerX = 0;
let hammerY = 0;
const hammerWidth = 50;
const hammerHeight = 50;
const cracks = [];

// Adjust canvas size to fit the window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function drawHammer(x, y) {
    ctx.save();
    ctx.translate(x, y);
    
    // Handle
    ctx.beginPath();
    ctx.rect(-5, -hammerHeight / 2, 10, hammerHeight);
    ctx.fillStyle = 'brown';
    ctx.fill();
    
    // Head
    ctx.beginPath();
    ctx.moveTo(-hammerWidth / 2, -hammerHeight / 2);
    ctx.lineTo(hammerWidth / 2, -hammerHeight / 2);
    ctx.lineTo(hammerWidth / 2, -hammerHeight / 3);
    ctx.lineTo(-hammerWidth / 2, -hammerHeight / 3);
    ctx.closePath();
    ctx.fillStyle = 'gray';
    ctx.fill();

    ctx.restore();
}

function drawCrack(x, y) {
    ctx.beginPath();
    ctx.moveTo(x - 10, y - 10);
    ctx.lineTo(x + 10, y + 10);
    ctx.moveTo(x + 10, y - 10);
    ctx.lineTo(x - 10, y + 10);
    ctx.moveTo(x, y - 15);
    ctx.lineTo(x, y + 15);
    ctx.moveTo(x - 15, y);
    ctx.lineTo(x + 15, y);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    cracks.forEach(crack => {
        drawCrack(crack.x, crack.y);
    });

    drawHammer(hammerX, hammerY);

    requestAnimationFrame(draw);
}

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    hammerX = event.clientX - rect.left;
    hammerY = event.clientY - rect.top;
});

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    cracks.push({ x: clickX, y: clickY });
});

window.addEventListener('resize', resizeCanvas);

// Initial setup
resizeCanvas();
draw();
