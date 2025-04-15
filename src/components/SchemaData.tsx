
import React, { useEffect } from 'react';

const SchemaData: React.FC = () => {
  useEffect(() => {
    // WebApp Schema
    const webAppSchema = document.createElement('script');
    webAppSchema.type = 'application/ld+json';
    webAppSchema.innerHTML = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'SpinMood - Free Online Spinner Wheel',
      'description': 'The ultimate free online spinner wheel for giveaways, decisions, study, parties, and fun activities. Highly customizable and easy to use.',
      'applicationCategory': 'UtilityApplication',
      'operatingSystem': 'All',
      'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
      'url': window.location.origin,
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.9',
        'reviewCount': '238'
      }
    });
    document.head.appendChild(webAppSchema);
    
    // FAQ Schema - only on homepage
    if (window.location.pathname === '/') {
      const faqSchema = document.createElement('script');
      faqSchema.type = 'application/ld+json';
      faqSchema.innerHTML = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'How does SpinMood\'s wheel spinner work?',
            'acceptedAnswer': { 
              '@type': 'Answer', 
              'text': 'SpinMood uses a mathematically fair random algorithm to determine the winner. Simply add your entries, customize your wheel theme, and click spin. The wheel will randomly select one entry when it stops spinning.' 
            }
          },
          {
            '@type': 'Question',
            'name': 'Is SpinMood free to use?',
            'acceptedAnswer': { 
              '@type': 'Answer', 
              'text': 'Yes! SpinMood is completely free with no limitations. You can use it for classrooms, giveaways, decision-making, or just for fun without any cost.' 
            }
          },
          {
            '@type': 'Question',
            'name': 'How is SpinMood better than WheelofNames or PickerWheel?',
            'acceptedAnswer': { 
              '@type': 'Answer', 
              'text': 'SpinMood offers mood-based themes with matching animations and sound effects, is more visually premium, loads faster, and is optimized for all devices. Our spinner is designed to be the most user-friendly wheel spinner available online.' 
            }
          },
          {
            '@type': 'Question',
            'name': 'Can I use SpinMood for Instagram giveaways?',
            'acceptedAnswer': { 
              '@type': 'Answer', 
              'text': 'Absolutely! SpinMood is perfect for social media giveaways. Just add your participant names or entries, choose the Party theme for added excitement, and spin to select a winner fairly and dramatically.' 
            }
          },
          {
            '@type': 'Question',
            'name': 'Can I customize the spinner wheel?',
            'acceptedAnswer': { 
              '@type': 'Answer', 
              'text': 'Yes! You can add any text entries you want, choose from our four mood themes (Study, Chill, Party, Gift), and toggle sound effects on or off to match your preferences or environment.' 
            }
          }
        ]
      });
      document.head.appendChild(faqSchema);
    }
    
    // Website Schema
    const websiteSchema = document.createElement('script');
    websiteSchema.type = 'application/ld+json';
    websiteSchema.innerHTML = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'SpinMood',
      'url': window.location.origin,
      'description': 'The best free online spinner wheel for giveaways, classrooms, study, parties & fun.',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': `${window.location.origin}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    });
    document.head.appendChild(websiteSchema);
    
    return () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        document.head.removeChild(script);
      });
    };
  }, []);

  return null;
};

export default SchemaData;
