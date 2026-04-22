'use client';

import { useEffect, useRef } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import heroHeaderMobileAnimation from '../../../public/animations/hero-header-mobile.json';

const HeroLottieMobile = () => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      lottieRef.current?.play();
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={heroHeaderMobileAnimation}
      loop={false}
      autoplay={false}
      className="mx-auto w-full h-64 pointer-events-none"
      style={{ overflow: 'hidden' }}
      rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
    />
  );
};

export default HeroLottieMobile;
