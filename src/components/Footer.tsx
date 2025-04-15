
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full py-12 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center text-center">
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
          
          <p className="text-lg font-semibold text-white/90 mb-6 max-w-md">
            The best free online spinner wheel for giveaways, classrooms, decisions, and fun!
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <Link 
              to="/" 
              className="text-white text-base md:text-lg font-semibold hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/privacy-policy" 
              className="text-white text-base md:text-lg font-semibold hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms-conditions" 
              className="text-white text-base md:text-lg font-semibold hover:text-primary transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link 
              to="/contact" 
              className="text-white text-base md:text-lg font-semibold hover:text-primary transition-colors"
            >
              Contact Us
            </Link>
          </div>
          
          <div className="text-white/80 text-base font-medium border-t border-white/10 pt-6 w-full">
            <p className="mb-2">© {new Date().getFullYear()} SpinMood. All rights reserved.</p>
            <p>Made with ♥ for teachers, students, and decision-makers everywhere</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
