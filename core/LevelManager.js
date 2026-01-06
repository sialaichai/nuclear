// core/LevelManager.js
class LevelManager {
    constructor() {
        this.levelDesigns = {};
        this.currentLevel = 1;
        this.tileSize = 32;
        
        this.createLevelDesigns();
    }
    
    // Create all level designs
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

        // Additional levels (simplified for prototype)
        for (let i = 3; i <= 5; i++) {
            this.levelDesigns[i] = JSON.parse(JSON.stringify(this.levelDesigns[2]));
            this.levelDesigns[i].totalGold = 5 + i;
        }
    }
    
    // Get level design by number
    getLevel(level) {
        return this.levelDesigns[level] || this.levelDesigns[1];
    }
    
    // Get current level
    getCurrentLevel() {
        return this.getLevel(this.currentLevel);
    }
    
    // Set current level
    setLevel(level) {
        if (level >= 1 && level <= 5) {
            this.currentLevel = level;
        }
    }
    
    // Get next level
    nextLevel() {
        if (this.currentLevel < 5) {
            this.currentLevel++;
            return this.getCurrentLevel();
        }
        return null;
    }
    
    // Convert grid design to game objects
    createGameObjects(design, tileSize) {
        const objects = {
            platforms: design.platforms.map(p => ({
                x: p.x * tileSize,
                y: p.y * tileSize,
                width: p.width * tileSize,
                height: p.height * tileSize
            })),
            ladders: design.ladders.map(l => ({
                x: l.x * tileSize,
                y: l.y * tileSize,
                width: tileSize,
                height: l.height * tileSize
            })),
            gold: design.gold.map(g => ({
                x: g.x * tileSize,
                y: g.y * tileSize,
                width: tileSize * 0.6,
                height: tileSize * 0.6,
                collected: false,
                animation: 0
            })),
            enemies: design.enemies.map(e => new Enemy(
                e.x * tileSize,
                e.y * tileSize,
                tileSize,
                e.patrol.left * tileSize,
                e.patrol.right * tileSize
            )),
            bricks: design.bricks.map(b => ({
                x: b.x * tileSize,
                y: b.y * tileSize,
                width: tileSize,
                height: tileSize,
                destructible: b.destructible,
                health: b.destructible ? 3 : 100
            })),
            start: {
                x: design.start.x * tileSize,
                y: design.start.y * tileSize
            },
            totalGold: design.totalGold
        };
        
        return objects;
    }
}
