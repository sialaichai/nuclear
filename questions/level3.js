const Level3Questions = {
    level: 3,
    title: "Applying (Application) - Nuclear Physics",
    questions: [
        {
            id: 1,
            question: "A radioactive isotope has a half-life of 10 minutes. Calculate its decay constant (λ).",
            options: [
                "0.0693 min⁻¹",
                "0.10 min⁻¹",
                "6.93 min⁻¹",
                "0.0011 min⁻¹"
            ],
            correctAnswer: 0,
            explanation: "Using λ = ln(2) / t½: λ = 0.693 / 10 = 0.0693 min⁻¹.",
            hint: "Remember that ln(2) is approximately 0.693.",
            points: 200,
            topic: "Decay Constant Calculation"
        },
        {
            id: 2,
            question: "A sample contains 4.0 × 10²⁰ atoms of a radioactive substance with a decay constant of 2.0 × 10⁻⁵ s⁻¹. Calculate the initial activity.",
            options: [
                "2.0 × 10¹⁵ Bq",
                "8.0 × 10¹⁵ Bq",
                "1.6 × 10¹⁶ Bq",
                "8.0 × 10²⁵ Bq"
            ],
            correctAnswer: 1,
            explanation: "Using A = λN: A = (2.0 × 10⁻⁵) × (4.0 × 10²⁰) = 8.0 × 10¹⁵ Bq.",
            hint: "Multiply the number of atoms by the probability of decay per second.",
            points: 200,
            topic: "Activity Calculation"
        },
        {
            id: 3,
            question: "Uranium-238 (Proton number 92) emits an alpha particle. What is the proton number of the resulting nucleus?",
            options: [
                "90",
                "91",
                "93",
                "94"
            ],
            correctAnswer: 0,
            explanation: "An alpha particle consists of 2 protons. By conservation of charge, the new proton number is 92 - 2 = 90.",
            hint: "Alpha decay removes 2 protons and 2 neutrons.",
            points: 200,
            topic: "Nuclear Equations"
        },
        {
            id: 4,
            question: "Carbon-14 decays into Nitrogen-14. Identify the particle emitted in this reaction.",
            options: [
                "Alpha particle",
                "Beta-minus particle",
                "Gamma ray",
                "Neutron"
            ],
            correctAnswer: 1,
            explanation: "Carbon-14 (6 protons) turns into Nitrogen-14 (7 protons). To balance charge (6 = 7 + x), x must be -1. This is a beta-minus particle (electron).",
            hint: "Check the change in proton number while mass number remains constant.",
            points: 200,
            topic: "Nuclear Equations"
        },
        {
            id: 5,
            question: "A radioactive source has an activity of 1600 Bq. If its half-life is 2 hours, what will be the activity after 6 hours?",
            options: [
                "800 Bq",
                "400 Bq",
                "200 Bq",
                "100 Bq"
            ],
            correctAnswer: 2,
            explanation: "6 hours is 3 half-lives (6/2). Activity halves 3 times: 1600 → 800 → 400 → 200 Bq.",
            hint: "Calculate how many half-lives fit into the total time.",
            points: 200,
            topic: "Half-life Application"
        },
        {
            id: 6,
            question: "Calculate the energy equivalent of a mass defect of 0.05 u. (Given: 1 u = 931.5 MeV)",
            options: [
                "4.66 MeV",
                "46.58 MeV",
                "93.15 MeV",
                "1863 MeV"
            ],
            correctAnswer: 1,
            explanation: "Energy E = mass defect × 931.5 MeV. E = 0.05 × 931.5 = 46.575 MeV.",
            hint: "Multiply the mass in atomic mass units by the conversion factor.",
            points: 200,
            topic: "Mass-Energy Equivalence"
        },
        {
            id: 7,
            question: "In the nuclear reaction: ²³⁵U + ¹n → ¹⁴¹Ba + ⁹²Kr + X. What does 'X' represent?",
            options: [
                "1 neutron",
                "2 neutrons",
                "3 neutrons",
                "1 alpha particle"
            ],
            correctAnswer: 2,
            explanation: "Balance the mass numbers (nucleons): LHS = 235 + 1 = 236. RHS = 141 + 92 + mass(X) = 233 + mass(X). Missing mass is 3. Since charge is balanced, these are 3 neutrons.",
            hint: "Sum the mass numbers on the left and right sides.",
            points: 200,
            topic: "Balancing Equations"
        },
        {
            id: 8,
            question: "A count rate meter records 450 counts/min. If the background radiation is 30 counts/min, what is the corrected count rate of the source?",
            options: [
                "480 counts/min",
                "450 counts/min",
                "420 counts/min",
                "15 counts/min"
            ],
            correctAnswer: 2,
            explanation: "Corrected Rate = Measured Rate - Background Rate. 450 - 30 = 420 counts/min.",
            hint: "Subtract the environmental noise from your reading.",
            points: 200,
            topic: "Experimental Correction"
        },
        {
            id: 9,
            question: "If a nucleus loses 2 alpha particles and 1 beta-minus particle sequentially, what is the net change in the nucleon number?",
            options: [
                "Decrease by 4",
                "Decrease by 8",
                "Decrease by 9",
                "No change"
            ],
            correctAnswer: 1,
            explanation: "Each alpha particle removes 4 nucleons. Beta decay changes a neutron to a proton but does not change nucleon number. Total change = 2 × 4 = 8.",
            hint: "Only alpha particles reduce the mass number (nucleon number).",
            points: 200,
            topic: "Decay Series"
        },
        {
            id: 10,
            question: "Calculate the mass defect if the mass of a nucleus is 3.016 u, and the sum of its constituent nucleons is 3.025 u.",
            options: [
                "0.009 u",
                "-0.009 u",
                "6.041 u",
                "1.003 u"
            ],
            correctAnswer: 0,
            explanation: "Mass Defect = (Mass of constituents) - (Mass of nucleus). 3.025 - 3.016 = 0.009 u.",
            hint: "How much mass is 'missing' when the nucleus forms?",
            points: 200,
            topic: "Mass Defect"
        },
        {
            id: 11,
            question: "A sample decays from 100% to 12.5% of its initial activity. How many half-lives have passed?",
            options: [
                "2",
                "3",
                "4",
                "5"
            ],
            correctAnswer: 1,
            explanation: "100% → 50% (1) → 25% (2) → 12.5% (3). 3 half-lives have passed.",
            hint: "Halve the initial amount repeatedly until you reach the target percentage.",
            points: 200,
            topic: "Half-life Calculation"
        },
        {
            id: 12,
            question: "Determine the fraction of a radioactive sample remaining after a time equal to 4 times its half-life.",
            options: [
                "1/4",
                "1/8",
                "1/16",
                "1/20"
            ],
            correctAnswer: 2,
            explanation: "Remaining fraction = (1/2)ⁿ where n is number of half-lives. (1/2)⁴ = 1/16.",
            hint: "Multiply 1/2 by itself four times.",
            points: 200,
            topic: "Exponential Decay"
        },
        {
            id: 13,
            question: "Given E = mc², calculate the energy released if 1.0 kg of matter is completely converted to energy (c = 3.0 × 10⁸ m/s).",
            options: [
                "3.0 × 10⁸ J",
                "9.0 × 10¹⁶ J",
                "3.0 × 10¹⁶ J",
                "9.0 × 10⁸ J"
            ],
            correctAnswer: 1,
            explanation: "E = 1.0 × (3.0 × 10⁸)² = 1.0 × 9.0 × 10¹⁶ = 9.0 × 10¹⁶ J.",
            hint: "Don't forget to square the speed of light.",
            points: 200,
            topic: "Mass-Energy Calculation"
        },
        {
            id: 14,
            question: "An isotope ²¹⁰₈₄Po decays to ²⁰⁶₈₂Pb. What particle was emitted?",
            options: [
                "Beta particle",
                "Alpha particle",
                "Neutron",
                "Proton"
            ],
            correctAnswer: 1,
            explanation: "Mass number change: 210 - 206 = 4. Proton number change: 84 - 82 = 2. A particle with mass 4 and charge +2 is an alpha particle.",
            hint: "Check the difference in mass and proton numbers.",
            points: 200,
            topic: "Identifying Radiation"
        },
        {
            id: 15,
            question: "Using the graph of N vs t, if N drops from 1000 to 370 (approx 1/e) in 5 seconds, what is the decay constant λ?",
            options: [
                "0.2 s⁻¹",
                "0.5 s⁻¹",
                "1.0 s⁻¹",
                "5.0 s⁻¹"
            ],
            correctAnswer: 0,
            explanation: "The time to drop to 1/e of the initial value is the mean lifetime τ = 1/λ. Here, τ = 5s. Therefore, λ = 1/5 = 0.2 s⁻¹.",
            hint: "Recall that at t = 1/λ, N ≈ 0.37 N₀.",
            points: 200,
            topic: "Graphical Interpretation"
        },
        {
            id: 16,
            question: "Calculate the binding energy per nucleon for a Helium-4 nucleus if its total binding energy is 28.3 MeV.",
            options: [
                "3.5 MeV",
                "7.1 MeV",
                "14.2 MeV",
                "28.3 MeV"
            ],
            correctAnswer: 1,
            explanation: "Helium-4 has 4 nucleons. Binding Energy per nucleon = Total BE / Nucleon Number = 28.3 / 4 = 7.075 ≈ 7.1 MeV.",
            hint: "Divide the total energy by the mass number (A).",
            points: 200,
            topic: "Binding Energy"
        },
        {
            id: 17,
            question: "Which equation represents the beta-minus decay of Thorium-234 (⁹⁰Th)?",
            options: [
                "²³⁴₉₀Th → ²³⁰₈₈Ra + ⁴₂He",
                "²³⁴₉₀Th → ²³⁴₉₁Pa + ⁰₋₁e",
                "²³⁴₉₀Th → ²³³₉₀Th + ¹₀n",
                "²³⁴₉₀Th → ²³⁴₈₉Ac + ⁰₊₁e"
            ],
            correctAnswer: 1,
            explanation: "Beta-minus decay results in mass number remaining the same (234) and proton number increasing by 1 (90 → 91).",
            hint: "A neutron turns into a proton and an electron.",
            points: 200,
            topic: "Writing Equations"
        },
        {
            id: 18,
            question: "A source has a half-life of 20 minutes. It is placed near a detector and gives 200 counts/s. What was the count rate 40 minutes ago?",
            options: [
                "50 counts/s",
                "100 counts/s",
                "400 counts/s",
                "800 counts/s"
            ],
            correctAnswer: 3,
            explanation: "40 minutes is 2 half-lives ago. Going backwards in time, activity doubles for each half-life. 200 × 2 × 2 = 800 counts/s.",
            hint: "Since we are looking into the past, the activity must have been higher.",
            points: 200,
            topic: "Reverse Half-life Calculation"
        },
        {
            id: 19,
            question: "Calculate the number of neutrons in the nucleus ²³⁵₉₂U.",
            options: [
                "92",
                "143",
                "235",
                "327"
            ],
            correctAnswer: 1,
            explanation: "Number of neutrons = Nucleon Number (A) - Proton Number (Z). N = 235 - 92 = 143.",
            hint: "Subtract the atomic number from the mass number.",
            points: 200,
            topic: "Atomic Structure"
        },
        {
            id: 20,
            question: "If the mass of reactants in a fusion reaction is 4.032 u and the mass of products is 4.002 u, calculate the mass converted to energy.",
            options: [
                "0.030 kg",
                "0.030 u",
                "8.034 u",
                "Zero"
            ],
            correctAnswer: 1,
            explanation: "Mass difference = Mass Reactants - Mass Products = 4.032 - 4.002 = 0.030 u.",
            hint: "Find the difference between the initial and final mass.",
            points: 200,
            topic: "Mass Difference Application"
        }
    ]
};
