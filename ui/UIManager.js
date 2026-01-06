// ui/UIManager.js
class UIManager {
    constructor(gameEngine, soundManager) {
        this.gameEngine = gameEngine;
        this.soundManager = soundManager;
        this.currentScreen = 'start-screen';
    }
    
    // Show a specific screen
    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show the requested screen
        const screenElement = document.getElementById(screenId);
        if (screenElement) {
            screenElement.classList.add('active');
            this.currentScreen = screenId;
        }
        
        // Update game state based on screen
        if (screenId === 'game-screen') {
            this.gameEngine.setGameState('playing');
        } else {
            this.gameEngine.setGameState('menu');
        }
        
        // Handle screen-specific logic
        this.handleScreenChange(screenId);
    }
    
    // Handle screen change events
    handleScreenChange(screenId) {
        switch(screenId) {
            case 'start-screen':
                this.handleStartScreen();
                break;
            case 'game-screen':
                this.handleGameScreen();
                break;
            case 'game-over-screen':
                this.handleGameOverScreen();
                break;
        }
    }
    
    // Handle start screen logic
    handleStartScreen() {
        // Update progress displays
        this.updateProgressDisplays();
        
        // Play title music
        if (this.soundManager) {
            setTimeout(() => {
                this.soundManager.playBGM('title');
            }, 300);
        }
        
        // Update UI elements
        this.updateUI();
    }
    
    // Handle game screen logic
    handleGameScreen() {
        // Update game UI
        this.updateGameUI();
    }
    
    // Handle game over screen logic
    handleGameOverScreen() {
        // Stop any BGM
        if (this.soundManager) {
            this.soundManager.stopBGM();
        }
        
        // Calculate and display final results
        this.displayGameResults();
    }
    
    // Update all UI elements
    updateUI() {
        // Update start screen elements
        document.getElementById('total-score').textContent = GameState.score;
        
        const knowledgePercent = this.calculateKnowledgePercentage();
        document.getElementById('knowledge-fill').style.width = `${knowledgePercent}%`;
        
        // Update progress circles for each Bloom level
        for (let i = 1; i <= 5; i++) {
            this.updateProgressCircle(i);
        }
    }
    
    // Update game UI during gameplay
    updateGameUI() {
        // Update game stats
        document.getElementById('current-score').textContent = GameState.score;
        document.getElementById('current-level').textContent = this.gameEngine.level;
        document.getElementById('lives').textContent = GameState.lives;
        
        if (this.gameEngine.gold) {
            const collected = this.gameEngine.gold.filter(g => g.collected).length;
            const total = this.gameEngine.gold.length;
            document.getElementById('gold-count').textContent = collected;
            document.getElementById('gold-total').textContent = total;
        }
    }
    
    // Update progress circle for a specific level
    updateProgressCircle(level) {
        const progressCircle = document.getElementById(`progress-${level}`);
        if (progressCircle) {
            const knowledge = GameState.knowledge[`level${level}`] || 0;
            const percentage = Math.min(100, knowledge);
            progressCircle.textContent = `${percentage}%`;
            progressCircle.style.background = `conic-gradient(#00c9ff ${percentage}%, #2c5364 ${percentage}%)`;
        }
    }
    
    // Calculate overall knowledge percentage
    calculateKnowledgePercentage() {
        const totalPossible = Object.keys(GameState.knowledge).length * 100;
        const totalEarned = Object.values(GameState.knowledge).reduce((a, b) => a + b, 0);
        return Math.round((totalEarned / totalPossible) * 100);
    }
    
    // Update progress displays on start screen
    updateProgressDisplays() {
        this.updateUI();
    }
    
    // Display game results on game over screen
    displayGameResults() {
        // Calculate final score with time bonus
        const timeBonus = Math.max(0, 1000 - Math.floor(this.gameEngine.gameTime * 10));
        const completionBonus = 500;
        const totalBonus = timeBonus + completionBonus;
        
        // Update final score
        GameState.score += totalBonus;
        GameState.levelScores[this.gameEngine.level] = 
            (GameState.levelScores[this.gameEngine.level] || 0) + totalBonus;
        
        // Update results display
        document.getElementById('final-score').textContent = GameState.score;
        document.getElementById('questions-correct').textContent = 
            `${GameState.correctAnswers}/${GameState.totalQuestionsAnswered}`;
        document.getElementById('time-taken').textContent = `${Math.floor(this.gameEngine.gameTime)}s`;
        
        // Update knowledge gained
        const knowledgePercent = this.calculateKnowledgePercentage();
        document.getElementById('knowledge-gained').style.width = `${knowledgePercent}%`;
        document.getElementById('knowledge-percent').textContent = `${knowledgePercent}%`;
        
        // Update Bloom's progress grid
        this.updateBloomProgressGrid();
        
        // Show/hide next level button
        const nextLevelBtn = document.getElementById('next-level');
        if (nextLevelBtn) {
            nextLevelBtn.style.display = GameState.currentLevel < 5 ? 'flex' : 'none';
        }
    }
    
    // Update Bloom's taxonomy progress grid
    updateBloomProgressGrid() {
        const progressGrid = document.querySelector('.progress-grid');
        if (!progressGrid) return;
        
        progressGrid.innerHTML = '';
        
        for (let i = 1; i <= 5; i++) {
            const knowledge = GameState.knowledge[`level${i}`] || 0;
            const progressItem = this.createProgressItem(i, knowledge);
            progressGrid.appendChild(progressItem);
        }
    }
    
    // Create a progress item for Bloom's grid
    createProgressItem(level, knowledge) {
        const progressItem = document.createElement('div');
        progressItem.className = 'progress-item';
        progressItem.innerHTML = `
            <div class="progress-info">
                <span>Level ${level}</span>
                <span>${knowledge}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${knowledge}%"></div>
            </div>
        `;
        return progressItem;
    }
    
    // Show level completion screen
    showLevelComplete() {
        // Play stage clear sound
        if (this.soundManager) {
            this.soundManager.stopBGM();
            this.soundManager.play('stageClear');
        }
        
        // Show game over screen with results
        this.showScreen('game-over-screen');
    }
    
    // Show game over screen
    showGameOver() {
        // Play game over sound
        if (this.soundManager) {
            this.soundManager.stopBGM();
            this.soundManager.play('gameOver');
        }
        
        alert('Game Over! Try again.');
        
        // Restart current level
        if (typeof window.radioactivityRunner !== 'undefined') {
            window.radioactivityRunner.startGame();
        }
    }
    
    // Update pause button text
    updatePauseButton(isPaused) {
        const button = document.getElementById('pause-game');
        if (button) {
            if (isPaused) {
                button.innerHTML = '<i class="fas fa-play"></i> Resume';
            } else {
                button.innerHTML = '<i class="fas fa-pause"></i> Pause';
            }
        }
    }
    
    // Get current screen
    getCurrentScreen() {
        return this.currentScreen;
    }
}
