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
              
              {/* Enhanced Game Visuals - Completely Redesigned */}
              <div className="absolute inset-0 opacity-80 pointer-events-none z-10">
                {/* Dynamic game visual content based on game ID */}
                {game.id === 'fart-hero-love-run' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 relative">
                      {/* Mario-style character */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-20 bg-blue-500 rounded-md flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-red-500 -mt-4 flex items-center justify-center relative">
                          <div className="w-8 h-4 bg-peach-200 rounded-md absolute bottom-1"></div>
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
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-32 bg-purple-900/60 rounded-lg border-2 border-neon-pink shadow-lg shadow-pink-500/50 flex flex-col">
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
                          className="absolute h-1 bg-neon-blue animate-pulse"
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
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-48 border-4 border-gold bg-blue-900/20 rounded-lg overflow-hidden">
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
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-red-500 rounded-full animate-pulse-slow glow-strong"></div>
                      
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
                      <div className="absolute top-1/2 right-8 -translate-y-1/2 w-6 h-6 bg-green-400 rounded-full animate-pulse glow"></div>
                      
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
                
                {game.id === 'color-cascade' && (
                  <div className="absolute inset-0">
                    <div className="w-full h-full relative">
                      {/* Colorful waterfall/paint splashing */}
                      <div className="absolute inset-x-0 top-0 bottom-10">
                        {Array.from({length: 12}).map((_, i) => (
                          <div 
                            key={i}
                            className="absolute w-8 rounded-lg animate-fall"
                            style={{
                              left: `${(i * 8) + Math.random() * 5}%`,
                              top: `-${Math.random() * 50}%`,
                              height: `${30 + Math.random() * 30}%`,
                              backgroundColor: `hsl(${Math.random() * 360}, 80%, 70%)`,
                              animationDuration: `${2 + Math.random() * 3}s`,
                              animationDelay: `${Math.random() * 2}s`
                            }}
                          ></div>
                        ))}
                      </div>
                      
                      {/* Blocks at bottom */}
                      <div className="absolute bottom-4 inset-x-8 flex justify-between">
                        {Array.from({length: 6}).map((_, i) => (
                          <div
                            key={i}
                            className="h-12 w-8 rounded-lg bg-white/30"
                          ></div>
                        ))}
                      </div>
                      
                      {/* UI score */}
                      <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1 text-white text-sm">
                        <div>Score: 1,240</div>
                        <div>Taps: 48</div>
                      </div>
                    </div>
                  </div>
                )}
                
                {game.id === 'emoji-evolution' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full relative">
                      {/* Emoji merging visualization */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          <div className="absolute -left-16 -top-8 text-4xl animate-pulse-slow">😀</div>
                          <div className="absolute -right-16 -top-8 text-4xl animate-pulse-slow" style={{animationDelay: '0.3s'}}>🍕</div>
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full text-2xl">+</div>
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 text-2xl">=</div>
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-8 text-4xl animate-bounce">🤤</div>
                        </div>
                      </div>
                      
                      {/* Evolution progress bar */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-4 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-yellow-400 to-purple-500 animate-pulse" style={{width: "65%"}}></div>
                      </div>
                      
                      {/* What will yours become */}
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center">
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 text-white text-sm">
                          What Will Yours Become?
                        </div>
                      </div>
                      
                      {/* Background emojis */}
                      {['🧠', '👽', '🤖', '👻', '🦄'].map((emoji, i) => (
                        <div 
                          key={i} 
                          className="absolute text-xl opacity-20" 
                          style={{
                            top: `${Math.random() * 80}%`,
                            left: `${Math.random() * 80}%`,
                            transform: `rotate(${Math.random() * 30}deg)`
                          }}
                        >
                          {emoji}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {game.id === 'pixel-painter' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full relative">
                      {/* Canvas background */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-36 bg-white rounded-md shadow-lg overflow-hidden">
                        {/* Grid of pixels */}
                        <div className="absolute inset-2 grid grid-cols-10 grid-rows-7 gap-0.5">
                          {Array.from({length: 70}).map((_, i) => {
                            // Create a simple pixel art pattern
                            const row = Math.floor(i / 10);
                            const col = i % 10;
                            const isColored = (
                              // Create a simple heart shape
                              (row === 1 && (col === 2 || col === 7)) ||
                              (row === 2 && ([1,3,6,8].includes(col))) ||
                              (row === 3 && ([0,4,5,9].includes(col))) ||
                              (row === 4 && ([1,8].includes(col))) ||
                              (row === 5 && ([2,7].includes(col))) ||
                              (row === 6 && ([3,4,5,6].includes(col)))
                            );
                            
                            return (
                              <div 
                                key={i} 
                                className={`aspect-square ${isColored ? 'bg-red-500' : 'bg-gray-100'} ${isColored ? 'animate-pulse-slow' : ''}`}
                                style={{ animationDelay: isColored ? `${i * 0.05}s` : '0s' }}
                              ></div>
                            );
                          })}
                        </div>
                      </div>
                      
                      {/* User painting */}
                      <div className="absolute bottom-10 right-10">
                        <div className="w-8 h-8 bg-black/10 rounded-full animate-ping"></div>
                      </div>
                      
                      {/* Color palette */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-1">
                        {['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-black'].map((color, i) => (
                          <div key={i} className={`w-4 h-4 rounded-full ${color}`}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {game.id === 'reaction-race' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full relative">
                      {/* Glowing button */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-16 h-16 rounded-full bg-red-500 animate-pulse-slow glow-strong flex items-center justify-center">
                          <div className="text-white font-bold text-sm">TAP!</div>
                        </div>
                      </div>
                      
                      {/* Two racing hands */}
                      <div className="absolute bottom-10 left-10 transform -rotate-45 scale-x-[-1] text-2xl animate-bounce">
                        👆
                      </div>
                      <div className="absolute bottom-10 right-10 transform rotate-45 text-2xl animate-bounce" style={{animationDelay: '0.2s'}}>
                        👆
                      </div>
                      
                      {/* TAP NOW! flash */}
                      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center">
                        <div className="text-xl font-extrabold text-white animate-pulse">TAP NOW!</div>
                      </div>
                      
                      {/* Millisecond timer */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-lg text-white">
                        0.128<span className="text-sm">s</span>
                      </div>
                      
                      {/* Speed lines */}
                      {Array.from({length: 10}).map((_, i) => (
                        <div 
                          key={i}
                          className="absolute h-0.5 bg-white/40"
                          style={{
                            top: `${10 + (i * 8)}%`,
                            left: '0',
                            width: `${50 + Math.random() * 50}%`,
                            transform: `rotate(${5 - Math.random() * 10}deg)`
                          }}
                        ></div>
                      ))}
                      {Array.from({length: 10}).map((_, i) => (
                        <div 
                          key={i+10}
                          className="absolute h-0.5 bg-white/40"
                          style={{
                            top: `${10 + (i * 8)}%`,
                            right: '0',
                            width: `${50 + Math.random() * 50}%`,
                            transform: `rotate(${Math.random() * 10 - 5}deg)`
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                )}
                
                {game.id === 'pattern-pop' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full relative">
                      {/* Rotating optical illusions */}
                      <div className="absolute inset-0">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-4 border-purple-300/30 animate-spin" style={{animationDuration: '20s'}}></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-4 border-purple-400/30 animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-4 border-purple-500/30 animate-spin" style={{animationDuration: '10s'}}></div>
                      </div>
                      
                      {/* Shape matching sequence */}
                      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 flex space-x-2">
                        <div className="w-8 h-8 rounded-md bg-orange-500/80 backdrop-blur-sm"></div>
                        <div className="w-8 h-8 rounded-full bg-blue-500/80 backdrop-blur-sm"></div>
                        <div className="w-8 h-8 bg-green-500/80 backdrop-blur-sm transform rotate-45"></div>
                      </div>
                      
                      {/* Target shape */}
                      <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-blue-500 animate-pulse-slow flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-blue-300"></div>
                      </div>
                      
                      {/* Timer */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-3 bg-black/30 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 animate-shrink"></div>
                      </div>
                      
                      {/* Brain icons */}
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center space-x-1">
                        <div className="text-purple-300 animate-pulse">🧠</div>
                        <div className="text-sm font-bold text-white">MEMORY TEST</div>
                      </div>
                    </div>
                  </div>
                )}
                
                {game.id === 'lucky-line' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full relative">
                      {/* Luck icons */}
                      <div className="absolute w-8 h-8 text-2xl top-10 left-10">🍀</div>
                      <div className="absolute w-8 h-8 text-2xl bottom-10 right-10">💰</div>
                      <div className="absolute w-8 h-8 text-2xl top-10 right-10">💎</div>
                      <div className="absolute w-8 h-8 text-2xl bottom-10 left-10">🎁</div>
                      
                      {/* Glowing line */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                        <path 
                          d="M20,20 Q50,10 80,20 T80,50 T20,80" 
                          fill="none" 
                          stroke="url(#gold-gradient)" 
                          strokeWidth="2" 
                          strokeLinecap="round"
                          className="animate-draw-path"
                        />
                        <defs>
                          <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#FFD700" />
                            <stop offset="50%" stopColor="#FFF8DC" />
                            <stop offset="100%" stopColor="#FFD700" />
                          </linearGradient>
                        </defs>
                      </svg>
                      
                      {/* Path trigger points */}
                      <div className="absolute top-1/5 right-1/4 w-4 h-4 rounded-full bg-yellow-400 animate-ping"></div>
                      <div className="absolute bottom-1/3 left-1/4 w-4 h-4 rounded-full bg-yellow-400 animate-ping" style={{animationDelay: '0.5s'}}></div>
                      
                      {/* Spinning wheel element */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-16 h-16 rounded-full border-4 border-dashed border-gold animate-spin" style={{animationDuration: '10s'}}></div>
                      </div>
                      
                      {/* Sparkles */}
                      {Array.from({length: 5}).map((_, i) => (
                        <div 
                          key={i}
                          className="absolute text-yellow-300 animate-ping-slow"
                          style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            fontSize: `${8 + Math.random() * 8}px`,
                            animationDelay: `${i * 0.3}s`
                          }}
                        >
                          ✨
                        </div>
                      ))}
                      
                      {/* Draw your luck CTA */}
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-yellow-500/80 backdrop-blur text-sm font-bold text-white px-3 py-1 rounded-full">
                        Draw Your Luck!
                      </div>
                    </div>
                  </div>
                )}
                
                {game.id === 'word-chain-reaction' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full relative">
                      {/* Brain outline */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-dashed border-white/40"></div>
                      
                      {/* Word tiles flying */}
                      {['THINK', 'BRAIN', 'CHAIN', 'WORD', 'REACT', 'FAST'].map((word, i) => (
                        <div 
                          key={i}
                          className="absolute bg-gradient-to-r from-blue-500 to-yellow-400 text-white font-bold px-2 py-1 rounded animate-float"
                          style={{
                            top: `${10 + Math.random() * 80}%`,
                            left: `${10 + Math.random() * 80}%`,
                            animationDelay: `${i * 0.2}s`,
                            animationDuration: `${3 + Math.random() * 2}s`,
                            transform: `rotate(${Math.random() * 30 - 15}deg)`
                          }}
                        >
                          {word}
                        </div>
                      ))}
                      
                      {/* Electric connections */}
                      {Array.from({length: 8}).map((_, i) => (
                        <div 
                          key={i}
                          className="absolute bg-blue-400/30 animate-pulse"
                          style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${20 + Math.random() * 30}%`,
                            height: '2px',
                            transform: `rotate(${Math.random() * 360}deg)`,
                            animationDelay: `${i * 0.1}s`
                          }}
                        ></div>
                      ))}
                      
                      {/* Word explosion */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="relative">
                          <div className="text-xl font-bold text-white animate-pulse">THINK</div>
                          <div className="absolute top-0 left-0 right-0 -bottom
