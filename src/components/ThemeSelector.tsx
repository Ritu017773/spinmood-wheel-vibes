
import React from 'react';
import { Book, CloudMoon, PartyPopper, Gift } from 'lucide-react';

type Theme = 'study' | 'chill' | 'party' | 'gift';

interface ThemeSelectorProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ 
  currentTheme, 
  onThemeChange 
}) => {
  const themes: { id: Theme; name: string; icon: React.ReactNode; description: string }[] = [
    {
      id: 'study',
      name: 'Study Mode',
      icon: <Book size={20} />,
      description: 'Calm tones, focused environment'
    },
    {
      id: 'chill',
      name: 'Chill Mode',
      icon: <CloudMoon size={20} />,
      description: 'Relaxed vibes for casual decisions'
    },
    {
      id: 'party',
      name: 'Party Mode',
      icon: <PartyPopper size={20} />,
      description: 'Energetic with fun animations'
    },
    {
      id: 'gift',
      name: 'Gift Mode',
      icon: <Gift size={20} />,
      description: 'Surprise-style for gifts & rewards'
    }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h3 className="text-lg font-medium text-white mb-4 text-center">Choose Your Mood</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {themes.map((theme) => (
          <button
            key={theme.id}
            className={`${
              currentTheme === theme.id
                ? 'ring-2 ring-offset-2 ring-offset-background ring-white/50 bg-white/10'
                : 'bg-white/5 hover:bg-white/10'
            } p-4 rounded-lg transition-all text-center flex flex-col items-center justify-center space-y-2`}
            onClick={() => onThemeChange(theme.id)}
          >
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentTheme === theme.id ? 'text-white' : 'text-white/70'
              }`}
              style={{ backgroundColor: currentTheme === theme.id 
                ? `var(--${theme.id}-primary)` 
                : 'rgba(255,255,255,0.1)' 
              }}
            >
              {theme.icon}
            </div>
            <div>
              <div className={`font-medium ${currentTheme === theme.id ? 'text-white' : 'text-white/80'}`}>
                {theme.name}
              </div>
              <div className="text-xs text-white/50 mt-1">{theme.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
