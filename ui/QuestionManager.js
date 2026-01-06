// ui/QuestionManager.js
class QuestionManager {
    constructor(gameEngine, soundManager) {
        this.gameEngine = gameEngine;
        this.soundManager = soundManager;
        this.currentQuestion = null;
        this.hasPendingQuestion = false;
        this.allGoldCollected = false;
    }
    
    // Ask a question
    askQuestion(level) {
        if (this.gameEngine.getGameState() !== 'playing') return;
        
        this.currentQuestion = getRandomQuestion(level);
        if (!this.currentQuestion) {
            console.error('No questions available');
            return;
        }
        
        GameState.currentQuestion = this.currentQuestion;
        this.hasPendingQuestion = true;
        
        // Pause game and BGM
        this.gameEngine.setGameState('paused');
        if (this.soundManager) {
            this.soundManager.pauseBGM();
        }
        
        this.showQuestionModal();
    }
    
    // Show question modal
    showQuestionModal() {
        const modal = document.getElementById('question-modal');
        if (!modal) return;
        
        // Update modal content
        document.getElementById('question-title').textContent = 
            `Level ${this.gameEngine.level} Question`;
        document.getElementById('question-text').textContent = 
            this.currentQuestion.question;
        document.getElementById('bloom-badge').textContent = 
            `Bloom Level ${this.gameEngine.level}`;
        
        // Clear previous options
        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';
        
        // Add new options
        const letters = ['A', 'B', 'C', 'D'];
        this.currentQuestion.options.forEach((option, index) => {
            const optionBtn = this.createOptionButton(letters[index], option, index);
            optionsContainer.appendChild(optionBtn);
        });
        
        // Reset hint and submit button
        document.getElementById('hint-area').style.display = 'none';
        document.getElementById('submit-answer').disabled = true;
        
        // Show modal
        modal.classList.add('active');
    }
    
