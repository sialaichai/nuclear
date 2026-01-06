// core/CollisionSystem.js
class CollisionSystem {
    constructor(gameEngine, questionManager) {
        this.gameEngine = gameEngine;
        this.questionManager = questionManager;
    }
    
    // Check all collisions
    checkAll() {
        this.checkGoldCollisions();
        this.checkEnemyCollisions();
    }
    
    // Check gold collection
    checkGoldCollisions() {
        const player = this.gameEngine.player;
        
        for (let i = 0; i < this.gameEngine.gold.length; i++) {
            const goldPiece = this.gameEngine.gold[i];
            
            if (!goldPiece.collected && this.isColliding(player, goldPiece)) {
                this.collectGold(goldPiece, i);
                break;
            }
        }
    }
    
    // Collect gold piece
    collectGold(goldPiece, index) {
        goldPiece.collected = true;
        GameState.goldCollected++;
        GameState.score += 50;
        
        // Update UI
        document.getElementById('gold-count').textContent = GameState.goldCollected;
        document.getElementById('current-score').textContent = GameState.score;
        
        // Play sound
        if (this.gameEngine.soundManager) {
            this.gameEngine.soundManager.play('gold');
        }
        
        // Ask question
        if (this.questionManager) {
            this.questionManager.askQuestion(this.gameEngine.level);
        }
        
        // Check if all gold collected
        if (GameState.goldCollected >= this.gameEngine.gold.length) {
            if (this.gameEngine.soundManager) {
                this.gameEngine.soundManager.play('allGold');
            }
            this.questionManager.markAllGoldCollected();
        }
        
        // Create visual effect
        if (this.gameEngine.particleSystem) {
            this.gameEngine.particleSystem.createParticles(
                goldPiece.x + goldPiece.width/2,
                goldPiece.y + goldPiece.height/2,
                10,
                '#FFD700'
            );
        }
    }
    
    // Check enemy collisions
    checkEnemyCollisions() {
        const player = this.gameEngine.player;
        if (player.invincibleTimer > 0) return;
        
        for (const enemy of this.gameEngine.enemies) {
            if (!enemy.trapped && this.isColliding(player, enemy)) {
                this.handlePlayerHit();
                break;
            }
        }
    }
    
    // Handle player being hit
    handlePlayerHit() {
        const player = this.gameEngine.player;
        
        if (!player.hit()) return; // Check invincibility
        
        GameState.lives--;
        document.getElementById('lives').textContent = GameState.lives;
        
        // Play hit sound
        if (this.gameEngine.soundManager) {
            this.gameEngine.soundManager.play('hit');
        }
        
        // Reset player position
        this.resetPlayerPosition();
        
        // Create hit particles
        if (this.gameEngine.particleSystem) {
            this.gameEngine.particleSystem.createParticles(
                player.x + player.width/2,
                player.y + player.height/2,
                15,
                '#FF416C'
            );
        }
        
        // Check game over
        if (GameState.lives <= 0) {
            setTimeout(() => this.gameEngine.gameOver(), 500);
        }
    }
    
    // Reset player to start position
    resetPlayerPosition() {
        const player = this.gameEngine.player;
        const levelManager = this.gameEngine.levelManager;
        
        if (levelManager) {
            const design = levelManager.getLevel(this.gameEngine.level);
            if (design && design.start) {
                player.reset(
                    design.start.x * this.gameEngine.tileSize,
                    design.start.y * this.gameEngine.tileSize
                );
            }
        }
    }
    
    // Check collision between two objects
    isColliding(a, b) {
        return a.x < b.x + b.width &&
               a.x + a.width > b.x &&
               a.y < b.y + b.height &&
               a.y + a.height > b.y;
    }
}
