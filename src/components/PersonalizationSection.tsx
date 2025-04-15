
import React from 'react';
import MoodSelector from '@/components/MoodSelector';
import AudioToggle from '@/components/AudioToggle';

type Mood = 'study' | 'chill' | 'party' | 'gift' | 'custom';

interface PersonalizationSectionProps {
  currentMood: Mood;
  onMoodChange: (mood: Mood) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

const PersonalizationSection: React.FC<PersonalizationSectionProps> = ({
  currentMood,
  onMoodChange,
  soundEnabled,
  toggleSound
}) => {
  return (
    <div id="themes" className="py-16 bg-black/30 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center mb-12 text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
          Personalize Your Experience
        </h2>
        
        <MoodSelector 
          currentMood={currentMood} 
          onMoodChange={onMoodChange} 
        />
        
        <div className="mt-12 text-center">
          <AudioToggle 
            soundEnabled={soundEnabled} 
            toggleSound={toggleSound} 
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalizationSection;
