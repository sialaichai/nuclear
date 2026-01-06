// Sound Manager for Radioactivity Runner
class SoundManager {
    constructor() {
        this.sounds = {
            'title': document.getElementById('bgm-title'),
            'stageStart': document.getElementById('bgm-stage-start'),
            'mainBGM': document.getElementById('bgm-main'),
            'allGold': document.getElementById('sfx-all-gold'),
            'stageClear': document.getElementById('sfx-stage-clear'),
            'miss': document.getElementById('sfx-miss'),
            'gameOver': document.getElementById('sfx-game-over'),
            'correct': document.getElementById('sfx-correct-answer'),
            'wrong': document.getElementById('sfx-wrong-answer'),
            'dig': document.getElementById('sfx-dig'),
            'gold': document.getElementById('sfx-gold-collect'),
            'hit': document.getElementById('sfx-hit'),
            'button': document.getElementById('sfx-button-click')
        };
        
        this.muted = false;
        this.currentBGM = null;
        this.bgmVolume = 0.7;
        this.sfxVolume = 0.8;
        
        // Initialize volumes
        this.updateVolumes();
    }
    
    updateVolumes() {
        // Set BGM volume
        for (const key in this.sounds) {
            if (key === 'title' || key === 'stageStart' || key === 'mainBGM') {
                this.sounds[key].volume = this.muted ? 0 : this.bgmVolume;
            } else {
                this.sounds[key].volume = this.muted ? 0 : this.sfxVolume;
            }
        }
    }
    
    // Load audio files
    loadSounds(soundFiles) {
        for (const [key, file] of Object.entries(soundFiles)) {
            if (this.sounds[key]) {
                this.sounds[key].src = file;
                console.log(`Loaded sound: ${key} -> ${file}`);
            }
        }
    }
    
    // Play sound
    play(soundName, loop = false) {
        if (this.muted || !this.sounds[soundName]) return;
        
        const sound = this.sounds[soundName];
        sound.loop = loop;
        
        // Stop if currently playing
        sound.pause();
        sound.currentTime = 0;
        
        // Play with promise for better handling
        const playPromise = sound.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log(`Audio play failed for ${soundName}:`, error);
            });
        }
        
        return sound;
    }
    
    // Stop sound
    stop(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].pause();
            this.sounds[soundName].currentTime = 0;
        }
    }
    
    // Stop all sounds
    stopAll() {
        for (const key in this.sounds) {
            this.stop(key);
        }
        this.currentBGM = null;
    }
    
    // Play BGM with proper management
    playBGM(bgmName) {
        // Stop current BGM if different
        if (this.currentBGM && this.currentBGM !== bgmName) {
            this.stop(this.currentBGM);
        }
        
        this.currentBGM = bgmName;
        this.play(bgmName, true);
    }
    
    // Stop BGM
    stopBGM() {
        if (this.currentBGM) {
            this.stop(this.currentBGM);
            this.currentBGM = null;
        }
    }
    
    // Pause BGM
    pauseBGM() {
        if (this.currentBGM && this.sounds[this.currentBGM]) {
            this.sounds[this.currentBGM].pause();
        }
    }
    
    // Resume BGM
    resumeBGM() {
        if (this.currentBGM && this.sounds[this.currentBGM]) {
            this.sounds[this.currentBGM].play();
        }
    }
    
    // Toggle mute
    toggleMute() {
        this.muted = !this.muted;
        this.updateVolumes();
        
        if (this.muted) {
            this.pauseBGM();
        } else {
            this.resumeBGM();
        }
        
        return this.muted;
    }
    
    // Set volume
    setVolume(bgmVol = 0.7, sfxVol = 0.8) {
        this.bgmVolume = bgmVol;
        this.sfxVolume = sfxVol;
        this.updateVolumes();
    }
}

// Create global sound manager instance
const soundManager = new SoundManager();

// Default sound files configuration
const SOUND_FILES = {
    'title': 'sounds/title-screen.mp3',
    'stageStart': 'sounds/stage-start.mp3',
    'mainBGM': 'sounds/main-bgm.mp3',
    'allGold': 'sounds/all-gold-collected.mp3',
    'stageClear': 'sounds/stage-clear.mp3',
    'miss': 'sounds/miss.mp3',
    'gameOver': 'sounds/game-over.mp3',
    'correct': 'sounds/correct-answer.mp3',
    'wrong': 'sounds/wrong-answer.mp3',
    'dig': 'sounds/dig.mp3',
    'gold': 'sounds/gold-collect.mp3',
    'hit': 'sounds/hit.mp3',
    'button': 'sounds/button-click.mp3'
};

// Load sounds when page loads
window.addEventListener('DOMContentLoaded', () => {
    soundManager.loadSounds(SOUND_FILES);
});
