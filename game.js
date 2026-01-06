// game.js - Minimal Main Entry Point
class RadioactivityRunner {
    constructor() {
        // Get canvas
        this.canvas = document.getElementById('game-canvas');
        if (!this.canvas) {
            console.error('Canvas element not found!');
            return;
        }
        
        // Get managers from global scope
        this.soundManager = window.soundManager;
        this.storageManager = window.storageManager;
        
        // Initialize core engine
        this.gameEngine = new GameEngine(this.canvas, this.soundManager);
        
        // Initialize other managers
        this.levelManager = new LevelManager();
        this.questionManager = new QuestionManager(this.gameEngine, this.soundManager);
        this.uiManager = new UIManager(this.gameEngine, this.soundManager);
        
        // Connect modules to game engine
        this.gameEngine.levelManager = this.levelManager;
        this.gameEngine.questionManager = this.questionManager;
        this.gameEngine.uiManager = this.uiManager;
        
        // Store for global access
        window.gameInstance = this;
        
        // Initialize
        this.init();
    }
    
    init() {
        // Load saved progress
        if (this.storageManager && this.storageManager.loadGameProgress) {
            this.storageManager.loadGameProgress();
        }
        
        // Update UI
        this.updateUI();
        
        // Load questions
        if (typeof loadQuestions === 'function') {
            loadQuestions();
        }
        
        // Setup basic event listeners
        this.setupCoreEventListeners();
        
        // Show start screen
        this.uiManager.showScreen('start-screen');
        
        // Start game loop
        this.gameEngine.start();
    }
    
    setupCoreEventListeners() {
        // Keyboard input to game engine
        window.addEventListener('keydown', (e) => {
            this.gameEngine.handleKeyDown(e.key);
        });
        
        window.addEventListener('keyup', (e) => {
            this.gameEngine.handleKeyUp(e.key);
        });
        
        // Start game button
        document.getElementById('start-game')?.addEventListener('click', () => {
            this.startGame();
        });
        
        // Back to menu button
        document.getElementById('back-to-menu')?.addEventListener('click', () => {
            if (confirm('Return to menu? Progress will be saved.')) {
                if (this.storageManager && this.storageManager.saveGameProgress) {
                    this.storageManager.saveGameProgress();
                }
                this.uiManager.showScreen('start-screen');
            }
        });
        
        // Bloom level cards
        document.querySelectorAll('.bloom-card').forEach(card => {
            card.addEventListener('click', () => {
                const level = parseInt(card.dataset.level);
                if (level <= GameState.currentLevel) {
                    GameState.currentLevel = level;
                    this.startGame();
                }
            });
        });
    }
    
    startGame() {
        // Get level design
        const level = GameState.currentLevel;
        const design = this.levelManager.getLevel(level);
        
        // Create player
        const player = new Player(
            design.start.x * this.gameEngine.tileSize,
            design.start.y * this.gameEngine.tileSize,
            this.gameEngine.tileSize
        );
        
        // Create game objects
        const objects = this.levelManager.createGameObjects(design, this.gameEngine.tileSize);
        
        // Setup game engine with new level
        this.gameEngine.setupNewLevel(
            player,
            objects.platforms,
            objects.ladders,
            objects.gold,
            objects.enemies,
            objects.bricks,
            level
        );
        
        // Reset game state
        GameState.goldCollected = 0;
        GameState.lives = 3;
        
        // Update UI
        this.uiManager.updateGameUI();
        document.getElementById('gold-total').textContent = design.totalGold;
        
        // Play sounds
        if (this.soundManager) {
            this.soundManager.stopBGM();
            this.soundManager.play('stageStart');
            setTimeout(() => this.soundManager.playBGM('mainBGM'), 1500);
        }
        
        // Show game screen
        this.uiManager.showScreen('game-screen');
    }
    
    updateUI() {
        // Delegate to UIManager
        if (this.uiManager.updateUI) {
            this.uiManager.updateUI();
        }
    }
}

// Initialize when page loads
window.addEventListener('load', () => {
    new RadioactivityRunner();
});
