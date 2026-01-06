// Radioactivity Questions Database - Modular Loader
const QuestionBank = {
    level1: [],
    level2: [],
    level3: [],
    level4: [],
    level5: []
};

// Game State Management (unchanged)
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

// Load questions from individual files
function loadQuestions() {
    try {
        // Check if level modules are loaded
        if (typeof Level1Questions !== 'undefined') {
            QuestionBank.level1 = Level1Questions.questions || [];
            console.log(`Loaded Level 1: ${QuestionBank.level1.length} questions`);
        }
        if (typeof Level2Questions !== 'undefined') {
            QuestionBank.level2 = Level2Questions.questions || [];
            console.log(`Loaded Level 2: ${QuestionBank.level2.length} questions`);
        }
        if (typeof Level3Questions !== 'undefined') {
            QuestionBank.level3 = Level3Questions.questions || [];
            console.log(`Loaded Level 3: ${QuestionBank.level3.length} questions`);
        }
        if (typeof Level4Questions !== 'undefined') {
            QuestionBank.level4 = Level4Questions.questions || [];
            console.log(`Loaded Level 4: ${QuestionBank.level4.length} questions`);
        }
        if (typeof Level5Questions !== 'undefined') {
            QuestionBank.level5 = Level5Questions.questions || [];
            console.log(`Loaded Level 5: ${QuestionBank.level5.length} questions`);
        }
        
        // Fallback to default questions if files failed to load
        if (QuestionBank.level1.length === 0) {
            console.warn("Level 1 questions not loaded, using fallback");
            QuestionBank.level1 = getFallbackLevel1Questions();
        }
        // ... repeat for other levels if needed
        
        console.log("Questions loaded successfully");
    } catch (error) {
        console.error("Error loading questions:", error);
        loadFallbackQuestions();
    }
}

// Fallback questions (in case files don't load)
function getFallbackLevel1Questions() {
    return [
        {
            id: 1,
            question: "What is the composition of an alpha particle?",
            options: ["Two protons and two neutrons", "One proton and one neutron", "One electron", "High-energy photon"],
            correctAnswer: 0,
            explanation: "Alpha particles consist of 2 protons and 2 neutrons.",
            hint: "Think about helium nucleus.",
            bloomLevel: 1,
            points: 100,
            topic: "Alpha Decay"
        }
        // Add more fallback questions as needed
    ];
}

function loadFallbackQuestions() {
    console.log("Loading fallback questions");
    QuestionBank.level1 = getFallbackLevel1Questions();
    // Add fallback for other levels
}

// Utility Functions (unchanged)
function getRandomQuestion(bloomLevel) {
    const levelKey = `level${bloomLevel}`;
    const questions = QuestionBank[levelKey];
    
    if (!questions || questions.length === 0) {
        console.error(`No questions available for level ${bloomLevel}`);
        return getDefaultQuestion(bloomLevel);
    }
    
    // Filter out recently asked questions
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

function getDefaultQuestion(level) {
    return {
        id: 999,
        question: `Sample question for Level ${level}`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: 0,
        explanation: "This is a sample question.",
        hint: "Sample hint",
        bloomLevel: level,
        points: 100,
        topic: "General"
    };
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
    const totalScoreElement = document.getElementById('total-score');
    const knowledgeFillElement = document.getElementById('knowledge-fill');
    
    if (totalScoreElement) {
        totalScoreElement.textContent = GameState.score;
    }
    if (knowledgeFillElement) {
        knowledgeFillElement.style.width = `${calculateKnowledgePercentage()}%`;
    }
    
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
    const currentScoreElement = document.getElementById('current-score');
    const currentLevelElement = document.getElementById('current-level');
    const livesElement = document.getElementById('lives');
    
    if (currentScoreElement) {
        currentScoreElement.textContent = GameState.score;
    }
    if (currentLevelElement) {
        currentLevelElement.textContent = GameState.currentLevel;
    }
    if (livesElement) {
        livesElement.textContent = GameState.lives;
    }
}

// Load questions when script loads
document.addEventListener('DOMContentLoaded', loadQuestions);
