// Main Game Engine
class RadioactivityRunner {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.gameState = 'menu'; // menu, playing, paused, gameOver
        this.player = null;
        this.enemies = [];
        this.gold = [];
        this.platforms = [];
        this.ladders = [];
        this.bricks = [];
        this.holes = []; // ADDED: For trapping enemies
        this.level = 1;
        this.tileSize = 32;
        this.gridWidth = Math.floor(this.canvas.width / this.tileSize);
        this.gridHeight = Math.floor(this.canvas.height / this.tileSize);
        this.keys = {};
        this.gameTime = 0;
        this.lastTime = 0;
        this.levelDesigns = {};
        this.currentQuestion = null;
        this.allGoldCollected = false; // Add this line
        this.soundManager = null; // Will be initialized later
        this.init();
    }

    init() {
        // Load saved progress
        loadGameProgress();
        updateUI();

        // Initialize sound manager
        this.soundManager = soundManager;
        
        // Initialize level designs
        this.createLevelDesigns();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Start game loop
        this.gameLoop();
        
        // Show start screen
        this.showScreen('start-screen');
    }

    setupEventListeners() {
            
        // Keyboard controls
        window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
            
            // Pause with ESC
            if (e.key === 'Escape') {
                this.togglePause();
            }
            
            // Dig with space
            if (e.key === ' ' && this.gameState === 'playing') {
                this.playerDig();
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });

        // Sound control events
        document.getElementById('mute-toggle').addEventListener('click', () => {
            if (this.soundManager) {
                const isMuted = this.soundManager.toggleMute();
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
            if (this.soundManager) {
                const volume = parseInt(e.target.value) / 100;
                this.soundManager.setVolume(volume, volume * 0.9);
            }
        });

        
        // FIXED: Add missing start-game event listener
        document.getElementById('start-game').addEventListener('click', () => {
            if (this.soundManager) {
                this.soundManager.play('button');
            }
            this.startGame();
        });

        document.getElementById('how-to-play').addEventListener('click', () => {
            if (this.soundManager) {
                this.soundManager.play('button');
            }
            document.getElementById('instructions-modal').style.display = 'block';
        });

        document.getElementById('reset-progress').addEventListener('click', () => {
            if (this.soundManager) {
                this.soundManager.play('button');
            }
            if (confirm('Are you sure you want to reset all progress?')) {
                resetGameState();
            }
        });

        document.getElementById('pause-game').addEventListener('click', () => {
            if (this.soundManager) {
                this.soundManager.play('button');
            }
            this.togglePause();
        });

        document.getElementById('back-to-menu').addEventListener('click', () => {
            if (this.soundManager) {
                this.soundManager.play('button');
            }
            if (confirm('Return to menu? Progress will be saved.')) {
                this.showScreen('start-screen');
                saveGameProgress();
                updateUI();
            }
        });

        document.getElementById('next-level').addEventListener('click', () => {
            if (this.soundManager) {
                this.soundManager.play('button');
            }
            if (GameState.currentLevel < 5) {
                GameState.currentLevel++;
                this.startGame();
            } else {
                this.showScreen('start-screen');
            }
        });

        document.getElementById('replay-level').addEventListener('click', () => {
            if (this.soundManager) {
                this.soundManager.play('button');
            }
            this.startGame();
        });

        document.getElementById('return-to-menu').addEventListener('click', () => {
            if (this.soundManager) {
                this.soundManager.play('button');
            }
            this.showScreen('start-screen');
            saveGameProgress();
            updateUI();
        });

        // Question modal events
        document.getElementById('submit-answer').addEventListener('click', () => {
            if (this.soundManager) {
                this.soundManager.play('button');
            }
            this.submitAnswer();
        });

        document.getElementById('use-hint').addEventListener('click', () => {
            if (this.soundManager) {
                this.soundManager.play('button');
            }
            this.useHint();
        });

        document.getElementById('skip-question').addEventListener('click', () => {
            if (this.soundManager) {
                this.soundManager.play('button');
            }
            this.skipQuestion();
        });

        document.getElementById('continue-game').addEventListener('click', () => {
            if (this.soundManager) {
                this.soundManager.play('button');
            }
            this.hideModal('feedback-modal');
        });

        // Close modals
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                document.getElementById('instructions-modal').style.display = 'none';
            });
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

    createLevelDesigns() {
        // Level 1: Remembering - Simple layout
        this.levelDesigns[1] = {
            platforms: [
                {x: 0, y: 14, width: 25, height: 2},
                {x: 5, y: 10, width: 5, height: 2},
                {x: 15, y: 10, width: 5, height: 2},
                {x: 10, y: 6, width: 5, height: 2}
            ],
            ladders: [
                {x: 12, y: 6, height: 8},
                {x: 7, y: 10, height: 4},
                {x: 17, y: 10, height: 4}
            ],
            gold: [
                {x: 2, y: 13}, {x: 8, y: 9}, {x: 12, y: 5},
                {x: 18, y: 9}, {x: 22, y: 13}
            ],
            enemies: [
                {x: 4, y: 13, patrol: {left: 2, right: 8}},
                {x: 20, y: 13, patrol: {left: 16, right: 22}}
            ],
            bricks: [
                {x: 10, y: 12, destructible: true},
                {x: 14, y: 12, destructible: true}
            ],
            start: {x: 1, y: 13},
            totalGold: 5
        };

        // Level 2: Understanding - More complex
        this.levelDesigns[2] = {
            platforms: [
                {x: 0, y: 14, width: 25, height: 2},
                {x: 3, y: 11, width: 4, height: 2},
                {x: 10, y: 11, width: 5, height: 2},
                {x: 18, y: 11, width: 4, height: 2},
                {x: 7, y: 8, width: 3, height: 2},
                {x: 15, y: 8, width: 3, height: 2},
                {x: 11, y: 5, width: 3, height: 2}
            ],
            ladders: [
                {x: 4, y: 11, height: 3},
                {x: 12, y: 11, height: 3},
                {x: 20, y: 11, height: 3},
                {x: 8, y: 8, height: 3},
                {x: 16, y: 8, height: 3},
                {x: 12, y: 5, height: 3}
            ],
            gold: [
                {x: 4, y: 10}, {x: 8, y: 7}, {x: 12, y: 4},
                {x: 16, y: 7}, {x: 20, y: 10}, {x: 24, y: 13}
            ],
            enemies: [
                {x: 6, y: 13, patrol: {left: 4, right: 10}},
                {x: 14, y: 13, patrol: {left: 12, right: 18}},
                {x: 22, y: 13, patrol: {left: 20, right: 24}}
            ],
            bricks: [
                {x: 9, y: 13, destructible: true},
                {x: 13, y: 13, destructible: true},
                {x: 17, y: 13, destructible: true}
            ],
            start: {x: 1, y: 13},
            totalGold: 6
        };

        // Additional levels can be defined similarly
        // For prototype, we'll use variations of level 1 & 2
        for (let i = 3; i <= 5; i++) {
            this.levelDesigns[i] = JSON.parse(JSON.stringify(this.levelDesigns[2]));
            this.levelDesigns[i].totalGold = 5 + i;
        }
    }

    startGame() {
        this.level = GameState.currentLevel;
        const design = this.levelDesigns[this.level];
            // Reset the all gold collected flag
        this.allGoldCollected = false;
            // Play stage start sound
        if (this.soundManager) {
            this.soundManager.play('stageStart');
            
            // Start main BGM after a short delay
            setTimeout(() => {
                this.soundManager.playBGM('mainBGM');
            }, 1500);
        }
        
        // Reset game objects
        this.player = {
            x: design.start.x * this.tileSize,
            y: design.start.y * this.tileSize,
            width: this.tileSize * 0.8,
            height: this.tileSize * 0.9,
            velocityX: 0,
            velocityY: 0,
            speed: 3,
            jumpForce: -12,
            isOnGround: false,
            isClimbing: false,
            facingRight: true,
            digCooldown: 0,
            invincibleTimer: 0
        };

        // Create platforms
        this.platforms = design.platforms.map(p => ({
            x: p.x * this.tileSize,
            y: p.y * this.tileSize,
            width: p.width * this.tileSize,
            height: p.height * this.tileSize
        }));

        // Create ladders
        this.ladders = design.ladders.map(l => ({
            x: l.x * this.tileSize,
            y: l.y * this.tileSize,
            width: this.tileSize,
            height: l.height * this.tileSize
        }));

        // Create gold
        this.gold = design.gold.map(g => ({
            x: g.x * this.tileSize,
            y: g.y * this.tileSize,
            width: this.tileSize * 0.6,
            height: this.tileSize * 0.6,
            collected: false,
            animation: 0
        }));

        // Create enemies
        this.enemies = design.enemies.map(e => ({
            x: e.x * this.tileSize,
            y: e.y * this.tileSize,
            width: this.tileSize * 0.8,
            height: this.tileSize * 0.9,
            patrolLeft: e.patrol.left * this.tileSize,
            patrolRight: e.patrol.right * this.tileSize,
            direction: 1,
            speed: 1,
            isFalling: false,
            trapped: false, // ADDED: For hole trapping
            trapTimer: 0,   // ADDED: How long trapped
            originalY: e.y * this.tileSize // ADDED: Original position
        }));

        // Create bricks (destructible blocks)
        this.bricks = design.bricks.map(b => ({
            x: b.x * this.tileSize,
            y: b.y * this.tileSize,
            width: this.tileSize,
            height: this.tileSize,
            destructible: b.destructible,
            health: b.destructible ? 3 : 100
        }));

        // Reset holes
        this.holes = [];

        // Reset game state
        GameState.goldCollected = 0;
        GameState.lives = 3;
        this.gameState = 'playing';
        this.gameTime = 0;
        this.lastTime = Date.now();
        
        // Update UI
        document.getElementById('gold-count').textContent = '0';
        document.getElementById('gold-total').textContent = design.totalGold;
        document.getElementById('lives').textContent = GameState.lives;
        
        this.showScreen('game-screen');
    }

    gameLoop() {
        const currentTime = Date.now();
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        if (this.gameState === 'playing') {
            this.gameTime += deltaTime;
            this.update(deltaTime);
        }

        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }

    update(deltaTime) {
        // Update player
        this.updatePlayer(deltaTime);
        
        // Update enemies
        this.updateEnemies(deltaTime);
        
        // Update gold animations
        this.gold.forEach(g => {
            if (!g.collected) {
                g.animation = (g.animation + deltaTime * 5) % (Math.PI * 2);
            }
        });

        // Update dig cooldown
        if (this.player.digCooldown > 0) {
            this.player.digCooldown -= deltaTime;
        }
        
        // Update holes
        this.updateHoles(deltaTime);
        
        // Check collisions
        this.checkCollisions();
        
        // Check win condition
        if (GameState.goldCollected >= this.levelDesigns[this.level].totalGold) {
            this.levelComplete();
        }
    }

    updatePlayer(deltaTime) {
        // Update invincibility timer
        if (this.player.invincibleTimer > 0) {
            this.player.invincibleTimer -= deltaTime;
        }
        // Horizontal movement
        this.player.velocityX = 0;
        
        if (this.keys['ArrowLeft'] || this.keys['a']) {
            this.player.velocityX = -this.player.speed;
            this.player.facingRight = false;
        }
        if (this.keys['ArrowRight'] || this.keys['d']) {
            this.player.velocityX = this.player.speed;
            this.player.facingRight = true;
        }
        
        // Check if player is on ladder
        this.player.isClimbing = false;
        for (const ladder of this.ladders) {
            if (this.isColliding(this.player, ladder) && 
                (this.keys['ArrowUp'] || this.keys['w'] || this.keys['ArrowDown'] || this.keys['s'])) {
                this.player.isClimbing = true;
                this.player.isOnGround = true; // Prevent gravity while climbing
                this.player.velocityY = 0;
                
                if (this.keys['ArrowUp'] || this.keys['w']) {
                    this.player.y -= this.player.speed;
                }
                if (this.keys['ArrowDown'] || this.keys['s']) {
                    this.player.y += this.player.speed;
                }
                break;
            }
        }
        
        // Apply gravity if not climbing
        if (!this.player.isClimbing) {
            this.player.velocityY += 0.5; // Gravity
            this.player.velocityY = Math.min(this.player.velocityY, 15); // Terminal velocity
        }
        
        // Jump
        if ((this.keys['ArrowUp'] || this.keys['w']) && this.player.isOnGround && !this.player.isClimbing) {
            this.player.velocityY = this.player.jumpForce;
            this.player.isOnGround = false;
        }
        
        // Update position
        this.player.x += this.player.velocityX;
        this.player.y += this.player.velocityY;
        
        // Keep player in bounds
        this.player.x = Math.max(0, Math.min(this.canvas.width - this.player.width, this.player.x));
        this.player.y = Math.max(0, Math.min(this.canvas.height - this.player.height, this.player.y));
        
        // Platform collision
        this.player.isOnGround = false;
        for (const platform of this.platforms) {
            if (this.isColliding(this.player, platform)) {
                // Bottom collision
                if (this.player.velocityY > 0 && this.player.y + this.player.height > platform.y) {
                    this.player.y = platform.y - this.player.height;
                    this.player.velocityY = 0;
                    this.player.isOnGround = true;
                }
                // Top collision
                else if (this.player.velocityY < 0) {
                    this.player.y = platform.y + platform.height;
                    this.player.velocityY = 0;
                }
                // Side collision
                else if (this.player.velocityX !== 0) {
                    if (this.player.x < platform.x) {
                        this.player.x = platform.x - this.player.width;
                    } else {
                        this.player.x = platform.x + platform.width;
                    }
                }
            }
        }
    }

    updateEnemies(deltaTime) {
        this.enemies.forEach(enemy => {
            // If enemy is trapped, don't move
            if (enemy.trapped) {
                enemy.trapTimer -= deltaTime;
                if (enemy.trapTimer <= 0) {
                    // Enemy escapes from hole
                    enemy.trapped = false;
                    enemy.y = enemy.originalY;
                }
                return;
            }
            
            // Simple patrol AI
            enemy.x += enemy.direction * enemy.speed;
            
            if (enemy.x <= enemy.patrolLeft) {
                enemy.direction = 1;
            }
            if (enemy.x + enemy.width >= enemy.patrolRight) {
                enemy.direction = -1;
            }
            
            // Simple gravity for enemies
            enemy.isFalling = true;
            for (const platform of this.platforms) {
                if (this.isColliding(enemy, platform) && enemy.y + enemy.height <= platform.y + 5) {
                    enemy.y = platform.y - enemy.height;
                    enemy.isFalling = false;
                    break;
                }
            }
            
            if (enemy.isFalling) {
                enemy.y += 5;
            }
        });
    }

    // NEW METHOD: Update holes
    updateHoles(deltaTime) {
        for (let i = this.holes.length - 1; i >= 0; i--) {
            const hole = this.holes[i];
            
            // Update hole timer
            hole.timer -= deltaTime;
            
            // Check if enemies fall into this hole
            if (hole.active) {
                for (const enemy of this.enemies) {
                    if (!enemy.trapped && this.isEnemyOverHole(enemy, hole)) {
                        // Enemy falls into hole!
                        enemy.trapped = true;
                        enemy.trapTimer = 3.0; // Trapped for 3 seconds
                        hole.active = false; // Hole is now "filled" with enemy
                        hole.filledByEnemy = true;
                        console.log(`Enemy trapped in hole at (${hole.x}, ${hole.y})`);
                        break;
                    }
                }
            }
            
            // Remove hole if timer expires
            if (hole.timer <= 0) {
                this.holes.splice(i, 1);
            }
        }
    }

    // NEW METHOD: Check if enemy is over a hole
    isEnemyOverHole(enemy, hole) {
        return enemy.x + enemy.width > hole.x &&
               enemy.x < hole.x + hole.width &&
               enemy.y + enemy.height > hole.y &&
               Math.abs((enemy.y + enemy.height) - hole.y) < 10;
    }

    // UPDATED: Proper digging that creates holes
    playerDig() {
        // Prevent digging while on cooldown
        if (this.player.digCooldown > 0) return;

        // Play dig sound
        if (this.soundManager) {
            this.soundManager.play('dig');
        }
        // Set dig cooldown
        this.player.digCooldown = 0.5;
        
        // Position to dig (in front of player at ground level)
        const digX = this.player.x + (this.player.facingRight ? this.player.width : -this.tileSize);
        const digY = this.player.y + this.player.height - 5; // At player's feet
        
        // Check if we can dig here (must be on a platform)
        let canDigHere = false;
        let platformY = 0;
        
        for (const platform of this.platforms) {
            // Check if player is standing on this platform
            if (Math.abs((this.player.y + this.player.height) - platform.y) < 5 &&
                digX >= platform.x && digX <= platform.x + platform.width) {
                canDigHere = true;
                platformY = platform.y;
                break;
            }
        }
        
        if (!canDigHere) {
            // Can't dig in mid-air
            this.createParticles(digX, digY, 3, '#8B4513');
            return;
        }
        
        // Create a hole
        this.holes.push({
            x: digX,
            y: platformY,
            width: this.tileSize,
            height: this.tileSize,
            timer: 4.0, // Hole lasts 4 seconds
            active: true,
            filledByEnemy: false
        });
        
        // Remove any brick at that location
        for (let i = this.bricks.length - 1; i >= 0; i--) {
            const brick = this.bricks[i];
            if (brick.destructible && 
                digX >= brick.x && digX <= brick.x + brick.width &&
                digY >= brick.y && digY <= brick.y + brick.height) {
                
                this.bricks.splice(i, 1);
                break;
            }
        }
        
        // Create particle effect
        this.createParticles(
            digX + this.tileSize/2, 
            platformY + this.tileSize/2, 
            15, 
            '#8B4513'
        );
        
        console.log(`Created hole at (${Math.floor(digX)}, ${platformY})`);
    }

    playerHit() {
        // Don't get hit while recently hit (invincibility frames)
        if (this.player.invincibleTimer > 0) return;

         // Play hit sound
        if (this.soundManager) {
            this.soundManager.play('hit');
        }
        
        // Reduce lives
        GameState.lives--;
        document.getElementById('lives').textContent = GameState.lives;
        
        // Set invincibility timer (1 second)
        this.player.invincibleTimer = 1.0;
        
        // Reset player position
        const design = this.levelDesigns[this.level];
        this.player.x = design.start.x * this.tileSize;
        this.player.y = design.start.y * this.tileSize;
        this.player.velocityX = 0;
        this.player.velocityY = 0;
        
        // Visual feedback (red particles)
        this.createParticles(
            this.player.x + this.player.width/2, 
            this.player.y + this.player.height/2, 
            15, 
            '#FF416C'
        );
        
        // Game over check
        if (GameState.lives <= 0) {
            setTimeout(() => this.gameOver(), 500);
        }
        
        console.log(`Player hit! Lives: ${GameState.lives}`);
    }
    
    checkCollisions() {
        // Gold collection
        for (let i = 0; i < this.gold.length; i++) {
            const goldPiece = this.gold[i];
            if (!goldPiece.collected && this.isColliding(this.player, goldPiece)) {
                goldPiece.collected = true;
                GameState.goldCollected++;
                GameState.score += 50;
                
                // Play gold collection sound
                if (this.soundManager) {
                    this.soundManager.play('gold');
                }
                
                document.getElementById('gold-count').textContent = GameState.goldCollected;
                document.getElementById('current-score').textContent = GameState.score;
                
                // Ask question when gold is collected
                this.askQuestion();
                
                // Visual feedback
                this.createParticles(goldPiece.x + goldPiece.width/2, goldPiece.y + goldPiece.height/2, 10, '#FFD700');
                
                // Check if ALL gold collected - but DON'T show success yet
                if (GameState.goldCollected >= this.levelDesigns[this.level].totalGold) {
                    // Set a flag to show success after question is answered
                    this.allGoldCollected = true;
                    
                    // Play special sound for last gold
                    if (this.soundManager) {
                        this.soundManager.play('allGold');
                    }
                }
                break;
            }
        }
    
        // ENEMY COLLISION - Only check if enemy is NOT trapped
        if (this.player.invincibleTimer <= 0) {
            for (const enemy of this.enemies) {
                if (!enemy.trapped && this.isColliding(this.player, enemy)) {
                    this.playerHit();
                    break; // Only one hit per frame
                }
            }
        }
    }


     
    askQuestion() {
        if (this.gameState !== 'playing') return;
        // Pause main BGM when question appears
        if (this.soundManager) {
            this.soundManager.pauseBGM();
        }
        
        this.gameState = 'paused';
        this.currentQuestion = getRandomQuestion(this.level);
        
        if (!this.currentQuestion) {
            console.error('No questions available for this level');
            this.gameState = 'playing';
            return;
        }
        
        GameState.currentQuestion = this.currentQuestion;
        
        // Update question modal
        document.getElementById('question-title').textContent = `Level ${this.level} Question`;
        document.getElementById('question-text').textContent = this.currentQuestion.question;
        document.getElementById('bloom-badge').textContent = `Bloom Level ${this.level}`;
        
        // Clear previous options
        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';
        
        // Add new options
        const letters = ['A', 'B', 'C', 'D'];
        this.currentQuestion.options.forEach((option, index) => {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'option-btn';
            optionBtn.innerHTML = `
                <span class="option-letter">${letters[index]}</span>
                <span class="option-text">${option}</span>
            `;
            optionBtn.addEventListener('click', () => {
                // Remove selected class from all options
                document.querySelectorAll('.option-btn').forEach(btn => {
                    btn.classList.remove('selected');
                });
                // Add selected class to clicked option
                optionBtn.classList.add('selected');
                GameState.selectedAnswer = index;
                document.getElementById('submit-answer').disabled = false;
            });
            optionsContainer.appendChild(optionBtn);
        });
        
        // Reset hint
        document.getElementById('hint-area').style.display = 'none';
        document.getElementById('submit-answer').disabled = true;
        
        // Show modal
        this.showModal('question-modal');
    }

    submitAnswer() {
        if (GameState.selectedAnswer === null) return;
        
        const isCorrect = GameState.selectedAnswer === GameState.currentQuestion.correctAnswer;
        
        // Play answer feedback sound
        if (this.soundManager) {
            if (isCorrect) {
                this.soundManager.play('correct');
            } else {
                this.soundManager.play('wrong');
            }
        }
        
        GameState.totalQuestionsAnswered++;
        
        // Calculate score
        let pointsEarned = isCorrect ? GameState.currentQuestion.points : -25;
        let timeBonus = 0;
        
        if (isCorrect) {
            GameState.correctAnswers++;
            GameState.knowledge[`level${this.level}`] = 
                Math.min(100, (GameState.knowledge[`level${this.level}`] || 0) + 20);
            timeBonus = Math.max(0, 50 - Math.floor(this.gameTime % 60));
            pointsEarned += timeBonus;
            GameState.score += pointsEarned;
        } else {
            GameState.score += pointsEarned;
        }
        
        GameState.levelScores[this.level] = (GameState.levelScores[this.level] || 0) + pointsEarned;
        
        // Update feedback modal
        document.getElementById('feedback-title').textContent = 
            isCorrect ? 'Correct!' : 'Incorrect';
        
        document.getElementById('feedback-icon').innerHTML = isCorrect ?
            '<i class="fas fa-check-circle correct-icon"></i>' :
            '<i class="fas fa-times-circle incorrect-icon"></i>';
        
        document.getElementById('feedback-text').textContent = isCorrect ?
            `Great job! You earned ${pointsEarned} points.` :
            'Better luck next time! Learn from the explanation below.';
        
        document.getElementById('explanation').innerHTML = `
            <strong>Explanation:</strong> ${GameState.currentQuestion.explanation}<br>
            <strong>Topic:</strong> ${GameState.currentQuestion.topic}
        `;
        
        const scoreChangeEl = document.getElementById('score-change');
        scoreChangeEl.textContent = (pointsEarned >= 0 ? '+' : '') + pointsEarned;
        scoreChangeEl.className = pointsEarned >= 0 ? 'positive-score' : 'negative-score';
        
        // Update UI
        updateUI();
        document.getElementById('current-score').textContent = GameState.score;
        
        // Check if this was the last gold's question AND answer was correct
        if (this.allGoldCollected && isCorrect) {
            // Update feedback to show level completion
            document.getElementById('feedback-title').textContent = 'Level Complete!';
            document.getElementById('feedback-text').textContent = 
                `Perfect! You answered correctly and completed the level!`;
            
            // Add level completion message to explanation
            document.getElementById('explanation').innerHTML += 
                '<br><br><strong>🎉 Level Complete! 🎉</strong>';
        }
        
        // Show feedback and hide question
        this.hideModal('question-modal');
            // --- ADD THESE LINES TO RESUME GAMEPLAY IMMEDIATELY ---
        this.gameState = 'playing';
        this.lastTime = Date.now(); // Important: Reset time to prevent physics glitches (jumping)

            if (this.soundManager) {
            this.soundManager.resumeBGM();
        }
        
        // If all gold collected AND answer was correct, show level success
        if (this.allGoldCollected && isCorrect) {
            // Delay slightly to let feedback modal close
            setTimeout(() => {
                this.levelComplete();
            }, 100);
        }
        
        // Reset for next question
        GameState.selectedAnswer = null;
        GameState.currentQuestion = null;
    }

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

    skipQuestion() {
        GameState.score -= 50;
        if (GameState.score < 0) GameState.score = 0;
        
        document.getElementById('current-score').textContent = GameState.score;
        updateUI();
        
        this.hideModal('question-modal');
        this.gameState = 'playing';
        
        // If all gold was collected but question was skipped,
        // we still need to check level completion
        if (this.allGoldCollected) {
            // Even if skipped, level is complete (player collected all gold)
            setTimeout(() => {
                this.levelComplete();
            }, 100);
        }
        
        // Resume BGM since question was skipped
        if (this.soundManager) {
            this.soundManager.resumeBGM();
        }
    }

    levelComplete() {
        // Reset the flag
        this.allGoldCollected = false;
        
        this.gameState = 'gameOver';
        
        // Play stage clear sound
        if (this.soundManager) {
            this.soundManager.stopBGM(); // Stop main BGM
            this.soundManager.play('stageClear');
        }
        
        // Calculate final score with time bonus
        const timeBonus = Math.max(0, 1000 - Math.floor(this.gameTime * 10));
        const completionBonus = 500;
        const totalBonus = timeBonus + completionBonus;
        
        GameState.score += totalBonus;
        GameState.levelScores[this.level] = (GameState.levelScores[this.level] || 0) + totalBonus;
        
        // Update game over screen
        document.getElementById('final-score').textContent = GameState.score;
        document.getElementById('questions-correct').textContent = 
            `${GameState.correctAnswers}/${GameState.totalQuestionsAnswered}`;
        document.getElementById('time-taken').textContent = `${Math.floor(this.gameTime)}s`;
        
        const knowledgePercent = calculateKnowledgePercentage();
        document.getElementById('knowledge-gained').style.width = `${knowledgePercent}%`;
        document.getElementById('knowledge-percent').textContent = `${knowledgePercent}%`;
        
        // Update Bloom's progress grid
        const progressGrid = document.querySelector('.progress-grid');
        progressGrid.innerHTML = '';
        
        for (let i = 1; i <= 5; i++) {
            const knowledge = GameState.knowledge[`level${i}`] || 0;
            const progressItem = document.createElement('div');
            progressItem.className = 'progress-item';
            progressItem.innerHTML = `
                <div class="progress-info">
                    <span>Level ${i}</span>
                    <span>${knowledge}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${knowledge}%"></div>
                </div>
            `;
            progressGrid.appendChild(progressItem);
        }
        
        // Show next level button only if not max level
        document.getElementById('next-level').style.display = 
            GameState.currentLevel < 5 ? 'flex' : 'none';
        
        this.showScreen('game-over-screen');
        saveGameProgress();
    }

    gameOver() {
            // Play game over sound
        if (this.soundManager) {
            this.soundManager.stopBGM(); // Stop main BGM
            this.soundManager.play('gameOver');
        }
        alert('Game Over! Try again.');
        this.startGame(); // Restart current level
    }

    togglePause() {
        if (this.gameState === 'playing') {
            this.gameState = 'paused';
            document.getElementById('pause-game').innerHTML = '<i class="fas fa-play"></i> Resume';
        } else if (this.gameState === 'paused') {
            this.gameState = 'playing';
            this.lastTime = Date.now(); // Reset delta time
            document.getElementById('pause-game').innerHTML = '<i class="fas fa-pause"></i> Pause';
        }
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
        this.gameState = screenId === 'game-screen' ? 'playing' : 'menu';

        // Handle sound based on screen
        if (this.soundManager) {
            if (screenId === 'start-screen') {
                this.soundManager.playBGM('title');
            } else if (screenId === 'game-screen') {
                // BGM already handled in startGame()
            } else if (screenId === 'game-over-screen') {
                // Already handled in levelComplete()
            }
        }
    }

    showModal(modalId) {
        document.getElementById(modalId).classList.add('active');
    }

    hideModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
        if (modalId === 'feedback-modal') {
            this.gameState = 'playing';
            // Resume main BGM after question is answered
            if (this.soundManager && this.gameState === 'playing') {
                this.soundManager.resumeBGM();
            }
        }
    }

    createParticles(x, y, count, color) {
        // Simple particle effect
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const particle = {
                    x: x,
                    y: y,
                    vx: (Math.random() - 0.5) * 10,
                    vy: (Math.random() - 0.5) * 10,
                    life: 1,
                    color: color
                };
                
                // Animate particle
                const animate = () => {
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    particle.life -= 0.02;
                    
                    if (particle.life > 0) {
                        requestAnimationFrame(animate);
                    }
                };
                animate();
            }, i * 30);
        }
    }

    isColliding(a, b) {
        return a.x < b.x + b.width &&
               a.x + a.width > b.x &&
               a.y < b.y + b.height &&
               a.y + a.height > b.y;
    }

    render() {
        // Clear canvas
        this.ctx.fillStyle = '#0a1929';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw platforms
        this.ctx.fillStyle = '#2c5364';
        this.platforms.forEach(platform => {
            this.ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
            
            // Platform texture
            this.ctx.strokeStyle = '#203a43';
            this.ctx.lineWidth = 2;
            for (let i = 0; i < platform.width; i += 10) {
                this.ctx.beginPath();
                this.ctx.moveTo(platform.x + i, platform.y);
                this.ctx.lineTo(platform.x + i, platform.y + platform.height);
                this.ctx.stroke();
            }
        });
        
        // Draw ladders
        this.ctx.fillStyle = '#8B4513';
        this.ladders.forEach(ladder => {
            this.ctx.fillRect(ladder.x + 10, ladder.y, 12, ladder.height);
            
            // Ladder rungs
            this.ctx.fillStyle = '#A0522D';
            for (let y = ladder.y + 10; y < ladder.y + ladder.height; y += 20) {
                this.ctx.fillRect(ladder.x, y, 32, 5);
            }
            this.ctx.fillStyle = '#8B4513';
        });
        
        // Draw bricks
        this.bricks.forEach(brick => {
            if (brick.destructible) {
                this.ctx.fillStyle = brick.health === 3 ? '#C14444' : 
                                   brick.health === 2 ? '#D16B6B' : '#E19292';
            } else {
                this.ctx.fillStyle = '#666';
            }
            
            this.ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
            
            // Brick texture
            this.ctx.strokeStyle = brick.destructible ? '#A33A3A' : '#555';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
            
            // Crack effect for damaged bricks
            if (brick.destructible && brick.health < 3) {
                this.ctx.strokeStyle = '#000';
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.moveTo(brick.x + 5, brick.y + 5);
                this.ctx.lineTo(brick.x + brick.width - 5, brick.y + brick.height - 5);
                this.ctx.stroke();
                
                if (brick.health === 1) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(brick.x + brick.width - 5, brick.y + 5);
                    this.ctx.lineTo(brick.x + 5, brick.y + brick.height - 5);
                    this.ctx.stroke();
                }
            }
        });
        
        // Draw holes
        this.holes.forEach(hole => {
            if (hole.active) {
                // Draw as dark rectangle (hole)
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
                this.ctx.fillRect(hole.x, hole.y, hole.width, hole.height);
                
                // Draw crumbling edges
                this.ctx.strokeStyle = '#8B4513';
                this.ctx.lineWidth = 3;
                this.ctx.strokeRect(hole.x, hole.y, hole.width, hole.height);
            } else if (hole.filledByEnemy) {
                // Hole with trapped enemy
                this.ctx.fillStyle = 'rgba(139, 69, 19, 0.6)';
                this.ctx.fillRect(hole.x, hole.y, hole.width, hole.height);
                
                // Draw struggling enemy in hole
                this.ctx.fillStyle = '#FF416C';
                this.ctx.fillRect(hole.x + 5, hole.y + 5, hole.width - 10, 10);
                
                this.ctx.fillStyle = '#000';
                this.ctx.fillRect(hole.x + 10, hole.y + 7, 4, 4); // Eye
            }
        });
        
        // Draw gold
        this.gold.forEach(goldPiece => {
            if (!goldPiece.collected) {
                // Pulsing gold animation
                const scale = 0.8 + Math.sin(goldPiece.animation) * 0.2;
                const size = goldPiece.width * scale;
                
                // Gold gradient
                const gradient = this.ctx.createRadialGradient(
                    goldPiece.x + goldPiece.width/2,
                    goldPiece.y + goldPiece.height/2,
                    0,
                    goldPiece.x + goldPiece.width/2,
                    goldPiece.y + goldPiece.height/2,
                    size/2
                );
                gradient.addColorStop(0, '#FFD700');
                gradient.addColorStop(0.7, '#FFA500');
                gradient.addColorStop(1, '#FF8C00');
                
                this.ctx.fillStyle = gradient;
                this.ctx.beginPath();
                this.ctx.arc(
                    goldPiece.x + goldPiece.width/2,
                    goldPiece.y + goldPiece.height/2,
                    size/2,
                    0,
                    Math.PI * 2
                );
                this.ctx.fill();
                
                // Radiation symbol on gold
                this.ctx.fillStyle = '#FF4500';
                this.ctx.font = 'bold 16px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText('☢', 
                    goldPiece.x + goldPiece.width/2, 
                    goldPiece.y + goldPiece.height/2);
            }
        });
        
        // Draw enemies
        this.enemies.forEach(enemy => {
            if (enemy.trapped) {
                // Trapped enemy (already drawn in hole)
                return;
            }
            
            // Enemy body
            this.ctx.fillStyle = '#FF416C';
            this.ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
            
            // Enemy face
            this.ctx.fillStyle = '#000';
            this.ctx.fillRect(enemy.x + 8, enemy.y + 10, 6, 6); // Left eye
            this.ctx.fillRect(enemy.x + enemy.width - 14, enemy.y + 10, 6, 6); // Right eye
            this.ctx.fillRect(enemy.x + 10, enemy.y + 20, enemy.width - 20, 3); // Mouth
            
            // Radiation symbol on enemy
            this.ctx.fillStyle = '#FFF';
            this.ctx.font = 'bold 14px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('☢', enemy.x + enemy.width/2, enemy.y + enemy.height - 8);
        });
        
        // Draw player
        if (this.player) {
            // Player body
            this.ctx.fillStyle = '#00c9ff';
            this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
            
            // Player face
            this.ctx.fillStyle = '#000';
            const eyeOffset = this.player.facingRight ? 8 : this.player.width - 14;
            this.ctx.fillRect(this.player.x + eyeOffset, this.player.y + 10, 6, 6); // Eye
            
            // Player helmet (science theme)
            this.ctx.fillStyle = '#0072ff';
            this.ctx.fillRect(this.player.x, this.player.y, this.player.width, 8);
            
            // Radiation symbol on player
            this.ctx.fillStyle = '#92fe9d';
            this.ctx.font = 'bold 16px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText('⚛', 
                this.player.x + this.player.width/2, 
                this.player.y + this.player.height/2 + 5);
            
            // Digging animation
            if (this.player.digCooldown > 0) {
                const digX = this.player.x + (this.player.facingRight ? this.player.width : -10);
                const digY = this.player.y + this.player.height/2;
                
                this.ctx.fillStyle = `rgba(139, 69, 19, ${this.player.digCooldown * 2})`;
                this.ctx.beginPath();
                this.ctx.arc(digX, digY, 15 * this.player.digCooldown, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
        
        // Draw game state overlay
        if (this.gameState === 'paused' && !document.querySelector('.modal.active')) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.ctx.fillStyle = '#00c9ff';
            this.ctx.font = 'bold 48px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText('PAUSED', this.canvas.width/2, this.canvas.height/2);
            
            this.ctx.font = '24px Arial';
            this.ctx.fillText('Press ESC to resume', this.canvas.width/2, this.canvas.height/2 + 50);
        }
    }
}

// Initialize game when page loads
window.addEventListener('load', () => {
    const game = new RadioactivityRunner();
});
