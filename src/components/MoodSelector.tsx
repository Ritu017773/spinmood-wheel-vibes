
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
  const moods: { 
    id: Mood; 
    name: string; 
    icon: React.ReactNode; 
    description: string; 
    gradient: string;
    hoverGradient: string;
    iconGradient: string;
  }[] = [
    {
      id: 'study',
      name: 'Study Mode',
      icon: <Book size={20} />,
      description: 'Educational & focus themes',
      gradient: 'from-blue-600 to-indigo-700',
      hoverGradient: 'from-blue-500 to-indigo-600',
      iconGradient: 'from-blue-400 to-indigo-500'
    },
    {
      id: 'chill',
      name: 'Chill Mode',
      icon: <CloudMoon size={20} />,
      description: 'Relaxation & entertainment',
      gradient: 'from-purple-600 to-pink-500',
      hoverGradient: 'from-purple-500 to-pink-400',
      iconGradient: 'from-purple-400 to-pink-300'
    },
    {
      id: 'party',
      name: 'Party Mode',
      icon: <PartyPopper size={20} />,
      description: 'Celebration & activities',
      gradient: 'from-orange-500 to-red-600',
      hoverGradient: 'from-orange-400 to-red-500',
      iconGradient: 'from-orange-300 to-red-400'
    },
    {
      id: 'gift',
      name: 'Gift Mode',
      icon: <Gift size={20} />,
      description: 'Presents & surprises',
      gradient: 'from-amber-500 to-orange-600',
      hoverGradient: 'from-amber-400 to-orange-500',
      iconGradient: 'from-amber-300 to-orange-400'
    },
    {
      id: 'custom',
      name: 'Custom Mode',
      icon: <Settings size={20} />,
      description: 'Your own entries',
      gradient: 'from-emerald-500 to-teal-600',
      hoverGradient: 'from-emerald-400 to-teal-500',
      iconGradient: 'from-emerald-300 to-teal-400'
    }
  ];

  const handleMoodChange = (mood: Mood) => {
    onMoodChange(mood);
    
    // Scroll to spinner section after mood change
    setTimeout(() => {
      const spinnerSection = document.getElementById('spinner');
      if (spinnerSection) {
        spinnerSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h3 className="text-xl font-bold text-white mb-6 text-center">Choose Your Mood</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5">
        {moods.map((mood) => (
          <button
            key={mood.id}
            className={`
              relative overflow-hidden rounded-lg transition-all duration-300 
              transform hover:scale-105 active:scale-95 group
              ${currentMood === mood.id 
                ? 'ring-2 ring-offset-4 ring-offset-black/20 ring-white/70 shadow-lg' 
                : 'hover:shadow-xl'}
            `}
            onClick={() => handleMoodChange(mood.id)}
          >
            {/* Animated background */}
            <div className={`
              absolute inset-0 bg-gradient-to-br ${currentMood === mood.id ? mood.gradient : 'from-white/5 to-white/10'}
              group-hover:${mood.hoverGradient} transition-all duration-300
            `}></div>
            
            {/* Content */}
            <div className="relative p-4 flex flex-col items-center justify-center space-y-3 z-10">
              <div 
                className={`
                  w-14 h-14 rounded-full flex items-center justify-center
                  transition-all duration-500 group-hover:scale-110 shadow-lg
                  ${currentMood === mood.id 
                    ? `bg-gradient-to-br ${mood.iconGradient} text-white` 
                    : 'bg-white/10 text-white/80 group-hover:text-white'}
                `}
              >
                {mood.icon}
              </div>
              <div className="text-center">
                <div className={`
                  font-bold text-lg tracking-wide
                  ${currentMood === mood.id ? 'text-white' : 'text-white/80 group-hover:text-white'}
                `}>
                  {mood.name}
                </div>
                <div className="text-xs text-white/70 mt-1 hidden md:block font-medium">
                  {mood.description}
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            {currentMood === mood.id && (
              <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-white/20 blur-xl"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
