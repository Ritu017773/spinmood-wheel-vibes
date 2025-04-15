
import React, { useRef } from 'react';
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
        return 'from-blue-600 via-indigo-500 to-blue-700';
      case 'chill':
        return 'from-purple-500 via-pink-400 to-purple-600';
      case 'party':
        return 'from-orange-500 via-red-500 to-pink-500';
      case 'gift':
        return 'from-amber-500 via-orange-400 to-red-400';
      case 'custom':
        return 'from-emerald-500 via-teal-400 to-cyan-500';
      default:
        return 'from-blue-600 to-purple-600';
    }
  };

  return (
    <div id="spinner" className="py-16 transition-all duration-500">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Your Custom Spinner Wheel
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
          <div className="order-2 lg:order-1">
            {currentMood === 'custom' ? (
              <EntryManager entries={customEntries} setEntries={setCustomEntries} />
            ) : (
              <div className="w-full max-w-md mx-auto p-4 space-y-6">
                <div className="text-center">
                  <h3 className={`text-2xl font-bold mb-3 bg-gradient-to-r ${getThemeGradient()} bg-clip-text text-transparent`}>
                    {currentMood.charAt(0).toUpperCase() + currentMood.slice(1)} Mode
                  </h3>
                  <p className="text-white text-lg font-medium mb-4">
                    Choose from <span className="font-extrabold text-xl">{getCurrentEntries().length}</span> predefined options
                  </p>
                  <div className="p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-lg">
                    <div className="text-lg font-semibold text-white leading-relaxed">
                      Spin the wheel to randomly select from our curated list of {currentMood} options!
                    </div>
                    <div className={`mt-3 text-base font-medium bg-gradient-to-r ${getThemeGradient()} bg-clip-text text-transparent`}>
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
