import { GlowParticle } from "./glowparticle.js";

const COLOR_PICKER = [
    { name: 'red', rgb: { r: 255, g: 0, b: 0 } },
    { name: 'orange', rgb: { r: 255, g: 102, b: 0 } },
    { name: 'yellow', rgb: { r: 250, g: 255, b: 89 } },
    { name: 'green', rgb: { r: 54, g: 233, b: 84 } },
    { name: 'blue', rgb: { r: 45, g: 74, b: 227 } },
    { name: 'purple', rgb: { r: 102, g: 51, b: 153 } },
    { name: 'brown', rgb: { r: 165, g: 42, b: 42 } },
    { name: 'white', rgb: { r: 224, g: 224, b: 224 } },
    { name: 'gray', rgb: { r: 180, g: 180, b: 180 } },
    { name: 'black', rgb: { r: 50, g: 50, b: 50 } }
];

let COLORS = [ // colors of particles
    { r: 224, g: 224, b: 224 }, // almost white
    { r: 44, g: 180, b: 250 }, // light blue
    { r: 180, g: 180, b: 180 }, // gray
    // { r: 45, g: 74, b: 227 }, //blue
    // { r: 250, g: 255, b: 89 }, //yellow
    // { r: 255, g: 104, b: 248 }, //pink
    // { r: 44, g: 209, b: 252 }, //cyan
    //{ r: 54, g: 233, b: 84 }, //green
];

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.pixelRatio = (window.devicePixelRatio > 1) ? 2 : 1;

        this.totalParticles = 10; // Increase the number of particles
        this.particles = [];
        this.maxRadius = 900;
        this.minRadius = 400;

        this.colorData = {}; // Object to store color data for blocks
        this.colorCounts = {}; // Object to store the counts of each color

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        window.requestAnimationFrame(this.animate.bind(this));

        this.fadeInQuestion(); // question with fading-in effect
        this.addDragAndDrop(); // Add drag and drop functionality
        this.setupSaveButton(); // Setup the save button
    }

    resize() { // adjust canva's size to fit the window
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        //this.ctx.globalCompositeOperation = 'saturation';

        this.createParticles();
    }

    createParticles() {
        this.particles = [];

        for (let i = 0; i < this.totalParticles; i++) {
            const colorIndex = i % COLORS.length; // Cycle through the colors
            const color = COLORS[colorIndex];
            const item = new GlowParticle(
                Math.random() * this.stageWidth,
                Math.random() * this.stageHeight,
                Math.random() * (this.maxRadius - this.minRadius) + this.minRadius,
                color
            );

            this.particles[i] = item;
        }
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        for (let i = 0; i < this.totalParticles; i++) {
            const item = this.particles[i];
            item.animate(this.ctx, this.stageWidth, this.stageHeight);
        }
    }

    fadeInQuestion() {
        const questionContainer = document.querySelector('.question-container');
        const colorPicker = document.querySelector('.color-picker');
        const saveButton = document.querySelector('.save-button');

        setTimeout(() => {
            questionContainer.style.opacity = 1;
            questionContainer.style.top = '20%'; // Move the question up
        }, 1000); // Delay before the question appears

        setTimeout(() => {
            const blocksContainer = document.querySelector('.blocks-container');
            blocksContainer.style.opacity = 1;
            const blocks = document.querySelectorAll('.block');
            blocks.forEach((block, index) => {
                setTimeout(() => {
                    block.style.opacity = 1;
                }, index * 100); // Delay each block slightly for a staggered effect
            });
        }, 1500); // Delay before the blocks appear

        setTimeout(() => {
            colorPicker.style.opacity = 1;
        }, 2000); // Delay before the color picker appears

        setTimeout(() => {
            saveButton.style.opacity = 1;
        }, 2500); // Delay before the save button appears
    }

    addDragAndDrop() {
        const colors = document.querySelectorAll('.color');
        const blocks = document.querySelectorAll('.block');
        colors.forEach(color => {
            color.addEventListener('dragstart', e => {
                e.dataTransfer.setData('color', color.style.backgroundColor);
            });
        });

        blocks.forEach(block => {
            block.addEventListener('dragover', e => {
                e.preventDefault();
            });

            block.addEventListener('drop', e => {
                const color = e.dataTransfer.getData('color');
                
                // Prevent user from dragging and dropping later-ordered blocks
                const blockIndex = Array.from(blocks).indexOf(block);
                const expectedIndex = Object.keys(this.colorData).length;

                if (blockIndex === expectedIndex) {
                    block.style.backgroundColor = color;
                    this.colorData[blockIndex] = color;
                    this.colorCounts[color] = (this.colorCounts[color] || 0) + 1;
                    console.log(this.colorData);
                } else {
                    console.error('Cannot drop color here. Please fill the previous blocks first.');
                }

                /*block.style.backgroundColor = color;

                // Calculate the block index based on its position in the grid
                const blockIndex = Array.from(blocks).indexOf(block);
                const row = Math.floor(blockIndex / 5); // Assuming 5 columns per row
                const col = blockIndex % 5;

                // Calculate the final index based on the grid layout
                const finalIndex = row * 5 + col;

                // Store the color data for the block
                this.colorData[finalIndex] = color;
                console.log(this.colorData); // Log to see the recorded data */
            });
        });
    }

    setupSaveButton() {
        const saveButton = document.querySelector('.save-button');
        saveButton.addEventListener('click', this.saveColorData.bind(this));
    }

    calculateGrades() {
        const totalBlocks = Object.keys(this.colorData).length;
        const positionGrades = {};
        const usageGrades = {};
        const finalGrades = {};

        // Calculate position grades with a weight for lower index
        Object.keys(this.colorData).forEach((index, position) => {
            const color = this.colorData[index];
            const weight = Math.pow((totalBlocks - position) / totalBlocks, 2); // Exponential weighting
            const grade = weight * 100; // Scale to 100 for easier combination later
            positionGrades[color] = (positionGrades[color] || 0) + grade;
        });

        // Normalize position grades to percentage (50%)
        Object.keys(positionGrades).forEach(color => {
            positionGrades[color] = (positionGrades[color] / 100) * 50;
        });

        // Calculate usage grades
        Object.keys(this.colorCounts).forEach(color => {
            const count = this.colorCounts[color];
            usageGrades[color] = (count / totalBlocks) * 50;
        });

        // Combine grades
        Object.keys(positionGrades).forEach(color => {
            finalGrades[color] = (positionGrades[color] || 0) + (usageGrades[color] || 0);
        });

        // Normalize final grades to ensure the total is 100%
        const totalGrade = Object.values(finalGrades).reduce((sum, grade) => sum + grade, 0);
        Object.keys(finalGrades).forEach(color => {
            finalGrades[color] = (finalGrades[color] / totalGrade) * 100;
        });

        return finalGrades;
    }

    saveColorData() {
        console.log("Saving color data:", this.colorData);

        const grades = this.calculateGrades();
        const sortedGrades = Object.entries(grades).sort((a, b) => b[1] - a[1]);

        const popup = document.getElementById('popup');
        const colorDataElement = document.getElementById('color-data');
        colorDataElement.textContent = sortedGrades.map(([color, grade]) => `${color}: ${grade.toFixed(2)}%`).join('\n');
        popup.style.display = 'flex';

        const closeButton = document.getElementById('close-button');
        closeButton.addEventListener('click', () => {
            popup.style.display = 'none';
        });

        // Update COLORS array with top 3 ranking colors
        const topColors = sortedGrades.slice(0, 3).map(([color]) => {
            const colorObj = COLOR_PICKER.find(c => c.name === color);
            return colorObj ? colorObj.rgb : { r: 0, g: 0, b: 0 }; // Fallback to black if color not found
        });

        // Update the global COLORS array with RGB values
        COLORS = topColors;

        // Recreate particles with updated COLORS
        this.createParticles();
    }
}

window.onload = () => { // start application
    new App();
}