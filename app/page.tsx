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

// Curtains Section - KEEPING OUR WORKING VERSION
function CurtainsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [curtainsState, setCurtainsState] = useState<'open' | 'closed'>('open');
  const [isAnimating, setIsAnimating] = useState(false);
  const [manualControl, setManualControl] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  
  // Initialize video with first frame
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.src = '/curtains-closing.mp4';
      
      video.addEventListener('loadeddata', () => {
        video.currentTime = 0;
        video.pause();
        setVideoLoaded(true);
      });
      
      video.load();
    }
  }, []);
  
  // Auto-play curtains closing on scroll
  useEffect(() => {
    if (isInView && !manualControl && curtainsState === 'open' && videoLoaded) {
      const timer = setTimeout(() => {
        playCurtainVideo('closing');
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isInView, manualControl, curtainsState, videoLoaded]);
  
  // Capture current frame to canvas
  const captureCurrentFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    canvas.width = video.videoWidth || 280;
    canvas.height = video.videoHeight || 560;
    
    try {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      setShowCanvas(true);
    } catch (error) {
      console.log('Could not capture frame');
    }
  };
  
  const playCurtainVideo = (action: 'opening' | 'closing') => {
    if (!videoRef.current || isAnimating || !videoLoaded) return;
    
    setIsAnimating(true);
    const video = videoRef.current;
    const newSrc = action === 'opening' ? '/curtains-opening.mp4' : '/curtains-closing.mp4';
    
    const currentSrc = video.src.split('/').pop() || '';
    const newSrcFile = newSrc.split('/').pop() || '';
    
    if (currentSrc === newSrcFile) {
      // Same video, just replay from beginning
      setShowCanvas(false);
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      // Different video - capture current frame first
      captureCurrentFrame();
      
      // Create preload video
      const preloadVideo = document.createElement('video');
      preloadVideo.src = newSrc;
      preloadVideo.muted = true;
      preloadVideo.playsInline = true;
      preloadVideo.preload = 'auto';
      preloadVideo.style.position = 'absolute';
      preloadVideo.style.top = '-9999px';
      preloadVideo.style.left = '-9999px';
      document.body.appendChild(preloadVideo);
      
      preloadVideo.addEventListener('canplaythrough', () => {
        // Switch video source
        video.src = newSrc;
        video.currentTime = 0;
        
        video.addEventListener('loadeddata', () => {
          setShowCanvas(false); // Hide canvas, show video
          video.play().catch(() => {});
          document.body.removeChild(preloadVideo);
        }, { once: true });
        
        video.load();
      }, { once: true });
      
      preloadVideo.load();
    }
    
    video.onended = () => {
      video.pause();
      // Set the correct end state based on action
      setCurtainsState(action === 'opening' ? 'open' : 'closed');
      // FIXED: Position video at appropriate frame for BOTH actions
      video.currentTime = video.duration - 0.1; // Near end for BOTH states
      setIsAnimating(false);
    };
  };
  
  const handleManualToggle = (action: 'opening' | 'closing') => {
    if (isAnimating || !videoLoaded) return;
    
    // Don't do anything if already in desired state
    if (action === 'closing' && curtainsState === 'closed') return;
    if (action === 'opening' && curtainsState === 'open') return;
    
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
            <div className="relative w-full h-full overflow-hidden bg-black">
              {/* Loading placeholder */}
              {!videoLoaded && (
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              
              {/* Canvas for holding current frame */}
              <canvas
                ref={canvasRef}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-100 ${showCanvas ? 'opacity-100 z-20' : 'opacity-0 z-10'}`}
                style={{ objectPosition: '60% center' }}
              />
              
              {/* Video */}
              <video
                ref={videoRef}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${videoLoaded ? 'opacity-100' : 'opacity-0'} ${showCanvas ? 'z-10' : 'z-20'}`}
                style={{ objectPosition: '60% center' }}
                muted
                playsInline
                preload="auto"
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
          
          {/* iOS 18 Glass Controls */}
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
                {/* Cool Mode - Continuous Air Streams */}
                {mode === 'cool' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="absolute inset-0"
                  >
                    {/* Continuous air streams - matching warm mode intensity */}
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={`airstream-${i}`}
                        className="absolute pointer-events-none"
                        style={{
                          top: `${15 + i * 18}%`,
                          left: '-20%',
                          width: '300px',
                          height: '4px',
                          background: `linear-gradient(90deg, 
                            transparent 0%, 
                            rgba(59, 130, 246, 0.1) 30%, 
                            rgba(96, 165, 250, 0.15) 70%, 
                            transparent 100%
                          )`,
                          animation: `airFlow ${8 + i * 0.8}s ease-in-out infinite ${i * 1.5}s`,
                          filter: 'blur(2px)'
                        }}
                      />
                    ))}
                    
                    {/* Continuous subtle cool vignette */}
                    <div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `
                          radial-gradient(ellipse 300px 200px at 40% 40%, 
                            rgba(59, 130, 246, 0.05) 0%, 
                            rgba(96, 165, 250, 0.03) 40%,
                            transparent 70%
                          )
                        `,
                        animation: 'pulse 6s ease-in-out infinite'
                      }}
                    />
                    
                    {/* Cool particle effects - matching warm mode */}
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={`cool-particle-${i}`}
                        className="absolute w-1 h-1 bg-blue-200 rounded-full opacity-40"
                        style={{
                          left: `${20 + (i % 3) * 25}%`,
                          top: `${25 + (i % 2) * 20}%`,
                          animation: `particleFloat ${4 + (i * 0.4)}s ease-in-out infinite ${i * 0.7}s`
                        }}
                      />
                    ))}
                  </motion.div>
                )}
                {mode === 'warm' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="absolute inset-0"
                  >
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
                  </motion.div>
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
