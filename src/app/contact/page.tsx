'use client';

import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, MapPin, Calendar, Clock, Check, ShieldCheck, Landmark } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '$5,000,000 - $10,000,000',
    type: 'Coastal Mansion',
    message: ''
  });

  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('10:00 AM');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        budget: '$5,000,000 - $10,000,000',
        type: 'Coastal Mansion',
        message: ''
      });
    }, 4000);
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingDate) {
      setBookingConfirmed(true);
      setTimeout(() => {
        setBookingConfirmed(false);
        setBookingDate('');
      }, 4000);
    }
  };

  const salons = [
    {
      city: 'Geneva',
      address: 'Rue du Rhône 42, 1204 Geneva, Switzerland',
      phone: '+41 22 555 0190',
      email: 'geneva@eliteestates.com'
    },
    {
      city: 'Beverly Hills',
      address: 'North Canon Drive 450, Beverly Hills, CA 90210',
      phone: '+1 (310) 555-0100',
      email: 'bh@eliteestates.com'
    },
    {
      city: 'Tokyo',
      address: 'Roppongi Hills Mori Tower, Minato City, Tokyo 106-6108',
      phone: '+81 3 5555 0122',
      email: 'tokyo@eliteestates.com'
    },
    {
      city: 'Manhattan',
      address: 'Fifth Avenue 745, New York, NY 10151',
      phone: '+1 (212) 555-0188',
      email: 'nyc@eliteestates.com'
    }
  ];

  return (
    <div className="w-full bg-zinc-50 dark:bg-black text-black dark:text-zinc-50 py-16 transition-colors duration-300">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto px-6 mb-16 space-y-3">
        <span className="text-[10px] font-bold tracking-widest text-gold-accent uppercase block">
          Concierge Channels
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Bespoke Consultation
        </h1>
        <p className="text-sm font-light text-foreground/60 leading-relaxed">
          Reach out to schedule private residential viewings, virtual Three.js walkthroughs, or global asset valuation planning.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Form */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass p-8 rounded-[2.5rem] border border-foreground/5 bg-foreground/[0.01] space-y-6">
            <div className="space-y-1">
              <span className="text-[9px] uppercase tracking-widest font-bold text-gold-accent flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" /> Confidential Sourcing Request
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">Inquiry Register</h2>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="h-12 w-12 rounded-full bg-gold-accent/15 text-gold-accent flex items-center justify-center mx-auto">
                  <Check className="h-6 w-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-foreground">Request Registered</h4>
                <p className="text-xs font-light text-foreground/65 max-w-sm mx-auto leading-relaxed">
                  Thank you. Your corporate sourcing parameters have been registered under high confidentiality. A managing partner will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-light text-foreground/80">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold tracking-widest text-foreground/40 uppercase">FULL NAME</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sterling HNW"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-11 px-4 bg-background border border-foreground/10 focus:border-gold-accent focus:outline-none rounded-xl text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold tracking-widest text-foreground/40 uppercase">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. portfolio@sterling.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-11 px-4 bg-background border border-foreground/10 focus:border-gold-accent focus:outline-none rounded-xl text-foreground"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold tracking-widest text-foreground/40 uppercase">TELEPHONE</label>
                    <input
                      type="tel"
                      placeholder="e.g. +1 (310) 555-0100"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-11 px-4 bg-background border border-foreground/10 focus:border-gold-accent focus:outline-none rounded-xl text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold tracking-widest text-foreground/40 uppercase">ACQUISITION BUDGET</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full h-11 px-3 bg-background border border-foreground/10 focus:border-gold-accent focus:outline-none rounded-xl text-foreground"
                    >
                      <option>$5,000,000 - $10,000,000</option>
                      <option>$10,000,000 - $20,000,000</option>
                      <option>$20,000,000+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-bold tracking-widest text-foreground/40 uppercase">INTEREST TYPE</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full h-11 px-3 bg-background border border-foreground/10 focus:border-gold-accent focus:outline-none rounded-xl text-foreground"
                  >
                    <option>Coastal Mansion (Malibu)</option>
                    <option>Skyline Penthouse (Manhattan)</option>
                    <option>Alpine Chalet (Aspen)</option>
                    <option>Tuscan Vineyard Villa (Italy)</option>
                    <option>Traditional Japandi Retreat (Japan)</option>
                    <option>Bespoke 3D virtual design setup</option>
                    <option>Off-market private search parameters</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-bold tracking-widest text-foreground/40 uppercase">INQUIRY NOTES</label>
                  <textarea
                    rows={4}
                    placeholder="Specify any desired coordinates, security details, helipads, or tax frameworks..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 bg-background border border-foreground/10 focus:border-gold-accent focus:outline-none rounded-xl text-foreground resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-foreground hover:bg-gold-accent hover:text-white text-background font-bold tracking-widest uppercase transition-all duration-300 rounded-xl"
                >
                  DISPATCH INQUIRY
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: Appointment booking & Salons list */}
        <div className="space-y-8">
          {/* Appointment Scheduler Widget */}
          <div className="glass p-6 rounded-3xl border border-foreground/5 bg-foreground/[0.01] space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/40 flex items-center gap-1.5">
              <Calendar className="h-4.5 w-4.5 text-gold-accent" /> SALON BOOKING
            </h4>
            <p className="text-xs font-light text-foreground/60 leading-relaxed">
              Book a direct video tour consultation or schedule an appointment at one of our global salons.
            </p>

            {bookingConfirmed ? (
              <div className="py-6 text-center space-y-3 animate-fade-in">
                <div className="h-10 w-10 rounded-full bg-gold-accent/15 text-gold-accent flex items-center justify-center mx-auto">
                  <Check className="h-5 w-5" />
                </div>
                <h5 className="font-serif text-sm font-bold text-foreground">Appointment Set</h5>
                <p className="text-[10px] font-light text-foreground/60 leading-relaxed">
                  We have blocked your time for the virtual walkthrough. A calendar invite has been sent.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-3 text-xs font-light text-foreground/80">
                <div className="space-y-1">
                  <label className="text-[8px] font-bold tracking-widest text-foreground/40 uppercase">SELECT DATE</label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full h-10 px-3 bg-background border border-foreground/10 rounded-lg text-foreground focus:outline-none focus:border-gold-accent"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-bold tracking-widest text-foreground/40 uppercase">SELECT TIME</label>
                  <select
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full h-10 px-3 bg-background border border-foreground/10 rounded-lg text-foreground focus:outline-none focus:border-gold-accent"
                  >
                    <option>09:00 AM (CET)</option>
                    <option>10:30 AM (CET)</option>
                    <option>02:00 PM (CET)</option>
                    <option>04:30 PM (CET)</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full h-10 bg-foreground hover:bg-gold-accent hover:text-white text-background font-bold tracking-wider uppercase transition-colors rounded-lg text-[10px]"
                >
                  SECURE BOOKING
                </button>
              </form>
            )}
          </div>

          {/* Global Salons Directory */}
          <div className="glass p-6 rounded-3xl border border-foreground/5 bg-foreground/[0.01] space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/40 flex items-center gap-1.5">
              <Landmark className="h-4.5 w-4.5 text-gold-accent" /> SALON DIRECTORY
            </h4>
            <div className="space-y-6 max-h-[350px] overflow-y-auto pr-2">
              {salons.map((salon, i) => (
                <div key={i} className="space-y-1 pb-4 border-b border-foreground/5 last:border-0 last:pb-0 text-xs font-light text-foreground/80">
                  <h5 className="font-serif font-bold text-foreground flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-gold-accent" /> {salon.city} Salon
                  </h5>
                  <p className="text-[10px] text-foreground/60 leading-relaxed">{salon.address}</p>
                  <a href={`tel:${salon.phone}`} className="block text-[10px] hover:text-gold-accent transition-colors pt-0.5">{salon.phone}</a>
                  <a href={`mailto:${salon.email}`} className="block text-[10px] hover:text-gold-accent transition-colors underline underline-offset-2">{salon.email}</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
