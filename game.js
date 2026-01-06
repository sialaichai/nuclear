// game.js - Main Entry Point (Refactored)
class RadioactivityRunner {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.soundManager = soundManager;
        
        // Initialize core engine
        this.gameEngine = new GameEngine(this.canvas, this.soundManager);
        
        // Initialize modules
        this.levelManager = new LevelManager();
        this.questionManager = new QuestionManager(this.gameEngine, this.soundManager);
        this.particleSystem = new ParticleSystem(this.canvas);
        
        // Connect modules
        this.gameEngine.levelManager = this.levelManager;
        this.gameEngine.questionManager = this.questionManager;
        this.gameEngine.particleSystem = this.particleSystem;
        
        this.init();
    }
    
    init() {
        // Load saved progress
        loadGameProgress();
        updateUI();
        
        // Load questions
        loadQuestions();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Show start screen
        this.showScreen('start-screen');
        
        // Initialize collision system (will be created when game starts)
        this.collisionSystem = null;
        
        // Start game engine
        this.gameEngine.start();
    }
    
    setupEventListeners() {
        // Keyboard events
        window.addEventListener('keydown', (e) => {
            this.gameEngine.handleKeyDown(e.key);
        });
        
        window.addEventListener('keyup', (e) => {
            this.gameEngine.handleKeyUp(e.key);
        });
        
        // UI Button events
        this.setupUIEventListeners();
        
        // Question events
        this.setupQuestionEventListeners();
        
        // Sound control events
        this.setupSoundEventListeners();
    }
    
    setupUIEventListeners() {
        // Start game button
        document.getElementById('start-game').addEventListener('click', () => {
            if (this.soundManager) {
                this.soundManager.play('button');
            }
            this.startGame();
        });
        
        // How to play button
        document.getElementById('how-to-play').addEventListener('click', () => {
            if (this.soundManager) {
                this.soundManager.play('button');
            }
            document.getElementById('instructions-modal').style.display = 'block';
        });
        
        // Reset progress button
        document.getElementById('reset-progress').addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all progress?')) {
                resetGameState();
            }
        });
        
        // Pause game button
        document.getElementById('pause-game').addEventListener('click', () => {
            this.gameEngine.togglePause();
            const button = document.getElementById('pause-game');
            if (this.gameEngine.getGameState() === 'paused') {
                button.innerHTML = '<i class="fas fa-play"></i> Resume';
            } else {
                button.innerHTML = '<i class="fas fa-pause"></i> Pause';
            }
        });
        
        // Back to menu button
        document.getElementById('back-to-menu').addEventListener('click', () => {
            if (confirm('Return to menu? Progress will be saved.')) {
                this.showScreen('start-screen');
                saveGameProgress();
                updateUI();
                
                // Play title music
                setTimeout(() => {
                    if (this.soundManager) {
                        this.soundManager.playBGM('title');
                    }
                }, 300);
            }
        });
        
        // Level navigation buttons
        document.getElementById('next-level').addEventListener('click', () => {
            if (GameState.currentLevel < 5) {
                GameState.currentLevel++;
                this.startGame();
            } else {
                this.showScreen('start-screen');
            }
        });
        
        document.getElementById('replay-level').addEventListener('click', () => {
            this.startGame();
        });
        
        document.getElementById('return-to-menu').addEventListener('click', () => {
            this.showScreen('start-screen');
            saveGameProgress();
            updateUI();
            
            // Play title music
            setTimeout(() => {
                if (this.soundManager) {
                    this.soundManager.playBGM('title');
                }
            }, 300);
        });
        
        // Bloom level selection
        document.querySelectorAll('.bloom-card').forEach(card => {
            card.addEventListener('click', () => {
                const level = parseInt(card.dataset.level);
                if (level <= GameState.currentLevel) {
                    GameState.currentLevel = level;
                    this.startGame();
                } else {
                    alert(`Complete level ${GameState.currentLevel} first!`);
                }
            });
        });
        
        // Close modals
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                document.getElementById('instructions-modal').style.display = 'none';
            });
        });
    }
    
    setupQuestionEventListeners() {
        // Submit answer button
        document.getElementById('submit-answer').addEventListener('click', () => {
            this.questionManager.submitAnswer();
        });
        
        // Use hint button
        document.getElementById('use-hint').addEventListener('click', () => {
            this.questionManager.useHint();
        });
        
        // Skip question button
        document.getElementById('skip-question').addEventListener('click', () => {
            this.questionManager.skipQuestion();
        });
        
        // Continue game button (after feedback)
        document.getElementById('continue-game').addEventListener('click', () => {
            this.questionManager.hideFeedback();
            
            // If level should complete after question
            if (this.gameEngine.completeLevelAfterQuestion) {
                this.gameEngine.levelComplete();
            }
        });
    }
    
    setupSoundEventListeners() {
        // Mute toggle button
        const muteToggle = document.getElementById('mute-toggle');
        if (muteToggle) {
            muteToggle.addEventListener('click', () => {
                if (this.soundManager) {
                    const isMuted = this.soundManager.toggleMute();
                    const icon = muteToggle.querySelector('i');
                    const text = muteToggle.querySelector('span') || muteToggle;
                    
                    if (isMuted) {
                        icon.className = 'fas fa-volume-mute';
                        muteToggle.innerHTML = '<i class="fas fa-volume-mute"></i> Unmute';
                    } else {
                        icon.className = 'fas fa-volume-up';
                        muteToggle.innerHTML = '<i class="fas fa-volume-up"></i> Mute';
                    }
                }
            });
        }
        
        // Volume slider
        const volumeSlider = document.getElementById('volume-slider');
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                if (this.soundManager) {
                    const volume = parseInt(e.target.value) / 100;
                    this.soundManager.setVolume(volume, volume * 0.9);
                }
            });
        }
    }
    
    startGame() {
        const level = GameState.currentLevel;
        const design = this.levelManager.getLevel(level);
        
        // Create player
        this.gameEngine.player = new Player(
            design.start.x * this.gameEngine.tileSize,
            design.start.y * this.gameEngine.tileSize,
            this.gameEngine.tileSize
        );
        
        // Create game objects from level design
        const objects = this.levelManager.createGameObjects(design, this.gameEngine.tileSize);
        this.gameEngine.platforms = objects.platforms;
        this.gameEngine.ladders = objects.ladders;
        this.gameEngine.gold = objects.gold;
        this.gameEngine.enemies = objects.enemies;
        this.gameEngine.bricks = objects.bricks;
        this.gameEngine.holes = [];
        
        // Initialize collision system
        this.collisionSystem = new CollisionSystem(this.gameEngine, this.questionManager);
        this.gameEngine.collisionSystem = this.collisionSystem;
        
        // Reset game state
        GameState.goldCollected = 0;
        GameState.lives = 3;
        this.gameEngine.setGameState('playing');
        this.gameEngine.gameTime = 0;
        this.gameEngine.level = level;
        this.gameEngine.allGoldCollected = false;
        this.gameEngine.completeLevelAfterQuestion = false;
        this.questionManager.allGoldCollected = false;
        
        // Update UI
        document.getElementById('gold-count').textContent = '0';
        document.getElementById('gold-total').textContent = design.totalGold;
        document.getElementById('lives').textContent = GameState.lives;
        document.getElementById('current-level').textContent = level;
        
        // Play sounds
        if (this.soundManager) {
            this.soundManager.stopBGM();
            this.soundManager.play('stageStart');
            
            setTimeout(() => {
                this.soundManager.playBGM('mainBGM');
            }, 1500);
        }
        
        this.showScreen('game-screen');
    }
    
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        const screenElement = document.getElementById(screenId);
        if (screenElement) {
            screenElement.classList.add('active');
        }
        
        this.gameEngine.setGameState(screenId === 'game-screen' ? 'playing' : 'menu');
        
        // Handle sound based on screen
        if (this.soundManager) {
            if (screenId === 'start-screen') {
                this.soundManager.playBGM('title');
            } else if (screenId === 'game-over-screen') {
                this.soundManager.stopBGM();
            }
        }
    }
}

// Initialize game when page loads
window.addEventListener('load', () => {
    const game = new RadioactivityRunner();
});
