
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = ({ onStartClick }: { onStartClick: () => void }) => {
  return (
    <section className="w-full min-h-[90vh] flex flex-col items-center justify-center relative particle-bg particle-floating py-16 px-4 sm:px-6 bg-gradient-to-b from-sky-400 to-sky-100">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-300/20 via-sky-200/10 to-transparent z-0"></div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
        <div className="mb-8 flex justify-center logo-bounce">
          <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="SpinMood Ferris Wheel Logo" className="h-24 w-24 glow-strong animate-glow-pulse">
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
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
          <span className="block mb-3 text-indigo-900 drop-shadow-sm">SpinMood</span>
          <span className="bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-700 bg-clip-text text-transparent">
            The <span className="font-black">Best Free</span> Online Spinner Wheel & Games
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-indigo-900 max-w-3xl mx-auto font-bold">
          Make <span className="font-black text-purple-800">Every Decision Fun & Easy</span>. SpinMood is 
          <span className="font-black text-purple-800"> lightning-fast</span>, 
          <span className="font-black text-purple-800"> sound-enabled</span>, 
          <span className="font-black text-purple-800"> mood-themed</span> — perfect for giveaways, classrooms, parties, and more!
        </p>
        
        <div className="pt-6">
          <Button
            onClick={onStartClick}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/20 animate-pulse-slow glow font-bold"
          >
            Start Spinning Now
          </Button>
        </div>
        
        <div className="pt-8 text-base text-indigo-900 flex flex-wrap justify-center gap-6 font-bold">
          <span className="flex items-center"><span className="h-3 w-3 rounded-full bg-primary mr-2 glow"></span> Instagram Giveaways</span>
          <span className="flex items-center"><span className="h-3 w-3 rounded-full bg-study-primary mr-2 glow"></span> Classroom Tool</span>
          <span className="flex items-center"><span className="h-3 w-3 rounded-full bg-chill-primary mr-2 glow"></span> Decision Making</span>
          <span className="flex items-center"><span className="h-3 w-3 rounded-full bg-party-primary mr-2 glow"></span> Party Games</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
