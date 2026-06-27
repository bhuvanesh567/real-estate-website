'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, BookOpen, Search, Sparkles } from 'lucide-react';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const articles = [
    {
      id: 'article-1',
      title: 'The Rise of Japandi Architecture in Kyoto’s Luxury Retreats',
      excerpt: 'How native Hinoki cedar wood and minimalist Scandinavian furniture lines coordinate to create modern Sukiya-zukuri retreats with natural thermal efficiency.',
      date: 'June 18, 2026',
      readTime: '6 min read',
      tag: 'Architecture & Design',
      bgGradient: 'from-zinc-900 via-neutral-900 to-amber-950/20'
    },
    {
      id: 'article-2',
      title: 'Malibu Off-Market Regulations: Discretion in HNWI Real Estate',
      excerpt: 'An in-depth look at pocket listings, private registry transactions, and why high-net-worth individuals prioritize off-market acquisition strategies.',
      date: 'June 05, 2026',
      readTime: '5 min read',
      tag: 'Market Insights',
      bgGradient: 'from-zinc-900 via-neutral-900 to-indigo-950/20'
    },
    {
      id: 'article-3',
      title: 'Alpine Masterpieces: Smart Heating & Thermal Suites in Aspen',
      excerpt: 'Evaluating modern Douglas Fir chalet construction, energy efficiency classes, and the integration of dry thermal suites in high-altitude environments.',
      date: 'May 28, 2026',
      readTime: '8 min read',
      tag: 'Engineering',
      bgGradient: 'from-zinc-900 via-neutral-900 to-green-950/20'
    },
    {
      id: 'article-4',
      title: 'Restoring 16th-Century Tuscany: Ancient Stone Meets Smart Automation',
      excerpt: 'Exploring how architects coordinate historic Tuscan villa preservation requirements with geothermal pools, voice controls, and automated private vineyards.',
      date: 'May 14, 2026',
      readTime: '7 min read',
      tag: 'Restoration',
      bgGradient: 'from-zinc-900 via-neutral-900 to-red-950/20'
    }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  const filteredArticles = articles.filter(
    (art) =>
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full bg-zinc-50 dark:bg-black text-black dark:text-zinc-50 py-16 transition-colors duration-300">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto px-6 mb-16 space-y-3">
        <span className="text-[10px] font-bold tracking-widest text-gold-accent uppercase block">
          Editorial Journal
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          The Journal
        </h1>
        <p className="text-sm font-light text-foreground/60 leading-relaxed">
          Elite Estates editorial covers prime architectural stories, off-market transaction economics, and high-end design trends globally.
        </p>
      </div>

      {/* Main Layout Grid */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Articles Grid */}
        <div className="lg:col-span-2 space-y-8">
          {/* Local search inside articles */}
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-foreground/45">
              <Search className="h-4.5 w-4.5" />
            </div>
            <input
              type="text"
              placeholder="Search articles by design style, region, or engineering..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-12 pr-4 bg-background border border-foreground/10 rounded-xl text-xs font-light text-foreground focus:outline-none focus:border-gold-accent transition-colors"
            />
          </div>

          {filteredArticles.length === 0 ? (
            <div className="glass p-12 rounded-3xl text-center text-xs font-light text-foreground/50 border border-foreground/5">
              No matching journal entries found. Please try general terms like "Design" or "Tuscany".
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="glass rounded-3xl border border-foreground/5 overflow-hidden hover:border-gold-accent/40 transition-all duration-500 flex flex-col sm:flex-row h-full"
                >
                  {/* Article Widescreen Cover */}
                  <div className={`sm:w-1/3 min-h-[160px] sm:min-h-full bg-gradient-to-tr ${article.bgGradient} flex items-center justify-center p-6 relative`}>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(255,255,255,0.02),transparent)]" />
                    <BookOpen className="h-10 w-10 text-gold-accent/30" />
                  </div>

                  {/* Article Metadata */}
                  <div className="sm:w-2/3 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-3 text-[9px] font-bold tracking-widest text-gold-accent uppercase">
                        <span className="bg-gold-accent/10 border border-gold-accent/20 px-2 py-0.5 rounded">
                          {article.tag}
                        </span>
                        <span className="flex items-center gap-1 text-foreground/40 font-light">
                          <Calendar className="h-3 w-3" /> {article.date}
                        </span>
                        <span className="flex items-center gap-1 text-foreground/40 font-light">
                          <Clock className="h-3 w-3" /> {article.readTime}
                        </span>
                      </div>
                      
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground hover:text-gold-accent transition-colors leading-snug">
                        {article.title}
                      </h3>
                      
                      <p className="text-xs font-light text-foreground/60 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-foreground/5 flex justify-between items-center">
                      <span className="text-[9px] font-bold tracking-widest text-foreground/40 uppercase">
                        Author: Editorial Board
                      </span>
                      <button className="flex items-center gap-1 text-[10px] font-bold tracking-widest text-gold-accent hover:text-gold-hover uppercase group">
                        Read Article <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Editorial Sidebar */}
        <div className="space-y-8">
          {/* Subscribe to Journal */}
          <div className="glass rounded-3xl p-6 border border-foreground/5 bg-foreground/[0.01] space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/40 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-gold-accent" /> THE LUXURY REPORT
            </h4>
            <p className="text-xs font-light text-foreground/60 leading-relaxed">
              Join elite advisors receiving quarterly analyses on off-market pricing, designer movements, and global asset legal frameworks.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                placeholder={subscribed ? "Subscription Confirmed" : "Enter email address"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribed}
                className="w-full h-11 px-4 bg-background border border-foreground/10 rounded-xl text-xs font-light text-foreground focus:outline-none focus:border-gold-accent"
                required
              />
              <button
                type="submit"
                className="w-full h-11 bg-foreground hover:bg-gold-accent hover:text-white text-background text-xs font-bold uppercase tracking-widest transition-colors rounded-xl"
              >
                {subscribed ? "THANK YOU" : "SUBSCRIBE NOW"}
              </button>
            </form>
          </div>

          {/* Quick Categorical Tags */}
          <div className="glass rounded-3xl p-6 border border-foreground/5 bg-foreground/[0.01] space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/40">Categories</h4>
            <div className="flex flex-wrap gap-2 text-[10px] font-bold tracking-wider uppercase">
              {['Architecture', 'Market Insights', 'Legal Structures', 'Staging Technology', 'Malibu Coastline', 'Alpine Chalets'].map((c, i) => (
                <button
                  key={i}
                  onClick={() => setSearchQuery(c)}
                  className="px-3 py-1.5 bg-background border border-foreground/10 hover:border-gold-accent hover:text-gold-accent transition-colors rounded-lg text-foreground/75"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
