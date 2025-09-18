'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// iPhone 15/16 Frame Component with Accurate Dynamic Island
function IPhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* iPhone Frame */}
      <div className="relative w-[280px] h-[560px] bg-black rounded-[45px] p-2 shadow-[0_0_0_2px_#1a1a1a,0_0_60px_rgba(0,0,0,0.4)]">
        {/* Screen */}
        <div className="relative w-full h-full bg-white rounded-[37px] overflow-hidden">
          {/* Content fills entire screen */}
          <div className="absolute inset-0">
            {children}
          </div>
          
          {/* Dynamic Island Overlay - smaller and more accurate */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-[85px] h-[22px] bg-black rounded-full z-30">
            <div className="flex items-center justify-center h-full relative">
              {/* Front camera */}
              <div className="absolute left-3 w-1.5 h-1.5 bg-gray-900 rounded-full"></div>
              {/* Speaker/sensor */}
              <div className="absolute right-3 w-3 h-0.5 bg-gray-900 rounded-full"></div>
            </div>
          </div>
          
          {/* Time Overlay - properly centered */}
          <div className="absolute top-2 left-4 text-white text-sm font-medium z-20 drop-shadow-sm">
            9:41
          </div>
        </div>
      </div>
    </div>
  );
}

// Apple Home Interface - More Accurate
function AppleHomeInterface() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-white relative">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)] opacity-50"></div>
      
      <div className="relative z-10 p-4 pt-10">
        {/* Header */}
        <h1 className="text-2xl font-semibold mb-6">Home</h1>
        
        {/* Status Cards Row */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-2.5">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                <svg width="12" height="12" fill="white" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.64 9 11 5.16-1.36 9-5.45 9-11V7l-10-5z"/>
                </svg>
              </div>
              <div>
                <div className="text-xs font-medium">Climate</div>
                <div className="text-xs text-white/70">20.0—24.5°</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-2.5">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mr-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div>
                <div className="text-xs font-medium">Lights</div>
                <div className="text-xs text-white/70">2 On</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-2.5">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                <svg width="10" height="12" fill="white" viewBox="0 0 24 24">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z"/>
                </svg>
              </div>
              <div>
                <div className="text-xs font-medium">Security</div>
                <div className="text-xs text-white/70">Disarmed</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scenes Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-medium">Scenes</h2>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
                <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                  <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
                </svg>
              </div>
              <span className="font-medium">Movie Night</span>
            </div>
          </div>
        </div>
        
        {/* Favorites Grid */}
        <div className="mb-6">
          <h2 className="text-base font-medium mb-3">Favorites</h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3">
              <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center mb-2">
                <svg width="14" height="14" fill="white" viewBox="0 0 24 24">
                  <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2v-7h-2v7z"/>
                </svg>
              </div>
              <div className="text-xs font-medium mb-0.5">Main Entrance</div>
              <div className="text-xs font-medium mb-0.5">Door</div>
              <div className="text-xs text-white/70">Locked</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3">
              <div className="w-6 h-6 bg-gray-500 rounded-lg flex items-center justify-center mb-2">
                <svg width="14" height="14" fill="white" viewBox="0 0 24 24">
                  <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2v-7h-2v7z"/>
                </svg>
              </div>
              <div className="text-xs font-medium mb-0.5">Garage</div>
              <div className="text-xs font-medium mb-0.5">Gate</div>
              <div className="text-xs text-white/70">Closed</div>
            </div>
          </div>
        </div>
        
        {/* Room Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-medium">Upstairs Living Room</h2>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3">
              <div className="w-6 h-6 bg-yellow-500 rounded-lg flex items-center justify-center mb-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="text-xs font-medium mb-0.5">Cove Light</div>
              <div className="text-xs text-white/70">Off</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3">
              <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center mb-2">
                <svg width="12" height="12" fill="white" viewBox="0 0 24 24">
                  <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5l-1 1v2h8v-2l-1-1h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                </svg>
              </div>
              <div className="text-xs font-medium mb-0.5">Sheer Curtain</div>
              <div className="text-xs text-white/70">Closed</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm border-t border-white/10">
        <div className="flex justify-around py-2">
          <div className="flex flex-col items-center py-1">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span className="text-xs mt-1">Home</span>
          </div>
          <div className="flex flex-col items-center py-1 opacity-60">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="text-xs mt-1">Automation</span>
          </div>
          <div className="flex flex-col items-center py-1 opacity-60">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="text-xs mt-1">Discover</span>
          </div>
        </div>
        
        {/* Home Indicator */}
        <div className="flex justify-center pb-1">
          <div className="w-32 h-1 bg-white rounded-full opacity-60"></div>
        </div>
      </div>
    </div>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-6">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <h1 className="text-5xl md:text-7xl font-thin text-gray-900 mb-6 tracking-tight">
            HomiFi
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light mb-12 max-w-3xl mx-auto">
            Your home. Intelligently connected.
          </p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center"
          >
            <IPhoneFrame>
              <div className="relative w-full h-full">
                <Image
                  src="/Curtains-Open-Lights-On.png"
                  alt="Beautiful home interior"
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'center center' }}
                  quality={100}
                  priority
                />
              </div>
            </IPhoneFrame>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Lights Section with Scroll Animation
function LightsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  
  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timer = setTimeout(() => {
        setHasAnimated(true);
      }, 600); // Apple-like delay
      return () => clearTimeout(timer);
    }
  }, [isInView, hasAnimated]);
  
  return (
    <section ref={containerRef} className="min-h-screen flex items-center py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          viewport={{ once: true }}
        >
          <div className="text-sm uppercase tracking-wider text-blue-600 font-medium mb-3">
            Perfect Light
          </div>
          <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-4 leading-tight">
            Every room.<br />
            Every moment.
          </h2>
          <p className="text-lg text-gray-600 font-light">
            Exactly as you want it.
          </p>
        </motion.div>
        
        {/* iPhone with Room Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <IPhoneFrame>
            <div className="relative w-full h-full">
              {/* Base Image - Lights Off - positioned to show left side (lamp area) */}
              <Image
                src="/Curtains-Closed-Lights-Off.png"
                alt="Room with lights off"
                fill
                className="object-cover"
                style={{ objectPosition: 'left center' }}
                quality={100}
                priority
              />
              
              {/* Overlay Image - Lights On with smooth transition */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: hasAnimated ? 1 : 0 }}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.25, 0.46, 0.45, 0.94] // Apple's easeOutQuart
                }}
              >
                <Image
                  src="/Curtains-Closed-Lights-On.png"
                  alt="Room with lights on"
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'left center' }}
                  quality={100}
                />
              </motion.div>
            </div>
          </IPhoneFrame>
        </motion.div>
      </div>
    </section>
  );
}

// Curtains Section with Video Animation
function CurtainsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPlayed, setVideoPlayed] = useState(false);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (isInView && !videoPlayed && videoRef.current) {
      const timer = setTimeout(() => {
        const video = videoRef.current;
        if (video) {
          video.currentTime = 0;
          video.play().catch(() => {
            // Handle autoplay restrictions
          });
          setVideoPlayed(true);
        }
      }, 800); // Apple-like delay
      return () => clearTimeout(timer);
    }
  }, [isInView, videoPlayed]);
  
  return (
    <section ref={containerRef} className="min-h-screen flex items-center py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* iPhone with Video Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          viewport={{ once: true }}
          className="flex justify-center order-2 md:order-1"
        >
          <IPhoneFrame>
            <div className="relative w-full h-full overflow-hidden">
              <video
                ref={videoRef}
                src="/curtains-closing.mp4"
                className="w-full h-full object-cover"
                style={{ objectPosition: '60% center' }}
                muted
                playsInline
                preload="auto"
                onEnded={() => {
                  if (videoRef.current) {
                    videoRef.current.pause();
                  }
                }}
              />
            </div>
          </IPhoneFrame>
        </motion.div>
        
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          viewport={{ once: true }}
          className="order-1 md:order-2"
        >
          <div className="text-sm uppercase tracking-wider text-blue-600 font-medium mb-3">
            Perfect Privacy
          </div>
          <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-4 leading-tight">
            Comfort<br />
            and control.
          </h2>
          <p className="text-lg text-gray-600 font-light">
            Exactly when you need it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-16 text-center bg-white">
      <p className="text-sm text-gray-500 font-light">
        Designed in Dubai. Built for your home.
      </p>
    </footer>
  );
}

// Main Page Component
export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <LightsSection />
      <CurtainsSection />
      <Footer />
    </main>
  );
}
