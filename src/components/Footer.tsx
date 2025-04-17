
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Shield, FileText, Mail, Gamepad2, Sparkles, Wrench } from 'lucide-react';
import { gameCategories } from '@/data/games';

const Footer = () => {
  return (
    <footer className="w-full py-12 px-4 bg-black/30 backdrop-blur-md">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Logo and tagline */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="mb-4 flex items-center">
              <div className="logo-bounce mr-2">
                <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="SpinMood Ferris Wheel Logo">
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

                  {/* Simplified cabins for smaller size */}
                  <rect x="45" y="5" width="10" height="12" rx="3" fill="#c4b5fd"/> 
                  <rect x="45" y="83" width="10" height="12" rx="3" fill="#c4b5fd" transform="rotate(180 50 89)"/> 
                  <rect x="5" y="45" width="12" height="10" rx="3" fill="#c4b5fd" transform="rotate(-90 11 50)"/> 
                  <rect x="83" y="45" width="12" height="10" rx="3" fill="#c4b5fd" transform="rotate(90 89 50)"/> 
                </svg>
              </div>
              <span className="text-2xl font-bold text-white">SpinMood</span>
            </Link>
            
            <p className="text-lg font-bold text-white mb-6 text-center md:text-left" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
              The best free online spinner wheel for giveaways, classrooms, decisions, and fun!
            </p>
          </div>
          
          {/* Column 2: Main Navigation */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold text-white mb-4" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Navigation</h3>
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-white text-base md:text-lg font-bold hover:text-primary transition-colors flex items-center"
                style={{ textShadow: '0 1px 1px rgba(0,0,0,0.2)' }}
              >
                <Home className="mr-2" size={20} />
                Home
              </Link>
              <Link 
                to="/games" 
                className="text-white text-base md:text-lg font-bold hover:text-primary transition-colors flex items-center"
                style={{ textShadow: '0 1px 1px rgba(0,0,0,0.2)' }}
              >
                <Gamepad2 className="mr-2" size={20} />
                Games
              </Link>
              <Link 
                to="/privacy-policy" 
                className="text-white text-base md:text-lg font-bold hover:text-primary transition-colors flex items-center"
                style={{ textShadow: '0 1px 1px rgba(0,0,0,0.2)' }}
              >
                <Shield className="mr-2" size={20} />
                Privacy Policy
              </Link>
              <Link 
                to="/terms-conditions" 
                className="text-white text-base md:text-lg font-bold hover:text-primary transition-colors flex items-center"
                style={{ textShadow: '0 1px 1px rgba(0,0,0,0.2)' }}
              >
                <FileText className="mr-2" size={20} />
                Terms & Conditions
              </Link>
              <Link 
                to="/contact" 
                className="text-white text-base md:text-lg font-bold hover:text-primary transition-colors flex items-center"
                style={{ textShadow: '0 1px 1px rgba(0,0,0,0.2)' }}
              >
                <Mail className="mr-2" size={20} />
                Contact Us
              </Link>
            </div>
          </div>
          
          {/* Column 3: Explore Themes */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold text-white mb-4" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Explore Themes</h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="text-white text-base md:text-lg font-bold" style={{ textShadow: '0 1px 1px rgba(0,0,0,0.2)' }}>
                <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-2"></span> Study
              </div>
              <div className="text-white text-base md:text-lg font-bold" style={{ textShadow: '0 1px 1px rgba(0,0,0,0.2)' }}>
                <span className="inline-block w-3 h-3 rounded-full bg-purple-500 mr-2"></span> Chill
              </div>
              <div className="text-white text-base md:text-lg font-bold" style={{ textShadow: '0 1px 1px rgba(0,0,0,0.2)' }}>
                <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span> Party
              </div>
              <div className="text-white text-base md:text-lg font-bold" style={{ textShadow: '0 1px 1px rgba(0,0,0,0.2)' }}>
                <span className="inline-block w-3 h-3 rounded-full bg-amber-500 mr-2"></span> Gift
              </div>
              <div className="text-white text-base md:text-lg font-bold" style={{ textShadow: '0 1px 1px rgba(0,0,0,0.2)' }}>
                <span className="inline-block w-3 h-3 rounded-full bg-emerald-500 mr-2"></span> Custom
              </div>
            </div>
          </div>
          
          {/* Column 4: Games & Tools - TRIMMED as requested */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold text-white mb-4" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Games & Tools</h3>
            <div className="grid grid-cols-1 gap-3">
              {gameCategories.slice(0, 2).map((category, index) => (
                <div key={index} className="mb-2">
                  <h4 className="text-white text-lg font-bold flex items-center mb-1" style={{ textShadow: '0 1px 1px rgba(0,0,0,0.2)' }}>
                    {category.name === 'Decision Tools' ? (
                      <Sparkles size={16} className="mr-2 text-amber-400" />
                    ) : category.name === 'Brain Games' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-blue-400">
                        <path d="M12 3c1.5 0 3.1 .4 4.5 1 .9 2.2 1.5 4.4 1.5 6 0 3-1.5 5-4 7m-6-1c-1.3-.5-2.4-1.5-3-3-.5-.7-.9-1.1-1.5-1.5 .5-.7 .9-1.1 1.5-1.5 .7-1.7 2.2-3 4-4 .5-1 1-1.8 1.5-2.5c2 0 3 .5 4 2 1 0 2 1 3 2s1.5 2 2 3c0 1 0 3-1 4-.5 1-1 1.5-1.5 2.5-1 1-2 1.5-3 2m-3 0c-1 0-2 .5-3.5 1.5"></path>
                      </svg>
                    ) : category.name === 'Arcade Games' ? (
                      <Gamepad2 size={16} className="mr-2 text-red-400" />
                    ) : category.name === 'Creative Tools' ? (
                      <Wrench size={16} className="mr-2 text-purple-400" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-400">
                        <path d="M15 12a1 1 0 0 0-1-1h-3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H9a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h5a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-3a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h3a1 1 0 0 0 1-1Z"></path>
                      </svg>
                    )}
                    {category.name}
                  </h4>
                  <div className="pl-6">
                    {/* Only show games up to Pattern Pop */}
                    {category.games.slice(0, category.name === 'Brain Games' ? 4 : category.games.length).map((game, gameIndex) => (
                      <Link 
                        key={gameIndex}
                        to={game.url}
                        className="block text-white text-base font-bold hover:text-primary transition-colors mb-1"
                        style={{ textShadow: '0 1px 1px rgba(0,0,0,0.2)' }}
                      >
                        {game.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Link 
              to="/games" 
              className="mt-4 bg-white/10 backdrop-blur hover:bg-white/20 text-white font-bold py-2 px-4 rounded-md transition-colors inline-flex items-center"
              style={{ textShadow: '0 1px 1px rgba(0,0,0,0.2)' }}
            >
              <Gamepad2 className="mr-2" size={16} />
              View All Games
            </Link>
          </div>
        </div>
        
        {/* Bottom section with copyright */}
        <div className="text-white text-base font-bold border-t border-white/20 pt-6 w-full text-center" style={{ textShadow: '0 1px 1px rgba(0,0,0,0.2)' }}>
          <p className="mb-2">© {new Date().getFullYear()} SpinMood. All rights reserved.</p>
          <p>Made with ♥ for teachers, students, and decision-makers everywhere</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
