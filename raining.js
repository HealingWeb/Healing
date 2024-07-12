const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');

// Function to set canvas size to fill the window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Recalculate raindrop positions based on new canvas size
    for (let i = 0; i < drops.length; i++) {
        drops[i].x = Math.random() * canvas.width;
        drops[i].y = Math.random() * canvas.height;
    }
}

// Initialize raindrops
const numDrops = 500;
const drops = [];
for (let i = 0; i < numDrops; i++) {
    drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 20 + 5,
        speed: Math.random() * 10 + 5
    });
}

// Function to draw raindrops
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ccc'; // Light gray color for raindrops

    for (let i = 0; i < drops.length; i++) {
        ctx.beginPath();
        ctx.moveTo(drops[i].x, drops[i].y);
        ctx.lineTo(drops[i].x, drops[i].y + drops[i].length);
        ctx.stroke();
    }

    moveDrops();
    requestAnimationFrame(draw);
}

// Function to animate raindrops
function moveDrops() {
    for (let i = 0; i < drops.length; i++) {
        drops[i].y += drops[i].speed;
        
        // Reset drop when it goes below the canvas
        if (drops[i].y > canvas.height) {
            drops[i].y = 0;
            drops[i].x = Math.random() * canvas.width;
        }
    }
}

// Event listener for window resize
window.addEventListener('resize', resizeCanvas);

// Initial setup
resizeCanvas();
draw();
