const quizData = [
    { question: "___ you like ice cream?", a: "Do", b: "Does", correct: "a" },
    { question: "___ she have a pet?", a: "Do", b: "Does", correct: "b" },
    { question: "We ___ not watch movies on weekdays.", a: "do", b: "does", correct: "a" },
    { question: "___ he play the guitar?", a: "Do", b: "Does", correct: "b" },
    { question: "They ___ not live in this city.", a: "do", b: "does", correct: "a" },
    { question: "I ___ not like spinach.", a: "do", b: "does", correct: "a" },
    { question: "___ it rain often?", a: "Do", b: "Does", correct: "b" },
    { question: "He ___ not have a bike.", a: "do", b: "does", correct: "b" },
    { question: "___ they like chocolate?", a: "Do", b: "Does", correct: "a" },
    { question: "___ you study English?", a: "Do", b: "Does", correct: "a" }
];

const quizContainer = document.getElementById('quiz-container');
const submitBtn = document.getElementById('submit-btn');
const resultContainer = document.getElementById('result-container');
const scoreText = document.getElementById('score-text');
const feedbackText = document.getElementById('feedback-text');
const retryBtn = document.getElementById('retry-btn');

function loadQuiz() {
    quizContainer.innerHTML = '';
    quizData.forEach((item, index) => {
        const questionEl = document.createElement('div');
        questionEl.className = 'bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4';
        
        questionEl.innerHTML = `
            <div class="flex items-center gap-3">
                <span class="bg-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">${index + 1}</span>
                <p class="font-medium text-lg">${item.question}</p>
            </div>
            <div class="flex gap-4">
                <label class="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 border border-gray-300 transition-colors w-24 justify-center">
                    <input type="radio" name="q${index}" value="a" class="hidden peer">
                    <span class="peer-checked:font-bold peer-checked:text-blue-600">a. ${item.a}</span>
                </label>
                <label class="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 border border-gray-300 transition-colors w-24 justify-center">
                    <input type="radio" name="q${index}" value="b" class="hidden peer">
                    <span class="peer-checked:font-bold peer-checked:text-pink-600">b. ${item.b}</span>
                </label>
            </div>
        `;
        quizContainer.appendChild(questionEl);
    });
    
    // Add event listeners to radio buttons to show active state
    const labels = quizContainer.querySelectorAll('label');
    labels.forEach(label => {
        const input = label.querySelector('input');
        input.addEventListener('change', () => {
            // Reset siblings
            const parent = label.parentElement;
            parent.querySelectorAll('label').forEach(l => {
                l.classList.remove('ring-2', 'ring-blue-400', 'bg-blue-50');
            });
            // Set active
            if(input.checked) {
                label.classList.add('ring-2', 'ring-blue-400', 'bg-blue-50');
            }
            checkAllAnswered();
        });
    });
}

function checkAllAnswered() {
    let answeredCount = 0;
    quizData.forEach((_, index) => {
        const answer = document.querySelector(`input[name="q${index}"]:checked`);
        if (answer) answeredCount++;
    });
    
    if (answeredCount === quizData.length) {
        submitBtn.classList.remove('hidden');
    }
}

function showResults() {
    let score = 0;
    
    quizData.forEach((item, index) => {
        const answer = document.querySelector(`input[name="q${index}"]:checked`);
        const questionDiv = quizContainer.children[index];
        const labels = questionDiv.querySelectorAll('label');
        
        if (answer) {
            if (answer.value === item.correct) {
                score++;
                // Mark correct
                answer.parentElement.classList.replace('ring-blue-400', 'ring-green-500');
                answer.parentElement.classList.replace('bg-blue-50', 'bg-green-100');
            } else {
                // Mark incorrect
                answer.parentElement.classList.replace('ring-blue-400', 'ring-red-500');
                answer.parentElement.classList.replace('bg-blue-50', 'bg-red-100');
                
                // Highlight correct answer
                const correctInput = questionDiv.querySelector(`input[value="${item.correct}"]`);
                correctInput.parentElement.classList.add('ring-2', 'ring-green-500', 'bg-green-100');
            }
        }
        
        // Disable inputs
        questionDiv.querySelectorAll('input').forEach(input => input.disabled = true);
    });

    scoreText.innerText = `${score} / ${quizData.length}`;
    
    if (score === quizData.length) {
        feedbackText.innerText = "Perfect! You're an English superstar! 🌟";
        feedbackText.className = "mt-2 text-lg font-bold text-green-600";
    } else if (score >= quizData.length / 2) {
        feedbackText.innerText = "Good job! Keep practicing! 👍";
        feedbackText.className = "mt-2 text-lg font-bold text-blue-600";
    } else {
        feedbackText.innerText = "Don't give up! Review the notes and try again. 💪";
        feedbackText.className = "mt-2 text-lg font-bold text-orange-600";
    }

    submitBtn.classList.add('hidden');
    resultContainer.classList.remove('hidden');
}

submitBtn.addEventListener('click', showResults);

retryBtn.addEventListener('click', () => {
    resultContainer.classList.add('hidden');
    submitBtn.classList.add('hidden');
    loadQuiz();
});

// Initialize
loadQuiz();
