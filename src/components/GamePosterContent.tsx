
import React from 'react';
import { cn } from "@/lib/utils";

export const GamePosterContent = ({ gameId }: { gameId: string }) => {
  switch (gameId) {
    case 'fart-hero-love-run':
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Fart Hero specific design */}
          <div className="w-32 h-32 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                {/* Character */}
                <div className="w-16 h-20 bg-blue-500 rounded-xl flex flex-col items-center transform -rotate-12">
                  <div className="w-12 h-12 rounded-full bg-red-500 -mt-4 relative">
                    <div className="w-8 h-4 bg-[#FFE4C4] rounded-md absolute bottom-1 left-2"></div>
                    <div className="w-2 h-2 bg-black absolute left-2 top-4 rounded-full"></div>
                    <div className="w-2 h-2 bg-black absolute right-2 top-4 rounded-full"></div>
                  </div>
                </div>
                
                {/* Fart jets */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i}
                      className="absolute w-8 h-2 rounded-full bg-green-300/70 animate-ping"
                      style={{
                        left: `${Math.sin(i * 0.5) * 10}px`,
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: `${0.8 + i * 0.2}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Flying toilets */}
            <div className="absolute -top-4 -right-4 animate-bounce">
              <div className="w-8 h-10 bg-white rounded-md relative transform rotate-12">
                <div className="w-10 h-4 bg-white rounded-t-md absolute -top-4 left-1/2 -translate-x-1/2"></div>
              </div>
            </div>
            
            {/* Heart */}
            <div className="absolute top-2 left-2 text-pink-500 animate-pulse text-2xl">❤️</div>
          </div>
        </div>
      );

    // ... Similarly implement other game designs
    // Each implementation following the creative prompts
    
    default:
      return null;
  }
};
