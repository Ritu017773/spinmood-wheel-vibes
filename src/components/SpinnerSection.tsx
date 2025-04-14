
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
              <div className="w-full max-w-md mx-auto p-4 space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-white mb-3">{currentMood.charAt(0).toUpperCase() + currentMood.slice(1)} Mode</h3>
                  <p className="text-white/70 text-sm mb-4">
                    Choose from <span className="font-bold">{getCurrentEntries().length}</span> predefined options
                  </p>
                  <div className="p-4 bg-white/5 backdrop-blur-md rounded-lg border border-white/10">
                    <div className="text-sm font-medium text-white/80">
                      Spin the wheel to randomly select from our curated list of {currentMood} options!
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
