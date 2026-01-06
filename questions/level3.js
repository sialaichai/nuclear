const Level3Questions = {
    level: 3,
    title: "Applying (Application)",
    questions: [
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
            points: 200,
            topic: "Activity Calculation"
        }
    ]
};
