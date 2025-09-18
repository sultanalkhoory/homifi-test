'use client';

import Head from 'next/head';
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// ---------------------------------------------------------------------------
// iPhone Chrome (visual shell)
// ---------------------------------------------------------------------------
function IphoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="iphone-frame shadow-iphone">
      <div className="iphone-notch" />
      <div className="iphone-screen relative overflow-hidden rounded-[28px]">
        {/* Keep the gradient VERY subtle so it doesn't soften the image */}
        <div className="pointer-events-none absolute inset-0"
             style={{
               background:
                 'radial-gradient(120% 100% at 50% 0%, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0) 55%)'
             }}
        />
        {children}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Lights (static images) – crisp & smooth
// ---------------------------------------------------------------------------
function LightsSection() {
  const [active, setActive] = useState<'off' | 'on'>('off');

  // Use exact file names from /public (case-sensitive on Vercel)
  const scenes = useMemo(
    () => [
      { id: 'off', src: '/Curtains-Closed-Lights-Off.png', alt: 'Lights Off' },
      { id: 'on',  src: '/Curtains-Closed-Lights-On.png',  alt: 'Lights On'  },
    ],
    []
  );

  return (
    <section className="section">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
        {/* Text */}
        <div>
          <div className="kicker">Perfect Light</div>
          <h2 className="h1">Every room. Every moment.</h2>
          <p className="sub">Exactly as you want it.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              className={`btn btn-dark ${active === 'off' ? 'ring-2 ring-neutral-400' : ''}`}
              onClick={() => setActive('off')}
            >
              Lights Off
            </button>
            <button
              className={`btn btn-light ${active === 'on' ? 'ring-2 ring-neutral-400' : ''}`}
              onClick={() => setActive('on')}
            >
              Lights On
            </button>
          </div>
        </div>

        {/* iPhone with images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <IphoneShell>
            <div className="absolute inset-0">
              <AnimatePresence mode="wait">
                {scenes.map(s => (
                  s.id === active && (
                    <motion.div
                      key={s.id}
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                    >
                      {/* IMPORTANT to avoid blur: quality=100, eager load, and a bigger 'sizes' */}
                      <Image
                        src={s.src}
                        alt={s.alt}
                        fill
                        priority
                        // Make Next.js generate a high-res rendition inside the iPhone frame
                        sizes="(max-width: 768px) 480px, (max-width: 1280px) 640px, 780px"
                        quality={100}
                        style={{ objectFit: 'cover' }}
                      />
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
          </IphoneShell>
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Curtains (dual videos) – reliable & natural
// ---------------------------------------------------------------------------
function CurtainsSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isOpen, setIsOpen] = useState(true);           // logical state
  const [isAnimating, setIsAnimating] = useState(false);
  const [target, setTarget] = useState<'open' | 'closed'>('open'); // where we want to end up
  const [videoSrc, setVideoSrc] = useState<string>(''); // current playing file

  // Play a video reliably by: set src -> load() -> onloadeddata -> play()
  const playCurtain = (direction: 'open' | 'close') => {
    if (!videoRef.current || isAnimating) return;
    const v = videoRef.current;

    const src = direction === 'open'
      ? '/curtains-opening.mp4'
      : '/curtains-closing.mp4';

    setIsAnimating(true);
    setTarget(direction === 'open' ? 'open' : 'closed');
    setVideoSrc(src);

    // Let the effect below handle load() + play after src updates
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !videoSrc) return;

    let canceled = false;

    const handleLoaded = () => {
      if (canceled) return;
      try {
        v.currentTime = 0;
        const p = v.play();
        if (p && typeof p.then === 'function') {
          p.catch(() => {
            // In case browser blocks autoplay (shouldn't, because user clicked & muted)
          });
        }
      } catch {
        // no-op
      }
    };

    const handleEnded = () => {
      // Pause and hold on the last frame to "freeze" the final state
      v.pause();
      // Safari sometimes seeks ~1 frame before end; snap to end
      try {
        if (v.duration && !isNaN(v.duration)) {
          v.currentTime = Math.max(v.duration - 0.01, 0);
        }
      } catch { /* ignore */ }

      // Commit logical state only after animation completes
      setIsOpen(target === 'open');
      setIsAnimating(false);
    };

    v.addEventListener('loadeddata', handleLoaded);
    v.addEventListener('ended', handleEnded);

    // Trigger an explicit load to avoid "stuck" states on iOS/Safari
    try { v.load(); } catch { /* ignore */ }

    return () => {
      v.removeEventListener('loadeddata', handleLoaded);
      v.removeEventListener('ended', handleEnded);
      canceled = true;
    };
  }, [videoSrc, target]);

  return (
    <section className="section">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:[&>*:first-child]:order-2">
        {/* Text */}
        <div>
          <div className="kicker">Perfect Privacy</div>
          <h2 className="h1">Comfort and control.</h2>
          <p className="sub">Exactly when you need it.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              className="btn btn-dark"
              disabled={isAnimating || !isOpen}
              onClick={() => playCurtain('close')}
            >
              Close Curtains
            </button>
            <button
              className="btn btn-light"
              disabled={isAnimating || isOpen}
              onClick={() => playCurtain('open')}
            >
              Open Curtains
            </button>
          </div>
          {/* Small state helper */}
          <div className="mt-3 text-xs text-neutral-500">
            State: <b>{isOpen ? 'Open' : 'Closed'}</b>{isAnimating ? ' • animating…' : ''}
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
          <IphoneShell>
            <video
              ref={videoRef}
              // When src changes, the effect calls load() then plays
              src={videoSrc}
              className="absolute inset-0 h-full w-full"
              style={{ objectFit: 'cover', objectPosition: '50% 50%' }}
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              controls={false}
              controlsList="nodownload noplaybackrate noremoteplayback"
              // On first paint, hold a clean frame (no auto-play)
              onLoadedMetadata={(e) => {
                const v = e.currentTarget;
                v.pause();
                v.currentTime = 0;
              }}
            />
          </IphoneShell>
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function Page() {
  return (
    <main className="[--pad:clamp(16px,4vw,48px)]">
      <Head>
        {/* Preload assets so images are crisp & video starts instantly */}
        <link rel="preload" as="image" href="/Curtains-Closed-Lights-Off.png" />
        <link rel="preload" as="image" href="/Curtains-Closed-Lights-On.png" />
        <link rel="preload" as="video" href="/curtains-opening.mp4" type="video/mp4" />
        <link rel="preload" as="video" href="/curtains-closing.mp4" type="video/mp4" />
      </Head>

      {/* HERO */}
      <section className="section pt-28 md:pt-40">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="h1">Your home. Simplified.</h1>
          <p className="sub mx-auto max-w-2xl">
            Control everything, beautifully. The iPhone becomes your stage—
            every effect happens right on screen.
          </p>
          <div className="mt-12 flex justify-center">
            <IphoneShell>
              <div className="absolute inset-0" />
            </IphoneShell>
          </div>
        </div>
      </section>

      {/* LIGHTS (crisp images + smooth fade) */}
      <LightsSection />

      {/* CURTAINS (two videos, natural & reliable) */}
      <CurtainsSection />

      {/* FOOTER */}
      <footer className="py-16 text-center text-sm text-neutral-500">
        Designed in Dubai. Built for your home.
      </footer>
    </main>
  );
}
