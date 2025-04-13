
import React, { useEffect, useState } from 'react';
import { X, Copy, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Confetti from './Confetti';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: string | null;
  theme: 'study' | 'chill' | 'party' | 'gift' | 'custom';
}

const ResultModal: React.FC<ResultModalProps> = ({
  isOpen,
  onClose,
  result,
  theme
}) => {
  const [animation, setAnimation] = useState<'entering' | 'entered' | 'exiting' | null>(null);

  useEffect(() => {
    if (isOpen && result) {
      setAnimation('entering');
      const enterTimer = setTimeout(() => {
        setAnimation('entered');
      }, 300);

      const autoCloseTimer = setTimeout(() => {
        handleClose();
      }, 2000); // Auto close after 2 seconds

      return () => {
        clearTimeout(enterTimer);
        clearTimeout(autoCloseTimer);
      };
    }
  }, [isOpen, result]);

  const handleClose = () => {
    setAnimation('exiting');
    setTimeout(() => {
      onClose();
      setAnimation(null);
    }, 300);
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result)
        .then(() => toast.success('Result copied to clipboard!'))
        .catch(() => toast.error('Failed to copy result'));
    }
  };

  const shareResult = () => {
    if (result && navigator.share) {
      navigator.share({
        title: 'SpinMood Result',
        text: `My SpinMood result: ${result}`,
        url: window.location.href,
      })
      .then(() => toast.success('Shared successfully!'))
      .catch((error) => {
        console.error('Error sharing:', error);
        toast.error('Failed to share result');
      });
    } else {
      copyResult(); // Fallback to copy if Web Share API is not available
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md transition-opacity duration-300 ${
        animation === 'entering' ? 'opacity-0' : 'opacity-100'
      } ${animation === 'exiting' ? 'opacity-0' : 'opacity-100'}`}
    >
      <div 
        className={`relative w-11/12 max-w-xl bg-gradient-to-b from-background/95 to-background/80 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl transition-all duration-300 ${
          animation === 'entering' ? 'scale-90' : 'scale-100'
        } ${animation === 'exiting' ? 'scale-90' : 'scale-100'}`}
        style={{
          boxShadow: `0 0 50px var(--${theme}-primary), 0 0 100px rgba(0,0,0,0.5)`,
        }}
      >
        <Confetti isActive={animation === 'entering' || animation === 'entered'} theme={theme} />
        
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-white/70 hover:text-white"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        
        <div className="p-8 sm:p-10">
          <div className="text-center">
            <h3 className="text-xl font-medium text-white/80 mb-6">Your Result</h3>
            <div 
              className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-white animate-bounce-once`}
              style={{ 
                textShadow: `0 0 20px var(--${theme}-primary)`,
                color: `hsl(var(--${theme}-primary))`,
                animation: 'scale-pulse 2s infinite',
              }}
            >
              {result}
            </div>
            
            <div className="flex justify-center space-x-4">
              <Button 
                onClick={copyResult} 
                variant="outline" 
                className="bg-white/10 hover:bg-white/20 border-white/20 px-6 py-5 text-base"
                size="lg"
              >
                <Copy size={18} className="mr-2" />
                Copy
              </Button>
              
              <Button 
                onClick={shareResult}
                variant="outline"
                className="bg-white/10 hover:bg-white/20 border-white/20 px-6 py-5 text-base"
                size="lg"
              >
                <Share2 size={18} className="mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
        
        {/* Pulsing glow effect */}
        <div 
          className="absolute inset-0 -z-10 rounded-xl opacity-50 animate-pulse-glow"
          style={{ 
            background: `radial-gradient(circle at center, var(--${theme}-primary) 0%, transparent 70%)`,
            filter: 'blur(20px)'
          }}
        ></div>
      </div>
    </div>
  );
};

export default ResultModal;
