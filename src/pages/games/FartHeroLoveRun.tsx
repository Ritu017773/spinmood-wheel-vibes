
import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, RefreshCw, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const FartHeroLoveRun: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [highScore, setHighScore] = useState<number>(0);
  const navigate = useNavigate();
  
  // Game objects
  const heroRef = useRef({
    x: 50,
    y: 0,
    width: 40,
    height: 40,
    velocity: 0,
    isJumping: false,
    fartCharge: 0,
    maxCharge: 100
  });
  
  const gameStateRef = useRef({
    coins: [] as {x: number, y: number, width: number, height: number, collected: boolean}[],
    obstacles: [] as {x: number, y: number, width: number, height: number, type: string}[],
    ground: 300,
    gravity: 0.5,
    scrollSpeed: 3,
    animationFrame: 0,
    lastTimestamp: 0
  });

  // Sound effects
  const soundsRef = useRef({
    fart: new Audio('/sounds/fart.mp3'),
    coin: new Audio('/sounds/coin.mp3'),
    crash: new Audio('/sounds/crash.mp3')
  });
  
  // Load or initialize high score
  useEffect(() => {
    const savedHighScore = localStorage.getItem('fartHeroHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
    
    // Preload sounds
    Object.values(soundsRef.current).forEach(sound => {
      sound.load();
    });
    
    return () => {
      // Cleanup
      Object.values(soundsRef.current).forEach(sound => {
        sound.pause();
      });
    };
  }, []);
  
  // Set up game
  useEffect(() => {
    if (!isPlaying) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const hero = heroRef.current;
    const gameState = gameStateRef.current;
    
    // Set canvas dimensions
    canvas.width = 800;
    canvas.height = 400;
    
    // Reset hero position
    hero.x = 50;
    hero.y = gameState.ground - hero.height;
    hero.velocity = 0;
    hero.isJumping = false;
    hero.fartCharge = 0;
    
    // Reset game state
    gameState.coins = [];
    gameState.obstacles = [];
    gameState.scrollSpeed = 3 + (level - 1);
    
    // Generate initial obstacles and coins
    generateLevel(level);
    
    // Game loop
    let animationId: number;
    const gameLoop = (timestamp: number) => {
      if (!gameState.lastTimestamp) {
        gameState.lastTimestamp = timestamp;
      }
      
      const deltaTime = timestamp - gameState.lastTimestamp;
      gameState.lastTimestamp = timestamp;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw sky and ground
      drawBackground(ctx, canvas.width, canvas.height);
      
      // Update and draw hero
      updateHero(deltaTime);
      drawHero(ctx);
      
      // Update and draw obstacles
      updateObstacles();
      drawObstacles(ctx);
      
      // Update and draw coins
      updateCoins();
      drawCoins(ctx);
      
      // Check collisions
      checkCollisions();
      
      // Draw score and lives
      drawUI(ctx);
      
      // Continue game loop
      if (!gameOver) {
        animationId = requestAnimationFrame(gameLoop);
      }
    };
    
    // Start game loop
    animationId = requestAnimationFrame(gameLoop);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPlaying, level, gameOver]);
  
  // Handle keyboard input
  useEffect(() => {
    if (!isPlaying) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        startFart();
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        releaseFart();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPlaying]);
  
  // Touch controls for mobile
  useEffect(() => {
    if (!isPlaying || !canvasRef.current) return;
    
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      startFart();
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      releaseFart();
    };
    
    const canvas = canvasRef.current;
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isPlaying]);
  
  // Generate game level
  const generateLevel = (level: number) => {
    const gameState = gameStateRef.current;
    
    // Clear existing obstacles and coins
    gameState.obstacles = [];
    gameState.coins = [];
    
    // Number of obstacles and coins increases with level
    const obstacleCount = 5 + level * 3;
    const coinCount = 10 + level * 5;
    
    // Generate obstacles
    for (let i = 0; i < obstacleCount; i++) {
      const type = Math.random() > 0.5 ? 'spike' : 'pit';
      const width = type === 'spike' ? 30 : 60;
      const height = type === 'spike' ? 40 : 60;
      
      gameState.obstacles.push({
        x: 800 + i * (Math.random() * 300 + 200),
        y: gameState.ground - height,
        width,
        height,
        type
      });
    }
    
    // Generate coins
    for (let i = , i < coinCount; i++) {
      gameState.coins.push({
        x: 800 + i * (Math.random() * 200 + 100),
        y: gameState.ground - 50 - Math.random() * 100,
        width: 20,
        height: 20,
        collected: false
      });
    }
  };
  
  // Start charging fart
  const startFart = () => {
    const hero = heroRef.current;
    
    if (hero.isJumping) return;
    
    // Start charging
    const chargeInterval = setInterval(() => {
      hero.fartCharge = Math.min(hero.fartCharge + 5, hero.maxCharge);
      
      // Stop charging if max reached or released
      if (hero.fartCharge >= hero.maxCharge || !isPlaying) {
        clearInterval(chargeInterval);
      }
    }, 100);
    
    // Save interval ID for cleanup
    return () => clearInterval(chargeInterval);
  };
  
  // Release fart and jump
  const releaseFart = () => {
    const hero = heroRef.current;
    
    // Calculate jump power based on charge
    const jumpPower = hero.fartCharge / 10;
    hero.velocity = -jumpPower;
    hero.isJumping = true;
    
    // Play fart sound
    if (soundEnabled) {
      soundsRef.current.fart.currentTime = 0;
      soundsRef.current.fart.play().catch(err => console.log('Audio play error:', err));
    }
    
    // Reset charge
    hero.fartCharge = 0;
  };
  
  // Update hero position
  const updateHero = (deltaTime: number) => {
    const hero = heroRef.current;
    const gameState = gameStateRef.current;
    
    // Apply gravity
    hero.velocity += gameState.gravity;
    hero.y += hero.velocity;
    
    // Ground collision
    if (hero.y > gameState.ground - hero.height) {
      hero.y = gameState.ground - hero.height;
      hero.velocity = 0;
      hero.isJumping = false;
    }
    
    // Ceiling collision
    if (hero.y < 0) {
      hero.y = 0;
      hero.velocity = 0;
    }
  };
  
  // Draw hero on canvas
  const drawHero = (ctx: CanvasRenderingContext2D) => {
    const hero = heroRef.current;
    
    // Draw hero body
    ctx.fillStyle = '#FF5722';
    ctx.fillRect(hero.x, hero.y, hero.width, hero.height);
    
    // Draw hero face
    ctx.fillStyle = 'white';
    ctx.fillRect(hero.x + 25, hero.y + 10, 10, 10); // eye
    ctx.fillRect(hero.x + 28, hero.y + 25, 10, 5);  // mouth
    
    // Draw fart charge meter
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillRect(hero.x - 10, hero.y, 5, hero.height);
    
    ctx.fillStyle = 'rgba(255, 165, 0, 0.8)';
    const chargeHeight = (hero.fartCharge / hero.maxCharge) * hero.height;
    ctx.fillRect(hero.x - 10, hero.y + hero.height - chargeHeight, 5, chargeHeight);
    
    // Draw fart cloud if charging or jumping
    if (hero.fartCharge > 0 || hero.isJumping) {
      ctx.fillStyle = 'rgba(255, 255, 150, 0.7)';
      ctx.beginPath();
      ctx.ellipse(
        hero.x - 15, 
        hero.y + hero.height - 10, 
        20, 
        15, 
        0, 0, 2 * Math.PI
      );
      ctx.fill();
    }
  };
  
  // Update obstacles position
  const updateObstacles = () => {
    const gameState = gameStateRef.current;
    
    gameState.obstacles.forEach(obstacle => {
      obstacle.x -= gameState.scrollSpeed;
    });
    
    // Remove off-screen obstacles
    gameState.obstacles = gameState.obstacles.filter(obstacle => obstacle.x > -obstacle.width);
    
    // Check if all obstacles passed
    if (gameState.obstacles.length === 0) {
      // Level complete
      setLevel(prev => prev + 1);
      toast.success(`Level ${level} complete!`);
      generateLevel(level + 1);
    }
  };
  
  // Draw obstacles on canvas
  const drawObstacles = (ctx: CanvasRenderingContext2D) => {
    const gameState = gameStateRef.current;
    
    gameState.obstacles.forEach(obstacle => {
      if (obstacle.type === 'spike') {
        // Draw spike
        ctx.fillStyle = '#F44336';
        
        // Triangle shape
        ctx.beginPath();
        ctx.moveTo(obstacle.x, obstacle.y + obstacle.height);
        ctx.lineTo(obstacle.x + obstacle.width/2, obstacle.y);
        ctx.lineTo(obstacle.x + obstacle.width, obstacle.y + obstacle.height);
        ctx.closePath();
        ctx.fill();
      } else {
        // Draw pit
        ctx.fillStyle = '#795548';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      }
    });
  };
  
  // Update coins position
  const updateCoins = () => {
    const gameState = gameStateRef.current;
    
    gameState.coins.forEach(coin => {
      coin.x -= gameState.scrollSpeed;
    });
    
    // Remove off-screen and collected coins
    gameState.coins = gameState.coins.filter(coin => coin.x > -coin.width && !coin.collected);
  };
  
  // Draw coins on canvas
  const drawCoins = (ctx: CanvasRenderingContext2D) => {
    const gameState = gameStateRef.current;
    
    gameState.coins.forEach(coin => {
      if (!coin.collected) {
        // Draw gold coin
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(coin.x + coin.width/2, coin.y + coin.height/2, coin.width/2, 0, Math.PI * 2);
        ctx.fill();
        
        // Add shine effect
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(
          coin.x + coin.width/2 - 3, 
          coin.y + coin.height/2 - 3, 
          coin.width/4, 
          0, Math.PI * 2
        );
        ctx.fill();
      }
    });
  };
  
  // Check for collisions
  const checkCollisions = () => {
    const hero = heroRef.current;
    const gameState = gameStateRef.current;
    
    // Obstacle collisions
    gameState.obstacles.forEach(obstacle => {
      if (
        hero.x < obstacle.x + obstacle.width &&
        hero.x + hero.width > obstacle.x &&
        hero.y < obstacle.y + obstacle.height &&
        hero.y + hero.height > obstacle.y
      ) {
        // Collision with obstacle
        if (soundEnabled) {
          soundsRef.current.crash.currentTime = 0;
          soundsRef.current.crash.play().catch(err => console.log('Audio play error:', err));
        }
        
        setLives(prev => prev - 1);
        
        // Reset hero position
        hero.x = 50;
        hero.y = gameState.ground - hero.height;
        hero.velocity = 0;
        hero.fartCharge = 0;
        
        // Check game over
        if (lives <= 1) {
          gameOver();
        }
      }
    });
    
    // Coin collisions
    gameState.coins.forEach(coin => {
      if (
        !coin.collected &&
        hero.x < coin.x + coin.width &&
        hero.x + hero.width > coin.x &&
        hero.y < coin.y + coin.height &&
        hero.y + hero.height > coin.y
      ) {
        // Collect coin
        coin.collected = true;
        setScore(prev => prev + 10);
        
        if (soundEnabled) {
          soundsRef.current.coin.currentTime = 0;
          soundsRef.current.coin.play().catch(err => console.log('Audio play error:', err));
        }
      }
    });
  };
  
  // Draw UI elements
  const drawUI = (ctx: CanvasRenderingContext2D) => {
    // Draw score
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 20, 30);
    
    // Draw level
    ctx.fillText(`Level: ${level}`, 20, 60);
    
    // Draw lives
    ctx.fillText(`Lives: ${lives}`, 20, 90);
    
    // Draw high score
    ctx.fillText(`High Score: ${highScore}`, 600, 30);
  };
  
  // Draw background
  const drawBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Sky
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#E0F7FA');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Ground
    ctx.fillStyle = '#8BC34A';
    ctx.fillRect(0, gameStateRef.current.ground, width, height - gameStateRef.current.ground);
  };
  
  // Handle game over
  const handleGameOver = () => {
    setGameOver(true);
    
    // Update high score if needed
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('fartHeroHighScore', score.toString());
      toast.success('New High Score!');
    }
  };
  
  // Restart game
  const handleRestart = () => {
    setScore(0);
    setLives(3);
    setLevel(1);
    setGameOver(false);
    setIsPlaying(true);
  };
  
  // Toggle sound
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    toast(soundEnabled ? 'Sound off' : 'Sound on');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex flex-col">
      <Helmet>
        <title>Fart Hero: Love Run - SpinMood Games</title>
        <meta name="description" content="Navigate levels, avoid obstacles, collect coins in this quirky action game where your hero is propelled by farts!" />
      </Helmet>
      
      <header className="bg-black/30 backdrop-blur-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="text-white"
              aria-label="Home"
            >
              <Home size={24} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/games')}
              className="text-white"
              aria-label="Back"
            >
              <ArrowLeft size={24} />
            </Button>
          </div>
          <h1 className="text-2xl font-bold text-white">Fart Hero: Love Run</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSound}
            className="text-white"
            aria-label={soundEnabled ? "Mute" : "Unmute"}
          >
            {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </Button>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto flex flex-col items-center justify-center p-4">
        {!isPlaying && !gameOver ? (
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-xl max-w-md w-full text-center">
            <h2 className="text-3xl font-bold mb-4">Fart Hero: Love Run</h2>
            <p className="mb-6">Use your special fart powers to navigate levels, avoid obstacles, collect coins, and reach the goal!</p>
            
            <div className="text-left mb-6 space-y-2">
              <p className="font-medium">How to play:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>On Desktop: Press SPACE to fart (hold for more power)</li>
                <li>On Mobile: Tap screen to fart (hold for more power)</li>
                <li>Collect coins for points</li>
                <li>Avoid obstacles like spikes and pits</li>
                <li>Complete all obstacles to advance to next level</li>
              </ul>
            </div>
            
            <Button 
              onClick={() => setIsPlaying(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-200"
            >
              Start Playing
            </Button>
          </div>
        ) : gameOver ? (
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-xl max-w-md w-full text-center">
            <h2 className="text-3xl font-bold mb-4">Game Over</h2>
            <p className="text-xl mb-2">Your Score: <span className="font-bold">{score}</span></p>
            <p className="text-lg mb-6">High Score: <span className="font-bold">{highScore}</span></p>
            
            <div className="space-x-4">
              <Button 
                onClick={handleRestart}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-2 px-4 rounded-full shadow"
              >
                <RefreshCw size={18} className="mr-2" /> Play Again
              </Button>
              <Button 
                onClick={() => navigate('/games')}
                variant="outline"
                className="border-2 border-gray-400"
              >
                Back to Games
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-4xl">
            <canvas 
              ref={canvasRef} 
              className="mx-auto border-4 border-black/20 rounded-lg shadow-2xl bg-white"
              style={{
                width: '100%',
                maxWidth: '800px',
                height: '400px',
                touchAction: 'none'
              }}
            />
            <div className="mt-4 text-center">
              <p className="text-sm text-white bg-black/30 p-2 rounded inline-block">
                {window.innerWidth > 768 ? 'Press and hold SPACE to fart jump!' : 'Tap and hold screen to fart jump!'}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default FartHeroLoveRun;
