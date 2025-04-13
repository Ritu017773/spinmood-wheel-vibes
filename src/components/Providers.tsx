
import React from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <TooltipProvider>
      {children}
    </TooltipProvider>
  );
};

export default Providers;
