
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
      
      // Play sound exactly when result is revealed
      if (soundEnabled && resultSoundRef.current) {
        resultSoundRef.current.currentTime = 0;
        resultSoundRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      
      setShowCelebration(true);
      
      setScale(1.08);
      setTimeout(() => setScale(1), 200);
      
      // Extended result display time (5-6 seconds)
      setTimeout(() => {
        onSpinComplete(actualWinner);
        setIsSpinning(false);
        
        setTimeout(() => {
          setShowCelebration(false);
        }, 6000); // Extended celebration duration
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

  const getSegmentColor = (index: number) => {
    // Enhanced color wheel with 40 distinct colors for better visibility
    const colorWheel = [
      '#FF5252', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', 
      '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50',
      '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
      '#FF5722', '#795548', '#9E9E9E', '#607D8B', '#F44336',
      '#E53935', '#D32F2F', '#C2185B', '#AD1457', '#880E4F',
      '#8E24AA', '#6A1B9A', '#4A148C', '#5E35B1', '#3949AB',
      '#283593', '#1A237E', '#1976D2', '#1565C0', '#0D47A1',
      '#0097A7', '#00796B', '#00695C', '#2E7D32', '#1B5E20',
      '#33691E', '#F57F17', '#FF6F00', '#E65100', '#BF360C'
    ];
    
    if (entries.length > 40) {
      const hue = (index * (360 / entries.length)) % 360;
      const saturation = 70 + (index % 3) * 10;
      const lightness = 45 + (index % 5) * 5;
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    } 
    
    const baseColorIndex = index % colorWheel.length;
    return colorWheel[baseColorIndex];
  };

  const getFontSize = () => {
    if (entries.length > 30) {
      return '0.8rem';
    } else if (entries.length > 20) {
      return '0.9rem';
    } else if (entries.length > 10) {
      return '1rem';
    }
    return '1.1rem';
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 relative">
      <Confetti isActive={showCelebration} theme={theme} />
      
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
            
            const segmentColor = getSegmentColor(index);
            
            const isHighlighted = index === hoverSlice;
            
            const fontSize = getFontSize();
            
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
                           font-bold truncate px-8 pt-8"
                  style={{ 
                    transform: `rotate(${sliceSizeDegrees/2}deg) skew(${-skew}deg)`,
                    fontSize: fontSize,
                    fontWeight: 800,
                    textShadow: '1px 1px 3px rgba(0,0,0,0.9), 0 0 5px rgba(0,0,0,0.7)'
                  }}
                >
                  {entry}
                </div>
              </div>
            );
          })}

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
