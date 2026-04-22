'use client';

import Lottie from 'lottie-react';
import heroHeaderAnimation from '../../../public/animations/hero-header.json';

const HeroLottie = () => {
  return (
    <Lottie
      animationData={heroHeaderAnimation}
      loop={false}
      autoplay
      className="xl:-right-8 2xl:-right-14 w-130 h-auto pointer-events-none"
    />
  );
};

export default HeroLottie;
