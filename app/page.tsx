'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// iPhone 15/16 Frame Component
function IPhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="relative w-[280px] h-[560px] bg-black rounded-[45px] p-2 shadow-[0_0_0_2px_#1a1a1a,0_0_60px_rgba(0,0,0,0.4)]">
        <div className="relative w-full h-full bg-white rounded-[37px] overflow-hidden">
          <div className="absolute inset-0">{children}</div>
          {/* Screen glare */}
          <div
            className="absolute inset-0 pointer-events-none rounded-[37px]"
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 25%, transparent 50%, transparent 75%, rgba(255,255,255,0.02) 100%)`,
            }}
          />
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[85px] h-[22px] bg-black rounded-full z-30">
            <div className="flex items-center justify-center h-full relative">
              <div className="absolute left-3 w-1.5 h-1.5 bg-gray-900 rounded-full"></div>
              <div className="absolute right-3 w-3 h-0.5 bg-gray-900 rounded-full"></div>
            </div>
          </div>
          {/* Time */}
          <div className="absolute top-2 left-4 text-white text-sm font-medium z-20 drop-shadow-sm">
            9:41
          </div>
        </div>
      </div>
    </div>
  );
}

// iOS Glass Button
function GlassButton({
  children,
  active = false,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative px-4 py-2.5 rounded-full text-sm font-medium
        backdrop-blur-xl border border-white/20
        transition-all duration-300 cursor-pointer
        ${
          active
            ? 'bg-white/25 text-gray-800 shadow-lg'
            : 'bg-white/10 text-gray-700 hover:bg-white/20'
        }
      `}
    >
      {children}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)',
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
          transition={{ duration: 0.8 }}
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
              <Image
                src="/Curtains-Open-Lights-On.png"
                alt="Beautiful home interior"
                fill
                className="object-cover"
                style={{ objectPosition: '45% center' }}
                quality={100}
                priority
              />
            </IPhoneFrame>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Lights Section
function LightsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [manualControl, setManualControl] = useState(false);
  const [lightsState, setLightsState] = useState<'off' | 'on'>('off');
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });

  useEffect(() => {
    if (isInView && !manualControl && lightsState === 'off') {
      const timer = setTimeout(() => setLightsState('on'), 600);
      return () => clearTimeout(timer);
    }
  }, [isInView, manualControl, lightsState]);

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center py-20 bg-white"
    >
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-sm uppercase text-blue-600 mb-3">
            Perfect Light
          </div>
          <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-4">
            Every room. Every moment.
          </h2>
          <p className="text-lg text-gray-600 font-light mb-8">
            Exactly as you want it.
          </p>
          <div className="flex gap-3">
            <GlassButton
              active={lightsState === 'off'}
              onClick={() => {
                setManualControl(true);
                setLightsState('off');
              }}
            >
              Lights Off
            </GlassButton>
            <GlassButton
              active={lightsState === 'on'}
              onClick={() => {
                setManualControl(true);
                setLightsState('on');
              }}
            >
              Lights On
            </GlassButton>
          </div>
        </motion.div>
        {/* iPhone */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <IPhoneFrame>
            <div className="relative w-full h-full overflow-hidden bg-black">
              <Image
                src="/Curtains-Closed-Lights-Off.png"
                alt="Room lights off"
                fill
                className="object-cover"
                style={{ objectPosition: '60% center' }}
              />
              <motion.div
                className="absolute inset-0"
                animate={{ opacity: lightsState === 'on' ? 1 : 0 }}
                transition={{ duration: 1.2 }}
              >
                <Image
                  src="/Curtains-Closed-Lights-On.png"
                  alt="Room lights on"
                  fill
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

// Curtains Section - Improved Video Control
function CurtainsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<'open' | 'closed'>('open');
  const [manual, setManual] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  // Initialize video with closing video to avoid white screen
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.src = '/curtains-closing.mp4';
      video.currentTime = 0;
      video.load();
    }
  }, []);

  useEffect(() => {
    if (isInView && !manual && state === 'open' && !isPlaying) {
      const timer = setTimeout(() => playVideo('close'), 800);
      return () => clearTimeout(timer);
    }
  }, [isInView, manual, state, isPlaying]);

  const playVideo = (action: 'open' | 'close') => {
    if (videoRef.current && !isPlaying) {
      const video = videoRef.current;
      
      // Don't do anything if already in the requested state
      if ((action === 'close' && state === 'closed') || (action === 'open' && state === 'open')) {
        return;
      }
      
      setIsPlaying(true);
      video.src = action === 'open' ? '/curtains-opening.mp4' : '/curtains-closing.mp4';
      video.currentTime = 0;
      
      video.addEventListener('ended', () => {
        setIsPlaying(false);
        setState(action === 'open' ? 'open' : 'closed');
      }, { once: true });
      
      video.play().then(() => {
        setVideoError(false);
      }).catch(() => {
        setVideoError(true);
        setIsPlaying(false);
        setState(action === 'open' ? 'open' : 'closed');
      });
    }
  };

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center py-20 bg-gray-50"
    >
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* iPhone */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center order-2 md:order-1"
        >
          <IPhoneFrame>
            <div className="relative w-full h-full overflow-hidden">
              {/* Fallback image for when video fails */}
              {videoError && (
                <Image
                  src={state === 'closed' ? "/Curtains-Closed-Lights-On.png" : "/Curtains-Open-Lights-On.png"}
                  alt={state === 'closed' ? "Curtains closed" : "Curtains open"}
                  fill
                  className="object-cover"
                  style={{ objectPosition: '60% center' }}
                />
              )}
              
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: '60% center' }}
                muted
                playsInline
                preload="metadata"
                onError={() => setVideoError(true)}
                onLoadStart={() => setVideoError(false)}
              />
            </div>
          </IPhoneFrame>
        </motion.div>
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="order-1 md:order-2"
        >
          <div className="text-sm uppercase text-blue-600 mb-3">
            Perfect Privacy
          </div>
          <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-4">
            Comfort and control.
          </h2>
          <p className="text-lg text-gray-600 font-light mb-8">
            Exactly when you need it.
          </p>
          <div className="flex gap-3">
            <GlassButton
              active={state === 'closed'}
              onClick={() => {
                if (!isPlaying) {
                  setManual(true);
                  playVideo('close');
                }
              }}
            >
              Close Curtains
            </GlassButton>
            <GlassButton
              active={state === 'open'}
              onClick={() => {
                if (!isPlaying) {
                  setManual(true);
                  playVideo('open');
                }
              }}
            >
              Open Curtains
            </GlassButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Climate Section with Toggle Buttons
function ClimateSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [temperature, setTemperature] = useState(26);
  const [manual, setManual] = useState(false);
  const [started, setStarted] = useState(false);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });

  useEffect(() => {
    if (isInView && !manual && !started) {
      setStarted(true);
      const temps = [25, 24, 23, 22, 21, 20, 19, 18];
      temps.forEach((t, i) =>
        setTimeout(() => setTemperature(t), (i + 1) * 500)
      );
    }
  }, [isInView, manual, started]);

  const handleTempChange = (newTemp: number) => {
    setManual(true);
    setTemperature(newTemp);
  };

  const mode =
    temperature <= 20 ? 'cool' : temperature >= 24 ? 'warm' : 'comfort';

  return (
    <>
      <style jsx global>{`
        @keyframes airFlow {
          0% {
            transform: translateX(-80px) translateY(5px) scale(0.8);
            opacity: 0;
          }
          15% {
            opacity: 0.4;
          }
          85% {
            opacity: 0.4;
          }
          100% {
            transform: translateX(300px) translateY(-15px) scale(1.1);
            opacity: 0;
          }
        }
        @keyframes particleFloat {
          0% {
            transform: translateX(-20px) translateY(10px);
            opacity: 0;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translateX(200px) translateY(-20px);
            opacity: 0;
          }
        }
        @keyframes sunbeamSubtle {
          0% {
            opacity: 0;
            transform: rotate(-3deg) translateY(10px);
          }
          50% {
            opacity: 0.15;
          }
          100% {
            opacity: 0;
            transform: rotate(3deg) translateY(-10px);
          }
        }
      `}</style>
      <section
        ref={containerRef}
        className="min-h-screen flex items-center py-20 bg-gradient-to-br from-blue-50 to-cyan-50"
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-sm uppercase text-blue-600 mb-3">
              Perfect Climate
            </div>
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-4">
              Always comfortable.
            </h2>
            <p className="text-lg text-gray-600 font-light mb-8">
              The perfect temperature, automatically.
            </p>
            
            {/* Toggle Buttons */}
            <div className="flex gap-3">
              <GlassButton 
                active={temperature === 18} 
                onClick={() => handleTempChange(18)}
              >
                Cool
              </GlassButton>
              <GlassButton 
                active={temperature === 22} 
                onClick={() => handleTempChange(22)}
              >
                Comfort
              </GlassButton>
              <GlassButton 
                active={temperature === 26} 
                onClick={() => handleTempChange(26)}
              >
                Warm
              </GlassButton>
            </div>
          </motion.div>
          {/* iPhone */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <IPhoneFrame>
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="/Curtains-Open-Lights-On.png"
                  alt="Climate room"
                  fill
                  className="object-cover"
                  style={{ objectPosition: '45% center' }}
                />
                {mode === 'cool' && (
                  <>
                    {/* Wavy air streams */}
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute pointer-events-none"
                        style={{
                          top: `${25 + i * 15}%`,
                          left: '-10%',
                          width: '280px',
                          height: '20px',
                          animation: `airFlow ${
                            4 + i * 0.5
                          }s ease-in-out infinite ${i * 0.8}s`,
                        }}
                      >
                        <svg width="280" height="20">
                          <path
                            d={`M 0,10 Q 70,${5 + i * 2} 140,10 T 280,10`}
                            stroke="rgba(59,130,246,0.3)"
                            strokeWidth="2"
                            fill="none"
                            style={{ filter: 'blur(1px)', strokeLinecap: 'round' }}
                          />
                        </svg>
                      </div>
                    ))}
                    
                    {/* Floating particles */}
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={`particle-${i}`}
                        className="absolute w-1 h-1 bg-blue-300 rounded-full opacity-80"
                        style={{
                          left: `${15 + (i % 3) * 20}%`,
                          top: `${30 + (i % 2) * 15}%`,
                          animation: `particleFloat ${3 + (i * 0.3)}s ease-in-out infinite ${i * 0.5}s`
                        }}
                      />
                    ))}
                    
                    {/* Subtle wave effect */}
                    <div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `
                          radial-gradient(ellipse 180px 80px at 50% 35%, 
                            rgba(59, 130, 246, 0.08) 0%, 
                            transparent 60%
                          )
                        `,
                        animation: 'pulse 5s ease-in-out infinite'
                      }}
                    />
                  </>
                )}
                {mode === 'warm' && (
                  <>
                    {/* Continuous subtle sunlight beams */}
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={`sunbeam-${i}`}
                        className="absolute pointer-events-none"
                        style={{
                          top: `${10 + i * 20}%`,
                          right: '-20%',
                          width: '300px',
                          height: '4px',
                          background: `linear-gradient(90deg, 
                            transparent 0%, 
                            rgba(255, 193, 7, 0.1) 30%, 
                            rgba(255, 152, 0, 0.15) 70%, 
                            transparent 100%
                          )`,
                          animation: `sunbeamSubtle ${8 + i * 0.8}s ease-in-out infinite ${i * 1.5}s`,
                          filter: 'blur(2px)'
                        }}
                      />
                    ))}
                    
                    {/* Continuous subtle warm vignette */}
                    <div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `
                          radial-gradient(ellipse 300px 200px at 60% 40%, 
                            rgba(255, 193, 7, 0.05) 0%, 
                            rgba(255, 152, 0, 0.03) 40%,
                            transparent 70%
                          )
                        `,
                        animation: 'pulse 6s ease-in-out infinite'
                      }}
                    />
                    
                    {/* Additional warm particle effects */}
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={`warm-particle-${i}`}
                        className="absolute w-1 h-1 bg-orange-200 rounded-full opacity-40"
                        style={{
                          left: `${20 + (i % 3) * 25}%`,
                          top: `${25 + (i % 2) * 20}%`,
                          animation: `particleFloat ${4 + (i * 0.4)}s ease-in-out infinite ${i * 0.7}s`
                        }}
                      />
                    ))}
                  </>
                )}
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
                  <motion.div 
                    className={`bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 transition-all duration-500 ${
                      mode === 'cool' ? 'shadow-lg scale-105 shadow-blue-500/20' : 
                      mode === 'warm' ? 'shadow-lg scale-105 shadow-orange-500/20' :
                      'shadow-md'
                    }`}
                  >
                    <div className="text-center">
                      <div
                        className={`text-2xl font-light transition-all duration-500 ${
                          mode === 'cool'
                            ? 'text-blue-600'
                            : mode === 'warm'
                            ? 'text-orange-600'
                            : 'text-gray-600'
                        }`}
                      >
                        {temperature}°C
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">
                        {mode === 'cool'
                          ? 'Cooling'
                          : mode === 'warm'
                          ? 'Warming'
                          : 'Perfect'}
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Cooling effect overlay */}
                {mode === 'cool' && (
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
                      animation: 'pulse 3s ease-in-out infinite'
                    }}
                  />
                )}
              </div>
            </IPhoneFrame>
          </motion.div>
        </div>
      </section>
    </>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-16 text-center bg-white">
      <p className="text-sm text-gray-500">Designed in Dubai. Built for your home.</p>
    </footer>
  );
}

// Main
export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <LightsSection />
      <CurtainsSection />
      <ClimateSection />
      <Footer />
    </main>
  );
}
