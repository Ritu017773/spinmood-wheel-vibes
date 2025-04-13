
import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface AudioToggleProps {
  soundEnabled: boolean;
  toggleSound: () => void;
}

const AudioToggle: React.FC<AudioToggleProps> = ({ soundEnabled, toggleSound }) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="flex items-center space-x-2">
        {soundEnabled ? <Volume2 size={20} className="text-white" /> : <VolumeX size={20} className="text-white/50" />}
        <span className="text-sm text-white/80">Sound Effects</span>
      </div>
      <Switch 
        checked={soundEnabled}
        onCheckedChange={toggleSound} 
      />
    </div>
  );
};

export default AudioToggle;
