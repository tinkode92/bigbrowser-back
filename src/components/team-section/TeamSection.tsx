'use client';

import CustomShadowDiv from '@/components/custom/CustomShadowDiv';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import {
  chalomImage,
  gusteImage,
  joelleImage,
  mazenImage,
  milicaImage,
  ugneImage,
  yanisImage,
} from '../../../public';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { motion, Variants } from 'framer-motion';

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

const MAZEN = { src: mazenImage, key: 'mazen' };
const UGNE = { src: ugneImage, key: 'ugne' };
const YANIS = { src: yanisImage, key: 'yanis' };
const MILICA = { src: milicaImage, key: 'milica' };
const CHALOM = { src: chalomImage, key: 'chalom' };
const JOELLE = { src: joelleImage, key: 'joelle' };
const GUSTE = { src: gusteImage, key: 'guste' };

const DESKTOP_TEAM = [UGNE, GUSTE, MAZEN, MILICA, YANIS, JOELLE, CHALOM];

const MOBILE_TEAM = [UGNE, GUSTE, MAZEN, MILICA, YANIS, JOELLE, CHALOM];

const TeamSection = () => {
  const t = useTranslations('team');
  const locale = useLocale();

  return (
    <div
      id="about"
      className="relative w-full bg-white py-4 xl:py-18 overflow-x-hidden"
    >
      <div className="flex flex-col gap-12 max-w-310 mx-auto h-full">
        <motion.div
          className="flex justify-center lg:justify-between gap-4"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <CustomShadowDiv
            className="mt-4 hidden lg:flex items-center justify-center text-2xl leading-[130%] tracking-tighter uppercase px-5 h-12.5 bg-[#99E8FF] rounded-[1rem] -rotate-10"
            shadowSize={5}
          >
            {t('passionate')}
          </CustomShadowDiv>

          <div className="flex flex-col lg:flex-row lg:gap-6 gap-2 justify-center items-center text-[#230849]">
            {locale === 'fr' ? (
              <>
                <CustomShadowDiv
                  className="flex items-center justify-center uppercase px-5 mb-4.5 text-[2.25rem] lg:text-[4rem] w-max rounded-[1rem] leading-[120%] -rotate-2"
                  shadowSize={12}
                >
                  {t('team')}
                </CustomShadowDiv>
                <p className="font-oxva text-[3rem] lg:text-[6rem] leading-[100%] lg:tracking-normal tracking-wide">
                  {t('bigbrowser')}
                </p>
              </>
            ) : (
              <>
                <p className="font-oxva text-[3rem] lg:text-[6rem] leading-[100%] lg:tracking-normal tracking-wide">
                  {t('bigbrowser')}
                </p>
                <CustomShadowDiv
                  className="flex items-center justify-center uppercase px-5 mb-4.5 text-[2.25rem] lg:text-[4rem] w-max rounded-[1rem] leading-[120%] -rotate-2"
                  shadowSize={12}
                >
                  {t('team')}
                </CustomShadowDiv>
              </>
            )}
          </div>

          <CustomShadowDiv
            className="mt-14 hidden me-4 xl:me-0 lg:flex items-center justify-center text-2xl leading-[130%] tracking-tighter uppercase px-5 h-12.5 bg-[#F9BF6E] rounded-[1rem] rotate-10"
            shadowSize={5}
          >
            {t('team')}
          </CustomShadowDiv>
        </motion.div>

        <motion.div
          className="hidden lg:flex flex-wrap justify-center gap-10.5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {DESKTOP_TEAM.map((member) => (
            <motion.div
              key={member.key}
              variants={fadeInUp}
              className="w-[calc(25%-2rem)]"
            >
              <CustomShadowDiv className="px-4 py-6 rounded-[1rem] bg-[#EBFAFF] flex flex-col gap-6">
                <Image
                  src={member.src}
                  alt={t(`members.${member.key}.alt`)}
                  className="h-full w-82.5 object-cover object-center rounded-[0.875rem]"
                />
                <div className="flex items-end justify-between gap-1.5 mt-auto">
                  <div className="flex flex-col gap-2">
                    <p className="leading-[120%] text-[#230849]">
                      {t(`members.${member.key}.name`)}
                    </p>
                    <p className="leading-[120%] text-[#230849] font-neue-montreal">
                      {t(`members.${member.key}.role`)}
                    </p>
                  </div>
                </div>
              </CustomShadowDiv>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="lg:hidden w-full mt-12"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <Swiper
          slidesPerView="auto"
          spaceBetween={16}
          centeredSlides={true}
          initialSlide={0}
          style={{ width: '100%' }}
        >
          {MOBILE_TEAM.map((member) => (
            <SwiperSlide
              key={member.key}
              className="h-auto! pb-4"
              style={{ width: '21rem', maxWidth: '21rem' }}
            >
              <CustomShadowDiv className="p-6 rounded-[1rem] bg-[#EBFAFF] flex flex-col gap-6 h-full">
                <Image
                  src={member.src}
                  alt={t(`members.${member.key}.alt`)}
                  className="w-full object-cover object-center rounded-[0.875rem]"
                />
                <div className="flex items-end justify-between gap-1.5 mt-auto">
                  <div className="flex flex-col gap-1 lg:gap-2">
                    <p className="leading-[120%] text-[#230849]">
                      {t(`members.${member.key}.name`)}
                    </p>
                    <p className="leading-[120%] text-[#230849] font-neue-montreal">
                      {t(`members.${member.key}.role`)}
                    </p>
                  </div>
                </div>
              </CustomShadowDiv>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </div>
  );
};

export default TeamSection;
