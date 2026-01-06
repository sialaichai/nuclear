const Level2Questions = {
    level: 2,
    title: "Understanding (Comprehension) - Nuclear Physics",
    questions: [
        {
            id: 1,
            question: "Why did the majority of alpha particles pass straight through the gold foil in Rutherford's experiment?",
            options: [
                "The alpha particles were neutral and didn't interact",
                "The atom is mostly empty space",
                "The electrons shielded the nucleus",
                "The gold atoms were moving out of the way"
            ],
            correctAnswer: 1,
            explanation: "Since very few particles were deflected, it implies that the massive, charged part of the atom (nucleus) occupies a very small volume, leaving most of the atom as empty space.",
            hint: "Think about the relative size of the nucleus versus the whole atom.",
            points: 150,
            topic: "Rutherford Scattering"
        },
        {
            id: 2,
            question: "Explain why isotopes of the same element have identical chemical properties.",
            options: [
                "They have the same number of neutrons",
                "They have the same nucleon number",
                "They have the same electron configuration",
                "They have the same nuclear mass"
            ],
            correctAnswer: 2,
            explanation: "Chemical properties are determined by the electron configuration (specifically valence electrons). Since isotopes have the same proton number, they have the same number of electrons.",
            hint: "Chemical reactions involve electrons, not the nucleus.",
            points: 150,
            topic: "Isotopes"
        },
        {
            id: 3,
            question: "What does it mean to say radioactive decay is 'spontaneous'?",
            options: [
                "It happens very quickly",
                "It is unaffected by external factors like temperature or pressure",
                "It releases a large amount of energy",
                "The decay happens at regular, predictable intervals"
            ],
            correctAnswer: 1,
            explanation: "Spontaneous means the rate of decay cannot be influenced by environmental factors such as chemical bonding, temperature, or pressure.",
            hint: "Can you speed up decay by heating the sample?",
            points: 150,
            topic: "Nature of Decay"
        },
        {
            id: 4,
            question: "Why is the energy spectrum of beta particles continuous?",
            options: [
                "Beta particles lose energy colliding with electrons",
                "The energy is shared variably between the beta particle and a neutrino",
                "The daughter nucleus absorbs some energy",
                "Beta particles are emitted at different speeds due to temperature"
            ],
            correctAnswer: 1,
            explanation: "In beta decay, the total released energy is shared between the beta particle and an antineutrino (or neutrino). Since this sharing is random, the beta particle can have a range of energies.",
            hint: "Consider the third particle produced in beta decay.",
            points: 150,
            topic: "Beta Decay Spectrum"
        },
        {
            id: 5,
            question: "Why do alpha particles cause more ionization than beta particles?",
            options: [
                "They move much faster than beta particles",
                "They have a larger mass and double charge (+2e)",
                "They are smaller and can get closer to electrons",
                "They are neutral and interact easily"
            ],
            correctAnswer: 1,
            explanation: "Alpha particles have a +2e charge and large mass, causing strong electrostatic interactions with electrons in nearby atoms, leading to high ionization density.",
            hint: "Compare the charge and mass of alpha vs beta.",
            points: 150,
            topic: "Ionization"
        },
        {
            id: 6,
            question: "In a magnetic field, why is the path of a beta particle curved much more than an alpha particle?",
            options: [
                "Beta particles have a much smaller mass (higher specific charge)",
                "Beta particles have a larger charge",
                "Alpha particles are neutral",
                "Magnetic fields only affect negative charges"
            ],
            correctAnswer: 0,
            explanation: "Deflection depends on charge-to-mass ratio (q/m). An electron (beta) has a much smaller mass than an alpha particle, so its acceleration and curvature are much greater.",
            hint: "Think about F=ma; a lighter particle accelerates more for a similar force.",
            points: 150,
            topic: "Deflection in Fields"
        },
        {
            id: 7,
            question: "Why does the activity of a radioactive source decrease over time?",
            options: [
                "The decay constant decreases",
                "The number of undecayed nuclei decreases",
                "The radiation becomes weaker",
                "Background radiation interferes"
            ],
            correctAnswer: 1,
            explanation: "Activity is defined as A = λN. Since the number of parent nuclei (N) drops as they decay, the rate of decay (Activity) also drops proportionally.",
            hint: "Activity depends on how many atoms are left to decay.",
            points: 150,
            topic: "Activity"
        },
        {
            id: 8,
            question: "Explain the relationship between half-life and the decay constant.",
            options: [
                "They are directly proportional",
                "They are inversely proportional",
                "They are unrelated",
                "Their product is always 1"
            ],
            correctAnswer: 1,
            explanation: "A larger decay constant (λ) means a higher probability of decay per second, which results in the sample disappearing faster (shorter half-life). Equation: λ = ln(2) / t½.",
            hint: "Does a high probability of decay mean a long or short life?",
            points: 150,
            topic: "Half-life"
        },
        {
            id: 9,
            question: "Why is an alpha source considered safe outside the body but dangerous if ingested?",
            options: [
                "It turns into gamma radiation inside the body",
                "Skin blocks alpha particles, but internal organs have no shield against the high ionization",
                "Alpha particles become radioactive inside the body",
                "The body's heat increases the alpha activity"
            ],
            correctAnswer: 1,
            explanation: "Alpha radiation has low penetration (stopped by skin) but very high ionizing power. Inside the body, it can directly damage DNA in sensitive tissues.",
            hint: "Consider penetration vs ionization.",
            points: 150,
            topic: "Radiation Hazards"
        },
        {
            id: 10,
            question: "What physical quantity does the 'Binding Energy per Nucleon' curve represent?",
            options: [
                "The mass of the nucleus",
                "The stability of the nucleus",
                "The number of neutrons",
                "The amount of radiation emitted"
            ],
            correctAnswer: 1,
            explanation: "The higher the binding energy per nucleon, the more tightly the nucleus is held together, meaning it is more stable.",
            hint: "Why is Iron-56 at the peak of this curve?",
            points: 150,
            topic: "Stability Curve"
        },
        {
            id: 11,
            question: "Why is high temperature required for nuclear fusion to occur?",
            options: [
                "To melt the nuclei",
                "To give nuclei enough kinetic energy to overcome electrostatic repulsion",
                "To strip the electrons off the atoms",
                "To increase the binding energy"
            ],
            correctAnswer: 1,
            explanation: "Nuclei are positively charged and repel each other. High temperature provides high kinetic energy to overcome this Coulomb repulsion so the strong force can act.",
            hint: "What force prevents two positive charges from touching?",
            points: 150,
            topic: "Nuclear Fusion"
        },
        {
            id: 12,
            question: "Explain why energy is released during nuclear fission of Uranium-235.",
            options: [
                "The daughter nuclei have a higher binding energy per nucleon than Uranium",
                "Neutrons are consumed in the process",
                "The total mass increases",
                "Electrons are annihilated"
            ],
            correctAnswer: 0,
            explanation: "The products of fission are closer to the peak of the stability curve (Iron). They are more stable (higher BE/nucleon), meaning mass is lost and released as energy.",
            hint: "Compare the stability of the starting nucleus vs the products.",
            points: 150,
            topic: "Fission Energy"
        },
        {
            id: 13,
            question: "Why does the mass of a nucleus differ from the sum of the masses of its protons and neutrons?",
            options: [
                "Neutrons have no mass in the nucleus",
                "Mass is lost to electrons orbiting the nucleus",
                "Mass is converted into binding energy to hold the nucleus together",
                "Measurement errors occur at small scales"
            ],
            correctAnswer: 2,
            explanation: "This is the mass defect. The 'missing' mass corresponds to the energy released when the nucleus formed (Binding Energy), via E=mc².",
            hint: "Where does the binding energy come from?",
            points: 150,
            topic: "Mass Defect"
        },
        {
            id: 14,
            question: "What is the significance of the background count rate in a radioactive experiment?",
            options: [
                "It proves the detector is working",
                "It must be subtracted from the measured rate to find the source's true activity",
                "It is added to the source activity to get the total",
                "It is negligible and can be ignored"
            ],
            correctAnswer: 1,
            explanation: "Background radiation is always present. To accurately measure a specific source, you must remove the 'noise' caused by background sources.",
            hint: "If you weigh a liquid in a beaker, do you include the beaker's weight?",
            points: 150,
            topic: "Experimental Technique"
        },
        {
            id: 15,
            question: "Why are gamma rays not deflected by electric or magnetic fields?",
            options: [
                "They travel at the speed of light",
                "They have no mass and no charge",
                "They have too much energy",
                "They pass through the fields too quickly"
            ],
            correctAnswer: 1,
            explanation: "Electric and magnetic fields exert forces on charged particles ($F=Eq$ or $F=qvB$). Gamma rays are photons (neutral), so they feel no force.",
            hint: "What property is required for interaction with electromagnetic fields?",
            points: 150,
            topic: "Properties of Radiation"
        },
        {
            id: 16,
            question: "In the equation x = x₀e^(-λt), why is the exponential function used?",
            options: [
                "Radioactivity increases over time",
                "The rate of change is proportional to the current value",
                "It represents a linear decrease",
                "It accounts for experimental error"
            ],
            correctAnswer: 1,
            explanation: "This is a characteristic of random decay where the number of particles decaying per second is a fixed percentage of the particles remaining.",
            hint: "Constant probability leads to this type of curve.",
            points: 150,
            topic: "Exponential Decay"
        },
        {
            id: 17,
            question: "Why are neutrons effective at initiating nuclear fission?",
            options: [
                "They are neutral and not repelled by the nucleus",
                "They are negatively charged and attracted to the nucleus",
                "They move at the speed of light",
                "They are very heavy compared to protons"
            ],
            correctAnswer: 0,
            explanation: "Since neutrons have no charge, they do not experience Coulomb repulsion from the positive nucleus and can easily penetrate it to cause instability.",
            hint: "Why would a proton have trouble hitting a nucleus?",
            points: 150,
            topic: "Fission Mechanism"
        },
        {
            id: 18,
            question: "If a sample contains two isotopes, one with a half-life of 1 hour and one with 1 year, how will the activity change initially?",
            options: [
                "It will remain constant",
                "It will drop rapidly as the short-lived isotope decays, then level off",
                "It will drop slowly then speed up",
                "Both will decay at the same average rate"
            ],
            correctAnswer: 1,
            explanation: "The short half-life isotope has a much higher decay constant (activity). It dominates the initial activity and decays away quickly, leaving the slower-decaying isotope.",
            hint: "Which isotope contributes most to the initial count rate?",
            points: 150,
            topic: "Decay Analysis"
        },
        {
            id: 19,
            question: "In beta-minus decay, a neutron turns into a proton. Why does the nucleon number remain the same?",
            options: [
                "The proton has zero mass",
                "The electron carries away the mass",
                "Protons and neutrons are both nucleons",
                "Mass is not conserved in beta decay"
            ],
            correctAnswer: 2,
            explanation: "Nucleon number is the count of (Protons + Neutrons). If one neutron (-1) becomes one proton (+1), the total count remains unchanged.",
            hint: "Count the total particles in the nucleus before and after.",
            points: 150,
            topic: "Conservation Laws"
        },
        {
            id: 20,
            question: "Why is the binding energy per nucleon low for very light elements like Hydrogen-2?",
            options: [
                "They have too many neutrons",
                "The strong nuclear force is not yet fully saturated/efficient with few neighbors",
                "They are radioactive",
                "They have high electrostatic repulsion"
            ],
            correctAnswer: 1,
            explanation: "In very small nuclei, each nucleon has few neighbors to interact with via the strong nuclear force, leading to lower stability compared to medium-sized nuclei.",
            hint: "Think about surface area vs volume effects in small drops.",
            points: 150,
            topic: "Binding Energy Curve"
        }
    ]
};
