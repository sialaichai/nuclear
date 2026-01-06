const Level5Questions = {
    level: 5,
    title: "Evaluating (Evaluation)",
    questions: [
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
            points: 300,
            topic: "Energy Policy Evaluation"
        }
    ]
};
