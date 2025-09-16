// app/page.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Page() {
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  // 🔹 Reusable iPhone Frame (inline)
  const IphoneFrame = ({ scenes, active }: any) => (
    <div className="iphone-frame shadow-iphone">
      <div className="iphone-notch" />
      <div className="iphone-screen">
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

  // 🔹 Reusable Feature Section (inline)
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
          { id: 'lights-off', src: '/iphone-scenes/lights-off.jpg', alt: 'Room dark' },
          { id: 'lights-on', src: '/iphone-scenes/lights-on.jpg', alt: 'Room lit' },
        ]}
        buttons={[
          { label: 'Lights Off', sceneId: 'lights-off', tone: 'dark' },
          { label: 'Lights On', sceneId: 'lights-on', tone: 'light' },
        ]}
      />

{/* CURTAINS (one right-side panel) */}
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
          onClick={() => setCurtainsOpen(false)}
        >
          Close Curtains
        </button>
        <button
          className="btn btn-light"
          onClick={() => setCurtainsOpen(true)}
        >
          Open Curtains
        </button>
      </div>
    </div>

    {/* iPhone with animated single curtain */}
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
          {/* Base room (no curtains) */}
          <Image
            src="/room-base.png"
            alt="Room background"
            fill
            style={{ objectFit: 'cover' }}
          />

          {/* Right curtain sliding */}
          <motion.img
            src="/curtain-right.png"
            alt="Curtain"
            className="absolute top-0 right-0 h-full"
            initial={false}
            animate={{ x: curtainsOpen ? '100%' : '0%' }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
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
          { id: 'cool', src: '/iphone-scenes/cool.jpg', alt: 'Cool' },
          { id: 'warm', src: '/iphone-scenes/warm.jpg', alt: 'Warm' },
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
                  src="/iphone-scenes/all-connected.mp4"
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
