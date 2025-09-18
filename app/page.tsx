'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// iPhone 15/16 Frame Component with Screen Glare
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
          
          {/* Screen Glare Effect - Very Subtle */}
          <div 
            className="absolute inset-0 pointer-events-none rounded-[37px]"
            style={{
              background: `
                linear-gradient(135deg, 
                  rgba(255,255,255,0.1) 0%, 
                  rgba(255,255,255,0.05) 25%, 
                  transparent 50%,
                  transparent 75%,
                  rgba(255,255,255,0.02) 100%
                )
              `
            }}
          />
          
          {/* Dynamic Island Overlay */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-[85px] h-[22px] bg-black rounded-full z-30">
            <div className="flex items-center justify-center h-full relative">
              <div className="absolute left-3 w-1.5 h-1.5 bg-gray-900 rounded-full"></div>
              <div className="absolute right-3 w-3 h-0.5 bg-gray-900 rounded-full"></div>
            </div>
          </div>
          
          {/* Time Overlay */}
          <div className="absolute top-2 left-4 text-white text-sm font-medium z-20 drop-shadow-sm">
            9:41
          </div>
        </div>
      </div>
    </div>
  );
}

// iOS 18 Glass Button Component
function GlassButton({ 
  children, 
  active = false, 
  onClick, 
  disabled = false 
}: { 
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`
        relative px-4 py-2.5 rounded-full text-sm font-medium
        backdrop-blur-xl border border-white/20
        transition-all duration-300
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${active 
          ? 'bg-white/25 text-gray-800 shadow-lg' 
          : 'bg-white/10 text-gray-700 hover:bg-white/20'
        }
      `}
      style={{
        background: active 
          ? 'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.15) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)'
      }}
    >
      {children}
      
      {/* Glass shine effect */}
      <div 
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)'
        }}
      />
    </motion.button>
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
                  style={{ objectPosition: '45% center' }}
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

// Enhanced Lights Section with Smooth Scroll Control
function LightsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [manualControl, setManualControl] = useState(false);
  const [lightsState, setLightsState] = useState<'off' | 'on'>('off');
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['0.5 1', '0.5 0']
  });
  
  const lightsOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, 1]);
  
  // Handle scroll-driven animation
  useEffect(() => {
    if (!manualControl) {
      const unsubscribe = lightsOpacity.onChange((value) => {
        setLightsState(value > 0.5 ? 'on' : 'off');
      });
      return unsubscribe;
    }
  }, [lightsOpacity, manualControl]);
  
  const handleManualToggle = (state: 'off' | 'on') => {
    setManualControl(true);
    setLightsState(state);
  };
  
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
          <p className="text-lg text-gray-600 font-light mb-8">
            Exactly as you want it.
          </p>
          
          {/* iOS 18 Glass Controls */}
          <div className="flex gap-3">
            <GlassButton 
              active={lightsState === 'off'}
              onClick={() => handleManualToggle('off')}
            >
              Lights Off
            </GlassButton>
            <GlassButton 
              active={lightsState === 'on'}
              onClick={() => handleManualToggle('on')}
            >
              Lights On
            </GlassButton>
          </div>
        </motion.div>
        
        {/* iPhone with Room Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          viewport={{ once: true }}
          className="flex justify-center"
          style={{ scale }}
        >
          <IPhoneFrame>
            <div className="relative w-full h-full overflow-hidden">
              {/* Lights Off Image */}
              <div className="absolute inset-0">
                <Image
                  src="/Curtains-Closed-Lights-Off.png"
                  alt="Room with lights off"
                  fill
                  quality={100}
                  priority
                  className="object-cover"
                  style={{ objectPosition: '60% center' }}
                />
              </div>
              
              {/* Lights On Image - Controlled by scroll or manual */}
              <motion.div
                className="absolute inset-0"
                style={{ 
                  opacity: manualControl 
                    ? (lightsState === 'on' ? 1 : 0)
                    : lightsOpacity
                }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                <Image
                  src="/Curtains-Closed-Lights-On.png"
                  alt="Room with lights on"
                  fill
                  quality={100}
                  className="object-cover"
                  style={{ objectPosition: '60% center' }}
                />
              </motion.div>
            </div>
          </IPhoneFrame>
        </motion.div>
      </div>
    </section>
  );
}

