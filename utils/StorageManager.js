// utils/StorageManager.js
class StorageManager {
    constructor() {
        this.STORAGE_KEY = 'radioactivityRunnerProgress';
        this.DEFAULT_STATE = {
            level: 1,
            score: 0,
            knowledge: {
                level1: 0,
                level2: 0,
                level3: 0,
                level4: 0,
                level5: 0
            },
            levelScores: {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0
            },
            settings: {
                volume: 0.7,
                muted: false,
                audioEnabled: false
            }
        };
    }
    
    // Save game progress
    saveGameProgress() {
        try {
            const progress = {
                level: GameState.currentLevel,
                score: GameState.score,
                knowledge: GameState.knowledge,
                levelScores: GameState.levelScores,
                lastSaved: new Date().toISOString()
            };
            
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));
            console.log('Game progress saved');
            return true;
        } catch (error) {
            console.error('Error saving game progress:', error);
            return false;
        }
    }
    
    // Load game progress
    loadGameProgress() {
        try {
            const saved = localStorage.getItem(this.STORAGE_KEY);
            if (saved) {
                const progress = JSON.parse(saved);
                
                // Validate and load progress
                GameState.currentLevel = this.validateNumber(progress.level, 1, 1, 5);
                GameState.score = this.validateNumber(progress.score, 0, 0);
                
                // Load knowledge scores
                GameState.knowledge = this.validateKnowledge(progress.knowledge);
                
                // Load level scores
                GameState.levelScores = this.validateLevelScores(progress.levelScores);
                
                console.log('Game progress loaded');
                return true;
            }
        } catch (error) {
            console.error('Error loading game progress:', error);
        }
        
        // Return false if no saved progress or error
        return false;
    }
    
    // Reset game progress
    resetGameProgress() {
        try {
            GameState.currentLevel = 1;
            GameState.score = 0;
            GameState.knowledge = { ...this.DEFAULT_STATE.knowledge };
            GameState.levelScores = { ...this.DEFAULT_STATE.levelScores };
            GameState.totalQuestionsAnswered = 0;
            GameState.correctAnswers = 0;
            GameState.goldCollected = 0;
            GameState.lives = 3;
            
            localStorage.removeItem(this.STORAGE_KEY);
            console.log('Game progress reset');
            return true;
        } catch (error) {
            console.error('Error resetting game progress:', error);
            return false;
        }
    }
    
    // Save settings
    saveSettings(settings) {
        try {
            const current = this.loadSettings();
            const merged = { ...current, ...settings };
            localStorage.setItem('radioactivityRunnerSettings', JSON.stringify(merged));
            return true;
        } catch (error) {
            console.error('Error saving settings:', error);
            return false;
        }
    }
    
    // Load settings
    loadSettings() {
        try {
            const saved = localStorage.getItem('radioactivityRunnerSettings');
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (error) {
            console.error('Error loading settings:', error);
        }
        
        return { ...this.DEFAULT_STATE.settings };
    }
    
    // Save audio enabled flag
    saveAudioEnabled(enabled) {
        try {
            const settings = this.loadSettings();
            settings.audioEnabled = enabled;
            this.saveSettings(settings);
            return true;
        } catch (error) {
            console.error('Error saving audio enabled flag:', error);
            return false;
        }
    }
    
    // Check if audio is enabled
    isAudioEnabled() {
        const settings = this.loadSettings();
        return settings.audioEnabled || false;
    }
    
    // Save recent questions
    saveRecentQuestions(questions) {
        try {
            localStorage.setItem('recentQuestions', JSON.stringify(questions));
            return true;
        } catch (error) {
            console.error('Error saving recent questions:', error);
            return false;
        }
    }
    
    // Load recent questions
    loadRecentQuestions() {
        try {
            const saved = localStorage.getItem('recentQuestions');
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (error) {
            console.error('Error loading recent questions:', error);
        }
        
        return [];
    }
    
    // Export game data (for backup)
    exportGameData() {
        try {
            const data = {
                progress: JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}'),
                settings: JSON.parse(localStorage.getItem('radioactivityRunnerSettings') || '{}'),
                recentQuestions: JSON.parse(localStorage.getItem('recentQuestions') || '[]'),
                exportDate: new Date().toISOString(),
                version: '1.0'
            };
            
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `radioactivity-runner-backup-${new Date().toISOString().slice(0, 10)}.json`;
            a.click();
            
            URL.revokeObjectURL(url);
            return true;
        } catch (error) {
            console.error('Error exporting game data:', error);
            return false;
        }
    }
    
    // Import game data
    importGameData(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    
                    // Validate data
                    if (!this.validateImportData(data)) {
                        reject(new Error('Invalid backup file'));
                        return;
                    }
                    
                    // Import data
                    if (data.progress) {
                        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data.progress));
                    }
                    if (data.settings) {
                        localStorage.setItem('radioactivityRunnerSettings', JSON.stringify(data.settings));
                    }
                    if (data.recentQuestions) {
                        localStorage.setItem('recentQuestions', JSON.stringify(data.recentQuestions));
                    }
                    
                    console.log('Game data imported successfully');
                    resolve(true);
                } catch (error) {
                    reject(new Error('Error parsing backup file'));
                }
            };
            
            reader.onerror = () => {
                reject(new Error('Error reading file'));
            };
            
            reader.readAsText(file);
        });
    }
    
    // Clear all game data
    clearAllData() {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
            localStorage.removeItem('radioactivityRunnerSettings');
            localStorage.removeItem('recentQuestions');
            console.log('All game data cleared');
            return true;
        } catch (error) {
            console.error('Error clearing game data:', error);
            return false;
        }
    }
    
    // Get storage statistics
    getStorageStats() {
        let totalSize = 0;
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            totalSize += key.length + value.length;
        }
        
        return {
            items: localStorage.length,
            estimatedSize: `${(totalSize / 1024).toFixed(2)} KB`,
            quota: this.getStorageQuotaInfo()
        };
    }
    
    // Get storage quota information
    getStorageQuotaInfo() {
        if ('storage' in navigator && 'estimate' in navigator.storage) {
            return navigator.storage.estimate()
                .then(estimate => ({
                    usage: `${(estimate.usage / 1024 / 1024).toFixed(2)} MB`,
                    quota: `${(estimate.quota / 1024 / 1024).toFixed(2)} MB`,
                    percentage: ((estimate.usage / estimate.quota) * 100).toFixed(1) + '%'
                }))
                .catch(() => 'Unknown');
        }
        
        return Promise.resolve('Not supported');
    }
    
    // Validation helpers
    validateNumber(value, defaultValue, min = -Infinity, max = Infinity) {
        const num = Number(value);
        if (isNaN(num)) return defaultValue;
        return Math.max(min, Math.min(max, num));
    }
    
    validateKnowledge(knowledge) {
        const valid = { ...this.DEFAULT_STATE.knowledge };
        
        if (knowledge && typeof knowledge === 'object') {
            for (let i = 1; i <= 5; i++) {
                const key = `level${i}`;
                if (key in knowledge) {
                    valid[key] = this.validateNumber(knowledge[key], 0, 0, 100);
                }
            }
        }
        
        return valid;
    }
    
    validateLevelScores(levelScores) {
        const valid = { ...this.DEFAULT_STATE.levelScores };
        
        if (levelScores && typeof levelScores === 'object') {
            for (let i = 1; i <= 5; i++) {
                if (i in levelScores) {
                    valid[i] = this.validateNumber(levelScores[i], 0, 0);
                }
            }
        }
        
        return valid;
    }
    
    validateImportData(data) {
        // Basic validation
        if (!data || typeof data !== 'object') return false;
        if (!data.version || data.version !== '1.0') return false;
        
        // Check for required structure
        if (data.progress && typeof data.progress !== 'object') return false;
        if (data.settings && typeof data.settings !== 'object') return false;
        
        return true;
    }
}

