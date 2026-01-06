// levels.js
const LevelData = {
    1: {
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
    },
    2: {
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
    }
};

// Generate Levels 3-5
for (let i = 3; i <= 5; i++) {
    LevelData[i] = JSON.parse(JSON.stringify(LevelData[2]));
    LevelData[i].totalGold = 5 + i;
}
