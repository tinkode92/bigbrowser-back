'use client';

import Image from 'next/image';
import { clouds1Image } from '../../../../public';
import Navbar from '@/components/hero-section/Navbar';
import CustomButton from '@/components/custom/CustomButton';
import CustomShadowDiv from '@/components/custom/CustomShadowDiv';
import { motion, Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import ScrollToTop from '@/components/shared/ScrollToTop';

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
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20, delay: 0.2 },
  },
};

const circleVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeInOut', delay: 0.3 },
  },
};

const checkVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut', delay: 0.8 },
  },
};

const ThankYouPage = () => {
  const t = useTranslations('thankYou');

  return (
    <main className="relative flex flex-col min-h-screen overflow-hidden">
      <ScrollToTop />

      <div className="relative w-full bg-linear-to-b from-[#4787FE] via-[#4787FE] to-[#4787FE] pt-4 xl:pt-9.25 flex-1">
        <motion.div
          className="absolute bottom-0 translate-y-[40%] h-auto w-screen pointer-events-none z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
        >
          <Image
            src={clouds1Image}
            alt="Clouds Background"
            className="h-auto w-screen object-cover object-center"
          />
        </motion.div>

        <div className="flex flex-col max-w-310 mx-auto h-full relative z-10">
          <Navbar />

          <motion.div
            className="flex flex-col items-center justify-center flex-1 px-5 py-16 lg:py-24"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={scaleIn} className="relative mb-8">
              <motion.div
                className="flex items-center justify-center size-24 lg:size-32 rounded-full bg-white border-[5px] border-[#230849]"
                style={{
                  boxShadow: '-6px 6px 0px 0px rgb(35,8,73)',
                }}
              >
                <svg
                  className="size-12 lg:size-16"
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="#9342FD"
                    strokeWidth="5"
                    strokeLinecap="round"
                    fill="none"
                    variants={circleVariants}
                    initial="hidden"
                    animate="visible"
                  />
                  <motion.path
                    d="M24 40 L35 52 L56 28"
                    stroke="#230849"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    variants={checkVariants}
                    initial="hidden"
                    animate="visible"
                  />
                </svg>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeInUp} className="mb-8">
              <CustomShadowDiv
                className="flex items-center justify-center rounded-[1rem] px-6 lg:px-10 py-3 lg:py-4 -rotate-1"
                shadowSize={10}
                interactive={false}
              >
                <h1 className="font-oxva text-[#230849] text-[2rem] md:text-[2.75rem] lg:text-[3.5rem] uppercase leading-[110%] text-center">
                  {t('allSet')}
                </h1>
              </CustomShadowDiv>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col items-center gap-2 mb-10 lg:mb-14"
            >
              <p className="font-neue-montreal text-white text-center text-lg md:text-xl lg:text-2xl leading-[140%] max-w-xl">
                {t('thanksHeading')}{' '}
                <span className="font-bold">{t('bigbrowser')}</span>
              </p>
              <p className="font-neue-montreal text-white text-center text-lg md:text-xl lg:text-2xl leading-[140%] max-w-xl">
                {t('excited')}
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="w-full max-w-lg mb-10">
              <CustomShadowDiv
                className="flex flex-col items-center gap-5 rounded-[1.25rem] px-6 lg:px-10 py-8 lg:py-10"
                shadowSize={8}
                interactive={false}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl lg:text-3xl">💬</span>
                  <h2 className="font-oxva text-[#230849] text-lg md:text-xl lg:text-2xl uppercase leading-[120%]">
                    {t('reachUs')}
                  </h2>
                </div>
                <p className="font-neue-montreal text-[#230849]/80 text-center text-sm md:text-base lg:text-lg leading-[150%]">
                  {t('contactText')}
                </p>
                <a
                  href="https://wa.me/message/OHILIN5AIZRPK1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CustomButton
                    className="bg-[#25D366]! text-white rounded-full text-base lg:text-lg uppercase leading-[150%] hover:bg-[#25D366]/85! h-13 lg:h-14 border-[#128C7E] shadow-[-6px_6px_0px_0px_rgb(18,140,126)] hover:shadow-[-2px_2px_0px_0px_rgb(18,140,126)]"
                    icon={
                      <svg
                        className="size-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    }
                    iconPosition="left"
                  >
                    {t('contactUs')}
                  </CustomButton>
                </a>
              </CustomShadowDiv>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ThankYouPage;
