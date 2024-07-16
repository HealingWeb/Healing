const questions = [
    {
        question: "그림 속 나의 크기를 선택해주세요.",
        choices: [
            { image: "images/1-1.png", title: "정서 및 상태:", result: "당신은 비교적 약한 자아상을 가지고 있으며<br>내향적인 성향을 지녔을 확률이 높습니다." },
            { image: "images/1-2.png", title: "정서 및 상태:", result: "당신은 비교적 완만한 자아상을 가지고 있으며<br>조화로운 성향을 지니고 있습니다." },
            { image: "images/1-3.png", title: "정서 및 상태:", result: "당신은 비교적 강한 자아상을 가지고 있으며<br>외향적인 성향을 지녔을 확률이 높습니다." }
        ]
    },
    {
        question: "나는 어느 곳을 바라보고 있나요?",
        choices: [
            { image: "images/2-1.png", title: "스트레스를 마주하는 태도:", result: "당신은 스트레스 원인을 직접 마주하며 해결하려 노력하고 있습니다." },
            { image: "images/2-2.png", title: "스트레스를 마주하는 태도:", result: "당신은 스트레스를 회피하려는 경향을 가지고 있으며<br>현재 우울감을 느끼고 있습니다." },
            { image: "images/2-3.png", title: "스트레스를 마주하는 태도:", result: "당신은 스트레스를 겉으로는 받아들이는 척 하나,<br>속으로는 부정하고 있습니다." }
        ]
    },
    {
        question: "구름의 양을 선택해주세요.",
        choices: [
            { image: "images/3-1.png", title: "스트레스 강도:" },
            { image: "images/3-2.png", title: "스트레스 강도:" },
            { image: "images/3-3.png", title: "스트레스 강도:" }
        ]
    },
    {
        question: "비의 양을 선택해주세요.",
        choices: [
            { image: "images/4-1.png" },
            { image: "images/4-2.png" },
            { image: "images/4-3.png" }
        ]
    },
    {
        question: "나의 모습을 선택해주세요.",
        choices: [
            { image: "images/5-1.png", title: "스트레스 상황 속 대처방식:", result: "당신은 스트레스에 대한 대처 방안을 지니고 있지 않습니다." },
            { image: "images/5-2.png", title: "스트레스 상황 속 대처방식:", result: "당신은 스트레스를 해소할 적절한 대처 방안을 지니고 있습니다." },
            { image: "images/5-3.png", title: "스트레스 상황 속 대처방식:", result: "당신은 스트레스를 해소할 적절한 대처 방안을 지니고 있습니다." },
            { image: "images/5-4.png", title: "스트레스 상황 속 대처방식:", result: "당신은 스트레스를 해소할 적절한 대처 방안을 지니고 있습니다.<br>다만 여기에 지나치게 큰 에너지를 소모하고 있을 가능성이 있습니다." },
            { image: "images/5-5.png", title: "스트레스 상황 속 대처방식:", result: "당신은 스트레스를 해소할 적절한 대처 방안을 지니고 있습니다.<br>다만 여기에 지나치게 큰 에너지를 소모하고 있을 가능성이 있습니다." }
        ]
    }
];

let currentQuestionIndex = 0;
const answers = [];

function showQuestion(index) {
    const questionElement = document.getElementById('question');
    const choicesElement = document.getElementById('choices');

    questionElement.textContent = questions[index].question;
    choicesElement.innerHTML = '';

    questions[index].choices.forEach((choice, i) => {
        const button = document.createElement('button');
        button.classList.add('choice-button');
        if (index === 4) { // 5번째 문제인 경우
            button.classList.add('large');
        }
        button.onclick = () => selectAnswer(index, i);

        const img = document.createElement('img');
        img.src = choice.image;
        img.alt = choice.text;
        img.classList.add('choice-image');

        const span = document.createElement('span');
        span.textContent = choice.text;

        button.appendChild(img);
        button.appendChild(span);
        choicesElement.appendChild(button);
    });

    // Disable back button on first question
    document.getElementById('back-button').disabled = index === 0;
}

function selectAnswer(questionIndex, choiceIndex) {
    answers[questionIndex] = choiceIndex;

    if (questionIndex + 1 < questions.length) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    } else {
        showResults();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
}

