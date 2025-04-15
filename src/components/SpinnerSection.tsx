
import React from 'react';
import EntryManager from '@/components/EntryManager';
import SpinnerWheel from '@/components/SpinnerWheel';
import { studyOptions, chillOptions, partyOptions, giftOptions } from '@/data/spinnerOptions';

type Mood = 'study' | 'chill' | 'party' | 'gift' | 'custom';

interface SpinnerSectionProps {
  customEntries: string[];
  setCustomEntries: React.Dispatch<React.SetStateAction<string[]>>;
  currentMood: Mood;
  soundEnabled: boolean;
  isSpinning: boolean;
  setIsSpinning: React.Dispatch<React.SetStateAction<boolean>>;
  onSpinComplete: (winner: string) => void;
}

const SpinnerSection: React.FC<SpinnerSectionProps> = ({
  customEntries,
  setCustomEntries,
  currentMood,
  soundEnabled,
  isSpinning,
  setIsSpinning,
  onSpinComplete
}) => {
  const getCurrentEntries = () => {
    switch (currentMood) {
      case 'study':
        return studyOptions;
      case 'chill':
        return chillOptions;
      case 'party':
        return partyOptions;
      case 'gift':
        return giftOptions;
      case 'custom':
        return customEntries;
      default:
        return customEntries;
    }
  };

  // Get theme-specific gradient colors for text
  const getThemeGradient = () => {
    switch (currentMood) {
      case 'study':
        return 'from-blue-300 via-indigo-400 to-blue-600';
      case 'chill':
        return 'from-purple-300 via-pink-400 to-purple-500';
      case 'party':
        return 'from-orange-300 via-red-400 to-pink-400';
      case 'gift':
        return 'from-amber-300 via-orange-300 to-red-300';
      case 'custom':
        return 'from-emerald-300 via-teal-300 to-cyan-400';
      default:
        return 'from-blue-400 to-purple-500';
    }
  };

  // Get theme-specific box shadow
  const getBoxShadow = () => {
    switch (currentMood) {
      case 'study':
        return 'shadow-blue-800/20';
      case 'chill':
        return 'shadow-purple-800/20';
      case 'party':
        return 'shadow-red-800/20';
      case 'gift':
        return 'shadow-amber-800/20';
      case 'custom':
        return 'shadow-emerald-800/20';
      default:
        return 'shadow-blue-800/20';
    }
  };

  return (
    <div id="spinner" className="py-16 transition-all duration-500 scroll-mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-white drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
          Your Custom Spinner Wheel
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
          <div className="order-2 lg:order-1">
            {currentMood === 'custom' ? (
              <EntryManager entries={customEntries} setEntries={setCustomEntries} />
            ) : (
              <div className="w-full max-w-md mx-auto p-4 space-y-6">
                <div className="text-center">
                  <h3 
                    className={`text-3xl font-extrabold mb-6 bg-gradient-to-r ${getThemeGradient()} bg-clip-text text-transparent animate-pulse-slow`}
                    style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
                  >
                    {currentMood.charAt(0).toUpperCase() + currentMood.slice(1)} Mode
                  </h3>
                  <p className="text-white text-xl font-bold mb-4 drop-shadow-md" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>
                    Choose from <span className="font-extrabold text-2xl bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">{getCurrentEntries().length}</span> predefined options
                  </p>
                  <div className={`p-6 bg-white/15 backdrop-blur-md rounded-lg border border-white/20 shadow-xl ${getBoxShadow()}`}>
                    <div className="text-xl font-bold text-white leading-relaxed drop-shadow-md" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>
                      Spin the wheel to randomly select from our curated list of {currentMood} options!
                    </div>
                    <div 
                      className={`mt-5 text-xl font-bold bg-gradient-to-r ${getThemeGradient()} bg-clip-text text-transparent`}
                      style={{ textShadow: '0 1px 1px rgba(0,0,0,0.2)' }}
                    >
                      {currentMood === 'study' && "Perfect for classroom activities and educational decisions!"}
                      {currentMood === 'chill' && "Ideal for relaxed, low-pressure choices and entertainment!"}
                      {currentMood === 'party' && "Bring excitement to your celebrations and gatherings!"}
                      {currentMood === 'gift' && "Make gift-giving and prize selections memorable!"}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <SpinnerWheel 
              entries={getCurrentEntries()} 
              onSpinComplete={onSpinComplete}
              theme={currentMood}
              soundEnabled={soundEnabled}
              isSpinning={isSpinning}
              setIsSpinning={setIsSpinning}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinnerSection;
