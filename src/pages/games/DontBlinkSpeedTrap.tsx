import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { RefreshCw, Trophy, Timer, Eye, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GameLayout from '@/components/games/GameLayout';

interface Obstacle {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'motion' | 'static';
  color: string;
}

interface Level {
  id: number;
  name: string;
  speed: number;
  obstacleCount: number;
  motionTriggerThreshold: number;
  timeLimit: number;
}

const DontBlinkSpeedTrap: React.FC = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [level, setLevel] = useState<Level | null>(null);
  const [levels, setLevels] = useState<Level[]>([]);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [playerX, setPlayerX] = useState(50);
  const [playerY, setPlayerY] = useState(50);
  const [remainingTime, setRemainingTime] = useState(30);
  const [playerMoving, setPlayerMoving] = useState(false);
  const [targetReached, setTargetReached] = useState(false);
  const [instructionsShown, setInstructionsShown] = useState(false);
  const [movementSpeed, setMovementSpeed] = useState(2);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const lastUpdateTimeRef = useRef<number>(0);
  const playerPathRef = useRef<{x: number, y: number}[]>([]);
  const targetRef = useRef<{x: number, y: number} | null>(null);
  
  // Sound effects
  const sounds = {
    click: new Audio('/sounds/click.mp3'),
    success: new Audio('/sounds/success.mp3'),
    fail: new Audio('/sounds/crash.mp3'),
    levelUp: new Audio('/sounds/chime.mp3'),
    gameOver: new Audio('/sounds/result.mp3')
  };
  
  // Initialize game levels
  useEffect(() => {
    const gameLevels: Level[] = [
      { 
        id: 1, 
        name: 'Rookie', 
        speed: 2,
        obstacleCount: 5,
        motionTriggerThreshold: 0.8,
        timeLimit: 30
      },
      { 
        id: 2, 
        name: 'Amateur', 
        speed: 2.5,
        obstacleCount: 8,
        motionTriggerThreshold: 0.7,
        timeLimit: 25
      },
      { 
        id: 3, 
        name: 'Professional', 
        speed: 3,
        obstacleCount: 12,
        motionTriggerThreshold: 0.6,
        timeLimit: 20 
      },
      { 
        id: 4, 
        name: 'Expert', 
        speed: 3.5,
        obstacleCount: 16,
        motionTriggerThreshold: 0.5,
        timeLimit: 18
      },
      { 
        id: 5, 
        name: 'Master', 
        speed: 4,
        obstacleCount: 20,
        motionTriggerThreshold: 0.4,
        timeLimit: 15
      }
    ];
    
    setLevels(gameLevels);
    
    // Load high score
    const savedHighScore = localStorage.getItem('dontBlinkHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
    
    // Initialize sounds
    Object.values(sounds).forEach(sound => {
      sound.load();
    });
    
    return () => {
      // Cleanup sounds
      Object.values(sounds).forEach(sound => {
        sound.pause();
      });
      
      // Cancel animation
      cancelAnimationFrame(animationRef.current);
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
    // Initialize game state
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setCurrentLevelIndex(0);
    setLevel(levels[0]);
    setRemainingTime(levels[0]?.timeLimit || 30);
    setTargetReached(false);
    setInstructionsShown(false);
    setMovementSpeed(levels[0]?.speed || 2);
    
    // Set up first level
    startLevel(0);
    
    playSound('click');
  };
  
  // Start a specific level
  const startLevel = (levelIndex: number) => {
    if (levelIndex < 0 || levelIndex >= levels.length) return;
    
    const level = levels[levelIndex];
    if (!level) return;
    
    // Set up level
    setLevel(level);
    setCurrentLevelIndex(levelIndex);
    setRemainingTime(level.timeLimit);
    setTargetReached(false);
    setMovementSpeed(level.speed);
    
    // Reset player position
    setPlayerX(50);
    setPlayerY(Math.floor(canvasRef.current?.height || 300) / 2);
    
    // Generate obstacles for this level
    generateObstacles(level);
    
    // Generate target position
    if (canvasRef.current) {
      targetRef.current = {
        x: canvasRef.current.width - 50,
        y: Math.floor(canvasRef.current.height / 2)
      };
    }
    
    // Reset player path
    playerPathRef.current = [];
    
    // Start game loop
    lastUpdateTimeRef.current = performance.now();
    cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(gameLoop);
  };
  
  // Generate obstacles for the level
  const generateObstacles = (level: Level) => {
    const newObstacles: Obstacle[] = [];
    const canvas = canvasRef.current;
    
    if (!canvas) return;
    
    const { width, height } = canvas;
    
    // Generate obstacles based on level difficulty
    for (let i = 0; i < level.obstacleCount; i++) {
      const isMotionSensor = i < Math.ceil(level.obstacleCount * 0.7); // 70% are motion sensors
      
      // Determine size based on type
      let obsWidth = isMotionSensor ? 80 + Math.random() * 40 : 30 + Math.random() * 20;
      let obsHeight = isMotionSensor ? 60 + Math.random() * 30 : 30 + Math.random() * 20;
      
      // Determine position
      // Keep obstacles away from start and end areas
      let x = 120 + Math.random() * (width - 250);
      let y = Math.random() * (height - obsHeight);
      
      // Ensure obstacles don't completely block the path
      if (i > 0 && i % 3 === 0) {
        // Enforce some vertical spacing
        const lastObstacle = newObstacles[i - 1];
        y = (lastObstacle.y + lastObstacle.height + 50) % (height - obsHeight);
      }
      
      newObstacles.push({
        id: i,
        x,
        y,
        width: obsWidth,
        height: obsHeight,
        type: isMotionSensor ? 'motion' : 'static',
        color: isMotionSensor ? 'rgba(255, 0, 0, 0.2)' : 'rgba(64, 64, 64, 0.8)'
      });
    }
    
    setObstacles(newObstacles);
  };
  
  // Game timer
  useEffect(() => {
    if (!gameStarted || gameOver || isPaused) return;
    
    const timer = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          handleGameOver("Time's up!");
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameStarted, gameOver, isPaused]);
  
  // Game loop
  const gameLoop = (timestamp: number) => {
    if (!gameStarted || gameOver || isPaused || !canvasRef.current) {
      return;
    }
    
    const deltaTime = timestamp - lastUpdateTimeRef.current;
    lastUpdateTimeRef.current = timestamp;
    
    // Update game state
    updateGame(deltaTime);
    
    // Render game
    renderGame();
    
    // Continue animation
    animationRef.current = requestAnimationFrame(gameLoop);
  };
  
  // Update game state
  const updateGame = (deltaTime: number) => {
    if (!level || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const { width, height } = canvas;
    
    // If player is moving (controlled by mouse), update position
    if (playerMoving && playerPathRef.current.length > 0) {
      const targetPosition = playerPathRef.current[0];
      
      // Calculate distance to target
      const dx = targetPosition.x - playerX;
      const dy = targetPosition.y - playerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // If close enough to target, remove it from path
      if (distance < movementSpeed * (deltaTime / 16)) {
        playerPathRef.current.shift();
        
        // If path is empty, stop moving
        if (playerPathRef.current.length === 0) {
          setPlayerMoving(false);
        }
      } else {
        // Move towards target
        const speedFactor = deltaTime / 16; // normalize to ~60fps
        const normalizedSpeed = movementSpeed * speedFactor;
        
        const moveX = (dx / distance) * normalizedSpeed;
        const moveY = (dy / distance) * normalizedSpeed;
        
        // Update position
        setPlayerX(prev => prev + moveX);
        setPlayerY(prev => prev + moveY);
        
        // Check collision with obstacles
        const playerRadius = 10;
        
        for (const obstacle of obstacles) {
          if (obstacle.type === 'motion') {
            // For motion sensors, we only trigger them if moving too fast
            const speedThreshold = level.motionTriggerThreshold;
            const currentSpeed = Math.sqrt(moveX * moveX + moveY * moveY);
            
            if (currentSpeed > speedThreshold) {
              // Check if player is within the motion sensor area
              if (
                playerX + playerRadius > obstacle.x &&
                playerX - playerRadius < obstacle.x + obstacle.width &&
                playerY + playerRadius > obstacle.y &&
                playerY - playerRadius < obstacle.y + obstacle.height
              ) {
                // Triggered motion sensor
                handleGameOver("Motion detected! You moved too quickly.");
                return;
              }
            }
          } else {
            // For solid obstacles, collision is immediate
            if (
              playerX + playerRadius > obstacle.x &&
              playerX - playerRadius < obstacle.x + obstacle.width &&
              playerY + playerRadius > obstacle.y &&
              playerY - playerRadius < obstacle.y + obstacle.height
            ) {
              // Hit solid obstacle
              handleGameOver("You hit an obstacle!");
              return;
            }
          }
        }
        
        // Check if reached target
        if (targetRef.current) {
          const targetRadius = 15;
          const dx = playerX - targetRef.current.x;
          const dy = playerY - targetRef.current.y;
          const distToTarget = Math.sqrt(dx * dx + dy * dy);
          
          if (distToTarget < playerRadius + targetRadius) {
            // Reached target
            handleLevelComplete();
            return;
          }
        }
      }
    }
  };
  
  // Render game
  const renderGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw path line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, canvas.height / 2);
    ctx.lineTo(canvas.width - 50, canvas.height / 2);
    ctx.stroke();
    
    // Draw start area
    ctx.fillStyle = 'rgba(0, 255, 0, 0.1)';
    ctx.fillRect(0, 0, 100, canvas.height);
    
    // Draw finish area
    ctx.fillStyle = 'rgba(0, 255, 0, 0.1)';
    ctx.fillRect(canvas.width - 100, 0, 100, canvas.height);
    
    // Draw obstacles
    obstacles.forEach(obstacle => {
      ctx.fillStyle = obstacle.color;
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      
      if (obstacle.type === 'motion') {
        // Draw motion sensor pattern
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.lineWidth = 1;
        
        // Draw diagonal lines
        for (let i = -obstacle.width - obstacle.height; i < obstacle.width + obstacle.height; i += 20) {
          ctx.beginPath();
          ctx.moveTo(obstacle.x + i, obstacle.y);
          ctx.lineTo(obstacle.x + i + obstacle.height, obstacle.y + obstacle.height);
          ctx.stroke();
        }
      } else {
        // Draw solid obstacle border
        ctx.strokeStyle = 'rgba(100, 100, 100, 1)';
        ctx.lineWidth = 2;
        ctx.strokeRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      }
    });
    
    // Draw target
    if (targetRef.current) {
      const { x, y } = targetRef.current;
      
      // Outer glow
      const gradient = ctx.createRadialGradient(x, y, 5, x, y, 20);
      gradient.addColorStop(0, 'rgba(0, 255, 0, 0.8)');
      gradient.addColorStop(1, 'rgba(0, 255, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();
      
      // Inner circle
      ctx.fillStyle = '#00ff00';
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Draw player
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(playerX, playerY, 10, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw player trail
    const trail = playerPathRef.current;
    if (trail.length >= 2) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(playerX, playerY);
      
      for (const point of trail) {
        ctx.lineTo(point.x, point.y);
      }
      
      ctx.stroke();
    }
  };
  
  // Handle mouse move events
  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!gameStarted || gameOver || isPaused || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Get mouse position relative to canvas
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    // Add to player path
    playerPathRef.current = [{ x: mouseX, y: mouseY }];
    setPlayerMoving(true);
  };
  
  // Handle level completion
  const handleLevelComplete = () => {
    setTargetReached(true);
    
    // Calculate score for this level
    const levelScore = Math.floor(remainingTime * 100 * (currentLevelIndex + 1));
    setScore(prev => prev + levelScore);
    
    // Show success message
    toast.success(`Level ${level?.name} completed! +${levelScore} points`);
    playSound('success');
    
    // Check if this was the last level
    if (currentLevelIndex >= levels.length - 1) {
      // Game completed!
      setTimeout(() => {
        handleVictory();
      }, 1500);
    } else {
      // Move to next level after a short delay
      setTimeout(() => {
        startLevel(currentLevelIndex + 1);
      }, 2000);
    }
  };
  
  // Handle game over
  const handleGameOver = (reason: string) => {
    setGameOver(true);
    cancelAnimationFrame(animationRef.current);
    
    toast.error(reason);
    playSound('fail');
    
    // Check for high score
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('dontBlinkHighScore', score.toString());
      
      setTimeout(() => {
        toast.success("New High Score!");
        playSound('success');
      }, 1000);
    }
  };
  
  // Handle victory (all levels completed)
  const handleVictory = () => {
    setGameOver(true);
    cancelAnimationFrame(animationRef.current);
    
    // Add completion bonus
    const completionBonus = 5000;
    setScore(prev => prev + completionBonus);
    
    toast.success(`Game completed! +${completionBonus} completion bonus`);
    playSound('success');
    
    // Check for high score
    if (score + completionBonus > highScore) {
      setHighScore(score + completionBonus);
      localStorage.setItem('dontBlinkHighScore', (score + completionBonus).toString());
      
      setTimeout(() => {
        toast.success("New High Score!");
      }, 1000);
    }
  };
  
  // Toggle pause
  const togglePause = () => {
    setIsPaused(prev => !prev);
    
    if (!isPaused) {
      cancelAnimationFrame(animationRef.current);
      toast.info("Game paused");
    } else {
      lastUpdateTimeRef.current = performance.now();
      animationRef.current = requestAnimationFrame(gameLoop);
      toast.info("Game resumed");
    }
    
    playSound('click');
  };
  
  // Restart game
  const restartGame = () => {
    startGame();
  };
  
  // Show instructions
  const showInstructions = () => {
    setInstructionsShown(true);
    playSound('click');
  };
  
  // Hide instructions
  const hideInstructions = () => {
    setInstructionsShown(false);
    playSound('click');
  };
  
  // Set canvas dimensions when game starts
  useEffect(() => {
    if (gameStarted && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      
      // Start game loop
      lastUpdateTimeRef.current = performance.now();
      animationRef.current = requestAnimationFrame(gameLoop);
    }
  }, [gameStarted]);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        
        // Update target position
        if (targetRef.current) {
          targetRef.current.x = canvas.width - 50;
          targetRef.current.y = Math.floor(canvas.height / 2);
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <GameLayout
      title="Don't Blink: Speed Trap"
      description="Navigate motion-sensitive traps with strategic pauses. Don't move too fast or you'll trigger the alarms!"
      soundEnabled={soundEnabled}
      toggleSound={toggleSound}
    >
      <div className="flex flex-col items-center justify-center w-full">
        {!gameStarted ? (
          <div className="bg-white/20 backdrop-blur-md p-8 rounded-xl max-w-md text-center shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-white">Don't Blink: Speed Trap</h2>
            <p className="mb-6 text-white/90">
              Navigate through motion-sensitive traps from start to finish. Move your cursor too quickly 
              through red zones, and you'll trigger the alarm! Learn to move with control and patience.
            </p>
            <div className="flex justify-center space-x-4">
              <Button 
                onClick={showInstructions}
                className="bg-white/20 hover:bg-white/30 text-white"
              >
                How to Play
              </Button>
              <Button 
                onClick={startGame}
                className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold"
                size="lg"
              >
                Start Game
              </Button>
            </div>
          </div>
        ) : gameOver ? (
          <div className="bg-white/20 backdrop-blur-md p-8 rounded-xl max-w-md text-center shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-white">Game Over!</h2>
            <p className="text-4xl font-extrabold mb-2 text-white">Score: {score}</p>
            <p className="text-xl mb-2 text-white/80">High Score: {highScore}</p>
            <p className="text-lg mb-6 text-white/80">Level Reached: {level?.name || 'N/A'}</p>
            <div className="flex justify-center space-x-4">
              <Button 
                onClick={restartGame}
                className="flex items-center gap-2"
                size="lg"
              >
                <RefreshCw size={18} /> Play Again
              </Button>
            </div>
          </div>
        ) : instructionsShown ? (
          <div className="bg-white/20 backdrop-blur-md p-8 rounded-xl max-w-lg text-center shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-white">How to Play</h2>
            <div className="text-left mb-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white">The Challenge</h3>
                <p className="text-white/90">
                  Move from the green starting area to the green target without triggering motion detectors or hitting obstacles.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white">Controls</h3>
                <p className="text-white/90">
                  Simply move your mouse to guide your character. Your character follows your mouse cursor automatically.
                </p>
              </div>
              
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-red-500/30 mt-1 flex-shrink-0"></div>
                <p className="text-white/90">
                  <strong>Red zones</strong> are motion detectors. Moving too quickly through these will trigger the alarm.
                </p>
              </div>
              
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-gray-500/80 mt-1 flex-shrink-0"></div>
                <p className="text-white/90">
                  <strong>Gray obstacles</strong> are solid barriers. Touching these ends the game immediately.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white">Tips</h3>
                <ul className="list-disc list-inside text-white/90">
                  <li>Slow down when crossing red motion detectors</li>
                  <li>Plan your route carefully before moving</li>
                  <li>The faster you complete a level, the more points you earn</li>
                  <li>Each level gets progressively more difficult</li>
                </ul>
              </div>
            </div>
            <Button 
              onClick={hideInstructions}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Got It
            </Button>
          </div>
        ) : (
          <div className="w-full max-w-4xl">
            {/* Game HUD */}
            <div className="flex justify-between items-center mb-4 bg-black/30 p-3 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="text-white font-mono p-2 bg-black/30 rounded flex items-center">
                  <Timer className="mr-2" size={16} />
                  {remainingTime}s
                </div>
                <div className="text-white font-mono p-2 bg-black/30 rounded flex items-center">
                  <Trophy className="mr-2" size={16} />
                  {score}
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold px-3 py-1 rounded-full">
                Level: {level?.name || 'N/A'}
              </div>
              
              <Button
                size="sm"
                onClick={togglePause}
                className={isPaused ? "bg-green-600" : "bg-gray-600"}
              >
                {isPaused ? "Resume" : "Pause"}
              </Button>
            </div>
            
            {/* Game Canvas */}
            <div className="relative w-full h-[400px]">
              <canvas 
                ref={canvasRef} 
                className="w-full h-full rounded-lg overflow-hidden shadow-xl bg-gray-900"
                onMouseMove={handleMouseMove}
              />
              
              {/* Warning overlay when in motion-detected areas */}
              <div className={`absolute inset-0 bg-red-500/10 backdrop-blur-sm pointer-events-none flex items-center justify-center ${playerMoving ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                <div className="animate-pulse flex flex-col items-center">
                  <AlertTriangle className="text-red-500" size={32} />
                  <span className="text-red-500 font-bold text-sm mt-2">MOTION DETECTED</span>
                </div>
              </div>
              
              {/* Pause overlay */}
              {isPaused && (
                <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">Game Paused</h3>
                    <Button 
                      onClick={togglePause}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Resume
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Game status */}
            <div className="mt-4 flex justify-between items-center">
              <div className="text-white/80 text-sm">
                Speed threshold: {level?.motionTriggerThreshold.toFixed(2)}
              </div>
              
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500/30 mr-2"></div>
                <span className="text-white/80 text-sm mr-4">Motion Detectors</span>
                
                <div className="w-4 h-4 bg-gray-500/80 mr-2"></div>
                <span className="text-white/80 text-sm">Solid Obstacles</span>
              </div>
              
              <div className="text-white/80 text-sm flex items-center">
                <Eye className="mr-2" size={16} />
                Move slowly through red zones
              </div>
            </div>
          </div>
        )}
      </div>
    </GameLayout>
  );
};

export default DontBlinkSpeedTrap;
