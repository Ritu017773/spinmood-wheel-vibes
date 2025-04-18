
import React from 'react';
import { Link } from 'react-router-dom';
import { gameCategories } from '@/data/games';

const GameGrid = () => {
  // Extract all games from all categories into a flat array and add id and gradientBg properties
  const games = gameCategories.flatMap(category => 
    category.games.map(game => ({
      ...game,
      id: game.name.toLowerCase().replace(/\s+/g, '-'),
      gradientBg: getRandomGradient()
    }))
  );
  
  // Function to generate random gradient backgrounds
  function getRandomGradient() {
    const gradients = [
      'linear-gradient(to right bottom, #FF6B6B, #556270)',
      'linear-gradient(to right bottom, #6A82FB, #FC5C7D)',
      'linear-gradient(to right bottom, #43CEA2, #185A9D)',
      'linear-gradient(to right bottom, #F7971E, #FFD200)',
      'linear-gradient(to right bottom, #8E2DE2, #4A00E0)',
      'linear-gradient(to right bottom, #0099F7, #F11712)',
      'linear-gradient(to right bottom, #834D9B, #D04ED6)',
      'linear-gradient(to right bottom, #1A2980, #26D0CE)'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
      {games.map((game) => (
        <Link 
          key={game.url}
          to={game.url}
          className="group relative overflow-hidden rounded-3xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30"
          aria-label={`Play ${game.name}`}
        >
          <div 
            className="aspect-[16/9] w-full rounded-3xl p-1 overflow-hidden"
            style={{ 
              background: game.gradientBg,
              boxShadow: "inset 0 0 30px rgba(0, 0, 0, 0.3)"
            }}
          >
            <div className="relative h-full w-full rounded-2xl overflow-hidden p-6 flex flex-col justify-between bg-black/20 backdrop-blur-sm">
              {/* Game Icon */}
              <div className="absolute right-6 top-6 w-16 h-16 md:w-24 md:h-24 animate-pulse-slow z-20">
                {game.icon}
              </div>
              
              {/* Enhanced Game Visuals */}
              <div className="absolute inset-0 opacity-80 pointer-events-none z-10">
                {/* Dynamic game visual content based on game ID */}
                {game.id === 'word-chain-reaction' && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <div className="text-xl font-bold text-white animate-pulse">THINK</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GameGrid;

