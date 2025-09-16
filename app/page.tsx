'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Page() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isOpen, setIsOpen] = useState(true); // Curtains start open

  // Reusable iPhone Frame for Images
  const IphoneFrame = ({ scenes, active }: any) => (
    <div className="iphone-frame shadow-iphone">
      <div className="iphone-notch" />
      <div className="iphone-screen relative">
        <div className="absolute inset-0 screen-gradient" />
        <AnimatePresence mode="wait">
          {scenes.map(
            (s: any) =>
              s.id === active && (
                <motion.div
                  key={s.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    priority
                    sizes="360px"
                    style={{ objectFit: 'cover' }}
                  />
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  // Reusable Feature Section
  const FeatureSection = ({
    kicker,
    title,
    subtitle,
    scenes,
    left,
    buttons,
  }: any) => {
    const [active, setActive] = useState(scenes[0]?.id);
    return (
      <section className="section">
        <div
          className={`mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 ${
            left ? 'md:[&>*:first-child]:order-2' : ''
          }`}
        >
          <div>
            <div className="kicker">{kicker}</div>
            <h2 className="h1">{title}</h2>
            <p className="sub">{subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {buttons.map((b: any) => (
                <button
                  key={b.sceneId}
                  className={`btn ${
                    b.tone === 'dark' ? 'btn-dark' : 'btn-light'
                  } ${active === b.sceneId ? 'ring-2 ring-neutral-400' : ''}`}
                  onClick={() => setActive(b.sceneId)}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <IphoneFrame scenes={scenes} active={active} />
          </motion.div>
        </div>
      </section>
    );
  };

  // Control video playback
  const handleClose = () => {
    if (videoRef.current && isOpen) {
      videoRef.current.currentTime = 0;
      videoRef.current.playbackRate = 1.0; // play forward
      videoRef.current.play();
      setIsOpen(false);
    }
  };

const handleOpen = () => {
  if (videoRef.current && !isOpen) {
    const video = videoRef.current;
    video.pause();
    video.currentTime = video.duration; // jump to end (closed)
    setIsOpen(true);

    const duration = video.duration;
    const fps = 60; // target frames per second for smoothness
    const stepSize = duration / (fps * 2); 
    // 👆 controls speed. "2" means ~2 seconds to fully rewind.
    // Increase to 3 for ~3s, etc.

    const step = () => {
      if (!videoRef.current) return;
      if (video.currentTime <= 0.05) {
        video.pause();
        video.currentTime = 0; // snap cleanly to start
        return;
      }
      video.currentTime -= stepSize;
      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }
};

  // Pause video automatically at start or end
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (!isOpen && video.currentTime >= video.duration) {
        video.pause(); // pause at end when closed
      }
      if (isOpen && video.currentTime <= 0.05) {
        video.pause(); // pause at start when open
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [isOpen]);

  return (
    <main className="[--pad:clamp(16px,4vw,48px)]">
      {/* HERO */}
      <section className="section pt-28 md:pt-40">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="h1">Your home. Simplified.</h1>
          <p className="sub mx-auto max-w-2xl">
            Control everything, beautifully. The iPhone becomes your stage—
            every effect happens right on screen.
          </p>
          <div className="mt-12 flex justify-center">
            <div className="iphone-frame">
              <div className="iphone-notch" />
              <div className="iphone-screen screen-gradient" />
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTS */}
      <FeatureSection
        kicker="Perfect Light"
        title="Every room. Every moment."
        subtitle="Exactly as you want it."
        scenes={[
          { id: 'lights-off', src: '/lights-off.jpg', alt: 'Room dark' },
          { id: 'lights-on', src: '/lights-on.jpg', alt: 'Room lit' },
        ]}
        buttons={[
          { label: 'Lights Off', sceneId: 'lights-off', tone: 'dark' },
          { label: 'Lights On', sceneId: 'lights-on', tone: 'light' },
        ]}
      />

      {/* CURTAINS */}
      <section className="section">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:[&>*:first-child]:order-2">
          {/* Text */}
          <div>
            <div className="kicker">Perfect Privacy</div>
            <h2 className="h1">Comfort and control.</h2>
            <p className="sub">Exactly when you need it.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="btn btn-dark" onClick={handleClose}>
                Close Curtains
              </button>
              <button className="btn btn-light" onClick={handleOpen}>
                Open Curtains
              </button>
            </div>
          </div>

          {/* iPhone with video */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="iphone-frame shadow-iphone">
              <div className="iphone-notch" />
              <div className="iphone-screen relative">
                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full"
                  style={{ objectFit: 'cover', objectPosition: '80% 50%' }}
                  src="/curtains-video.mp4"
                  muted
                  playsInline
                  preload="auto"
                  onLoadedData={() => {
                    if (videoRef.current) {
                      videoRef.current.pause();
                      videoRef.current.currentTime = 0; // start open
                    }
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CLIMATE */}
      <FeatureSection
        kicker="Perfect Climate"
        title="Always the right temperature."
        subtitle="Effortless comfort that adapts to you."
        scenes={[
          { id: 'cool', src: '/cool.jpg', alt: 'Cool' },
          { id: 'warm', src: '/warm.jpg', alt: 'Warm' },
        ]}
        buttons={[
          { label: 'Cool', sceneId: 'cool', tone: 'light' },
          { label: 'Warm', sceneId: 'warm', tone: 'dark' },
        ]}
      />

      {/* ALL CONNECTED */}
      <section className="section">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
          <div>
            <div className="kicker">All Connected</div>
            <h2 className="h1">Bring HomiFi to your home.</h2>
            <p className="sub">
              Lights, curtains, climate—working as one. Minimal design. Maximum
              clarity.
            </p>
            <a className="cta mt-6" href="#">
              Get Started
            </a>
          </div>
          <div className="flex justify-center">
            <div className="iphone-frame shadow-iphone">
              <div className="iphone-notch" />
              <div className="iphone-screen">
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  src="/all-connected.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 text-center text-sm text-neutral-500">
        Designed in Dubai. Built for your home.
      </footer>
    </main>
  );
}
