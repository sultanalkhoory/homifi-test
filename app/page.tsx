'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// iPhone 15/16 Frame Component with Dynamic Island
function IPhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* iPhone Frame */}
      <div className="relative w-[280px] h-[560px] bg-black rounded-[45px] p-2 shadow-[0_0_0_2px_#1a1a1a,0_0_60px_rgba(0,0,0,0.4)]">
        {/* Screen */}
        <div className="relative w-full h-full bg-white rounded-[37px] overflow-hidden">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-[100px] h-[25px] bg-black rounded-full z-20">
            <div className="flex items-center justify-center h-full">
              <div className="w-2 h-2 bg-gray-800 rounded-full mr-2"></div>
              <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
            </div>
          </div>
          
          {/* Status Bar Elements */}
          <div className="absolute top-1 left-4 text-black text-xs font-medium z-10">9:41</div>
          <div className="absolute top-1 right-4 flex items-center space-x-1 text-black z-10">
            <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
              <rect x="0" y="4" width="4" height="4" rx="1"/>
              <rect x="5" y="2" width="4" height="8" rx="1"/>
              <rect x="10" y="1" width="4" height="10" rx="1"/>
              <rect x="15" y="0" width="3" height="12" rx="1"/>
            </svg>
            <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor">
              <path d="M1 2h14a1 1 0 011 1v4a1 1 0 01-1 1H1a1 1 0 01-1-1V3a1 1 0 011-1zm13 2v2h1V4h-1z"/>
            </svg>
          </div>
          
          {/* Content */}
          <div className="absolute inset-0 pt-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Home Interface Mockup
function HomeInterface() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 text-white p-4 overflow-hidden">
      {/* Header */}
      <h1 className="text-2xl font-semibold mb-4">Home</h1>
      
      {/* Status Cards */}
      <div className="flex space-x-2 mb-4">
        <div className="bg-white/20 backdrop-blur rounded-xl p-2 flex-1">
          <div className="flex items-center text-xs">
            <span className="text-blue-200 mr-1">❄️</span>
            <div>
              <div className="font-medium">Climate</div>
              <div className="text-blue-200">20.0—24.5°</div>
            </div>
          </div>
        </div>
        <div className="bg-white/20 backdrop-blur rounded-xl p-2 flex-1">
          <div className="flex items-center text-xs">
            <span className="text-yellow-300 mr-1">💡</span>
            <div>
              <div className="font-medium">Lights</div>
              <div className="text-blue-200">2 On</div>
            </div>
          </div>
        </div>
        <div className="bg-white/20 backdrop-blur rounded-xl p-2 flex-1">
          <div className="flex items-center text-xs">
            <span className="text-green-300 mr-1">🔒</span>
            <div>
              <div className="font-medium">Security</div>
              <div className="text-blue-200">Disarmed</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scenes */}
      <div className="mb-4">
        <h2 className="text-lg font-medium mb-2 flex items-center">
          Scenes <span className="ml-1 text-sm">›</span>
        </h2>
        <div className="bg-white/20 backdrop-blur rounded-xl p-3">
          <div className="flex items-center text-sm">
            <span className="mr-2">🍿</span>
            <span>Movie Night</span>
          </div>
        </div>
      </div>
      
      {/* Upstairs Living Room */}
      <div>
        <h2 className="text-lg font-medium mb-2 flex items-center">
          Upstairs Living Room <span className="ml-1 text-sm">›</span>
        </h2>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white/20 backdrop-blur rounded-xl p-2">
            <div className="text-xs mb-1">📺</div>
            <div className="text-xs font-medium">Apple TV</div>
            <div className="text-xs text-blue-200">Not Playing</div>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-xl p-2">
            <div className="text-xs mb-1">🪟</div>
            <div className="text-xs font-medium">Blackout Cur...</div>
            <div className="text-xs text-blue-200">Closed</div>
          </div>
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
              <HomeInterface />
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  
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
              {/* Base Image - Lights Off */}
              <Image
                src="/Curtains-Closed-Lights-Off.png"
                alt="Room with lights off"
                fill
                className="object-cover"
                quality={100}
                priority
              />
              
              {/* Overlay Image - Lights On */}
              <motion.div
                className="absolute inset-0"
                style={{ opacity }}
              >
                <Image
                  src="/Curtains-Closed-Lights-On.png"
                  alt="Room with lights on"
                  fill
                  className="object-cover"
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
      const video = videoRef.current;
      video.currentTime = 0;
      video.play().catch(() => {
        // Handle autoplay restrictions
      });
      setVideoPlayed(true);
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
