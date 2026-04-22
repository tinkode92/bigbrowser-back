'use client';

import { useRef, useEffect } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { useInView } from 'framer-motion';

interface StepLottieProps {
  animationData: Record<string, unknown>;
  className?: string;
}

const StepLottie = ({ animationData, className }: StepLottieProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        lottieRef.current?.play();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <div ref={containerRef} className={className}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        autoplay={false}
      />
    </div>
  );
};

export default StepLottie;
