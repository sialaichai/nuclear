// utils/ParticleSystem.js
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
    }
    
    // Create particles at position
    createParticles(x, y, count, color) {
        for (let i = 0; i < count; i++) {
            this.createParticle(x, y, color);
        }
    }
    
    // Create a single particle
    createParticle(x, y, color) {
        const particle = {
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            life: 1,
            color: color,
            size: Math.random() * 4 + 2
        };
        
        this.particles.push(particle);
    }
    
    // Update all particles
    update(deltaTime) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Apply gravity
            particle.vy += 0.1;
            
            // Decrease life
            particle.life -= 0.02;
            
            // Remove dead particles
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    // Render all particles
    render() {
        this.particles.forEach(particle => {
            this.ctx.globalAlpha = particle.life;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        this.ctx.globalAlpha = 1;
    }
    
    // Create gold collection particles
    createGoldParticles(goldPiece) {
        this.createParticles(
            goldPiece.x + goldPiece.width/2,
            goldPiece.y + goldPiece.height/2,
            10,
            '#FFD700'
        );
    }
    
    // Create hit particles
    createHitParticles(player) {
        this.createParticles(
            player.x + player.width/2,
            player.y + player.height/2,
            15,
            '#FF416C'
        );
    }
    
    // Create dig particles
    createDigParticles(x, y) {
        this.createParticles(x, y, 15, '#8B4513');
    }
    
    // Clear all particles
    clear() {
        this.particles = [];
    }
}
