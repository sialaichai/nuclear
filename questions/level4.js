const Level4Questions = {
    level: 4,
    title: "Analyzing (Analysis)",
    questions: [
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
            points: 250,
            topic: "Medical Applications"
        }
    ]
};
