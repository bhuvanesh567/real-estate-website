'use client';

import React from 'react';
import Image from 'next/image';
import { mockAgents } from '@/data/mockData';
import { Phone, Mail, MessageCircle, Star, Award, ShieldCheck, Quote } from 'lucide-react';

export default function AgentsPage() {
  return (
    <div className="w-full bg-zinc-50 dark:bg-black text-black dark:text-zinc-50 py-16 transition-colors duration-300">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto px-6 mb-16 space-y-3">
        <span className="text-[10px] font-bold tracking-widest text-gold-accent uppercase block">
          Concierge Team
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Bespoke Partners
        </h1>
        <p className="text-sm font-light text-foreground/60 leading-relaxed">
          Elite Estates partners coordinate all international operations with absolute discretion, white-glove service, and deep market expertise.
        </p>
      </div>

      {/* Agents Listing */}
      <div className="max-w-6xl mx-auto px-6 space-y-20">
        {mockAgents.map((agent, index) => (
          <div
            key={agent.id}
            className={`flex flex-col lg:flex-row gap-12 items-center py-10 border-b border-foreground/5 last:border-0 ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Left Column: Image & Contact Info */}
            <div className="w-full lg:w-1/3 flex flex-col items-center text-center space-y-6">
              <div className="relative h-64 w-64 rounded-full overflow-hidden border-2 border-gold-accent shadow-xl bg-zinc-950">
                <Image
                  src={agent.image}
                  alt={agent.name}
                  fill
                  sizes="256px"
                  priority
                  className="object-cover"
                />
              </div>

              <div className="space-y-2">
                <h2 className="font-serif text-2xl font-bold text-foreground">{agent.name}</h2>
                <p className="text-xs text-gold-accent font-semibold tracking-wider uppercase">{agent.role}</p>
                <div className="flex justify-center items-center gap-1.5 pt-1">
                  <div className="flex items-center text-gold-accent">
                    {Array.from({ length: Math.floor(agent.rating) }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-foreground/50">({agent.rating.toFixed(1)} / 5.0 Rating)</span>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="w-full max-w-xs space-y-3">
                <a
                  href={agent.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs tracking-wider transition-colors shadow-md shadow-[#25d366]/10"
                >
                  <MessageCircle className="h-4.5 w-4.5" /> WHATSAPP CONNECT
                </a>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <a
                    href={`tel:${agent.phone}`}
                    className="flex h-10 items-center justify-center gap-1 rounded-xl border border-foreground/10 hover:border-gold-accent hover:text-gold-accent transition-colors font-medium text-foreground bg-background"
                  >
                    <Phone className="h-3.5 w-3.5" /> Call Broker
                  </a>
                  <a
                    href={`mailto:${agent.email}`}
                    className="flex h-10 items-center justify-center gap-1 rounded-xl border border-foreground/10 hover:border-gold-accent hover:text-gold-accent transition-colors font-medium text-foreground bg-background"
                  >
                    <Mail className="h-3.5 w-3.5" /> Email
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Bio & Client Testimonials */}
            <div className="w-full lg:w-2/3 space-y-8">
              {/* Bio Block */}
              <div className="space-y-4">
                <span className="text-[10px] font-bold tracking-widest text-foreground/40 uppercase block">
                  Profile Narrative
                </span>
                <p className="text-sm font-light text-foreground/80 leading-relaxed">
                  {agent.bio}
                </p>
                <div className="flex items-center gap-6 pt-2 text-[10px] font-bold tracking-widest text-foreground/50 uppercase">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4.5 w-4.5 text-gold-accent" /> Off-Market Specialist
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Award className="h-4.5 w-4.5 text-gold-accent" /> Million Dollar Guild
                  </span>
                </div>
              </div>

              {/* Client Testimonials Grid */}
              <div className="space-y-4">
                <span className="text-[10px] font-bold tracking-widest text-foreground/40 uppercase block">
                  Client Reviews & Verification
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {agent.testimonials.map((test, idx) => (
                    <div
                      key={idx}
                      className="glass p-6 rounded-2xl border border-foreground/5 space-y-4 relative overflow-hidden"
                    >
                      <div className="absolute top-2 right-4 text-gold-accent/5 pointer-events-none">
                        <Quote className="h-14 w-14 stroke-[1]" />
                      </div>
                      <div className="flex items-center text-gold-accent gap-0.5">
                        {Array.from({ length: test.rating }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-current" />
                        ))}
                      </div>
                      <p className="text-xs font-light text-foreground/70 italic leading-relaxed relative z-10">
                        "{test.text}"
                      </p>
                      <div className="border-t border-foreground/5 pt-3">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-foreground">{test.author}</h4>
                        <p className="text-[9px] text-foreground/40 font-light">{test.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
