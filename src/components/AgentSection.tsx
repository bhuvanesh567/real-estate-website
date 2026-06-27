'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Phone, Mail, MessageCircle, Star, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { mockAgents, Agent } from '@/data/mockData';

export default function AgentSection() {
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // Flatten all testimonials from all agents for a single slider experience
  const allTestimonials = mockAgents.flatMap((agent) => 
    agent.testimonials.map((t) => ({
      ...t,
      agentName: agent.name,
      agentRole: agent.role,
      agentImage: agent.image,
    }))
  );

  const handleNext = () => {
    setActiveTestimonialIdx((prev) => (prev + 1) % allTestimonials.length);
  };

  const handlePrev = () => {
    setActiveTestimonialIdx((prev) => (prev - 1 + allTestimonials.length) % allTestimonials.length);
  };

  const activeTestimonial = allTestimonials[activeTestimonialIdx];

  return (
    <section id="agents" className="w-full max-w-6xl mx-auto px-6 py-20 border-t border-foreground/5 space-y-16">
      {/* Title */}
      <div className="text-center space-y-2">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Bespoke Brokerage
        </h2>
        <p className="text-sm font-light text-foreground/60 max-w-xl mx-auto">
          Connect with our seasoned professionals offering white-glove transactional assistance.
        </p>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockAgents.map((agent) => (
          <div key={agent.id} className="glass rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 border border-foreground/5 shadow-lg relative group">
            {/* Portrait Image */}
            <div className="relative h-32 w-32 sm:h-36 sm:w-36 rounded-2xl overflow-hidden bg-zinc-950 flex-shrink-0">
              <Image
                src={agent.image}
                alt={agent.name}
                fill
                sizes="150px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Agent Info details */}
            <div className="flex-1 space-y-4 text-center sm:text-left">
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-1.5">
                  <h3 className="font-serif text-lg font-bold text-foreground">{agent.name}</h3>
                  <CheckCircle className="h-4 w-4 text-gold-accent" />
                </div>
                <p className="text-xs text-gold-accent font-medium tracking-wide mt-0.5">{agent.role}</p>
              </div>

              <p className="text-xs font-light text-foreground/60 leading-relaxed">
                {agent.bio}
              </p>

              {/* Rating stars */}
              <div className="flex items-center justify-center sm:justify-start gap-1 text-gold-accent">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`h-3.5 w-3.5 ${
                      idx < Math.floor(agent.rating) ? 'fill-current' : 'opacity-30'
                    }`}
                  />
                ))}
                <span className="text-[10px] font-bold text-foreground/80 ml-1.5">({agent.rating.toFixed(1)})</span>
              </div>

              {/* Contact list icons */}
              <div className="flex flex-col space-y-2 pt-2 border-t border-foreground/5 text-xs text-foreground/75 font-light">
                <a href={`tel:${agent.phone}`} className="flex items-center justify-center sm:justify-start gap-2 hover:text-gold-accent transition-colors">
                  <Phone className="h-3.5 w-3.5 text-gold-accent" /> {agent.phone}
                </a>
                <a href={`mailto:${agent.email}`} className="flex items-center justify-center sm:justify-start gap-2 hover:text-gold-accent transition-colors">
                  <Mail className="h-3.5 w-3.5 text-gold-accent" /> {agent.email}
                </a>
              </div>

              {/* WhatsApp direct links */}
              <a
                href={agent.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-full sm:w-auto px-5 items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs tracking-wider transition-colors shadow-md"
              >
                <MessageCircle className="h-4 w-4" /> CONNECT WHATSAPP
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonials Carousel Slider */}
      {activeTestimonial && (
        <div className="relative glass rounded-[2rem] p-8 sm:p-12 border border-foreground/5 shadow-xl max-w-4xl mx-auto mt-12 bg-foreground/[0.02]">
          <div className="flex flex-col items-center text-center space-y-6 animate-fade-in">
            {/* Agent Miniature Avatar */}
            <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-gold-accent bg-zinc-950">
              <Image
                src={activeTestimonial.agentImage}
                alt={activeTestimonial.agentName}
                fill
                sizes="50px"
                className="object-cover"
              />
            </div>

            {/* Testimonial Quote */}
            <p className="font-serif text-lg sm:text-xl font-medium italic text-foreground max-w-2xl leading-relaxed">
              "{activeTestimonial.text}"
            </p>

            {/* Author Specs */}
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                {activeTestimonial.author}
              </h4>
              <p className="text-[10px] text-foreground/50 font-light uppercase tracking-widest">
                {activeTestimonial.role}
              </p>
            </div>

            {/* Testimonial Stars */}
            <div className="flex items-center gap-0.5 text-gold-accent">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  className={`h-4 w-4 ${
                    idx < activeTestimonial.rating ? 'fill-current' : 'opacity-30'
                  }`}
                />
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-6 pt-4">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full border border-foreground/10 hover:border-gold-accent hover:bg-gold-accent/15 text-foreground transition-all duration-300"
                title="Previous testimonial"
              >
                <ChevronLeft className="h-4.5 w-4.5" />
              </button>
              <span className="text-[10px] tracking-widest font-mono text-foreground/40 font-semibold">
                {activeTestimonialIdx + 1} / {allTestimonials.length}
              </span>
              <button
                onClick={handleNext}
                className="p-2 rounded-full border border-foreground/10 hover:border-gold-accent hover:bg-gold-accent/15 text-foreground transition-all duration-300"
                title="Next testimonial"
              >
                <ChevronRight className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
