
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How does SpinMood's wheel spinner work?",
      answer: "SpinMood uses a mathematically fair random algorithm to determine the winner. Simply add your entries, customize your wheel theme, and click spin. The wheel will randomly select one entry when it stops spinning."
    },
    {
      question: "Is SpinMood free to use?",
      answer: "Yes! SpinMood is completely free with no limitations. You can use it for classrooms, giveaways, decision-making, or just for fun without any cost."
    },
    {
      question: "How is SpinMood better than WheelofNames or PickerWheel?",
      answer: "SpinMood offers mood-based themes with matching animations and sound effects, is more visually premium, loads faster, and is optimized for all devices. Our spinner is designed to be the most user-friendly wheel spinner available online."
    },
    {
      question: "Can I use SpinMood for Instagram giveaways?",
      answer: "Absolutely! SpinMood is perfect for social media giveaways. Just add your participant names or entries, choose the Party theme for added excitement, and spin to select a winner fairly and dramatically."
    },
    {
      question: "Can I customize the spinner wheel?",
      answer: "Yes! You can add any text entries you want (up to 40), choose from our four mood themes (Study, Chill, Party, Gift), and toggle sound effects on or off to match your preferences or environment."
    },
    {
      question: "How many names can I add to the spinner wheel?",
      answer: "SpinMood supports up to 40 custom names on your spinner wheel. Each name will be displayed clearly with its own unique color segment on the wheel."
    },
    {
      question: "Is SpinMood suitable for classroom use?",
      answer: "Absolutely! Many teachers use SpinMood for randomly selecting students, assigning tasks, creating engaging review games, or making classroom decisions more fun and fair."
    },
    {
      question: "How do I share my SpinMood wheel with others?",
      answer: "Currently, you can take a screenshot or screen recording of your wheel to share with others. We're working on adding direct sharing functionality in the future!"
    }
  ];

  return (
    <section id="faq" className="max-w-3xl mx-auto w-full px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white">Frequently Asked Questions</h2>
      
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b border-white/15 mb-2">
            <AccordionTrigger className="text-lg font-bold text-white/90 hover:text-white py-4">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-white text-base font-bold leading-relaxed pb-4 bg-black/10 p-4 rounded-md shadow-inner">
              <div className="drop-shadow-sm">{faq.answer}</div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQSection;
