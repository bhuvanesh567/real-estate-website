'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Sparkles, Landmark, Key, Compass, MessageSquare, Anchor, HelpCircle } from 'lucide-react';

export default function ServicesPage() {
  const serviceList = [
    {
      title: 'Private Portfolio Management',
      desc: 'Access to off-market listings, private pocket listings, and historic estates not published on public MLS systems. We coordinate acquisitions for trust accounts, sovereign funds, and HNWI advisors.',
      icon: ShieldCheck,
      badge: 'Confidential'
    },
    {
      title: 'Bespoke Virtual Staging',
      desc: 'Leverage our advanced custom 3D staging solutions to inspect and customize wall colors, travertine marbles, and dark walnut flooring configurations from anywhere on the planet before buying.',
      icon: Sparkles,
      badge: 'Exclusive Tech'
    },
    {
      title: 'Yacht & Aviation Matching',
      desc: 'Our partnerships with premier international yacht and private jet brokers allow us to match custom waterfront docks or airport hangar clearances with your luxury residential holdings.',
      icon: Anchor,
      badge: 'Lifestyle'
    },
    {
      title: 'Global Relocation & Tax Structuring',
      desc: 'Direct connectivity with elite tax counsels and legal advisors in Geneva, Switzerland and Beverly Hills, CA to assist with residency guidelines, corporate holdings, and tax efficiencies.',
      icon: Landmark,
      badge: 'Advisory'
    },
    {
      title: 'Key Asset Sourcing',
      desc: 'For developments requiring specific security gates, helipads, natural spring onsens, or professional wine production facilities, we source land and complete estates meeting precise parameters.',
      icon: Key,
      badge: 'Target Sourcing'
    },
    {
      title: 'Concierge Booking Assistance',
      desc: 'Prompt scheduling for private viewings, corporate helicopter tours of architectural boundaries, and direct video walkthroughs with managing partner Alex Vance or director Sarah Sterling.',
      icon: Compass,
      badge: 'White-glove'
    }
  ];

  return (
    <div className="w-full bg-zinc-50 dark:bg-black text-black dark:text-zinc-50 py-16 transition-colors duration-300">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto px-6 mb-16 space-y-3">
        <span className="text-[10px] font-bold tracking-widest text-gold-accent uppercase block">
          Client Capabilities
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Bespoke Services
        </h1>
        <p className="text-sm font-light text-foreground/60 leading-relaxed">
          Elite Estates provides a comprehensive suite of advisory and technology solutions designed for affluent global property owners.
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {serviceList.map((service, idx) => {
          const Icon = service.icon;
          return (
            <div
              key={idx}
              className="glass p-8 rounded-3xl border border-foreground/5 relative overflow-hidden flex flex-col justify-between hover:border-gold-accent/40 transition-colors duration-500 group"
            >
              {/* Top Row */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="h-10 w-10 rounded-xl bg-gold-accent/15 text-gold-accent flex items-center justify-center">
                    <Icon className="h-5.5 w-5.5" />
                  </div>
                  <span className="text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-foreground/5 border border-foreground/5 text-foreground/50">
                    {service.badge}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-gold-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs font-light text-foreground/60 leading-relaxed">
                  {service.desc}
                </p>
              </div>

              {/* Bottom Row / Contact Link */}
              <div className="pt-6 mt-6 border-t border-foreground/5">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-[10px] font-bold tracking-widest text-gold-accent hover:text-gold-hover uppercase"
                >
                  Consult Concierge <MessageSquare className="h-3 w-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Banner */}
      <div className="max-w-4xl mx-auto px-6 mt-20 text-center">
        <div className="glass p-8 rounded-[2rem] border border-foreground/5 space-y-6 bg-foreground/[0.01]">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground">Need Custom Sourcing Parameters?</h3>
          <p className="text-xs font-light text-foreground/60 max-w-lg mx-auto leading-relaxed">
            Our brokerage works directly with multi-family offices globally. Provide us with specific security, geographical, or design constraints, and we will formulate an off-market catalog.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-xs font-semibold tracking-widest text-background transition-all duration-300 hover:bg-gold-accent hover:text-white"
            >
              INQUIRE PRIVATELY
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
