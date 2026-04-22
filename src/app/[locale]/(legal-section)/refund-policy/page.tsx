'use client';

import CustomButton from '@/components/custom/CustomButton';
import { ChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

const RefundPolicyPage = () => {
  const router = useRouter();
  const t = useTranslations('refund');

  const renderList = (key: string) => {
    const items: string[] = t.raw(key);
    return (
      <ul className="list-disc list-inside ps-4 space-y-1 font-medium">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    );
  };

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
        {/* Title & Intro */}
        <div className="flex flex-col gap-2.5">
          <p className="font-semibold text-2xl md:text-3xl">{t('title')}</p>
          <p className="text-justify font-medium">{t('intro1')}</p>
          <p className="text-justify font-medium">{t('intro2')}</p>
          <p className="text-justify font-medium">{t('intro3')}</p>
        </div>

        {/* 1. Nature of Services */}
        <div className="flex flex-col gap-2.5">
          <p className="font-semibold text-xl md:text-2xl">{t('s1Title')}</p>
          <p className="text-justify font-medium">{t('s1Text1')}</p>
          <p className="text-justify font-medium">{t('s1Text2')}</p>
          <p className="font-medium">{t('s1Text3')}</p>
        </div>

        {/* 2. No Refund Policy */}
        <div className="flex flex-col gap-2.5">
          <p className="font-semibold text-xl md:text-2xl">{t('s2Title')}</p>
          <p className="font-medium">{t('s2Intro')}</p>
          {renderList('s2Items')}
          <p className="font-medium mt-1">{t('s2NoRefundIntro')}</p>
          {renderList('s2NoRefundItems')}
          <p className="text-justify font-medium mt-1">{t('s2Commenced')}</p>
        </div>

        {/* 3. WaaS – 12-Month Commitment */}
        <div className="flex flex-col gap-2.5">
          <p className="font-semibold text-xl md:text-2xl">{t('s3Title')}</p>
          <p className="font-medium">{t('s3Intro')}</p>
          {renderList('s3Items')}
          <p className="font-medium mt-1">{t('s3FailureIntro')}</p>
          {renderList('s3FailureItems')}
        </div>

        {/* 4. Upfront Projects */}
        <div className="flex flex-col gap-2.5">
          <p className="font-semibold text-xl md:text-2xl">{t('s4Title')}</p>
          <p className="font-medium">{t('s4Intro')}</p>
          {renderList('s4Items')}
        </div>

        {/* 5. Hosting & Post-Term Services */}
        <div className="flex flex-col gap-2.5">
          <p className="font-semibold text-xl md:text-2xl">{t('s5Title')}</p>
          {renderList('s5Items')}
        </div>

        {/* 6. Chargebacks */}
        <div className="flex flex-col gap-2.5">
          <p className="font-semibold text-xl md:text-2xl">{t('s6Title')}</p>
          <p className="text-justify font-medium">{t('s6Text1')}</p>
          <p className="text-justify font-medium">{t('s6Text2')}</p>
          <p className="font-medium">{t('s6Intro')}</p>
          {renderList('s6Items')}
        </div>

        {/* 7. No Performance Guarantees */}
        <div className="flex flex-col gap-2.5">
          <p className="font-semibold text-xl md:text-2xl">{t('s7Title')}</p>
          <p className="font-medium">{t('s7Intro')}</p>
          {renderList('s7Items')}
          <p className="text-justify font-medium mt-1">{t('s7Text1')}</p>
          <p className="text-justify font-medium">{t('s7Text2')}</p>
        </div>

        {/* 8. EU/UK Consumers */}
        <div className="flex flex-col gap-2.5">
          <p className="font-semibold text-xl md:text-2xl">{t('s8Title')}</p>
          <p className="font-medium">{t('s8Intro')}</p>
          {renderList('s8Items')}
        </div>

        {/* 9. Limitation of Liability */}
        <div className="flex flex-col gap-2.5">
          <p className="font-semibold text-xl md:text-2xl">{t('s9Title')}</p>
          <p className="text-justify font-medium">{t('s9Text1')}</p>
          <p className="text-justify font-medium">{t('s9Text2')}</p>
        </div>

        {/* 10. Governing Law */}
        <div className="flex flex-col gap-2.5">
          <p className="font-semibold text-xl md:text-2xl">{t('s10Title')}</p>
          <p className="text-justify font-medium">{t('s10Text1')}</p>
          <p className="text-justify font-medium">{t('s10Text2')}</p>
        </div>

        {/* 11. Acceptance of Policy */}
        <div className="flex flex-col gap-2.5">
          <p className="font-semibold text-xl md:text-2xl">{t('s11Title')}</p>
          <p className="font-medium">{t('s11Intro')}</p>
          {renderList('s11Items')}
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-2.5">
          <p className="font-semibold text-xl md:text-2xl">
            {t('contactTitle')}
          </p>
          <div className="flex flex-col gap-1 font-medium">
            <span>
              <span className="font-semibold">{t('companyLabel')}</span>{' '}
              {t('companyName')}
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

export default RefundPolicyPage;
