
import React from 'react';
import { 
  Sparkles, 
  Brain, 
  Palette, 
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
    shortDescription: 'Match falling color blocks in this addictive game',
    description: 'Test your reflexes and color-matching skills in this fast-paced game where you match cascading color blocks against the clock.',
    gradientBg: 'linear-gradient(135deg, #ff9966, #ff5e62, #ff5e62, #ff9966)',
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
    id: 'mind-loop',
    name: 'MIND LOOP',
    url: '/games/mind-loop',
    shortDescription: 'Follow the pattern loop for as long as you can',
    description: 'Test your focus and pattern recognition by following an ever-growing sequence of loops. How long can you maintain the pattern?',
    gradientBg: 'linear-gradient(135deg, #000000, #141e30, #243b55)',
    icon: (
      <div className="w-full h-full rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm p-2">
        <Infinity size={36} className="text-white animate-pulse-slow" />
      </div>
    ),
    visualEffect: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-40 h-40 border-4 border-t-0 border-l-0 border-blue-500/40 rounded-full animate-spin-slower"></div>
        <div className="absolute w-20 h-20 border-4 border-r-0 border-b-0 border-blue-300/40 rounded-full animate-spin"></div>
      </div>
    ),
    keywords: ['pattern memory challenge', 'sequence following game', 'focus training'],
    category: 'Brain Games',
    imageUrl: '/assets/mind-loop-thumbnail.png'
  },
  {
    id: 'whisper-clicker',
    name: 'WHISPER CLICKER',
    url: '/games/whisper-clicker',
    shortDescription: 'Find the hidden sounds in this audio puzzle',
    description: 'Explore a minimalist soundscape where you must locate and click on subtle audio cues. A uniquely calming yet challenging experience.',
    gradientBg: 'linear-gradient(135deg, #f6eee3, #d2c6b5, #aaa296)',
    icon: (
      <div className="w-full h-full rounded-full flex items-center justify-center bg-black/10 backdrop-blur-sm p-2">
        <Volume2 size={36} className="text-white/70" />
      </div>
    ),
    visualEffect: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-60 h-60 rounded-full bg-white/5 animate-pulse-slow"></div>
        <div className="absolute w-40 h-40 rounded-full bg-white/5 animate-pulse"></div>
        <div className="absolute w-20 h-20 rounded-full bg-white/10"></div>
      </div>
    ),
    keywords: ['audio puzzle game', 'sound location game', 'minimalist game experience'],
    category: 'Audio Games',
    imageUrl: '/assets/whisper-clicker-thumbnail.png'
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
