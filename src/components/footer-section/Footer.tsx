'use client';

import React from 'react';
import Image from 'next/image';
import { clouds1Image, logo } from '../../../public';
import InstagramIcon from '@/components/icons/InstagramIcon';
import CustomShadowDiv from '@/components/custom/CustomShadowDiv';
import LinkedInIcon from '@/components/icons/LinkedInIcon';
import CustomButton from '@/components/custom/CustomButton';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';
import CollapsibleBox from '@/components/footer-section/CollapsibleBox';
import { Link } from '@/i18n/navigation';
import { motion, Variants } from 'framer-motion';
import { usePathname } from '@/i18n/navigation';
import { useRouter } from 'next/navigation';
import { useCurrency } from '@/lib/useCurrency';
import { useTranslations } from 'next-intl';
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
  visible: { transition: { staggerChildren: 0.07 } },
};

const socialBtnVariants: Variants = {
  rest: { y: 0, scale: 1, rotate: 0 },
  hover: {
    y: -5,
    scale: 1.1,
    rotate: -6,
    transition: { type: 'spring', stiffness: 380, damping: 14 },
  },
  tap: { scale: 0.9, rotate: 0, y: 0 },
};

const EXPLORE_LINKS = [
  { key: 'services', tKey: 'services' as const, href: '#services' },
  { key: 'process', tKey: 'process' as const, href: '#process' },
  { key: 'portfolio', tKey: 'portfolio' as const, href: '#portfolio' },
  { key: 'offer', tKey: 'pricing' as const, href: '#pricing' },
] as const;

interface CollapsibleItem {
  title: string;
  description: string;
}

