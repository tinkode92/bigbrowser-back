'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import CustomShadowDiv from '@/components/custom/CustomShadowDiv';
import {
  step1Image,
  step2Image,
  step3Image,
  step4Image,
} from '../../../public';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import Image from 'next/image';
import { motion, Variants, useInView } from 'framer-motion';
import StepLottie from '@/components/steps-section/StepLottie';
import step1Animation from '../../../public/animations/steps/step-1.json';
import step2Animation from '../../../public/animations/steps/step-2.json';
import step3Animation from '../../../public/animations/steps/step-3.json';
import step4Animation from '../../../public/animations/steps/step-4.json';

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

const navBtnVariants: Variants = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -4,
    scale: 1.06,
    transition: { type: 'spring', stiffness: 400, damping: 15 },
  },
  tap: { scale: 0.94, y: 0 },
};

const chevronLeftVariants: Variants = {
  rest: { x: 0 },
  hover: {
    x: -3,
    transition: { type: 'spring', stiffness: 500, damping: 18 },
  },
};

const chevronRightVariants: Variants = {
  rest: { x: 0 },
  hover: {
    x: 3,
    transition: { type: 'spring', stiffness: 500, damping: 18 },
  },
};

const STEPS = [
  {
    image: step1Image,
    animation: step1Animation,
    stepKey: 'step01',
    descKeys: ['step01Desc1', 'step01Desc2', 'step01Desc3'],
  },
  {
    image: step2Image,
    animation: step2Animation,
    stepKey: 'step02',
    descKeys: ['step02Desc1', 'step02Desc2', 'step02Desc3'],
  },
  {
    image: step3Image,
    animation: step3Animation,
    stepKey: 'step03',
    descKeys: ['step03Desc1', 'step03Desc2', 'step03Desc3'],
  },
  {
    image: step4Image,
    animation: step4Animation,
    stepKey: 'step04',
    descKeys: ['step04Desc1', 'step04Desc2'],
  },
];

const StepByStepProcess = () => {
  const t = useTranslations('steps');
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div
      id="process"
      className="bg-white pt-16 pb-7.5"
      style={{ overflowX: 'clip' }}
    >
      <div className="w-full flex flex-col gap-2.5 lg:gap-8">
        <motion.div
          className="flex flex-col lg:flex-row justify-center items-center lg:gap-8 text-[#230849] px-2.5 xl:px-0"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="font-oxva text-[3rem] lg:text-[6rem] leading-[100%] lg:tracking-normal tracking-wide">
            {t('heading')}
          </p>
          <CustomShadowDiv
            className="flex items-center justify-center uppercase mb-6 px-5 text-[2rem] lg:text-[4rem] w-max rounded-[1rem] leading-[120%] -rotate-2"
            shadowSize={12}
          >
            {t('process')}
          </CustomShadowDiv>
        </motion.div>

        <motion.div
          className="w-full flex flex-col gap-8"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <p className="hidden lg:block text-[2.625rem] text-[#230151] uppercase leading-[130%] tracking-tight text-center">
            <TypewriterText text={t('typewriter')} />
          </p>
          <p className="lg:hidden text-2xl text-[#230151] leading-[130%] tracking-tight text-center">
            {t('mobileHeading')}
          </p>

          <div className="flex flex-col gap-5">
            <div className="hidden lg:grid grid-cols-2 gap-6 max-w-310 mx-auto px-4 xl:px-0">
              {STEPS.map((step) => (
                <div
                  key={step.stepKey}
                  className="flex flex-col gap-6 overflow-hidden h-full"
                >
                  {step.animation ? (
                    <StepLottie
                      animationData={step.animation}
                      className="border-2 border-[#230849] rounded-[1.5rem] bg-[#4787FE] overflow-hidden w-full h-auto block"
                    />
                  ) : (
                    <Image
                      src={step.image}
                      alt={t(`${step.stepKey}Title`)}
                      className="border-2 border-[#230849] rounded-[1.5rem] bg-[#4787FE] w-full h-auto block"
                      sizes="(max-width: 1024px) 45vw, 28vw"
                    />
                  )}
                  <div className="flex flex-col gap-4 pt-0">
                    <p className="text-[#230151] tracking-tight text-lg lg:text-xl">
                      {t('step')} {t(step.stepKey)} -{' '}
                      <span className="font-neue-montreal font-medium">
                        {t(`${step.stepKey}Title`)}
                      </span>
                    </p>
                    <div className="font-neue-montreal font-medium text-base lg:text-lg text-[#230151]">
                      {step.descKeys.map((k, i) => (
                        <React.Fragment key={k}>
                          {i > 0 && <br />}
                          {t(k)}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:hidden">
              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                  setIsBeginning(swiper.isBeginning);
                  setIsEnd(swiper.isEnd);
                }}
                onSlideChange={handleSlideChange}
                slidesPerView="auto"
                spaceBetween={20}
                slidesOffsetBefore={16}
                slidesOffsetAfter={16}
                style={{ width: '100%' }}
              >
                {STEPS.map((step) => (
                  <SwiperSlide
                    key={step.stepKey}
                    className="w-[92vw]! sm:w-[60vw]! md:w-[45vw]! h-auto! pb-4 cursor-grab"
                  >
                    <div className="flex flex-col gap-6 overflow-hidden h-full">
                      {step.animation ? (
                        <StepLottie
                          animationData={step.animation}
                          className="border-2 border-[#230849] rounded-[1.5rem] bg-[#4787FE] overflow-hidden w-full h-auto block"
                        />
                      ) : (
                        <Image
                          src={step.image}
                          alt={t(`${step.stepKey}Title`)}
                          className="border-2 border-[#230849] rounded-[1.5rem] bg-[#4787FE] w-full h-auto block"
                          sizes="(max-width: 640px) 92vw, (max-width: 768px) 60vw, 45vw"
                        />
                      )}
                      <div className="flex flex-col gap-4 pt-0">
                        <p className="text-[#230151] tracking-tight text-lg lg:text-xl">
                          {t('step')} {t(step.stepKey)} -{' '}
                          <span className="font-neue-montreal font-medium">
                            {t(`${step.stepKey}Title`)}
                          </span>
                        </p>
                        <div className="font-neue-montreal font-medium text-base lg:text-lg text-[#230151]">
                          {step.descKeys.map((k, i) => (
                            <React.Fragment key={k}>
                              {i > 0 && <br />}
                              {t(k)}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="flex lg:hidden justify-center items-center gap-3 px-2.5">
              <motion.div
                variants={navBtnVariants}
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
                    variants={chevronLeftVariants}
                    style={{ display: 'flex' }}
                  >
                    <ChevronLeft />
                  </motion.span>
                </CustomShadowDiv>
              </motion.div>

              <motion.div
                variants={navBtnVariants}
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
                    variants={chevronRightVariants}
                    style={{ display: 'flex' }}
                  >
                    <ChevronRight />
                  </motion.span>
                </CustomShadowDiv>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StepByStepProcess;
