// Radioactivity Questions Database (No backend needed)
// Radioactivity Questions Database
// This now aggregates data from the loaded "questions/levelX.js" files
const QuestionBank = {
    // We check if the external variable exists (e.g. Level1Questions) 
    // and grab the '.questions' array from it.
    level1: typeof Level1Questions !== 'undefined' ? Level1Questions.questions : [],
    level2: typeof Level2Questions !== 'undefined' ? Level2Questions.questions : [],
    level3: typeof Level3Questions !== 'undefined' ? Level3Questions.questions : [],
    level4: typeof Level4Questions !== 'undefined' ? Level4Questions.questions : [],
    level5: typeof Level5Questions !== 'undefined' ? Level5Questions.questions : []
};

// Game State Management
const GameState = {
    currentLevel: 1,
    score: 0,
    knowledge: {
        level1: 0,
        level2: 0,
        level3: 0,
        level4: 0,
        level5: 0
    },
    totalQuestionsAnswered: 0,
    correctAnswers: 0,
    gameActive: false,
    currentQuestion: null,
    selectedAnswer: null,
    timeStarted: null,
    goldCollected: 0,
    lives: 3,
    levelScores: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
    }
};

// Utility Functions
function getRandomQuestion(bloomLevel) {
    const levelKey = `level${bloomLevel}`;
    const questions = QuestionBank[levelKey];
    if (!questions || questions.length === 0) return null;
    
    // Filter out recently asked questions (simple implementation)
    const availableQuestions = questions.filter(q => 
        !GameState.recentQuestions || !GameState.recentQuestions.includes(q.id)
    );
    
    const questionPool = availableQuestions.length > 0 ? availableQuestions : questions;
    const randomIndex = Math.floor(Math.random() * questionPool.length);
    
    // Track recent questions (last 3)
    GameState.recentQuestions = GameState.recentQuestions || [];
    GameState.recentQuestions.push(questionPool[randomIndex].id);
    if (GameState.recentQuestions.length > 3) {
        GameState.recentQuestions.shift();
    }
    
    return questionPool[randomIndex];
}

function calculateKnowledgePercentage() {
    const totalPossible = Object.keys(GameState.knowledge).length * 100;
    const totalEarned = Object.values(GameState.knowledge).reduce((a, b) => a + b, 0);
    return Math.round((totalEarned / totalPossible) * 100);
}

function resetGameState() {
    GameState.currentLevel = 1;
    GameState.score = 0;
    GameState.knowledge = { level1: 0, level2: 0, level3: 0, level4: 0, level5: 0 };
    GameState.totalQuestionsAnswered = 0;
    GameState.correctAnswers = 0;
    GameState.gameActive = false;
    GameState.currentQuestion = null;
    GameState.selectedAnswer = null;
    GameState.timeStarted = null;
    GameState.goldCollected = 0;
    GameState.lives = 3;
    GameState.levelScores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    
    // Save to localStorage
    saveGameProgress();
    updateUI();
}

function saveGameProgress() {
    const progress = {
        level: GameState.currentLevel,
        score: GameState.score,
        knowledge: GameState.knowledge,
        levelScores: GameState.levelScores
    };
    localStorage.setItem('radioactivityRunnerProgress', JSON.stringify(progress));
}

function loadGameProgress() {
    const saved = localStorage.getItem('radioactivityRunnerProgress');
    if (saved) {
        const progress = JSON.parse(saved);
        GameState.currentLevel = progress.level || 1;
        GameState.score = progress.score || 0;
        GameState.knowledge = progress.knowledge || { level1: 0, level2: 0, level3: 0, level4: 0, level5: 0 };
        GameState.levelScores = progress.levelScores || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        return true;
    }
    return false;
}

function updateUI() {
    // Update start screen
    document.getElementById('total-score').textContent = GameState.score;
    document.getElementById('knowledge-fill').style.width = `${calculateKnowledgePercentage()}%`;
    
    // Update progress circles
    for (let i = 1; i <= 5; i++) {
        const progressCircle = document.getElementById(`progress-${i}`);
        if (progressCircle) {
            const knowledge = GameState.knowledge[`level${i}`] || 0;
            const percentage = Math.min(100, knowledge);
            progressCircle.textContent = `${percentage}%`;
            progressCircle.style.background = `conic-gradient(#00c9ff ${percentage}%, #2c5364 ${percentage}%)`;
        }
    }
    
    // Update game screen stats
    document.getElementById('current-score').textContent = GameState.score;
    document.getElementById('current-level').textContent = GameState.currentLevel;
    document.getElementById('lives').textContent = GameState.lives;
}

// Sound utility functions
function playSound(soundName) {
    if (typeof soundManager !== 'undefined') {
        soundManager.play(soundName);
    }
}

function playBGM(bgmName) {
    if (typeof soundManager !== 'undefined') {
        soundManager.playBGM(bgmName);
    }
}

function stopBGM() {
    if (typeof soundManager !== 'undefined') {
        soundManager.stopBGM();
    }
}

function pauseBGM() {
    if (typeof soundManager !== 'undefined') {
        soundManager.pauseBGM();
    }
}

function resumeBGM() {
    if (typeof soundManager !== 'undefined') {
        soundManager.resumeBGM();
    }
}
