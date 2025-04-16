
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { games } from '@/data/games';

const SchemaData: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  useEffect(() => {
    // Remove any existing schema data
    const existingSchemas = document.querySelectorAll('script[type="application/ld+json"]');
    existingSchemas.forEach(script => {
      document.head.removeChild(script);
    });
    
    // WebApp Schema - for all pages
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
    
    // Website Schema - for all pages
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
    
    // Page-specific schema
    if (currentPath === '/') {
      // FAQ Schema - only on homepage
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
              'text': 'Yes! You can add any text entries you want (up to 40), choose from our four mood themes (Study, Chill, Party, Gift), and toggle sound effects on or off to match your preferences or environment.' 
            }
          },
          {
            '@type': 'Question',
            'name': 'How many names can I add to the spinner wheel?',
            'acceptedAnswer': { 
              '@type': 'Answer', 
              'text': 'SpinMood supports up to 40 custom names on your spinner wheel. Each name will be displayed clearly with its own unique color segment on the wheel.' 
            }
          },
          {
            '@type': 'Question',
            'name': 'Is SpinMood suitable for classroom use?',
            'acceptedAnswer': { 
              '@type': 'Answer', 
              'text': 'Absolutely! Many teachers use SpinMood for randomly selecting students, assigning tasks, creating engaging review games, or making classroom decisions more fun and fair.' 
            }
          },
          {
            '@type': 'Question',
            'name': 'How do I share my SpinMood wheel with others?',
            'acceptedAnswer': { 
              '@type': 'Answer', 
              'text': 'Currently, you can take a screenshot or screen recording of your wheel to share with others. We\'re working on adding direct sharing functionality in the future!' 
            }
          }
        ]
      });
      document.head.appendChild(faqSchema);
      
      // Tool Schema - only on homepage
      const toolSchema = document.createElement('script');
      toolSchema.type = 'application/ld+json';
      toolSchema.innerHTML = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'SpinMood Spinner Wheel',
        'applicationCategory': 'UtilitiesApplication',
        'operatingSystem': 'Web',
        'description': 'Free online spinner wheel for random selection, giveaways, decisions, and educational activities.',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.9',
          'ratingCount': '238',
          'bestRating': '5',
          'worstRating': '1'
        }
      });
      document.head.appendChild(toolSchema);
      
    } else if (currentPath === '/privacy-policy') {
      // Privacy Policy Schema
      const privacySchema = document.createElement('script');
      privacySchema.type = 'application/ld+json';
      privacySchema.innerHTML = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': 'SpinMood Privacy Policy',
        'description': 'Read SpinMood\'s official privacy policy. Understand how we handle your data when using our free online spinner wheel.',
        'url': `${window.location.origin}/privacy-policy`,
        'mainEntity': {
          '@type': 'Article',
          'name': 'SpinMood Privacy Policy',
          'headline': 'SpinMood Privacy Policy | Your Data Protection',
          'author': {
            '@type': 'Organization',
            'name': 'SpinMood'
          },
          'publisher': {
            '@type': 'Organization',
            'name': 'SpinMood',
            'logo': {
              '@type': 'ImageObject',
              'url': `${window.location.origin}/favicon.svg`
            }
          },
          'datePublished': '2025-04-14',
          'dateModified': '2025-04-15'
        }
      });
      document.head.appendChild(privacySchema);
      
    } else if (currentPath === '/terms-conditions') {
      // Terms Schema
      const termsSchema = document.createElement('script');
      termsSchema.type = 'application/ld+json';
      termsSchema.innerHTML = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': 'SpinMood Terms and Conditions',
        'description': 'SpinMood\'s terms and conditions for using our free online spinner wheel tool.',
        'url': `${window.location.origin}/terms-conditions`,
        'mainEntity': {
          '@type': 'Article',
          'name': 'SpinMood Terms and Conditions',
          'headline': 'SpinMood Terms & Conditions | Usage Agreement',
          'author': {
            '@type': 'Organization',
            'name': 'SpinMood'
          },
          'publisher': {
            '@type': 'Organization',
            'name': 'SpinMood',
            'logo': {
              '@type': 'ImageObject',
              'url': `${window.location.origin}/favicon.svg`
            }
          },
          'datePublished': '2025-04-14',
          'dateModified': '2025-04-15'
        }
      });
      document.head.appendChild(termsSchema);
      
    } else if (currentPath === '/contact') {
      // Contact Schema
      const contactSchema = document.createElement('script');
      contactSchema.type = 'application/ld+json';
      contactSchema.innerHTML = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        'name': 'Contact SpinMood Support',
        'description': 'Get support or provide feedback for the SpinMood free online spinner wheel.',
        'url': `${window.location.origin}/contact`,
        'mainEntity': {
          '@type': 'WebPage',
          '@id': `${window.location.origin}/contact`
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'SpinMood',
          'logo': {
            '@type': 'ImageObject',
            'url': `${window.location.origin}/favicon.svg`
          },
          'contactPoint': {
            '@type': 'ContactPoint',
            'email': 'admin@spinmood.com',
            'contactType': 'customer service'
          }
        }
      });
      document.head.appendChild(contactSchema);
    } else if (currentPath === '/games') {
      // Collection Page Schema for Games
      const gamesSchema = document.createElement('script');
      gamesSchema.type = 'application/ld+json';
      
      const gamesSchemaData = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        'name': 'SpinMood Games Collection',
        'description': 'Explore SpinMood\'s collection of free online games and interactive tools for decision making, entertainment and fun.',
        'url': `${window.location.origin}/games`,
        'mainEntity': games.map(game => ({
          '@type': 'SoftwareApplication',
          'applicationCategory': 'Game',
          'applicationSubCategory': game.category,
          'name': game.name,
          'description': game.description,
          'url': `${window.location.origin}${game.url}`,
          'image': `${window.location.origin}${game.imageUrl}`,
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD'
          },
          'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': '4.8',
            'ratingCount': '68',
            'bestRating': '5',
            'worstRating': '1'
          },
          'keywords': game.keywords.join(', ')
        }))
      };
      
      gamesSchema.innerHTML = JSON.stringify(gamesSchemaData);
      document.head.appendChild(gamesSchema);
    }
    
    // Add breadcrumb schema for all pages except homepage
    if (currentPath !== '/') {
      const pathSegments = currentPath.split('/').filter(segment => segment);
      const breadcrumbItems = [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': window.location.origin
        }
      ];
      
      // Add current page to breadcrumb
      let pageName = '';
      if (currentPath === '/privacy-policy') pageName = 'Privacy Policy';
      else if (currentPath === '/terms-conditions') pageName = 'Terms & Conditions';
      else if (currentPath === '/contact') pageName = 'Contact Us';
      else if (currentPath === '/games') pageName = 'Games Collection';
      else pageName = pathSegments[pathSegments.length - 1].replace(/-/g, ' ');
      
      breadcrumbItems.push({
        '@type': 'ListItem',
        'position': 2,
        'name': pageName,
        'item': `${window.location.origin}${currentPath}`
      });
      
      const breadcrumbSchema = document.createElement('script');
      breadcrumbSchema.type = 'application/ld+json';
      breadcrumbSchema.innerHTML = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbItems
      });
      document.head.appendChild(breadcrumbSchema);
    }
    
    // Organization Schema - for all pages
    const organizationSchema = document.createElement('script');
    organizationSchema.type = 'application/ld+json';
    organizationSchema.innerHTML = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'SpinMood',
      'url': window.location.origin,
      'logo': `${window.location.origin}/favicon.svg`,
      'sameAs': [
        'https://twitter.com/spinmood',
        'https://www.facebook.com/spinmood',
        'https://www.instagram.com/spinmood'
      ],
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '',
        'email': 'admin@spinmood.com',
        'contactType': 'customer service'
      }
    });
    document.head.appendChild(organizationSchema);
    
    return () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        document.head.removeChild(script);
      });
    };
  }, [currentPath]);

  return null;
};

export default SchemaData;
