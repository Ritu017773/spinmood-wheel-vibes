
import React, { useEffect, useRef } from 'react';

interface ConfettiProps {
  isActive: boolean;
  theme: 'study' | 'chill' | 'party' | 'gift' | 'custom';
}

const Confetti: React.FC<ConfettiProps> = ({ isActive, theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const confettiRef = useRef<any[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to cover full screen
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Create color scheme based on theme
    let colors: string[] = [];
    let shapes = ['circle', 'square', 'triangle', 'line', 'star'];
    
    switch (theme) {
      case 'study':
        colors = ['#6989E0', '#4C6BC3', '#7D98E9', '#3B5DAF', '#8AA6F2', '#ffffff'];
        break;
      case 'chill':
        colors = ['#6ECFB2', '#52B89A', '#83D7BE', '#42A487', '#97DECC', '#ffffff'];
        break;
      case 'party':
        colors = ['#E069B5', '#C352A1', '#E982C3', '#B3458F', '#ED99CE', '#ffffff', '#ffcc00'];
        break;
      case 'gift':
        colors = ['#E0B269', '#C39A52', '#E9C382', '#AF8B3B', '#F2D18A', '#ffffff', '#ff9933'];
        break;
      case 'custom':
        colors = ['#69B6E0', '#528BC3', '#82C7E9', '#427AA4', '#99D5ED', '#ffffff'];
        break;
      default:
        colors = ['#69B6E0', '#E069B5', '#6ECFB2', '#E0B269', '#ffffff'];
    }
    
    // Create confetti particles with enhanced variety
    const createConfetti = () => {
      // IMPROVED: Increased particle count for more celebratory feel
      const particleCount = 250; // More particles (from 150)
      for (let i = 0; i < particleCount; i++) {
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        confettiRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height, // Start above the canvas
          size: Math.random() * 15 + 5, // Larger sizes
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: shape,
          speedY: Math.random() * 5 + 1,
          speedX: Math.random() * 4 - 2,
          spin: Math.random() * 0.4 - 0.2,
          rotationAngle: Math.random() * 360,
          opacity: Math.random() * 0.3 + 0.7,
          // Add glitter effect to some particles
          glitter: Math.random() > 0.7,
          glitterSpeed: Math.random() * 0.2 + 0.1,
          glitterOpacity: 0,
          // Add some 3D perspective
          scale: Math.random() * 0.5 + 0.5,
          // Bounce effect
          bounceFactor: Math.random() > 0.7 ? (Math.random() * 0.5 + 0.3) : 0,
          bounceCount: 0,
          maxBounces: Math.floor(Math.random() * 3) + 1
        });
      }
    };
    
    const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      const spikes = 5;
      const outerRadius = size / 2;
      const innerRadius = outerRadius / 2;
      
      ctx.beginPath();
      let rot = Math.PI / 2 * 3;
      let cx = x;
      let cy = y;
      let step = Math.PI / spikes;
      
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;
        
        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      
      ctx.lineTo(cx + Math.cos(Math.PI / 2 * 3) * outerRadius, cy + Math.sin(Math.PI / 2 * 3) * outerRadius);
      ctx.closePath();
      ctx.fill();
    };
    
    // Animate confetti with enhanced effects
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Continue creating particles in waves for more dynamic effect
      if (confettiRef.current.length < 400 && Math.random() > 0.95) {
        createConfetti();
      }
      
      confettiRef.current.forEach((particle, index) => {
        // Apply velocity
        particle.y += particle.speedY;
        particle.x += particle.speedX;
        particle.rotationAngle += particle.spin;
        
        // Glitter effect
        if (particle.glitter) {
          particle.glitterOpacity = Math.sin(Date.now() * particle.glitterSpeed) * 0.5 + 0.5;
        }
        
        // Simulate air resistance
        particle.speedY *= 0.99;
        particle.speedX *= 0.99;
        
        // Handle bounce effect if enabled
        if (particle.bounceFactor > 0 && particle.y > canvas.height - particle.size && particle.bounceCount < particle.maxBounces) {
          particle.speedY = -particle.speedY * particle.bounceFactor;
          particle.bounceCount++;
        }
        
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotationAngle * Math.PI / 180);
        ctx.scale(particle.scale, particle.scale);
        
        // Set main particle color and opacity
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        
        // Draw different shapes
        if (particle.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
          ctx.fill();
          
          // Add glitter effect
          if (particle.glitter) {
            ctx.globalAlpha = particle.glitterOpacity * 0.7;
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(0, 0, particle.size / 4, 0, Math.PI * 2);
            ctx.fill();
          }
        } else if (particle.shape === 'square') {
          ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
          
          // Add glitter effect
          if (particle.glitter) {
            ctx.globalAlpha = particle.glitterOpacity * 0.7;
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(-particle.size / 4, -particle.size / 4, particle.size / 2, particle.size / 2);
          }
        } else if (particle.shape === 'triangle') {
          ctx.beginPath();
          ctx.moveTo(0, -particle.size / 2);
          ctx.lineTo(particle.size / 2, particle.size / 2);
          ctx.lineTo(-particle.size / 2, particle.size / 2);
          ctx.closePath();
          ctx.fill();
          
          // Add glitter effect
          if (particle.glitter) {
            ctx.globalAlpha = particle.glitterOpacity * 0.7;
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.moveTo(0, -particle.size / 4);
            ctx.lineTo(particle.size / 4, particle.size / 4);
            ctx.lineTo(-particle.size / 4, particle.size / 4);
            ctx.closePath();
            ctx.fill();
          }
        } else if (particle.shape === 'line') {
          ctx.lineWidth = particle.size / 5;
          ctx.strokeStyle = particle.color;
          ctx.beginPath();
          ctx.moveTo(0, -particle.size / 2);
          ctx.lineTo(0, particle.size / 2);
          ctx.stroke();
        } else if (particle.shape === 'star') {
          drawStar(ctx, 0, 0, particle.size);
          
          // Add glitter effect to stars
          if (particle.glitter) {
            ctx.globalAlpha = particle.glitterOpacity * 0.7;
            ctx.fillStyle = '#ffffff';
            drawStar(ctx, 0, 0, particle.size * 0.6);
          }
        }
        
        ctx.restore();
        
        // Remove particles that have fallen out of view or faded
        if (particle.y > canvas.height + particle.size * 2 || 
            particle.opacity <= 0.1 ||
            (particle.bounceCount >= particle.maxBounces && particle.y > canvas.height)) {
          confettiRef.current.splice(index, 1);
        } else if (particle.y > canvas.height - particle.size && !particle.bounceFactor) {
          // Fade out particles that hit the ground
          particle.opacity *= 0.95;
        }
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Create initial batch of particles
    createConfetti();
    animate();
    
    // Cleanup after animation duration (improved: longer celebration)
    const cleanup = setTimeout(() => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      confettiRef.current = [];
    }, 5000); // Increased duration from ~3s to 5s
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      clearTimeout(cleanup);
      confettiRef.current = [];
    };
  }, [isActive, theme]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
      style={{
        // IMPROVED: Set fixed position to cover entire screen
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999
      }}
    />
  );
};

export default Confetti;
