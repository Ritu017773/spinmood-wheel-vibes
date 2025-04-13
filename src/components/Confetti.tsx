
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
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Create color scheme based on theme
    let colors: string[] = [];
    switch (theme) {
      case 'study':
        colors = ['#6989E0', '#4C6BC3', '#7D98E9', '#3B5DAF', '#8AA6F2'];
        break;
      case 'chill':
        colors = ['#6ECFB2', '#52B89A', '#83D7BE', '#42A487', '#97DECC'];
        break;
      case 'party':
        colors = ['#E069B5', '#C352A1', '#E982C3', '#B3458F', '#ED99CE'];
        break;
      case 'gift':
        colors = ['#E0B269', '#C39A52', '#E9C382', '#AF8B3B', '#F2D18A'];
        break;
      case 'custom':
        colors = ['#69B6E0', '#528BC3', '#82C7E9', '#427AA4', '#99D5ED'];
        break;
      default:
        colors = ['#69B6E0', '#E069B5', '#6ECFB2', '#E0B269', '#ffffff'];
    }
    
    // Create confetti particles
    const createConfetti = () => {
      const particleCount = 100;
      for (let i = 0; i < particleCount; i++) {
        confettiRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * -canvas.height,
          size: Math.random() * 10 + 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: Math.random() > 0.5 ? 'circle' : 'rect',
          speedY: Math.random() * 3 + 1,
          speedX: Math.random() * 2 - 1,
          spin: Math.random() * 0.2 - 0.1,
          rotationAngle: Math.random() * 360,
        });
      }
    };
    
    // Animate confetti
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (confettiRef.current.length < 100 && Math.random() > 0.8) {
        createConfetti();
      }
      
      confettiRef.current.forEach((particle, index) => {
        particle.y += particle.speedY;
        particle.x += particle.speedX;
        particle.rotationAngle += particle.spin;
        
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotationAngle * Math.PI / 180);
        ctx.fillStyle = particle.color;
        
        if (particle.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        }
        
        ctx.restore();
        
        // Remove particles that have fallen out of view
        if (particle.y > canvas.height + particle.size) {
          confettiRef.current.splice(index, 1);
        }
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    createConfetti();
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      confettiRef.current = [];
    };
  }, [isActive, theme]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default Confetti;
