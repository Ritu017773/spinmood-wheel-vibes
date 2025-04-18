
import React from 'react';
import { 
  Sparkles, Brain, Gamepad2, Wrench, Heart, Zap, Puzzle, Eye, Clock, 
  PaintBucket, Timer, Dices, PenTool, MessagesSquare, MousePointer, Wand2, 
  Lock, FileCode, Brush, Bolt, Bomb, Layers, Workflow, Asterisk 
} from 'lucide-react';

// Game categories with descriptions and icons
export const gameCategories = [
  {
    name: 'Decision Tools',
    description: 'Helpful tools for making choices, solving puzzles, and generating ideas with an element of chance.',
    icon: <Sparkles size={16} className="text-amber-400" />,
    games: [
      { 
        name: 'Lucky Line', 
        description: 'Draw paths through randomized mazes to reach goals',
        icon: <PenTool size={16} />,
        url: '/games/lucky-line'
      },
      { 
        name: 'Word Chain Reaction', 
        description: 'Link words by meaning or sound to create endless chains',
        icon: <MessagesSquare size={16} />,
        url: '/games/word-chain-reaction'
      },
      { 
        name: 'Infinite Craft', 
        description: 'Combine elements to discover new ones with endless combinations',
        icon: <Layers size={16} />,
        url: '/games/infinite-craft'
      },
      { 
        name: 'The Password Game', 
        description: 'Create passwords meeting progressively absurd rules',
        icon: <Lock size={16} />,
        url: '/games/the-password-game'
      },
      { 
        name: 'Build Your Bliss Machine', 
        description: 'Design mood-enhancing machines with various components',
        icon: <Workflow size={16} />,
        url: '/games/build-your-bliss-machine'
      }
    ]
  },
  {
    name: 'Brain Games',
    description: 'Mental challenges for memory, reactions, and cognitive skills.',
    icon: <Brain size={16} className="text-blue-400" />,
    games: [
      { 
        name: 'How Perfect You Are', 
        description: 'Match complex patterns with perfect precision',
        icon: <Asterisk size={16} />,
        url: '/games/how-perfect-you-are'
      },
      { 
        name: 'Blink & Miss', 
        description: 'Spot subtle differences between rapidly changing images',
        icon: <Eye size={16} />,
        url: '/games/blink-and-miss'
      },
      { 
        name: "Don't Blink: Speed Trap", 
        description: 'Navigate motion-sensitive traps with strategic pauses',
        icon: <MousePointer size={16} />,
        url: '/games/dont-blink-speed-trap'
      },
      { 
        name: 'Color Cascade', 
        description: 'Match falling colored blocks to clear lines and score points',
        icon: <Bomb size={16} />,
        url: '/games/color-cascade'
      },
      { 
        name: 'Emoji Evolution', 
        description: 'Merge emoji pairs to create surprising new combinations',
        icon: <Wand2 size={16} />,
        url: '/games/emoji-evolution'
      },
      { 
        name: 'Pixel Painter', 
        description: 'Create pixel art on a grid with various tools',
        icon: <Brush size={16} />,
        url: '/games/pixel-painter'
      },
      { 
        name: 'Reaction Race', 
        description: 'Respond to random prompts as quickly as possible',
        icon: <Bolt size={16} />,
        url: '/games/reaction-race'
      },
      { 
        name: 'Pattern Pop', 
        description: 'Memorize and replicate number sequences under time pressure',
        icon: <FileCode size={16} />,
        url: '/games/pattern-pop'
      }
    ]
  },
  {
    name: 'Arcade Games',
    description: 'Fast-paced, action-packed entertainment for quick fun.',
    icon: <Gamepad2 size={16} className="text-red-400" />,
    games: [
      { 
        name: 'Fart Hero: Love Run', 
        description: 'Control a hero propelled by farts to navigate levels',
        icon: <Heart size={16} />,
        url: '/games/fart-hero-love-run'
      }
    ]
  },
  {
    name: 'Creative Tools',
    description: 'Express yourself with art, music, and writing experiences.',
    icon: <Wrench size={16} className="text-purple-400" />,
    games: []
  }
];
