/*
    This is the Debugging Ducks Career Quiz website.

    Author: The Debugging Ducks

    Date: 2025-04-22

    Filename: quiz.js
*/

const careerData = {
    web: { title: "Web Developer", salary: "$26,500 (Junior) - $120,000 (Senior)" },
    data: { title: "Data Analyst", salary: "$51,000 (Junior) - $107,500 (Senior)" },
    design: { title: "UI/UX Designer", salary: "$38,500 (Junior) - $148,500 (Senior)" }
};

const questions = [
    {
        question: "When solving problems, you prefer to:",
        options: [
            { text: "Write code to build solutions", value: "web" },
            { text: "Analyze data to find patterns", value: "data" },
            { text: "Design visual interfaces", value: "design" }
        ]
    },
    {
        question: "Your ideal work environment includes:",
        options: [
            { text: "Multiple monitors with code editors", value: "web" },
            { text: "Spreadsheets and data dashboards", value: "data" },
            { text: "Color palettes and design mockups", value: "design" }
        ]
    },
    {
        question: "Which activity excites you most?",
        options: [
            { text: "Debugging a complex program", value: "web" },
            { text: "Finding trends in datasets", value: "data" },
            { text: "Creating user-friendly layouts", value: "design" }
        ]
    },
    {
        question: "Your strongest skill is:",
        options: [
            { text: "Logical problem-solving", value: "web" },
            { text: "Statistical analysis", value: "data" },
            { text: "Visual creativity", value: "design" }
        ]
    },
    {
        question: "Choose your favorite tool:",
        options: [
            { text: "Visual Studio Code", value: "web" },
            { text: "Microsoft Excel", value: "data" },
            { text: "Adobe Photoshop", value: "design" }
        ]
    },
    {
        question: "Your approach to projects:",
        options: [
            { text: "Build functional prototypes", value: "web" },
            { text: "Research and analyze first", value: "data" },
            { text: "Focus on user experience", value: "design" }
        ]
    },
    {
        question: "Which class would you enjoy most?",
        options: [
            { text: "Web Application Development", value: "web" },
            { text: "Data Analytics Fundamentals", value: "data" },
            { text: "User Interface Design", value: "design" }
        ]
    },
    {
        question: "Your friends would describe you as:",
        options: [
            { text: "The technical problem-solver", value: "web" },
            { text: "The analytical thinker", value: "data" },
            { text: "The creative visionary", value: "design" }
        ]
    },
    {
        question: "Your dream project involves:",
        options: [
            { text: "Building a complex web application", value: "web" },
            { text: "Discovering insights from big data", value: "data" },
            { text: "Designing an award-winning interface", value: "design" }
        ]
    },
    {
        question: "What's your ideal weekend activity?",
        options: [
            { text: "Coding a personal project", value: "web" },
            { text: "Analyzing sports statistics", value: "data" },
            { text: "Redesigning a website layout", value: "design" }
        ]
    }
];

let currentQuestion = 0;
let scores = { web: 0, data: 0, design: 0 };

function initializeQuiz() {
    
    const container = document.querySelector('.questions-container');
    container.innerHTML = '';
    
    questions.forEach((q, index) => {
        const questionEl = document.createElement('div');
        questionEl.className = `question ${index === 0 ? 'active' : ''}`;
        questionEl.innerHTML = `
            <h2>${q.question}</h2>
            <div class="options">
                ${q.options.map(opt => `
                    <div class="option" data-value="${opt.value}">${opt.text}</div>
                `).join('')}
            </div>
        `;
        
        questionEl.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', () => handleAnswer(option.dataset.value));
        });
        
        container.appendChild(questionEl);
    });
    
    updateProgress();
}

function handleAnswer(value) {
    scores[value]++;
    currentQuestion++;
    
    if(currentQuestion < questions.length) {
        moveToNextQuestion();
    } else {
        showResult();
    }
    
    updateProgress();
}

function moveToNextQuestion() {
    const questions = document.querySelectorAll('.question');
    questions[currentQuestion - 1].classList.add('exit');
    questions[currentQuestion].classList.add('active');
}

function updateProgress() {
    const progress = (currentQuestion / questions.length) * 100;
    document.querySelector('.progress-bar').style.width = `${progress}%`;
}

function showResult() {
    const result = Object.entries(scores).sort((a,b) => b[1]-a[1])[0][0];
    document.getElementById('career-name').textContent = careerData[result].title;
    document.getElementById('career-salary').textContent = careerData[result].salary;
    
    document.querySelector('.questions-container').style.transform = 'translateX(-100%)';
    document.querySelector('.result-container').classList.add('active');
}

document.querySelector('.retake-btn').addEventListener('click', () => {
    currentQuestion = 0;
    scores = { web: 0, data: 0, design: 0 };
    document.querySelector('.questions-container').style.transform = 'translateX(0)';
    document.querySelector('.result-container').classList.remove('active');
    initializeQuiz();
});

// Initialize quiz on first load
initializeQuiz();
