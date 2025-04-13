
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SpinnerWheel from '@/components/SpinnerWheel';
import EntryManager from '@/components/EntryManager';
import ThemeSelector from '@/components/ThemeSelector';
import AudioToggle from '@/components/AudioToggle';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

type Theme = 'study' | 'chill' | 'party' | 'gift';

const Index = () => {
  const [entries, setEntries] = useState<string[]>([
    "Pizza", "Burger", "Sushi", "Tacos", "Salad", "Pasta"
  ]);
  const [currentTheme, setCurrentTheme] = useState<Theme>('study');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const spinnerRef = useRef<HTMLDivElement>(null);

  const scrollToSpinner = () => {
    spinnerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSpinComplete = (winner: string) => {
    toast.success(`The winner is: ${winner}!`, {
      duration: 5000,
    });
    
    // Show confetti for party theme
    if (currentTheme === 'party') {
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
    <div className={`min-h-screen flex flex-col bg-background text-foreground theme-${currentTheme}`}>
      <Header onStartClick={scrollToSpinner} />
      
      <main className="flex-1">
        <Hero onStartClick={scrollToSpinner} />
        
        <div 
          ref={spinnerRef}
          id="spinner" 
          className={`py-16 theme-${currentTheme} transition-all duration-500`}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">
              Your Custom Spinner Wheel
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
              <div className="order-2 lg:order-1">
                <EntryManager entries={entries} setEntries={setEntries} />
              </div>
              <div className="order-1 lg:order-2 flex justify-center">
                <SpinnerWheel 
                  entries={entries} 
                  onSpinComplete={handleSpinComplete}
                  theme={currentTheme}
                  soundEnabled={soundEnabled}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div id="themes" className="py-16 bg-black/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
              Personalize Your Experience
            </h2>
            
            <ThemeSelector 
              currentTheme={currentTheme} 
              onThemeChange={setCurrentTheme} 
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
    </div>
  );
};

export default Index;
