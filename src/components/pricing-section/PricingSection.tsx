'use client';

import { useState } from 'react';
import CustomShadowDiv from '@/components/custom/CustomShadowDiv';
import DollarIcon from '@/components/icons/DollarIcon';
import CustomButton from '@/components/custom/CustomButton';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import TargetDollarIcon from '@/components/icons/TargetDollarIcon';
import {
  amexLogo,
  applePayLogo,
  googlePayLogo,
  mastercardLogo,
  stripeLogo,
  visaLogo,
} from '../../../public';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import SlotDigit from '@/components/pricing-section/SlotDigit';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useCurrency } from '@/lib/useCurrency';
import { logEvent } from '@/lib/analytics';
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
  visible: { transition: { staggerChildren: 0.1 } },
};

const PAYMENT_PLANS = [
  visaLogo,
  mastercardLogo,
  amexLogo,
  stripeLogo,
  googlePayLogo,
  applePayLogo,
] as const;

const PricingSection = () => {
  const { formatPrice, formatAddonPrice, symbol } = useCurrency();
  const t = useTranslations('pricing');
  const isFrench = symbol === '€';
  const currency: 'USD' | 'EUR' = isFrench ? 'EUR' : 'USD';

  const [selectedPlan, setSelectedPlan] = useState<
    'single-page-website' | 'multi-page-website'
  >('single-page-website');

  const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>(
    {
      seo: false,
      brand: false,
      content: false,
      crm: false,
    },
  );

  const addons = [
    {
      id: 'seo',
      label: t('seoLabel'),
      value: 149,
      tooltip: t('seoTooltip'),
    },
    {
      id: 'brand',
      label: t('brandLabel'),
      value: 20,
      tooltip: t('brandTooltip'),
    },
    {
      id: 'content',
      label: t('contentLabel'),
      value: 30,
      tooltip: t('contentTooltip'),
    },
    {
      id: 'crm',
      label: t('crmLabel'),
      value: 30,
      tooltip: t('crmTooltip'),
    },
  ];

  const planPrices: Record<string, number> = {
    'single-page-website': 89,
    'multi-page-website': 109,
  };

  const total =
    planPrices[selectedPlan] +
    addons.reduce(
      (sum, addon) => sum + (selectedAddons[addon.id] ? addon.value : 0),
      0,
    );

  const handlePlanChange = (
    value: 'single-page-website' | 'multi-page-website',
  ) => {
    setSelectedPlan(value);
    logEvent('pricing_plan_selected', { plan: value });
  };

  const handleAddonToggle = (id: string, checked: boolean) => {
    setSelectedAddons((prev) => ({ ...prev, [id]: checked }));
    logEvent('pricing_addon_toggled', { addon_id: id, enabled: checked });
  };

  const checkoutUrl = (() => {
    const activeAddons = Object.entries(selectedAddons)
      .filter(([, active]) => active)
      .map(([id]) => id);
    const params = new URLSearchParams({ plan: selectedPlan, currency });
    if (activeAddons.length > 0) params.set('addons', activeAddons.join(','));
    return `https://start.bigbrowser.co?${params.toString()}`;
  })();

  const handleStartNow = () => {
    const activeAddons = Object.entries(selectedAddons)
      .filter(([, active]) => active)
      .map(([id]) => id);
    logEvent('checkout_initiated', {
      plan: selectedPlan,
      addons: activeAddons.join(',') || 'none',
      value: total,
      currency,
    });
    window.open(checkoutUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <div
        id="pricing"
        className="relative bg-linear-to-b from-white xl:from-[#4787FE] xl:from-5% xl:via-white xl:via-40% via-[#E2EDFD] to-white px-5 xl:px-20 pt-4 xl:pt-20 pb-16 overflow-hidden"
      >
        <div className="flex flex-col gap-12 max-w-310 mx-auto h-full">
          <motion.div
            className="grid xl:grid-cols-3 gap-14.5"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="hidden xl:flex items-center justify-end">
              <CustomShadowDiv
                className="mt-4 flex items-center justify-center text-2xl leading-[130%] tracking-tighter uppercase px-5 h-12.5 bg-[#99E8FF] rounded-[1rem] -rotate-6"
                shadowSize={5}
              >
                {t('noHiddenFees')}
              </CustomShadowDiv>
            </div>

            <div className="flex flex-col xl:flex-row items-center gap-6 -space-y-4 xl:space-y-0 xl:col-span-2">
              <p className="font-oxva text-[2.625rem] xl:text-[6rem] tracking-wide leading-[100%] text-[#230849]">
                {t('pricingAnd')}
              </p>
              <CustomShadowDiv
                className="mb-6 flex items-center justify-center tracking-tighter text-[#230849] uppercase px-5 text-[2rem] xl:text-[4rem] w-max rounded-[1rem] leading-[110%] -rotate-2 xl:-rotate-4"
                shadowSize={12}
              >
                {t('offer')}
              </CustomShadowDiv>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <CustomShadowDiv
              className="grid grid-cols-1 xl:grid-cols-11 rounded-[1.25rem] xl:overflow-visible overflow-hidden"
              interactive={false}
            >
              <motion.div
                className="flex flex-col gap-4 md:gap-8 p-7.5 md:p-12 col-span-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <motion.div variants={fadeInUp} className="flex gap-5 lg:gap-8">
                  <CustomShadowDiv
                    className="flex justify-center items-center size-10 lg:size-12.5 border-3 rounded-[0.75rem] lg:rounded-[1rem] bg-[#1FC16B]"
                    shadowSize={4}
                  >
                    <DollarIcon fill="white" />
                  </CustomShadowDiv>

                  <div className="text-[#230849] tracking-tight leading-[120%] text-lg md:text-2xl lg:text-[2rem] uppercase">
                    <p>{t('premiumWebsite')}</p>
                    <p>{t('websiteForJust')}</p>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className="flex items-center gap-2"
                >
                  <div className="text-[#230849] tracking-tight w-max h-max leading-[120%] text-[3.375rem] md:text-[4rem] lg:text-[5.625rem] uppercase flex items-end">
                    {!isFrench && symbol}
                    {String(total)
                      .split('')
                      .map((digit, index) => (
                        <SlotDigit
                          key={`${index}-${String(total).length}`}
                          digit={Number(digit)}
                          className="text-[3.375rem] md:text-[4rem] lg:text-[5.625rem]"
                        />
                      ))}
                    {isFrench && (
                      <span className="ml-2 font-neue-montreal font-bold h-[1.2em] flex items-center -translate-y-[0.1em]">
                        {symbol}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5 lg:gap-2">
                    <p className="text-[#230849] tracking-tight leading-[100%] uppercase text-[0.625rem] md:text-sm lg:text-base">
                      {t('perMonth')}
                    </p>
                    <p className="font-medium text-xs md:text-base lg:text-xl font-neue-montreal leading-[120%]">
                      {t('commitment')}
                    </p>
                  </div>
                </motion.div>

                <motion.p
                  variants={fadeInUp}
                  className="max-w-121.5 font-neue-montreal font-medium text-xs md:text-base lg:text-lg text-[#230849]"
                >
                  {t('description')}
                </motion.p>

                <motion.div
                  variants={fadeInUp}
                  className="hidden lg:flex items-center gap-6.5"
                >
                  <CustomButton
                    data-cal-link="hellobigbrowser/call-with-bigbrowser"
                    data-cal-namespace="call-with-bigbrowser"
                    data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                    className="h-12.5! text-lg rounded-full uppercase"
                    onClick={() =>
                      logEvent('cta_click', {
                        button_name: 'book_a_call',
                        location: 'pricing',
                      })
                    }
                  >
                    {t('bookACall')}
                  </CustomButton>
                  <CustomButton
                    className="h-12.5! text-lg rounded-full bg-[#E9D9FF]! uppercase"
                    icon={<ArrowRightIcon />}
                    iconPosition="right"
                    onClick={handleStartNow}
                  >
                    {t('startNow')}
                  </CustomButton>
                </motion.div>

                <motion.div
                  variants={staggerContainer}
                  className="hidden md:flex flex-col gap-2.5 lg:gap-4"
                >
                  <motion.div
                    variants={fadeInUp}
                    className="flex items-center gap-2"
                  >
                    <ArrowRightIcon className="lg:size-5 md:size-4 size-3.5" />
                    <p className="font-neue-montreal font-medium text-xs md:text-base lg:text-xl leading-[120%] text-[#230849]">
                      {t('customBuilt')}
                    </p>
                  </motion.div>
                  <motion.div
                    variants={fadeInUp}
                    className="flex items-center gap-2"
                  >
                    <ArrowRightIcon className="lg:size-5 md:size-4 size-3.5" />
                    <p className="font-neue-montreal font-medium text-xs md:text-base lg:text-xl leading-[120%] text-[#230849]">
                      {t('noShortcuts')}
                    </p>
                  </motion.div>
                  <motion.div
                    variants={fadeInUp}
                    className="flex items-center gap-2"
                  >
                    <ArrowRightIcon className="lg:size-5 md:size-4 size-3.5" />
                    <p className="font-neue-montreal font-medium text-xs md:text-base lg:text-xl leading-[120%] text-[#230849]">
                      {t('craftedWithIntention')}
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                className="relative flex flex-col gap-6 p-7.5 md:p-12 bg-[#EBFAFF] xl:rounded-e-[0.75rem] col-span-5"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <CustomShadowDiv className="hidden xl:flex justify-center items-center size-19 border-4 rounded-[1.25rem] bg-[#F16161] rotate-14 absolute z-20 right-20 -top-12">
                  <TargetDollarIcon />
                </CustomShadowDiv>

                <motion.div variants={fadeInUp} className="flex flex-col gap-6">
                  <p className="text-[#230849] text-sm md:text-base lg:text-2xl leading-[120%] tracking-tight uppercase">
                    {t('websitePackages')}
                  </p>
                  <RadioGroup
                    className="flex flex-col gap-6"
                    defaultValue="single-page-website"
                    onValueChange={handlePlanChange}
                  >
                    <motion.div
                      variants={fadeInUp}
                      className="flex items-center gap-4"
                    >
                      <RadioGroupItem
                        value="single-page-website"
                        id="r1"
                        className={cn(
                          'size-5 md:size-7 border cursor-pointer',
                          selectedPlan === 'single-page-website'
                            ? 'bg-[#230849]!  border-[#230849]!'
                            : 'bg-white! border-[#D2D5DA]!',
                        )}
                        onClick={() => handlePlanChange('single-page-website')}
                      />
                      <p className="text-[#230849] text-xs md:text-base lg:text-xl font-neue-montreal font-medium">
                        {t('singlePage')}
                      </p>
                      <div className="flex items-center rounded-full bg-[#230151] px-2 font-neue-montreal text-[0.625rem] md:text-base font-medium text-white h-6 md:h-8.5">
                        {formatPrice(89)}
                        {t('perMonth')}
                      </div>
                    </motion.div>

                    <motion.div
                      variants={fadeInUp}
                      className="flex items-center gap-4"
                    >
                      <RadioGroupItem
                        value="multi-page-website"
                        id="r2"
                        className={cn(
                          'size-5 md:size-7 border cursor-pointer',
                          selectedPlan === 'multi-page-website'
                            ? 'bg-[#230849]!  border-[#230849]!'
                            : 'bg-white! border-[#D2D5DA]!',
                        )}
                        onClick={() => handlePlanChange('multi-page-website')}
                      />
                      <p className="text-[#230849] text-xs md:text-base lg:text-xl font-neue-montreal font-medium">
                        {t('multiPage')}
                      </p>
                      <div className="flex items-center rounded-full bg-[#230151] px-2 font-neue-montreal text-[0.625rem] md:text-base font-medium text-white h-6 md:h-8.5">
                        {formatPrice(109)}
                        {t('perMonth')}
                      </div>
                    </motion.div>
                  </RadioGroup>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex flex-col gap-6">
                  <p className="text-[#230849] text-sm md:text-base lg:text-2xl leading-[120%] tracking-tight uppercase">
                    {t('enhancementsAddons')}
                  </p>
                  <motion.div
                    variants={staggerContainer}
                    className="flex flex-col gap-6"
                  >
                    {addons.map((addon) => (
                      <motion.div
                        key={addon.id}
                        variants={fadeInUp}
                        className="flex items-center gap-4"
                      >
                        <Switch
                          checked={selectedAddons[addon.id]}
                          onCheckedChange={(checked) =>
                            handleAddonToggle(addon.id, checked)
                          }
                          className="data-[size=default]:h-5 data-[size=default]:w-8.5 md:data-[size=default]:h-8 md:data-[size=default]:w-14.5 data-[state=checked]:bg-[#230849]! data-[state=unchecked]:bg-[#D2D5D]! cursor-pointer"
                        />
                        <p className="text-[#230849] text-xs md:text-base lg:text-xl  font-neue-montreal font-medium">
                          {addon.label}
                        </p>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center rounded-full bg-[#230151] px-2 font-neue-montreal text-[0.625rem] md:text-base font-medium text-white h-6 md:h-8.5 whitespace-nowrap cursor-help">
                              {formatAddonPrice(addon.value)}
                              {t('perMonth')}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            className="max-w-72 text-xs font-neue-montreal leading-[1.5] px-3.5 py-2.5 bg-[#230849] text-white rounded-[0.6rem] border-0"
                          >
                            {addon.tooltip}
                          </TooltipContent>
                        </Tooltip>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            </CustomShadowDiv>
          </motion.div>

          <motion.div
            className="hidden lg:flex justify-center items-center gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {PAYMENT_PLANS.map((plan, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Image
                  src={plan}
                  alt={t('paymentPlanAlt', { index: index + 1 })}
                  className="h-7 w-max object-contain object-center"
                />
              </motion.div>
            ))}
          </motion.div>

          <div className="lg:hidden flex items-center justify-center gap-4">
            <CustomButton
              data-cal-link="hellobigbrowser/call-with-bigbrowser"
              data-cal-namespace="call-with-bigbrowser"
              data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
              className="h-12.5! text-xs rounded-full uppercase"
              onClick={() =>
                logEvent('cta_click', {
                  button_name: 'book_a_call',
                  location: 'pricing',
                })
              }
            >
              {t('bookACall')}
            </CustomButton>
            <CustomButton
              className="h-12.5! text-xs rounded-full bg-[#E9D9FF]! uppercase"
              icon={<ArrowRightIcon className="size-3.5" />}
              iconPosition="right"
              onClick={handleStartNow}
            >
              {t('startNow')}
            </CustomButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingSection;
