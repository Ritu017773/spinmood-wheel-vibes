
import React from 'react';
import { Helmet } from 'react-helmet';
import Providers from '@/components/Providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const TermsConditions = () => {
  return (
    <Providers>
      <div className="min-h-screen flex flex-col text-foreground">
        <Helmet>
          <title>Terms & Conditions | SpinMood - Website Usage Rules</title>
          <meta name="description" content="Review the Terms and Conditions for using the SpinMood website, including our free spinner wheel and online games." />
          <meta name="keywords" content="SpinMood terms, spinner wheel terms of use, online wheel conditions, free web games terms, random picker usage rules" />
          <link rel="canonical" href="https://spinmood.com/terms-conditions" />
          <script type="application/ld+json">
            {`
              {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "SpinMood Terms & Conditions",
                "description": "Terms and Conditions for SpinMood - The Best Free Online Spinner Wheel & Games.",
                "url": "https://spinmood.com/terms-conditions",
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
        
        <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-primary hover:underline mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-center mb-8">Terms & Conditions</h1>
          </div>
          
          <div className="prose prose-lg max-w-none text-foreground">
            <p className="text-lg font-medium">Last Updated: April 14, 2025</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-lg font-medium">By accessing or using SpinMood, including our spinner wheel and all interactive games, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">2. Use License</h2>
            <p className="text-lg font-medium">Permission is granted to temporarily use SpinMood's spinner wheel and games for personal, non-commercial, educational, or entertainment purposes. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul className="list-disc pl-8 mt-4 mb-6 font-medium text-lg">
              <li>Modify or copy the materials beyond what's necessary for normal website use</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software contained on SpinMood</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
            <p className="text-lg font-medium">This license shall automatically terminate if you violate any of these restrictions and may be terminated by SpinMood at any time.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">3. Disclaimer</h2>
            <p className="text-lg font-medium">The materials on SpinMood, including the spinner wheel and all games, are provided on an 'as is' basis. SpinMood makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            <p className="text-lg font-medium">Further, SpinMood does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">4. Limitations</h2>
            <p className="text-lg font-medium">In no event shall SpinMood or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on SpinMood, even if SpinMood or a SpinMood authorized representative has been notified orally or in writing of the possibility of such damage.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">5. Accuracy of Materials</h2>
            <p className="text-lg font-medium">The materials appearing on SpinMood, including descriptions of our spinner wheel functionality and games, could include technical, typographical, or photographic errors. SpinMood does not warrant that any of the materials on its website are accurate, complete or current. SpinMood may make changes to the materials contained on its website at any time without notice.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">6. Links</h2>
            <p className="text-lg font-medium">SpinMood has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by SpinMood of the site. Use of any such linked website is at the user's own risk.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">7. Modifications</h2>
            <p className="text-lg font-medium">SpinMood may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">8. Game Content</h2>
            <p className="text-lg font-medium">SpinMood provides various interactive games and tools for entertainment and educational purposes. All game content remains the intellectual property of SpinMood. Users are granted permission to play and interact with these games but not to reproduce, distribute, or create derivative works based on them.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">9. Governing Law</h2>
            <p className="text-lg font-medium">These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">10. Contact Us</h2>
            <p className="text-lg font-medium">If you have any questions about these Terms & Conditions, please contact us at terms@spinmood.com.</p>
            
            <div className="mt-12 text-center">
              <Link to="/">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-bold">
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

export default TermsConditions;
