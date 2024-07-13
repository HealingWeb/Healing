const questions = [
    {
        question: "Question 1: What is your favorite color?",
        choices: [
            { image: "images/1-1.png", result: "당신은 내향적인 성향일 가능성이 높습니다. 비교적 약한 자아상을 가지고 있습니다." },
            { image: "images/1-2.png", result: "바보야" },
            { image: "images/1-3.png", result: "아웅 졸려" }
        ]
    },
    {
        question: "Question 2: What is your favorite animal?",
        choices: [
            { image: "images/2-1.png", result: "You are a cat person." },
            { image: "images/2-2.png", result: "You are a dog person." },
            { image: "images/2-3.png", result: "You like birds." }
        ]
    },
    {
        question: "Question 3: What is your favorite season?",
        choices: [
            { image: "images/3-1.png", result: "You enjoy the blooming flowers of spring." },
            { image: "images/3-2.png", result: "You love the warmth of summer." },
            { image: "images/3-3.png", result: "You appreciate the cool breeze of autumn." }
        ]
    },
    {
        question: "Question 4: What is your favorite hobby?",
        choices: [
            { image: "images/4-1.png", result: "You enjoy reading books." },
            { image: "images/4-2.png", result: "You love traveling to new places." },
            { image: "images/4-3.png", result: "You enjoy cooking delicious meals." }
        ]
    },
    {
        question: "Question 5: What is your favorite food?",
        choices: [
            { image: "images/5-1.png", result: "Pizza is your favorite food." },
            { image: "images/5-2.png", result: "You love burgers." },
            { image: "images/5-3.png", result: "You prefer healthy salads." },
            { image: "images/5-4.png", result: "Pasta is your go-to dish." },
            { image: "images/5-5.png", result: "You enjoy sushi." }
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

    document.getElementById('next-button').disabled = true; // Disable next button until an answer is selected
}

function selectAnswer(questionIndex, choiceIndex) {
    answers[questionIndex] = choiceIndex;
    document.getElementById('next-button').disabled = false; // Enable next button after an answer is selected
}

function nextQuestion() {
    if (answers[currentQuestionIndex] === undefined) {
        alert('Please select an answer before proceeding.');
        return;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
    } else {
        showResults();
    }
}

function showResults() {
    const results = [];
    results.push(`Question 1: ${questions[0].choices[answers[0]].result}`);
    results.push(`Question 2: ${questions[1].choices[answers[1]].result}`);
    results.push(`Question 3 & 4: ${questions[2].choices[answers[2]].result} and ${questions[3].choices[answers[3]].result}`);
    results.push(`Question 5: ${questions[4].choices[answers[4]].result}`);

    localStorage.setItem('results', JSON.stringify(results));
    window.location.href = 'results.html';
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('results-container')) {
        const resultsContainer = document.getElementById('results-container');
        const results = JSON.parse(localStorage.getItem('results')) || [];
        resultsContainer.innerHTML = results.map(result => `<p>${result}</p>`).join('');
    } else {
        showQuestion(currentQuestionIndex);
    }
});