// Create global storage manager instance
const storageManager = new StorageManager();

// Helper functions for global GameState
function saveGameProgress() {
    return storageManager.saveGameProgress();
}

function loadGameProgress() {
    return storageManager.loadGameProgress();
}

function resetGameState() {
    return storageManager.resetGameProgress();
}

function updateUI() {
    // Update start screen
    const totalScoreElement = document.getElementById('total-score');
    const knowledgeFillElement = document.getElementById('knowledge-fill');
    
    if (totalScoreElement) {
        totalScoreElement.textContent = GameState.score;
    }
    
    if (knowledgeFillElement) {
        const knowledgePercent = calculateKnowledgePercentage();
        knowledgeFillElement.style.width = `${knowledgePercent}%`;
    }
    
    // Update progress circles
    for (let i = 1; i <= 5; i++) {
        const progressCircle = document.getElementById(`progress-${i}`);
        if (progressCircle) {
            const knowledge = GameState.knowledge[`level${i}`] || 0;
            const percentage = Math.min(100, knowledge);
            progressCircle.textContent = `${percentage}%`;
            progressCircle.style.background = `conic-gradient(#00c9ff ${percentage}%, #2c5364 ${percentage}%)`;
        }
    }
    
    // Update game screen stats
    const currentScoreElement = document.getElementById('current-score');
    const currentLevelElement = document.getElementById('current-level');
    const livesElement = document.getElementById('lives');
    
    if (currentScoreElement) {
        currentScoreElement.textContent = GameState.score;
    }
    if (currentLevelElement) {
        currentLevelElement.textContent = GameState.currentLevel;
    }
    if (livesElement) {
        livesElement.textContent = GameState.lives;
    }
}

function calculateKnowledgePercentage() {
    const totalPossible = Object.keys(GameState.knowledge).length * 100;
    const totalEarned = Object.values(GameState.knowledge).reduce((a, b) => a + b, 0);
    return Math.round((totalEarned / totalPossible) * 100);
}
