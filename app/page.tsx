'use client';

import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/* --------------------------------------------------
   📱 iPhone 15/16 Frame Component
   - Parallax runs ONLY on mobile (disabled on desktop)
   -------------------------------------------------- */
function IPhoneFrame({ children }: { children: React.ReactNode }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile using coarse pointer / touch points (more reliable than width alone)
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const update = () =>
      setIsMobile(mq.matches || navigator.maxTouchPoints > 0 || window.innerWidth < 768);
    update();
    // Older Safari fallback
    try {
      mq.addEventListener('change', update);
      return () => mq.removeEventListener('change', update);
    } catch {
      mq.addListener(update);
      return () => mq.removeListener(update);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ['start end', 'end start'],
  });

  // Gentle parallax for mobile only
  const y = useTransform(scrollYProgress, [0, 1], ['-3%', '3%']);

  return (
    <div className="relative" ref={frameRef}>
      <motion.div
        style={isMobile ? { y } : {}}
        className="relative w-[280px] h-[560px] bg-black rounded-[45px] p-2 shadow-[0_0_0_2px_#1a1a1a,0_0_60px_rgba(0,0,0,0.4)]"
      >
        <div className="relative w-full h-full bg-white rounded-[37px] overflow-hidden">
          <div className="absolute inset-0">{children}</div>

          {/* Subtle screen glare */}
          <div
            className="absolute inset-0 pointer-events-none rounded-[37px]"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 25%, transparent 50%, transparent 75%, rgba(255,255,255,0.02) 100%)',
            }}
          />

          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[85px] h-[22px] bg-black rounded-full z-30">
            <div className="flex items-center justify-center h-full relative">
              <div className="absolute left-3 w-1.5 h-1.5 bg-gray-900 rounded-full" />
              <div className="absolute right-3 w-3 h-0.5 bg-gray-900 rounded-full" />
            </div>
          </div>

          {/* Static time (Apple-like) */}
          <div className="absolute top-2 left-4 text-white text-sm font-medium z-30 drop-shadow-sm">
            9:41
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* --------------------------------------------------
   🟢 Reusable Glass Button
   - Unified style across all sections (same font/weight)
   - Subtle active glow (thin ring, low opacity)
   - Animated label (fade/scale) + haptic-like bounce
   - Enhanced hover: gentle lift + scale
   -------------------------------------------------- */
function GlassButton({
  label,
  active = false,
  onClick,
  disabled = false,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05, y: -2 }} // gentle lift + scale
      whileTap={{ scale: 0.92 }} // haptic bounce
      transition={{ duration: 0.1, ease: 'easeOut' }}
      className={`
        relative px-6 py-3 rounded-full text-sm font-medium
        backdrop-blur-xl border border-white/20 text-white shadow-lg
        transition-all duration-200 cursor-pointer
        ${active ? 'bg-white/18 text-gray-900 ring-1 ring-white/25' : 'bg-white/12'}
      `}
      style={{
        background:
          'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.25 }}
        >
          {label}
        </motion.span>
      </AnimatePresence>

      {/* Glass shine */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%)',
        }}
      />
    </motion.button>
  );
}

/* --------------------------------------------------
   ✨ Hero Section
   -------------------------------------------------- */
function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-6">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl md:text-7xl font-thin text-gray-900 mb-6 tracking-tight">HomiFi</h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light mb-12 max-w-3xl mx-auto">
            Your home. Intelligently connected.
          </p>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex justify-center">
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

/* --------------------------------------------------
   💡 Lights Section
   -------------------------------------------------- */
function LightsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [manualControl, setManualControl] = useState(false);
  const [lightsState, setLightsState] = useState<'off' | 'on'>('off');
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });

  // Auto-on when section enters viewport
  useEffect(() => {
    if (isInView && !manualControl && lightsState === 'off') {
      const timer = setTimeout(() => setLightsState('on'), 600);
      return () => clearTimeout(timer);
    }
  }, [isInView, manualControl, lightsState]);

  return (
    <section ref={containerRef} className="min-h-screen flex items-center py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Copy */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="text-sm uppercase tracking-wider text-blue-600 font-medium mb-3">Perfect Light</div>
          <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-4 leading-tight">
            Every room.<br />Every moment.
          </h2>
          <p className="text-lg text-gray-600 font-light mb-8">Exactly as you want it.</p>
        </motion.div>

        {/* iPhone */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="flex justify-center">
          <IPhoneFrame>
            <div className="relative w-full h-full overflow-hidden bg-black">
              <Image
                src="/Curtains-Closed-Lights-Off.png"
                alt="Room lights off"
                fill
                className="object-cover"
                style={{ objectPosition: '60% center' }}
                quality={100}
              />
              <motion.div className="absolute inset-0" animate={{ opacity: lightsState === 'on' ? 1 : 0 }} transition={{ duration: 1.2 }}>
                <Image
                  src="/Curtains-Closed-Lights-On.png"
                  alt="Room lights on"
                  fill
                  className="object-cover"
                  style={{ objectPosition: '60% center' }}
                  quality={100}
                />
              </motion.div>

              {/* Button */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
                <GlassButton
                  label={lightsState === 'off' ? 'Lights Off' : 'Lights On'}
                  onClick={() => {
                    setManualControl(true);
                    setLightsState(lightsState === 'off' ? 'on' : 'off');
                  }}
                />
              </div>
            </div>
          </IPhoneFrame>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------
   🪟 Curtains Section (video logic intact)
   -------------------------------------------------- */
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

  // Preload initial video (closing)
  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    video.src = '/curtains-closing.mp4';
    const onLoad = () => {
      video.currentTime = 0;
      video.pause();
      setVideoLoaded(true);
    };
    video.addEventListener('loadeddata', onLoad, { once: true });
    video.load();
    return () => video.removeEventListener('loadeddata', onLoad);
  }, []);

  // Auto-close when section becomes visible (once)
  useEffect(() => {
    if (isInView && !manualControl && curtainsState === 'open' && videoLoaded) {
      const timer = setTimeout(() => playCurtainVideo('closing'), 800);
      return () => clearTimeout(timer);
    }
  }, [isInView, manualControl, curtainsState, videoLoaded]);

  // Capture current frame for seamless source swap
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
    } catch {
      // ignore draw errors
    }
  };

  // Play opening/closing video without changing core logic
  const playCurtainVideo = (action: 'opening' | 'closing') => {
    if (!videoRef.current || isAnimating || !videoLoaded) return;
    setIsAnimating(true);

    const video = videoRef.current;
    const newSrc = action === 'opening' ? '/curtains-opening.mp4' : '/curtains-closing.mp4';
    const currentName = (video.src.split('/').pop() || '').toLowerCase();
    const newName = (newSrc.split('/').pop() || '').toLowerCase();

    if (currentName === newName) {
      setShowCanvas(false);
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      captureCurrentFrame();
      const preload = document.createElement('video');
      preload.src = newSrc;
      preload.muted = true;
      preload.playsInline = true;
      preload.preload = 'auto';
      document.body.appendChild(preload);

      const onReady = () => {
        video.src = newSrc;
        video.currentTime = 0;
        const onLoaded = () => {
          setShowCanvas(false);
          video.play().catch(() => {});
          document.body.removeChild(preload);
        };
        video.addEventListener('loadeddata', onLoaded, { once: true });
        video.load();
      };

      preload.addEventListener('canplaythrough', onReady, { once: true });
      preload.load();
    }

    video.onended = () => {
      video.pause();
      setCurtainsState(action === 'opening' ? 'open' : 'closed');
      video.currentTime = Math.max(video.duration - 0.1, 0);
      setIsAnimating(false);
    };
  };

  const handleCycle = () => {
    if (isAnimating || !videoLoaded) return;
    setManualControl(true);
    playCurtainVideo(curtainsState === 'open' ? 'closing' : 'opening');
  };

  const buttonLabel = isAnimating
    ? curtainsState === 'open'
      ? 'Curtains Closing...'
      : 'Curtains Opening...'
    : curtainsState === 'open'
    ? 'Close Curtains'
    : 'Open Curtains';

  return (
    <section ref={containerRef} className="min-h-screen flex items-center py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* iPhone with Curtains video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center order-2 md:order-1"
        >
          <IPhoneFrame>
            <div className="relative w-full h-full overflow-hidden bg-black">
              {!videoLoaded && (
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              <canvas
                ref={canvasRef}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-100 ${
                  showCanvas ? 'opacity-100 z-20' : 'opacity-0 z-10'
                }`}
                style={{ objectPosition: '60% center' }}
              />

              <video
                ref={videoRef}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  videoLoaded ? 'opacity-100' : 'opacity-0'
                } ${showCanvas ? 'z-10' : 'z-20'}`}
                style={{ objectPosition: '60% center' }}
                muted
                playsInline
                preload="auto"
              />
            </div>

            {/* Button with animated label + haptic */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
              <GlassButton label={buttonLabel} onClick={handleCycle} disabled={isAnimating} />
            </div>
          </IPhoneFrame>
        </motion.div>

        {/* Copy */}
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="order-1 md:order-2">
          <div className="text-sm uppercase tracking-wider text-blue-600 mb-3">Perfect Privacy</div>
          <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-4 leading-tight">
            Comfort <br /> and control.
          </h2>
          <p className="text-lg text-gray-600 font-light mb-8">Exactly when you need it.</p>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------
   🌡️ Climate Section – Corrected Version
   -------------------------------------------------- */
function ClimateSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [temperature, setTemperature] = useState(26);
  const [manual, setManual] = useState(false);
  const [started, setStarted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });

  // Auto trigger once in view (26 -> 18)
  useEffect(() => {
    if (isInView && !manual && !started) {
      setStarted(true);
      animateToTemperature(18);
    }
  }, [isInView, manual, started]);

  const animateToTemperature = (targetTemp: number) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const current = temperature;
    const steps = Math.abs(targetTemp - current);
    const dir = targetTemp > current ? 1 : -1;

    let step = 0;
    const interval = setInterval(() => {
      step++;
      const newTemp = current + dir * step;
      setTemperature(newTemp);

      if (step >= steps) {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 400);
  };

  const handleTempChange = (t: number) => {
    if (t === temperature || isAnimating) return;
    setManual(true);
    animateToTemperature(t);
  };

  // Mode + dynamic colors
  const getEffectColors = (t: number) => {
    if (t >= 24) {
      return {
        primary: 'rgba(255, 193, 7, 0.1)',
        secondary: 'rgba(255, 152, 0, 0.15)',
        particle: 'bg-orange-200',
        vignette: 'rgba(255, 193, 7, 0.05), rgba(255, 152, 0, 0.03)',
      };
    } else if (t <= 20) {
      return {
        primary: 'rgba(59, 130, 246, 0.18)',
        secondary: 'rgba(96, 165, 250, 0.25)',
        particle: 'bg-blue-200',
        vignette: 'rgba(59, 130, 246, 0.05), rgba(96, 165, 250, 0.03)',
      };
    } else {
      return {
        primary: 'rgba(156, 163, 175, 0.15)',
        secondary: 'rgba(209, 213, 219, 0.2)',
        particle: 'bg-gray-200',
        vignette: 'rgba(156, 163, 175, 0.04), rgba(209, 213, 219, 0.02)',
      };
    }
  };

  const colors = getEffectColors(temperature);
  const mode = temperature <= 20 ? 'cool' : temperature >= 24 ? 'warm' : 'comfort';

  return (
    <>
      <style jsx global>{`
        @keyframes airFlow {
          0% {
            transform: translateX(-80px) translateY(5px) scale(0.8);
            opacity: 0;
          }
          15% {
            opacity: 0.8;
          }
          85% {
            opacity: 0.8;
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
          15% {
            opacity: 0.8;
          }
          85% {
            opacity: 0.8;
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
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-sm uppercase tracking-wider text-blue-600 mb-3">
              Perfect Climate
            </div>
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-4">
              Always comfortable.
            </h2>
            <p className="text-lg text-gray-600 font-light mb-8">
              The perfect temperature, automatically.
            </p>
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

                {/* Dynamic Effects */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5 }}
                  className="absolute inset-0"
                >
                  {/* Air streams */}
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={`airstream-${i}`}
                      className="absolute pointer-events-none"
                      style={{
                        top: `${15 + i * 18}%`,
                        left: mode === 'cool' ? '-20%' : undefined,
                        right: mode === 'warm' ? '-20%' : undefined,
                        width: '300px',
                        height: '4px',
                        background: `linear-gradient(90deg,
                          transparent 0%,
                          ${colors.primary} 30%,
                          ${colors.secondary} 70%,
                          transparent 100%
                        )`,
                        animation: `${
                          mode === 'cool' ? 'airFlow' : 'sunbeamSubtle'
                        } ${8 + i * 0.8}s ease-in-out infinite ${i * 1.5}s`,
                        filter: 'blur(2px)',
                      }}
                    />
                  ))}

                  {/* Vignette */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `
                        radial-gradient(ellipse 300px 200px at ${
                          mode === 'cool' ? '40%' : '60%'
                        } 40%,
                          ${colors.vignette.split(',')[0]} 0%,
                          ${colors.vignette.split(',')[1]} 40%,
                          transparent 70%
                        )
                      `,
                      animation: 'pulse 6s ease-in-out infinite',
                    }}
                  />

                  {/* Particles */}
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={`particle-${i}`}
                      className={`absolute w-1 h-1 ${colors.particle} rounded-full opacity-40`}
                      style={{
                        left: `${20 + (i % 3) * 25}%`,
                        top: `${25 + (i % 2) * 20}%`,
                        animation: `particleFloat ${
                          4 + i * 0.4
                        }s ease-in-out infinite ${i * 0.7}s`,
                      }}
                    />
                  ))}
                </motion.div>

                {/* Wall-mounted Smart Thermostat */}
                <div className="absolute top-[40%] left-14 z-30">
                  <div className="relative">
                    <div className="w-8 h-8 backdrop-blur-xl bg-white/20 rounded-full shadow-lg border border-white/30">
                      <div
                        className="absolute inset-0.5 rounded-full border"
                        style={{
                          borderColor:
                            mode === 'cool'
                              ? 'rgba(59, 130, 246, 0.6)'
                              : mode === 'warm'
                              ? 'rgba(245, 158, 11, 0.6)'
                              : 'rgba(107, 114, 128, 0.6)',
                          boxShadow:
                            mode === 'cool'
                              ? '0 0 8px rgba(59, 130, 246, 0.3)'
                              : mode === 'warm'
                              ? '0 0 8px rgba(245, 158, 11, 0.3)'
                              : '0 0 8px rgba(107, 114, 128, 0.2)',
                        }}
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-[10px] font-medium text-white">
                          {temperature}°
                        </div>
                      </div>
                      <div
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)',
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/5 rounded-full blur-sm translate-x-0.5 translate-y-0.5 -z-10" />
                  </div>
                </div>

                {/* Mode Buttons */}
                <div className="absolute inset-x-0 bottom-0 z-30">
                  <div className="flex justify-center pb-8 px-4">
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => handleTempChange(18)}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.92 }}
                        transition={{ duration: 0.1, ease: 'easeOut' }}
                        className={`
                          relative px-4 py-2 rounded-full text-sm font-medium
                          backdrop-blur-xl border border-white/20 text-white shadow-lg
                          transition-all duration-200 cursor-pointer
                          ${temperature === 18 ? 'bg-white/18 text-gray-900 ring-1 ring-white/25' : 'bg-white/12'}
                        `}
                      >
                        Cool
                        <div
                          className="absolute inset-0 rounded-full pointer-events-none"
                          style={{
                            background:
                              'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%)',
                          }}
                        />
                      </motion.button>

                      <motion.button
                        onClick={() => handleTempChange(22)}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.92 }}
                        transition={{ duration: 0.1, ease: 'easeOut' }}
                        className={`
                          relative px-4 py-2 rounded-full text-sm font-medium
                          backdrop-blur-xl border border-white/20 text-white shadow-lg
                          transition-all duration-200 cursor-pointer
                          ${temperature === 22 ? 'bg-white/18 text-gray-900 ring-1 ring-white/25' : 'bg-white/12'}
                        `}
                      >
                        Comfort
                        <div
                          className="absolute inset-0 rounded-full pointer-events-none"
                          style={{
                            background:
                              'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%)',
                          }}
                        />
                      </motion.button>

                      <motion.button
                        onClick={() => handleTempChange(26)}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.92 }}
                        transition={{ duration: 0.1, ease: 'easeOut' }}
                        className={`
                          relative px-4 py-2 rounded-full text-sm font-medium
                          backdrop-blur-xl border border-white/20 text-white shadow-lg
                          transition-all duration-200 cursor-pointer
                          ${temperature === 26 ? 'bg-white/18 text-gray-900 ring-1 ring-white/25' : 'bg-white/12'}
                        `}
                      >
                        Warm
                        <div
                          className="absolute inset-0 rounded-full pointer-events-none"
                          style={{
                            background:
                              'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%)',
                          }}
                        />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </IPhoneFrame>
          </motion.div>
        </div>
      </section>
    </>
  );
}


/* --------------------------------------------------
   🔐 Security Section
   -------------------------------------------------- */
function SecuritySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [doorbell, setDoorbell] = useState(false);
  const [manualControl, setManualControl] = useState(false);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });

  // Auto trigger doorbell when section enters viewport
  useEffect(() => {
    if (isInView && !manualControl && !doorbell) {
      const timer = setTimeout(() => setDoorbell(true), 800);
      return () => clearTimeout(timer);
    }
  }, [isInView, manualControl, doorbell]);

  const handleAnswer = () => {
    setManualControl(true);
    // Simulate answering call
  };

  const handleUnlock = () => {
    setManualControl(true);
    setDoorbell(false);
  };

  const handleIgnore = () => {
    setManualControl(true);
    setDoorbell(false);
  };

  return (
    <section ref={containerRef} className="min-h-screen flex items-center py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Copy */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }} 
          viewport={{ once: true }}
        >
          <div className="text-sm uppercase tracking-wider text-blue-600 font-medium mb-3">Perfect Security</div>
          <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-4 leading-tight">
            Your eyes and ears<br />at the door.
          </h2>
          <p className="text-lg text-gray-600 font-light mb-8">Know who's there, wherever you are.</p>
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
                src="/Curtains-Open-Lights-On.png"
                alt="Front door view"
                fill
                className="object-cover"
                style={{ objectPosition: '45% center' }}
                quality={100}
              />

              {/* Doorbell Feed Overlay */}
              <motion.div 
                className="absolute inset-0 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: doorbell ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                
                {/* Doorbell Feed Card */}
                <div className="absolute top-16 left-4 right-4">
                  <motion.div 
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: doorbell ? 1 : 0.9, y: doorbell ? 0 : 20 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-2xl"
                  >
                    {/* Header */}
                    <div className="flex items-center mb-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />
                      <span className="text-sm font-medium text-gray-900">Front Door</span>
                      <span className="text-xs text-gray-500 ml-auto">Live</span>
                    </div>
                    
                    {/* Mock video feed */}
                    <div className="w-full h-32 bg-gray-200 rounded-lg mb-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-gray-300 to-gray-400" />
                      <div className="absolute bottom-2 left-2 text-xs font-mono text-white bg-black/50 px-2 py-1 rounded">
                        12:34 PM
                      </div>
                      {/* Simulated person silhouette */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-24 bg-gray-600 rounded-t-full opacity-60" />
                    </div>
                    
                    {/* Notification text */}
                    <p className="text-sm text-gray-700 mb-4">Someone's at the door</p>
                    
                    {/* Action buttons */}
                    <div className="flex gap-2">
                      <button 
                        onClick={handleIgnore}
                        className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg"
                      >
                        Ignore
                      </button>
                      <button 
                        onClick={handleUnlock}
                        className="flex-1 py-2 px-3 bg-blue-500 text-white text-sm font-medium rounded-lg"
                      >
                        Unlock
                      </button>
                      <button 
                        onClick={handleAnswer}
                        className="flex-1 py-2 px-3 bg-green-500 text-white text-sm font-medium rounded-lg"
                      >
                        Answer
                      </button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Manual trigger button when no doorbell */}
              {!doorbell && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
                  <GlassButton
                    label="Doorbell Ring"
                    onClick={() => {
                      setManualControl(true);
                      setDoorbell(true);
                    }}
                  />
                </div>
              )}
            </div>
          </IPhoneFrame>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------
   📺 Apple TV Interlude
   -------------------------------------------------- */
function AppleTVInterlude() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showDoorbell, setShowDoorbell] = useState(false);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  // Auto show doorbell popup when in view
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShowDoorbell(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section ref={containerRef} className="min-h-screen flex items-center py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Apple TV Scene */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }} 
            viewport={{ once: true }}
            className="relative"
          >
            {/* Living room background */}
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/Curtains-Open-Lights-On.png"
                alt="Living room with Apple TV"
                fill
                className="object-cover"
                style={{ objectPosition: '30% center' }}
                quality={100}
              />
              
              {/* Apple TV on wall */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-48 h-28 bg-black rounded-lg shadow-lg">
                {/* TV Screen */}
                <div className="w-full h-full bg-gray-900 rounded-lg p-2">
                  {/* Home app camera grid */}
                  <div className="w-full h-full bg-gray-800 rounded p-2">
                    <div className="grid grid-cols-2 gap-1 h-full">
                      <div className="bg-gray-700 rounded text-[6px] text-white p-1">Kitchen</div>
                      <div className="bg-gray-700 rounded text-[6px] text-white p-1">Bedroom</div>
                      <div className="bg-gray-700 rounded text-[6px] text-white p-1">Garden</div>
                      <div className="bg-gray-700 rounded text-[6px] text-white p-1">Garage</div>
                    </div>
                  </div>
                </div>
                
                {/* Doorbell popup */}
                <AnimatePresence>
                  {showDoorbell && (
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="absolute -top-2 -right-2 w-20 h-12 bg-white rounded-lg shadow-xl border border-gray-200 p-1"
                    >
                      <div className="w-full h-full bg-gray-300 rounded text-[4px] text-gray-700 flex flex-col justify-between p-1">
                        <div className="flex items-center justify-between">
                          <span>Front Door</span>
                          <span className="text-red-500">●*</span>
                        </div>
                        <div className="bg-gray-600 rounded h-4 relative">
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-3 bg-gray-800 rounded-t opacity-60" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }} 
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6 leading-tight">
              See everything on<br />the big screen.
            </h2>
            <p className="text-lg text-gray-600 font-light mb-8">
              Doorbell alerts appear instantly on Apple TV.
            </p>
          </motion.div>
        </div>
        
        {/* Disclaimer */}
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ duration: 0.6, delay: 0.5 }} 
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-xs text-gray-400">
            *Available only with supported Apple Home enabled video doorbells.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------
   ⚪ Footer
   -------------------------------------------------- */
function Footer() {
  return (
    <footer className="py-16 text-center bg-white">
      <p className="text-sm text-gray-500">Designed in Dubai. Built for your home.</p>
    </footer>
  );
}

/* --------------------------------------------------
   🏠 Main
   -------------------------------------------------- */
export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <LightsSection />
      <CurtainsSection />
      <ClimateSection />
      <SecuritySection />
      <AppleTVInterlude />
      <Footer />
    </main>
  );
}
