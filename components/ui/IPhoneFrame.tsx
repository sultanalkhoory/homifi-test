/* --------------------------------------------------
   📱 iPhone 15/16 Frame Component
   - Parallax runs ONLY on mobile (disabled on desktop)
   -------------------------------------------------- */
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function IPhoneFrame({ children }: { children: React.ReactNode }) {
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

}
