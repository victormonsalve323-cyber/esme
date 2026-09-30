const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// --- 1. Partículas ultra-fluidas en órbita ---
const particles = [];
const numParticles = 240; // Cantidad optimizada para máxima fluidez

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.theta = Math.random() * Math.PI * 2;
        this.phi = Math.acos((Math.random() * 2) - 1);
        this.radius = 210 + Math.random() * 70;
        this.speed = 0.006 + Math.random() * 0.004;
        this.color = `hsl(${310 + Math.random() * 50}, 100%, 75%)`;
    }

    update() {
        this.theta += this.speed;
    }

    draw(centerX, centerY) {
        const sinPhi = Math.sin(this.phi);
        const cosPhi = Math.cos(this.phi);
        const x = centerX + this.radius * sinPhi * Math.cos(this.theta);
        const y = centerY + this.radius * sinPhi * Math.sin(this.theta);
        const size = Math.max(1.2, (cosPhi + 1.2) * 2);

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
}

// --- 2. Besos y Corazones emergentes ligeros ---
const centerEmojis = [];
const emojiTypes = ['💋', '💖', '💗', '❤️', '✨', '🌸'];

class BurstEmoji {
    constructor(centerX, centerY) {
        this.x = centerX;
        this.y = centerY;
        this.emoji = emojiTypes[(Math.random() * emojiTypes.length) | 0];
        
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.8 + Math.random() * 3;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 0.4;
        
        this.size = 22 + Math.random() * 16;
        this.alpha = 1;
        this.decay = 0.015;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
    }

    draw() {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.font = `${this.size}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.emoji, this.x, this.y);
        ctx.restore();
    }
}

// --- 3. Corazón central gigante optimizado ---
function drawHeart(centerX, centerY) {
    ctx.save();
    ctx.translate(centerX, centerY);
    
    const scale = Math.min(canvas.width, canvas.height) < 500 ? 3.8 : 5.2;
    ctx.scale(scale, scale);
    
    ctx.beginPath();
    for (let t = 0; t < Math.PI * 2; t += 0.04) {
        const sinT = Math.sin(t);
        const x = 16 * Math.pow(sinT, 3);
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        if (t === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    
    ctx.fillStyle = '#ff1744';
    ctx.shadowBlur = 25;
    ctx.shadowColor = '#ff007f';
    ctx.fill();
    
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 0.6;
    ctx.stroke();
    
    ctx.restore();
}

// --- Bucle principal optimizado ---
let frameCounter = 0;
function animate() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2 - 40;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    frameCounter++;
    if (frameCounter % 7 === 0 && centerEmojis.length < 30) {
        centerEmojis.push(new BurstEmoji(centerX, centerY));
    }

    // Dibujar partículas orbitales
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(centerX, centerY);
    }

    // Dibujar emojis
    for (let i = centerEmojis.length - 1; i >= 0; i--) {
        const e = centerEmojis[i];
        e.update();
        e.draw();
        if (e.alpha <= 0) {
            centerEmojis.splice(i, 1);
        }
    }

    // Dibujar corazón gigante central
    drawHeart(centerX, centerY);

    requestAnimationFrame(animate);
}

animate();

// --- Escritura automática de código ---
const codeText = `.Para_Ti {
  position: absolute;
  width: 90%;
  font-size: 2rem;
  font-family: "Te Amo";
  height: var(--letter-love);
  transform: translateX(-50%);
  background: var(--letter);
}`;

let index = 0;
function typeCode() {
    const target = document.getElementById('typewriter');
    if (target && index < codeText.length) {
        target.textContent += codeText.charAt(index);
        index++;
        setTimeout(typeCode, 40);
    }
}

setTimeout(typeCode, 500);