import React from 'react';
import { 
  Palette, 
  SmilePlus, 
  Pencil, 
  Zap, 
  Grid, 
  LineChart, 
  Text,
  Factory,
  KeyRound,
  Sparkles, 
  Brain, 
  GitFork, 
  Infinity, 
  Volume2, 
  Music
} from 'lucide-react';

interface Game {
  id: string;
  name: string;
  url: string;
  shortDescription: string;
  description: string;
  gradientBg: string;
  icon: React.ReactNode;
  visualEffect: React.ReactNode;
  keywords: string[];
  category: string;
  imageUrl: string;
}

export const games: Game[] = [
  {
    id: 'mood-spinner',
    name: 'MOOD SPINNER',
    url: '/',
    shortDescription: 'Spin the wheel and let fate decide!',
    description: 'Spin the music wheel and discover tracks that match your feelings. Therapeutic and fun.',
    gradientBg: 'linear-gradient(135deg, #4b0082, #1e3c72, #2a0845)',
    icon: (
      <div className="w-full h-full rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm p-2 animate-pulse-slow">
        <Sparkles size={36} className="text-white" />
      </div>
    ),
    visualEffect: (
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="w-60 h-60 rounded-full border-8 border-white/30 animate-spin-slow"></div>
        <div className="absolute w-40 h-40 rounded-full border-4 border-white/20 animate-spin-slower"></div>
      </div>
    ),
    keywords: ['music mood spinner', 'random mood music game', 'spin to feel better'],
    category: 'Decision Tools',
    imageUrl: '/assets/mood-spinner-thumbnail.png'
  },
  {
    id: 'memory-mirage',
    name: 'MEMORY MIRAGE',
    url: '/games/memory-mirage',
    shortDescription: 'Test your memory with disappearing patterns',
    description: 'Challenge your memory skills as patterns appear and disappear. Remember and recreate what you saw before time runs out.',
    gradientBg: 'linear-gradient(135deg, #614385, #516395)',
    icon: (
      <div className="w-full h-full rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm p-2">
        <Brain size={36} className="text-white animate-pulse" />
      </div>
    ),
    visualEffect: (
      <div className="grid grid-cols-4 grid-rows-4 gap-2 opacity-20">
        {Array.from({length: 16}).map((_, i) => (
          <div key={i} className="w-full h-full rounded-md bg-white/30 animate-pulse-random"></div>
        ))}
      </div>
    ),
    keywords: ['memory challenge game', 'pattern memory test', 'brain training game'],
    category: 'Brain Games',
    imageUrl: '/assets/memory-mirage-thumbnail.png'
  },
  {
    id: 'vibe-architect',
    name: 'VIBE ARCHITECT',
    url: '/games/vibe-architect',
    shortDescription: 'Design your perfect ambience and sound',
    description: 'Create your ideal atmosphere by mixing ambient sounds, music, and visual elements for perfect focus or relaxation.',
    gradientBg: 'linear-gradient(135deg, #3a7bd5, #00d2ff)',
    icon: (
      <div className="w-full h-full rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm p-2">
        <Music size={36} className="text-white" />
      </div>
    ),
    visualEffect: (
      <div className="absolute inset-0 flex flex-wrap gap-2 p-4">
        {Array.from({length: 10}).map((_, i) => (
          <div 
            key={i} 
            className="h-2 rounded-full bg-white/40"
            style={{ 
              width: `${20 + Math.random() * 60}%`,
              animationDelay: `${i * 0.2}s`,
              animation: 'soundwave 2s ease-in-out infinite'
            }}
          ></div>
        ))}
      </div>
    ),
    keywords: ['ambient sound mixer', 'create atmosphere online', 'relaxation sound designer'],
    category: 'Creative Tools',
    imageUrl: '/assets/vibe-architect-thumbnail.png'
  },
  {
    id: 'echo-choice',
    name: 'ECHO CHOICE',
    url: '/games/echo-choice',
    shortDescription: 'Make decisions with visual feedback loops',
    description: 'Visualize your decision-making process with this innovative tool that gives you clear visual feedback on every choice.',
    gradientBg: 'linear-gradient(135deg, #ff057c, #8d0b93, #321575)',
    icon: (
      <div className="w-full h-full rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm p-2">
        <GitFork size={36} className="text-white" />
      </div>
    ),
    visualEffect: (
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full bg-pink-500/10 animate-ping-slow"></div>
        <div className="absolute bottom-1/4 right-1/3 w-20 h-20 rounded-full bg-purple-500/20 animate-ping-slower"></div>
      </div>
    ),
    keywords: ['decision making tool', 'visual choice maker', 'decision feedback tool'],
    category: 'Decision Tools',
    imageUrl: '/assets/echo-choice-thumbnail.png'
  },
  {
    id: 'color-cascade',
    name: 'COLOR CASCADE',
    url: '/games/color-cascade',
    shortDescription: 'Match falling colors in this addictive game',
    description: 'Test your reflexes by matching cascading color blocks. How many can you catch?',
    gradientBg: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
    icon: (
      <div className="w-full h-full rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm p-2">
        <Palette size={36} className="text-white" />
      </div>
    ),
    visualEffect: (
      <div className="absolute inset-0">
        {Array.from({length: 15}).map((_, i) => (
          <div 
            key={i}
            className="absolute w-6 h-6 rounded-md"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: `hsl(${Math.random() * 360}, 80%, 60%)`,
              animation: `fall ${3 + Math.random() * 3}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
    ),
    keywords: ['color matching game', 'falling blocks game', 'reflex testing game'],
    category: 'Arcade Games',
    imageUrl: '/assets/color-cascade-thumbnail.png'
  },
  {
    id: 'emoji-evolution',
    name: 'EMOJI EVOLUTION',
    url: '/games/emoji-evolution',
    shortDescription: 'Merge emojis to discover new ones',
    description: 'Combine different emojis to evolve and discover new, unexpected combinations!',
    gradientBg: 'linear-gradient(135deg, #FFD93D, #FF6B6B)',
    icon: (
      <div className="w-full h-full rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm p-2">
        <SmilePlus size={36} className="text-white" />
      </div>
    ),
    visualEffect: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-4 opacity-30">
          {['😊', '🌟', '🎨', '🎮'].map((emoji, i) => (
            <div key={i} className="text-4xl animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>
              {emoji}
            </div>
          ))}
        </div>
      </div>
    ),
    keywords: ['emoji game', 'merge emojis', 'evolution game'],
    category: 'Puzzle Games',
    imageUrl: '/assets/emoji-evolution-thumbnail.png'
  },
  {
    id: 'pixel-painter',
    name: 'PIXEL PAINTER',
    url: '/games/pixel-painter',
    shortDescription: 'Create pixel art masterpieces',
    description: 'Paint and design with pixels. Create retro-style artwork one block at a time.',
    gradientBg: 'linear-gradient(135deg, #A8E6CF, #3498DB)',
    icon: (
      <div className="w-full h-full rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm p-2">
        <Pencil size={36} className="text-white" />
      </div>
    ),
    visualEffect: (
      <div className="absolute inset-0">
        <div className="grid grid-cols-8 grid-rows-8 gap-1 p-4 opacity-20">
          {Array.from({length: 64}).map((_, i) => (
            <div 
              key={i}
              className="aspect-square rounded-sm"
              style={{
                backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
                animation: `pulse ${1 + Math.random()}s ease-in-out infinite`
              }}
            ></div>
          ))}
        </div>
      </div>
    ),
    keywords: ['pixel art', 'digital painting', 'creative game'],
    category: 'Creative Tools',
    imageUrl: '/assets/pixel-painter-thumbnail.png'
  },
  {
    id: 'reaction-race',
    name: 'REACTION RACE',
    url: '/games/reaction-race',
    shortDescription: 'Test your reflexes against time',
    description: 'Challenge your reaction speed with this fast-paced timing game.',
    gradientBg: 'linear-gradient(135deg, #FF4E50, #F9D423)',
    icon: (
      <div className="w-full h-full rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm p-2">
        <Zap size={36} className="text-white" />
      </div>
    ),
    visualEffect: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 rounded-full border-4 border-white/20 animate-ping"></div>
        <div className="absolute w-16 h-16 rounded-full bg-white/10 animate-pulse"></div>
      </div>
    ),
    keywords: ['reaction game', 'speed test', 'reflex challenge'],
    category: 'Arcade Games',
    imageUrl: '/assets/reaction-race-thumbnail.png'
  },
  {
    id: 'pattern-pop',
    name: 'PATTERN POP',
    url: '/games/pattern-pop',
    shortDescription: 'Remember and recreate patterns',
    description: 'Test your memory by recreating increasingly complex patterns.',
    gradientBg: 'linear-gradient(135deg, #6C5CE7, #a8c0ff)',
    icon: (
      <div className="w-full h-full rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm p-2">
        <Grid size={36} className="text-white" />
      </div>
    ),
    visualEffect: (
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-2 p-4">
        {Array.from({length: 9}).map((_, i) => (
          <div 
            key={i}
            className="rounded-lg bg-white/20"
            style={{
              animation: `pulse ${1 + Math.random()}s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`
            }}
          ></div>
        ))}
      </div>
    ),
    keywords: ['pattern memory', 'sequence game', 'brain training'],
    category: 'Brain Games',
    imageUrl: '/assets/pattern-pop-thumbnail.png'
  },
  {
    id: 'lucky-line',
    name: 'LUCKY LINE',
    url: '/games/lucky-line',
    shortDescription: 'Draw your path to victory',
    description: 'Create the perfect line to connect points and solve puzzles.',
    gradientBg: 'linear-gradient(135deg, #00B4DB, #0083B0)',
    icon: (
      <div className="w-full h-full rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm p-2">
        <LineChart size={36} className="text-white" />
      </div>
    ),
    visualEffect: (
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-20">
          <path
            d="M10,50 Q50,10 90,50 T170,50"
            fill="none"
            stroke="white"
            strokeWidth="4"
            className="animate-draw"
          />
        </svg>
      </div>
    ),
    keywords: ['line drawing game', 'puzzle solver', 'path finding'],
    category: 'Puzzle Games',
    imageUrl: '/assets/lucky-line-thumbnail.png'
  },
  {
    id: 'word-chain',
    name: 'WORD CHAIN REACTION',
    url: '/games/word-chain',
    shortDescription: 'Connect words in endless chains',
    description: 'Create chains of related words. How long can you keep the sequence going?',
    gradientBg: 'linear-gradient(135deg, #FF9A9E, #FAD0C4)',
    icon: (
      <div className="w-full h-full rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm p-2">
        <Text size={36} className="text-white" />
      </div>
    ),
    visualEffect: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="space-y-2 opacity-20">
          {['WORD', 'PLAY', 'GAME', 'FUN'].map((word, i) => (
            <div 
              key={i} 
              className="text-white text-xl font-bold"
              style={{
                animation: `fade-slide ${1 + i * 0.2}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`
              }}
            >
              {word}
            </div>
          ))}
        </div>
      </div>
    ),
    keywords: ['word game', 'vocabulary builder', 'chain reaction'],
    category: 'Word Games',
    imageUrl: '/assets/word-chain-thumbnail.png'
  },
  {
    id: 'infinite-craft',
    name: 'INFINITE CRAFT',
    url: '/games/infinite-craft',
    shortDescription: 'Combine elements, discover everything',
    description: 'Mix and match basic elements to discover new combinations in this endless crafting game.',
    gradientBg: 'linear-gradient(135deg, #4CAF50, #2196F3)',
    icon: (
      <div className="w-full h-full rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm p-2">
        <Factory size={36} className="text-white" />
      </div>
    ),
    visualEffect: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-4 opacity-30">
          {['🌍', '💧', '🔥', '🌱'].map((element, i) => (
            <div 
              key={i} 
              className="text-4xl"
              style={{
                animation: `float ${2 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`
              }}
            >
              {element}
            </div>
          ))}
        </div>
      </div>
    ),
    keywords: ['crafting game', 'element combinations', 'discovery game'],
    category: 'Puzzle Games',
    imageUrl: '/assets/infinite-craft-thumbnail.png'
  },
  {
    id: 'password-game',
    name: 'THE PASSWORD GAME',
    url: '/games/password-game',
    shortDescription: 'Create the ultimate secure password',
    description: 'Follow increasingly absurd rules to create the perfect password in this hilarious challenge.',
    gradientBg: 'linear-gradient(135deg, #FF416C, #FF4B2B)',
    icon: (
      <div className="w-full h-full rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm p-2">
        <KeyRound size={36} className="text-white" />
      </div>
    ),
    visualEffect: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="space-y-2 opacity-20">
          {['*****', '!@#$%', '12345', '🔒'].map((text, i) => (
            <div 
              key={i} 
              className="text-white font-mono text-xl"
              style={{
                animation: `typewriter ${1.5 + i * 0.3}s ease infinite`,
                animationDelay: `${i * 0.2}s`
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>
    ),
    keywords: ['password challenge', 'security game', 'puzzle game'],
    category: 'Puzzle Games',
    imageUrl: '/assets/password-game-thumbnail.png'
  }
];

// Group games by category for the footer
export const gameCategories = [
  {
    name: 'Decision Tools',
    games: games.filter(game => game.category === 'Decision Tools')
  },
  {
    name: 'Brain Games',
    games: games.filter(game => game.category === 'Brain Games')
  },
  {
    name: 'Arcade Games',
    games: games.filter(game => game.category === 'Arcade Games')
  },
  {
    name: 'Creative Tools',
    games: games.filter(game => game.category === 'Creative Tools')
  },
  {
    name: 'Audio Games',
    games: games.filter(game => game.category === 'Audio Games')
  }
];
