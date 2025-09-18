'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Page() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isOpen, setIsOpen] = useState(true); // Curtains start open
  const [activeLight, setActiveLight] = useState<'lights-off' | 'lights-on'>(
    'lights-off'
  );

  // ✅ Reusable iPhone Frame for Images
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
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
      <section className="section">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
          {/* Text */}
          <div>
            <div className="kicker">Perfect Light</div>
            <h2 className="h1">Every room. Every moment.</h2>
            <p className="sub">Exactly as you want it.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                className={`btn btn-dark ${
                  activeLight === 'lights-off' ? 'ring-2 ring-neutral-400' : ''
                }`}
                onClick={() => setActiveLight('lights-off')}
              >
                Lights Off
              </button>
              <button
                className={`btn btn-light ${
                  activeLight === 'lights-on' ? 'ring-2 ring-neutral-400' : ''
                }`}
                onClick={() => setActiveLight('lights-on')}
              >
                Lights On
              </button>
            </div>
          </div>

          {/* iPhone with lights images */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <IphoneFrame
              active={activeLight}
              scenes={[
                {
                  id: 'lights-off',
                  src: '/Curtains-Closed-Lights-Off.png',
                  alt: 'Room dark',
                },
                {
                  id: 'lights-on',
                  src: '/Curtains-Closed-Lights-On.png',
                  alt: 'Room lit',
                },
              ]}
            />
          </motion.div>
        </div>
      </section>

      {/* CURTAINS */}
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
                disabled={!isOpen}
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.src = '/curtains-closing.mp4';
                    videoRef.current.currentTime = 0;
                    videoRef.current.play();
                    setIsOpen(false);
                  }
                }}
              >
                Close Curtains
              </button>
              <button
                className="btn btn-light"
                disabled={isOpen}
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.src = '/curtains-opening.mp4';
                    videoRef.current.currentTime = 0;
                    videoRef.current.play();
                    setIsOpen(true);
                  }
                }}
              >
                Open Curtains
              </button>
            </div>
          </div>

          {/* iPhone with curtains video */}
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
                  key={isOpen ? 'open' : 'close'}
                  className="absolute inset-0 h-full w-full"
                  style={{ objectFit: 'cover', objectPosition: '80% 50%' }}
                  muted
                  playsInline
                  preload="auto"
                  onEnded={() => videoRef.current?.pause()}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 text-center text-sm text-neutral-500">
        Designed in Dubai. Built for your home.
      </footer>
    </main>
  );
}
