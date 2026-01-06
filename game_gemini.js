// game.js - Refactored Engine
class RadioactivityRunner {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Game State
        this.gameState = 'menu';
        this.level = 1;
        this.tileSize = 32;
        this.gridWidth = Math.floor(this.canvas.width / this.tileSize);
        this.gridHeight = Math.floor(this.canvas.height / this.tileSize);
        
        // Entities
        this.player = null;
        this.enemies = [];
        this.gold = [];
        this.platforms = [];
        this.ladders = [];
        this.bricks = [];
        this.holes = []; 
        this.particles = [];
        
        // Input & Timing
        this.keys = {};
        this.gameTime = 0;
        this.lastTime = 0;
        this.allGoldCollected = false;
        
        // Initialize
        this.init();
    }

    init() {
        // Global helpers (from questions.js)
        if(typeof loadGameProgress === 'function') loadGameProgress();
        if(typeof updateUI === 'function') updateUI();

        // Managers
        this.soundManager = (typeof soundManager !== 'undefined') ? soundManager : null;
        this.inputHandler = new GameInputHandler(this);
        this.inputHandler.setupEventListeners();
        
        // Make accessible globally for debugging/UI
        window.gameInstance = this;

        // Start Loop
        this.gameLoop();
        this.showScreen('start-screen');
    }

    startGame() {
        this.level = GameState.currentLevel;
        const design = LevelData[this.level]; // Uses levels.js
        
        if(!design) { console.error("Level data missing!"); return; }

        this.allGoldCollected = false;
        if (this.soundManager) {
            this.soundManager.play('stageStart');
            setTimeout(() => this.soundManager.playBGM('mainBGM'), 1500);
        }

        // Reset Player
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

        // Build Level
        this.platforms = design.platforms.map(p => ({
            x: p.x * this.tileSize, y: p.y * this.tileSize,
            width: p.width * this.tileSize, height: p.height * this.tileSize
        }));

        this.ladders = design.ladders.map(l => ({
            x: l.x * this.tileSize, y: l.y * this.tileSize,
            width: this.tileSize, height: l.height * this.tileSize
        }));

        this.gold = design.gold.map(g => ({
            x: g.x * this.tileSize, y: g.y * this.tileSize,
            width: this.tileSize * 0.6, height: this.tileSize * 0.6,
            collected: false, animation: 0
        }));

        this.enemies = design.enemies.map(e => ({
            x: e.x * this.tileSize, y: e.y * this.tileSize,
            width: this.tileSize * 0.8, height: this.tileSize * 0.9,
            patrolLeft: e.patrol.left * this.tileSize,
            patrolRight: e.patrol.right * this.tileSize,
            direction: 1, speed: 1, isFalling: false,
            trapped: false, trapTimer: 0, originalY: e.y * this.tileSize
        }));

        this.bricks = design.bricks.map(b => ({
            x: b.x * this.tileSize, y: b.y * this.tileSize,
            width: this.tileSize, height: this.tileSize,
            destructible: b.destructible, health: b.destructible ? 3 : 100
        }));

        this.holes = [];
        this.particles = [];

        // Reset Stats
        GameState.goldCollected = 0;
        GameState.lives = 3;
        this.gameState = 'playing';
        this.gameTime = 0;
        this.lastTime = Date.now();
        
        // UI Updates
        document.getElementById('gold-count').textContent = '0';
        document.getElementById('gold-total').textContent = design.totalGold;
        document.getElementById('lives').textContent = GameState.lives;
        
        this.showScreen('game-screen');
    }

    gameLoop() {
        const currentTime = Date.now();
        const deltaTime = Math.min((currentTime - this.lastTime) / 1000, 0.1);
        this.lastTime = currentTime;

        if (this.gameState === 'playing') {
            this.gameTime += deltaTime;
            this.update(deltaTime);
        }

        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }

    update(deltaTime) {
        this.updatePlayer(deltaTime);
        this.updateEnemies(deltaTime);
        this.updateHoles(deltaTime); // Critical logic from game_old.js
        
        // Gold Animation
        this.gold.forEach(g => {
            if (!g.collected) g.animation = (g.animation + deltaTime * 5) % (Math.PI * 2);
        });

        // Dig Cooldown
        if (this.player.digCooldown > 0) this.player.digCooldown -= deltaTime;
        
        this.checkCollisions();
        
        // Win Condition
        if (GameState.goldCollected >= LevelData[this.level].totalGold) {
            this.levelComplete();
        }
    }

    // --- PHYSICS & MOVEMENT (From game_old.js) ---

    updatePlayer(deltaTime) {
        if (this.player.invincibleTimer > 0) this.player.invincibleTimer -= deltaTime;
        
        // Horizontal
        this.player.velocityX = 0;
        if (this.keys['ArrowLeft'] || this.keys['a']) {
            this.player.velocityX = -this.player.speed;
            this.player.facingRight = false;
        }
        if (this.keys['ArrowRight'] || this.keys['d']) {
            this.player.velocityX = this.player.speed;
            this.player.facingRight = true;
        }

        // Ladder Logic
        this.player.isClimbing = false;
        for (const ladder of this.ladders) {
            if (this.isColliding(this.player, ladder) && 
                (this.keys['ArrowUp'] || this.keys['w'] || this.keys['ArrowDown'] || this.keys['s'])) {
                this.player.isClimbing = true;
                this.player.isOnGround = true;
                this.player.velocityY = 0;
                
                if (this.keys['ArrowUp'] || this.keys['w']) this.player.y -= this.player.speed;
                if (this.keys['ArrowDown'] || this.keys['s']) this.player.y += this.player.speed;
                break;
            }
        }

        // Gravity
        if (!this.player.isClimbing) {
            this.player.velocityY += 0.5;
            this.player.velocityY = Math.min(this.player.velocityY, 15);
        }

        // Jump
        if ((this.keys['ArrowUp'] || this.keys['w']) && this.player.isOnGround && !this.player.isClimbing) {
            this.player.velocityY = this.player.jumpForce;
            this.player.isOnGround = false;
        }

        this.player.x += this.player.velocityX;
        this.player.y += this.player.velocityY;

        // Bounds
        this.player.x = Math.max(0, Math.min(this.canvas.width - this.player.width, this.player.x));
        if (this.player.y > this.canvas.height) this.gameOver();

        // Platform Collisions
        this.player.isOnGround = false;
        const obstacles = [...this.platforms, ...this.bricks];
        
        for (const obs of obstacles) {
            if (this.isHoleAt(obs.x, obs.y)) continue; // Don't collide with holes

            if (this.isColliding(this.player, obs)) {
                if (this.player.velocityY > 0 && this.player.y + this.player.height > obs.y && this.player.y + this.player.height - this.player.velocityY <= obs.y + 10) {
                    this.player.y = obs.y - this.player.height;
                    this.player.velocityY = 0;
                    this.player.isOnGround = true;
                } else if (this.player.velocityY < 0 && this.player.y < obs.y + obs.height) {
                    this.player.y = obs.y + obs.height;
                    this.player.velocityY = 0;
                } else if (this.player.velocityX !== 0) {
                    // Side collision
                    if (this.player.x < obs.x) this.player.x = obs.x - this.player.width;
                    else this.player.x = obs.x + obs.width;
                }
            }
        }
    }

    updateEnemies(deltaTime) {
        this.enemies.forEach(enemy => {
            if (enemy.trapped) {
                enemy.trapTimer -= deltaTime;
                if (enemy.trapTimer <= 0) {
                    enemy.trapped = false; // Escape
                    enemy.y = enemy.originalY;
                }
                return;
            }

            enemy.x += enemy.direction * enemy.speed;
            if (enemy.x <= enemy.patrolLeft) enemy.direction = 1;
            if (enemy.x + enemy.width >= enemy.patrolRight) enemy.direction = -1;

            // Gravity for enemies
            enemy.isFalling = true;
            for (const p of [...this.platforms, ...this.bricks]) {
                if (!this.isHoleAt(p.x, p.y) && this.isColliding(enemy, p) && enemy.y + enemy.height <= p.y + 5) {
                    enemy.y = p.y - enemy.height;
                    enemy.isFalling = false;
                    break;
                }
            }
            if (enemy.isFalling) enemy.y += 5;

            // Player Hit
            if (!this.player.invincibleTimer && this.isColliding(this.player, enemy)) {
                this.playerHit();
            }
        });
    }

    updateHoles(deltaTime) {
        for (let i = this.holes.length - 1; i >= 0; i--) {
            const hole = this.holes[i];
            hole.timer -= deltaTime;
            
            if (hole.active) {
                for (const enemy of this.enemies) {
                    if (!enemy.trapped && this.isEnemyOverHole(enemy, hole)) {
                        enemy.trapped = true;
                        enemy.trapTimer = 3.0;
                        hole.active = false;
                        hole.filledByEnemy = true;
                        if(this.soundManager) this.soundManager.play('miss'); // Or trap sound
                        break;
                    }
                }
            }
            
            if (hole.timer <= 0) this.holes.splice(i, 1);
        }
    }

    // --- ACTIONS ---

    playerDig() {
        if (this.player.digCooldown > 0) return;
        
        if (this.soundManager) this.soundManager.play('dig');
        this.player.digCooldown = 0.5;
        
        const digX = this.player.x + (this.player.facingRight ? this.player.width : -this.tileSize);
        const digY = this.player.y + this.player.height - 5;
        
        // Find brick to dig
        const brickIndex = this.bricks.findIndex(b => 
            b.destructible &&
            digX >= b.x && digX <= b.x + b.width &&
            Math.abs(b.y - (this.player.y + this.player.height)) < 10
        );

        if (brickIndex !== -1) {
            const b = this.bricks[brickIndex];
            this.holes.push({
                x: b.x, y: b.y, width: this.tileSize, height: this.tileSize,
                timer: 4.0, active: true, filledByEnemy: false
            });
            this.createParticles(b.x + b.width/2, b.y + b.height/2, 5, '#8B4513');
        } else {
            // Miss particles
            this.createParticles(digX, digY, 3, '#8B4513');
        }
    }

    checkCollisions() {
        this.gold.forEach(g => {
            if (!g.collected && this.isColliding(this.player, g)) {
                g.collected = true;
                GameState.score += 100;
                GameState.goldCollected++;
                document.getElementById('gold-count').textContent = GameState.goldCollected;
                if (this.soundManager) this.soundManager.play('gold');
            }
        });
    }

    // --- UTILS ---

    isColliding(a, b) {
        return a.x < b.x + b.width && a.x + a.width > b.x &&
               a.y < b.y + b.height && a.y + a.height > b.y;
    }

    isEnemyOverHole(enemy, hole) {
        return enemy.x + enemy.width > hole.x && enemy.x < hole.x + hole.width &&
               enemy.y + enemy.height > hole.y && Math.abs((enemy.y + enemy.height) - hole.y) < 10;
    }

    isHoleAt(x, y) {
        return this.holes.some(h => h.x === x && h.y === y);
    }

    playerHit() {
        if (this.soundManager) this.soundManager.play('hit');
        GameState.lives--;
        document.getElementById('lives').textContent = GameState.lives;
        this.player.invincibleTimer = 2.0;
        
        if (GameState.lives <= 0) this.gameOver();
    }

    createParticles(x, y, count, color) {
        // Implementation for visual flair
        // (Simplified for brevity as it wasn't in the snippet, but prevents crash)
    }

    showScreen(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    }

    togglePause() {
        if(this.gameState === 'playing') {
            this.gameState = 'paused';
            if(this.soundManager) this.soundManager.pauseBGM();
        } else if (this.gameState === 'paused') {
            this.gameState = 'playing';
            this.lastTime = Date.now();
            if(this.soundManager) this.soundManager.resumeBGM();
        }
    }

    // --- RENDERING ---
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Bricks & Platforms
        this.ctx.fillStyle = '#8B4513';
        this.bricks.forEach(b => {
            if (!this.isHoleAt(b.x, b.y)) this.ctx.fillRect(b.x, b.y, b.width, b.height);
        });
        
        this.ctx.fillStyle = '#666';
        this.platforms.forEach(p => this.ctx.fillRect(p.x, p.y, p.width, p.height));

        // Ladders
        this.ctx.fillStyle = '#FFD700';
        this.ladders.forEach(l => {
            this.ctx.fillRect(l.x, l.y, 2, l.height);
            this.ctx.fillRect(l.x + l.width - 2, l.y, 2, l.height);
            for(let y = l.y; y < l.y + l.height; y += 8) this.ctx.fillRect(l.x, y, l.width, 2);
        });

        // Holes (Dark circle)
        this.ctx.fillStyle = '#000';
        this.holes.forEach(h => {
            this.ctx.beginPath();
            this.ctx.arc(h.x + h.width/2, h.y + h.height/2, 12, 0, Math.PI*2);
            this.ctx.fill();
        });

        // Gold
        this.ctx.fillStyle = '#FFD700';
        this.gold.forEach(g => {
            if(!g.collected) {
                this.ctx.beginPath();
                this.ctx.arc(g.x + g.width/2, g.y + g.height/2, 8, 0, Math.PI*2);
                this.ctx.fill();
            }
        });

        // Enemies
        this.ctx.fillStyle = 'red';
        this.enemies.forEach(e => {
            this.ctx.fillRect(e.x, e.y, e.width, e.height);
        });

        // Player
        if(this.player) {
            this.ctx.fillStyle = this.player.invincibleTimer > 0 ? '#ccffcc' : '#00ff00';
            this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
            
            // Dig Animation
            if(this.player.digCooldown > 0) {
                const digX = this.player.x + (this.player.facingRight ? this.player.width : -10);
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                this.ctx.beginPath();
                this.ctx.arc(digX, this.player.y + this.player.height/2, 10, 0, Math.PI*2);
                this.ctx.fill();
            }
        }
    }
    
    // Add missing methods
    gameOver() {
        if(this.soundManager) this.soundManager.play('gameOver');
        alert("Game Over");
        this.showScreen('start-screen');
    }
    
    levelComplete() {
        if(this.soundManager) this.soundManager.play('stageClear');
        alert("Level Complete!");
        if (GameState.currentLevel < 5) {
            GameState.currentLevel++;
            this.startGame();
        } else {
            this.showScreen('start-screen');
        }
    }
    
    // Methods for modal support
    submitAnswer() { /* Copied logic if needed, or rely on questions.js to handle logic */ }
    useHint() { /* ... */ }
    skipQuestion() { /* ... */ }
    hideModal(id) { document.getElementById(id).style.display = 'none'; this.togglePause(); }
}

// Auto-start
window.addEventListener('load', () => {
    new RadioactivityRunner();
});
