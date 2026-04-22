'use client';

import { useRef, useState, useEffect } from 'react';
import CustomShadowDiv from '@/components/custom/CustomShadowDiv';
import TwoPersonIcon from '@/components/icons/TwoPersonIcon';
import Image from 'next/image';
import { box1Image, box2Image, box3Image } from '../../../public';
import CubeIcon from '@/components/icons/CubeIcon';
import ClockIcon from '@/components/icons/ClockIcon';
import StarsIcon from '@/components/icons/StarsIcon';
import GiveStarIcon from '@/components/icons/GiveStarIcon';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { cn } from '@/lib/utils';
import { motion, Variants, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';

const TypewriterText = ({ text }: { text: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    setDisplayed('');
    setDone(false);
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setTimeout(() => setDone(true), 700);
      }
    }, 38);
    return () => clearInterval(id);
  }, [isInView, text]);

  return (
    <span ref={ref}>
      {displayed}
      {!done && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 0.5,
          }}
          style={{ borderRight: '3px solid currentColor', marginLeft: '2px' }}
        />
      )}
    </span>
  );
};

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
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: 'easeOut',
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

interface WhyBigBrowserProps {
  className?: string;
}

const WhyBigBrowser = ({ className = '' }: WhyBigBrowserProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const t = useTranslations('whyBigBrowser');

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };
  return (
    <div
      id="services"
      className={cn('bg-white pt-16 pb-7.5 px-2.5 xl:px-0', className)}
    >
      <div className="flex flex-col gap-16 max-w-310 mx-auto h-full">
        <motion.div
          className="flex flex-col gap-8"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex flex-col lg:flex-row justify-center items-center lg:gap-8 gap-2 text-[#230849]">
            <p className="font-oxva text-[3rem] lg:text-[6rem] leading-[100%] lg:tracking-normal tracking-wide">
              {t('why')}
            </p>
            <CustomShadowDiv
              className="flex items-center justify-center uppercase mb-6 px-5 text-[2rem] lg:text-[4rem] w-max rounded-[1rem] leading-[120%] -rotate-2"
              shadowSize={12}
            >
              {t('bigbrowser')}
            </CustomShadowDiv>
          </div>
          <p className="hidden lg:block text-[2.625rem] text-[#230151] uppercase leading-[130%] tracking-tight text-center">
            <TypewriterText text={t('typewriter')} />
          </p>
        </motion.div>

        <motion.div
          className="hidden xl:grid xl:grid-cols-3 gap-5.5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div
            variants={cardVariant}
            className="xl:row-span-2 flex flex-col justify-between gap-9.5 p-7.5 rounded-[1.375rem] border-2 border-[#230849] bg-[#F4ECFF]"
          >
            <motion.div variants={fadeInUp}>
              <CustomShadowDiv
                className="flex justify-center items-center bg-[#9342FD] border-3 rounded-[1rem] size-11.5"
                shadowSize={5}
              >
                <TwoPersonIcon />
              </CustomShadowDiv>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Image
                src={box1Image}
                alt={t('box1Alt')}
                className="hidden xl:block ms-4 object-center object-cover"
              />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="hidden xl:flex flex-col gap-7"
            >
              <p className="uppercase text-[1.75rem] tracking-tight leading-[120%] text-[#230849]">
                {t('card1Title')}{' '}
                <span className="text-[#9342FD]">
                  {t('card1TitleHighlight')}
                </span>
              </p>
              <p className="text-[#230849] font-neue-montreal font-medium leading-[150%] text-xs">
                {t('card1Desc')}
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="xl:hidden flex flex-col gap-6"
            >
              <p className="uppercase text-xl tracking-tight leading-[120%] text-[#230849]">
                {t('card1Title')}{' '}
                <span className="text-[#9342FD]">
                  {t('card1TitleHighlight')}
                </span>
              </p>
              <p className="text-[#230849] font-neue-montreal font-medium leading-[150%] text-xs">
                {t('card1Desc')}
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={cardVariant}
            className="overflow-hidden flex flex-col gap-9.5 rounded-[1.375rem] border-2 border-[#230849] bg-[#FFA7D721]"
          >
            <motion.div
              variants={fadeInUp}
              className="ps-7.5 pt-7.5 flex justify-between"
            >
              <CustomShadowDiv
                className="flex-none flex justify-center items-center bg-[#FFA7D7] border-3 rounded-[1rem] size-11.5"
                shadowSize={5}
              >
                <CubeIcon />
              </CustomShadowDiv>

              <Image
                src={box2Image}
                alt={t('box2Alt')}
                className="hidden xl:block w-60 object-center object-cover -me-2"
              />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-auto hidden xl:flex flex-col gap-4 p-7.5"
            >
              <p className="uppercase text-[1.75rem] tracking-tight leading-[120%] text-[#230849]">
                {t('card2Title')}{' '}
                <span className="text-[#FFA7D7]">
                  {t('card2TitleHighlight')}
                </span>
              </p>
              <p className="text-[#230849] font-neue-montreal font-medium leading-[150%] text-xs">
                {t('card2Desc')}
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="xl:hidden flex flex-col gap-6 p-7.5"
            >
              <p className="uppercase text-xl tracking-tight leading-[120%] text-[#230849]">
                {t('card2Title')}{' '}
                <span className="text-[#FFA7D7]">
                  {t('card2TitleHighlight')}
                </span>
              </p>
              <p className="text-[#230849] font-neue-montreal font-medium leading-[150%] text-xs">
                {t('card2Desc')}
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={cardVariant}
            className="overflow-hidden flex flex-col gap-9.5 xl:gap-0 p-7.5 rounded-[1.375rem] border-2 border-[#230849] bg-[#C0D6FF]"
          >
            <motion.div variants={fadeInUp}>
              <CustomShadowDiv
                className="flex-none flex justify-center items-center bg-[#4786FF] border-3 rounded-[1rem] size-11.5"
                shadowSize={5}
              >
                <ClockIcon />
              </CustomShadowDiv>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="hidden xl:flex flex-col items-end space-x-26"
            >
              <CustomShadowDiv
                className="flex-none flex justify-center items-center border-3 rounded-[1rem] size-19 -rotate-7"
                shadowSize={8}
              >
                <StarsIcon />
              </CustomShadowDiv>
              <CustomShadowDiv
                className="flex-none flex justify-center items-center border-3 rounded-[1rem] size-19 rotate-7"
                shadowSize={8}
              >
                <CubeIcon className="size-8" />
              </CustomShadowDiv>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-auto hidden xl:flex flex-col gap-4"
            >
              <p className="uppercase text-[1.75rem] tracking-tight leading-[120%] text-[#230849]">
                <span className="text-[#4787FE]">{t('card3Title1')}</span>{' '}
                <br />
                {t('card3Title2')}
              </p>
              <p className="text-[#230849] font-neue-montreal font-medium leading-[150%] text-xs">
                {t('card3Desc')}
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="mt-auto xl:hidden flex flex-col gap-6"
            >
              <p className="uppercase text-xl tracking-tight leading-[120%] text-[#230849]">
                <span className="text-[#4787FE]">{t('card3Title1')}</span>{' '}
                {t('card3Title2')}
              </p>
              <p className="text-[#230849] font-neue-montreal font-medium leading-[150%] text-xs">
                {t('card3Desc')}
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={cardVariant}
            className="xl:col-span-2 h-max overflow-hidden flex items-center justify-between p-7.5 rounded-[1.375rem] border-2 border-[#230849] bg-[#1FC16B14]"
          >
            <motion.div
              variants={staggerContainer}
              className="flex flex-col gap-12.5"
            >
              <motion.div variants={fadeInUp}>
                <CustomShadowDiv
                  className="flex-none flex justify-center items-center bg-[#1FC16B] border-3 rounded-[1rem] size-11.5"
                  shadowSize={5}
                >
                  <GiveStarIcon />
                </CustomShadowDiv>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="mt-auto hidden xl:flex flex-col gap-1.5"
              >
                <p className="uppercase text-[1.75rem] tracking-tight leading-[120%] text-[#230849]">
                  {t('card4Title1')}{' '}
                  <span className="text-[#1FC16B]">
                    {t('card4TitleHighlight1')}
                  </span>{' '}
                  {t('card4Title2')}{' '}
                  <span className="text-[#1FC16B]">
                    {t('card4TitleHighlight2')}
                  </span>
                </p>
                <p className="text-[#230849] font-neue-montreal font-medium leading-[150%] text-xs">
                  {t('card4Desc')}
                </p>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="mt-auto xl:hidden flex flex-col gap-6"
              >
                <p className="uppercase text-xl tracking-tight leading-[120%] text-[#230849]">
                  {t('card4Title1')}{' '}
                  <span className="text-[#1FC16B]">
                    {t('card4TitleHighlight1')}
                  </span>{' '}
                  {t('card4Title2')}{' '}
                  <span className="text-[#1FC16B]">
                    {t('card4TitleHighlight2')}
                  </span>
                </p>
                <p className="text-[#230849] font-neue-montreal font-medium leading-[150%] text-xs">
                  {t('card4Desc')}
                </p>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Image
                src={box3Image}
                alt={t('box3Alt')}
                className="hidden xl:block w-52 object-center object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="xl:hidden flex flex-col gap-5"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onSlideChange={handleSlideChange}
            slidesPerView="auto"
            spaceBetween={16}
            centeredSlides={true}
            initialSlide={0}
            style={{ width: '100%' }}
          >
            <SwiperSlide className="w-[85vw]! sm:w-[65vw]! h-auto! pb-4">
              <div className="flex flex-col gap-6 p-6 rounded-[1.375rem] border-2 border-[#230849] bg-[#F4ECFF] h-full">
                <CustomShadowDiv
                  className="flex justify-center items-center bg-[#9342FD] border-3 rounded-[1rem] size-11.5"
                  shadowSize={5}
                >
                  <TwoPersonIcon />
                </CustomShadowDiv>
                <p className="uppercase text-xl tracking-tight leading-[120%] text-[#230849]">
                  {t('card1Title')}{' '}
                  <span className="text-[#9342FD]">
                    {t('card1TitleHighlight')}
                  </span>
                </p>
                <p className="text-[#230849] font-neue-montreal font-medium leading-[150%] text-xs">
                  {t('card1Desc')}
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="w-[85vw]! sm:w-[65vw]! h-auto! pb-4">
              <div className="flex flex-col gap-6 p-6 rounded-[1.375rem] border-2 border-[#230849] bg-[#FFA7D721] h-full">
                <CustomShadowDiv
                  className="flex-none flex justify-center items-center bg-[#FFA7D7] border-3 rounded-[1rem] size-11.5"
                  shadowSize={5}
                >
                  <CubeIcon />
                </CustomShadowDiv>
                <p className="uppercase text-xl tracking-tight leading-[120%] text-[#230849]">
                  {t('card2Title')}{' '}
                  <span className="text-[#FFA7D7]">
                    {t('card2TitleHighlight')}
                  </span>
                </p>
                <p className="text-[#230849] font-neue-montreal font-medium leading-[150%] text-xs">
                  {t('card2Desc')}
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="w-[85vw]! sm:w-[65vw]! h-auto! pb-4">
              <div className="flex flex-col gap-6 p-6 rounded-[1.375rem] border-2 border-[#230849] bg-[#C0D6FF] h-full">
                <CustomShadowDiv
                  className="flex-none flex justify-center items-center bg-[#4786FF] border-3 rounded-[1rem] size-11.5"
                  shadowSize={5}
                >
                  <ClockIcon />
                </CustomShadowDiv>
                <p className="uppercase text-xl tracking-tight leading-[120%] text-[#230849]">
                  <span className="text-[#4787FE]">{t('card3Title1')}</span>{' '}
                  {t('card3Title2')}
                </p>
                <p className="text-[#230849] font-neue-montreal font-medium leading-[150%] text-xs">
                  {t('card3Desc')}
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="w-[85vw]! sm:w-[65vw]! h-auto! pb-4">
              <div className="flex flex-col gap-6 p-6 rounded-[1.375rem] border-2 border-[#230849] bg-[#1FC16B14] h-full">
                <CustomShadowDiv
                  className="flex-none flex justify-center items-center bg-[#1FC16B] border-3 rounded-[1rem] size-11.5"
                  shadowSize={5}
                >
                  <GiveStarIcon />
                </CustomShadowDiv>
                <p className="uppercase text-xl tracking-tight leading-[120%] text-[#230849]">
                  {t('card4Title1')}{' '}
                  <span className="text-[#1FC16B]">
                    {t('card4TitleHighlight1')}
                  </span>{' '}
                  {t('card4Title2')}{' '}
                  <span className="text-[#1FC16B]">
                    {t('card4TitleHighlight2')}
                  </span>
                </p>
                <p className="text-[#230849] font-neue-montreal font-medium leading-[150%] text-xs">
                  {t('card4Desc')}
                </p>
              </div>
            </SwiperSlide>
          </Swiper>

          <div className="flex justify-center items-center gap-3">
            <motion.div
              variants={{
                rest: { y: 0, scale: 1 },
                hover: {
                  y: -4,
                  scale: 1.06,
                  transition: { type: 'spring', stiffness: 400, damping: 15 },
                },
                tap: { scale: 0.94, y: 0 },
              }}
              initial="rest"
              whileHover={isBeginning ? undefined : 'hover'}
              whileTap={isBeginning ? undefined : 'tap'}
              style={{ display: 'inline-flex' }}
            >
              <CustomShadowDiv
                role="button"
                aria-disabled={isBeginning}
                className={`flex justify-center items-center border-2 w-14 h-10 rounded-lg select-none transition-opacity duration-200 ${isBeginning ? 'opacity-35 cursor-not-allowed' : 'cursor-pointer'}`}
                shadowSize={4}
                onClick={() => !isBeginning && swiperRef.current?.slidePrev()}
              >
                <motion.span
                  variants={{
                    rest: { x: 0 },
                    hover: {
                      x: -3,
                      transition: {
                        type: 'spring',
                        stiffness: 500,
                        damping: 18,
                      },
                    },
                  }}
                  style={{ display: 'flex' }}
                >
                  <ChevronLeft />
                </motion.span>
              </CustomShadowDiv>
            </motion.div>

            <motion.div
              variants={{
                rest: { y: 0, scale: 1 },
                hover: {
                  y: -4,
                  scale: 1.06,
                  transition: { type: 'spring', stiffness: 400, damping: 15 },
                },
                tap: { scale: 0.94, y: 0 },
              }}
              initial="rest"
              whileHover={isEnd ? undefined : 'hover'}
              whileTap={isEnd ? undefined : 'tap'}
              style={{ display: 'inline-flex' }}
            >
              <CustomShadowDiv
                role="button"
                aria-disabled={isEnd}
                className={`flex justify-center items-center border-2 w-14 h-10 rounded-lg select-none transition-opacity duration-200 ${isEnd ? 'opacity-35 cursor-not-allowed' : 'cursor-pointer'}`}
                shadowSize={4}
                onClick={() => !isEnd && swiperRef.current?.slideNext()}
              >
                <motion.span
                  variants={{
                    rest: { x: 0 },
                    hover: {
                      x: 3,
                      transition: {
                        type: 'spring',
                        stiffness: 500,
                        damping: 18,
                      },
                    },
                  }}
                  style={{ display: 'flex' }}
                >
                  <ChevronRight />
                </motion.span>
              </CustomShadowDiv>
            </motion.div>
          </div>
        </motion.div>

        <div className="xl:hidden flex flex-col gap-6">
          <p className="text-center text-[#230849] uppercase text-lg">
            {t('whoIsItFor')}
          </p>
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-wrap justify-center items-center gap-3">
              <CustomShadowDiv
                className="flex items-center justify-center tracking-tighter h-12 text-[#230849] text-xs uppercase px-2 w-max rounded-[1rem] leading-[110%]"
                shadowSize={4}
              >
                {t('foodHospitality')}
              </CustomShadowDiv>
              <CustomShadowDiv
                className="flex items-center justify-center tracking-tighter h-12 text-[#230849] text-xs uppercase px-2 w-max rounded-[1rem] leading-[110%]"
                shadowSize={4}
              >
                {t('realEstate')}
              </CustomShadowDiv>
              <CustomShadowDiv
                className="flex items-center justify-center tracking-tighter h-12 text-[#230849] text-xs uppercase px-2 w-max rounded-[1rem] leading-[110%]"
                shadowSize={4}
              >
                {t('healthWellness')}
              </CustomShadowDiv>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-3">
              <CustomShadowDiv
                className="flex items-center justify-center tracking-tighter h-12 text-[#230849] text-xs uppercase px-2 w-max rounded-[1rem] leading-[110%]"
                shadowSize={4}
              >
                {t('coachingConsulting')}
              </CustomShadowDiv>
              <CustomShadowDiv
                className="flex items-center justify-center tracking-tighter h-12 text-[#230849] text-xs uppercase px-2 w-max rounded-[1rem] leading-[110%]"
                shadowSize={4}
              >
                {t('techStartups')}
              </CustomShadowDiv>
              <CustomShadowDiv
                className="flex items-center justify-center tracking-tighter h-12 text-[#230849] text-xs uppercase px-2 w-max rounded-[1rem] leading-[110%]"
                shadowSize={4}
              >
                {t('tradesConstruction')}
              </CustomShadowDiv>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyBigBrowser;
