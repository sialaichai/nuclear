const Level1Questions = {
    level: 1,
    title: "Remembering (Basic Recall) - Nuclear Physics",
    questions: [
        {
            id: 1,
            question: "What conclusion about the atom was drawn from the Rutherford alpha-particle scattering experiment?",
            options: [
                "The nucleus is large and negatively charged",
                "The nucleus is small, massive, and positively charged",
                "Electrons are embedded in a positive sphere",
                "Neutrons are the most massive particles"
            ],
            correctAnswer: 1,
            explanation: "The experiment showed that most of the atom is empty space with a small, massive, positively charged nucleus[cite: 10].",
            hint: "Think about why only a few alpha particles were deflected at large angles.",
            points: 100,
            topic: "The Nuclear Atom"
        },
        {
            id: 2,
            question: "What does the nucleon number (mass number) of an atom represent?",
            options: [
                "The total number of protons",
                "The total number of neutrons",
                "The total number of protons and neutrons",
                "The total number of electrons"
            ],
            correctAnswer: 2,
            explanation: "The nucleon number is the sum of protons and neutrons in the nucleus[cite: 12].",
            hint: "It accounts for all the heavy particles in the nucleus.",
            points: 100,
            topic: "Atomic Structure"
        },
        {
            id: 3,
            question: "How are isotopes of the same element defined?",
            options: [
                "Same number of neutrons, different number of protons",
                "Same number of protons, different number of neutrons",
                "Same number of electrons, different number of protons",
                "Same nucleon number, different proton number"
            ],
            correctAnswer: 1,
            explanation: "Isotopes have the same proton number (defining the element) but different neutron numbers[cite: 14].",
            hint: "They are chemically identical but have different masses.",
            points: 100,
            topic: "Isotopes"
        },
        {
            id: 4,
            question: "Which term describes the unpredictable nature of radioactive decay?",
            options: [
                "Spontaneous",
                "Random",
                "Continuous",
                "Cyclical"
            ],
            correctAnswer: 1,
            explanation: "Radioactive decay is random, meaning it is impossible to predict exactly when a specific nucleus will decay[cite: 16].",
            hint: "Think about whether you can predict the next decay event.",
            points: 100,
            topic: "Radioactive Decay"
        },
        {
            id: 5,
            question: "What experimental observation provides evidence for the random nature of radioactive decay?",
            options: [
                "Constant count rate over time",
                "Fluctuations in the count rate",
                "Linear decrease in activity",
                "Absorption by lead shielding"
            ],
            correctAnswer: 1,
            explanation: "Fluctuations in the count rate recorded by a detector demonstrate the random nature of decay[cite: 18].",
            hint: "The readings are not perfectly steady even if the average is constant.",
            points: 100,
            topic: "Radioactive Decay"
        },
        {
            id: 6,
            question: "What is the nature of an alpha particle?",
            options: [
                "A high-energy electron",
                "A helium nucleus (2 protons, 2 neutrons)",
                "Electromagnetic radiation",
                "A single proton"
            ],
            correctAnswer: 1,
            explanation: "An alpha particle is identical to a helium-4 nucleus[cite: 22, 36].",
            hint: "It is the most massive of the common radiation types.",
            points: 100,
            topic: "Radiation Properties"
        },
        {
            id: 7,
            question: "Which type of radiation consists of high-energy electromagnetic waves?",
            options: [
                "Alpha",
                "Beta",
                "Gamma",
                "Neutron"
            ],
            correctAnswer: 2,
            explanation: "Gamma radiation is a form of high-energy electromagnetic radiation[cite: 22].",
            hint: "It travels at the speed of light and has no mass.",
            points: 100,
            topic: "Radiation Properties"
        },
        {
            id: 8,
            question: "In the equation A = λN, what does 'λ' represent?",
            options: [
                "Activity",
                "Number of undecayed nuclei",
                "Half-life",
                "Decay constant"
            ],
            correctAnswer: 3,
            explanation: "λ represents the decay constant, the probability of decay per unit time[cite: 24].",
            hint: "It is the constant of proportionality between Activity and N.",
            points: 100,
            topic: "Decay Equations"
        },
        {
            id: 9,
            question: "Which mathematical function describes the decrease of radioactive nuclei over time?",
            options: [
                "Linear",
                "Quadratic",
                "Exponential",
                "Logarithmic"
            ],
            correctAnswer: 2,
            explanation: "Radioactive decay follows an exponential relationship, x = x₀e^(-λt)[cite: 26].",
            hint: "The rate of change is proportional to the current amount.",
            points: 100,
            topic: "Decay Equations"
        },
        {
            id: 10,
            question: "How is the half-life of a radioactive isotope defined?",
            options: [
                "Time for the mass to double",
                "Time for the activity to reduce to half its initial value",
                "Time for all nuclei to decay",
                "Time for the count rate to reach zero"
            ],
            correctAnswer: 1,
            explanation: "Half-life is the time taken for a quantity (like activity or number of nuclei) to reduce to half its initial value[cite: 31].",
            hint: "It measures how long it takes for 50% to decay.",
            points: 100,
            topic: "Half-life"
        },
        {
            id: 11,
            question: "Which equation correctly relates the decay constant (λ) and half-life (t½)?",
            options: [
                "λ = t½ / ln 2",
                "λ = ln 2 / t½",
                "λ = 0.5 * t½",
                "λ = t½^2"
            ],
            correctAnswer: 1,
            explanation: "The decay constant and half-life are inversely related by the natural logarithm of 2[cite: 32].",
            hint: "ln 2 is approximately 0.693.",
            points: 100,
            topic: "Half-life"
        },
        {
            id: 12,
            question: "What quantity is conserved in all nuclear reactions?",
            options: [
                "Number of atoms",
                "Nucleon number",
                "Number of neutrons",
                "Kinetic energy"
            ],
            correctAnswer: 1,
            explanation: "In nuclear processes, nucleon number, charge, and mass-energy are conserved[cite: 38].",
            hint: "The total number of protons plus neutrons remains constant.",
            points: 100,
            topic: "Conservation Laws"
        },
        {
            id: 13,
            question: "The existence of which particle was predicted to conserve energy and momentum in beta decay?",
            options: [
                "Neutron",
                "Alpha particle",
                "Neutrino (or antineutrino)",
                "Photon"
            ],
            correctAnswer: 2,
            explanation: "The neutrino (or antineutrino) was predicted to account for the 'missing' energy and momentum in beta decay[cite: 39].",
            hint: "It is a nearly massless, neutral particle.",
            points: 100,
            topic: "Beta Decay"
        },
        {
            id: 14,
            question: "What is 'mass defect'?",
            options: [
                "The mass lost during chemical reactions",
                "The difference between the mass of a nucleus and its constituent nucleons",
                "The mass of the electrons in an atom",
                "The difference in mass between isotopes"
            ],
            correctAnswer: 1,
            explanation: "Mass defect is the difference between the sum of the masses of individual nucleons and the actual mass of the nucleus[cite: 40].",
            hint: "The whole is less than the sum of its parts.",
            points: 100,
            topic: "Mass Defect"
        },
        {
            id: 15,
            question: "Which equation relates energy (E) and mass (m) in nuclear physics?",
            options: [
                "E = 1/2 mv²",
                "E = mgh",
                "E = mc²",
                "E = F/m"
            ],
            correctAnswer: 2,
            explanation: "Einstein's mass-energy equivalence equation is E = mc²[cite: 43].",
            hint: "This equation explains the energy released in nuclear reactions.",
            points: 100,
            topic: "Mass-Energy"
        },
        {
            id: 16,
            question: "What does Nuclear Binding Energy represent?",
            options: [
                "Energy required to add an electron to an atom",
                "Energy released when a nucleus breaks apart spontaneously",
                "Energy required to completely separate a nucleus into its constituent nucleons",
                "Energy of the electrons in orbit"
            ],
            correctAnswer: 2,
            explanation: "Binding energy is the energy needed to separate a nucleus into its individual protons and neutrons[cite: 44].",
            hint: "It corresponds to the mass defect.",
            points: 100,
            topic: "Binding Energy"
        },
        {
            id: 17,
            question: "In the graph of binding energy per nucleon, which region represents the most stable nuclei?",
            options: [
                "Very light nuclei (e.g., Hydrogen)",
                "The peak region (around Iron-56)",
                "Very heavy nuclei (e.g., Uranium)",
                "The stability is constant for all"
            ],
            correctAnswer: 1,
            explanation: "The curve peaks around nucleon number 56 (Iron), indicating the most stable nuclei[cite: 45].",
            hint: "Fusion and fission both move nuclei towards this maximum stability.",
            points: 100,
            topic: "Stability Curve"
        },
        {
            id: 18,
            question: "What is nuclear fusion?",
            options: [
                "Splitting a heavy nucleus into lighter ones",
                "Joining two light nuclei to form a heavier one",
                "Emission of an alpha particle",
                "An electron colliding with a positron"
            ],
            correctAnswer: 1,
            explanation: "Fusion is the process where light nuclei combine to form a heavier nucleus, releasing energy[cite: 46].",
            hint: "This is the process that powers the sun.",
            points: 100,
            topic: "Nuclear Processes"
        },
        {
            id: 19,
            question: "What is nuclear fission?",
            options: [
                "Splitting a heavy nucleus into two lighter nuclei",
                "Combining protons to form helium",
                "The decay of a neutron into a proton",
                "Ionization of an atom"
            ],
            correctAnswer: 0,
            explanation: "Fission involves a heavy nucleus splitting into lighter nuclei, often releasing neutrons and energy[cite: 46].",
            hint: "This process is used in nuclear power plants.",
            points: 100,
            topic: "Nuclear Processes"
        },
        {
            id: 20,
            question: "Which of the following refers to radiation from natural sources like rocks and cosmic rays?",
            options: [
                "Contamination",
                "Background radiation",
                "Activation",
                "Fallout"
            ],
            correctAnswer: 1,
            explanation: "Background radiation originates from natural sources in the environment and space[cite: 20].",
            hint: "It is always present around us.",
            points: 100,
            topic: "Background Radiation"
        }
    ]
};
