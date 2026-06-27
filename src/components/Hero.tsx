'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ChevronDown, Play, Volume2, VolumeX } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked fallback
      });
    }
  }, []);

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-black flex flex-col justify-center items-center px-6">
      {/* Video Background */}
      <video
        ref={videoRef}
        src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c02af00ba8b39031ef78f16b1e621183&profile_id=139&oauth2_token_id=57447761"
        loop
        muted
        playsInline
        autoPlay
        onLoadedData={handleVideoLoaded}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          isVideoLoaded ? 'opacity-40' : 'opacity-0'
        }`}
      />

      {/* Fallback Animated Gradient Background if video not loaded */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 bg-gradient-to-tr from-obsidian-950 via-obsidian-900 to-gold-950/20 animate-pulse opacity-70" />
      )}

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl text-center space-y-8 animate-fade-in-up mt-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-widest text-gold-accent backdrop-blur-md">
          <span className="flex h-1.5 w-1.5 rounded-full bg-gold-accent animate-ping" />
          Elite Estates Collection
        </div>

        <h1 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.1]">
          Discover Your Next <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-gold-600">
            Extraordinary Home
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg font-light text-zinc-300 leading-relaxed">
          Curated luxury properties with immersive virtual tours, AI-powered search, and direct agent access. Experience real estate reimagined for the discerning buyer.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto h-14 px-8 rounded-full bg-gold-accent hover:bg-gold-hover text-white font-semibold text-sm tracking-widest transition-all duration-300 shadow-lg shadow-gold-accent/20 hover:scale-105"
          >
            EXPLORE PROPERTIES
          </button>
          
          <a
            href="#agents"
            className="w-full sm:w-auto h-14 px-8 rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/10 font-semibold text-sm tracking-widest transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2"
          >
            TALK TO CONCIERGE
          </a>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-10 left-6 sm:left-10 z-10">
        {isVideoLoaded && (
          <button
            onClick={toggleMute}
            className="flex items-center justify-center h-10 w-10 rounded-full border border-white/20 bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
            title={isMuted ? 'Unmute Video' : 'Mute Video'}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        )}
      </div>

      <div 
        className="absolute bottom-8 z-10 flex flex-col items-center gap-2 text-zinc-400 cursor-pointer animate-bounce"
        onClick={onExploreClick}
      >
        <span className="text-[10px] tracking-widest uppercase font-light">Scroll to discover</span>
        <ChevronDown className="h-4 w-4 text-gold-accent" />
      </div>
    </section>
  );
}
