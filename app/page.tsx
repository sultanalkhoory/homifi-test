'use client';

import { motion, useInView } from 'framer-motion';
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
  onClick
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

// Lights Section
function LightsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [manualControl, setManualControl] = useState(false);
  const [lightsState, setLightsState] = useState<'off' | 'on'>('off');
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  
  // Timer-based animation when section comes into view
  useEffect(() => {
    if (isInView && !manualControl && lightsState === 'off') {
      const timer = setTimeout(() => {
        setLightsState('on');
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isInView, manualControl, lightsState]);
  
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
        >
          <IPhoneFrame>
            <div className="relative w-full h-full overflow-hidden">
              {/* Lights Off Image */}
              <div className="absolute inset-0 bg-black">
                <Image
                  src="/Curtains-Closed-Lights-Off.png"
                  alt="Room with lights off"
                  fill
                  quality={100}
                  priority
                  className="object-cover"
                  style={{ 
                    objectFit: 'cover',
                    objectPosition: '60% center',
                    width: '100%',
                    height: '100%'
                  }}
                />
              </div>
              
              {/* Lights On Image */}
              <motion.div
                className="absolute inset-0"
                animate={{ opacity: lightsState === 'on' ? 1 : 0 }}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Image
                  src="/Curtains-Closed-Lights-On.png"
                  alt="Room with lights on"
                  fill
                  quality={100}
                  className="object-cover"
                  style={{ 
                    objectFit: 'cover',
                    objectPosition: '60% center',
                    width: '100%',
                    height: '100%'
                  }}
                />
              </motion.div>
            </div>
          </IPhoneFrame>
        </motion.div>
      </div>
    </section>
  );
}

// Simple Curtains Section
function CurtainsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [curtainsState, setCurtainsState] = useState<'open' | 'closed'>('open');
  const [isAnimating, setIsAnimating] = useState(false);
  const [manualControl, setManualControl] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  
  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Initialize with curtains-closing video, paused at first frame
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.src = '/curtains-closing.mp4';
      
      const handleLoad = () => {
        video.currentTime = 0;
        video.pause();
        setVideoLoaded(true);
      };
      
      video.addEventListener('loadeddata', handleLoad);
      video.addEventListener('loadedmetadata', handleLoad);
      video.load();
      
      return () => {
        video.removeEventListener('loadeddata', handleLoad);
        video.removeEventListener('loadedmetadata', handleLoad);
      };
    }
  }, []);
  
  // Auto-close curtains when scrolled into view
  useEffect(() => {
    if (isInView && !manualControl && curtainsState === 'open' && videoLoaded && !isAnimating) {
      const timer = setTimeout(() => {
        closeCurtains();
      }, isMobile ? 1200 : 800); // Longer delay on mobile
      return () => clearTimeout(timer);
    }
  }, [isInView, manualControl, curtainsState, videoLoaded, isAnimating, isMobile]);
  
  const closeCurtains = () => {
    if (!videoRef.current || isAnimating) return;
    
    setIsAnimating(true);
    const video = videoRef.current;
    
    // For mobile, ensure video is ready
    if (isMobile) {
      video.load();
    }
    
    video.src = '/curtains-closing.mp4';
    
    const playVideo = () => {
      video.currentTime = 0;
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Video started successfully
          })
          .catch(() => {
            // Autoplay failed, but continue
            setIsAnimating(false);
            setCurtainsState('closed');
          });
      }
    };
    
    if (video.readyState >= 2) {
      // Video is already loaded
      playVideo();
    } else {
      // Wait for video to load
      const handleLoaded = () => {
        playVideo();
        video.removeEventListener('loadeddata', handleLoaded);
        video.removeEventListener('canplay', handleLoaded);
      };
      
      video.addEventListener('loadeddata', handleLoaded);
      video.addEventListener('canplay', handleLoaded);
      video.load();
    }
    
    video.onended = () => {
      video.pause();
      setCurtainsState('closed');
      setIsAnimating(false);
    };
  };
  
  const openCurtains = () => {
    if (!videoRef.current || isAnimating) return;
    
    setIsAnimating(true);
    const video = videoRef.current;
    
    if (isMobile) {
      video.load();
    }
    
    video.src = '/curtains-opening.mp4';
    
    const playVideo = () => {
      video.currentTime = 0;
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Video started successfully
          })
          .catch(() => {
            // Autoplay failed
            setIsAnimating(false);
            setCurtainsState('open');
          });
      }
    };
    
    if (video.readyState >= 2) {
      playVideo();
    } else {
      const handleLoaded = () => {
        playVideo();
        video.removeEventListener('loadeddata', handleLoaded);
        video.removeEventListener('canplay', handleLoaded);
      };
      
      video.addEventListener('loadeddata', handleLoaded);
      video.addEventListener('canplay', handleLoaded);
      video.load();
    }
    
    video.onended = () => {
      video.pause();
      setCurtainsState('open');
      setIsAnimating(false);
    };
  };
  
  const handleManualToggle = (action: 'opening' | 'closing') => {
    if (isAnimating || !videoLoaded) return;
    
    if (action === 'closing' && curtainsState === 'closed') return;
    if (action === 'opening' && curtainsState === 'open') return;
    
    setManualControl(true);
    
    if (action === 'closing') {
      closeCurtains();
    } else {
      openCurtains();
    }
  };
  
  return (
    <section ref={containerRef} className="min-h-screen flex items-center py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* iPhone with Video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          viewport={{ once: true }}
          className="flex justify-center order-2 md:order-1"
        >
          <IPhoneFrame>
            <div className="relative w-full h-full overflow-hidden bg-black">
              {!videoLoaded && (
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              
              <video
                ref={videoRef}
                className={`w-full h-full object-cover transition-opacity duration-300 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ objectPosition: '60% center' }}
                muted
                playsInline
                preload={isMobile ? 'metadata' : 'auto'}
                webkit-playsinline="true"
                x5-playsinline="true"
                disablePictureInPicture
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
          <p className="text-lg text-gray-600 font-light mb-8">
            Exactly when you need it.
          </p>
          
          <div className="flex gap-3">
            <GlassButton 
              active={curtainsState === 'closed'}
              onClick={() => handleManualToggle('closing')}
            >
              Close Curtains
            </GlassButton>
            <GlassButton 
              active={curtainsState === 'open'}
              onClick={() => handleManualToggle('opening')}
            >
              Open Curtains
            </GlassButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Climate Section with AC Breeze Effects
function ClimateSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [temperature, setTemperature] = useState(22);
  const [isActive, setIsActive] = useState(false);
  const [manualControl, setManualControl] = useState(false);
  
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  
  // Auto-activate climate when scrolled into view
  useEffect(() => {
    if (isInView && !manualControl && !isActive) {
      const timer = setTimeout(() => {
        setIsActive(true);
        setTemperature(20);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isInView, manualControl, isActive]);
  
  const handleTempChange = (newTemp: number) => {
    setManualControl(true);
    setTemperature(newTemp);
    setIsActive(newTemp !== 22);
  };
  
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
      `}</style>
      
      <section ref={containerRef} className="min-h-screen flex items-center py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            viewport={{ once: true }}
          >
            <div className="text-sm uppercase tracking-wider text-blue-600 font-medium mb-3">
              Perfect Climate
            </div>
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-4 leading-tight">
              Always<br />
              comfortable.
            </h2>
            <p className="text-lg text-gray-600 font-light mb-8">
              The perfect temperature, automatically.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <span className="text-gray-700 font-medium">Temperature</span>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleTempChange(Math.max(16, temperature - 1))}
                    className="w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center text-blue-600 font-bold transition-colors"
                  >
                    −
                  </button>
                  <span className={`text-2xl font-light text-gray-800 min-w-[60px] text-center transition-all duration-500 ${isActive ? 'text-blue-600' : ''}`}>
                    {temperature}°C
                  </span>
                  <button
                    onClick={() => handleTempChange(Math.min(30, temperature + 1))}
                    className="w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center text-blue-600 font-bold transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex gap-2">
                <GlassButton active={temperature === 18} onClick={() => handleTempChange(18)}>Cool</GlassButton>
                <GlassButton active={temperature === 22} onClick={() => handleTempChange(22)}>Comfort</GlassButton>
                <GlassButton active={temperature === 26} onClick={() => handleTempChange(26)}>Warm</GlassButton>
              </div>
            </div>
          </motion.div>
          
          {/* iPhone with Climate Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <IPhoneFrame>
              <div className="relative w-full h-full overflow-hidden">
                {/* Room Image */}
                <Image
                  src="/Curtains-Open-Lights-On.png"
                  alt="Room with climate control"
                  fill
                  quality={100}
                  className="object-cover"
                  style={{ objectPosition: '45% center' }}
                />
                
                {/* Animated Air Streams - Wavy and Subtle */}
                {isActive && (
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
                          animation: `airFlow ${4 + i * 0.5}s ease-in-out infinite ${i * 0.8}s`
                        }}
                      >
                        <svg width="280" height="20" viewBox="0 0 280 20" className="w-full h-full">
                          <path
                            d={`M 0,10 Q 70,${5 + i * 2} 140,10 T 280,10`}
                            stroke="rgba(59, 130, 246, 0.3)"
                            strokeWidth="2"
                            fill="none"
                            style={{
                              filter: 'blur(1px)',
                              strokeLinecap: 'round'
                            }}
                          />
                        </svg>
                      </div>
                    ))}
                    
                    {/* Floating particles - Reduced */}
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
                
                {/* Temperature Display */}
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
                  <motion.div 
                    className={`bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 transition-all duration-500 ${
                      isActive ? 'shadow-lg scale-105 shadow-blue-500/20' : 'shadow-md'
                    }`}
                    animate={isActive ? { 
                      boxShadow: [
                        '0 10px 25px rgba(59, 130, 246, 0.2)',
                        '0 10px 35px rgba(59, 130, 246, 0.3)',
                        '0 10px 25px rgba(59, 130, 246, 0.2)'
                      ]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="text-center">
                      <div className={`text-2xl font-light transition-all duration-500 ${
                        isActive ? 'text-blue-600' : 'text-gray-600'
                      }`}>
                        {temperature}°C
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">
                        {temperature < 20 ? 'Cooling' : temperature > 24 ? 'Warming' : 'Perfect'}
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Cooling effect overlay */}
                {isActive && temperature < 22 && (
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
      <ClimateSection />
      <Footer />
    </main>
  );
}
