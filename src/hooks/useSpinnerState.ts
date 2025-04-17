
import { useState } from 'react';
import { toast } from 'sonner';

type Mood = 'study' | 'chill' | 'party' | 'gift' | 'custom';

export const useSpinnerState = () => {
  // Initial sample entries (increased to show more variety)
  const [customEntries, setCustomEntries] = useState<string[]>([
    "Pizza", "Burger", "Sushi", "Tacos", "Salad", "Pasta", 
    "Ramen", "Curry", "Steak", "Sandwich", "Soup", "Seafood"
  ]);
  
  const [currentMood, setCurrentMood] = useState<Mood>('study');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [currentResult, setCurrentResult] = useState<string | null>(null);
  const [confettiContainer, setConfettiContainer] = useState<HTMLDivElement | null>(null);

  const handleSpinComplete = (winner: string) => {
    setCurrentResult(winner);
    setShowResultModal(true);
    
    // Enhanced celebration for all themes, not just party
    createConfetti(currentMood);
  };
  
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    toast(soundEnabled ? "Sound turned off" : "Sound turned on");
  };
  
  const createConfetti = (theme: Mood) => {
    // Enhanced confetti effect - increased count and duration
    const confettiCount = 200; // More particles
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    
    // Store the container reference so we can remove it when modal closes
    setConfettiContainer(container);
    
    // Theme-based colors for confetti
    let colors: string[] = [];
    
    switch (theme) {
      case 'study':
        colors = ['#6989E0', '#4C6BC3', '#7D98E9', '#3B5DAF', '#8AA6F2', '#ffffff'];
        break;
      case 'chill':
        colors = ['#6ECFB2', '#52B89A', '#83D7BE', '#42A487', '#97DECC', '#ffffff'];
        break;
      case 'party':
        colors = ['#E069B5', '#C352A1', '#E982C3', '#B3458F', '#ED99CE', '#ffffff', '#ffcc00'];
        break;
      case 'gift':
        colors = ['#E0B269', '#C39A52', '#E9C382', '#AF8B3B', '#F2D18A', '#ffffff', '#ff9933'];
        break;
      case 'custom':
        colors = ['#69B6E0', '#528BC3', '#82C7E9', '#427AA4', '#99D5ED', '#ffffff'];
        break;
      default:
        colors = ['#69B6E0', '#E069B5', '#6ECFB2', '#E0B269', '#ffffff'];
    }
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'absolute';
      confetti.style.width = `${Math.random() * 15 + 5}px`;
      confetti.style.height = `${Math.random() * 15 + 5}px`;
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      confetti.style.opacity = '0.8';
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = `${Math.random() * -30}%`;
      confetti.style.animation = `confetti ${Math.random() * 3 + 3}s ease-out forwards`;
      container.appendChild(confetti);
    }
    
    // Fixed 3-second duration for confetti display, regardless of modal state
    setTimeout(() => {
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }
      setConfettiContainer(null);
    }, 3000);
  };
  
  return {
    customEntries,
    setCustomEntries,
    currentMood,
    setCurrentMood,
    soundEnabled,
    toggleSound,
    isSpinning,
    setIsSpinning,
    showResultModal,
    setShowResultModal,
    currentResult,
    handleSpinComplete,
    confettiContainer
  };
};
