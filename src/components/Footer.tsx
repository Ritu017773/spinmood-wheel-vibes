
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Shield, FileText, Mail } from 'lucide-react';

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
          
          {/* Column 4: Quick Help */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold text-white mb-4" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Quick Help</h3>
            <ul className="space-y-2 text-white font-bold" style={{ textShadow: '0 1px 1px rgba(0,0,0,0.2)' }}>
              <li className="text-base md:text-lg">• Fully free to use</li>
              <li className="text-base md:text-lg">• No account required</li>
              <li className="text-base md:text-lg">• Works on all devices</li>
              <li className="text-base md:text-lg">• Create unlimited wheels</li>
            </ul>
            <Link 
              to="/contact" 
              className="mt-4 bg-white/10 backdrop-blur hover:bg-white/20 text-white font-bold py-2 px-4 rounded-md transition-colors inline-flex items-center"
              style={{ textShadow: '0 1px 1px rgba(0,0,0,0.2)' }}
            >
              <Mail className="mr-2" size={16} />
              Need Help? Contact Us
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
