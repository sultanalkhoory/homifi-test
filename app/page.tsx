"use client";

import { useRef } from "react";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = videoRef.current.duration; // jump to end
      videoRef.current.pause(); // stay frozen at closed
    }
  };

  const handleOpen = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0; // jump to start
      videoRef.current.pause(); // stay frozen at open
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="w-full max-w-xl">
        <video
          ref={videoRef}
          src="/curtains.mp4"
          className="w-full rounded-2xl shadow-lg"
          playsInline
          preload="auto"
        />
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleClose}
          className="rounded-xl bg-gray-800 px-6 py-3 text-lg font-semibold hover:bg-gray-700"
        >
          Close
        </button>
        <button
          onClick={handleOpen}
          className="rounded-xl bg-gray-800 px-6 py-3 text-lg font-semibold hover:bg-gray-700"
        >
          Open
        </button>
      </div>
    </main>
  );
}
