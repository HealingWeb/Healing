const questions = [
    {
        question: "나의 크기를 선택해주세요.",
        choices: [
            { image: "images/1-1.png", result: "당신은 내향적인 성향을 지녔을 확률이 높습니다. 비교적 약한 자아상을 가지고 있습니다." },
            { image: "images/1-2.png", result: "" },
            { image: "images/1-3.png", result: "당신은 외향적인 성향을 지녔을 확률이 높습니다. 비교적 강한 자아상을 가지고 있습니다." }
        ]
    },
    {
        question: "당신은 어느 곳을 바라보고 있나요?",
        choices: [
            { image: "images/2-1.png", result: "당신은 스트레스 원인을 직접 마주하며 해결하려 노력하고 있습니다." },
            { image: "images/2-2.png", result: "당신은 스트레스를 회피하려는 경향이 있습니다. 또한, 현재 우울감을 느끼고 있습니다." },
            { image: "images/2-3.png", result: "당신은 스트레스를 겉으로는 받아들이는 척 하나, 속으로는 부정하고 있습니다." }
        ]
    },
    {
        question: "구름의 모습을 선택해주세요.",
        choices: [
            { image: "images/3-1.png"},
            { image: "images/3-2.png"},
            { image: "images/3-3.png"}
        ]
    },
    {
        question: "비 내리는 모습을 선택해주세요.",
        choices: [
            { image: "images/4-1.png"},
            { image: "images/4-2.png"},
            { image: "images/4-3.png"}
        ]
    },
    {
        question: "당신의 모습을 선택해주세요.",
        choices: [
            { image: "images/5-1.png", result: "당신은 스트레스에 대한 대처 방안을 지니고 있지 않습니다." },
            { image: "images/5-2.png", result: "당신은 스트레스를 해소할 적절한 대처 방안을 지니고 있습니다." },
            { image: "images/5-3.png", result: "당신은 스트레스를 해소할 적절한 대처 방안을 지니고 있습니다." },
            { image: "images/5-4.png", result: "당신은 스트레스를 해소할 적절한 대처 방안을 지니고 있습니다. \n 다만 여기에 지나치게 큰 에너지를 소모하고 있을 가능성이 있습니다." },
            { image: "images/5-5.png", result: "당신은 스트레스를 해소할 적절한 대처 방안을 지니고 있습니다. \n 다만 여기에 지나치게 큰 에너지를 소모하고 있을 가능성이 있습니다." }
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
    const results = [];
    results.push(`${questions[0].choices[answers[0]].result}`); // Q1 result
    results.push(`${questions[1].choices[answers[1]].result}`); // Q2 result

    const pairResult = getPairResult(answers[2], answers[3]); // Q3 & Q4 result
    results.push(`${pairResult}`);

    results.push(`${questions[4].choices[answers[4]].result}`); // Q5 result

    localStorage.setItem('results', JSON.stringify(results));
    window.location.href = 'results.html';
}

function getPairResult(answer3, answer4) {
    const pair = `${answer3 + 1}-${answer4 + 1}`;
    const pairResults = {
        "1-1": "아아아",
        "1-2": "아하하",
        "2-1": "아하하",
        "1-3": "아하하",
        "2-2": "아하하",
        "3-1": "아하하",
        "2-3": "하하하",
        "3-2": "하하하",
        "3-3": "하하하"
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
        resultsContainer.innerHTML = results.map(result => `<p>${result}</p>`).join('');

        // Show the 'See More Results' button
        document.getElementById('see-more-results-button').style.display = 'block';
    } else {
        showQuestion(currentQuestionIndex);
    }
});

// Add ripple effect on click
document.addEventListener('click', function(e) {
    const rippleContainer = document.body; // Use body for ripple effect
    const rect = rippleContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

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
});
