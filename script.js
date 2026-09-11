const appData = {
    slides: [
        {
            title: "Rule 1: DO",
            color: "blue",
            content: `
                <div class="text-center space-y-6">
                    <div class="text-6xl text-blue-500 mb-4"><i class="fas fa-users"></i></div>
                    <p class="text-xl">We use <strong>DO</strong> with <span class="text-blue-600 font-bold">I, we, you, they</span>.</p>
                    <div class="bg-blue-50 p-4 rounded-xl border border-blue-100 text-left space-y-2 font-medium">
                        <p>• <span class="text-blue-500">I</span> do</p>
                        <p>• <span class="text-blue-500">We</span> do</p>
                        <p>• <span class="text-blue-500">You</span> do</p>
                        <p>• <span class="text-blue-500">They</span> do</p>
                    </div>
                </div>
            `
        },
        {
            title: "Rule 2: DOES",
            color: "pink",
            content: `
                <div class="text-center space-y-6">
                    <div class="text-6xl text-pink-500 mb-4"><i class="fas fa-user"></i></div>
                    <p class="text-xl">We use <strong>DOES</strong> with <span class="text-pink-600 font-bold">he, she, it</span>.</p>
                    <div class="bg-pink-50 p-4 rounded-xl border border-pink-100 text-left space-y-2 font-medium">
                        <p>• <span class="text-pink-500">He</span> does</p>
                        <p>• <span class="text-pink-500">She</span> does</p>
                        <p>• <span class="text-pink-500">It</span> does</p>
                    </div>
                </div>
            `
        },
        {
            title: "Making Questions",
            color: "green",
            content: `
                <div class="text-center space-y-6">
                    <div class="text-6xl text-green-500 mb-4"><i class="fas fa-question-circle"></i></div>
                    <p class="text-lg">Put <strong>Do/Does</strong> at the <span class="text-green-600 font-bold">beginning</span> of the sentence.</p>
                    <div class="bg-green-50 p-4 rounded-xl border border-green-100 text-left">
                        <p class="font-bold text-green-700 mb-2">Do/Does + Subject + Verb 1?</p>
                        <ul class="list-disc list-inside space-y-1 text-sm">
                            <li><span class="font-bold">Do</span> you play tennis?</li>
                            <li><span class="font-bold">Does</span> she play tennis?</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            title: "Negative Sentences",
            color: "purple",
            content: `
                <div class="text-center space-y-6">
                    <div class="text-6xl text-purple-500 mb-4"><i class="fas fa-minus-circle"></i></div>
                    <p class="text-lg">Add <strong>NOT</strong> <span class="text-purple-600 font-bold">after</span> Do/Does.</p>
                    <div class="bg-purple-50 p-4 rounded-xl border border-purple-100 text-left">
                        <p class="font-bold text-purple-700 mb-2">Subject + do/does + not + Verb 1</p>
                        <ul class="list-disc list-inside space-y-1 text-sm">
                            <li>I <span class="font-bold">do not</span> play tennis.</li>
                            <li>She <span class="font-bold">does not</span> play tennis.</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            title: "Common Mistakes",
            color: "red",
            content: `
                <div class="text-center space-y-4">
                    <div class="text-6xl text-red-500 mb-2"><i class="fas fa-exclamation-triangle"></i></div>
                    <div class="bg-pink-100 text-pink-800 p-3 rounded-lg font-bold text-sm">
                        Remember! After do/does, always use the base verb (verb 1)!
                    </div>
                    <div class="bg-red-50 p-4 rounded-xl border border-red-100 text-left text-sm space-y-2">
                        <p class="text-red-500">✗ Does she <u>plays</u> the piano?</p>
                        <p class="text-green-600 font-bold border-b pb-2">✓ Does she <u>play</u> the piano?</p>
                        <p class="text-red-500 pt-2">✗ She does not <u>likes</u> coffee.</p>
                        <p class="text-green-600 font-bold">✓ She does not <u>like</u> coffee.</p>
                    </div>
                </div>
            `
        }
    ],
    quiz: [
        { 
            type: "mcq",
            q: "___ you like ice cream?", 
            options: ["Do", "Does"], answer: 0, 
            explanation: "We use 'Do' with the pronoun 'You'.", 
            fullSentence: "Do you like ice cream?"
        },
        { 
            type: "mcq",
            q: "___ she have a pet?", 
            options: ["Do", "Does"], answer: 1, 
            explanation: "We use 'Does' with the singular pronoun 'She'.",
            fullSentence: "Does she have a pet?"
        },
        { 
            type: "mcq",
            q: "The dog ___ not bark loudly.", 
            options: ["do", "does"], answer: 1, 
            explanation: "'The dog' is singular (It), so we use 'Does'.",
            fullSentence: "The dog does not bark loudly."
        },
        { 
            type: "mcq",
            q: "My parents ___ not live in this city.", 
            options: ["do", "does"], answer: 0, 
            explanation: "'My parents' is plural (They), so we use 'Do'.",
            fullSentence: "My parents do not live in this city."
        },
        {
            type: "dialog",
            speakerA: "___ John play the guitar?",
            speakerB: "No, he ___ not.",
            options: ["Do / do", "Does / does", "Do / does"], answer: 1,
            explanation: "John is 'He', so we use 'Does' for both the question and the answer.",
            fullSentence: "Does John play the guitar? No, he does not."
        },
        {
            type: "build",
            words: ["Does", "play", "she", "tennis", "?"],
            correctOrder: ["Does", "she", "play", "tennis", "?"],
            explanation: "In a question, the structure is: Does + Subject (she) + Verb 1 (play).",
            fullSentence: "Does she play tennis?"
        },
        {
            type: "build",
            words: ["not", "We", "do", "watch", "TV", "."],
            correctOrder: ["We", "do", "not", "watch", "TV", "."],
            explanation: "In a negative sentence, the structure is: Subject (We) + do + not + Verb 1 (watch).",
            fullSentence: "We do not watch TV."
        }
    ]
};

