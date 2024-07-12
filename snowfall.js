const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');

// Function to set canvas size to fill the window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Recalculate snowflake positions based on new canvas size
    for (let i = 0; i < snowflakes.length; i++) {
        snowflakes[i].x = Math.random() * canvas.width;
        snowflakes[i].y = Math.random() * canvas.height;
    }
}

// Initialize snowflakes
const numSnowflakes = 500;
const snowflakes = [];

for (let i = 0; i < numSnowflakes; i++) {
    snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 2, // Random size between 2 and 7
        speed: Math.random() * 2 + 1 // Random speed between 1 and 3
    });
}

// Function to draw snowflakes
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#fff'; // White color for snowflakes

    for (let i = 0; i < snowflakes.length; i++) {
        ctx.beginPath();
        ctx.arc(snowflakes[i].x, snowflakes[i].y, snowflakes[i].size / 2, 0, Math.PI * 2);
        ctx.fill();
    }

    moveSnowflakes();
    requestAnimationFrame(draw);
}

// Function to animate snowflakes
function moveSnowflakes() {
    for (let i = 0; i < snowflakes.length; i++) {
        snowflakes[i].y += snowflakes[i].speed;

        // Reset snowflake when it goes below the canvas
        if (snowflakes[i].y > canvas.height) {
            snowflakes[i].y = 0;
            snowflakes[i].x = Math.random() * canvas.width;
        }
    }
}

// Event listener for window resize
window.addEventListener('resize', resizeCanvas);

// Initial setup
resizeCanvas();
draw();
