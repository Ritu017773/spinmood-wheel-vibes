
import React from 'react';
import { Helmet } from 'react-helmet';
import Providers from '@/components/Providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <Providers>
      <div className="min-h-screen flex flex-col text-foreground">
        <Helmet>
          <title>Privacy Policy - SpinMood</title>
          <meta name="description" content="Privacy Policy for SpinMood - The Best Free Online Spinner Wheel." />
        </Helmet>
        
        <Header onStartClick={() => {}} />
        
        <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-primary hover:underline mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>
          </div>
          
          <div className="prose prose-lg max-w-none text-foreground">
            <p className="font-medium">Last Updated: April 14, 2025</p>
            
            <h2>Introduction</h2>
            <p>Welcome to SpinMood ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy informs you about how we handle your data when you visit our website and tells you about your privacy rights.</p>
            
            <h2>Information We Collect</h2>
            <p>SpinMood is designed to function without collecting personal data. When you use our spinner wheel:</p>
            <ul>
              <li>All content you enter (names, options, etc.) is processed and stored locally in your browser.</li>
              <li>We do not transmit your spinner wheel content to our servers.</li>
              <li>We do not require you to create an account or provide personal information to use our service.</li>
            </ul>
            
            <h2>Usage Data</h2>
            <p>We may collect anonymized usage data through standard analytics tools, including:</p>
            <ul>
              <li>Browser type and version</li>
              <li>Time spent on site</li>
              <li>Pages visited</li>
              <li>Referring website</li>
              <li>General geographic location (country level only)</li>
            </ul>
            <p>This data helps us improve our service but cannot be used to identify you personally.</p>
            
            <h2>Cookies</h2>
            <p>Our website uses essential cookies to ensure the proper functioning of the spinner wheel and to enhance your user experience. These cookies do not track you across websites and are deleted when you close your browser.</p>
            
            <h2>Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul>
              <li>Google Analytics to collect anonymized usage statistics</li>
              <li>Content Delivery Networks (CDNs) to serve our website efficiently</li>
            </ul>
            <p>These services have their own privacy policies that govern how they handle data.</p>
            
            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access any personal data we might have about you</li>
              <li>Request deletion of any personal data we might have about you</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            
            <h2>Children's Privacy</h2>
            <p>SpinMood is suitable for users of all ages and does not knowingly collect personal information from children under 13 years of age.</p>
            
            <h2>Changes to This Policy</h2>
            <p>We may update our Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date.</p>
            
            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at privacy@spinmood.com.</p>
            
            <div className="mt-12 text-center">
              <Link to="/">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Return to SpinMood
                </Button>
              </Link>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </Providers>
  );
};

export default PrivacyPolicy;
