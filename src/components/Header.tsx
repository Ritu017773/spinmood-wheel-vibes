
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const Header = ({ onStartClick }: { onStartClick: () => void }) => {
  return (
    <header className="w-full py-4 px-4 sm:px-6 flex justify-between items-center backdrop-blur-sm bg-background/80 border-b border-white/10 sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <div className="logo-bounce">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10">
            <circle cx="20" cy="20" r="20" fill="#3B82F6" />
            <circle cx="20" cy="20" r="18" stroke="white" strokeWidth="1.5" fill="none" />
            <circle cx="20" cy="20" r="2" fill="white" />
            <circle cx="20" cy="11" r="1.5" fill="white" />
            <circle cx="20" cy="29" r="1.5" fill="white" />
            <circle cx="11" cy="20" r="1.5" fill="white" />
            <circle cx="29" cy="20" r="1.5" fill="white" />
            <circle cx="26.5" cy="13.5" r="1.5" fill="white" />
            <circle cx="13.5" cy="26.5" r="1.5" fill="white" />
            <circle cx="13.5" cy="13.5" r="1.5" fill="white" />
            <circle cx="26.5" cy="26.5" r="1.5" fill="white" />
            <path d="M20 10V14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20 26V30" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M14 14L16 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M24 24L26 26" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M10 20H14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M26 20H30" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M14 26L16 24" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M24 16L26 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <span className="font-bold text-xl md:text-2xl bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
          SpinMood
        </span>
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            onClick={onStartClick}
            className="bg-primary hover:bg-primary/90 text-primary-foreground glow font-bold"
          >
            Start Spinning
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span className="font-medium">Jump to the spinner section</span>
        </TooltipContent>
      </Tooltip>
    </header>
  );
};

export default Header;
