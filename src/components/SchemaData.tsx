import React from 'react';
import { useLocation } from 'react-router-dom';

const SchemaData = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isGamesPage = location.pathname === '/games';
  
  // Base URL for the website
  const baseUrl = 'https://spinmood.com';
  
  // Main schema for WebApp
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'SpinMood - Free Online Spinner Wheel & Games',
    'description': 'The ultimate free online spinner wheel for giveaways, decisions, study, parties, and fun activities with additional interactive games. Highly customizable and easy to use.',
    'applicationCategory': 'UtilityApplication',
    'operatingSystem': 'All',
    'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
    'url': baseUrl,
    'screenshot': {
      '@type': 'ImageObject',
      'url': `${baseUrl}/screenshot.png`,
      'width': '1200',
      'height': '630'
    }
  };
  
  // Schema for Games Collection Page
  const gamesCollectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': 'SpinMood Online Games',
    'description': 'Play fun, engaging, and unique free online games on SpinMood.',
    'url': `${baseUrl}/games`,
    'mainEntity': {
      '@type': 'ItemList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'item': {
            '@type': 'Game',
            'name': 'Color Cascade',
            'url': `${baseUrl}/games/color-cascade`,
            'description': 'Test your reflexes by matching cascading color blocks. How many can you catch?',
            'applicationCategory': 'Game',
            'genre': 'Arcade, Reflex',
            'keywords': 'color matching game, falling blocks game, reflex testing game',
            'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' }
          }
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'item': {
            '@type': 'Game',
            'name': 'Emoji Evolution',
            'url': `${baseUrl}/games/emoji-evolution`,
            'description': 'Combine different emojis to evolve and discover new, unexpected combinations!',
            'applicationCategory': 'Game',
            'genre': 'Puzzle',
            'keywords': 'emoji game, merge emojis, evolution game',
            'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' }
          }
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'item': {
            '@type': 'Game',
            'name': 'Pixel Painter',
            'url': `${baseUrl}/games/pixel-painter`,
            'description': 'Paint and design with pixels. Create retro-style artwork one block at a time.',
            'applicationCategory': 'Game',
            'genre': 'Creative',
            'keywords': 'pixel art, digital painting, creative game',
            'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' }
          }
        },
        {
          '@type': 'ListItem',
          'position': 4,
          'item': {
            '@type': 'Game',
            'name': 'Reaction Race',
            'url': `${baseUrl}/games/reaction-race`,
            'description': 'Challenge your reaction speed with this fast-paced timing game.',
            'applicationCategory': 'Game',
            'genre': 'Arcade, Reflex',
            'keywords': 'reaction game, speed test, reflex challenge',
            'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' }
          }
        },
        {
          '@type': 'ListItem',
          'position': 5,
          'item': {
            '@type': 'Game',
            'name': 'Pattern Pop',
            'url': `${baseUrl}/games/pattern-pop`,
            'description': 'Test your memory by recreating increasingly complex patterns.',
            'applicationCategory': 'Game',
            'genre': 'Brain, Memory',
            'keywords': 'pattern memory, sequence game, brain training',
            'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' }
          }
        },
        {
          '@type': 'ListItem',
          'position': 6,
          'item': {
            '@type': 'Game',
            'name': 'Lucky Line',
            'url': `${baseUrl}/games/lucky-line`,
            'description': 'Create the perfect line to connect points and solve puzzles.',
            'applicationCategory': 'Game',
            'genre': 'Puzzle',
            'keywords': 'line drawing game, puzzle solver, path finding',
            'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' }
          }
        },
        {
          '@type': 'ListItem',
          'position': 7,
          'item': {
            '@type': 'Game',
            'name': 'Word Chain Reaction',
            'url': `${baseUrl}/games/word-chain`,
            'description': 'Create chains of related words. How long can you keep the sequence going?',
            'applicationCategory': 'Game',
            'genre': 'Word, Educational',
            'keywords': 'word game, vocabulary builder, chain reaction',
            'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' }
          }
        },
        {
          '@type': 'ListItem',
          'position': 8,
          'item': {
            '@type': 'Game',
            'name': 'Infinite Craft',
            'url': `${baseUrl}/games/infinite-craft`,
            'description': 'Mix and match basic elements to discover new combinations in this endless crafting game.',
            'applicationCategory': 'Game',
            'genre': 'Puzzle, Creative',
            'keywords': 'crafting game, element combinations, discovery game',
            'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' }
          }
        },
        {
          '@type': 'ListItem',
          'position': 9,
          'item': {
            '@type': 'Game',
            'name': 'The Password Game',
            'url': `${baseUrl}/games/password-game`,
            'description': 'Follow increasingly absurd rules to create the perfect password in this hilarious challenge.',
            'applicationCategory': 'Game',
            'genre': 'Puzzle, Humor',
            'keywords': 'password challenge, security game, puzzle game',
            'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' }
          }
        }
      ]
    }
  };
  
  // Organization schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'SpinMood',
    'url': baseUrl,
    'logo': `${baseUrl}/favicon.svg`,
    'sameAs': [
      'https://twitter.com/spinmood',
      'https://www.facebook.com/spinmood',
      'https://www.instagram.com/spinmood'
    ]
  };

  // FAQ schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'How does SpinMood's wheel spinner work?',
        'acceptedAnswer': { 
          '@type': 'Answer', 
          'text': 'SpinMood uses a mathematically fair random algorithm to ensure each entry on the wheel has an equal chance of winning. Simply add your entries, customize the look if you want, and hit the spin button!' 
        }
      },
      {
        '@type': 'Question',
        'name': 'Is SpinMood free to use?',
        'acceptedAnswer': { 
          '@type': 'Answer', 
          'text': 'Yes, SpinMood is completely free to use, with all features available at no cost. This includes our spinner wheel and all our games.' 
        }
      },
      {
        '@type': 'Question',
        'name': 'Can I customize the spinner wheel?',
        'acceptedAnswer': { 
          '@type': 'Answer', 
          'text': 'Absolutely! You can customize the spinner with different themes (Study, Chill, Party, Gift, or Custom), change colors, add as many entries as you want (up to 40), and enable/disable sound effects.' 
        }
      },
      {
        '@type': 'Question',
        'name': 'How do I use SpinMood for a giveaway?',
        'acceptedAnswer': { 
          '@type': 'Answer', 
          'text': 'For giveaways, simply enter all participant names or entry numbers into the spinner, choose a theme that matches your event, and spin! The confetti animation makes winner announcements exciting and engaging.' 
        }
      },
      {
        '@type': 'Question',
        'name': 'What types of games does SpinMood offer?',
        'acceptedAnswer': { 
          '@type': 'Answer', 
          'text': 'SpinMood offers a variety of fun web games including Color Cascade, Emoji Evolution, Pixel Painter, Reaction Race, Pattern Pop, Lucky Line, Word Chain Reaction, and more - all free to play directly in your browser.' 
        }
      },
      {
        '@type': 'Question',
        'name': 'Is SpinMood safe for classrooms?',
        'acceptedAnswer': { 
          '@type': 'Answer', 
          'text': 'Yes! SpinMood is perfectly suited for classroom use. Teachers love our spinner for selecting students randomly, assigning tasks, creating groups, and making learning more engaging. All our games are also appropriate for educational settings.' 
        }
      }
    ]
  };

  // Determine which schema to render based on current page
  const renderSchema = () => {
    if (isHomePage) {
      return (
        <>
          <script type="application/ld+json">
            {JSON.stringify(webAppSchema)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(organizationSchema)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        </>
      );
    } else if (isGamesPage) {
      return (
        <>
          <script type="application/ld+json">
            {JSON.stringify(gamesCollectionSchema)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(organizationSchema)}
          </script>
        </>
      );
    } else {
      // Other pages just get the organization schema
      return (
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      );
    }
  };

  return <>{renderSchema()}</>;
};

export default SchemaData;
