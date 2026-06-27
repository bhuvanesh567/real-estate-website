'use client';

import React from 'react';
import Image from 'next/image';
import { Landmark, Award, ShieldCheck, Globe, Star, Compass, UserCheck } from 'lucide-react';

export default function AboutPage() {
  const milestones = [
    { year: '2012', title: 'Inception in Geneva', desc: 'Elite Estates founded in Switzerland with a focus on private off-market estates in Geneva and Zurich.' },
    { year: '2016', title: 'Beverly Hills Expansion', desc: 'Opened our North American flagship salon in Beverly Hills, expanding into Malibu, Aspen, and Bel Air.' },
    { year: '2020', title: 'Virtual Customizer Launch', desc: 'Developed in-house custom WebGL virtual staging, setting a new benchmark for cross-regional buyers.' },
    { year: '2024', title: '$15B Transaction Mark', desc: 'Surpassed fifteen billion dollars in transactional value across global luxury markets.' },
  ];

  const coreValues = [
    {
      title: 'Unrivaled Discretion',
      desc: 'Our private registry keeps high-value assets entirely confidential. Sovereign wealth, executives, and HNWIs transact with total peace of mind.',
      icon: ShieldCheck,
    },
    {
      title: 'Architectural Heritage',
      desc: 'We represent homes, not just listings. Each property is selected for its engineering excellence, aesthetic vision, and design story.',
      icon: Landmark,
    },
    {
      title: 'Seamless Digital Concierge',
      desc: 'Through real-time 3D simulation, custom financial modeling, and prompt WhatsApp channels, distance is no longer an obstacle.',
      icon: Compass,
    },
  ];

  const team = [
    {
      name: 'Victoria Valois',
      role: 'Chief Executive Officer',
      bio: 'Former Swiss banking executive specializing in international assets and global real estate acquisitions.',
      image: '/images/agent_sarah.png', // Reusing placeholder
    },
    {
      name: 'Ryan Martinez',
      role: 'Head of Architectural Design',
      bio: 'Award-winning modern architect directing our virtual staging and structural assessment advisory.',
      image: '/images/agent_alex.png', // Reusing placeholder
    },
  ];

  return (
    <div className="w-full bg-zinc-50 dark:bg-black text-black dark:text-zinc-50 py-16 transition-colors duration-300">
      {/* Brand Header */}
      <div className="text-center max-w-3xl mx-auto px-6 mb-16 space-y-3">
        <span className="text-[10px] font-bold tracking-widest text-gold-accent uppercase block">
          Corporate Story
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Our Heritage
        </h1>
        <p className="text-sm font-light text-foreground/60 leading-relaxed">
          Elite Estates was created to challenge conventional real estate brokerages by combining absolute physical luxury with cutting-edge visual technologies.
        </p>
      </div>

      {/* Narrative Section */}
      <section className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <div className="space-y-6">
          <span className="text-[9px] uppercase tracking-widest font-bold text-gold-accent">The Executive Vision</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
            A Legacy Built on Fine Architecture & Sovereign Discretion
          </h2>
          <p className="text-xs font-light text-foreground/70 leading-relaxed">
            In 2012, Elite Estates recognized that international buyers face immense friction when searching for premium properties. Traditional platforms lacked dynamic insights, detailed layout specifications, and real-time custom visualization.
          </p>
          <p className="text-xs font-light text-foreground/70 leading-relaxed">
            By building a high-tech platform inspired by Apple's design principles—clean interfaces, generous white spaces, and immersive WebGL 3D staging—we transformed global property search. Today, we represent the absolute crown jewels of world-class real estate.
          </p>
        </div>
        <div className="relative h-[320px] rounded-3xl overflow-hidden shadow-2xl border border-foreground/10 bg-zinc-900">
          {/* Cover image placeholder */}
          <div className="absolute inset-0 bg-gradient-to-tr from-obsidian-950 via-obsidian-900 to-gold-950/20 opacity-90" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 text-white space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-gold-accent">Geneva Headquarters</span>
            <h4 className="font-serif text-lg font-bold">Elite Estates AG</h4>
            <p className="text-[10px] text-zinc-300 font-light">Rue du Rhône, 1204 Geneva, Switzerland</p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-foreground/[0.01] border-y border-foreground/5 py-24 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[9px] uppercase font-bold tracking-widest text-gold-accent">Guiding Principles</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">Our Core Values</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div key={idx} className="glass p-8 rounded-3xl border border-foreground/5 space-y-4">
                  <div className="h-10 w-10 rounded-xl bg-gold-accent/15 text-gold-accent flex items-center justify-center">
                    <Icon className="h-5.5 w-5.5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-foreground">{value.title}</h3>
                  <p className="text-xs font-light text-foreground/60 leading-relaxed">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Milestone Timeline */}
      <section className="py-24 px-6 sm:px-8 max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[9px] uppercase font-bold tracking-widest text-gold-accent">Journey Timeline</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">Our Key Milestones</h2>
        </div>

        <div className="relative border-l-2 border-gold-accent/30 pl-8 ml-4 space-y-12">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative">
              {/* Dot */}
              <span className="absolute -left-[41px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold-accent ring-4 ring-background">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              <div className="space-y-1">
                <span className="font-serif text-sm font-bold text-gold-accent block">{m.year}</span>
                <h4 className="text-sm font-bold text-foreground">{m.title}</h4>
                <p className="text-xs font-light text-foreground/60 leading-relaxed max-w-xl">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Board */}
      <section className="bg-foreground/[0.01] border-t border-foreground/5 py-24 px-6 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[9px] uppercase font-bold tracking-widest text-gold-accent">Governance</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">Executive Board</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-3xl mx-auto">
            {team.map((member, idx) => (
              <div key={idx} className="glass p-6 rounded-3xl border border-foreground/5 text-center space-y-4">
                <div className="relative h-28 w-28 rounded-full overflow-hidden mx-auto border border-gold-accent bg-zinc-900">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-foreground font-serif">{member.name}</h4>
                  <p className="text-[9px] text-gold-accent font-semibold tracking-wider uppercase">{member.role}</p>
                </div>
                <p className="text-xs font-light text-foreground/60 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
