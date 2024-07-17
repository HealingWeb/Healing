const canvas = document.getElementById('pyramidCanvas');
const ctx = canvas.getContext('2d');

// Pyramid dimensions and position
const pyramidHeight = 300;
const pyramidWidth = 200;
const pyramidDepth = 200;
const pyramidTop = 100;

// Pyramid colors
const pyramidColor = '#FF6347';

// Function to draw the pyramid
function drawPyramid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the base (square)
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - pyramidWidth / 2, canvas.height - pyramidHeight);
    ctx.lineTo(canvas.width / 2 + pyramidWidth / 2, canvas.height - pyramidHeight);
    ctx.lineTo(canvas.width / 2 + pyramidWidth / 2, canvas.height - pyramidHeight + pyramidDepth);
    ctx.lineTo(canvas.width / 2 - pyramidWidth / 2, canvas.height - pyramidHeight + pyramidDepth);
    ctx.closePath();
    ctx.fillStyle = pyramidColor;
    ctx.fill();

    // Draw the sides (triangles)
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height - pyramidHeight);
    ctx.lineTo(canvas.width / 2 + pyramidWidth / 2, canvas.height - pyramidHeight);
    ctx.lineTo(canvas.width / 2, canvas.height - pyramidHeight + pyramidDepth);
    ctx.closePath();
    ctx.fillStyle = pyramidColor;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height - pyramidHeight);
    ctx.lineTo(canvas.width / 2 - pyramidWidth / 2, canvas.height - pyramidHeight);
    ctx.lineTo(canvas.width / 2, canvas.height - pyramidHeight + pyramidDepth);
    ctx.closePath();
    ctx.fillStyle = pyramidColor;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height - pyramidHeight);
    ctx.lineTo(canvas.width / 2, canvas.height - pyramidHeight + pyramidDepth);
    ctx.lineTo(canvas.width / 2 + pyramidWidth / 2, canvas.height - pyramidHeight);
    ctx.closePath();
    ctx.fillStyle = pyramidColor;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height - pyramidHeight);
    ctx.lineTo(canvas.width / 2, canvas.height - pyramidHeight + pyramidDepth);
    ctx.lineTo(canvas.width / 2 - pyramidWidth / 2, canvas.height - pyramidHeight);
    ctx.closePath();
    ctx.fillStyle = pyramidColor;
    ctx.fill();

    // Draw the top (base of the pyramid)
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - pyramidTop / 2, canvas.height - pyramidHeight);
    ctx.lineTo(canvas.width / 2 + pyramidTop / 2, canvas.height - pyramidHeight);
    ctx.lineTo(canvas.width / 2 + pyramidTop / 2, canvas.height - pyramidHeight + pyramidTop);
    ctx.lineTo(canvas.width / 2 - pyramidTop / 2, canvas.height - pyramidHeight + pyramidTop);
    ctx.closePath();
    ctx.fillStyle = pyramidColor;
    ctx.fill();
}

// Initial draw
drawPyramid();
