
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { RefreshCw, Eye, EyeOff, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GameLayout from '@/components/games/GameLayout';

interface ImagePair {
  id: number;
  base: string;
  altered: string;
  differences: Array<{x: number, y: number, radius: number}>;
}

const BlinkAndMiss: React.FC = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [imagePairs, setImagePairs] = useState<ImagePair[]>([]);
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [showingAltered, setShowingAltered] = useState(false);
  const [switchSpeed, setSwitchSpeed] = useState(2000); // milliseconds
  const [remainingTime, setRemainingTime] = useState(60); // seconds
  const [foundDifferences, setFoundDifferences] = useState<number[]>([]);
  const [hintUsed, setHintUsed] = useState(false);
  const [hintAvailable, setHintAvailable] = useState(true);
  const [clickable, setClickable] = useState(true);
  const [blinkMode, setBlinkMode] = useState('auto'); // 'auto' or 'manual'
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  // Sound effects
  const sounds = {
    click: new Audio('/sounds/click.mp3'),
    success: new Audio('/sounds/success.mp3'),
    fail: new Audio('/sounds/crash.mp3'),
    levelUp: new Audio('/sounds/chime.mp3'),
    gameOver: new Audio('/sounds/result.mp3')
  };

  // Mock image pairs (in a real game, these would be actual image URLs)
  const generateMockImagePairs = () => {
    const mockPairs: ImagePair[] = [];
    
    // Level 1 pairs (easier)
    for (let i = 0; i < 3; i++) {
      mockPairs.push({
        id: i + 1,
        base: `base_image_${i + 1}.jpg`, // These are placeholder URLs
        altered: `altered_image_${i + 1}.jpg`,
        differences: [
          {x: 100 + Math.random() * 200, y: 100 + Math.random() * 100, radius: 20},
          {x: 300 + Math.random() * 200, y: 200 + Math.random() * 100, radius: 20},
          {x: 200 + Math.random() * 200, y: 300 + Math.random() * 100, radius: 20}
        ]
      });
    }
    
    // Level 2 pairs (medium)
    for (let i = 3; i < 6; i++) {
      mockPairs.push({
        id: i + 1,
        base: `base_image_${i + 1}.jpg`,
        altered: `altered_image_${i + 1}.jpg`,
        differences: [
          {x: 100 + Math.random() * 200, y: 100 + Math.random() * 100, radius: 15},
          {x: 300 + Math.random() * 200, y: 200 + Math.random() * 100, radius: 15},
          {x: 200 + Math.random() * 200, y: 300 + Math.random() * 100, radius: 15},
          {x: 400 + Math.random() * 100, y: 150 + Math.random() * 100, radius: 15}
        ]
      });
    }
    
    // Level 3 pairs (harder)
    for (let i = 6; i < 9; i++) {
      mockPairs.push({
        id: i + 1,
        base: `base_image_${i + 1}.jpg`,
        altered: `altered_image_${i + 1}.jpg`,
        differences: [
          {x: 100 + Math.random() * 200, y: 100 + Math.random() * 100, radius: 10},
          {x: 300 + Math.random() * 200, y: 200 + Math.random() * 100, radius: 10},
          {x: 200 + Math.random() * 200, y: 300 + Math.random() * 100, radius: 10},
          {x: 400 + Math.random() * 100, y: 150 + Math.random() * 100, radius: 10},
          {x: 150 + Math.random() * 200, y: 250 + Math.random() * 100, radius: 10}
        ]
      });
    }
    
    return mockPairs;
  };

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

  // Start game
  const startGame = () => {
    // Generate mock image pairs
    const pairs = generateMockImagePairs();
    setImagePairs(pairs);
    
    // Initialize game state
    setCurrentPairIndex(0);
    setScore(0);
    setLevel(1);
    setRemainingTime(60);
    setShowingAltered(false);
    setFoundDifferences([]);
    setHintUsed(false);
    setHintAvailable(true);
    setSwitchSpeed(2000);
    setGameStarted(true);
    setGameOver(false);
    
    playSound('click');
    
    // Start with the first image
    switchToBase();
  };
  
  // Game timer
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const timer = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameStarted, gameOver]);
  
  // Auto-switching between images in auto mode
  useEffect(() => {
    if (!gameStarted || gameOver || blinkMode !== 'auto') return;
    
    const switchInterval = setInterval(() => {
      toggleImage();
    }, switchSpeed);
    
    return () => clearInterval(switchInterval);
  }, [gameStarted, gameOver, showingAltered, blinkMode, switchSpeed]);
  
  // Switch to base image
  const switchToBase = () => {
    setShowingAltered(false);
    setClickable(true);
  };
  
  // Switch to altered image
  const switchToAltered = () => {
    setShowingAltered(true);
    setClickable(true);
  };
  
  // Toggle between base and altered images
  const toggleImage = () => {
    setShowingAltered(prev => !prev);
  };
  
  // Change blink mode
  const toggleBlinkMode = () => {
    setBlinkMode(prev => prev === 'auto' ? 'manual' : 'auto');
    playSound('click');
    toast(`Switched to ${blinkMode === 'auto' ? 'manual' : 'auto'} blink mode`);
  };
  
  // Manual blink
  const manualBlink = () => {
    if (blinkMode !== 'manual') return;
    toggleImage();
    playSound('click');
  };
  
  // Handle end of game
  const endGame = () => {
    setGameOver(true);
    playSound('gameOver');
  };
  
  // Handle image click
  const handleImageClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!clickable || !imageRef.current || foundDifferences.length >= imagePairs[currentPairIndex]?.differences.length) return;
    
    // Get click coordinates relative to the image
    const rect = imageRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Scale coordinates if the image is being displayed at a different size than its natural size
    const scaleX = imageRef.current.naturalWidth / rect.width;
    const scaleY = imageRef.current.naturalHeight / rect.height;
    
    const scaledX = x * scaleX;
    const scaledY = y * scaleY;
    
    // Check if click is on a difference
    const currentPair = imagePairs[currentPairIndex];
    let hitDifference = false;
    
    if (currentPair) {
      currentPair.differences.forEach((diff, index) => {
        // Check if this difference was already found
        if (foundDifferences.includes(index)) return;
        
        // Check if click is within the difference area
        const distance = Math.sqrt(
          Math.pow(diff.x - scaledX, 2) + Math.pow(diff.y - scaledY, 2)
        );
        
        if (distance <= diff.radius) {
          // Found a difference!
          hitDifference = true;
          
          // Add to found differences
          setFoundDifferences(prev => [...prev, index]);
          
          // Update score
          setScore(prev => prev + 100);
          
          playSound('success');
          toast.success("You found a difference!");
          
          // Show feedback circle at click position
          highlightDifference(x, y);
        }
      });
    }
    
    if (!hitDifference) {
      // Wrong click
      playSound('fail');
      setScore(prev => Math.max(0, prev - 20)); // Penalty
      
      // Visual feedback for incorrect click
      showClickFeedback(x, y, false);
    }
    
    // Check if all differences in this pair have been found
    checkCompletion();
  };
  
  // Visual feedback for correct click
  const highlightDifference = (x: number, y: number) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Draw expanding circle
      const drawCircle = (radius: number, alpha: number) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 255, 0, ${alpha})`;
        ctx.lineWidth = 3;
        ctx.stroke();
      };
      
      let radius = 10;
      const maxRadius = 40;
      let alpha = 1;
      
      const animate = () => {
        drawCircle(radius, alpha);
        radius += 2;
        alpha -= 0.05;
        
        if (radius <= maxRadius && alpha > 0) {
          requestAnimationFrame(animate);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      };
      
      animate();
    }
  };
  
  // Visual feedback for incorrect click
  const showClickFeedback = (x: number, y: number, correct: boolean) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw X mark
      ctx.strokeStyle = 'rgba(255, 0, 0, 0.8)';
      ctx.lineWidth = 4;
      
      ctx.beginPath();
      ctx.moveTo(x - 15, y - 15);
      ctx.lineTo(x + 15, y + 15);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(x + 15, y - 15);
      ctx.lineTo(x - 15, y + 15);
      ctx.stroke();
      
      // Clear after a short delay
      setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }, 500);
    }
  };
  
  // Check if all differences are found
  const checkCompletion = () => {
    if (!imagePairs[currentPairIndex]) return;
    
    const allDifferencesFound = foundDifferences.length === imagePairs[currentPairIndex].differences.length;
    
    if (allDifferencesFound) {
      // All differences found in current pair
      toast.success("All differences found! Moving to next image.");
      playSound('levelUp');
      
      // Bonus points for completing the pair
      setScore(prev => prev + 200);
      
      // Move to next pair
      setTimeout(() => {
        moveToNextPair();
      }, 1500);
    }
  };
  
  // Move to the next image pair
  const moveToNextPair = () => {
    const nextIndex = currentPairIndex + 1;
    
    if (nextIndex < imagePairs.length) {
      setCurrentPairIndex(nextIndex);
      setFoundDifferences([]);
      setHintUsed(false);
      
      // Increase difficulty every 3 images
      if (nextIndex % 3 === 0) {
        setLevel(prev => prev + 1);
        setSwitchSpeed(prev => Math.max(prev * 0.8, 500)); // Speed up the switching, but not below 500ms
        toast.info(`Level ${level + 1}! Images will switch faster now.`);
      }
    } else {
      // No more image pairs - end game with victory
      toast.success("You completed all images!");
      endGame();
    }
  };
  
  // Use hint
  const useHint = () => {
    if (!hintAvailable || !imagePairs[currentPairIndex]) return;
    
    playSound('click');
    
    // Find an unhighlighted difference
    const currentPair = imagePairs[currentPairIndex];
    const notFoundIndices = currentPair.differences
      .map((_, index) => index)
      .filter(index => !foundDifferences.includes(index));
    
    if (notFoundIndices.length > 0) {
      // Select a random unfound difference
      const randomIndex = notFoundIndices[Math.floor(Math.random() * notFoundIndices.length)];
      const difference = currentPair.differences[randomIndex];
      
      // Show hint
      showHintCircle(difference.x, difference.y);
      
      // Mark hint as used
      setHintUsed(true);
      setHintAvailable(false);
      
      // Penalty for using hint
      setScore(prev => Math.max(0, prev - 50));
      
      // Hint becomes available again after a delay
      setTimeout(() => {
        if (gameStarted && !gameOver) {
          setHintAvailable(true);
        }
      }, 30000); // 30 second cooldown
    }
  };
  
  // Show hint circle
  const showHintCircle = (x: number, y: number) => {
    if (!canvasRef.current || !imageRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageRect = imageRef.current.getBoundingClientRect();
    
    // Convert coordinates from image natural size to display size
    const scaleX = imageRef.current.width / imageRef.current.naturalWidth;
    const scaleY = imageRef.current.height / imageRef.current.naturalHeight;
    
    const displayX = x * scaleX;
    const displayY = y * scaleY;
    
    if (ctx) {
      // Pulsating circle animation
      let opacity = 1;
      let radius = 20;
      let expanding = true;
      
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw pulsating circle
        ctx.beginPath();
        ctx.arc(displayX, displayY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 0, ${opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Update animation
        if (expanding) {
          radius += 0.5;
          if (radius >= 30) expanding = false;
        } else {
          radius -= 0.5;
          if (radius <= 20) expanding = true;
        }
        
        opacity -= 0.01;
        
        if (opacity > 0) {
          requestAnimationFrame(animate);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      };
      
      animate();
    }
  };

  // Restart game
  const restartGame = () => {
    startGame();
  };

  // Draw placeholder images for development purposes
  const renderPlaceholderImage = (isAltered: boolean) => {
    const currentPair = imagePairs[currentPairIndex];
    if (!currentPair) return null;
    
    // Create a colored placeholder
    const color = isAltered ? '#2c3e50' : '#34495e';
    const label = isAltered ? 'Modified Image' : 'Original Image';
    
    return (
      <div 
        className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center relative"
        style={{ aspectRatio: '16/9' }}
      >
        {/* For development, highlight where the differences are */}
        {isAltered && currentPair.differences.map((diff, index) => (
          <div 
            key={index}
            className={`absolute rounded-full border-2 ${foundDifferences.includes(index) ? 'border-green-500 bg-green-500/30' : 'border-red-500 bg-red-500/10'}`}
            style={{
              left: `${diff.x / 5}px`,
              top: `${diff.y / 5}px`,
              width: `${diff.radius * 2}px`,
              height: `${diff.radius * 2}px`,
              transform: 'translate(-50%, -50%)'
            }}
          ></div>
        ))}
        
        <span className="text-gray-300 text-sm">{label}</span>
      </div>
    );
  };

  return (
    <GameLayout
      title="Blink & Miss"
      description="Spot subtle differences between rapidly changing images in this perception test game."
      soundEnabled={soundEnabled}
      toggleSound={toggleSound}
    >
      <div className="flex flex-col items-center justify-center w-full">
        {!gameStarted ? (
          <div className="bg-white/20 backdrop-blur-md p-8 rounded-xl max-w-md text-center shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-white">Blink & Miss</h2>
            <p className="mb-6 text-white/90">
              Images will rapidly switch back and forth between original and modified versions.
              Find the differences before time runs out! Train your perception and visual memory.
            </p>
            <Button 
              onClick={startGame}
              className="bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white font-bold"
              size="lg"
            >
              Start Game
            </Button>
          </div>
        ) : gameOver ? (
          <div className="bg-white/20 backdrop-blur-md p-8 rounded-xl max-w-md text-center shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-white">Game Over!</h2>
            <p className="text-4xl font-extrabold mb-2 text-white">Score: {score}</p>
            <p className="text-xl mb-6 text-white/80">Level Reached: {level}</p>
            <Button 
              onClick={restartGame}
              className="flex items-center gap-2"
              size="lg"
            >
              <RefreshCw size={18} /> Play Again
            </Button>
          </div>
        ) : (
          <div className="w-full max-w-4xl">
            {/* Game HUD */}
            <div className="flex justify-between items-center mb-4 bg-black/30 p-3 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="text-white font-mono p-2 bg-black/30 rounded">
                  <Timer className="inline-block mr-2" size={16} />
                  {remainingTime}s
                </div>
                <div className="text-white font-mono p-2 bg-black/30 rounded">
                  Level: {level}
                </div>
              </div>
              
              <div className="text-white font-bold text-xl">
                Score: {score}
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  className={hintAvailable ? "bg-yellow-500/20" : "bg-gray-500/20"}
                  onClick={useHint}
                  disabled={!hintAvailable}
                >
                  Hint
                </Button>
                <Button
                  size="sm"
                  variant={blinkMode === 'manual' ? "default" : "outline"}
                  onClick={toggleBlinkMode}
                >
                  {blinkMode === 'auto' ? <Eye size={18} /> : <EyeOff size={18} />}
                </Button>
              </div>
            </div>
            
            {/* Image display */}
            <div 
              className="relative w-full h-auto rounded-lg overflow-hidden shadow-xl"
              style={{ aspectRatio: '16/9' }}
              onClick={handleImageClick}
            >
              <div className="absolute inset-0">
                {/* We're using placeholder images for development purposes */}
                <div className="relative w-full h-full">
                  {/* Base image */}
                  <div className={`absolute inset-0 transition-opacity duration-100 ${showingAltered ? 'opacity-0' : 'opacity-100'}`}>
                    {renderPlaceholderImage(false)}
                  </div>
                  
                  {/* Altered image */}
                  <div className={`absolute inset-0 transition-opacity duration-100 ${showingAltered ? 'opacity-100' : 'opacity-0'}`}>
                    {renderPlaceholderImage(true)}
                  </div>
                  
                  {/* Image reference for click detection */}
                  <img 
                    ref={imageRef}
                    src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" // Transparent 1x1 pixel
                    alt=""
                    className="absolute inset-0 w-full h-full opacity-0"
                  />
                  
                  {/* Canvas for highlighting */}
                  <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none"></canvas>
                </div>
              </div>
            </div>
            
            {/* Controls for manual mode */}
            {blinkMode === 'manual' && (
              <div className="mt-4 flex justify-center">
                <Button
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8"
                  onClick={manualBlink}
                  size="lg"
                >
                  Blink
                </Button>
              </div>
            )}
            
            {/* Differences counter */}
            <div className="mt-4 flex justify-center">
              <div className="bg-black/30 px-4 py-2 rounded-lg text-white">
                Differences found: {foundDifferences.length} / {imagePairs[currentPairIndex]?.differences.length || 0}
              </div>
            </div>
          </div>
        )}
      </div>
    </GameLayout>
  );
};

export default BlinkAndMiss;
