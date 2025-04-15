
import React from 'react';
import { Link } from 'react-router-dom';
import { FerrisWheel, Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-black/50 border-t border-white/10 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="SpinMood Ferris Wheel Logo" className="h-8 w-8">
                {/* Main Structure */}
                <circle cx="50" cy="50" r="38" stroke="#a855f7" strokeWidth="6" fill="none" />
                <circle cx="50" cy="50" r="15" fill="#facc15" />

                {/* Spokes (Dark Purple) */}
                <line x1="50" y1="50" x2="50" y2="12" stroke="#6b21a8" strokeWidth="5"/>
                <line x1="50" y1="50" x2="50" y2="88" stroke="#6b21a8" strokeWidth="5"/>
                <line x1="50" y1="50" x2="12" y2="50" stroke="#6b21a8" strokeWidth="5"/>
                <line x1="50" y1="50" x2="88" y2="50" stroke="#6b21a8" strokeWidth="5"/>
                <line x1="50" y1="50" x2="26.2" y2="26.2" stroke="#6b21a8" strokeWidth="5"/>
                <line x1="50" y1="50" x2="73.8" y2="73.8" stroke="#6b21a8" strokeWidth="5"/>
                <line x1="50" y1="50" x2="26.2" y2="73.8" stroke="#6b21a8" strokeWidth="5"/>
                <line x1="50" y1="50" x2="73.8" y2="26.2" stroke="#6b21a8" strokeWidth="5"/>

                {/* Cabins */}
                <rect x="45" y="5" width="10" height="12" rx="3" fill="#c4b5fd"/> <rect x="45" y="5" width="10" height="5" rx="2" fill="#d1d5db"/>
                <rect x="45" y="83" width="10" height="12" rx="3" fill="#c4b5fd" transform="rotate(180 50 89)"/> <rect x="45" y="83" width="10" height="5" rx="2" fill="#d1d5db" transform="rotate(180 50 89)"/>
                <rect x="5" y="45" width="12" height="10" rx="3" fill="#c4b5fd" transform="rotate(-90 11 50)"/> <rect x="5" y="45" width="5" height="10" rx="2" fill="#d1d5db" transform="rotate(-90 11 50)"/>
                <rect x="83" y="45" width="12" height="10" rx="3" fill="#c4b5fd" transform="rotate(90 89 50)"/> <rect x="83" y="45" width="5" height="10" rx="2" fill="#d1d5db" transform="rotate(90 89 50)"/>
                <rect x="20.2" y="20.2" width="11" height="11" rx="3" fill="#c4b5fd" transform="rotate(-45 26.2 26.2)"/> <rect x="20.2" y="20.2" width="8" height="5" rx="2" fill="#d1d5db" transform="rotate(-45 26.2 26.2) translate(0, -2)"/>
                <rect x="68.8" y="68.8" width="11" height="11" rx="3" fill="#c4b5fd" transform="rotate(135 73.8 73.8)"/> <rect x="68.8" y="68.8" width="8" height="5" rx="2" fill="#d1d5db" transform="rotate(135 73.8 73.8) translate(0, -2)"/>
                <rect x="20.2" y="68.8" width="11" height="11" rx="3" fill="#c4b5fd" transform="rotate(-135 26.2 73.8)"/> <rect x="20.2" y="68.8" width="8" height="5" rx="2" fill="#d1d5db" transform="rotate(-135 26.2 73.8) translate(0, -2)"/>
                <rect x="68.8" y="20.2" width="11" height="11" rx="3" fill="#c4b5fd" transform="rotate(45 73.8 26.2)"/> <rect x="68.8" y="20.2" width="8" height="5" rx="2" fill="#d1d5db" transform="rotate(45 73.8 26.2) translate(0, -2)"/>

                {/* Stand */}
                <line x1="35" y1="88" x2="50" y2="65" stroke="#e0e7ff" strokeWidth="6"/>
                <line x1="65" y1="88" x2="50" y2="65" stroke="#e0e7ff" strokeWidth="6"/>
                <line x1="30" y1="88" x2="70" y2="88" stroke="#e0e7ff" strokeWidth="6" strokeLinecap="round"/>
              </svg>
              <span className="font-bold text-xl text-white">SpinMood</span>
            </div>
            <p className="text-base font-bold text-white/80">
              The best free online spinner wheel for giveaways, study, chill & fun. 
              Made to be better than WheelofNames & PickerWheel.
            </p>
            <div className="flex space-x-4 text-white/80">
              <a href="#" aria-label="Github" className="hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg text-white mb-4">Features</h3>
            <ul className="space-y-3 text-lg font-semibold text-white/80">
              <li><a href="#spinner" className="hover:text-white transition-colors">Online Spinner Wheel</a></li>
              <li><a href="#themes" className="hover:text-white transition-colors">Mood Themes</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg text-white mb-4">Use Cases</h3>
            <ul className="space-y-3 text-lg font-semibold text-white/80">
              <li><a href="#spinner" className="hover:text-white transition-colors">Classroom Activities</a></li>
              <li><a href="#spinner" className="hover:text-white transition-colors">Instagram Giveaways</a></li>
              <li><a href="#spinner" className="hover:text-white transition-colors">Party Games</a></li>
              <li><a href="#spinner" className="hover:text-white transition-colors">Decision Making</a></li>
              <li><a href="#spinner" className="hover:text-white transition-colors">Study Tool</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg text-white mb-4">Legal</h3>
            <ul className="space-y-3 text-lg font-semibold text-white/80">
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <a href="mailto:contact@spinmood.com" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-white/10 text-center text-base font-semibold text-white/70">
          <p>© {new Date().getFullYear()} SpinMood. All rights reserved.</p>
          <p className="mt-2">
            Your fast, free, and fun online spinner wheel solution.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
