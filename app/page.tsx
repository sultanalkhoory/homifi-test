'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/* --------------------------------------------------
   📱 iPhone 15/16 Frame Component
   -------------------------------------------------- */
function IPhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="relative w-[280px] h-[560px] bg-black rounded-[45px] p-2 shadow-[0_0_0_2px_#1a1a1a,0_0_60px_rgba(0,0,0,0.4)]">
        <div className="relative w-full h-full bg-white rounded-[37px] overflow-hidden">
          <div className="absolute inset-0">{children}</div>
          {/* Screen glare overlay */}
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
          {/* Time (static Apple-style) */}
          <div className="absolute top-2 left-4 text-white text-sm font-medium z-20 drop-shadow-sm">
            9:41
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------
   🟢 Reusable Glass Button
   - Unified style across Lights / Curtains / Climate
   - Includes haptic-like bounce + label animation
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
      whileTap={{ scale: 0.92 }} // haptic-like bounce
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`
        relative px-6 py-3 rounded-full text-sm font-medium
        backdrop-blur-xl border border-white/20
        transition-all duration-300 cursor-pointer
        text-white shadow-lg
        ${
          active
            ? 'bg-white/25 text-gray-800 ring-2 ring-white/40'
            : 'bg-white/12 hover:bg-white/18'
        }
      `}
      style={{
        background:
          'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)',
      }}
    >
      {/* Animated label for smooth text transitions */}
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

      {/* Glass shine overlay */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%)',
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

/* --------------------------------------------------
   💡 Lights Section
   -------------------------------------------------- */
function LightsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [manualControl, setManualControl] = useState(false);
  const [lightsState, setLightsState] = useState<'off' | 'on'>('off');
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });

  // Auto-on animation when section scrolls into view
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
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
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
        </motion.div>

        {/* iPhone with Light States */}
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
                quality={100}
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
                  quality={100}
                />
              </motion.div>

              {/* Glass Button */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
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
   🪟 Curtains Section
   - Keeps video logic untouched
   - Refined button: animated label + haptic feedback
   -------------------------------------------------- */
function CurtainsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [curtainsState, setCurtainsState] = useState<"open" | "closed">("open");
  const [isAnimating, setIsAnimating] = useState(false);
  const [manualControl, setManualControl] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);

  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  // preload curtain video on mount
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.src = "/curtains-closing.mp4";
      video.addEventListener("loadeddata", () => {
        video.currentTime = 0;
        video.pause();
        setVideoLoaded(true);
      });
      video.load();
    }
  }, []);

  // auto close once in view
  useEffect(() => {
    if (isInView && !manualControl && curtainsState === "open" && videoLoaded) {
      const timer = setTimeout(() => {
        playCurtainVideo("closing");
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isInView, manualControl, curtainsState, videoLoaded]);

  const captureCurrentFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = video.videoWidth || 280;
    canvas.height = video.videoHeight || 560;
    try {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      setShowCanvas(true);
    } catch {
      console.log("Could not capture frame");
    }
  };

  const playCurtainVideo = (action: "opening" | "closing") => {
    if (!videoRef.current || isAnimating || !videoLoaded) return;
    setIsAnimating(true);
    const video = videoRef.current;
    const newSrc =
      action === "opening" ? "/curtains-opening.mp4" : "/curtains-closing.mp4";

    const currentSrc = video.src.split("/").pop() || "";
    const newSrcFile = newSrc.split("/").pop() || "";

    if (currentSrc === newSrcFile) {
      setShowCanvas(false);
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      captureCurrentFrame();
      const preloadVideo = document.createElement("video");
      preloadVideo.src = newSrc;
      preloadVideo.muted = true;
      preloadVideo.playsInline = true;
      preloadVideo.preload = "auto";
      document.body.appendChild(preloadVideo);
      preloadVideo.addEventListener(
        "canplaythrough",
        () => {
          video.src = newSrc;
          video.currentTime = 0;
          video.addEventListener(
            "loadeddata",
            () => {
              setShowCanvas(false);
              video.play().catch(() => {});
              document.body.removeChild(preloadVideo);
            },
            { once: true }
          );
          video.load();
        },
        { once: true }
      );
      preloadVideo.load();
    }

    video.onended = () => {
      video.pause();
      setCurtainsState(action === "opening" ? "open" : "closed");
      video.currentTime = video.duration - 0.1;
      setIsAnimating(false);
    };
  };

  const handleCycle = () => {
    if (isAnimating || !videoLoaded) return;
    setManualControl(true);
    playCurtainVideo(curtainsState === "open" ? "closing" : "opening");
  };

  // Button label logic with intermediate states
  const buttonLabel = isAnimating
    ? curtainsState === "open"
      ? "Curtains Closing..."
      : "Curtains Opening..."
    : curtainsState === "open"
    ? "Close Curtains"
    : "Open Curtains";

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center py-20 bg-gray-50"
    >
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* iPhone with Curtains Video */}
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
                  <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <canvas
                ref={canvasRef}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-100 ${
                  showCanvas ? "opacity-100 z-20" : "opacity-0 z-10"
                }`}
                style={{ objectPosition: "60% center" }}
              />
              <video
                ref={videoRef}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  videoLoaded ? "opacity-100" : "opacity-0"
                } ${showCanvas ? "z-10" : "z-20"}`}
                style={{ objectPosition: "60% center" }}
                muted
                playsInline
                preload="auto"
              />
            </div>

            {/* Glass Button with animated label */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
              <GlassButton
                label={buttonLabel}
                onClick={handleCycle}
                disabled={isAnimating}
              />
            </div>
          </IPhoneFrame>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="order-1 md:order-2"
        >
          <div className="text-sm uppercase tracking-wider text-blue-600 mb-3">
            Perfect Privacy
          </div>
          <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-4 leading-tight">
            Comfort <br />
            and control.
          </h2>
          <p className="text-lg text-gray-600 font-light mb-8">
            Exactly when you need it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------
   🌡️ Climate Section
   - Balanced grouping: bubble + mode buttons
   - Bubble neutral glass, only text color changes
   - Same GlassButton + label animation + haptic
   -------------------------------------------------- */
function ClimateSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [temperature, setTemperature] = useState(26);
  const [manual, setManual] = useState(false);
  const [started, setStarted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });

  // auto transition when scrolled into view
  useEffect(() => {
    if (isInView && !manual && !started) {
      setStarted(true);
      animateToTemperature(18); // auto-cool
    }
  }, [isInView, manual, started]);

  const animateToTemperature = (targetTemp: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    const currentTemp = temperature;
    const steps = Math.abs(targetTemp - currentTemp);
    const direction = targetTemp > currentTemp ? 1 : -1;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const newTemp = currentTemp + direction * step;
      setTemperature(newTemp);
      if (step >= steps) {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 400);
  };

  const handleTempChange = (newTemp: number) => {
    if (temperature === newTemp || isAnimating) return;
    setManual(true);
    animateToTemperature(newTemp);
  };

  // determine climate mode
  const mode =
    temperature <= 20 ? "cool" : temperature >= 24 ? "warm" : "comfort";

  // text color only (bubble stays neutral)
  const textColor =
    mode === "cool"
      ? "text-blue-600"
      : mode === "warm"
      ? "text-amber-600"
      : "text-gray-800";

  return (
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
                style={{ objectPosition: "45% center" }}
              />

              {/* Group: bubble + buttons */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30">
                {/* Bubble */}
                <motion.div
                  className="relative px-5 py-2.5 rounded-full backdrop-blur-xl border border-white/20 bg-white/30 shadow-md"
                  animate={{
                    scale: mode === "comfort" ? 1 : 1.05,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                >
                  <div className={`text-center ${textColor}`}>
                    <div className="text-xl font-light">{temperature}°C</div>
                    <div className="text-[10px] uppercase tracking-wide opacity-80">
                      {mode === "cool"
                        ? "Cooling"
                        : mode === "warm"
                        ? "Warming"
                        : "Comfort"}
                    </div>
                  </div>
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%)",
                    }}
                  />
                </motion.div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <GlassButton
                    label="Cool"
                    active={temperature === 18}
                    onClick={() => handleTempChange(18)}
                  />
                  <GlassButton
                    label="Comfort"
                    active={temperature === 22}
                    onClick={() => handleTempChange(22)}
                  />
                  <GlassButton
                    label="Warm"
                    active={temperature === 26}
                    onClick={() => handleTempChange(26)}
                  />
                </div>
              </div>
            </div>
          </IPhoneFrame>
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
      <p className="text-sm text-gray-500">
        Designed in Dubai. Built for your home.
      </p>
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
      <Footer />
    </main>
  );
}

