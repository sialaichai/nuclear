// core/EnemyAI.js
class Enemy {
    constructor(x, y, tileSize, patrolLeft, patrolRight) {
        // Position and size
        this.x = x;
        this.y = y;
        this.width = tileSize * 0.8;
        this.height = tileSize * 0.9;
        
        // Patrol behavior
        this.patrolLeft = patrolLeft;
        this.patrolRight = patrolRight;
        this.direction = 1; // 1 for right, -1 for left
        this.speed = 1;
        
        // Physics
        this.isFalling = false;
        
        // Trap state
        this.trapped = false;
        this.trapTimer = 0;
        this.originalY = y;
    }
    
    // Update enemy state
    update(deltaTime, platforms) {
        // If trapped, don't move
        if (this.trapped) {
            this.trapTimer -= deltaTime;
            if (this.trapTimer <= 0) {
                // Enemy escapes from hole
                this.trapped = false;
                this.y = this.originalY;
            }
            return;
        }
        
        // Simple patrol AI
        this.x += this.direction * this.speed;
        
        // Change direction at patrol boundaries
        if (this.x <= this.patrolLeft) {
            this.direction = 1;
        }
        if (this.x + this.width >= this.patrolRight) {
            this.direction = -1;
        }
        
        // Apply gravity
        this.applyGravity(platforms);
    }
    
    // Apply gravity and check platform collisions
    applyGravity(platforms) {
        this.isFalling = true;
        
        for (const platform of platforms) {
            if (this.isColliding(platform) && this.y + this.height <= platform.y + 5) {
                this.y = platform.y - this.height;
                this.isFalling = false;
                break;
            }
        }
        
        if (this.isFalling) {
            this.y += 5;
        }
    }
    
    // Check collision with another object
    isColliding(other) {
        return this.x < other.x + other.width &&
               this.x + this.width > other.x &&
               this.y < other.y + other.height &&
               this.y + this.height > other.y;
    }
    
    // Reset enemy state
    reset(x, y) {
        this.x = x;
        this.y = y;
        this.originalY = y;
        this.trapped = false;
        this.trapTimer = 0;
        this.direction = 1;
    }
}
