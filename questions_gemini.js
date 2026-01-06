// Radioactivity Questions Database - Modular Loader
// CHANGE 1: Use window.QuestionBank to make it accessible to game.js
window.QuestionBank = {
    level1: [],
    level2: [],
    level3: [],
    level4: [],
    level5: []
};

// Game State Management
// CHANGE 2: Use window.GameState to make it accessible to ui.js
window.GameState = {
    currentLevel: 1,
    score: 0,
    knowledge: {
        level1: 0, level2: 0, level3: 0, level4: 0, level5: 0
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
        1: 0, 2: 0, 3: 0, 4: 0, 5: 0
    }
};

// Load questions from individual files
function loadQuestions() {
    try {
        // Check if level modules are loaded
        if (typeof Level1Questions !== 'undefined') {
            window.QuestionBank.level1 = Level1Questions.questions || [];
            console.log(`Loaded Level 1: ${window.QuestionBank.level1.length} questions`);
        }
        if (typeof Level2Questions !== 'undefined') {
            window.QuestionBank.level2 = Level2Questions.questions || [];
            console.log(`Loaded Level 2: ${window.QuestionBank.level2.length} questions`);
        }
        // ... (Keep existing checks for levels 3, 4, 5) ...
        
        // Fallback checks
        if (window.QuestionBank.level1.length === 0) {
            console.warn("Level 1 questions not loaded, using fallback");
            window.QuestionBank.level1 = getFallbackLevel1Questions();
        }
        
        console.log("Questions loaded successfully");
    } catch (error) {
        console.error("Error loading questions:", error);
        loadFallbackQuestions();
    }
}

// Fallback questions
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
    ];
}

function loadFallbackQuestions() {
    console.log("Loading fallback questions");
    window.QuestionBank.level1 = getFallbackLevel1Questions();
}

// Utility Functions
// Make these global if needed, or keep them local if only used here
window.resetGameState = function() {
    window.GameState.currentLevel = 1;
    window.GameState.score = 0;
    window.GameState.knowledge = { level1: 0, level2: 0, level3: 0, level4: 0, level5: 0 };
    window.GameState.lives = 3;
    window.GameState.goldCollected = 0;
    saveGameProgress();
    updateUI();
};

window.saveGameProgress = function() {
    const progress = {
        level: window.GameState.currentLevel,
        score: window.GameState.score,
        knowledge: window.GameState.knowledge
    };
    localStorage.setItem('radioactivityRunnerProgress', JSON.stringify(progress));
};

window.loadGameProgress = function() {
    const saved = localStorage.getItem('radioactivityRunnerProgress');
    if (saved) {
        const progress = JSON.parse(saved);
        window.GameState.currentLevel = progress.level || 1;
        window.GameState.score = progress.score || 0;
        window.GameState.knowledge = progress.knowledge || { level1: 0, level2: 0, level3: 0, level4: 0, level5: 0 };
        return true;
    }
    return false;
};

// Make updateUI global so ui.js and game.js can call it
window.updateUI = function() {
    // Update start screen
    const totalScoreElement = document.getElementById('total-score');
    const knowledgeFillElement = document.getElementById('knowledge-fill');
    
    if (totalScoreElement) totalScoreElement.textContent = window.GameState.score;
    if (knowledgeFillElement) knowledgeFillElement.style.width = `${calculateKnowledgePercentage()}%`;
    
    // Update progress circles
    for (let i = 1; i <= 5; i++) {
        const progressCircle = document.getElementById(`progress-${i}`);
        if (progressCircle) {
            const knowledge = window.GameState.knowledge[`level${i}`] || 0;
            const percentage = Math.min(100, knowledge);
            progressCircle.textContent = `${percentage}%`;
            progressCircle.style.background = `conic-gradient(#00c9ff ${percentage}%, #2c5364 ${percentage}%)`;
        }
    }
    
    // Update game screen stats
    const currentScoreElement = document.getElementById('current-score');
    const currentLevelElement = document.getElementById('current-level');
    const livesElement = document.getElementById('lives');
    
    if (currentScoreElement) currentScoreElement.textContent = window.GameState.score;
    if (currentLevelElement) currentLevelElement.textContent = window.GameState.currentLevel;
    if (livesElement) livesElement.textContent = window.GameState.lives;
};

function calculateKnowledgePercentage() {
    const totalPossible = Object.keys(window.GameState.knowledge).length * 100;
    const totalEarned = Object.values(window.GameState.knowledge).reduce((a, b) => a + b, 0);
    return Math.round((totalEarned / totalPossible) * 100);
}

// Load questions when script loads
document.addEventListener('DOMContentLoaded', loadQuestions);
