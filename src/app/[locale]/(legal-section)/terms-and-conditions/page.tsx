'use client';

import CustomButton from '@/components/custom/CustomButton';
import { ChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

const TermsAndConditionsPage = () => {
  const router = useRouter();
  const t = useTranslations('terms');

  return (
    <div className="flex flex-col gap-10 py-20 max-w-3xl mx-auto px-4 md:px-0">
      <CustomButton
        icon={<ChevronLeft />}
        className="shadow-none! w-max border-0 rounded-full px-0 h-10 bg-transparent! text-white hover:bg-transparent!"
        onClick={() => router.push('/')}
      >
        {t('backToHome')}
      </CustomButton>

      <div className="flex flex-col gap-8 font-neue-montreal text-[#230849]">
        {/* 1. Introduction and Parties */}
        <div className="flex flex-col gap-2.5">
          <p className="font-semibold text-xl md:text-2xl">{t('s1Title')}</p>
          <p className="text-justify font-medium">{t('s1Text')}</p>
        </div>

        {/* 2. Service Scope, Maintenance, and 12-Month Minimum Commitment */}
        <div className="flex flex-col gap-2.5">
          <p className="font-semibold text-xl md:text-2xl">{t('s2Title')}</p>
          <p className="text-justify font-medium">{t('s2Text')}</p>
        </div>

        {/* 3. Early Termination Policy (Acceleration Clause) */}
        <div className="flex flex-col gap-2.5">
          <p className="font-semibold text-xl md:text-2xl">{t('s3Title')}</p>
          <p className="text-justify font-medium">{t('s3Text')}</p>
        </div>

        {/* 4. Post-Term Subscription */}
        <div className="flex flex-col gap-2.5">
          <p className="font-semibold text-xl md:text-2xl">{t('s4Title')}</p>
          <p className="text-justify font-medium">{t('s4Text')}</p>
        </div>

        {/* 5. Alternative: Upfront Payment (Pay-in-Full) */}
        <div className="flex flex-col gap-2.5">
          <p className="font-semibold text-xl md:text-2xl">{t('s5Title')}</p>
          <div className="flex flex-col gap-2 font-medium">
            <ul className="list-disc list-inside ps-4 mt-2 space-y-1">
              <li>
                <span className="font-semibold">{t('s5NoMinLabel')}</span>{' '}
                {t('s5NoMinText')}
              </li>
              <li>
                <span className="font-semibold">{t('s5MaintenanceLabel')}</span>{' '}
                {t('s5MaintenanceText')}
              </li>
              <li>
                <span className="font-semibold">{t('s5PostYearLabel')}</span>{' '}
                {t('s5PostYearText')}
              </li>
            </ul>
          </div>
        </div>

        {/* 6. Intellectual Property and Ownership */}
        <div className="flex flex-col gap-2.5">
          <p className="font-semibold text-xl md:text-2xl">{t('s6Title')}</p>
          <div className="flex flex-col gap-2 font-medium">
            <ul className="list-disc list-inside ps-4 mt-2 space-y-1">
              <li>
                <span className="font-semibold">{t('s6DuringLabel')}</span>{' '}
                {t('s6DuringText')}
              </li>
              <li>
                <span className="font-semibold">{t('s6AfterLabel')}</span>{' '}
                {t('s6AfterText')}
              </li>
              <li>
                <span className="font-semibold">{t('s6HostingLabel')}</span>{' '}
                {t('s6HostingText')}
              </li>
            </ul>
          </div>
        </div>

        {/* 7. Consumer Rights & Right of Withdrawal Waiver */}
        <div className="flex flex-col gap-2.5">
          <p className="font-semibold text-xl md:text-2xl">{t('s7Title')}</p>
          <p className="text-justify font-medium">{t('s7Text')}</p>
        </div>

        {/* 8. Governing Law and Jurisdiction */}
        <div className="flex flex-col gap-2.5 border-t border-[#e5e0f7] pt-6">
          <p className="font-semibold text-xl md:text-2xl">{t('s8Title')}</p>
          <p className="text-justify font-medium">{t('s8Text')}</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
