'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, MessageCircle, ArrowUpRight } from 'lucide-react';
import { Property, mockProperties } from '@/data/mockData';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: Date;
  recommendation?: Property;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Greetings from Elite Estates. I am your digital concierge. How may I assist you with discovery or virtual tours today?',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // User message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate concierge response delay
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse = generateResponse(text);
      setMessages((prev) => [...prev, aiResponse]);
    }, 1500);
  };

  const generateResponse = (input: string): Message => {
    const text = input.toLowerCase();
    let responseText = '';
    let rec: Property | undefined = undefined;

    if (text.includes('malibu') || text.includes('ocean') || text.includes('california')) {
      rec = mockProperties.find(p => p.id === 'prop-1');
      responseText = `Certainly. In Malibu, we feature "The Edge", a gorgeous modern glass-and-concrete villa floating over the Pacific coastline. It includes a 75ft infinity pool and private beach access.`;
    } else if (text.includes('penthouse') || text.includes('new york') || text.includes('manhattan')) {
      rec = mockProperties.find(p => p.id === 'prop-2');
      responseText = `Of course. Our Upper East Side crown jewel is the "Aether Penthouse", displaying double-height ceilings and unparalleled panoramas of Central Park.`;
    } else if (text.includes('aspen') || text.includes('ski') || text.includes('chalet') || text.includes('colorado')) {
      rec = mockProperties.find(p => p.id === 'prop-3');
      responseText = `For alpine luxury, we showcase "The Summit Chalet" on Red Mountain in Aspen, Colorado. It offers direct ski-in/ski-out access and heated decks.`;
    } else if (text.includes('tuscany') || text.includes('italy') || text.includes('villa')) {
      rec = mockProperties.find(p => p.id === 'prop-4');
      responseText = `In Tuscany, we have "Villa Bellissima", a restored 16th-century estate complete with private vineyards and an olive grove.`;
    } else if (text.includes('highest') || text.includes('expensive') || text.includes('price') || text.includes('cost')) {
      rec = mockProperties.find(p => p.id === 'prop-1'); // Malibu Edge at 18.5M
      responseText = `Our most premium listing is "The Edge" in Malibu, CA, offered at $18,500,000. Let me know if you would like me to open the 3D virtual tour for you.`;
    } else if (text.includes('tour') || text.includes('3d') || text.includes('virtual') || text.includes('interactive')) {
      responseText = `All of our luxury portfolios include bespoke Three.js 3D Virtual Tours. Just select any property card and click "Launch Tour" to explore wall colors and wood details interactively!`;
    } else if (text.includes('agent') || text.includes('contact') || text.includes('speak') || text.includes('talk')) {
      responseText = `I can transfer you immediately to our direct line on WhatsApp. Simply click the "Connect WhatsApp" button below to reach our white-glove partners.`;
    } else {
      responseText = `I have logged your request. I specialize in listing details, virtual tours, and mortgage estimations. You can also ask me about specific locations like Malibu, Manhattan, or Aspen.`;
    }

    return {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: responseText,
      timestamp: new Date(),
      recommendation: rec,
    };
  };

  const quickQuestions = [
    'Show me Malibu beachfront',
    'What is the highest-priced listing?',
    'How do I launch a 3D tour?',
    'Speak to an agent'
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat window drawer */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[550px] glass rounded-[2rem] border border-foreground/10 shadow-2xl flex flex-col mb-4 overflow-hidden animate-fade-in-up bg-background">
          {/* Header */}
          <div className="p-5 border-b border-foreground/5 bg-foreground/[0.02] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-gold-accent/15 rounded-xl text-gold-accent">
                <Sparkles className="h-4 w-4 animate-spin-slow" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Elite Concierge</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-ping" />
                  <span className="text-[9px] tracking-wide text-foreground/40 font-light">Online & Connected</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-foreground/5 text-foreground/50 hover:text-foreground transition-colors"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Messages feed */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[80%] ${
                  msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                }`}
              >
                {/* Bubble */}
                <div
                  className={`p-4 rounded-2xl leading-relaxed font-light ${
                    msg.sender === 'user'
                      ? 'bg-foreground text-background rounded-tr-none'
                      : 'bg-foreground/5 border border-foreground/5 text-foreground rounded-tl-none'
                  }`}
                >
                  {msg.text}

                  {/* Recommendation Card Inline */}
                  {msg.recommendation && (
                    <div className="mt-3 bg-background border border-foreground/10 rounded-xl overflow-hidden flex flex-col gap-2 p-2">
                      <div className="relative h-20 w-full rounded-lg overflow-hidden bg-zinc-950">
                        <img
                          src={msg.recommendation.image}
                          alt={msg.recommendation.title}
                          className="object-cover h-full w-full"
                        />
                      </div>
                      <div>
                        <h5 className="font-serif font-bold text-foreground truncate">{msg.recommendation.title}</h5>
                        <p className="text-[10px] text-gold-accent font-semibold">
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            maximumFractionDigits: 0,
                          }).format(msg.recommendation.price)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Timestamp / Info link */}
                <span className="text-[9px] text-foreground/30 font-light mt-1 px-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}

            {/* Simulated typing indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-foreground/5 border border-foreground/5 mr-auto w-16">
                <span className="h-1.5 w-1.5 rounded-full bg-foreground/30 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-1.5 w-1.5 rounded-full bg-foreground/30 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-1.5 w-1.5 rounded-full bg-foreground/30 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick options panel */}
          <div className="px-5 py-2 flex flex-wrap gap-1.5 border-t border-foreground/5">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1.5 bg-foreground/5 border border-foreground/5 text-[9px] font-medium tracking-wide rounded-full text-foreground/80 hover:bg-gold-accent/15 hover:text-gold-accent transition-all"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-4 border-t border-foreground/5 bg-foreground/[0.01] flex items-center gap-2">
            <input
              type="text"
              placeholder="Send message to concierge..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(inputText)}
              className="flex-1 h-11 px-4 bg-background border border-foreground/10 rounded-full text-xs font-light text-foreground focus:outline-none focus:border-gold-accent"
            />
            <button
              onClick={() => handleSend(inputText)}
              className="h-11 w-11 rounded-full bg-gold-accent hover:bg-gold-hover text-white flex items-center justify-center transition-colors shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 w-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isOpen
            ? 'bg-foreground text-background rotate-90 hover:scale-105'
            : 'bg-gold-accent text-white hover:bg-gold-hover hover:scale-110 shadow-gold-accent/25'
        }`}
        title="Open Concierge Assistant"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>
    </div>
  );
}