// Enhanced Curtains Section with Still Frame Fallback
function CurtainsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [curtainsState, setCurtainsState] = useState<'open' | 'closed'>('open');
  const [isAnimating, setIsAnimating] = useState(false);
  const [manualControl, setManualControl] = useState(false);
  
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  
  // Auto-play curtains closing on scroll
  useEffect(() => {
    if (isInView && !manualControl && curtainsState === 'open') {
      const timer = setTimeout(() => {
        playCurtainVideo('closing');
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isInView, manualControl, curtainsState]);
  
  const playCurtainVideo = (action: 'opening' | 'closing') => {
    if (!videoRef.current || isAnimating) return;
    
    const video = videoRef.current;
    const newSrc = action === 'opening' ? '/curtains-opening.mp4' : '/curtains-closing.mp4';
    
    // Only change src if it's different to avoid white flash
    if (video.src !== newSrc) {
      setIsAnimating(true);
      
      // Preload the video before switching
      const tempVideo = document.createElement('video');
      tempVideo.src = newSrc;
      tempVideo.muted = true;
      tempVideo.playsInline = true;
      
      tempVideo.onloadeddata = () => {
        // Now switch to the preloaded video
        video.src = newSrc;
        video.currentTime = 0;
        video.play().catch(() => {});
      };
      
      tempVideo.load();
    } else {
      // Same video, just restart
      setIsAnimating(true);
      video.currentTime = 0;
      video.play().catch(() => {});
    }
    
    video.onended = () => {
      video.pause();
      setCurtainsState(action === 'opening' ? 'open' : 'closed');
      setIsAnimating(false);
    };
  };
  
  const handleManualToggle = (action: 'opening' | 'closing') => {
    // Only respond if not currently animating
    if (isAnimating) return;
    
    setManualControl(true);
    playCurtainVideo(action);
  };
  
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
              {/* Still Frame Fallback - Show when video not loaded */}
              <div className="absolute inset-0">
                <Image
                  src="/Curtains-Open-Lights-On.png"
                  alt="Curtains open"
                  fill
                  quality={100}
                  className="object-cover"
                  style={{ 
                    objectPosition: '60% center',
                    opacity: curtainsState === 'open' && !isAnimating ? 1 : 0
                  }}
                />
                <Image
                  src="/Curtains-Closed-Lights-On.png"
                  alt="Curtains closed"
                  fill
                  quality={100}
                  className="object-cover"
                  style={{ 
                    objectPosition: '60% center',
                    opacity: curtainsState === 'closed' && !isAnimating ? 1 : 0
                  }}
                />
              </div>
              
              {/* Video Layer - Always visible during animation */}
              <div 
                className="absolute inset-0"
                style={{ opacity: isAnimating ? 1 : 0 }}
              >
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '60% center' }}
                  muted
                  playsInline
                  preload="metadata"
                />
              </div>
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
          <p className="text-lg text-gray-600 font-light mb-8">
            Exactly when you need it.
          </p>
          
          {/* iOS 18 Glass Controls */}
          <div className="flex gap-3">
            <GlassButton 
              active={curtainsState === 'closed'}
              onClick={() => handleManualToggle('closing')}
              disabled={isAnimating}
            >
              Close Curtains
            </GlassButton>
            <GlassButton 
              active={curtainsState === 'open'}
              onClick={() => handleManualToggle('opening')}
              disabled={isAnimating}
            >
              Open Curtains
            </GlassButton>
          </div>
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
