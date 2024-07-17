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

let TOPCOLORS = [
    { r: 255, g: 255, b: 255 } // initial color = white
];

let COLORS = [ // colors of particles
    { r: 230, g: 230, b: 230 }, // almost white
    { r: 204, g: 255, b: 255 }, // light blue
    { r: 255, g: 204, b: 229 }, // gray
];

const MOST_COLOR_MEANINGS = {
    'red': '충동적인 감정을 나타내는 색으로 해당 색을 선호하는 당신은 충동적이고 외향적인 성향임을 나타냅니다.',
    'orange': '외향적 정서를 나타내는 색으로 당신은 사람들과의 어울림을 좋아하고 자신의 마음을 밖으로 쉽게 표현할 줄 아는 사람임을 나타냅니다.',
    'yellow': '정서적 안정성을 나타내는 색으로 평소 상당히 평온하고 안정되어 있으며 감정을 적절하게 표현할 수 있는 사람임을 나타냅니다.',
    'green': '정서의 조절 및 감수성의 지표로 해석되는 색으로 감수성이 풍부한 사람이지만 극단적으로는 정서적 자극에 압도당하거나 심리적 안정성이 떨어져 있음을 나타내기도 합니다.',
    'blue': '감정 통제의 지표로써 현재 당신은 감정 표현에 서툴며 의기소침, 강박관념에 사로잡혀 있는 상태입니다.',
    'purple': '불안, 긴장의 지표로 적응 불량, 정서적 미성숙을 나타내고 극단적으로는 통합실조증의 징후로 여겨집니다.',
    'brown': '정서적 강도를 나타내는 색으로 완고하고 반항적이며 유치한 충동을 갖고 있으며, 극단적으로는 정신박약이 의심됩니다.',
    'white': '사회적 적응성을 나타내는 색으로 현실에서의 적응이 어렵고 자신의 심리적 통제가 어려운 사람일 수 있습니다.',
    'gray': '사회적 교류성의 지표가 되는 색으로 당신은 사람 간의 교류를 스스로 통제하거나 억압과 거절의 경향을 지닌 사람입니다.',
    'black': '충동의 통제성을 나타내는 색으로 자신의 충동을 억제하고 있으며 심한 경우 자신을 과하게 통제해 스스로 무력하게 만들고 있는 사람으로 진단됩니다.'
};

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
        const saveButton = document.querySelector('.arrow-button');

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
        }, 1000); // Delay before the blocks appear

        setTimeout(() => {
            colorPicker.style.opacity = 1;
        }, 1000); // Delay before the color picker appears

        setTimeout(() => {
            saveButton.style.opacity = 1;
        }, 1000); // Delay before the save button appears
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
            });
        });
    }

    setupSaveButton() {
        const saveButton = document.querySelector('.arrow-button');
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
    
        // Fade out the question and color picker
        const questionContainer = document.querySelector('.question-container');
        const colorPicker = document.querySelector('.color-picker');
        const saveButton = document.querySelector('.arrow-button');
        const blocksContainer = document.querySelector('.blocks-container');
    
        questionContainer.style.transition = 'opacity 1s';
        colorPicker.style.transition = 'opacity 1s';
        saveButton.style.transition = 'opacity 1s';
        blocksContainer.style.transform = 'opacity 1s';
    
        questionContainer.style.opacity = 0;
        colorPicker.style.opacity = 0;
        saveButton.style.opacity = 0;
        blocksContainer.style.opacity = 0;
    
        setTimeout(() => {
            questionContainer.style.display = 'none';
            colorPicker.style.display = 'none';
            saveButton.style.display = 'none';
            blocksContainer.style.display = 'none';
    
            // Create or update the result card
            let resultCard = document.querySelector('.result-card');
            if (!resultCard) {
                resultCard = document.createElement('div');
                resultCard.classList.add('result-card');
                document.body.appendChild(resultCard);
            } else {
                resultCard.innerHTML = ''; // Clear previous content if result card exists
            }
    
            // Get the meanings for the top 3 colors
            const topColorsInfo = sortedGrades.slice(0, 3).map(([color, grade]) => {
                const colorInfo = MOST_COLOR_MEANINGS[color];
                return `
                <div style="margin-bottom: 10px;">
                <div class="color-box" style="background-color: ${color};"></div>
                    <strong style="font-family: 'BCcardB'; font-size: 25px; text-transform: capitalize;">${color}</strong>: 
                    <span style="font-size: 20px; font-weight: bold;">${grade.toFixed(2)}%</span><br>
                    <span style="font-family: 'BCcardL'; font-size: 16px;">${colorInfo}</span>
                 </div>
                `;
            }).join('');
    
            resultCard.innerHTML = `
                <h2>심리 분석 결과지</h2>
                <div id="color-data">${topColorsInfo}</div>
            `;
    
            // Show result card
            resultCard.style.opacity = 1;
    
            // Show "More Info" button
            const moreInfoButton = document.createElement('button');
            moreInfoButton.id = 'more-info-button';
            moreInfoButton.classList.add('more-info-button');
            moreInfoButton.textContent = 'More Info';
            moreInfoButton.style.position = 'fixed';
            moreInfoButton.style.bottom = '20px'; // Adjust bottom position as needed
            moreInfoButton.style.right = '20px'; // Adjust right position as needed
            moreInfoButton.addEventListener('click', () => {
                // Navigate to colorcards.html when the button is clicked
                window.location.href = 'colorcards1.html';
            });
            document.body.appendChild(moreInfoButton);
    
            setTimeout(() => {
                moreInfoButton.classList.add('show');
            }, 100); // Start fade in after a short delay
    
        }, 1000); // Wait for the fade out transition to complete
    
        // Update COLORS array with top 3 ranking colors
        TOPCOLORS = sortedGrades.slice(0, 3).map(([color]) => {
            const colorObj = COLOR_PICKER.find(c => c.name === color);
            return colorObj ? colorObj.rgb : { r: 0, g: 0, b: 0 }; // Fallback to black if color not found
        });
    
        // Update the global COLORS array with RGB values
        COLORS = TOPCOLORS;
    
        // Recreate particles with updated COLORS
        this.createParticles();
    }
    
}

window.onload = () => { // start application
    new App();
}