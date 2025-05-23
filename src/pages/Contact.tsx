
import React from 'react';
import { Helmet } from 'react-helmet';
import Providers from '@/components/Providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

const Contact = () => {
  return (
    <Providers>
      <div className="min-h-screen flex flex-col text-foreground">
        <Helmet>
          <title>Contact SpinMood | Support for Our Free Spinner Wheel & Games</title>
          <meta 
            name="description" 
            content="Get help with SpinMood. Contact our support team for questions, feedback, or issues regarding our free online spinner wheel and games at admin@spinmood.com." 
          />
          <meta name="keywords" content="contact SpinMood, SpinMood support, spinner wheel help, report issue SpinMood, online wheel support, free wheel spinner contact, games support, free online games help" />
          <link rel="canonical" href="https://spinmood.com/contact" />
          <script type="application/ld+json">
            {`
              {
                "@context": "https://schema.org",
                "@type": "ContactPage",
                "name": "Contact SpinMood Support",
                "description": "Get support or provide feedback for the SpinMood free online spinner wheel and games.",
                "url": "https://spinmood.com/contact",
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": "https://spinmood.com/contact"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "SpinMood",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://spinmood.com/favicon.svg"
                  }
                }
              }
            `}
          </script>
        </Helmet>
        
        <Header onStartClick={() => {}} />
        
        <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Link to="/" className="inline-flex items-center text-primary hover:underline mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Home
            </Link>
            
            <div className="text-center mb-10">
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>Contact SpinMood</h1>
              <p className="text-xl text-white font-bold max-w-2xl mx-auto" style={{ textShadow: '0 1px 1px rgba(0,0,0,0.3)' }}>We'd love to hear from you! Get support, share feedback, or report issues for our spinner wheel and games.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-xl">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                <div className="bg-primary/10 p-10 rounded-full">
                  <Mail size={80} className="text-primary animate-pulse-slow" />
                </div>
                
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold text-white mb-3" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>Email Us</h2>
                  <p className="text-lg text-white font-bold mb-6" style={{ textShadow: '0 1px 1px rgba(0,0,0,0.3)' }}>
                    For any questions, feedback, or technical support regarding our spinner wheel or games, please email us at:
                  </p>
                  <div className="inline-flex items-center justify-center bg-white/20 backdrop-blur rounded-lg px-5 py-4 text-xl font-bold text-white border-2 border-white/30" style={{ textShadow: '0 1px 1px rgba(0,0,0,0.3)' }}>
                    <Mail className="mr-2" size={24} />
                    admin@spinmood.com
                  </div>
                  <p className="mt-6 text-white font-medium" style={{ textShadow: '0 1px 1px rgba(0,0,0,0.3)' }}>
                    We strive to respond to all inquiries within 24-48 hours.
                  </p>
                </div>
              </div>
              
              <div className="mt-12 border-t border-white/10 pt-8">
                <h3 className="text-xl font-bold text-white mb-4" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>Common Inquiries</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-white font-bold" style={{ textShadow: '0 1px 1px rgba(0,0,0,0.3)' }}>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span> 
                    Technical issues with the spinner wheel
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span> 
                    Game-related questions or feedback
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span> 
                    Feature requests or suggestions
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span> 
                    General questions about using SpinMood
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span> 
                    Reporting bugs or unexpected behavior
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span> 
                    Partnership or collaboration opportunities
                  </li>
                </ul>
              </div>
              
              <div className="mt-10 text-center">
                <Link to="/">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-bold">
                    Return to SpinMood
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </Providers>
  );
};

export default Contact;
