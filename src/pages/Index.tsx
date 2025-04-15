
import React, { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Providers from '@/components/Providers';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import ResultModal from '@/components/ResultModal';
import SchemaData from '@/components/SchemaData';
import SpinnerSection from '@/components/SpinnerSection';
import PersonalizationSection from '@/components/PersonalizationSection';
import { useSpinnerState } from '@/hooks/useSpinnerState';

const Index = () => {
  const {
    customEntries,
    setCustomEntries,
    currentMood,
    setCurrentMood,
    soundEnabled,
    toggleSound,
    isSpinning,
    setIsSpinning,
    showResultModal,
    setShowResultModal,
    currentResult,
    handleSpinComplete
  } = useSpinnerState();

  const spinnerRef = useRef<HTMLDivElement>(null);

  const scrollToSpinner = () => {
    spinnerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Apply theme class to document body
  useEffect(() => {
    document.body.className = `theme-${currentMood}`;
    
    return () => {
      document.body.className = '';
    };
  }, [currentMood]);

  // Enhanced setCurrentMood function to scroll to spinner when mood changes
  const handleMoodChange = (mood: 'study' | 'chill' | 'party' | 'gift' | 'custom') => {
    setCurrentMood(mood);
    // Scroll to spinner after a brief delay to allow theme change to apply
    setTimeout(() => {
      scrollToSpinner();
    }, 100);
  };

  return (
    <Providers>
      <div className="min-h-screen flex flex-col text-foreground">
        <Helmet>
          <title>SpinMood - The Best Free Online Spinner Wheel for Giveaways, Study, Chill & Fun</title>
          <meta name="description" content="Free online spinner wheel with customizable themes for giveaways, classrooms, study, parties & fun. Better than WheelofNames & PickerWheel." />
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        </Helmet>
        
        <SchemaData />
        <Header onStartClick={scrollToSpinner} />
        
        <main className="flex-1">
          <Hero onStartClick={scrollToSpinner} />
          
          <div ref={spinnerRef}>
            <SpinnerSection 
              customEntries={customEntries}
              setCustomEntries={setCustomEntries}
              currentMood={currentMood}
              soundEnabled={soundEnabled}
              isSpinning={isSpinning}
              setIsSpinning={setIsSpinning}
              onSpinComplete={handleSpinComplete}
            />
          </div>
          
          <PersonalizationSection 
            currentMood={currentMood}
            onMoodChange={handleMoodChange}
            soundEnabled={soundEnabled}
            toggleSound={toggleSound}
          />
          
          <div id="faq" className="py-16">
            <div className="container mx-auto">
              <FAQSection />
            </div>
          </div>
        </main>
        
        <Footer />
        
        <ResultModal 
          isOpen={showResultModal}
          onClose={() => setShowResultModal(false)}
          result={currentResult}
          theme={currentMood}
        />
      </div>
    </Providers>
  );
};

export default Index;
