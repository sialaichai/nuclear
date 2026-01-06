// Radioactivity Questions Database (No backend needed)
const QuestionBank = {
    // Level 1: Remembering (Basic recall)
    level1: [
        {
            id: 1,
            question: "What is the composition of an alpha particle?",
            options: [
                "Two protons and two neutrons",
                "One proton and one neutron",
                "One electron",
                "High-energy photon"
            ],
            correctAnswer: 0,
            explanation: "Alpha particles consist of 2 protons and 2 neutrons, identical to a helium nucleus.",
            hint: "Think about what makes up a helium atom's nucleus.",
            bloomLevel: 1,
            points: 100,
            topic: "Alpha Decay"
        },
        {
            id: 2,
            question: "Which type of radiation has the greatest penetrating power?",
            options: [
                "Alpha radiation",
                "Beta radiation",
                "Gamma radiation",
                "All have equal penetrating power"
            ],
            correctAnswer: 2,
            explanation: "Gamma radiation has the greatest penetrating power as it's electromagnetic radiation, not particles.",
            hint: "Consider which radiation requires thick lead or concrete to stop.",
            bloomLevel: 1,
            points: 100,
            topic: "Radiation Properties"
        },
        {
            id: 3,
            question: "What is the charge of a beta particle?",
            options: [
                "Positive",
                "Negative",
                "Neutral",
                "Variable"
            ],
            correctAnswer: 1,
            explanation: "Beta particles are high-energy electrons with a negative charge.",
            hint: "Beta particles come from neutron decay into proton plus electron.",
            bloomLevel: 1,
            points: 100,
            topic: "Beta Decay"
        },
        {
            id: 4,
            question: "Which element is commonly used in carbon dating?",
            options: [
                "Carbon-12",
                "Carbon-13",
                "Carbon-14",
                "Carbon-15"
            ],
            correctAnswer: 2,
            explanation: "Carbon-14 is radioactive and used in carbon dating due to its known half-life of 5730 years.",
            hint: "Look for the isotope with a half-life suitable for archaeological dating.",
            bloomLevel: 1,
            points: 100,
            topic: "Radioactive Dating"
        },
        {
            id: 5,
            question: "What happens during radioactive decay?",
            options: [
                "An unstable nucleus becomes stable",
                "A stable nucleus becomes unstable",
                "Energy is absorbed by the nucleus",
                "Electrons move to higher energy levels"
            ],
            correctAnswer: 0,
            explanation: "Radioactive decay occurs when an unstable nucleus emits radiation to become more stable.",
            hint: "Think about why atoms decay - they seek stability.",
            bloomLevel: 1,
            points: 100,
            topic: "Decay Process"
        }
    ],
    
    // Level 2: Understanding (Comprehension)
    level2: [
        {
            id: 6,
            question: "Explain why gamma radiation often accompanies alpha or beta decay:",
            options: [
                "Gamma rays carry away excess energy from the excited nucleus",
                "Gamma rays convert alpha to beta particles",
                "Gamma radiation causes the initial decay",
                "Gamma rays are produced when electrons change shells"
            ],
            correctAnswer: 0,
            explanation: "After alpha or beta decay, the daughter nucleus is often in an excited state. Gamma emission releases this excess energy.",
            hint: "What happens to the nucleus after it emits particles?",
            bloomLevel: 2,
            points: 150,
            topic: "Gamma Emission"
        },
        {
            id: 7,
            question: "In your own words, what does 'half-life' mean in radioactivity?",
            options: [
                "Time for half the radioactive atoms to decay",
                "Time for radiation intensity to reduce by half",
                "Time for all radioactive atoms to decay",
                "Time for radiation to travel half a meter"
            ],
            correctAnswer: 0,
            explanation: "Half-life is the time required for half of the radioactive atoms in a sample to undergo decay.",
            hint: "Think about what 'half' refers to in this context.",
            bloomLevel: 2,
            points: 150,
            topic: "Half-life Concept"
        },
        {
            id: 8,
            question: "Interpret this decay chain: Uranium-238 → Thorium-234 → Protactinium-234 → Uranium-234",
            options: [
                "Alpha decay followed by two beta decays",
                "Three alpha decays",
                "Three beta decays",
                "Gamma decay only"
            ],
            correctAnswer: 0,
            explanation: "U-238 decays by alpha to Th-234, which beta decays to Pa-234, which beta decays to U-234.",
            hint: "Look at how atomic and mass numbers change in each step.",
            bloomLevel: 2,
            points: 150,
            topic: "Decay Chains"
        },
        {
            id: 9,
            question: "Why can't alpha particles penetrate skin but are dangerous if ingested?",
            options: [
                "They can't penetrate skin but cause intense ionization internally",
                "They change to gamma radiation inside the body",
                "Skin reflects them but organs absorb them",
                "They combine with beta particles internally"
            ],
            correctAnswer: 0,
            explanation: "Alpha particles have high ionization power but low penetration. Inside the body, they damage cells directly.",
            hint: "Consider ionization vs penetration properties.",
            bloomLevel: 2,
            points: 150,
            topic: "Radiation Safety"
        },
        {
            id: 10,
            question: "What is the main difference between fission and radioactive decay?",
            options: [
                "Fission splits nuclei; decay involves spontaneous emission",
                "Decay splits nuclei; fission involves emission",
                "Both are identical processes",
                "Fission only occurs in stars"
            ],
            correctAnswer: 0,
            explanation: "Fission is the splitting of heavy nuclei, often induced. Radioactive decay is spontaneous emission from unstable nuclei.",
            hint: "Think about what happens to the nucleus in each process.",
            bloomLevel: 2,
            points: 150,
            topic: "Nuclear Processes"
        }
    ],
    
    // Level 3: Applying (Application)
    level3: [
        {
            id: 11,
            question: "A sample has initial mass 80g and half-life of 10 days. What mass remains after 30 days?",
            options: [
                "10g",
                "20g",
                "40g",
                "60g"
            ],
            correctAnswer: 0,
            explanation: "30 days = 3 half-lives (30/10). After 1st: 40g, 2nd: 20g, 3rd: 10g.",
            hint: "Calculate how many half-lives have passed, then halve the mass that many times.",
            bloomLevel: 3,
            points: 200,
            topic: "Half-life Calculation"
        },
        {
            id: 12,
            question: "If 25% of a radioactive sample remains after 60 years, what is its half-life?",
            options: [
                "20 years",
                "30 years",
                "40 years",
                "50 years"
            ],
            correctAnswer: 1,
            explanation: "25% remaining = 2 half-lives (100% → 50% → 25%). 60 years / 2 = 30 years per half-life.",
            hint: "Determine how many half-lives to go from 100% to 25%.",
            bloomLevel: 3,
            points: 200,
            topic: "Half-life from Percentage"
        },
        {
            id: 13,
            question: "Calculate decay constant if half-life is 5.27 years.",
            options: [
                "0.1315 year⁻¹",
                "0.263 year⁻¹",
                "0.5 year⁻¹",
                "1.0 year⁻¹"
            ],
            correctAnswer: 0,
            explanation: "λ = ln(2) / t½ = 0.693 / 5.27 = 0.1315 year⁻¹",
            hint: "Use the formula λ = ln(2) / half-life.",
            bloomLevel: 3,
            points: 200,
            topic: "Decay Constant"
        },
        {
            id: 14,
            question: "Apply the decay law: Initial 400 atoms, decay constant 0.05 s⁻¹. How many remain after 20 seconds?",
            options: [
                "147 atoms",
                "200 atoms",
                "300 atoms",
                "354 atoms"
            ],
            correctAnswer: 0,
            explanation: "N = N₀e^(-λt) = 400 × e^(-0.05×20) = 400 × e^(-1) = 400 × 0.3679 ≈ 147",
            hint: "Use the exponential decay formula N = N₀e^(-λt).",
            bloomLevel: 3,
            points: 200,
            topic: "Exponential Decay"
        },
        {
            id: 15,
            question: "A Geiger counter reads 800 counts/min. After 2 hours, it reads 100 counts/min. What's the half-life?",
            options: [
                "30 minutes",
                "40 minutes",
                "60 minutes",
                "90 minutes"
            ],
            correctAnswer: 2,
            explanation: "800 → 400 → 200 → 100 = 3 half-lives. 120 minutes / 3 = 40 minutes per half-life.",
            hint: "Count how many times activity halves from 800 to 100.",
            bloomLevel: 3,
            points: 200,
            topic: "Activity Calculation"
        }
    ],
    
    // Level 4: Analyzing (Analysis)
    level4: [
        {
            id: 16,
            question: "Analyze this data: Isotope A: Half-life 10s, emits alpha. Isotope B: Half-life 1000y, emits beta. Which is more dangerous as environmental contamination?",
            options: [
                "Isotope B - persists longer in environment",
                "Isotope A - more radiation emitted",
                "Both equally dangerous",
                "Neither is dangerous"
            ],
            correctAnswer: 0,
            explanation: "Isotope B with long half-life persists in environment, causing long-term contamination despite lower activity.",
            hint: "Consider both radiation type and environmental persistence.",
            bloomLevel: 4,
            points: 250,
            topic: "Environmental Analysis"
        },
        {
            id: 17,
            question: "Compare penetration: Why does gamma need thick lead while alpha is stopped by paper?",
            options: [
                "Gamma has no charge and high energy; alpha has charge and mass",
                "Alpha is faster than gamma",
                "Lead attracts gamma rays",
                "Paper has special alpha-blocking properties"
            ],
            correctAnswer: 0,
            explanation: "Gamma photons have no charge and high energy, penetrating deeply. Alpha particles are heavy and charged, losing energy quickly.",
            hint: "Think about particle properties affecting interaction with matter.",
            bloomLevel: 4,
            points: 250,
            topic: "Penetration Comparison"
        },
        {
            id: 18,
            question: "Analyze this graph: Activity vs Time shows exponential decay. What does the slope represent?",
            options: [
                "Decay constant",
                "Half-life",
                "Initial activity",
                "Total number of atoms"
            ],
            correctAnswer: 0,
            explanation: "On semi-log plot of activity vs time, slope = -λ (decay constant). Half-life is derived from λ.",
            hint: "Remember the exponential decay equation in logarithmic form.",
            bloomLevel: 4,
            points: 250,
            topic: "Graph Analysis"
        },
        {
            id: 19,
            question: "Why does Carbon-14 dating work for archaeology but not geology?",
            options: [
                "C-14 half-life too short for geological timescales",
                "Geological samples have no carbon",
                "C-14 doesn't form in rocks",
                "Geological dating uses different principles"
            ],
            correctAnswer: 0,
            explanation: "C-14 half-life (5730 years) is suitable for up to ~50,000 years. Geological samples are millions of years old, requiring longer-lived isotopes.",
            hint: "Compare archaeological vs geological timescales.",
            bloomLevel: 4,
            points: 250,
            topic: "Dating Methods Analysis"
        },
        {
            id: 20,
            question: "Analyze radiation therapy: Why use gamma over alpha for cancer treatment?",
            options: [
                "Gamma penetrates to tumors; alpha damages surface only",
                "Alpha is too expensive",
                "Gamma doesn't kill cells",
                "Alpha causes immediate death"
            ],
            correctAnswer: 0,
            explanation: "Gamma penetrates to deep tumors. Alpha would damage healthy surface tissues before reaching tumors.",
            hint: "Consider penetration depth needed for internal tumors.",
            bloomLevel: 4,
            points: 250,
            topic: "Medical Applications"
        }
    ],
    
    // Level 5: Evaluating (Evaluation)
    level5: [
        {
            id: 21,
            question: "Evaluate this safety protocol: 'Store all radioactive sources together.'",
            options: [
                "Poor - increases risk and makes monitoring difficult",
                "Excellent - saves space",
                "Good - easier to shield",
                "Acceptable for low-level sources"
            ],
            correctAnswer: 0,
            explanation: "Sources should be separated by type/activity to prevent interaction, simplify monitoring, and limit exposure if accident occurs.",
            hint: "Consider what happens if one source leaks or is mishandled.",
            bloomLevel: 5,
            points: 300,
            topic: "Safety Evaluation"
        },
        {
            id: 22,
            question: "Design an experiment to measure half-life of a short-lived isotope.",
            options: [
                "Measure activity at regular intervals and plot decay curve",
                "Measure once and calculate",
                "Compare with known isotopes",
                "Use theoretical values only"
            ],
            correctAnswer: 0,
            explanation: "For experimental determination, measure activity vs time, plot graph, determine time for activity to halve.",
            hint: "Think about what data you need to determine half-life empirically.",
            bloomLevel: 5,
            points: 300,
            topic: "Experimental Design"
        },
        {
            id: 23,
            question: "Evaluate: Using radioactive tracers in medical diagnostics.",
            options: [
                "Beneficial when benefits outweigh radiation risks",
                "Always dangerous and should be banned",
                "Completely safe with no risks",
                "Only useful for research"
            ],
            correctAnswer: 0,
            explanation: "Tracers provide valuable diagnostic information. Risk-benefit analysis must consider dose, alternative methods, and medical necessity.",
            hint: "Consider both medical benefits and radiation risks.",
            bloomLevel: 5,
            points: 300,
            topic: "Medical Ethics"
        },
        {
            id: 24,
            question: "Propose best shielding for a neutron source.",
            options: [
                "Water or paraffin to slow neutrons, then boron to absorb",
                "Thick lead only",
                "Aluminum sheets",
                "Paper and plastic"
            ],
            correctAnswer: 0,
            explanation: "Neutrons are best shielded by materials that slow them (moderators) then capture them (boron, cadmium). Lead alone is ineffective.",
            hint: "Neutrons are neutral particles - think about how they interact.",
            bloomLevel: 5,
            points: 300,
            topic: "Shielding Design"
        },
        {
            id: 25,
            question: "Assess this statement: 'Nuclear power is too dangerous because of radioactivity.'",
            options: [
                "Incomplete - must compare risks/benefits with alternatives",
                "Absolutely correct",
                "Wrong - no risks at all",
                "Only true for old reactors"
            ],
            correctAnswer: 0,
            explanation: "Requires comparative risk assessment: nuclear vs fossil fuels (pollution, climate) vs renewables (intermittency, land use).",
            hint: "Consider the full context of energy production options.",
            bloomLevel: 5,
            points: 300,
            topic: "Energy Policy Evaluation"
        }
    ]
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
