'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useTranslations } from 'next-intl';

const VIDEO_SRC = process.env.NEXT_PUBLIC_VIDEO_SHOWCASE_URL ?? '';
const IDLE_TIMEOUT = 3000;

const VideoShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const t = useTranslations('video');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  const scale = useTransform(smoothProgress, [0.05, 0.8], [0.42, 1]);

  const borderRadius = useTransform(smoothProgress, [0.05, 0.75], [28, 0]);

  const shadowOpacity = useTransform(smoothProgress, [0.05, 0.6], [1, 0]);

  const overlayOpacity = useTransform(smoothProgress, [0.78, 0.92], [0, 1]);

  const resetIdleTimer = useCallback(() => {
    setShowControls(true);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(
      () => setShowControls(false),
      IDLE_TIMEOUT,
    );
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowControls(false), IDLE_TIMEOUT);
    return () => clearTimeout(timer);
  }, []);

  const toggleMute = () => {
    if (!videoRef.current) return;
    const next = !isMuted;
    videoRef.current.muted = next;
    setIsMuted(next);
  };

  return (
    <section className="relative bg-white hidden md:block">
      <div ref={containerRef} style={{ height: '300vh' }} className="relative">
        <div
          className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-white"
          onMouseMove={resetIdleTimer}
          onMouseLeave={() => setShowControls(false)}
        >
          <motion.div
            className="relative w-full h-full overflow-hidden"
            style={{
              scale,
              borderRadius,
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-[inherit] pointer-events-none z-10"
              style={{
                boxShadow: '0 32px 80px 0 rgba(35,8,73,0.28)',
                opacity: shadowOpacity,
              }}
            />

            <video
              ref={videoRef}
              src={VIDEO_SRC}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-opacity duration-700 ${showControls ? 'opacity-100' : 'opacity-0'}`}
            >
              <motion.button
                aria-label={isMuted ? t('unmuteVideo') : t('muteVideo')}
                onClick={toggleMute}
                className="flex items-center justify-center w-20 h-20 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white cursor-pointer hover:bg-white/25 transition-colors duration-200"
                style={{ opacity: overlayOpacity }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
              >
                {isMuted ? (
                  <VolumeX size={36} strokeWidth={1.6} />
                ) : (
                  <Volume2 size={36} strokeWidth={1.6} />
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
