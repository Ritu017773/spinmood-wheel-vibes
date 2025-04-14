
import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';

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
  const spinSoundRef = useRef<HTMLAudioElement | null>(null);
  const resultSoundRef = useRef<HTMLAudioElement | null>(null);
  const idleAnimationRef = useRef<number | null>(null);
  const [hoverSlice, setHoverSlice] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  
  // Initialize audio with direct URLs
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

  // Idle animation effect - more fluid and bouncy
  useEffect(() => {
    if (isSpinning || entries.length < 2) return;
    
    let idleAngle = 0;
    let direction = 1;
    let speed = 0.05; // Slightly faster for more noticeable movement
    
    const animateIdle = () => {
      if (isSpinning) return;
      
      idleAngle += speed * direction;
      
      // More pronounced back and forth motion
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

  const handleSpin = () => {
    if (isSpinning || entries.length < 2) return;
    
    if (entries.length < 2) {
      toast.error("Add at least 2 entries to spin the wheel!");
      return;
    }
    
    setIsSpinning(true);
    setWinner(null);
    
    // Enhanced animation sequence
    // Initial anticipation - slight pullback
    setScale(0.98);
    setTimeout(() => {
      // Then quick scale up for emphasis
      setScale(1.05);
      setTimeout(() => setScale(1), 200);
    }, 150);

    // Cancel any idle animation
    if (idleAnimationRef.current) {
      cancelAnimationFrame(idleAnimationRef.current);
    }

    // Play spin sound with fallback
    if (soundEnabled && spinSoundRef.current) {
      spinSoundRef.current.currentTime = 0;
      spinSoundRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    
    // Calculate the spin with variable speed profile for more natural motion
    const minSpins = 6; // Increased minimum spins
    const maxSpins = 12; // Increased maximum spins
    const spinCount = minSpins + Math.random() * (maxSpins - minSpins);
    const spinDegrees = spinCount * 360 + Math.random() * 360;
    const newRotationDeg = rotationDeg + spinDegrees;
    
    // Apply motion blur during fast spin for premium feel
    if (wheelRef.current) {
      wheelRef.current.style.filter = 'blur(2px)';
      
      // Premium wheel spin animation with easing
      wheelRef.current.style.transition = 'transform 5s cubic-bezier(0.18, 0.89, 0.32, 1.28)';
      wheelRef.current.style.transform = `rotate(${newRotationDeg}deg)`;
    }
    
    setRotationDeg(newRotationDeg);
    
    // Calculate the winner with adjusted timing for sound (5000ms to match the animation duration)
    setTimeout(() => {
      // Remove blur effect with slight delay for smooth transition
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
      
      // FIXED: Only play result sound after wheel completely stops
      if (soundEnabled && resultSoundRef.current) {
        resultSoundRef.current.currentTime = 0;
        resultSoundRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      
      // Small bounce effect when result is shown
      setScale(1.08);
      setTimeout(() => setScale(1), 200);
      
      // FIXED: Only call the onSpinComplete after wheel is fully stopped
      onSpinComplete(actualWinner);
      setIsSpinning(false);
    }, 5000); // Match this to the CSS animation duration
  };

  // Calculate dynamic size based on container
  const getWheelSize = () => {
    if (typeof window === 'undefined') return '100%';
    const viewWidth = window.innerWidth;
    
    if (viewWidth < 640) {
      return '90vw'; // Almost full width on mobile
    } else if (viewWidth < 1024) {
      return '70vw'; // Larger on tablets
    } else {
      return 'min(65vh, 600px)'; // Even larger on desktop, but capped
    }
  };

  const sliceHoverHandler = (index: number | null) => {
    if (!isSpinning) {
      setHoverSlice(index);
    }
  };

  // Generate unique colors for each segment based on index
  const getSegmentColor = (index: number, isEven: boolean) => {
    // Base colors for each theme
    const themeColors = {
      study: ['#4a6fa5', '#6698c8'],
      chill: ['#c084fc', '#f9a8d4'],
      party: ['#f97316', '#ef4444'],
      gift: ['#f59e0b', '#d97706'],
      custom: ['#10b981', '#059669']
    };
    
    // Select base colors based on theme
    const baseColors = themeColors[theme] || themeColors.custom;
    
    // Create variation based on index for larger numbers of entries
    if (entries.length > 10) {
      // For more entries, generate distinct colors
      const hue = (index * (360 / entries.length)) % 360;
      const saturation = isEven ? '85%' : '70%';
      const lightness = isEven ? '55%' : '65%';
      return `hsl(${hue}, ${saturation}, ${lightness})`;
    } else {
      // For fewer entries, use theme colors with variations
      const baseColor = isEven ? baseColors[0] : baseColors[1];
      // Add subtle variations to make adjacent segments more distinct
      const variation = index * 8;
      return baseColor;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative" style={{ width: getWheelSize(), height: getWheelSize() }}>
        <div 
          ref={wheelRef}
          className={`absolute w-full h-full rounded-full overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.3)] border-4 
                     border-white/10`}
          style={{ 
            transform: `rotate(${rotationDeg}deg) scale(${scale})`,
            boxShadow: `0 0 30px rgba(0, 0, 0, 0.3), 0 0 20px var(--${theme}-primary, rgba(255,255,255,0.3))`,
            transition: isSpinning ? 'transform 5s cubic-bezier(0.18, 0.89, 0.32, 1.28)' : 'transform 0.3s ease-out'
          }}
        >
          {entries.map((entry, index) => {
            const sliceSizeDegrees = 360 / entries.length;
            const rotation = index * sliceSizeDegrees;
            const skew = 90 - sliceSizeDegrees;
            
            // Get unique color for each segment
            const segmentColor = getSegmentColor(index, index % 2 === 0);
            
            const isHighlighted = index === hoverSlice;
            
            return (
              <div
                key={index}
                className={`absolute top-0 right-0 w-1/2 h-1/2 origin-bottom-left text-white/90 
                          transition-opacity duration-300`}
                style={{
                  transform: `rotate(${rotation}deg) skew(${skew}deg)`,
                  background: segmentColor,
                  opacity: isHighlighted ? 0.8 : 1,
                  boxShadow: isHighlighted ? 'inset 0 0 15px rgba(255,255,255,0.3)' : 'none'
                }}
                onMouseEnter={() => sliceHoverHandler(index)}
                onMouseLeave={() => sliceHoverHandler(null)}
              >
                <div 
                  className="absolute -left-1 bottom-0 w-[200%] text-center rotate-[55deg] 
                           text-sm md:text-base font-bold truncate px-8 pt-8"
                  style={{ 
                    transform: `rotate(${sliceSizeDegrees/2}deg) skew(${-skew}deg)`,
                    // IMPROVED: Make text more visible with text shadow
                    textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
                  }}
                >
                  {entry}
                </div>
              </div>
            );
          })}

          {/* Enhanced light reflections for premium feel */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none rounded-full"></div>
        </div>
        
        {/* Enhanced glow effect around the wheel */}
        <div 
          className="absolute -inset-4 rounded-full opacity-30 blur-xl z-0 animate-pulse-slow pointer-events-none"
          style={{ 
            background: `radial-gradient(circle, var(--${theme}-primary) 0%, transparent 70%)` 
          }}
        ></div>
        
        {/* Enhanced center spindle with more elaborate design - now clickable */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 
                   rounded-full bg-gradient-to-br from-white/90 to-white/60 shadow-lg z-10 
                   flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
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
        
        {/* Enhanced pointer with shadow and glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 w-8 h-8 z-10">
          <div 
            className="w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] 
                     border-r-transparent border-t-[28px] border-t-white drop-shadow-lg mx-auto"
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
        }}
      >
        {isSpinning ? 'SPINNING...' : 'SPIN'}
      </button>
    </div>
  );
};

export default SpinnerWheel;
