
import React from 'react';
import { FerrisWheel } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = ({ onStartClick }: { onStartClick: () => void }) => {
  return (
    <header className="w-full py-4 px-4 sm:px-6 flex justify-between items-center backdrop-blur-sm bg-background/80 border-b border-white/10 sticky top-0 z-50">
      <div className="flex items-center space-x-2">
        <FerrisWheel className="h-8 w-8 text-primary animate-spin-slow" />
        <span className="font-bold text-xl md:text-2xl bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
          SpinMood
        </span>
      </div>
      <Button 
        onClick={onStartClick}
        className="bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        Start Spinning
      </Button>
    </header>
  );
};

export default Header;
