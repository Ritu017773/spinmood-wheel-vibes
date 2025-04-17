
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Link } from 'react-router-dom';

const Header = ({ onStartClick }: { onStartClick: () => void }) => {
  return (
    <header className="w-full py-4 px-4 sm:px-6 flex justify-between items-center backdrop-blur-sm bg-background/80 border-b border-white/10 sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <div className="logo-bounce">
          <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="SpinMood Ferris Wheel Logo">
            {/* Main Structure */}
            <circle cx="50" cy="50" r="38" stroke="#a855f7" strokeWidth="6" fill="none" /> {/* Outer Ring (Purple) */}
            <circle cx="50" cy="50" r="15" fill="#facc15" /> {/* Center Circle (Yellow) */}

            {/* Spokes (Dark Purple) */}
            <line x1="50" y1="50" x2="50" y2="12" stroke="#6b21a8" strokeWidth="5"/>
            <line x1="50" y1="50" x2="50" y2="88" stroke="#6b21a8" strokeWidth="5"/>
            <line x1="50" y1="50" x2="12" y2="50" stroke="#6b21a8" strokeWidth="5"/>
            <line x1="50" y1="50" x2="88" y2="50" stroke="#6b21a8" strokeWidth="5"/>
            <line x1="50" y1="50" x2="26.2" y2="26.2" stroke="#6b21a8" strokeWidth="5"/>
            <line x1="50" y1="50" x2="73.8" y2="73.8" stroke="#6b21a8" strokeWidth="5"/>
            <line x1="50" y1="50" x2="26.2" y2="73.8" stroke="#6b21a8" strokeWidth="5"/>
            <line x1="50" y1="50" x2="73.8" y2="26.2" stroke="#6b21a8" strokeWidth="5"/>

            {/* Cabins (Representational - Lilac with Grey Top) */}
            <rect x="45" y="5" width="10" height="12" rx="3" fill="#c4b5fd"/> <rect x="45" y="5" width="10" height="5" rx="2" fill="#d1d5db"/>
            <rect x="45" y="83" width="10" height="12" rx="3" fill="#c4b5fd" transform="rotate(180 50 89)"/> <rect x="45" y="83" width="10" height="5" rx="2" fill="#d1d5db" transform="rotate(180 50 89)"/>
            <rect x="5" y="45" width="12" height="10" rx="3" fill="#c4b5fd" transform="rotate(-90 11 50)"/> <rect x="5" y="45" width="5" height="10" rx="2" fill="#d1d5db" transform="rotate(-90 11 50)"/>
            <rect x="83" y="45" width="12" height="10" rx="3" fill="#c4b5fd" transform="rotate(90 89 50)"/> <rect x="83" y="45" width="5" height="10" rx="2" fill="#d1d5db" transform="rotate(90 89 50)"/>
            <rect x="20.2" y="20.2" width="11" height="11" rx="3" fill="#c4b5fd" transform="rotate(-45 26.2 26.2)"/> <rect x="20.2" y="20.2" width="8" height="5" rx="2" fill="#d1d5db" transform="rotate(-45 26.2 26.2) translate(0, -2)"/>
            <rect x="68.8" y="68.8" width="11" height="11" rx="3" fill="#c4b5fd" transform="rotate(135 73.8 73.8)"/> <rect x="68.8" y="68.8" width="8" height="5" rx="2" fill="#d1d5db" transform="rotate(135 73.8 73.8) translate(0, -2)"/>
            <rect x="20.2" y="68.8" width="11" height="11" rx="3" fill="#c4b5fd" transform="rotate(-135 26.2 73.8)"/> <rect x="20.2" y="68.8" width="8" height="5" rx="2" fill="#d1d5db" transform="rotate(-135 26.2 73.8) translate(0, -2)"/>
            <rect x="68.8" y="20.2" width="11" height="11" rx="3" fill="#c4b5fd" transform="rotate(45 73.8 26.2)"/> <rect x="68.8" y="20.2" width="8" height="5" rx="2" fill="#d1d5db" transform="rotate(45 73.8 26.2) translate(0, -2)"/>

            {/* Stand (Light Lilac) */}
            <line x1="35" y1="88" x2="50" y2="65" stroke="#e0e7ff" strokeWidth="6"/>
            <line x1="65" y1="88" x2="50" y2="65" stroke="#e0e7ff" strokeWidth="6"/>
            <line x1="30" y1="88" x2="70" y2="88" stroke="#e0e7ff" strokeWidth="6" strokeLinecap="round"/>
          </svg>
        </div>
        <Link to="/" className="font-bold text-xl md:text-2xl bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
          SpinMood
        </Link>
      </div>
      
      <div className="flex items-center space-x-2 md:space-x-4">
        <Link 
          to="/games/fart-hero" 
          className="px-4 py-2 mr-1 rounded-md font-bold bg-green-600/40 backdrop-blur-sm hover:bg-green-600/60 transition-colors text-white"
          style={{ textShadow: '0 1px 1px rgba(0,0,0,0.2)' }}
        >
          Fart Hero
        </Link>
        
        <Link 
          to="/games" 
          className="px-4 py-2 mr-2 rounded-md font-bold bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors text-white"
          style={{ textShadow: '0 1px 1px rgba(0,0,0,0.2)' }}
        >
          Games
        </Link>
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
      </div>
    </header>
  );
};

export default Header;
