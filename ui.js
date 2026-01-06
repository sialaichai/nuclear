// ui.js - Handles DOM events and UI interactions
class GameInputHandler {
    constructor(game) {
        this.game = game;
    }

    setupEventListeners() {
        // Keyboard controls
        window.addEventListener('keydown', (e) => {
            this.game.keys[e.key] = true;
            
            if (e.key === 'Escape') {
                this.game.togglePause();
            }
            if (e.key === ' ' && this.game.gameState === 'playing') {
                this.game.playerDig();
            }
        });

        window.addEventListener('keyup', (e) => {
            this.game.keys[e.key] = false;
        });

        // Sound Controls
        document.getElementById('mute-toggle').addEventListener('click', () => {
            if (this.game.soundManager) {
                const isMuted = this.game.soundManager.toggleMute();
                const icon = document.querySelector('#mute-toggle i');
                const text = document.querySelector('#mute-toggle');
                
                if (isMuted) {
                    icon.className = 'fas fa-volume-mute';
                    text.innerHTML = '<i class="fas fa-volume-mute"></i> Unmute';
                } else {
                    icon.className = 'fas fa-volume-up';
                    text.innerHTML = '<i class="fas fa-volume-up"></i> Mute';
                }
            }
        });

        document.getElementById('volume-slider').addEventListener('input', (e) => {
            if (this.game.soundManager) {
                const volume = parseInt(e.target.value) / 100;
                this.game.soundManager.setVolume(volume, volume * 0.9);
            }
        });

        // Game Flow Buttons
        this.bindButton('start-game', () => this.game.startGame());
        this.bindButton('how-to-play', () => {
            document.getElementById('instructions-modal').style.display = 'block';
        });
        
        // Note: Assuming resetGameState is a global function or needs to be passed in
        this.bindButton('reset-progress', () => {
            if (confirm('Are you sure you want to reset all progress?')) {
                if(typeof resetGameState === 'function') resetGameState(); 
            }
        });

        this.bindButton('pause-game', () => this.game.togglePause());
        
        this.bindButton('back-to-menu', () => {
            if (confirm('Return to menu? Progress will be saved.')) {
                this.game.showScreen('start-screen');
                if(typeof saveGameProgress === 'function') saveGameProgress();
                if(typeof updateUI === 'function') updateUI();
            }
        });

        this.bindButton('next-level', () => {
            if (GameState.currentLevel < 5) {
                GameState.currentLevel++;
                this.game.startGame();
            } else {
                this.game.showScreen('start-screen');
            }
        });

        this.bindButton('replay-level', () => this.game.startGame());
        
        this.bindButton('return-to-menu', () => {
            this.game.showScreen('start-screen');
            if(typeof saveGameProgress === 'function') saveGameProgress();
            if(typeof updateUI === 'function') updateUI();
        });

        // Question Modal Events
        this.bindButton('submit-answer', () => this.game.submitAnswer());
        this.bindButton('use-hint', () => this.game.useHint());
        this.bindButton('skip-question', () => this.game.skipQuestion());
        
        document.getElementById('continue-game').addEventListener('click', () => {
            if (this.game.soundManager) this.game.soundManager.play('button');
            this.game.hideModal('feedback-modal');
        });

        // Close modals
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                document.getElementById('instructions-modal').style.display = 'none';
            });
        });

        // Bloom level cards
        document.querySelectorAll('.bloom-card').forEach(card => {
            card.addEventListener('click', () => {
                const level = parseInt(card.dataset.level);
                if (level <= GameState.currentLevel) {
                    GameState.currentLevel = level;
                    this.game.startGame();
                } else {
                    alert(`Complete level ${GameState.currentLevel} first!`);
                }
            });
        });
    }

    // Helper to bind clicks with sound
    bindButton(id, callback) {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('click', () => {
                if (this.game.soundManager) this.game.soundManager.play('button');
                callback();
            });
        }
    }
}
