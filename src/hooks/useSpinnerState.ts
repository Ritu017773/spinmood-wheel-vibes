
import { useState } from 'react';
import { toast } from 'sonner';

type Mood = 'study' | 'chill' | 'party' | 'gift' | 'custom';

export const useSpinnerState = () => {
  const [customEntries, setCustomEntries] = useState<string[]>([
    "Pizza", "Burger", "Sushi", "Tacos", "Salad", "Pasta"
  ]);
  const [currentMood, setCurrentMood] = useState<Mood>('study');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [currentResult, setCurrentResult] = useState<string | null>(null);

  const handleSpinComplete = (winner: string) => {
    setCurrentResult(winner);
    setShowResultModal(true);
    
    if (currentMood === 'party') {
      createConfetti();
    }
  };
  
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    toast(soundEnabled ? "Sound turned off" : "Sound turned on");
  };
  
  const createConfetti = () => {
    const confettiCount = 150;
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    
    const colors = [
      '#FF5252', '#FF4081', '#E040FB', '#7C4DFF', 
      '#536DFE', '#448AFF', '#40C4FF', '#18FFFF',
      '#FFD700', '#FF6347', '#00FF7F', '#FF1493'
    ];
    
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
    
    setTimeout(() => {
      document.body.removeChild(container);
    }, 6000);
  };
  
  return {
    customEntries,
    setCustomEntries,
    currentMood,
    setCurrentMood: handleMoodChange,
    soundEnabled,
    toggleSound,
    isSpinning,
    setIsSpinning,
    showResultModal,
    setShowResultModal,
    currentResult,
    handleSpinComplete
  };
  
  function handleMoodChange(mood: Mood) {
    setCurrentMood(mood);
  }
};
