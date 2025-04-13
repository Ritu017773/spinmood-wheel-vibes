
import React from 'react';
import { FerrisWheel, Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-black/30 border-t border-white/10 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FerrisWheel className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl text-white">SpinMood</span>
            </div>
            <p className="text-sm text-white/60">
              The best free online spinner wheel for giveaways, study, chill & fun. 
              Made to be better than WheelofNames & PickerWheel.
            </p>
            <div className="flex space-x-4 text-white/60">
              <a href="#" aria-label="Github" className="hover:text-white">
                <Github size={18} />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-white">
                <Twitter size={18} />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-white">
                <Instagram size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-4">Features</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#spinner" className="hover:text-white">Online Spinner Wheel</a></li>
              <li><a href="#themes" className="hover:text-white">Mood Themes</a></li>
              <li><a href="#faq" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-4">About SpinMood</h3>
            <p className="text-sm text-white/60">
              SpinMood is developed by a team passionate about creating the best online tools for making decisions fun and easy. Our spinner wheel is optimized for speed, accessibility, and enjoyment.
            </p>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-white/10 text-center text-xs text-white/40">
          <p>© {new Date().getFullYear()} SpinMood. All rights reserved.</p>
          <p className="mt-1">
            Your fast, free, and fun online spinner wheel solution.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
