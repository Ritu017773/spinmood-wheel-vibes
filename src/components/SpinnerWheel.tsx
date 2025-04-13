
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
  
  useEffect(() => {
    spinSoundRef.current = new Audio('/sounds/spin.mp3');
    resultSoundRef.current = new Audio('/sounds/result.mp3');
    
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

  // Idle animation effect
  useEffect(() => {
    if (isSpinning || entries.length < 2) return;
    
    let idleAngle = 0;
    let direction = 1;
    let speed = 0.05;
    
    const animateIdle = () => {
      if (isSpinning) return;
      
      idleAngle += speed * direction;
      
      // Gentle back and forth motion
      if (idleAngle > 3) direction = -1;
      if (idleAngle < -3) direction = 1;
      
      if (wheelRef.current) {
        wheelRef.current.style.transform = `rotate(${rotationDeg + idleAngle}deg)`;
      }
      
      idleAnimationRef.current = requestAnimationFrame(animateIdle);
    };
    
    idleAnimationRef.current = requestAnimationFrame(animateIdle);
    
    return () => {
      if (idleAnimationRef.current) {
        cancelAnimationFrame(idleAnimationRef.current);
      }
    };
  }, [isSpinning, entries.length, rotationDeg]);

  const handleSpin = () => {
    if (isSpinning || entries.length < 2) return;
    
    if (entries.length < 2) {
      toast.error("Add at least 2 entries to spin the wheel!");
      return;
    }
    
    setIsSpinning(true);
    setWinner(null);

    // Cancel any idle animation
    if (idleAnimationRef.current) {
      cancelAnimationFrame(idleAnimationRef.current);
    }

    // Play spin sound
    if (soundEnabled && spinSoundRef.current) {
      spinSoundRef.current.currentTime = 0;
      spinSoundRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    
    // Calculate the spin
    const spinDegrees = 1440 + Math.random() * 360;
    const newRotationDeg = rotationDeg + spinDegrees;
    setRotationDeg(newRotationDeg);
    
    // Calculate the winner
    setTimeout(() => {
      const degrees = newRotationDeg % 360;
      const sliceSizeDegrees = 360 / entries.length;
      const winningIndex = Math.floor(degrees / sliceSizeDegrees);
      const actualWinner = entries[entries.length - 1 - winningIndex];
      
      setWinner(actualWinner);
      onSpinComplete(actualWinner);
      
      // Play result sound
      if (soundEnabled && resultSoundRef.current) {
        resultSoundRef.current.currentTime = 0;
        resultSoundRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      
      setIsSpinning(false);
    }, 5000); // Match this to the CSS animation duration
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-md aspect-square">
        <div 
          ref={wheelRef}
          className={`absolute w-full h-full rounded-full overflow-hidden shadow-lg border-4 
                     border-white/10 transition-transform duration-[5s] 
                     ease-[cubic-bezier(0.2,0.8,0.2,1)]`}
          style={{ 
            transform: `rotate(${rotationDeg}deg)`,
            boxShadow: '0 0 30px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(0, 0, 0, 0.3)'
          }}
        >
          {entries.map((entry, index) => {
            const sliceSizeDegrees = 360 / entries.length;
            const rotation = index * sliceSizeDegrees;
            const skew = 90 - sliceSizeDegrees;
            
            // Alternate colors based on theme
            const baseColor = index % 2 === 0 ? 
              `var(--wheel-primary)` : 
              `var(--wheel-secondary)`;
            
            return (
              <div
                key={index}
                className={`absolute top-0 right-0 w-1/2 h-1/2 origin-bottom-left text-white/90`}
                style={{
                  transform: `rotate(${rotation}deg) skew(${skew}deg)`,
                  background: baseColor,
                }}
              >
                <div 
                  className="absolute -left-1 bottom-0 w-[200%] text-center rotate-[55deg] text-sm md:text-base font-medium truncate px-8 pt-8"
                  style={{ transform: `rotate(${sliceSizeDegrees/2}deg) skew(${-skew}deg)` }}
                >
                  {entry}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Center spindle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg z-10 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-gray-800"></div>
        </div>
        
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-3 w-6 h-6 z-10">
          <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[18px] border-t-white mx-auto"></div>
        </div>
      </div>

      <button
        onClick={handleSpin}
        disabled={isSpinning || entries.length < 2}
        className={`mt-8 px-8 py-4 bg-primary text-white rounded-full font-bold text-lg
                  transform transition-all duration-300 ${
                    isSpinning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-lg hover:shadow-primary/30'
                  }`}
      >
        {isSpinning ? 'Spinning...' : 'SPIN'}
      </button>
    </div>
  );
};

export default SpinnerWheel;
