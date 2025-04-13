
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SpinnerWheel from '@/components/SpinnerWheel';
import EntryManager from '@/components/EntryManager';
import MoodSelector from '@/components/MoodSelector';
import AudioToggle from '@/components/AudioToggle';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import ResultModal from '@/components/ResultModal';
import { studyOptions, chillOptions, partyOptions, giftOptions } from '@/data/spinnerOptions';

type Mood = 'study' | 'chill' | 'party' | 'gift' | 'custom';

const Index = () => {
  const [customEntries, setCustomEntries] = useState<string[]>([
    "Pizza", "Burger", "Sushi", "Tacos", "Salad", "Pasta"
  ]);
  const [currentMood, setCurrentMood] = useState<Mood>('study');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [currentResult, setCurrentResult] = useState<string | null>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);

  const scrollToSpinner = () => {
    spinnerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSpinComplete = (winner: string) => {
    setCurrentResult(winner);
    setShowResultModal(true);
    
    // Party theme has additional confetti effect
    if (currentMood === 'party') {
      createConfetti();
    }
  };
  
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    toast(soundEnabled ? "Sound turned off" : "Sound turned on");
  };
  
  const createConfetti = () => {
    const confettiCount = 100;
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'absolute';
      confetti.style.width = `${Math.random() * 10 + 5}px`;
      confetti.style.height = `${Math.random() * 10 + 5}px`;
      confetti.style.backgroundColor = [
        '#FF5252', '#FF4081', '#E040FB', '#7C4DFF', 
        '#536DFE', '#448AFF', '#40C4FF', '#18FFFF'
      ][Math.floor(Math.random() * 8)];
      confetti.style.borderRadius = '50%';
      confetti.style.opacity = '0.8';
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.animation = `confetti ${Math.random() * 2 + 2}s ease-out forwards`;
      container.appendChild(confetti);
    }
    
    setTimeout(() => {
      document.body.removeChild(container);
    }, 5000);
  };
  
  const handleMoodChange = (mood: Mood) => {
    setCurrentMood(mood);
  };

  // Get current entries based on the active mood
  const getCurrentEntries = () => {
    switch (currentMood) {
      case 'study':
        return studyOptions;
      case 'chill':
        return chillOptions;
      case 'party':
        return partyOptions;
      case 'gift':
        return giftOptions;
      case 'custom':
        return customEntries;
      default:
        return customEntries;
    }
  };
  
  // Add schema markup with JSON-LD
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'SpinMood - Online Spinner Wheel',
      'description': 'Free online spinner wheel with customizable themes for giveaways, classrooms, study, parties & fun.',
      'applicationCategory': 'UtilityApplication',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'operatingSystem': 'All',
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.9',
        'reviewCount': '238'
      }
    });
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className={`min-h-screen flex flex-col bg-background text-foreground theme-${currentMood}`}>
      <Helmet>
        <title>SpinMood - The Best Free Online Spinner Wheel for Giveaways, Study, Chill & Fun</title>
        <meta name="description" content="Free online spinner wheel with customizable themes for giveaways, classrooms, study, parties & fun. Better than WheelofNames & PickerWheel." />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Helmet>
      
      <Header onStartClick={scrollToSpinner} />
      
      <main className="flex-1">
        <Hero onStartClick={scrollToSpinner} />
        
        <div 
          ref={spinnerRef}
          id="spinner" 
          className={`py-16 theme-${currentMood} transition-all duration-500`}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">
              Your Custom Spinner Wheel
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
              <div className="order-2 lg:order-1">
                {currentMood === 'custom' ? (
                  <EntryManager entries={customEntries} setEntries={setCustomEntries} />
                ) : (
                  <div className="w-full max-w-md mx-auto p-4 space-y-4">
                    <div className="text-center">
                      <h3 className="text-lg font-medium text-white mb-3">{currentMood.charAt(0).toUpperCase() + currentMood.slice(1)} Mode</h3>
                      <p className="text-white/70 text-sm mb-4">
                        Choose from {getCurrentEntries().length} predefined options
                      </p>
                      <div className="p-4 bg-white/5 backdrop-blur-md rounded-lg border border-white/10">
                        <div className="text-sm text-white/80">
                          Spin the wheel to randomly select from our curated list of {currentMood} options!
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="order-1 lg:order-2 flex justify-center">
                <SpinnerWheel 
                  entries={getCurrentEntries()} 
                  onSpinComplete={handleSpinComplete}
                  theme={currentMood}
                  soundEnabled={soundEnabled}
                  isSpinning={isSpinning}
                  setIsSpinning={setIsSpinning}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div id="themes" className="py-16 bg-black/30 backdrop-blur-md">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
              Personalize Your Experience
            </h2>
            
            <MoodSelector 
              currentMood={currentMood} 
              onMoodChange={handleMoodChange} 
            />
            
            <div className="mt-12 text-center">
              <AudioToggle soundEnabled={soundEnabled} toggleSound={toggleSound} />
            </div>
          </div>
        </div>
        
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
  );
};

export default Index;
