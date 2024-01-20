let questions = [
    {
        question: "What does HTML stand for?",
        answer: "Hyper Text Markup Language",
        options: ["Hyper Text Markup Language", "High Text Markup Language", "Hyper Tabular Markup Language", "None of these"]
    },
    {
        question: "Which language runs in a web browser?",
        answer: "JavaScript",
        options: ["Java", "C", "Python", "JavaScript"]
    },
    {
        question: "What does CSS stand for?",
        answer: "Cascading Style Sheets",
        options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"]
    },
    {
        question: "Which is used for Connect To Database?",
        answer: "PHP",
        options: ["HTML", "JS", "PHP", "All"]
    },
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        answer: "<style>",
        options: ["<script>", "<css>", "<style>", "<link>"]
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer = 60;
let interval;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("next-button").classList.add("hidden");
    document.getElementById("timer").innerText = `Time: ${timer} seconds`;
    startQuiz();
});

function startQuiz() {
    interval = setInterval(() => {
        timer--;
        document.getElementById("timer").innerText = `Time: ${timer} seconds`;
        if (timer <= 0) {
            clearInterval(interval);
            endQuiz();
        }
    }, 1000);

    displayQuestion();
}

function displayQuestion() {
    let question = questions[currentQuestionIndex];
    document.getElementById("question").innerText = question.question;
    let answerOptions = document.getElementById("answer-options");
    answerOptions.innerHTML = "";
    question.options.forEach(option => {
        let li = document.createElement("li");
        li.innerText = option;
        li.onclick = () => selectAnswer(option);
        answerOptions.appendChild(li);
    });
}

function selectAnswer(answer) {
    if (answer === questions[currentQuestionIndex].answer) {
        score++;
    } else {
        timer -= 10;
    }
    document.getElementById("next-button").classList.remove("hidden");
    let options = document.getElementById("answer-options").childNodes;
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
    document.getElementById("next-button").classList.add("hidden");
}

function endQuiz() {
    clearInterval(interval);
    document.getElementById("quiz-container").innerHTML = `
        <h2>Game Over</h2>
        <p>Your score is: ${score}</p>
        <button id="reset-button" onclick="resetQuiz()">Reset Quiz</button>
    `;
}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timer = 60;
    document.getElementById("quiz-container").innerHTML = `
        <div id="question"></div>
        <ul id="answer-options"></ul>
        <button id="next-button" onclick="nextQuestion()">Next</button>
        <div id="timer"></div>
        <div id="scoreboard"></div>
    `;
    startQuiz();
}
