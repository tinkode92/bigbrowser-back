'use client';

import Image from 'next/image';
import {
  satisfactionImageEn,
  satisfactionImageFr,
  starsImage,
} from '../../../public';
import HeroLottie from '@/components/hero-section/HeroLottie';
import CustomButton from '@/components/custom/CustomButton';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';
import CustomShadowDiv from '@/components/custom/CustomShadowDiv';
import StarIcon from '@/components/icons/StarIcon';
import { motion, Variants } from 'framer-motion';
import { logEvent } from '@/lib/analytics';
import { useTranslations, useLocale } from 'next-intl';

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
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const WebsitesBox = () => {
  const t = useTranslations('hero');
  const locale = useLocale();
  const satisfactionImage =
    locale === 'fr' ? satisfactionImageFr : satisfactionImageEn;
  const handleNavClick = (href: string) => {
    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }

    window.history.pushState(null, '', href);
  };

  return (
    <>
      <motion.div
        className="relative flex flex-col items-center xl:items-start gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeInUp}>
          <Image
            src={satisfactionImage}
            alt={t('satisfactionAlt')}
            className="w-auto h-7 md:h-10.5 xl:h-10 object-contain object-center"
          />
        </motion.div>
        <motion.div
          className="flex flex-col items-center xl:items-start gap-8.75 xl:px-0 px-5"
          variants={staggerContainer}
        >
          <motion.div
            className="flex flex-col items-center xl:items-start gap-6.5"
            variants={fadeInUp}
          >
            <div className="flex flex-col items-center xl:items-start text-white text-[3rem] md:text-[3.5rem] xl:text-[6.5rem] uppercase -space-y-1 xl:-space-y-4">
              <p className="font-oxva leading-[100%]">{t('highConverting')}</p>
              <CustomShadowDiv className="flex items-center h-14 xl:h-24 -ms-2.5 -rotate-2 w-max bg-white text-[#230849] text-[2.25rem] md:text-[2.5rem] xl:text-[4.375rem] uppercase rounded-[0.75rem] xl:rounded-[1rem] px-3">
                {t('websites')}
              </CustomShadowDiv>
              <p className="font-oxva">{t('designedToPerform')}</p>
            </div>
            <div className="font-neue-montreal text-white text-center xl:text-start text-sm xl:text-xl leading-[120%] max-w-2xl">
              <p>{t('desc1')}</p>
              <p>{t('desc2')}</p>
              <p>{t('desc3')}</p>
            </div>
          </motion.div>
          <motion.div className="flex items-center gap-3" variants={fadeInUp}>
            <CustomButton
              className="rounded-full bg-[#E9D9FF]! uppercase px-3.5 sm:px-6"
              icon={<ArrowRightIcon />}
              iconPosition="right"
              onClick={() => {
                handleNavClick('#pricing');
                logEvent('cta_click', {
                  button_name: 'start_now',
                  location: 'hero',
                });
              }}
            >
              {t('startNow')}
            </CustomButton>
            <CustomButton
              data-cal-link="hellobigbrowser/call-with-bigbrowser"
              data-cal-namespace="call-with-bigbrowser"
              data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
              className="rounded-full uppercase px-3.5 sm:px-6"
              onClick={() =>
                logEvent('cta_click', {
                  button_name: 'book_a_call',
                  location: 'hero',
                })
              }
            >
              {t('bookACall')}
            </CustomButton>
          </motion.div>
          <motion.div
            className="hidden lg:flex items-center gap-2.5 font-roboto"
            variants={fadeInUp}
          >
            <p className="text-sm font-bold">{t('excellent')}</p>
            <Image
              src={starsImage}
              alt={t('starsAlt')}
              className="h-6 w-auto object-contain object-center"
            />
            <StarIcon />
            <p className="text-sm font-bold">{t('trustpilot')}</p>
          </motion.div>
        </motion.div>

        <div className="hidden xl:inline absolute top-0 right-0">
          <HeroLottie />
        </div>
      </motion.div>
    </>
  );
};

export default WebsitesBox;
