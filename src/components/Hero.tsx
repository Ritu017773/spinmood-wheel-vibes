
import React from 'react';
import { FerrisWheel } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = ({ onStartClick }: { onStartClick: () => void }) => {
  return (
    <section className="w-full min-h-[80vh] flex flex-col items-center justify-center relative particle-bg particle-floating py-16 px-4 sm:px-6">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-background to-background z-0"></div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
        <div className="mb-8 flex justify-center">
          <FerrisWheel className="h-24 w-24 text-primary animate-spin-slow glow-strong animate-glow-pulse" />
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          <span className="block mb-2">SpinMood ⭐</span>
          <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
            The Best Free Online Spinner Wheel
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
          Make Every Decision Fun & Easy. SpinMood is lightning-fast, sound-enabled, mood-themed — from giveaways to study to parties.
        </p>
        
        <div className="pt-6">
          <Button
            onClick={onStartClick}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/20 animate-pulse-slow glow"
          >
            Start Spinning
          </Button>
        </div>
        
        <div className="pt-8 text-sm text-white/60 flex flex-wrap justify-center gap-4">
          <span className="flex items-center"><span className="h-1.5 w-1.5 rounded-full bg-primary mr-2 glow"></span> Giveaways</span>
          <span className="flex items-center"><span className="h-1.5 w-1.5 rounded-full bg-study-primary mr-2 glow"></span> Study</span>
          <span className="flex items-center"><span className="h-1.5 w-1.5 rounded-full bg-chill-primary mr-2 glow"></span> Chill</span>
          <span className="flex items-center"><span className="h-1.5 w-1.5 rounded-full bg-party-primary mr-2 glow"></span> Fun</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
