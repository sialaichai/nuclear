// core/Player.js
class Player {
    constructor(x, y, tileSize) {
        // Position and size
        this.x = x;
        this.y = y;
        this.width = tileSize * 0.8;
        this.height = tileSize * 0.9;
        
        // Movement
        this.velocityX = 0;
        this.velocityY = 0;
        this.speed = 3;
        this.jumpForce = -12;
        
        // State
        this.isOnGround = false;
        this.isClimbing = false;
        this.facingRight = true;
        
        // Cooldowns
        this.digCooldown = 0;
        this.invincibleTimer = 0;
    }
    
    // Update player state
    update(deltaTime, keys, platforms, ladders) {
        // Update timers
        if (this.invincibleTimer > 0) {
            this.invincibleTimer -= deltaTime;
        }
        if (this.digCooldown > 0) {
            this.digCooldown -= deltaTime;
        }
        
        // Handle movement
        this.handleMovement(keys, ladders);
        
        // Apply physics if not climbing
        if (!this.isClimbing) {
            this.applyPhysics();
        }
        
        // Handle platform collisions
        this.handlePlatformCollisions(platforms);
        
        // Keep player in bounds
        this.clampPosition();
    }
    
    // Handle keyboard input for movement
    handleMovement(keys, ladders) {
        if (!keys) {
            console.warn('No keys object provided to handleMovement');
            return;
        }
        // Horizontal movement
        this.velocityX = 0;
        
        if (keys['ArrowLeft'] || keys['a']) {
            this.velocityX = -this.speed;
            this.facingRight = false;
        }
        if (keys['ArrowRight'] || keys['d']) {
            this.velocityX = this.speed;
            this.facingRight = true;
        }
        
        // Check if player is on ladder
        this.handleClimbing(keys, ladders);
        
        // Jump
        if ((keys['ArrowUp'] || keys['w']) && this.isOnGround && !this.isClimbing) {
            this.velocityY = this.jumpForce;
            this.isOnGround = false;
        }
    }
    
    // Handle ladder climbing
    handleClimbing(keys, ladders) {
        this.isClimbing = false;
        
        for (const ladder of ladders) {
            if (this.isColliding(ladder) && 
                (keys['ArrowUp'] || keys['w'] || keys['ArrowDown'] || keys['s'])) {
                this.isClimbing = true;
                this.isOnGround = true;
                this.velocityY = 0;
                
                // Move up/down ladder
                if (keys['ArrowUp'] || keys['w']) {
                    this.y -= this.speed;
                }
                if (keys['ArrowDown'] || keys['s']) {
                    this.y += this.speed;
                }
                break;
            }
        }
    }
    
    // Apply physics (gravity)
    applyPhysics() {
        this.velocityY += 0.5; // Gravity
        this.velocityY = Math.min(this.velocityY, 15); // Terminal velocity
    }
    
    // Handle collisions with platforms
    handlePlatformCollisions(platforms) {
        this.isOnGround = false;
        
        for (const platform of platforms) {
            if (this.isColliding(platform)) {
                // Bottom collision (landing on platform)
                if (this.velocityY > 0 && this.y + this.height > platform.y) {
                    this.y = platform.y - this.height;
                    this.velocityY = 0;
                    this.isOnGround = true;
                }
                // Top collision (hitting head)
                else if (this.velocityY < 0) {
                    this.y = platform.y + platform.height;
                    this.velocityY = 0;
                }
                // Side collision
                else if (this.velocityX !== 0) {
                    if (this.x < platform.x) {
                        this.x = platform.x - this.width;
                    } else {
                        this.x = platform.x + platform.width;
                    }
                }
            }
        }
    }
    
    // Keep player within canvas bounds
    clampPosition() {
        const canvas = document.getElementById('game-canvas');
        if (!canvas) return;
        
        this.x = Math.max(0, Math.min(canvas.width - this.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height - this.height, this.y));
    }
    
    // Check collision with another object
    isColliding(other) {
        return this.x < other.x + other.width &&
               this.x + this.width > other.x &&
               this.y < other.y + other.height &&
               this.y + this.height > other.y;
    }
    
    // Player gets hit
    hit() {
        if (this.invincibleTimer > 0) return false;
        
        this.invincibleTimer = 1.0;
        return true;
    }
    
    // Reset player position
    reset(x, y) {
        this.x = x;
        this.y = y;
        this.velocityX = 0;
        this.velocityY = 0;
    }
}
