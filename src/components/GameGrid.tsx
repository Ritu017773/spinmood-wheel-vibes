
import React from 'react';
import { Link } from 'react-router-dom';
import { games } from '@/data/games';

const GameGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
      {games.map((game) => (
        <Link 
          key={game.id}
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
            <div className="relative h-full w-full rounded-2xl overflow-hidden p-6 flex flex-col justify-between backdrop-blur-sm bg-black/5">
              {/* Game Icon */}
              <div className="absolute right-6 top-6 w-16 h-16 md:w-24 md:h-24">
                {game.icon}
              </div>
              
              {/* Game Name */}
              <h2 
                className="text-2xl md:text-3xl font-extrabold text-white z-10 mt-2"
                style={{ 
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.8)", 
                  letterSpacing: "0.5px"
                }}
              >
                {game.name}
              </h2>
              
              {/* Game Description */}
              <p 
                className="text-lg md:text-xl font-bold text-white/90 mt-2 max-w-[70%] z-10"
                style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.8)" }}
              >
                {game.shortDescription}
              </p>
              
              {/* Visual Effects */}
              <div className="absolute inset-0 opacity-60 pointer-events-none">
                {game.visualEffect}
              </div>
              
              {/* Hover Indicator */}
              <div className="absolute bottom-6 right-6 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                <span className="font-bold text-white text-sm md:text-base" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>
                  Play Now
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GameGrid;
