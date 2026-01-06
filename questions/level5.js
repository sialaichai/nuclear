const Level5Questions = {
    level: 5,
    title: "Evaluating (Evaluation) - Nuclear Physics",
    questions: [
        {
            id: 1,
            question: "A geologist proposes using Carbon-14 dating to determine the age of a granite rock formation estimated to be 100 million years old. Evaluate the validity of this proposal.",
            options: [
                "Valid: Carbon-14 is found in all rocks and is accurate for long timescales",
                "Valid: The half-life of Carbon-14 is long enough for geological dating",
                "Invalid: Granite is not organic, and the half-life of C-14 is too short (5730 years) for this timescale",
                "Invalid: Carbon-14 only works on liquid samples"
            ],
            correctAnswer: 2,
            explanation: "Carbon-14 dating is limited to organic matter and ages up to ~50,000 years (about 10 half-lives). For millions of years, isotopes like Uranium-238 are required.",
            hint: "Consider the half-life of C-14 compared to the age of the rock.",
            points: 300,
            topic: "Dating Methods"
        },
        {
            id: 2,
            question: "Evaluate the choice of Technetium-99m (Half-life = 6 hours, Gamma emitter) for use as a medical tracer for internal organ imaging.",
            options: [
                "Poor choice: The half-life is too short to conduct the scan",
                "Excellent choice: Short half-life minimizes patient dose, and gamma rays penetrate the body to be detected outside",
                "Poor choice: Gamma radiation is too dangerous; an alpha emitter should be used",
                "Excellent choice: It remains in the body permanently to prevent future illness"
            ],
            correctAnswer: 1,
            explanation: "The ideal tracer emits radiation that escapes the body (gamma) and decays quickly enough to limit radiation dose to the patient, but slowly enough to complete the scan.",
            hint: "Balance the need for detection against patient safety.",
            points: 300,
            topic: "Medical Applications"
        },
        {
            id: 3,
            question: "A student suggests using a 5 cm lead shield to protect against a high-flux Neutron source. Critically assess this shielding plan.",
            options: [
                "Effective: Lead is dense and stops all radiation types",
                "Effective: Neutrons are charged and will be repelled by the lead nuclei",
                "Ineffective: Neutrons are neutral and pass through lead; a hydrogen-rich moderator (like water) is needed first",
                "Ineffective: Lead will become radioactive instantly and explode"
            ],
            correctAnswer: 2,
            explanation: "Heavy nuclei like lead do not slow down neutrons effectively (think ping-pong ball hitting a bowling ball). Hydrogen-rich materials (water/paraffin) are needed to thermalize neutrons before absorption.",
            hint: "How do neutral particles interact with matter compared to charged ones?",
            points: 300,
            topic: "Shielding Design"
        },
        {
            id: 4,
            question: "In an experiment to measure background radiation, a student records the count rate for 10 seconds and subtracts this from the source reading. Evaluate the reliability of this method.",
            options: [
                "Highly reliable: 10 seconds is standard for all measurements",
                "Unreliable: Random fluctuations in background radiation require a much longer sampling time to establish a valid average",
                "Reliable: Background radiation is constant and never changes",
                "Unreliable: The student should not subtract background radiation at all"
            ],
            correctAnswer: 1,
            explanation: "Because radioactive decay is random, short sampling times lead to large percentage uncertainties. Background should be measured for a long period (e.g., 10-20 mins) to get a statistically significant average.",
            hint: "Can you trust a 10-second snapshot of a random process?",
            points: 300,
            topic: "Experimental Evaluation"
        },
        {
            id: 5,
            question: "Assess the claim: 'Nuclear Fusion is a better long-term energy source than Nuclear Fission.' Which argument best supports this claim?",
            options: [
                "Fusion produces more radioactive waste per kilogram of fuel",
                "Fusion fuel (hydrogen isotopes) is abundant and the process carries no risk of runaway chain reactions (meltdown)",
                "Fusion technology is currently cheaper and easier to build than fission",
                "Fusion works at room temperature, making it safer"
            ],
            correctAnswer: 1,
            explanation: "Fusion offers high energy yield with abundant fuel (seawater) and produces very little long-lived radioactive waste compared to fission. It also cannot melt down.",
            hint: "Consider fuel availability and safety profiles.",
            points: 300,
            topic: "Fusion vs Fission"
        },
        {
            id: 6,
            question: "A manufacturing plant uses an Alpha source to control the thickness of aluminum sheets (approx 2mm thick). Judge the suitability of this source.",
            options: [
                "Suitable: Alpha particles are stopped by thin materials, so they are sensitive to thickness changes",
                "Unsuitable: Alpha particles will be completely stopped by the aluminum regardless of small thickness variations",
                "Suitable: Alpha particles will induce radioactivity in the aluminum",
                "Unsuitable: Alpha sources are too expensive for industrial use"
            ],
            correctAnswer: 1,
            explanation: "Alpha particles are stopped by a sheet of paper or a few cm of air. They cannot penetrate 2mm of aluminum, so the detector would read zero regardless of thickness. A Beta or Gamma source is required.",
            hint: "What is the penetrating power of Alpha radiation?",
            points: 300,
            topic: "Industrial Applications"
        },
        {
            id: 7,
            question: "Evaluate the statement: 'Mass is conserved in nuclear reactions.'",
            options: [
                "True: The number of protons and neutrons remains the same",
                "True: Matter cannot be created or destroyed",
                "False: Mass is converted to energy (or vice versa), so only Mass-Energy is conserved",
                "False: Mass is lost to the electrons orbiting the nucleus"
            ],
            correctAnswer: 2,
            explanation: "In nuclear reactions, measurable mass is lost (mass defect) and converted into energy according to E=mc². Thus, strictly speaking, mass alone is not conserved.",
            hint: "Think about Einstein's equation.",
            points: 300,
            topic: "Conservation Laws"
        },
        {
            id: 8,
            question: "Critique the use of Americium-241 (an Alpha emitter with a 432-year half-life) in household smoke detectors.",
            options: [
                "Unsafe: The long half-life causes dangerous radiation levels in the home",
                "Appropriate: Alpha particles ionize air well to detect smoke, and the casing stops radiation from escaping",
                "Unsafe: Beta particles would be safer and more effective",
                "Appropriate: The long half-life means it generates heat to burn the smoke"
            ],
            correctAnswer: 1,
            explanation: "Alpha particles are necessary to create the ionization current that smoke interrupts. The low penetrating power means they are safely contained within the device, and the long half-life ensures the device lasts for years.",
            hint: "Why do we want high ionization but low penetration here?",
            points: 300,
            topic: "Household Applications"
        },
        {
            id: 9,
            question: "A student observes that a radioactive count rate is constant (e.g., 100, 100, 100 cps) over three measurements. Evaluate what this implies.",
            options: [
                "The source is decaying perfectly according to theory",
                "The measurement equipment is likely faulty or 'saturated', as random fluctuations are expected",
                "The half-life is exactly equal to the measurement interval",
                "The background radiation is zero"
            ],
            correctAnswer: 1,
            explanation: "Radioactive decay is a random process. Real data always shows statistical fluctuations (e.g., 98, 103, 99). Perfectly constant readings indicate an error or a detector that has reached its maximum count rate limit.",
            hint: "Is nature perfectly predictable in the short term?",
            points: 300,
            topic: "Data Analysis"
        },
        {
            id: 10,
            question: "Justify why heavy nuclei (like Uranium) usually undergo alpha decay rather than beta decay to become stable.",
            options: [
                "Alpha decay reduces the size (mass) of the nucleus significantly, reducing the repulsive strong force",
                "Alpha decay removes 2 protons and 2 neutrons, efficiently reducing the large Coulomb repulsion",
                "Beta decay would increase the mass, making it more unstable",
                "Heavy nuclei do not have neutrons to emit beta particles"
            ],
            correctAnswer: 1,
            explanation: "Heavy nuclei are unstable primarily due to the large electrostatic repulsion between many protons. Alpha decay drops the proton number by 2 (and mass by 4), which is the most efficient way to reduce this repulsion and move towards stability.",
            hint: "What force makes large nuclei unstable?",
            points: 300,
            topic: "Decay Modes"
        },
        {
            id: 11,
            question: "Evaluate the hypothesis that the neutrino was invented solely to preserve the law of conservation of momentum.",
            options: [
                "Correct: Momentum was the only missing quantity in beta decay",
                "Incorrect: It was needed to conserve Energy, Momentum, and Angular Momentum (Spin)",
                "Incorrect: It was invented to explain why the nucleus stays together",
                "Correct: Energy was already conserved without it"
            ],
            correctAnswer: 1,
            explanation: "The continuous energy spectrum of beta decay appeared to violate Energy conservation. The recoil direction violated Momentum conservation. The neutrino saved all these fundamental laws.",
            hint: "Was momentum the only problem with beta decay observations?",
            points: 300,
            topic: "Neutrino Hypothesis"
        },
        {
            id: 12,
            question: "A medical facility plans to sterilize plastic surgical instruments using heat. Critique this plan and offer an alternative.",
            options: [
                "Good plan: Heat is the most effective way to kill bacteria",
                "Bad plan: Heat may melt/deform plastics; Gamma irradiation is better as it sterilizes without heating",
                "Good plan: Gamma radiation makes the instruments radioactive",
                "Bad plan: They should use Alpha radiation to clean the surface"
            ],
            correctAnswer: 1,
            explanation: "Gamma radiation is ionizing and kills bacteria effectively even inside packaging (due to high penetration) without raising the temperature, which preserves heat-sensitive materials like plastic.",
            hint: "What happens to plastic in an oven?",
            points: 300,
            topic: "Sterilization"
        },
        {
            id: 13,
            question: "Evaluate the risk: 'Ingesting a Gamma source is more dangerous than ingesting an Alpha source of the same activity.'",
            options: [
                "True: Gamma rays have higher energy",
                "False: Alpha particles deposit all their energy locally in sensitive tissue, causing far more biological damage",
                "True: Gamma rays stay in the body longer",
                "False: Both are equally dangerous"
            ],
            correctAnswer: 1,
            explanation: "While Gamma is dangerous externally, Alpha is far worse internally. Alpha's high Quality Factor (radiation weighting) means it causes ~20x more damage per unit energy absorbed because it destroys cells in the immediate vicinity.",
            hint: "Think about 'Linear Energy Transfer' or concentration of damage.",
            points: 300,
            topic: "Radiation Hazards"
        },
        {
            id: 14,
            question: "Check the validity of the following reaction: ¹⁴N + ⁴He → ¹⁷O + ¹H + energy.",
            options: [
                "Invalid: Nucleon numbers do not balance (18 vs 18)",
                "Valid: It was the first artificial transmutation discovered by Rutherford",
                "Invalid: Charge is not conserved (9 vs 9)",
                "Invalid: Oxygen cannot be formed from Nitrogen"
            ],
            correctAnswer: 1,
            explanation: "Check sums: Nucleons (14+4=18, 17+1=18). Protons (7+2=9, 8+1=9). Both are conserved. This is a historically significant, valid reaction.",
            hint: "Do the math for A and Z on both sides.",
            points: 300,
            topic: "Reaction Validation"
        },
        {
            id: 15,
            question: "A proposal suggests disposing of high-level nuclear waste by shooting it into the sun. Evaluate the risks.",
            options: [
                "Excellent: The sun is already a nuclear reactor",
                "Poor: The cost is too high, but safety is guaranteed",
                "Critical Risk: A launch failure could spread radioactive material over a vast area of Earth",
                "Poor: The waste would put out the sun"
            ],
            correctAnswer: 2,
            explanation: "While technically removing the waste, the consequence of a rocket explosion in the atmosphere makes the risk unacceptable compared to geological storage.",
            hint: "What happens if the rocket fails during launch?",
            points: 300,
            topic: "Waste Disposal"
        },
        {
            id: 16,
            question: "Why is the binding energy per nucleon curve useful for evaluating potential nuclear energy sources?",
            options: [
                "It tells us the half-life of isotopes",
                "It shows that moving from low or high mass numbers towards the peak (Iron) releases energy",
                "It shows that all nuclei have the same energy density",
                "It predicts exactly when a nucleus will decay"
            ],
            correctAnswer: 1,
            explanation: "The curve shows that Fusion (low mass to medium) and Fission (high mass to medium) both result in products with higher binding energy (lower mass per nucleon), releasing the difference as energy.",
            hint: "Look at the slope of the curve at the ends vs the middle.",
            points: 300,
            topic: "Energy Evaluation"
        },
        {
            id: 17,
            question: "Assess the validity of using the 'Plum Pudding' model to explain large-angle alpha scattering.",
            options: [
                "Valid: The diffuse positive charge repels the alphas strongly",
                "Invalid: A diffuse charge cannot exert a concentrated force strong enough to reverse an alpha particle's path",
                "Valid: The electrons in the pudding deflect the alphas",
                "Invalid: The model predicts only back-scattering"
            ],
            correctAnswer: 1,
            explanation: "Thomson's Plum Pudding model had positive charge spread out. The electric field would be too weak to turn back a high-speed alpha particle. Only a concentrated 'nucleus' (Rutherford) explains the strong force required.",
            hint: "Can a cloud stop a bullet?",
            points: 300,
            topic: "Atomic Models"
        },
        {
            id: 18,
            question: "Evaluate why Iodine-131 is chosen to treat thyroid cancer despite being a beta emitter.",
            options: [
                "It is a poor choice; beta causes too much collateral damage",
                "It is chosen because the thyroid naturally concentrates iodine, ensuring the radiation dose is delivered specifically to the tumor",
                "It is chosen because it has a very long half-life",
                "It is chosen because it emits only alpha particles"
            ],
            correctAnswer: 1,
            explanation: "The biological mechanism (thyroid absorbing iodine) allows for targeted therapy. The beta radiation then kills the local cancer cells with minimal damage to the rest of the body.",
            hint: "How does the body handle Iodine?",
            points: 300,
            topic: "Targeted Therapy"
        },
        {
            id: 19,
            question: "A politician claims: 'We should stop using nuclear power because radiation is unnatural.' Evaluate this statement.",
            options: [
                "Correct: Radiation is a human invention",
                "Incorrect: Background radiation from rocks, cosmic rays, and food is a natural part of our environment",
                "Correct: Natural radiation is safe, but artificial is dangerous",
                "Incorrect: Nuclear power produces no radiation"
            ],
            correctAnswer: 1,
            explanation: "Radioactivity is a natural physical phenomenon. Humans are constantly exposed to background radiation (Radon, K-40 in bananas, Cosmic rays). The risk must be evaluated quantitatively, not by 'natural vs artificial'.",
            hint: "Is the sun artificial? Are rocks artificial?",
            points: 300,
            topic: "Public Understanding"
        },
        {
            id: 20,
            question: "Critique the experimental setup: A student handles a radioactive source with bare hands to place it quickly in a holder.",
            options: [
                "Acceptable: Speed minimizes exposure time",
                "Unacceptable: Distance is a key protection factor; forceps should be used to apply the Inverse Square Law",
                "Acceptable: The hands are not vital organs",
                "Unacceptable: Gloves alone would make it safe"
            ],
            correctAnswer: 1,
            explanation: "Radiation intensity drops with the square of the distance ($1/r^2$). Touching a source ($r \approx 0$) results in massive exposure. Using forceps (increasing $r$ to ~10-20cm) reduces dose by hundreds of times.",
            hint: "Does speed matter if the intensity is a million times higher?",
            points: 300,
            topic: "Safety Protocols"
        }
    ]
};
