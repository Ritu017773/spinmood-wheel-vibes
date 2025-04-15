import React from 'react';
import { Helmet } from 'react-helmet';
import Providers from '@/components/Providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import SchemaData from '@/components/SchemaData';
import { Mail, MailOpen } from 'lucide-react';

const Contact = () => {
  return (
    <Providers>
      <div className="min-h-screen flex flex-col text-foreground">
        <Helmet>
          <title>Contact SpinMood | Support for Our Free Spinner Wheel</title>
          <meta 
            name="description" 
            content="Get help with SpinMood. Contact our support team for questions, feedback, or issues regarding our free online spinner wheel at admin@spinmood.com." 
          />
          <meta name="keywords" content="contact SpinMood, SpinMood support, spinner wheel help, report issue SpinMood, online wheel support, free wheel spinner contact" />
          <link rel="canonical" href="https://spinmood.com/contact" />
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
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">Contact SpinMood</h1>
              <p className="text-xl text-white/90 font-semibold max-w-2xl mx-auto">We'd love to hear from you! Get support, share feedback, or report issues.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-xl">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                <div className="bg-primary/10 p-10 rounded-full">
                  <Mail size={80} className="text-primary animate-pulse-slow" />
                </div>
                
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold text-white mb-3">Email Us</h2>
                  <p className="text-lg text-white/80 font-medium mb-6">
                    For any questions, feedback, or technical support, please email us at:
                  </p>
                  <div className="inline-flex items-center justify-center bg-white/20 backdrop-blur rounded-lg px-5 py-4 text-xl font-bold text-white border-2 border-white/30">
                    <MailOpen className="mr-2" size={24} />
                    admin@spinmood.com
                  </div>
                  <p className="mt-6 text-white/70">
                    We strive to respond to all inquiries within 24-48 hours.
                  </p>
                </div>
              </div>
              
              <div className="mt-12 border-t border-white/10 pt-8">
                <h3 className="text-xl font-bold text-white mb-4">Common Inquiries</h3>
                <ul className="space-y-2 text-white/90 font-medium">
                  <li>• Technical issues with the spinner wheel</li>
                  <li>• Feature requests or suggestions</li>
                  <li>• General questions about using SpinMood</li>
                  <li>• Reporting bugs or unexpected behavior</li>
                  <li>• Partnership or collaboration opportunities</li>
                </ul>
              </div>
              
              <div className="mt-10 text-center">
                <Link to="/">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
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
