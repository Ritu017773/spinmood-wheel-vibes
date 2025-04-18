
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GameLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  soundEnabled?: boolean;
  toggleSound?: () => void;
  showSoundControl?: boolean;
}

const GameLayout: React.FC<GameLayoutProps> = ({
  children,
  title,
  description,
  soundEnabled = false,
  toggleSound = () => {},
  showSoundControl = true
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex flex-col">
      <Helmet>
        <title>{`${title} - SpinMood Games`}</title>
        <meta name="description" content={description} />
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
              aria-label="Back to Games"
            >
              <ArrowLeft size={24} />
            </Button>
          </div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          {showSoundControl && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSound}
              className="text-white"
              aria-label={soundEnabled ? "Mute" : "Unmute"}
            >
              {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </Button>
          )}
        </div>
      </header>
      
      <main className="flex-1 container mx-auto flex flex-col p-4">
        {children}
      </main>
    </div>
  );
};

export default GameLayout;