const Footer = () => {
  const { formatPrice } = useCurrency();
  const t = useTranslations('footer');

  const COLLAPSIBLE_ITEMS: CollapsibleItem[] = Array.from(
    { length: 7 },
    (_, i) => ({
      title: t(`faq.${i}.title`),
      description:
        i === 4
          ? t(`faq.${i}.description`, {
              singlePrice: formatPrice(89),
              multiPrice: formatPrice(109),
            })
          : t(`faq.${i}.description`),
    }),
  );
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = (href: string) => {
    if (pathname !== '/') {
      router.push(`/${href}`);
      return;
    }

    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    window.history.pushState(null, '', href);
  };

  return (
    <>
      <footer className="relative bg-linear-to-b from-white from-0% via-[#4787FE] to-[#4787FE] px-2.5 lg:px-4.5 pb-4 pt-20 overflow-hidden">
        <div className="flex flex-col gap-14 lg:gap-36.5 max-w-310 mx-auto h-full w-full">
          <div className="grid lg:grid-cols-2 gap-10.5 lg:gap-4">
            <motion.div
              className="hidden lg:flex flex-col gap-16"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div variants={fadeInUp} className="flex flex-col">
                <p className="text-white tracking-wide text-[6rem] font-oxva leading-[97%]">
                  {t('frequently')}
                </p>
                <CustomShadowDiv
                  className="-rotate-3 xl:-ms-4 flex items-center w-max rounded-[1rem] text-[#230849] tracking-tight text-[3rem] leading-[120%] px-4.5"
                  shadowSize={14}
                >
                  {t('askedQuestions')}
                </CustomShadowDiv>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <CustomButton
                  data-cal-link="hellobigbrowser/call-with-bigbrowser"
                  data-cal-namespace="call-with-bigbrowser"
                  data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                  className="bg-[#9342FD]! text-white w-max h-18 rounded-full text-2xl uppercase leading-[150%] hover:bg-[#9342FD]/80!"
                  icon={<ArrowRightIcon fill="#FFFFFF" className="size-6" />}
                  iconPosition="right"
                  onClick={() =>
                    logEvent('cta_click', {
                      button_name: 'book_a_call',
                      location: 'footer',
                    })
                  }
                >
                  {t('bookACall')}
                </CustomButton>
              </motion.div>
            </motion.div>

            <div className="lg:hidden flex flex-col items-center gap-2">
              <p className="text-[#230849] tracking-wide text-[2.25rem] font-oxva leading-[97%] uppercase">
                {t('mobileHeading')}
              </p>
              <CustomShadowDiv className="-rotate-3 flex items-center w-max rounded-[1rem] text-[#230849] tracking-tight text-[2.25rem] leading-[120%] px-2.5">
                {t('mobileQuestions')}
              </CustomShadowDiv>
            </div>

            <motion.div
              className="flex flex-col gap-3 z-10"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {COLLAPSIBLE_ITEMS.map((item, index) => (
                <motion.div
                  key={`collapsible-item-${index}`}
                  variants={fadeInUp}
                >
                  <CollapsibleBox
                    title={item.title}
                    description={item.description}
                    isOpen={openIndex === index}
                    onToggle={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="space-y-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="flex flex-col xl:flex-row items-center gap-10 lg:gap-19">
              <Image
                src={logo}
                alt={t('logoAlt')}
                className="w-auto h-20 lg:h-75 object-contain object-center z-10"
              />

              <div className="relative grid grid-cols-2 gap-4 lg:w-max w-full lg:px-0 px-2.5">
                <div className="flex flex-col gap-2">
                  <p className="text-white text-xl lg:text-2xl leading-[130%] uppercase">
                    {t('explore')}
                  </p>
                  <div className="flex flex-col gap-2">
                    {EXPLORE_LINKS.map((link) => (
                      <button
                        key={link.key}
                        className="text-white text-start font-neue-montreal text-lg lg:text-xl leading-[130%] tracking-tight hover:underline cursor-pointer"
                        onClick={() => scrollToSection(link.href)}
                      >
                        {t(link.tKey)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <p className="text-white text-xl lg:text-2xl leading-[130%] uppercase">
                    {t('legal')}
                  </p>
                  <div className="flex flex-col items-start gap-2">
                    <Link href="/privacy-policy">
                      <p className="text-white font-neue-montreal text-lg lg:text-xl leading-[130%] tracking-tight hover:underline">
                        {t('privacyPolicy')}
                      </p>
                    </Link>
                    <Link href="/terms-and-conditions">
                      <p className="text-white font-neue-montreal text-lg lg:text-xl leading-[130%] tracking-tight hover:underline">
                        {t('termsConditions')}
                      </p>
                    </Link>
                    <Link href="/refund-policy">
                      <p className="text-white font-neue-montreal text-lg lg:text-xl leading-[130%] tracking-tight hover:underline">
                        {t('refundPolicy')}
                      </p>
                    </Link>
                  </div>
                </div>

                <div className="pt-6 col-span-2 flex flex-col lg:items-start items-center gap-2">
                  <p className="text-white text-xl lg:text-2xl leading-[130%] uppercase">
                    {t('address')}
                  </p>
                  <div className="flex flex-col gap-2">
                    <p className="text-white font-neue-montreal lg:text-start text-center text-lg lg:text-xl leading-[130%] tracking-tight">
                      {t.rich('addressText', { br: () => <br /> })}
                    </p>
                  </div>
                </div>

                <div className="absolute -bottom-8 -right-24 hidden xl:flex items-center gap-4 z-10">
                  <motion.div
                    variants={socialBtnVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    style={{ display: 'inline-flex' }}
                  >
                    <a
                      href="https://www.instagram.com/bigbrowser.co"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <CustomShadowDiv
                        className="flex-none flex items-center justify-center size-14 rounded-[1rem] border-3 cursor-pointer"
                        shadowSize={4}
                      >
                        <InstagramIcon />
                      </CustomShadowDiv>
                    </a>
                  </motion.div>
                  <motion.div
                    variants={socialBtnVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    style={{ display: 'inline-flex' }}
                  >
                    <a
                      href="https://www.linkedin.com/company/bigbrowser"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <CustomShadowDiv
                        className="flex-none flex items-center justify-center size-14 rounded-[1rem] border-3 cursor-pointer"
                        shadowSize={4}
                      >
                        <LinkedInIcon />
                      </CustomShadowDiv>
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="flex flex-col xl:flex-row items-center justify-center xl:justify-start gap-4">
              <div className="xl:hidden flex items-center gap-4 z-10">
                <motion.div
                  variants={socialBtnVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  style={{ display: 'inline-flex' }}
                >
                  <a
                    href="https://www.instagram.com/bigbrowser.co"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CustomShadowDiv
                      className="flex-none flex items-center justify-center size-14 rounded-[1rem] border-3 cursor-pointer"
                      shadowSize={4}
                    >
                      <InstagramIcon />
                    </CustomShadowDiv>
                  </a>
                </motion.div>
                <motion.div
                  variants={socialBtnVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  style={{ display: 'inline-flex' }}
                >
                  <a
                    href="https://www.linkedin.com/company/bigbrowser"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CustomShadowDiv
                      className="flex-none flex items-center justify-center size-14 rounded-[1rem] border-3 cursor-pointer"
                      shadowSize={4}
                    >
                      <LinkedInIcon />
                    </CustomShadowDiv>
                  </a>
                </motion.div>
              </div>

              <p className="text-white font-medium font-neue-montreal text-lg">
                {t('copyright', { year: new Date().getFullYear() })}
              </p>
            </div>
          </motion.div>
        </div>

        <Image
          src={clouds1Image}
          alt={t('cloudsAlt')}
          className="absolute bottom-0 translate-y-[35%] sm:translate-y-[55%] h-auto w-screen object-cover object-center pointer-events-none z-0"
        />
      </footer>
    </>
  );
};

export default Footer;
