// core/GameEngine.js
class GameEngine {
    constructor(canvas, soundManager) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.soundManager = soundManager;
        
        // Game state
        this.gameState = 'menu'; // menu, playing, paused, gameOver
        this.level = 1;
        this.tileSize = 32;
        this.gridWidth = Math.floor(this.canvas.width / this.tileSize);
        this.gridHeight = Math.floor(this.canvas.height / this.tileSize);
        this.keys = {};
        this.gameTime = 0;
        this.lastTime = 0;
        this.gameLoopId = null;
        
        // Game objects
        this.player = null;
        this.enemies = [];
        this.gold = [];
        this.platforms = [];
        this.ladders = [];
        this.bricks = [];
        this.holes = [];
        
        // External systems
        this.levelManager = null;
        this.collisionSystem = null;
        this.uiManager = null;
        this.questionManager = null;
        this.particleSystem = null;
        
        // Level completion tracking
        this.allGoldCollected = false;
        this.completeLevelAfterQuestion = false;

            // Debug: Log keyboard state
        this.debugKeyboard = false; // Set to true to enable logging
        if (this.debugKeyboard) {
            setInterval(() => {
                const activeKeys = Object.keys(this.keys).filter(k => this.keys[k]);
                if (activeKeys.length > 0) {
                    console.log('Active keys:', activeKeys);
                }
            }, 1000);
        }
    }
    
    // Start the game loop
    start() {
        this.lastTime = Date.now();
        this.gameLoop();
    }
    
    // Stop the game loop
    stop() {
        if (this.gameLoopId) {
            cancelAnimationFrame(this.gameLoopId);
        }
    }
    
    // Main game loop
    gameLoop() {
        const currentTime = Date.now();
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
        
        if (this.gameState === 'playing') {
            this.gameTime += deltaTime;
            this.update(deltaTime);
        }
        
        this.render();
        this.gameLoopId = requestAnimationFrame(() => this.gameLoop());
    }
    
    // Update game state
    update(deltaTime) {
        // Update player
        if (this.player) {
            this.player.update(deltaTime, this.keys, this.platforms, this.ladders);
        }
        
        // Update enemies
        this.enemies.forEach(enemy => {
            if (enemy.update) {
                enemy.update(deltaTime, this.platforms);
            }
        });
        
        // Update gold animations
        this.gold.forEach(g => {
            if (!g.collected) {
                g.animation = (g.animation + deltaTime * 5) % (Math.PI * 2);
            }
        });
        
        // Update dig cooldown
        if (this.player) {
            if (this.player.digCooldown > 0) {
                this.player.digCooldown -= deltaTime;
            }
        }
        
        // Update holes
        this.updateHoles(deltaTime);
        
        // Check collisions
        if (this.collisionSystem) {
            this.collisionSystem.checkAll();
        }
        
        // Check win condition
        if (this.checkWinCondition() && !this.completeLevelAfterQuestion) {
            this.completeLevelAfterQuestion = true;
        }
    }
    
    // Update holes and check for enemy trapping
    updateHoles(deltaTime) {
        for (let i = this.holes.length - 1; i >= 0; i--) {
            const hole = this.holes[i];
            hole.timer -= deltaTime;
            
            // Check if enemies fall into this hole
            if (hole.active) {
                for (const enemy of this.enemies) {
                    if (!enemy.trapped && this.isEnemyOverHole(enemy, hole)) {
                        enemy.trapped = true;
                        enemy.trapTimer = 3.0;
                        hole.active = false;
                        hole.filledByEnemy = true;
                        
                        // Play trap sound if available
                        if (this.soundManager) {
                            // Could add a trap sound effect
                        }
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
    
    // Check if enemy is over a hole
    isEnemyOverHole(enemy, hole) {
        return enemy.x + enemy.width > hole.x &&
               enemy.x < hole.x + hole.width &&
               enemy.y + enemy.height > hole.y &&
               Math.abs((enemy.y + enemy.height) - hole.y) < 10;
    }
    
    // Check if all gold collected
    checkWinCondition() {
        if (!this.gold || this.gold.length === 0) return false;
        
        const collectedGold = this.gold.filter(g => g.collected).length;
        return collectedGold >= this.gold.length;
    }
    
    // Render all game objects
    render() {
        // Clear canvas
        this.ctx.fillStyle = '#0a1929';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid for debugging (optional)
        if (false) {
            this.renderGrid();
        }
        
        // Render game objects in correct order
        this.renderPlatforms();
        this.renderLadders();
        this.renderBricks();
        this.renderHoles();
        this.renderGold();
        this.renderEnemies();
        this.renderPlayer();
        
        // Render paused overlay
        if (this.gameState === 'paused' && !document.querySelector('.modal.active')) {
            this.renderPausedOverlay();
        }
    }
    
    // Render grid for debugging
    renderGrid() {
        this.ctx.strokeStyle = 'rgba(44, 83, 100, 0.3)';
        this.ctx.lineWidth = 1;
        
        // Vertical lines
        for (let x = 0; x <= this.gridWidth; x++) {
            this.ctx.beginPath();
            this.ctx.moveTo(x * this.tileSize, 0);
            this.ctx.lineTo(x * this.tileSize, this.canvas.height);
            this.ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = 0; y <= this.gridHeight; y++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y * this.tileSize);
            this.ctx.lineTo(this.canvas.width, y * this.tileSize);
            this.ctx.stroke();
        }
    }
    
    // Render platforms
    renderPlatforms() {
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
    }
    
    // Render ladders
    renderLadders() {
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
    }
    
    // Render bricks
    renderBricks() {
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
    }
    
    // Render holes
    renderHoles() {
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
                this.ctx.fillRect(hole.x + 10, hole.y + 7, 4, 4);
            }
        });
    }
    
    // Render gold
    renderGold() {
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
    }
    
    // Render enemies
    renderEnemies() {
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
            this.ctx.fillRect(enemy.x + 8, enemy.y + 10, 6, 6);
            this.ctx.fillRect(enemy.x + enemy.width - 14, enemy.y + 10, 6, 6);
            this.ctx.fillRect(enemy.x + 10, enemy.y + 20, enemy.width - 20, 3);
            
            // Radiation symbol on enemy
            this.ctx.fillStyle = '#FFF';
            this.ctx.font = 'bold 14px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('☢', enemy.x + enemy.width/2, enemy.y + enemy.height - 8);
        });
    }
    
    // Render player
    renderPlayer() {
        if (!this.player) return;
        
        // Player body
        this.ctx.fillStyle = '#00c9ff';
        this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
        
        // Player face
        this.ctx.fillStyle = '#000';
        const eyeOffset = this.player.facingRight ? 8 : this.player.width - 14;
        this.ctx.fillRect(this.player.x + eyeOffset, this.player.y + 10, 6, 6);
        
        // Player helmet
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
    
    // Render paused overlay
    renderPausedOverlay() {
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
    
    // Handle keyboard input
    handleKeyDown(key) {
        this.keys[key] = true;
        
        if (key === 'Escape') {
            this.togglePause();
        }
        
        if (key === ' ' && this.gameState === 'playing' && this.player) {
            this.playerDig();
        }
    }
    
    handleKeyUp(key) {
        this.keys[key] = false;
    }
    
    // Player dig action
    playerDig() {
        if (this.player.digCooldown > 0) return;
        
        this.player.digCooldown = 0.5;
        
        // Play dig sound
        if (this.soundManager) {
            this.soundManager.play('dig');
        }
        
        // Position to dig
        const digX = this.player.x + (this.player.facingRight ? this.player.width : -this.tileSize);
        const digY = this.player.y + this.player.height - 5;
        
        // Check if we can dig here (must be on a platform)
        let canDigHere = false;
        let platformY = 0;
        
        for (const platform of this.platforms) {
            if (Math.abs((this.player.y + this.player.height) - platform.y) < 5 &&
                digX >= platform.x && digX <= platform.x + platform.width) {
                canDigHere = true;
                platformY = platform.y;
                break;
            }
        }
        
        if (!canDigHere) {
            // Can't dig in mid-air
            if (this.particleSystem) {
                this.particleSystem.createParticles(digX, digY, 3, '#8B4513');
            }
            return;
        }
        
        // Create a hole
        this.holes.push({
            x: digX,
            y: platformY,
            width: this.tileSize,
            height: this.tileSize,
            timer: 4.0,
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
        if (this.particleSystem) {
            this.particleSystem.createParticles(
                digX + this.tileSize/2, 
                platformY + this.tileSize/2, 
                15, 
                '#8B4513'
            );
        }
    }
    
    // Toggle pause state
    togglePause() {
        if (this.gameState === 'playing') {
            this.gameState = 'paused';
        } else if (this.gameState === 'paused') {
            this.gameState = 'playing';
            this.lastTime = Date.now();
        }
    }
    
    // Set game state
    setGameState(state) {
        this.gameState = state;
    }
    
    // Get game state
    getGameState() {
        return this.gameState;
    }
    
    // Level completion
    levelComplete() {
        this.gameState = 'gameOver';
        this.completeLevelAfterQuestion = false;
        
        // Play stage clear sound
        if (this.soundManager) {
            this.soundManager.stopBGM();
            this.soundManager.play('stageClear');
        }
    }
    
    // Game over
    gameOver() {
        // Play game over sound
        if (this.soundManager) {
            this.soundManager.stopBGM();
            this.soundManager.play('gameOver');
        }
    }

    // In core/GameEngine.js, add to GameEngine class:
    setupNewLevel(player, platforms, ladders, gold, enemies, bricks, level) {
        this.player = player;
        this.platforms = platforms;
        this.ladders = ladders;
        this.gold = gold;
        this.enemies = enemies;
        this.bricks = bricks;
        this.holes = [];
        this.level = level;
        this.allGoldCollected = false;
        this.completeLevelAfterQuestion = false;
        this.gameTime = 0;
        
        // Initialize collision system if needed
        if (!this.collisionSystem && this.questionManager) {
            this.collisionSystem = new CollisionSystem(this, this.questionManager);
        }
    }
}
