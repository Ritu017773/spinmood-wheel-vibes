
import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import Confetti from '@/components/Confetti';

interface SpinnerWheelProps {
  entries: string[];
  onSpinComplete: (winner: string) => void;
  theme: 'study' | 'chill' | 'party' | 'gift' | 'custom';
  soundEnabled: boolean;
  isSpinning: boolean;
  setIsSpinning: (isSpinning: boolean) => void;
}

const SpinnerWheel: React.FC<SpinnerWheelProps> = ({
  entries,
  onSpinComplete,
  theme,
  soundEnabled,
  isSpinning,
  setIsSpinning
}) => {
  const [rotationDeg, setRotationDeg] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const spinSoundRef = useRef<HTMLAudioElement | null>(null);
  const resultSoundRef = useRef<HTMLAudioElement | null>(null);
  const idleAnimationRef = useRef<number | null>(null);
  const [hoverSlice, setHoverSlice] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const [showCelebration, setShowCelebration] = useState(false);
  
  useEffect(() => {
    spinSoundRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3');
    resultSoundRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3');
    
    return () => {
      if (spinSoundRef.current) {
        spinSoundRef.current.pause();
        spinSoundRef.current = null;
      }
      if (resultSoundRef.current) {
        resultSoundRef.current.pause();
        resultSoundRef.current = null;
      }
      if (idleAnimationRef.current) {
        cancelAnimationFrame(idleAnimationRef.current);
      }
    };
  }, []);

  // Effect to draw wheel when entries or theme changes
  useEffect(() => {
    if (entries.length >= 2) {
      // Always use canvas for better rendering
      drawWheelOnCanvas();
    }
  }, [entries, theme]);

  useEffect(() => {
    if (isSpinning || entries.length < 2) return;
    
    let idleAngle = 0;
    let direction = 1;
    let speed = 0.05;
    
    const animateIdle = () => {
      if (isSpinning) return;
      
      idleAngle += speed * direction;
      
      if (idleAngle > 4) direction = -1;
      if (idleAngle < -4) direction = 1;
      
      if (wheelRef.current) {
        wheelRef.current.style.transform = `rotate(${rotationDeg + idleAngle}deg) scale(${scale})`;
      }
      
      idleAnimationRef.current = requestAnimationFrame(animateIdle);
    };
    
    idleAnimationRef.current = requestAnimationFrame(animateIdle);
    
    return () => {
      if (idleAnimationRef.current) {
        cancelAnimationFrame(idleAnimationRef.current);
      }
    };
  }, [isSpinning, entries.length, rotationDeg, scale]);

  const drawWheelOnCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const numEntries = entries.length;
    if (numEntries < 2) return;
    
    // Get the actual size of the displayed canvas
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    
    // Calculate angle per slice
    const anglePerSlice = (Math.PI * 2) / numEntries;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw segments
    for (let i = 0; i < numEntries; i++) {
      // Get segment color
      const segmentColor = getSegmentColor(i, numEntries);
      
      // Calculate angles
      const startAngle = i * anglePerSlice;
      const endAngle = (i + 1) * anglePerSlice;
      
      // Draw segment
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = segmentColor;
      ctx.fill();
      
      // Add border between segments
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.stroke();
      
      // Calculate text position
      const midAngle = startAngle + (anglePerSlice / 2);
      
      // For better readability, position text at varying distances based on number of entries
      let textRadiusRatio = 0.65;
      
      // Adjust text radius based on number of entries for optimal readability
      if (numEntries > 30) textRadiusRatio = 0.80;
      else if (numEntries > 20) textRadiusRatio = 0.75;
      else if (numEntries > 10) textRadiusRatio = 0.70;
      
      const textRadius = radius * textRadiusRatio; 
      const textX = centerX + Math.cos(midAngle) * textRadius;
      const textY = centerY + Math.sin(midAngle) * textRadius;
      
      // Adjust text rotation for optimal readability
      // For entries in the top half, rotate text to be readable from the outside
      // For entries in the bottom half, rotate text to be readable from the inside
      let textRotationAngle = midAngle;
      if (midAngle > Math.PI / 2 && midAngle < Math.PI * 1.5) {
        textRotationAngle += Math.PI;
      }
      
      // Set text properties
      ctx.save();
      ctx.translate(textX, textY);
      ctx.rotate(textRotationAngle);
      
      // Adaptive font size based on number of entries
      const fontSize = getFontSize(numEntries);
      
      // Enhanced text styling for better readability
      ctx.font = `bold ${fontSize} Arial, sans-serif`;
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Add text stroke/shadow for better readability against all background colors
      ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
      ctx.shadowBlur = 3;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
      
      // Set maximum text length based on wheel size and number of entries
      const maxTextLength = Math.floor(2 * Math.PI * textRadius / numEntries * 0.7);
      let displayText = entries[i];
      
      // Truncate text if it's too long
      if (ctx.measureText(displayText).width > maxTextLength) {
        // Try to find a good breaking point
        let truncatedLength = Math.floor(displayText.length * (maxTextLength / ctx.measureText(displayText).width));
        // Ensure we don't cut in the middle of a word if possible
        let breakPoint = displayText.lastIndexOf(' ', truncatedLength);
        if (breakPoint === -1 || breakPoint < truncatedLength * 0.7) breakPoint = truncatedLength;
        displayText = displayText.substring(0, breakPoint) + '...';
      }
      
      // Draw text with stroke for better visibility
      ctx.strokeText(displayText, 0, 0);
      ctx.fillText(displayText, 0, 0);
      
      ctx.restore();
    }
    
    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.1, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw outer border
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.stroke();
  };

  const handleSpin = () => {
    if (isSpinning || entries.length < 2) return;
    
    if (entries.length < 2) {
      toast.error("Add at least 2 entries to spin the wheel!");
      return;
    }
    
    setIsSpinning(true);
    setWinner(null);
    setShowCelebration(false);
    
    setScale(0.98);
    setTimeout(() => {
      setScale(1.05);
      setTimeout(() => setScale(1), 200);
    }, 150);

    if (idleAnimationRef.current) {
      cancelAnimationFrame(idleAnimationRef.current);
    }

    if (soundEnabled && spinSoundRef.current) {
      spinSoundRef.current.currentTime = 0;
      spinSoundRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    
    const minSpins = 6;
    const maxSpins = 12;
    const spinCount = minSpins + Math.random() * (maxSpins - minSpins);
    const spinDegrees = spinCount * 360 + Math.random() * 360;
    const newRotationDeg = rotationDeg + spinDegrees;
    
    if (wheelRef.current) {
      wheelRef.current.style.filter = 'blur(2px)';
      wheelRef.current.style.transition = 'transform 5s cubic-bezier(0.18, 0.89, 0.32, 1.28)';
      wheelRef.current.style.transform = `rotate(${newRotationDeg}deg)`;
    }
    
    setRotationDeg(newRotationDeg);
    
    setTimeout(() => {
      if (wheelRef.current) {
        wheelRef.current.style.filter = 'blur(0.5px)';
        setTimeout(() => {
          if (wheelRef.current) wheelRef.current.style.filter = 'none';
        }, 200);
      }
      
      const degrees = newRotationDeg % 360;
      const sliceSizeDegrees = 360 / entries.length;
      const winningIndex = Math.floor(degrees / sliceSizeDegrees);
      const actualWinner = entries[entries.length - 1 - winningIndex];
      
      setWinner(actualWinner);
      
      // Play result sound exactly on result reveal
      if (soundEnabled && resultSoundRef.current) {
        resultSoundRef.current.currentTime = 0;
        resultSoundRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      
      setShowCelebration(true);
      
      setScale(1.08);
      setTimeout(() => setScale(1), 200);
      
      // Extended result display duration to 6 seconds
      setTimeout(() => {
        onSpinComplete(actualWinner);
        setIsSpinning(false);
        
        setTimeout(() => {
          setShowCelebration(false);
        }, 6000);
      }, 1000);
    }, 5000);
  };

  const getWheelSize = () => {
    if (typeof window === 'undefined') return '100%';
    const viewWidth = window.innerWidth;
    
    if (viewWidth < 640) {
      return '90vw';
    } else if (viewWidth < 1024) {
      return '70vw';
    } else {
      return 'min(65vh, 600px)';
    }
  };

  const sliceHoverHandler = (index: number | null) => {
    if (!isSpinning) {
      setHoverSlice(index);
    }
  };

  // Enhanced color generation to ensure unique and visually distinct colors for up to 40 entries
  const getSegmentColor = (index: number, totalEntries: number) => {
    // Use a fixed hue increment based on golden ratio to ensure color distinction
    const goldenRatioConjugate = 0.618033988749895;
    let hue = (index * goldenRatioConjugate * 360) % 360;
    
    // Adjust saturation and brightness based on theme
    let saturation, lightness;
    
    switch (theme) {
      case 'study':
        saturation = 65 + (index % 5) * 5;
        lightness = 50 + (index % 7) * 3;
        break;
      case 'chill':
        saturation = 70 + (index % 5) * 4;
        lightness = 55 + (index % 7) * 3;
        break;
      case 'party':
        saturation = 80 + (index % 5) * 4;
        lightness = 50 + (index % 7) * 3;
        break;
      case 'gift':
        saturation = 75 + (index % 5) * 5;
        lightness = 52 + (index % 7) * 3;
        break;
      default:
        // For custom theme, use more vivid and distinct colors
        hue = (index * (360 / totalEntries)) % 360;
        saturation = 80;
        lightness = 55;
    }
    
    // Ensure lightness isn't too high (too pale) or too low (too dark) for text readability
    lightness = Math.max(40, Math.min(lightness, 65));
    
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  // Dynamic font sizing based on number of entries
  const getFontSize = (numEntries: number) => {
    if (numEntries > 35) return '10px';
    if (numEntries > 30) return '11px';
    if (numEntries > 25) return '12px';
    if (numEntries > 20) return '13px';
    if (numEntries > 15) return '14px';
    if (numEntries > 10) return '15px';
    if (numEntries > 5) return '16px';
    return '18px';
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 relative">
      <Confetti isActive={showCelebration} theme={theme} />
      
      <div className="relative" style={{ width: getWheelSize(), height: getWheelSize() }}>
        <div 
          ref={wheelRef}
          className="absolute w-full h-full rounded-full overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.3)] border-4 border-white/10 cursor-pointer"
          style={{ 
            transform: `rotate(${rotationDeg}deg) scale(${scale})`,
            boxShadow: `0 0 30px rgba(0, 0, 0, 0.3), 0 0 20px var(--${theme}-primary, rgba(255,255,255,0.3))`,
            transition: isSpinning ? 'transform 5s cubic-bezier(0.18, 0.89, 0.32, 1.28)' : 'transform 0.3s ease-out'
          }}
          onClick={handleSpin}
        >
          {/* Use canvas for all themes for better text rendering */}
          <canvas
            ref={canvasRef}
            className="w-full h-full rounded-full"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none rounded-full"></div>
        </div>
        
        <div 
          className="absolute -inset-4 rounded-full opacity-30 blur-xl z-0 animate-pulse-slow pointer-events-none"
          style={{ 
            background: `radial-gradient(circle, var(--${theme}-primary) 0%, transparent 70%)` 
          }}
        ></div>
        
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-white/90 to-white/60 shadow-lg z-10 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
          style={{
            boxShadow: `0 0 15px var(--${theme}-primary, rgba(255,255,255,0.5))`,
          }}
          onClick={handleSpin}
          aria-label="Spin the wheel"
        >
          <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
            <div 
              className="w-8 h-8 rounded-full bg-gradient-to-br animate-pulse"
              style={{ 
                background: `radial-gradient(circle, var(--${theme}-primary) 0%, var(--${theme}-secondary) 100%)` 
              }}
            ></div>
          </div>
        </div>
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 w-8 h-8 z-10">
          <div 
            className="w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-t-[28px] border-t-white drop-shadow-lg mx-auto"
            style={{
              filter: `drop-shadow(0 0 5px var(--${theme}-primary))`,
            }}  
          ></div>
        </div>
      </div>

      <button
        onClick={handleSpin}
        disabled={isSpinning || entries.length < 2}
        className={`mt-10 px-12 py-5 bg-primary text-white rounded-full font-bold text-xl
                  transform transition-all duration-300 
                  ${isSpinning ? 
                    'opacity-50 cursor-not-allowed' : 
                    'hover:scale-105 hover:shadow-lg hover:shadow-primary/30 active:scale-95'
                  }`}
        style={{
          background: `linear-gradient(135deg, var(--${theme}-primary), var(--${theme}-secondary))`,
          boxShadow: `0 4px 20px var(--${theme}-primary, rgba(0,0,0,0.3))`,
          textShadow: '0 1px 2px rgba(0,0,0,0.3)'
        }}
      >
        {isSpinning ? 'SPINNING...' : 'SPIN'}
      </button>
    </div>
  );
};

export default SpinnerWheel;
