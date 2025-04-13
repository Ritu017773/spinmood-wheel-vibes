
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { FerrisWheel } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background particle-bg p-4">
      <div className="text-center max-w-md mx-auto">
        <FerrisWheel className="h-20 w-20 text-primary mx-auto animate-spin-slow" />
        
        <h1 className="text-4xl font-bold mt-6 text-white">Oops! You spun to the wrong place.</h1>
        
        <p className="text-xl text-white/70 mt-4 mb-8">
          This wheel landed on a page that doesn't exist.
        </p>
        
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
          <Link to="/">
            Spin Back Home
          </Link>
        </Button>
        
        <p className="mt-8 text-sm text-white/40">
          Path: {location.pathname} not found
        </p>
      </div>
    </div>
  );
};

export default NotFound;
