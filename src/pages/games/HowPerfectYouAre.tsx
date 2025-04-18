
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GameLayout from '@/components/games/GameLayout';

interface Question {
  text: string;
  trait: 'honesty' | 'kindness' | 'intelligence' | 'creativity' | 'confidence';
  idealValue: number; // 1-5 scale
}

interface Trait {
  name: string;
  score: number;
  perfectScore: number;
  color: string;
}

const HowPerfectYouAre: React.FC = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<{[key: number]: number}>({});
  const [traits, setTraits] = useState<Trait[]>([]);
  const [perfectScore, setPerfectScore] = useState<number>(0);
  const [showResults, setShowResults] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Sound effects
  const sounds = {
    click: new Audio('/sounds/click.mp3'),
    success: new Audio('/sounds/success.mp3'),
    result: new Audio('/sounds/result.mp3')
  };

  const questions: Question[] = [
    { text: "How often do you tell white lies to protect someone's feelings?", trait: 'honesty', idealValue: 3 },
    { text: "When was the last time you helped a stranger?", trait: 'kindness', idealValue: 5 },
    { text: "How quickly do you adapt to new technology?", trait: 'intelligence', idealValue: 4 },
    { text: "Do you often come up with original ideas?", trait: 'creativity', idealValue: 4 },
    { text: "How comfortable are you speaking in front of a crowd?", trait: 'confidence', idealValue: 3 },
    { text: "Would you return a wallet you found with $100 inside?", trait: 'honesty', idealValue: 5 },
    { text: "Do you enjoy helping others, even when inconvenient?", trait: 'kindness', idealValue: 4 },
    { text: "How often do you research topics just out of curiosity?", trait: 'intelligence', idealValue: 4 },
    { text: "Do you find yourself thinking outside the box?", trait: 'creativity', idealValue: 5 },
    { text: "How well do you handle criticism?", trait: 'confidence', idealValue: 4 },
    { text: "Would you correct a cashier who gave you too much change?", trait: 'honesty', idealValue: 5 },
    { text: "Do you actively listen when friends share their problems?", trait: 'kindness', idealValue: 5 },
    { text: "How often do you challenge your existing beliefs?", trait: 'intelligence', idealValue: 4 },
    { text: "Do you enjoy artistic or creative hobbies?", trait: 'creativity', idealValue: 3 },
    { text: "Are you comfortable being yourself around others?", trait: 'confidence', idealValue: 4 }
  ];

  // Initialize sound effects
  useEffect(() => {
    Object.values(sounds).forEach(sound => {
      sound.load();
    });
    
    return () => {
      Object.values(sounds).forEach(sound => {
        sound.pause();
      });
    };
  }, []);
  
  // Play sound effect
  const playSound = (sound: keyof typeof sounds) => {
    if (!soundEnabled) return;
    sounds[sound].currentTime = 0;
    sounds[sound].play().catch(err => console.log('Audio play error:', err));
  };
  
  // Toggle sound
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    toast(soundEnabled ? "Sound turned off" : "Sound turned on");
  };
  
  // Start the game
  const startGame = () => {
    setGameStarted(true);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    playSound('click');
  };
  
  // Handle answer selection
  const handleAnswer = (value: number) => {
    playSound('click');
    
    // Record answer
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: value
    }));
    
    // Move to next question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // End of questions - calculate results
      calculateResults();
    }
  };
  
  // Calculate results
  const calculateResults = () => {
    // Group questions by trait
    const traitGroups: {[key: string]: {question: Question, answer: number}[]} = {};
    
    Object.entries(answers).forEach(([indexStr, answer]) => {
      const index = parseInt(indexStr);
      const question = questions[index];
      
      if (!traitGroups[question.trait]) {
        traitGroups[question.trait] = [];
      }
      
      traitGroups[question.trait].push({ question, answer });
    });
    
    // Calculate trait scores
    const traitScores: Trait[] = [];
    let totalPerfectScore = 0;
    
    Object.entries(traitGroups).forEach(([trait, questionsAndAnswers]) => {
      let traitScore = 0;
      let perfectScore = 0;
      
      questionsAndAnswers.forEach(({ question, answer }) => {
        // Calculate how close the answer is to the ideal value (0 = perfect, 4 = furthest)
        const distance = Math.abs(answer - question.idealValue);
        const proximity = 5 - distance; // Convert to 1-5 scale where 5 is perfect
        
        traitScore += proximity;
        perfectScore += 5; // Max score per question
      });
      
      // Get color based on trait
      const traitColors: {[key: string]: string} = {
        honesty: '#3B82F6', // Blue
        kindness: '#EC4899', // Pink
        intelligence: '#10B981', // Green
        creativity: '#F59E0B', // Amber
        confidence: '#8B5CF6' // Purple
      };
      
      traitScores.push({
        name: trait.charAt(0).toUpperCase() + trait.slice(1), // Capitalize first letter
        score: traitScore,
        perfectScore,
        color: traitColors[trait]
      });
      
      totalPerfectScore += traitScore;
    });
    
    // Sort by score
    traitScores.sort((a, b) => (b.score / b.perfectScore) - (a.score / a.perfectScore));
    
    setTraits(traitScores);
    
    // Calculate overall perfectness (as a percentage)
    const totalPossibleScore = Object.keys(traitGroups).length * 5 * 3; // 5 points max per question, assuming ~3 questions per trait
    const perfectPercentage = Math.round((totalPerfectScore / totalPossibleScore) * 100);
    
    setPerfectScore(perfectPercentage);
    
    // Generate result message
    generateResultMessage(perfectPercentage, traitScores);
    
    // Show results
    setShowResults(true);
    playSound('result');
  };
  
  // Generate result message
  const generateResultMessage = (score: number, traits: Trait[]) => {
    let message = "";
    
    if (score >= 90) {
      message = "Wow! You're incredibly balanced across all traits. Your authenticity shines through!";
    } else if (score >= 80) {
      message = "Excellent! You have a remarkable balance of qualities that make you uniquely you.";
    } else if (score >= 70) {
      message = "Great job! You show wonderful balance in most areas of your personality.";
    } else if (score >= 60) {
      message = "Good! You have many wonderful qualities and some areas where you can grow.";
    } else if (score >= 50) {
      message = "Nice! You have a solid foundation and plenty of potential for growth.";
    } else {
      message = "You have unique qualities that make you who you are. Embrace your journey!";
    }
    
    // Add trait-specific feedback
    if (traits.length > 0) {
      const strongestTrait = traits[0];
      const weakestTrait = traits[traits.length - 1];
      
      message += ` Your strongest quality is ${strongestTrait.name.toLowerCase()}, while you might want to develop your ${weakestTrait.name.toLowerCase()} a bit more.`;
    }
    
    setResultMessage(message);
  };
  
  // Restart the game
  const restartGame = () => {
    setGameStarted(false);
    setShowResults(false);
    setAnswers({});
    playSound('click');
  };
  
  // Canvas animation for the results
  useEffect(() => {
    if (showResults && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Set canvas dimensions
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      
      // Draw the personality mirror
      const drawMirror = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw mirror frame
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(canvas.width, canvas.height) * 0.4;
        
        // Mirror gradient background
        const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.3, centerX, centerY, radius * 1.2);
        gradient.addColorStop(0, 'rgba(200, 200, 255, 0.3)');
        gradient.addColorStop(0.8, 'rgba(100, 100, 200, 0.2)');
        gradient.addColorStop(1, 'rgba(50, 50, 150, 0.1)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Mirror frame
        ctx.strokeStyle = 'rgba(218, 165, 32, 0.8)';
        ctx.lineWidth = 15;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Add decorative elements to the mirror frame
        for (let i = 0; i < 12; i++) {
          const angle = (i / 12) * Math.PI * 2;
          const x1 = centerX + Math.cos(angle) * (radius - 15);
          const y1 = centerY + Math.sin(angle) * (radius - 15);
          const x2 = centerX + Math.cos(angle) * (radius + 15);
          const y2 = centerY + Math.sin(angle) * (radius + 15);
          
          ctx.strokeStyle = 'rgba(255, 215, 0, 0.6)';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
        
        // Draw the perfect percentage in the center
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = perfectScore >= 80 ? 'gold' : perfectScore >= 60 ? 'silver' : '#cd7f32'; // Gold, silver, or bronze
        ctx.fillText(`${perfectScore}%`, centerX, centerY - 10);
        
        ctx.font = '24px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText('Perfect', centerX, centerY + 25);
        
        // Draw trait bars
        const barWidth = canvas.width * 0.7;
        const barHeight = 25;
        const startY = centerY + radius * 0.7;
        const startX = (canvas.width - barWidth) / 2;
        
        traits.forEach((trait, index) => {
          const y = startY + index * (barHeight + 15);
          
          // Label
          ctx.font = '16px Arial';
          ctx.textAlign = 'left';
          ctx.fillStyle = 'white';
          ctx.fillText(trait.name, startX, y - 5);
          
          // Background bar
          ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.fillRect(startX, y, barWidth, barHeight);
          
          // Progress bar
          const percentage = trait.score / trait.perfectScore;
          ctx.fillStyle = trait.color;
          ctx.fillRect(startX, y, barWidth * percentage, barHeight);
          
          // Percentage text
          const percentText = `${Math.round(percentage * 100)}%`;
          ctx.font = 'bold 14px Arial';
          ctx.textAlign = 'right';
          ctx.fillStyle = 'white';
          ctx.fillText(percentText, startX + barWidth - 10, y + barHeight - 7);
        });

        // Draw "rays" of light behind the mirror (purely decorative)
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        
        for (let i = 0; i < 20; i++) {
          const angle = (i / 20) * Math.PI * 2;
          const length = radius * (1.5 + Math.sin(Date.now() * 0.001 + i * 0.5) * 0.2);
          
          ctx.strokeStyle = `rgba(255, 255, 200, ${0.1 + Math.sin(Date.now() * 0.002 + i) * 0.05})`;
          ctx.lineWidth = 5 + Math.sin(Date.now() * 0.003 + i) * 2;
          
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(
            centerX + Math.cos(angle) * length,
            centerY + Math.sin(angle) * length
          );
          ctx.stroke();
        }
        
        ctx.restore();
      };
      
      // Animate the mirror
      let animationFrame: number;
      
      const animate = () => {
        drawMirror();
        animationFrame = requestAnimationFrame(animate);
      };
      
      animate();
      
      // Cleanup
      return () => {
        cancelAnimationFrame(animationFrame);
      };
    }
  }, [showResults, perfectScore, traits]);

  return (
    <GameLayout
      title="How Perfect You Are"
      description="Match complex patterns with perfect precision to discover your true level of perfectness."
      soundEnabled={soundEnabled}
      toggleSound={toggleSound}
    >
      <div className="flex flex-col items-center justify-center min-h-[500px]">
        {!gameStarted ? (
          <div className="bg-white/20 backdrop-blur-md p-8 rounded-xl max-w-md text-center shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-white">Are You Perfect?</h2>
            <p className="mb-6 text-white/90">
              Answer a series of questions about yourself honestly to discover how perfect you really are.
              No one is 100% perfect, but you might be closer than you think!
            </p>
            <Button 
              onClick={startGame}
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-bold"
              size="lg"
            >
              Start Test
            </Button>
          </div>
        ) : showResults ? (
          <div className="w-full max-w-2xl">
            <canvas 
              ref={canvasRef} 
              className="w-full h-[500px] mb-4 rounded-lg"
            />
            <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl text-center mt-4">
              <h3 className="text-xl font-bold mb-3 text-white">{perfectScore}% Perfect</h3>
              <p className="text-white/90 mb-6">{resultMessage}</p>
              <div className="flex justify-center">
                <Button
                  onClick={restartGame}
                  className="flex items-center gap-2"
                >
                  <RefreshCw size={16} /> Take Test Again
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl max-w-lg w-full shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-white/80">Question {currentQuestionIndex + 1} of {questions.length}</div>
              <div className="w-24 h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-400" 
                  style={{width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`}}
                ></div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-6 text-white">{questions[currentQuestionIndex].text}</h3>
            
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => handleAnswer(value)}
                  className="p-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex flex-col items-center"
                >
                  <span className="text-lg font-bold text-white mb-1">{value}</span>
                  <span className="text-xs text-white/70">
                    {value === 1 ? 'Not at all' : 
                     value === 2 ? 'Rarely' : 
                     value === 3 ? 'Sometimes' : 
                     value === 4 ? 'Often' : 'Always'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </GameLayout>
  );
};

export default HowPerfectYouAre;
