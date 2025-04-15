
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
        saturation = 70 + (index % 5) * 5;
        lightness = 50 + (index % 7) * 3;
    }
    
    // Ensure lightness isn't too high (too pale) or too low (too dark) for text readability
    lightness = Math.max(40, Math.min(lightness, 65));
    
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  // Dynamic font sizing based on number of entries
  const getFontSize = () => {
    if (entries.length > 35) return '0.65rem';
    if (entries.length > 30) return '0.7rem';
    if (entries.length > 25) return '0.75rem';
    if (entries.length > 20) return '0.8rem';
    if (entries.length > 15) return '0.9rem';
    if (entries.length > 10) return '1rem';
    return '1.1rem';
  };

  // Enhanced text shadow for better readability
  const getTextShadow = () => {
    return '0 0 2px rgba(0,0,0,0.8), 0 1px 1px rgba(0,0,0,0.9)';
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
          {entries.length > 0 && entries.map((entry, index) => {
            const sliceSizeDegrees = 360 / entries.length;
            const rotation = index * sliceSizeDegrees;
            // Calculate skew angle based on entry count to ensure proper segment shape
            const skew = entries.length <= 2 ? 0 : (90 - sliceSizeDegrees);
            
            const segmentColor = getSegmentColor(index, entries.length);
            const isHighlighted = index === hoverSlice;
            const fontSize = getFontSize();
            const textShadow = getTextShadow();
            
            // Calculate optimal text rotation angle based on segment size
            const textRotateAngle = sliceSizeDegrees / 2;
            
            return (
              <div
                key={index}
                className="absolute top-0 right-0 w-1/2 h-1/2 origin-bottom-left text-white transition-opacity duration-300"
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
                  className="absolute flex items-center justify-center truncate"
                  style={{ 
                    // Position text optimally based on segment size
                    transform: `rotate(${textRotateAngle}deg) skew(${-skew}deg)`,
                    width: entries.length > 20 ? '150%' : '120%',
                    left: entries.length > 20 ? '-10%' : '-5%',
                    bottom: '5%',
                    textAlign: 'center',
                    fontSize: fontSize,
                    fontWeight: 700,
                    // Enhanced text shadow for better readability against all background colors
                    textShadow: textShadow,
                    // Add white text stroke for extra readability on darker backgrounds
                    WebkitTextStroke: entries.length > 25 ? '0.2px white' : 'none'
                  }}
                >
                  <span className="truncate max-w-full inline-block">
                    {entry}
                  </span>
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