const app = {
    currentScreen: 'home-screen',
    learnSlideIndex: 0,
    quizIndex: 0,
    score: 0,
    lives: 3,
    selectedOption: null,
    buildSelection: [],

    // Theme (persisted, default dark) + helpers
    shuffle: function(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
        }
        return arr;
    },
    initTheme: function() {
        let t = 'dark';
        try { t = localStorage.getItem('dd-theme') || 'dark'; } catch (e) {}
        document.documentElement.setAttribute('data-theme', t);
        this.syncThemeIcon();
    },
    toggleTheme: function() {
        const cur = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', cur);
        try { localStorage.setItem('dd-theme', cur); } catch (e) {}
        this.syncThemeIcon();
    },
    syncThemeIcon: function() {
        const dark = document.documentElement.getAttribute('data-theme') !== 'light';
        const icons = document.querySelectorAll('.theme-icon');
        for (let k = 0; k < icons.length; k++) {
            icons[k].className = 'theme-icon fas ' + (dark ? 'fa-sun' : 'fa-moon');
        }
    },
    celebrate: function() {
        try {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            const c = document.getElementById('confetti-canvas');
            const box = document.getElementById('app');
            c.width = box.clientWidth; c.height = box.clientHeight;
            c.classList.remove('hidden');
            const ctx = c.getContext('2d');
            const colors = ['#4f6df5', '#ec4899', '#22c55e', '#f59e0b', '#5b8cff'];
            const parts = [];
            for (let n = 0; n < 90; n++) {
                parts.push({
                    x: Math.random() * c.width, y: -20 - Math.random() * c.height * .3,
                    w: 6 + Math.random() * 6, h: 8 + Math.random() * 8,
                    vy: 2 + Math.random() * 3, vx: -1.5 + Math.random() * 3,
                    r: Math.random() * Math.PI, vr: -.1 + Math.random() * .2,
                    col: colors[Math.floor(Math.random() * colors.length)]
                });
            }
            let frames = 0;
            const tick = function() {
                ctx.clearRect(0, 0, c.width, c.height);
                parts.forEach(function(p) {
                    p.x += p.vx; p.y += p.vy; p.r += p.vr;
                    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
                    ctx.fillStyle = p.col; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                    ctx.restore();
                });
                frames++;
                if (frames < 160) requestAnimationFrame(tick);
                else c.classList.add('hidden');
            };
            requestAnimationFrame(tick);
        } catch (e) {}
    },

    // Sounds
    playSfx: function(id) {
        const audio = document.getElementById(id);
        if(audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.log("Audio play blocked by browser."));
        }
    },

    playSentenceAudio: function() {
        const q = appData.quiz[this.quizIndex];
        if ('speechSynthesis' in window && q.fullSentence) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(q.fullSentence);
            utterance.lang = 'en-US';
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    },

    // Navigation
    showScreen: function(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
        this.currentScreen = id;
    },
    
    goHome: function() {
        this.showScreen('home-screen');
    },

    // --- LEARN MODE ---
    startLearn: function() {
        this.learnSlideIndex = 0;
        this.renderSlide();
        this.showScreen('learn-screen');
    },

    renderSlide: function() {
        const slide = appData.slides[this.learnSlideIndex];
        const container = document.getElementById('slide-container');
        
        container.innerHTML = `
            <div class="lesson-card pop p-8 rounded-3xl w-full max-w-sm border-t-8 slide-in" style="border-top-color: ${({blue:'#3b82f6',pink:'#ec4899',green:'#22c55e',purple:'#a855f7',red:'#ef4444'})[slide.color] || '#4f6df5'}">
                <h2 class="font-display text-2xl font-bold text-center mb-6">${slide.title}</h2>
                ${slide.content}
            </div>
        `;

        // Update progress bar
        const progress = ((this.learnSlideIndex + 1) / appData.slides.length) * 100;
        document.getElementById('learn-progress').style.width = `${progress}%`;

        // Update buttons
        document.getElementById('btn-prev-slide').disabled = this.learnSlideIndex === 0;
        const nextBtn = document.getElementById('btn-next-slide');
        if (this.learnSlideIndex === appData.slides.length - 1) {
            nextBtn.innerHTML = `Finish <i class="fas fa-check ml-2"></i>`;
            nextBtn.className = "flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-2xl shadow-md transition transform active:scale-95 text-lg";
        } else {
            nextBtn.innerHTML = `Next <i class="fas fa-chevron-right ml-2"></i>`;
            nextBtn.className = "flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-2xl shadow-md transition transform active:scale-95 text-lg";
        }
    },

    nextSlide: function() {
        if (this.learnSlideIndex < appData.slides.length - 1) {
            this.learnSlideIndex++;
            this.renderSlide();
        } else {
            this.goHome();
        }
    },

    prevSlide: function() {
        if (this.learnSlideIndex > 0) {
            this.learnSlideIndex--;
            this.renderSlide();
        }
    },


    // --- QUIZ MODE ---
    startQuiz: function() {
        this.quizIndex = 0;
        this.score = 0;
        this.lives = 3;
        
        // Shuffle questions
        this.shuffle(appData.quiz);
        // If type build, shuffle words
        appData.quiz.forEach(q => {
            if(q.type === 'build') {
                q.shuffledWords = this.shuffle([...q.words]);
            }
        });

        document.getElementById('quiz-result-overlay').classList.add('hidden');
        this.updateHeartsUI();
        this.renderQuestion();
        this.showScreen('quiz-screen');
    },

    updateHeartsUI: function() {
        const container = document.getElementById('hearts-container');
        container.innerHTML = '';
        for(let i=0; i<3; i++) {
            if(i < this.lives) {
                container.innerHTML += '<i class="fas fa-heart"></i>';
            } else {
                container.innerHTML += '<i class="far fa-heart text-gray-300"></i>';
            }
        }
    },

    renderQuestion: function() {
        this.selectedOption = null;
        this.buildSelection = [];
        const q = appData.quiz[this.quizIndex];
        const container = document.getElementById('quiz-container');
        
        // Reset Footer
        document.getElementById('feedback-message').classList.add('hidden');
        document.getElementById('feedback-message').classList.remove('flex');
        
        const checkBtn = document.getElementById('btn-check');
        checkBtn.classList.remove('hidden', 'bg-green-500', 'text-white', 'hover:bg-green-600');
        checkBtn.classList.add('bg-gray-300', 'text-gray-500', 'pointer-events-none');
        document.getElementById('btn-next-quiz').classList.add('hidden');

        // Render progress
        const progress = (this.quizIndex / appData.quiz.length) * 100;
        document.getElementById('quiz-progress').style.width = `${progress}%`;
        document.getElementById('quiz-counter').textContent = `${this.quizIndex + 1}/${appData.quiz.length}`;
        
        let contentHtml = '';

        if (q.type === 'mcq') {
            let optionsHtml = '';
            q.options.forEach((opt, idx) => {
                optionsHtml += `
                    <div class="option-card bg-white border-2 border-gray-200 rounded-2xl p-4 text-center cursor-pointer transition transform hover:scale-[1.02] active:scale-95 shadow-sm"
                         onclick="app.selectOption(${idx})">
                        <span class="text-xl font-bold text-gray-700">${opt}</span>
                    </div>
                `;
            });

            contentHtml = `
                <div class="flex-1 flex flex-col slide-in">
                    <div class="mb-8">
                        <h2 class="text-2xl font-extrabold text-gray-800 leading-tight">Fill in the blank:</h2>
                    </div>
                    <div class="bg-blue-50 p-6 rounded-3xl mb-8 border border-blue-100 shadow-inner">
                        <p class="text-2xl font-medium text-center text-blue-900">${q.q.replace('___', '<span class="inline-block w-16 border-b-4 border-blue-400"></span>')}</p>
                    </div>
                    <div class="space-y-4">
                        ${optionsHtml}
                    </div>
                </div>
            `;
        } 
        else if (q.type === 'dialog') {
            let optionsHtml = '';
            q.options.forEach((opt, idx) => {
                optionsHtml += `
                    <div class="option-card bg-white border-2 border-gray-200 rounded-2xl p-4 text-center cursor-pointer transition transform hover:scale-[1.02] active:scale-95 shadow-sm"
                         onclick="app.selectOption(${idx})">
                        <span class="text-xl font-bold text-gray-700">${opt}</span>
                    </div>
                `;
            });

            contentHtml = `
                <div class="flex-1 flex flex-col slide-in">
                    <div class="mb-8">
                        <h2 class="text-2xl font-extrabold text-gray-800 leading-tight">Complete the conversation:</h2>
                    </div>
                    <div class="space-y-4 mb-8">
                        <div class="flex gap-3 items-end">
                            <div class="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-700 text-xs shrink-0">A</div>
                            <div class="bg-blue-100 p-4 rounded-2xl rounded-bl-none border border-blue-200 text-lg font-medium text-blue-900">
                                ${q.speakerA.replace('___', '<span class="inline-block w-12 border-b-2 border-blue-500"></span>')}
                            </div>
                        </div>
                        <div class="flex gap-3 items-end flex-row-reverse">
                            <div class="w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center font-bold text-pink-700 text-xs shrink-0">B</div>
                            <div class="bg-pink-100 p-4 rounded-2xl rounded-br-none border border-pink-200 text-lg font-medium text-pink-900">
                                ${q.speakerB.replace('___', '<span class="inline-block w-12 border-b-2 border-pink-500"></span>')}
                            </div>
                        </div>
                    </div>
                    <div class="space-y-4">
                        ${optionsHtml}
                    </div>
                </div>
            `;
        }
        else if (q.type === 'build') {
            let chipsHtml = '';
            q.shuffledWords.forEach((word, idx) => {
                chipsHtml += `
                    <div id="chip-${idx}" class="word-chip bg-white border-2 border-gray-300 rounded-xl px-4 py-2 text-lg font-bold text-gray-700 shadow-sm"
                         onclick="app.toggleBuildWord(${idx}, '${word.replace(/'/g, "\\'")}')">
                        ${word}
                    </div>
                `;
            });

            contentHtml = `
                <div class="flex-1 flex flex-col slide-in">
                    <div class="mb-8">
                        <h2 class="text-2xl font-extrabold text-gray-800 leading-tight">Form the correct sentence:</h2>
                    </div>
                    <!-- Drop zone -->
                    <div class="bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl min-h-[100px] p-4 flex flex-wrap gap-2 items-start content-start mb-8 shadow-inner" id="build-zone">
                        <!-- Selected words go here -->
                    </div>
                    <!-- Word Bank -->
                    <div class="flex flex-wrap gap-3 justify-center" id="word-bank">
                        ${chipsHtml}
                    </div>
                </div>
            `;
        }

        container.innerHTML = contentHtml;
    },

    selectOption: function(idx) {
        this.selectedOption = idx;
        const cards = document.querySelectorAll('#quiz-container .option-card');
        
        // Reset all
        cards.forEach(card => {
            card.classList.remove('border-blue-500', 'bg-blue-50', 'ring-4', 'ring-blue-100');
            card.classList.add('border-gray-200', 'bg-white');
        });

        // Select clicked
        const selectedCard = cards[idx];
        selectedCard.classList.remove('border-gray-200', 'bg-white');
        selectedCard.classList.add('border-blue-500', 'bg-blue-50', 'ring-4', 'ring-blue-100');

        // Enable check button
        const checkBtn = document.getElementById('btn-check');
        checkBtn.classList.remove('bg-gray-300', 'text-gray-500', 'pointer-events-none');
        checkBtn.classList.add('bg-blue-500', 'text-white', 'hover:bg-blue-600', 'cursor-pointer');
    },

    toggleBuildWord: function(idx, word) {
        const chip = document.getElementById(`chip-${idx}`);
        const zone = document.getElementById('build-zone');
        
        if (chip.classList.contains('selected')) {
            // Remove from selection
            chip.classList.remove('selected');
            this.buildSelection = this.buildSelection.filter(item => item.idx !== idx);
            // Re-render zone
            zone.innerHTML = '';
            this.buildSelection.forEach(item => {
                zone.innerHTML += `
                    <div class="bg-blue-500 text-white rounded-xl px-4 py-2 text-lg font-bold shadow-sm cursor-pointer hover:bg-blue-600 transition" onclick="app.toggleBuildWord(${item.idx}, '${item.word.replace(/'/g, "\\'")}')">
                        ${item.word}
                    </div>
                `;
            });
        } else {
            // Add to selection
            chip.classList.add('selected');
            this.buildSelection.push({idx, word});
            zone.innerHTML += `
                <div class="bg-blue-500 text-white rounded-xl px-4 py-2 text-lg font-bold shadow-sm cursor-pointer hover:bg-blue-600 transition slide-in" onclick="app.toggleBuildWord(${idx}, '${word.replace(/'/g, "\\'")}')">
                    ${word}
                </div>
            `;
        }

        // Enable check button if all words are selected
        const q = appData.quiz[this.quizIndex];
        const checkBtn = document.getElementById('btn-check');
        if (this.buildSelection.length === q.words.length) {
            checkBtn.classList.remove('bg-gray-300', 'text-gray-500', 'pointer-events-none');
            checkBtn.classList.add('bg-blue-500', 'text-white', 'hover:bg-blue-600', 'cursor-pointer');
        } else {
            checkBtn.classList.add('bg-gray-300', 'text-gray-500', 'pointer-events-none');
            checkBtn.classList.remove('bg-blue-500', 'text-white', 'hover:bg-blue-600', 'cursor-pointer');
        }
    },

    checkAnswer: function() {
        const q = appData.quiz[this.quizIndex];
        let isCorrect = false;

        if (q.type === 'mcq' || q.type === 'dialog') {
            if (this.selectedOption === null) return;
            isCorrect = this.selectedOption === q.answer;
            // Disable clicks
            document.querySelectorAll('#quiz-container .option-card').forEach(card => card.style.pointerEvents = 'none');
        } 
        else if (q.type === 'build') {
            if (this.buildSelection.length !== q.words.length) return;
            // Compare order
            const userOrder = this.buildSelection.map(i => i.word).join(' ');
            const correctOrder = q.correctOrder.join(' ');
            isCorrect = userOrder === correctOrder;
            // Disable clicks
            document.querySelectorAll('.word-chip').forEach(card => card.style.pointerEvents = 'none');
            document.getElementById('build-zone').style.pointerEvents = 'none';
        }
        
        const feedbackMsg = document.getElementById('feedback-message');
        const feedbackIcon = document.getElementById('feedback-icon');
        const feedbackText = document.getElementById('feedback-text');
        const feedbackExp = document.getElementById('feedback-explanation');
        
        document.getElementById('btn-check').classList.add('hidden');
        const nextBtn = document.getElementById('btn-next-quiz');
        nextBtn.classList.remove('hidden');

        // Show feedback container
        feedbackMsg.classList.remove('hidden');
        feedbackMsg.classList.add('flex');
        feedbackMsg.classList.remove('bg-green-100', 'text-green-900', 'bg-red-100', 'text-red-900');
        feedbackIcon.className = 'w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-xl text-white';
        feedbackExp.innerText = q.explanation || "";

        if (isCorrect) {
            this.score++;
            this.playSfx('sfx-correct');
            
            if(q.type === 'mcq' || q.type === 'dialog') {
                const cards = document.querySelectorAll('#quiz-container .option-card');
                cards[this.selectedOption].classList.replace('border-blue-500', 'border-green-500');
                cards[this.selectedOption].classList.replace('bg-blue-50', 'bg-green-100');
                cards[this.selectedOption].classList.replace('ring-blue-100', 'ring-green-100');
            } else if (q.type === 'build') {
                document.getElementById('build-zone').classList.replace('bg-gray-100', 'bg-green-50');
                document.getElementById('build-zone').classList.replace('border-gray-300', 'border-green-300');
            }
            
            // Show feedback
            feedbackMsg.classList.add('bg-green-100', 'text-green-900');
            feedbackIcon.classList.add('bg-green-500');
            feedbackIcon.innerHTML = '<i class="fas fa-check"></i>';
            feedbackText.innerText = "Excellent!";
            
            nextBtn.className = "w-full text-white font-bold py-4 px-6 rounded-2xl text-xl shadow-lg transition transform active:scale-95 bg-green-500 hover:bg-green-600";
        } else {
            this.playSfx('sfx-wrong');
            this.lives--;
            this.updateHeartsUI();

            if(q.type === 'mcq' || q.type === 'dialog') {
                const cards = document.querySelectorAll('#quiz-container .option-card');
                cards[this.selectedOption].classList.replace('border-blue-500', 'border-red-500');
                cards[this.selectedOption].classList.replace('bg-blue-50', 'bg-red-50');
                cards[this.selectedOption].classList.replace('ring-blue-100', 'ring-red-100');
                // Show correct answer
                cards[q.answer].classList.remove('border-gray-200', 'bg-white');
                cards[q.answer].classList.add('border-green-500', 'bg-green-100');
            } else if (q.type === 'build') {
                document.getElementById('build-zone').classList.replace('bg-gray-100', 'bg-red-50');
                document.getElementById('build-zone').classList.replace('border-gray-300', 'border-red-300');
                // Make the zone visually shake
                document.getElementById('build-zone').classList.add('shake');
            }

            // Show feedback
            feedbackMsg.classList.add('bg-red-100', 'text-red-900');
            feedbackIcon.classList.add('bg-red-500');
            feedbackIcon.innerHTML = '<i class="fas fa-times"></i>';
            feedbackText.innerText = "Not quite right!";

            nextBtn.className = "w-full text-white font-bold py-4 px-6 rounded-2xl text-xl shadow-lg transition transform active:scale-95 bg-red-500 hover:bg-red-600";
        }
    },

    nextQuestion: function() {
        if (this.lives <= 0) {
            this.showGameOver();
            return;
        }

        this.quizIndex++;
        if (this.quizIndex < appData.quiz.length) {
            this.renderQuestion();
        } else {
            this.showResult();
        }
    },

    showGameOver: function() {
        this.playSfx('sfx-gameover');
        
        const overlay = document.getElementById('quiz-result-overlay');
        overlay.classList.remove('hidden');
        
        const goIcon = document.getElementById('result-icon');
        goIcon.innerHTML = '<i class="fas fa-heart-broken"></i>';
        goIcon.style.background = 'linear-gradient(135deg, #64748b, #334155)';
        document.getElementById('result-title').innerText = "Game Over!";
        document.getElementById('result-subtitle').innerHTML = "You ran out of hearts. Try again!";
    },

    showResult: function() {
        this.playSfx('sfx-complete');
        document.getElementById('quiz-progress').style.width = '100%';
        
        const overlay = document.getElementById('quiz-result-overlay');
        overlay.classList.remove('hidden');
        
        document.getElementById('result-title').innerText = "Quiz Complete!";
        document.getElementById('result-subtitle').innerHTML = `You scored <span id="final-score" class="font-bold text-green-500 text-2xl">${this.score}</span> out of ${appData.quiz.length}.`;
        
        const icon = document.getElementById('result-icon');
        icon.style.background = 'linear-gradient(135deg, #f59e0b, #ec4899)';
        if(this.score === appData.quiz.length) {
            icon.innerHTML = '<i class="fas fa-crown"></i>';
            this.celebrate();
        } else if(this.score >= appData.quiz.length / 2) {
            icon.innerHTML = '<i class="fas fa-thumbs-up"></i>';
        } else {
            icon.innerHTML = '<i class="fas fa-dumbbell"></i>';
        }
    }
};

// Initialize
app.initTheme();
app.goHome();

// Keyboard: 1-3 pick option, Enter = check / continue
document.addEventListener('keydown', function(e) {
    if (app.currentScreen !== 'quiz-screen') return;
    if (!document.getElementById('quiz-result-overlay').classList.contains('hidden')) return;
    if (e.key >= '1' && e.key <= '3') {
        const cards = document.querySelectorAll('#quiz-container .option-card');
        const i = parseInt(e.key, 10) - 1;
        if (cards[i] && cards[i].style.pointerEvents !== 'none') app.selectOption(i);
    } else if (e.key === 'Enter') {
        if (!document.getElementById('btn-next-quiz').classList.contains('hidden')) app.nextQuestion();
        else app.checkAnswer();
    }
});
