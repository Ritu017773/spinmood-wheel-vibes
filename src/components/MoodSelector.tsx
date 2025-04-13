
import React from 'react';
import { Book, CloudMoon, PartyPopper, Gift, Settings } from 'lucide-react';

type Mood = 'study' | 'chill' | 'party' | 'gift' | 'custom';

interface MoodSelectorProps {
  currentMood: Mood;
  onMoodChange: (mood: Mood) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ 
  currentMood, 
  onMoodChange 
}) => {
  const moods: { id: Mood; name: string; icon: React.ReactNode; description: string; gradient: string }[] = [
    {
      id: 'study',
      name: 'Study Mode',
      icon: <Book size={20} />,
      description: 'Educational & focus themes',
      gradient: 'from-[#0f4c81] to-[#87ceeb]'
    },
    {
      id: 'chill',
      name: 'Chill Mode',
      icon: <CloudMoon size={20} />,
      description: 'Relaxation & entertainment',
      gradient: 'from-[#a18cd1] to-[#fbc2eb]'
    },
    {
      id: 'party',
      name: 'Party Mode',
      icon: <PartyPopper size={20} />,
      description: 'Celebration & activities',
      gradient: 'from-[#ff6f00] to-[#d50000]'
    },
    {
      id: 'gift',
      name: 'Gift Mode',
      icon: <Gift size={20} />,
      description: 'Presents & surprises',
      gradient: 'from-[#f7b733] to-[#fc4a1a]'
    },
    {
      id: 'custom',
      name: 'Custom Mode',
      icon: <Settings size={20} />,
      description: 'Your own entries',
      gradient: 'from-[#11998e] to-[#38ef7d]'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h3 className="text-lg font-medium text-white mb-4 text-center">Choose Your Mood</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3">
        {moods.map((mood) => (
          <button
            key={mood.id}
            className={`${
              currentMood === mood.id
                ? 'ring-2 ring-offset-2 ring-offset-background ring-white/50 bg-white/10'
                : 'bg-white/5 hover:bg-white/10'
            } p-3 rounded-lg transition-all text-center flex flex-col items-center justify-center space-y-2 group`}
            onClick={() => onMoodChange(mood.id)}
          >
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                currentMood === mood.id ? 'text-white' : 'text-white/70'
              }`}
              style={{ 
                background: currentMood === mood.id 
                  ? `linear-gradient(135deg, var(--${mood.id}-primary), var(--${mood.id}-secondary))` 
                  : 'rgba(255,255,255,0.1)' 
              }}
            >
              {mood.icon}
            </div>
            <div>
              <div className={`font-medium ${currentMood === mood.id ? 'text-white' : 'text-white/80'}`}>
                {mood.name}
              </div>
              <div className="text-xs text-white/50 mt-1 hidden md:block">{mood.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
