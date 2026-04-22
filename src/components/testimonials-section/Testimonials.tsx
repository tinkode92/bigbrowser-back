'use client';

import CustomShadowDiv from '@/components/custom/CustomShadowDiv';
import Image from 'next/image';
import { clouds1Image } from '../../../public';
import TestimonialsBox from '@/components/testimonials-section/TestimonialsBox';
import { cn } from '@/lib/utils';
import { motion, Variants } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const FEATURED_SPANS = new Set([0, 3]);

interface TestimonialsProps {
  className?: string;
}

const Testimonials = ({ className }: TestimonialsProps) => {
  const t = useTranslations('testimonials');
  const locale = useLocale();

  const FEEDBACKS = Array.from({ length: 7 }, (_, i) => ({
    name: t(`feedbacks.${i}.name`),
    role: t(`feedbacks.${i}.role`),
    message: t(`feedbacks.${i}.message`),
    image: `/images/testimonials-section/${['user-1.png', 'user-6.webp', 'user-3.png', 'user-5.jpeg', 'user-7.webp', 'user-2.png', 'user-4.png'][i]}`,
    rate: 5,
    metric: t(`feedbacks.${i}.metric`),
  }));

  return (
    <div
      className={cn(
        'relative px-2.5 md:px-12 xl:px-18.5 py-14 xl:py-40 overflow-hidden',
        'lg:bg-linear-to-b lg:from-white lg:from-0% via-[#4787FE] via-50% to-white to-100%',
        className,
      )}
    >
      <Image
        src={clouds1Image}
        alt={t('cloudsAlt')}
        className="hidden lg:inline absolute top-50 h-auto w-screen object-cover object-center pointer-events-none z-0"
      />

      <div className="flex flex-col gap-8 max-w-310 mx-auto h-full">
        <motion.div
          className="flex justify-center xl:justify-between gap-4 lg:ps-12.5"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <CustomShadowDiv
            className="mt-4 hidden xl:flex items-center justify-center text-2xl leading-[130%] tracking-tighter uppercase px-5 h-12.5 bg-[#99E8FF] rounded-[1rem] rotate-10"
            shadowSize={5}
          >
            {t('woaa')}
          </CustomShadowDiv>
          <div className="flex flex-col items-center text-[4rem] text-white z-10">
            <div className="font-oxva text-[6rem] lg:leading-[97%] tracking-wide text-center">
              <p className="hidden lg:flex justify-center">
                {t('theyLoveTheir')}
              </p>
              <p className="lg:hidden flex justify-center text-[2rem]">
                {t('theyLoveTheirMobile')}
              </p>
              <div className="flex items-center justify-center gap-8">
                {locale === 'en' && (
                  <p className="hidden lg:inline">{t('bigbrowser')}</p>
                )}
                <CustomShadowDiv
                  className="font-boink hidden lg:inline-flex items-center justify-center uppercase px-3 text-[#230849] text-[4rem] mb-4.5 h-max w-max rounded-[1rem] tracking-tight leading-[120%] -rotate-2"
                  shadowSize={12}
                >
                  {t('website')}
                </CustomShadowDiv>
                <CustomShadowDiv className="font-boink lg:hidden inline-flex items-center justify-center uppercase px-3 text-[#230849] text-[2rem] mb-4.5 h-max w-max rounded-[1rem] tracking-tight leading-[120%] -rotate-2">
                  {t('website')}
                </CustomShadowDiv>
              </div>
            </div>
          </div>

          <CustomShadowDiv
            className="mt-14 hidden xl:flex items-center justify-center text-2xl leading-[130%] tracking-tighter uppercase px-5 h-12.5 bg-[#F9BF6E] rounded-[1rem] -rotate-10"
            shadowSize={5}
          >
            {t('niceJob')}
          </CustomShadowDiv>
        </motion.div>

        <motion.div
          className="hidden lg:grid lg:grid-cols-3 gap-5 relative z-10"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {FEEDBACKS.map((feedback, index) => (
            <div
              key={`feedback-desktop-${index}`}
              className={cn(
                'flex flex-col transition-transform duration-200 hover:-translate-y-1',
                FEATURED_SPANS.has(index) ? 'lg:col-span-2' : 'col-span-1',
              )}
            >
              <TestimonialsBox
                username={feedback.name}
                userJobTitle={feedback.role}
                userAvatarUrl={feedback.image}
                content={feedback.message}
                starsCount={feedback.rate}
                metric={feedback.metric}
                className={cn(
                  '!h-full',
                  FEATURED_SPANS.has(index) &&
                    'bg-gradient-to-br from-white via-white to-[#E9D9FF]/40',
                )}
              />
            </div>
          ))}
        </motion.div>

        <motion.div
          className="lg:hidden columns-1 md:columns-2 gap-5 relative z-10 *:mb-5 *:break-inside-avoid"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {FEEDBACKS.slice(0, 4).map((feedback, index) => (
            <TestimonialsBox
              key={`feedback-mobile-${index}`}
              username={feedback.name}
              userJobTitle={feedback.role}
              userAvatarUrl={feedback.image}
              content={feedback.message}
              starsCount={feedback.rate}
              metric={feedback.metric}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;
