'use client';

import Navbar from '@/components/hero-section/Navbar';
import WebsitesBox from '@/components/hero-section/WebsitesBox';
import Image from 'next/image';
import { clouds1Image } from '../../../public';
import SwiperBox from '@/components/hero-section/SwiperBox';
import HeroLottieMobile from '@/components/hero-section/HeroLottieMobile';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const HeroSection = () => {
  const t = useTranslations('hero');
  return (
    <div className="relative w-full bg-linear-to-b from-[#4787FE] via-[#4787FE] to-white pt-4 xl:pt-9.25 overflow-hidden">
      <motion.div
        className="absolute bottom-0 xl:translate-y-[40%] h-auto w-screen pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
      >
        <Image
          src={clouds1Image}
          alt={t('cloudsAlt')}
          className="h-auto w-screen object-cover object-center"
        />
      </motion.div>

      <div className="flex flex-col gap-16 max-w-310 mx-auto h-full">
        <Navbar />
        <div className="flex flex-col gap-7">
          <WebsitesBox />
        </div>
        <div className="flex items-end h-40 bg-transparent">
          <SwiperBox className="xl:inline hidden" />
        </div>
      </div>

      <div className="absolute -bottom-16 z-10 w-full">
        <div className="inline xl:hidden relative w-full">
          <div className="absolute z-10 w-full h-70 bg-linear-to-b from-transparent to-white to-80%" />

          <HeroLottieMobile />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
