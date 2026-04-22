'use client';

import CustomButton from '@/components/custom/CustomButton';
import { ChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

const PrivacyPolicyPage = () => {
  const router = useRouter();
  const t = useTranslations('privacy');

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
        {/* 1. Introduction */}
        <div className="flex flex-col gap-2.5">
          <p className="font-semibold text-xl md:text-2xl">{t('s1Title')}</p>
          <p className="text-justify font-medium">{t('s1Text')}</p>
        </div>

        {/* 2. Information We Collect */}
        <div className="flex flex-col gap-2.5">
          <p className="font-semibold text-xl md:text-2xl">{t('s2Title')}</p>
          <div className="flex flex-col gap-2 font-medium">
            {t('s2Intro')}
            <ul className="list-disc list-inside ps-4 mt-2 space-y-1">
              <li>
                <span className="font-semibold">{t('s2IdentityLabel')}</span>{' '}
                {t('s2IdentityText')}
              </li>
              <li>
                <span className="font-semibold">{t('s2FinancialLabel')}</span>{' '}
                {t('s2FinancialText')} <br />
                <span className="italic">{t('s2FinancialNote')}</span>
              </li>
              <li>
                <span className="font-semibold">{t('s2ServiceLabel')}</span>{' '}
                {t('s2ServiceText')}
              </li>
            </ul>
          </div>
        </div>

        {/* 3. How We Use Your Information */}
        <div className="flex flex-col gap-2.5">
          <p className="font-semibold text-xl md:text-2xl">{t('s3Title')}</p>
          <ul className="list-disc list-inside ps-4 mt-2 space-y-1 font-medium">
            <li>{t('s3Item1')}</li>
            <li>{t('s3Item2')}</li>
            <li>{t('s3Item3')}</li>
            <li>{t('s3Item4')}</li>
          </ul>
        </div>

        {/* 4. Sharing of Your Information */}
        <div className="flex flex-col gap-2.5">
          <p className="font-semibold text-xl md:text-2xl">{t('s4Title')}</p>
          <p className="text-justify font-medium">{t('s4Intro')}</p>
          <ul className="list-disc list-inside ps-4 mt-2 space-y-1 font-medium">
            <li>
              <span className="font-semibold">{t('s4PaymentLabel')}</span>{' '}
              {t('s4PaymentText')}
            </li>
            <li>
              <span className="font-semibold">{t('s4HostingLabel')}</span>{' '}
              {t('s4HostingText')}
            </li>
            <li>
              <span className="font-semibold">{t('s4LegalLabel')}</span>{' '}
              {t('s4LegalText')}
            </li>
          </ul>
        </div>

        {/* 5. International Data Transfers */}
        <div className="flex flex-col gap-2.5">
          <p className="font-semibold text-xl md:text-2xl">{t('s5Title')}</p>
          <p className="text-justify font-medium">{t('s5Text')}</p>
        </div>

        {/* 6. Your Privacy Rights */}
        <div className="flex flex-col gap-2.5">
          <p className="font-semibold text-xl md:text-2xl">{t('s6Title')}</p>
          <p className="text-justify font-medium">{t('s6Intro')}</p>
          <ul className="list-disc list-inside ps-4 mt-2 space-y-1 font-medium">
            <li>{t('s6Item1')}</li>
            <li>{t('s6Item2')}</li>
            <li>{t('s6Item3')}</li>
          </ul>
          <p className="text-justify font-medium mt-2">{t('s6Outro')}</p>
        </div>

        {/* 7. Cookies */}
        <div className="flex flex-col gap-2.5">
          <p className="font-semibold text-xl md:text-2xl">{t('s7Title')}</p>
          <p className="text-justify font-medium">{t('s7Text')}</p>
        </div>

        {/* 8. Contact Us */}
        <div className="flex flex-col gap-2.5">
          <p className="font-semibold text-xl md:text-2xl">{t('s8Title')}</p>
          <div className="flex flex-col gap-1 font-medium">
            <span>
              <span className="font-semibold">{t('companyLabel')}</span>{' '}
              {t('companyName')}
            </span>
            <span>
              <span className="font-semibold">{t('addressLabel')}</span>{' '}
              {t('addressText')}
            </span>
            <span>
              <span className="font-semibold">{t('emailLabel')}</span>{' '}
              <a
                href={`mailto:${t('email')}`}
                className="underline hover:text-[#6c3fc5]"
              >
                {t('email')}
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
