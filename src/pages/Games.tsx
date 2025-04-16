
import React from 'react';
import { Helmet } from 'react-helmet';
import Providers from '@/components/Providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GameGrid from '@/components/GameGrid';
import SchemaData from '@/components/SchemaData';
import { Link } from 'react-router-dom';

const Games = () => {
  return (
    <Providers>
      <div className="min-h-screen flex flex-col text-foreground">
        <Helmet>
          <title>SpinMood Games | Fun & Addictive Online Web Games</title>
          <meta 
            name="description" 
            content="Explore unique and engaging web games on SpinMood! From quick reaction tests to creative challenges. Play free online games now." 
          />
          <meta name="keywords" content="free online games, interactive web games, mood spinner game, memory mirage game, vibe architect, echo choice game, color cascade game, mind loop game, whisper clicker game, fun decision tools, pixel painter, reaction race, pattern pop, lucky line, word chain reaction, infinite craft, password game" />
          <link rel="canonical" href="https://spinmood.com/games" />
        </Helmet>
        
        <SchemaData />
        <Header onStartClick={() => {}} />
        
        <main className="flex-1 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 text-center">
              <Link to="/" className="inline-flex items-center text-primary hover:underline mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Home
              </Link>
              
              <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-6" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                SpinMood Games
              </h1>
              <p className="text-xl md:text-2xl text-white font-bold max-w-3xl mx-auto" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>
                Explore our collection of interactive games and tools designed for entertainment, decision-making, and creative fun!
              </p>
            </div>
            
            <GameGrid />
          </div>
        </main>
        
        <Footer />
      </div>
    </Providers>
  );
};

export default Games;
