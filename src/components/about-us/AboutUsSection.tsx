'use client';

import CustomShadowDiv from '@/components/custom/CustomShadowDiv';
import Image from 'next/image';
import {
  aboutUsImage,
  clouds1Image as lowerCloudsImage,
  upperCloudsImage,
} from '../../../public';
import TwoPersonIcon from '@/components/icons/TwoPersonIcon';
import DollarIcon from '@/components/icons/DollarIcon';
import GiveStarIcon from '@/components/icons/GiveStarIcon';
import SwiperBox from '@/components/hero-section/SwiperBox';
import { cn } from '@/lib/utils';
import { motion, Variants } from 'framer-motion';
import { useCurrency } from '@/lib/useCurrency';
import { useTranslations } from 'next-intl';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const AboutUsSection = () => {
  const { formatPrice } = useCurrency();
  const t = useTranslations('aboutUs');
  return (
    <div
      id="about"
      className={cn(
        'relative w-full bg-white px-2.5 md:px-12 xl:px-18.5 py-18 overflow-hidden',
        'bg-linear-to-b from-white from-0% via-[#4787FE] via-50% to-white to-100%',
      )}
    >
      <Image
        src={upperCloudsImage}
        alt={t('upperCloudsAlt')}
        className="absolute top-40 md:top-0 2xl:-top-70 z-0 object-cover object-center pointer-events-none bg-no-repeat"
      />
      <Image
        src={lowerCloudsImage}
        alt={t('lowerCloudsAlt')}
        className="absolute bottom-10 md:bottom-0 xl:-bottom-40 z-0 object-cover object-center pointer-events-none bg-no-repeat"
      />

      <div className="flex flex-col gap-17 max-w-310 mx-auto h-full">
        <motion.div
          className="flex flex-col lg:flex-row lg:gap-6 gap-2 justify-center items-center text-[#230849] z-10"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="font-oxva text-[3rem] lg:text-[6rem] leading-[100%] lg:tracking-normal tracking-wide">
            {t('about')}
          </p>
          <CustomShadowDiv
            className="flex items-center justify-center uppercase px-5 text-[2.625rem] lg:text-[4rem] mb-4.5 w-max rounded-[1rem] leading-[120%] -rotate-2"
            shadowSize={12}
          >
            {t('bigbrowser')}
          </CustomShadowDiv>
        </motion.div>

        <motion.div
          className="flex justify-center items-center z-10"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Image
            src={aboutUsImage}
            alt={t('imageAlt')}
            className="w-80 sm:w-100 lg:w-141.5 h-auto object-cover object-center"
          />
        </motion.div>

        <motion.div
          className="flex items-end h-26 bg-transparent"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SwiperBox className="inline" />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-9 lg:gap-16 z-10">
          <motion.div
            className="flex flex-col gap-3 w-full lg:max-w-80"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="text-[#230849] text-2xl lg:text-[2rem] uppercase leading-[110%]">
              {t('subheadingTitle')}
            </p>
            <p className="text-[#230849] font-neue-montreal lg:text-base text-sm font-medium leading-[140%]">
              {t('subheadingDesc')}
            </p>
          </motion.div>
          <motion.div
            className="w-full grid lg:grid-cols-3 gap-9"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div className="flex flex-col gap-5" variants={fadeInUp}>
              <CustomShadowDiv
                className="flex justify-center items-center bg-[#1FC16B] border-3 rounded-[1rem] size-11.5"
                shadowSize={3}
              >
                <TwoPersonIcon />
              </CustomShadowDiv>
              <div className="flex flex-col gap-3">
                <p className="text-[#230849] text-base lg:text-lg uppercase leading-[110%]">
                  {t('card1Title')}
                </p>
                <p className="text-[#230849] font-neue-montreal text-sm lg:text-base font-medium leading-[140%]">
                  {t('card1Desc')}
                </p>
              </div>
            </motion.div>

            <motion.div className="flex flex-col gap-5" variants={fadeInUp}>
              <CustomShadowDiv
                className="flex justify-center items-center bg-[#4786FF] border-3 rounded-[1rem] size-11.5"
                shadowSize={3}
              >
                <DollarIcon />
              </CustomShadowDiv>
              <div className="flex flex-col gap-3">
                <p className="text-[#230849]  text-base lg:text-lg uppercase leading-[110%]">
                  {t('card2Title')}
                </p>
                <p className="text-[#230849] font-neue-montreal text-sm lg:text-base font-medium leading-[140%]">
                  {t('card2Desc')}
                </p>
              </div>
            </motion.div>

            <motion.div className="flex flex-col gap-5" variants={fadeInUp}>
              <CustomShadowDiv
                className="flex justify-center items-center bg-[#FFA7D7] border-3 rounded-[1rem] size-11.5"
                shadowSize={3}
              >
                <GiveStarIcon />
              </CustomShadowDiv>
              <div className="flex flex-col gap-3">
                <p className="text-[#230849] text-base lg:text-lg uppercase leading-[110%]">
                  {t('card3Title', { price: formatPrice(89) })}
                </p>
                <p className="text-[#230849] font-neue-montreal text-sm lg:text-base font-medium leading-[140%]">
                  {t('card3Desc')}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;
