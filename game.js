// game.js - Updated to use all modules
class RadioactivityRunner {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.soundManager = soundManager;
        
        // Initialize all managers
        this.storageManager = storageManager;
        this.uiManager = new UIManager(null, this.soundManager); // Will update after gameEngine
        this.modalManager = new ModalManager(this.soundManager);
        
        // Initialize core engine
        this.gameEngine = new GameEngine(this.canvas, this.soundManager);
        
        // Update uiManager with gameEngine reference
        this.uiManager.gameEngine = this.gameEngine;
        
        // Initialize other modules
        this.levelManager = new LevelManager();
        this.questionManager = new QuestionManager(this.gameEngine, this.soundManager);
        this.particleSystem = new ParticleSystem(this.canvas);
        
        // Connect all modules
        this.gameEngine.levelManager = this.levelManager;
        this.gameEngine.questionManager = this.questionManager;
        this.gameEngine.particleSystem = this.particleSystem;
        this.gameEngine.uiManager = this.uiManager;
        
        // Initialize collision system (will be created when game starts)
        this.collisionSystem = null;
        
        this.init();
    }
    
    init() {
        // Load saved progress
        this.storageManager.loadGameProgress();
        this.uiManager.updateUI();
        
        // Load questions
        loadQuestions();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Show start screen
        this.uiManager.showScreen('start-screen');
        
        // Start game engine
        this.gameEngine.start();
        
        // Store instance globally for access
        window.radioactivityRunner = this;
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
            this.modalManager.showModal('start-game', { playSound: true });
            this.startGame();
        });
        
        // How to play button
        document.getElementById('how-to-play').addEventListener('click', () => {
            this.modalManager.showInstructionsModal();
        });
        
        // Reset progress button
        document.getElementById('reset-progress').addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all progress?')) {
                this.storageManager.resetGameProgress();
                this.uiManager.updateUI();
            }
        });
        
        // Pause game button
        document.getElementById('pause-game').addEventListener('click', () => {
            this.gameEngine.togglePause();
            this.uiManager.updatePauseButton(this.gameEngine.getGameState() === 'paused');
        });
        
        // Back to menu button
        document.getElementById('back-to-menu').addEventListener('click', () => {
            if (confirm('Return to menu? Progress will be saved.')) {
                this.storageManager.saveGameProgress();
                this.uiManager.showScreen('start-screen');
            }
        });
        
        // Level navigation buttons
        document.getElementById('next-level').addEventListener('click', () => {
            if (GameState.currentLevel < 5) {
                GameState.currentLevel++;
                this.startGame();
            } else {
                this.uiManager.showScreen('start-screen');
            }
        });
        
        document.getElementById('replay-level').addEventListener('click', () => {
            this.startGame();
        });
        
        document.getElementById('return-to-menu').addEventListener('click', () => {
            this.storageManager.saveGameProgress();
            this.uiManager.showScreen('start-screen');
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
    }
    
    // ... rest of the setupEventListeners and other methods remain similar
    // but now use this.uiManager, this.modalManager, this.storageManager
    
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
        this.uiManager.updateGameUI();
        document.getElementById('gold-total').textContent = design.totalGold;
        
        // Play sounds
        if (this.soundManager) {
            this.soundManager.stopBGM();
            this.soundManager.play('stageStart');
            
            setTimeout(() => {
                this.soundManager.playBGM('mainBGM');
            }, 1500);
        }
        
        this.uiManager.showScreen('game-screen');
    }
}

// Initialize game when page loads
window.addEventListener('load', () => {
    const game = new RadioactivityRunner();
});
