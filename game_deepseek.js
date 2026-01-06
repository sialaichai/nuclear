// game.js - Minimal Main Entry Point
class RadioactivityRunner {
    constructor() {
        // Get canvas
        this.canvas = document.getElementById('game-canvas');
        if (!this.canvas) {
            console.error('Canvas not found!');
            return;
        }
        
        this.keys = {}; 
        
        // ========== FIX 1: PROPERLY GET SOUND MANAGER ==========
        // Check multiple possible locations for soundManager
        if (typeof soundManager !== 'undefined') {
            // Case 1: Global variable 'soundManager'
            this.soundManager = soundManager;
            console.log('Found soundManager as global variable');
        } else if (typeof window.soundManager !== 'undefined') {
            // Case 2: Property of window object
            this.soundManager = window.soundManager;
            console.log('Found soundManager as window.soundManager');
        } else if (typeof SoundManager !== 'undefined') {
            // Case 3: SoundManager class exists, create instance
            this.soundManager = new SoundManager();
            console.log('Created new SoundManager instance');
        } else {
            // Case 4: No sound manager found, create dummy
            console.warn('SoundManager not found. Audio will be disabled.');
            this.soundManager = this.createDummySoundManager();
        }
        // ========== END FIX 1 ==========
        
        // Initialize core engine WITH sound manager
        this.gameEngine = new GameEngine(this.canvas, this.soundManager);
        
        // ========== FIX 2: PASS SOUND MANAGER TO OTHER MANAGERS ==========
        // Initialize other managers with sound manager
        this.levelManager = new LevelManager();
        this.questionManager = new QuestionManager(this.gameEngine, this.soundManager);
        this.uiManager = new UIManager(this.gameEngine, this.soundManager);
        this.modalManager = new ModalManager(this.soundManager);
        // ========== END FIX 2 ==========
        
        // Initialize particle system
        this.particleSystem = new ParticleSystem(this.canvas);
        
        // Connect modules
        this.gameEngine.levelManager = this.levelManager;
        this.gameEngine.questionManager = this.questionManager;
        this.gameEngine.uiManager = this.uiManager;
        this.gameEngine.particleSystem = this.particleSystem;
        
        // Initialize collision system
        this.collisionSystem = null;
        
        // Store instance globally
        window.gameInstance = this;
        
        this.init();
    }
    
    // ========== FIX 3: DUMMY SOUND MANAGER (only if needed) ==========
    createDummySoundManager() {
        return {
            play: (sound) => console.log(`[Audio] Would play: ${sound}`),
            playBGM: (bgm) => console.log(`[Audio] Would play BGM: ${bgm}`),
            stopBGM: () => console.log('[Audio] Would stop BGM'),
            pauseBGM: () => console.log('[Audio] Would pause BGM'),
            resumeBGM: () => console.log('[Audio] Would resume BGM'),
            toggleMute: () => { console.log('[Audio] Toggle mute'); return false; },
            setVolume: () => console.log('[Audio] Set volume')
        };
    }
    // ========== END FIX 3 ==========
    
    // ========== FIX 4: UPDATE STARTGAME METHOD TO USE SOUND ==========
    startGame() {
        const level = GameState.currentLevel;
        const design = this.levelManager.getLevel(level);
        
        // Create player and game objects (keep your existing code)
        const player = new Player(
            design.start.x * this.gameEngine.tileSize,
            design.start.y * this.gameEngine.tileSize,
            this.gameEngine.tileSize
        );
        
        const objects = this.levelManager.createGameObjects(design, this.gameEngine.tileSize);
        
        // Setup game engine (keep your existing code)
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
        
        // ========== FIX: USE SOUND MANAGER FOR AUDIO ==========
        if (this.soundManager) {
            this.soundManager.stopBGM();
            this.soundManager.play('stageStart');
            
            setTimeout(() => {
                this.soundManager.playBGM('main');
            }, 1500);
        }
        // ========== END FIX ==========
        
        // Show game screen
        this.uiManager.showScreen('game-screen');
    }
    // ========== END FIX 4 ==========
    
    // KEEP ALL YOUR EXISTING METHODS EXACTLY AS THEY WERE
    // Only the methods above were changed
    
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

        
        // ========== KEYBOARD HANDLING FIX ==========
        window.addEventListener('keydown', (e) => {
            // Prevent default for game keys (stops page scrolling with arrows)
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
                e.preventDefault();
            }
            
            // Store key in our local state
            this.keys[e.key] = true;
            
            // Pass to game engine
            if (this.gameEngine && this.gameEngine.handleKeyDown) {
                this.gameEngine.handleKeyDown(e.key);
            }
        });
        
        window.addEventListener('keyup', (e) => {
            // Store key in our local state
            this.keys[e.key] = false;
            
            // Pass to game engine
            if (this.gameEngine && this.gameEngine.handleKeyUp) {
                this.gameEngine.handleKeyUp(e.key);
            }
        });
        
        // ========== MOBILE/TOUCH CONTROLS (Optional but good for testing) ==========
        this.setupTouchControls();
        
               
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

    setupTouchControls() {
        // Optional: Add on-screen touch controls for mobile
        const touchControls = document.createElement('div');
        touchControls.id = 'touch-controls';
        touchControls.innerHTML = `
            <div class="touch-arrows">
                <button class="touch-btn" data-key="ArrowLeft">←</button>
                <button class="touch-btn" data-key="ArrowUp">↑</button>
                <button class="touch-btn" data-key="ArrowRight">→</button>
                <button class="touch-btn" data-key="ArrowDown">↓</button>
            </div>
            <div class="touch-actions">
                <button class="touch-btn action" data-key=" ">DIG</button>
            </div>
        `;
        document.getElementById('game-screen')?.appendChild(touchControls);
        
        // Add event listeners for touch controls
        document.querySelectorAll('.touch-btn').forEach(btn => {
            const key = btn.dataset.key;
            
            // Touch start
            btn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                if (this.gameEngine && this.gameEngine.handleKeyDown) {
                    this.gameEngine.handleKeyDown(key);
                }
            });
            
            // Touch end
            btn.addEventListener('touchend', (e) => {
                e.preventDefault();
                if (this.gameEngine && this.gameEngine.handleKeyUp) {
                    this.gameEngine.handleKeyUp(key);
                }
            });
            
            // Mouse events for desktop testing
            btn.addEventListener('mousedown', (e) => {
                e.preventDefault();
                if (this.gameEngine && this.gameEngine.handleKeyDown) {
                    this.gameEngine.handleKeyDown(key);
                }
            });
            
            btn.addEventListener('mouseup', (e) => {
                e.preventDefault();
                if (this.gameEngine && this.gameEngine.handleKeyUp) {
                    this.gameEngine.handleKeyUp(key);
                }
            });
            
            btn.addEventListener('mouseleave', (e) => {
                if (this.gameEngine && this.gameEngine.handleKeyUp) {
                    this.gameEngine.handleKeyUp(key);
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