function showResults() {
    const results = questions.map((question, index) => {
        if (index === 2) {
            const pairResult = getPairResult(answers[2], answers[3]);
            return `<strong>${questions[2].choices[answers[2]].title}</strong><br><span>${pairResult}</span>`;
        }
        if (index === 3) {
            return ''; // Skip the 4th question since it's handled by the pair result
        }
        const choice = question.choices[answers[index]];
        return choice.title ? `<strong>${choice.title}</strong><br><span>${choice.result}</span>` : `<span>${choice.result}</span>`;
    }).filter(result => result !== '');

    localStorage.setItem('results', JSON.stringify(results));
    window.location.href = 'results.html';
}

function getPairResult(answer3, answer4) {
    const pair = `${answer3 + 1}-${answer4 + 1}`;
    const pairResults = {
        "1-1": "스트레스 강도가 비교적 낮은 편입니다.",
        "1-2": "스트레스 강도가 비교적 적당한 편입니다.",
        "2-1": "스트레스 강도가 비교적 적당한 편입니다.",
        "1-3": "스트레스 강도가 비교적 적당한 편입니다.",
        "2-2": "스트레스 강도가 비교적 적당한 편입니다.",
        "3-1": "스트레스 강도가 비교적 적당한 편입니다.",
        "2-3": "스트레스 강도가 비교적 높은 편입니다.",
        "3-2": "스트레스 강도가 비교적 높은 편입니다.",
        "3-3": "스트레스 강도가 비교적 높은 편입니다."
    };
    return pairResults[pair] || "No matching result";
}

function seeMoreResults() {
    window.location.href = 'colorcards2.html';
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('results-container')) {
        const resultsContainer = document.getElementById('results-container');
        const results = JSON.parse(localStorage.getItem('results')) || [];
        const info = results.map(result => `
            <div style="margin-bottom: 10px;">
                ${result}
            </div>
        `).join('');

        resultsContainer.innerHTML = `
            <h2 style="font-family: 'BCcardB'; text-align: center; font-size: 30px;">PITR 분석 결과지</h2>
            <div id="result-data">${info}</div>
        `;
        resultsContainer.style.opacity = '1';
    } else {
        showQuestion(currentQuestionIndex);
    }
});



// Add ripple effect on click
// Add ripple effect on click
document.addEventListener('click', function(e) {
    createRipple(e.clientX, e.clientY);
});

function createRipple(x, y) {
    const rippleContainer = document.body; // Use body for ripple effect

    // Generate the rain line
    const rainLine = document.createElement('div');
    rainLine.className = 'rain-line';
    rainLine.style.left = `${x}px`; // Center line
    rainLine.style.top = `0px`; // Start from the top of the viewport
    rainLine.style.height = `${y}px`; // Set the height to reach the ripple center
    rippleContainer.appendChild(rainLine);

    rainLine.addEventListener('animationend', () => {
        rainLine.remove();
    });

    // Generate ripple effects
    for (let i = 0; i < 3; i++) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = `${x}px`; // Center ripple
        ripple.style.top = `${y}px`; // Center ripple
        ripple.style.width = `${50 * (i + 0.5)}px`; // Increase size of each ripple
        ripple.style.height = `${25 * (i + 0.5)}px`; // Make the ripple an oval shape
        ripple.style.marginLeft = `-${25 * (i + 0.5)}px`; // Adjust to center the ripple horizontally
        ripple.style.marginTop = `-${12 * (i + 0.5)}px`; // Adjust to center the ripple vertically
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
        bubble.style.animationDelay = `${i * 0.5}s`;
        bubble.style.width = '5px';
        bubble.style.height = '5px';
        bubble.style.marginLeft = '-7px'; // Adjust to center the bubble horizontally
        bubble.style.marginTop = '-7px'; // Adjust to center the bubble vertically
        bubble.style.borderRadius = '50%';
        rippleContainer.appendChild(bubble);

        bubble.addEventListener('animationend', () => {
            bubble.remove();
        });
    }
}

// Function to generate random ripple and bubble effects
function generateRandomEffects() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    setInterval(() => {
        const x = Math.random() * width;
        const y = height - Math.random() * height * (2/3);
        createRipple(x, y);
    }, 800); // Adjust interval time (in milliseconds) as needed
}

// Start generating random effects after the window has loaded
window.onload = () => {
    generateRandomEffects();
};
