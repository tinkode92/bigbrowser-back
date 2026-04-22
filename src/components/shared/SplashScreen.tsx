'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { logo } from '../../../public';
import { useTranslations } from 'next-intl';

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const t = useTranslations('splash');

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            backgroundColor: '#f0eafa',
            willChange: 'clip-path',
            transform: 'translateZ(0)',
          }}
          initial={{ clipPath: 'circle(150% at 100% 100%)' }}
          animate={{ clipPath: 'circle(150% at 100% 100%)' }}
          exit={{ clipPath: 'circle(0% at 100% 100%)' }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        >
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              width: 420,
              height: 420,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(71,135,254,0.10) 0%, transparent 65%)',
              filter: 'blur(28px)',
              transform: 'translateZ(0)',
            }}
          />

          <motion.div
            className="relative z-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 18,
              delay: 0.08,
            }}
            style={{ willChange: 'transform, opacity' }}
          >
            <Image
              src={logo}
              alt={t('logoAlt')}
              width={300}
              height={125}
              priority
              draggable={false}
              className="w-52 sm:w-64 lg:w-76 h-auto select-none"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
