// ui/ModalManager.js
class ModalManager {
    constructor(soundManager) {
        this.soundManager = soundManager;
        this.activeModals = new Set();
        
        this.init();
    }
    
    // Initialize modal event listeners
    init() {
        // Close modal when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.hideModal(e.target.id);
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModals.size > 0) {
                const lastModal = Array.from(this.activeModals).pop();
                this.hideModal(lastModal);
            }
        });
        
        // Initialize close buttons
        this.initCloseButtons();
    }
    
    // Initialize all close buttons
    initCloseButtons() {
        // Close buttons with .close-modal class
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) {
                    this.hideModal(modal.id);
                }
            });
        });
        
        // Specific modal close handlers
        this.setupSpecificModalHandlers();
    }
    
    // Setup handlers for specific modals
    setupSpecificModalHandlers() {
        // Instructions modal
        const instructionsModal = document.getElementById('instructions-modal');
        if (instructionsModal) {
            instructionsModal.addEventListener('click', (e) => {
                if (e.target === instructionsModal) {
                    this.hideModal('instructions-modal');
                }
            });
        }
        
        // Question modal (special handling)
        const questionModal = document.getElementById('question-modal');
        if (questionModal) {
            questionModal.addEventListener('click', (e) => {
                if (e.target === questionModal) {
                    // Don't close question modal by clicking outside
                    // This prevents accidentally closing during question answering
                }
            });
        }
    }
    
    // Show a modal
    showModal(modalId, options = {}) {
        const modal = document.getElementById(modalId);
        if (!modal) {
            console.error(`Modal not found: ${modalId}`);
            return false;
        }
        
        // Play button sound if available
        if (this.soundManager && options.playSound !== false) {
            this.soundManager.play('button');
        }
        
        // Add active class
        modal.classList.add('active');
        this.activeModals.add(modalId);
        
        // Disable background scrolling
        if (options.disableScroll !== false) {
            document.body.style.overflow = 'hidden';
        }
        
        // Focus first focusable element if needed
        if (options.autoFocus !== false) {
            setTimeout(() => {
                const focusable = modal.querySelector('button, input, select, textarea');
                if (focusable) {
                    focusable.focus();
                }
            }, 100);
        }
        
        // Call onShow callback if provided
        if (typeof options.onShow === 'function') {
            options.onShow();
        }
        
        return true;
    }
    
    // Hide a modal
    hideModal(modalId, options = {}) {
        const modal = document.getElementById(modalId);
        if (!modal) {
            console.error(`Modal not found: ${modalId}`);
            return false;
        }
        
        // Remove active class
        modal.classList.remove('active');
        this.activeModals.delete(modalId);
        
        // Re-enable background scrolling if no modals left
        if (this.activeModals.size === 0) {
            document.body.style.overflow = '';
        }
        
        // Call onHide callback if provided
        if (typeof options.onHide === 'function') {
            options.onHide();
        }
        
        return true;
    }
    
    // Hide all modals
    hideAllModals() {
        this.activeModals.forEach(modalId => {
            this.hideModal(modalId);
        });
        this.activeModals.clear();
        document.body.style.overflow = '';
    }
    
    // Check if a modal is active
    isModalActive(modalId) {
        return this.activeModals.has(modalId);
    }
    
    // Check if any modal is active
    isAnyModalActive() {
        return this.activeModals.size > 0;
    }
    
    // Show question modal with specific content
    showQuestionModal(questionData) {
        const modal = document.getElementById('question-modal');
        if (!modal) return false;
        
        // Update question content
        document.getElementById('question-title').textContent = questionData.title || 'Question';
        document.getElementById('question-text').textContent = questionData.question;
        
        // Update Bloom level badge
        const badge = document.getElementById('bloom-badge');
        if (badge) {
            badge.textContent = `Bloom Level ${questionData.level || 1}`;
        }
        
        // Clear and populate options
        const optionsContainer = document.getElementById('options-container');
        if (optionsContainer) {
            optionsContainer.innerHTML = '';
            
            const letters = ['A', 'B', 'C', 'D'];
            questionData.options.forEach((option, index) => {
                const optionBtn = this.createOptionButton(letters[index], option, index);
                optionsContainer.appendChild(optionBtn);
            });
        }
        
        // Reset hint area
        const hintArea = document.getElementById('hint-area');
        if (hintArea) {
            hintArea.style.display = 'none';
        }
        
        // Reset submit button
        const submitBtn = document.getElementById('submit-answer');
        if (submitBtn) {
            submitBtn.disabled = true;
        }
        
        // Reset selected answer
        GameState.selectedAnswer = null;
        
        // Show the modal
        return this.showModal('question-modal', { disableScroll: true });
    }
    
    // Create an option button for question modal
    createOptionButton(letter, text, index) {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.innerHTML = `
            <span class="option-letter">${letter}</span>
            <span class="option-text">${text}</span>
        `;
        
        button.addEventListener('click', () => {
            // Remove selected class from all options
            document.querySelectorAll('.option-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            button.classList.add('selected');
            GameState.selectedAnswer = index;
            
            // Enable submit button
            const submitBtn = document.getElementById('submit-answer');
            if (submitBtn) {
                submitBtn.disabled = false;
            }
        });
        
        return button;
    }
    
    // Show feedback modal
    showFeedbackModal(feedbackData) {
        const modal = document.getElementById('feedback-modal');
        if (!modal) return false;
        
        // Update feedback content
        document.getElementById('feedback-title').textContent = feedbackData.title;
        
        // Update icon
        const iconElement = document.getElementById('feedback-icon');
        if (iconElement) {
            iconElement.innerHTML = feedbackData.isCorrect ?
                '<i class="fas fa-check-circle correct-icon"></i>' :
                '<i class="fas fa-times-circle incorrect-icon"></i>';
        }
        
        // Update feedback text
        document.getElementById('feedback-text').textContent = feedbackData.text;
        
        // Update explanation
        const explanationElement = document.getElementById('explanation');
        if (explanationElement) {
            explanationElement.innerHTML = feedbackData.explanation;
        }
        
        // Update score change
        const scoreChangeElement = document.getElementById('score-change');
        if (scoreChangeElement) {
            scoreChangeElement.textContent = (feedbackData.scoreChange >= 0 ? '+' : '') + feedbackData.scoreChange;
            scoreChangeElement.className = feedbackData.scoreChange >= 0 ? 'positive-score' : 'negative-score';
        }
        
        // Show the modal
        return this.showModal('feedback-modal', { disableScroll: true });
    }
    
    // Show instructions modal
    showInstructionsModal() {
        return this.showModal('instructions-modal', { disableScroll: true });
    }
    
    // Toggle a modal (show if hidden, hide if shown)
    toggleModal(modalId) {
        if (this.isModalActive(modalId)) {
            return this.hideModal(modalId);
        } else {
            return this.showModal(modalId);
        }
    }
}
