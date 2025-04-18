
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
          key={game.url} // Use URL as key since it should be unique
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
                {game.id === 'fart-hero-love-run' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 relative">
                      {/* Mario-style character */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-20 bg-blue-500 rounded-md flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-red-500 -mt-4 flex items-center justify-center relative">
                          <div className="w-8 h-4 bg-orange-200 rounded-md absolute bottom-1"></div>
                          <div className="w-2 h-2 bg-black absolute left-2 top-4 rounded-full"></div>
                          <div className="w-2 h-2 bg-black absolute right-2 top-4 rounded-full"></div>
                        </div>
                        <div className="absolute -bottom-2 w-full flex justify-center">
                          <div className="w-6 h-8 bg-blue-700 rounded-md mx-1"></div>
                          <div className="w-6 h-8 bg-blue-700 rounded-md mx-1"></div>
                        </div>
                      </div>
                      
                      {/* Fart jets animation */}
                      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                        {Array.from({length: 5}).map((_, i) => (
                          <div 
                            key={i}
                            className="absolute bottom-0 w-8 h-2 rounded-full bg-green-300 opacity-70 animate-ping"
                            style={{
                              left: `${Math.sin(i * 0.5) * 10}px`,
                              animationDelay: `${i * 0.1}s`,
                              animationDuration: `${0.8 + i * 0.2}s`
                            }}
                          ></div>
                        ))}
                      </div>
                      
                      {/* Flying toilet obstacles */}
                      <div className="absolute top-2 right-0 w-12 h-12 animate-bounce">
                        <div className="w-8 h-10 bg-white rounded-md relative">
                          <div className="w-10 h-4 bg-white rounded-t-md absolute -top-4 left-1/2 -translate-x-1/2"></div>
                          <div className="w-6 h-2 bg-blue-300 absolute bottom-2 left-1/2 -translate-x-1/2"></div>
                        </div>
                      </div>
                      
                      {/* Heart icon */}
                      <div className="absolute top-4 left-4 text-pink-500 animate-pulse text-2xl">❤️</div>
                    </div>
                  </div>
                )}
                
                {game.id === 'build-your-bliss-machine' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full relative">
                      {/* Glowing machine */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-32 bg-purple-900/60 rounded-lg border-2 border-pink-500 shadow-lg shadow-pink-500/50 flex flex-col">
                        {/* Machine buttons and screens */}
                        <div className="absolute top-0 left-0 w-full grid grid-cols-3 gap-2 p-2">
                          <div className="h-4 w-4 rounded-full bg-red-500 animate-pulse"></div>
                          <div className="h-4 w-4 rounded-full bg-yellow-500 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                          <div className="h-4 w-4 rounded-full bg-green-500 animate-pulse" style={{animationDelay: '0.4s'}}></div>
                        </div>
                        
                        {/* Candy, money, hearts flying around */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          {['🍬', '💰', '❤️', '🍭', '💎'].map((emoji, i) => (
                            <div 
                              key={i} 
                              className="absolute text-2xl animate-float" 
                              style={{
                                top: `${20 + Math.random() * 60}%`,
                                left: `${20 + Math.random() * 60}%`,
                                animationDelay: `${i * 0.3}s`
                              }}
                            >
                              {emoji}
                            </div>
                          ))}
                        </div>
                        
                        {/* FEED YOUR BLISS button */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs py-1 px-4 rounded-full font-bold animate-pulse-slow">
                          FEED YOUR BLISS
                        </div>
                      </div>
                      
                      {/* User silhouette */}
                      <div className="absolute bottom-2 left-8 w-10 h-20 bg-purple-800/30 rounded-full"></div>
                      
                      {/* Wires */}
                      {Array.from({length: 4}).map((_, i) => (
                        <div 
                          key={i}
                          className="absolute h-1 bg-blue-500 animate-pulse"
                          style={{
                            top: `${30 + i * 15}%`,
                            left: '0',
                            width: `${40 + Math.random() * 30}%`,
                            animationDelay: `${i * 0.2}s`,
                            opacity: 0.6
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                )}
                
                {game.id === 'how-perfect-you-are' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full relative">
                      {/* Futuristic mirror */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-48 border-4 border-yellow-400 bg-blue-900/20 rounded-lg overflow-hidden">
                        {/* Person reflection */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-28 bg-blue-800/30 rounded-full"></div>
                          <div className="absolute top-8 w-16 h-16 bg-blue-700/30 rounded-full"></div>
                          {/* Split reflection showing insecurities/strengths */}
                          <div className="absolute inset-y-0 left-0 w-1/2 bg-red-500/10"></div>
                          <div className="absolute inset-y-0 right-0 w-1/2 bg-green-500/10"></div>
                        </div>
                      </div>
                      
                      {/* Perfection meter */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-40 h-5 bg-black/30 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 w-3/4 animate-pulse"></div>
                        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">75% Perfect</div>
                      </div>
                      
                      {/* Gold halo */}
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-6 rounded-full border-2 border-yellow-400 bg-yellow-400/20"></div>
                      
                      {/* Are You 100% Perfect? text */}
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 text-white text-sm font-extrabold text-center">
                        Are You<br />100% Perfect?
                      </div>
                    </div>
                  </div>
                )}
                
                {game.id === 'blink-&-miss' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full relative">
                      {/* Dark mysterious background */}
                      <div className="absolute inset-0 bg-black/50 backdrop-blur"></div>
                      
                      {/* Central glowing red dot */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-red-500 rounded-full animate-pulse-slow shadow-lg shadow-red-500/50"></div>
                      
                      {/* User eyes */}
                      <div className="absolute top-20 left-1/2 -translate-x-1/2 flex space-x-12">
                        <div className="w-10 h-5 bg-white/80 rounded-full flex items-center justify-center">
                          <div className="w-4 h-4 bg-black rounded-full"></div>
                        </div>
                        <div className="w-10 h-5 bg-white/80 rounded-full flex items-center justify-center">
                          <div className="w-4 h-4 bg-black rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* Countdown timer */}
                      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-2xl font-mono text-green-500 font-bold animate-pulse">0.32s</div>
                      
                      {/* DON'T BLINK warning */}
                      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-red-500 font-bold animate-pulse text-center">
                        DON'T<br />BLINK!
                      </div>
                    </div>
                  </div>
                )}
                
                {game.id === "don't-blink-speed-trap" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full relative">
                      {/* Dark tech background */}
                      <div className="absolute inset-0 bg-purple-900/30"></div>
                      
                      {/* Mouse path */}
                      <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/20"></div>
                      
                      {/* Target glow dot */}
                      <div className="absolute top-1/2 right-8 -translate-y-1/2 w-6 h-6 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                      
                      {/* Mouse cursor */}
                      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 text-white text-xl">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 3L19 12L12 14L9 21L5 3Z" fill="white"/>
                        </svg>
                      </div>
                      
                      {/* Speed trap signs */}
                      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                        <div className="w-12 h-12 rounded-full border-2 border-red-500 bg-red-500/10 flex items-center justify-center">
                          <div className="text-sm font-bold text-red-500">TRAP</div>
                        </div>
                      </div>
                      
                      {/* Ghost hands interfering */}
                      <div className="absolute bottom-6 left-1/3 opacity-30">👋</div>
                      <div className="absolute top-6 right-1/3 opacity-30">👋</div>
                      
                      {/* Speed meter */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-3 bg-black/30 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 to-red-500 animate-pulse" style={{width: "60%"}}></div>
                      </div>
                      
                      {/* Too fast warning */}
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-red-500 text-sm font-bold text-center">
                        TOO FAST = GAME OVER
                      </div>
                    </div>
                  </div>
                )}

                {/* Display game information at the bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-bold text-xl">{game.name}</h3>
                  <p className="text-white/80 text-sm line-clamp-2">{game.description}</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GameGrid;
