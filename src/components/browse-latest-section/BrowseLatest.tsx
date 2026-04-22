'use client';

import CustomShadowDiv from '@/components/custom/CustomShadowDiv';
import { useTranslations } from 'next-intl';
import {
  sobryBackgroundImage,
  tatamBackgroundImage,
  tenantPayBackgroundImage,
  wizusBackgroundImage,
  enforceBackgroundImage,
  kapturzBackgroundImage,
  palomaBackgroundImage,
} from '../../../public';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import Testimonials from '@/components/testimonials-section/Testimonials';
import CustomButton from '@/components/custom/CustomButton';
import { motion, Variants } from 'framer-motion';
import { Autoplay } from 'swiper/modules';
import { logEvent } from '@/lib/analytics';

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
  visible: { transition: { staggerChildren: 0.08 } },
};

const PROJECTS = [
  { image: tenantPayBackgroundImage, href: 'https://tenantpay.com/' },
  { image: sobryBackgroundImage, href: 'https://sobry.co/' },
  { image: wizusBackgroundImage, href: 'https://wizus.io/' },
  { image: tatamBackgroundImage, href: 'https://tatamihq.com/' },
  { image: enforceBackgroundImage, href: '' },
  { image: kapturzBackgroundImage, href: '' },
  { image: palomaBackgroundImage, href: 'https://palomapadel.com/' },
  { image: tenantPayBackgroundImage, href: 'https://tenantpay.com/' },
  { image: sobryBackgroundImage, href: 'https://sobry.co/' },
  { image: wizusBackgroundImage, href: 'https://wizus.io/' },
  { image: tatamBackgroundImage, href: 'https://tatamihq.com/' },
  { image: enforceBackgroundImage, href: '' },
  { image: kapturzBackgroundImage, href: '' },
  { image: palomaBackgroundImage, href: 'https://palomapadel.com/' },
];

const BrowseLatest = () => {
  const t = useTranslations('browseLatest');

  return (
    <div
      id="portfolio"
      className="flex flex-col gap-11 w-full pt-12 xl:pt-26 pb-2 lg:pb-20.5 bg-linear-to-b from-white from-0% via-[#4787FE] to-white xl:to-[#4787FE] overflow-x-hidden"
    >
      <motion.div
        className="flex flex-col xl:flex-row justify-center items-center gap-6 -space-y-4 xl:space-y-0 xl:col-span-2"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <p className="font-oxva text-[2.625rem] xl:text-[6rem] tracking-wide leading-[100%] text-[#230849]">
          {t('browseLatest')}
        </p>
        <CustomShadowDiv
          className="mb-6 flex items-center justify-center tracking-tighter text-[#230849] uppercase px-5 text-[2rem] xl:text-[4rem] w-max rounded-[1rem] leading-[110%] -rotate-2 xl:-rotate-4"
          shadowSize={12}
        >
          {t('works')}
        </CustomShadowDiv>
      </motion.div>

      <div className="flex flex-col lg:gap-16">
        <motion.div
          className="hidden xl:flex flex-col gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            variants={fadeInUp}
            className="text-center text-white uppercase text-lg"
          >
            {t('whoIsItFor')}
          </motion.p>
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              <motion.div variants={fadeInUp}>
                <CustomShadowDiv
                  className="flex items-center justify-center tracking-tighter h-14 text-[#230849] uppercase px-5 w-max rounded-[1rem] leading-[110%]"
                  shadowSize={4}
                >
                  {t('foodHospitality')}
                </CustomShadowDiv>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <CustomShadowDiv
                  className="flex items-center justify-center tracking-tighter h-14 text-[#230849] uppercase px-5 w-max rounded-[1rem] leading-[110%]"
                  shadowSize={4}
                >
                  {t('realEstate')}
                </CustomShadowDiv>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <CustomShadowDiv
                  className="flex items-center justify-center tracking-tighter h-14 text-[#230849] uppercase px-5 w-max rounded-[1rem] leading-[110%]"
                  shadowSize={4}
                >
                  {t('healthWellness')}
                </CustomShadowDiv>
              </motion.div>
            </div>

            <div className="flex items-center gap-3">
              <motion.div variants={fadeInUp}>
                <CustomShadowDiv
                  className="flex items-center justify-center tracking-tighter h-14 text-[#230849] uppercase px-5 w-max rounded-[1rem] leading-[110%]"
                  shadowSize={4}
                >
                  {t('coachingConsulting')}
                </CustomShadowDiv>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <CustomShadowDiv
                  className="flex items-center justify-center tracking-tighter h-14 text-[#230849] uppercase px-5 w-max rounded-[1rem] leading-[110%]"
                  shadowSize={4}
                >
                  {t('techStartups')}
                </CustomShadowDiv>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <CustomShadowDiv
                  className="flex items-center justify-center tracking-tighter h-14 text-[#230849] uppercase px-5 w-max rounded-[1rem] leading-[110%]"
                  shadowSize={4}
                >
                  {t('tradesConstruction')}
                </CustomShadowDiv>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="w-full flex flex-col"
        >
          <Swiper
            loop={true}
            centeredSlides={true}
            slidesPerView="auto"
            spaceBetween={24}
            speed={600}
            grabCursor={true}
            style={{ width: '100%' }}
            modules={[Autoplay]}
            autoplay={{
              delay: 2800,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
          >
            {PROJECTS.map((project, index) => (
              <SwiperSlide
                key={index}
                className="w-[80vw]! lg:w-[45vw]! max-w-175 pb-6 cursor-grab"
              >
                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CustomShadowDiv className="w-full rounded-[1rem] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={t('projectAlt', { index: index + 1 })}
                        className="w-full h-auto block"
                        sizes="(max-width: 1024px) 80vw, 45vw"
                        priority={index < 2}
                      />
                    </CustomShadowDiv>
                  </a>
                ) : (
                  <CustomShadowDiv className="w-full rounded-[1rem] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={t('projectAlt', { index: index + 1 })}
                      className="w-full h-auto block"
                      sizes="(max-width: 1024px) 80vw, 45vw"
                      priority={index < 2}
                    />
                  </CustomShadowDiv>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
          <CustomButton
            className="mt-5 mx-auto lg:hidden rounded-full uppercase"
            onClick={() => {
              const section = document.querySelector('#pricing');
              if (section) section.scrollIntoView({ behavior: 'smooth' });
              window.history.pushState(null, '', '#pricing');
              logEvent('cta_click', {
                button_name: 'start_now',
                location: 'browse_latest',
              });
            }}
          >
            {t('startNow')}
          </CustomButton>
        </motion.div>

        <Testimonials className="lg:hidden bg-transparent!" />
      </div>
    </div>
  );
};

export default BrowseLatest;