    // Create option button
    createOptionButton(letter, text, index) {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.innerHTML = `
            <span class="option-letter">${letter}</span>
            <span class="option-text">${text}</span>
        `;
        
        button.addEventListener('click', () => {
            // Remove selected class from all options
            document.querySelectorAll('.option-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            button.classList.add('selected');
            GameState.selectedAnswer = index;
            document.getElementById('submit-answer').disabled = false;
        });
        
        return button;
    }
    
    // Submit answer
    submitAnswer() {
        if (GameState.selectedAnswer === null) return;
        
        const isCorrect = GameState.selectedAnswer === this.currentQuestion.correctAnswer;
        
        // Process answer and update score
        this.processAnswer(isCorrect);
        
        // Show feedback
        this.showFeedback(isCorrect);
        
        // Reset question state
        this.resetQuestionState();
        
        // Check if level should complete
        if (this.allGoldCollected && isCorrect) {
            this.completeLevelAfterAnswer();
        }
    }
    
    // Process answer and update game state
    processAnswer(isCorrect) {
        GameState.totalQuestionsAnswered++;
        
        // Calculate points
        let pointsEarned = isCorrect ? this.currentQuestion.points : -25;
        let timeBonus = 0;
        
        if (isCorrect) {
            GameState.correctAnswers++;
            GameState.knowledge[`level${this.gameEngine.level}`] = 
                Math.min(100, (GameState.knowledge[`level${this.gameEngine.level}`] || 0) + 20);
            
            // Time bonus for quick answers
            timeBonus = Math.max(0, 50 - Math.floor(this.gameEngine.gameTime % 60));
            pointsEarned += timeBonus;
            
            // Play correct sound
            if (this.soundManager) {
                this.soundManager.play('correct');
            }
        } else {
            // Play wrong sound
            if (this.soundManager) {
                this.soundManager.play('wrong');
            }
        }
        
        // Update score
        GameState.score += pointsEarned;
        GameState.levelScores[this.gameEngine.level] = 
            (GameState.levelScores[this.gameEngine.level] || 0) + pointsEarned;
        
        // Update UI
        updateUI();
        document.getElementById('current-score').textContent = GameState.score;
    }
    
    // Show feedback modal
    showFeedback(isCorrect) {
        const modal = document.getElementById('feedback-modal');
        if (!modal) return;
        
        // Update feedback content
        document.getElementById('feedback-title').textContent = 
            isCorrect ? 'Correct!' : 'Incorrect';
        
        document.getElementById('feedback-icon').innerHTML = isCorrect ?
            '<i class="fas fa-check-circle correct-icon"></i>' :
            '<i class="fas fa-times-circle incorrect-icon"></i>';
        
        document.getElementById('feedback-text').textContent = isCorrect ?
            `Great job! You earned points.` :
            'Better luck next time! Learn from the explanation below.';
        
        document.getElementById('explanation').innerHTML = `
            <strong>Explanation:</strong> ${this.currentQuestion.explanation}<br>
            <strong>Topic:</strong> ${this.currentQuestion.topic}
        `;
        
        // Update score change display
        const scoreChange = isCorrect ? this.currentQuestion.points : -25;
        const scoreChangeEl = document.getElementById('score-change');
        scoreChangeEl.textContent = (scoreChange >= 0 ? '+' : '') + scoreChange;
        scoreChangeEl.className = scoreChange >= 0 ? 'positive-score' : 'negative-score';
        
        // If this was the last gold and answer was correct
        if (this.allGoldCollected && isCorrect) {
            document.getElementById('feedback-title').textContent = 'Level Complete!';
            document.getElementById('feedback-text').textContent = 
                'Perfect! You answered correctly and completed the level!';
            document.getElementById('explanation').innerHTML += 
                '<br><br><strong>🎉 Level Complete! 🎉</strong>';
        }
        
        // Hide question modal, show feedback
        document.getElementById('question-modal').classList.remove('active');
        modal.classList.add('active');
    }
    
    // Hide feedback modal and resume game
    hideFeedback() {
        const modal = document.getElementById('feedback-modal');
        if (modal) {
            modal.classList.remove('active');
        }
        
        this.gameEngine.setGameState('playing');
        this.hasPendingQuestion = false;
        
        // Resume BGM
        if (this.soundManager && this.gameEngine.getGameState() === 'playing') {
            this.soundManager.resumeBGM();
        }
    }
    
    // Skip question
    skipQuestion() {
        GameState.score -= 50;
        if (GameState.score < 0) GameState.score = 0;
        
        document.getElementById('current-score').textContent = GameState.score;
        updateUI();
        
        // Hide question modal
        document.getElementById('question-modal').classList.remove('active');
        
        this.gameEngine.setGameState('playing');
        this.hasPendingQuestion = false;
        
        // If all gold was collected but question was skipped
        if (this.allGoldCollected) {
            setTimeout(() => {
                this.gameEngine.levelComplete();
            }, 100);
        }
        
        // Resume BGM
        if (this.soundManager) {
            this.soundManager.resumeBGM();
        }
    }
    
    // Use hint
    useHint() {
        if (!GameState.currentQuestion || GameState.score < 10) {
            alert('You need at least 10 points to use a hint!');
            return;
        }
        
        GameState.score -= 10;
        document.getElementById('current-score').textContent = GameState.score;
        updateUI();
        
        document.getElementById('hint-text').textContent = GameState.currentQuestion.hint;
        document.getElementById('hint-area').style.display = 'block';
    }
    
    // Mark that all gold has been collected
    markAllGoldCollected() {
        this.allGoldCollected = true;
    }
    
    // Complete level after answering question
    completeLevelAfterAnswer() {
        setTimeout(() => {
            this.gameEngine.levelComplete();
        }, 100);
    }
    
    // Reset question state
    resetQuestionState() {
        GameState.selectedAnswer = null;
        GameState.currentQuestion = null;
        this.currentQuestion = null;
    }
}
