'use client';

import Image, { StaticImageData } from 'next/image';
import {
  cesLogo,
  combinatorLogo,
  forbesLogo,
  kickstarterLogo,
  productHuntLogo,
  techStarsLogo,
  theNewYorkTimesLogo,
  webSummitLogo,
} from '../../../public';
import { cn } from '@/lib/utils';

interface SwiperItem {
  src: StaticImageData;
  alt: string;
  width: string;
}

const partners: SwiperItem[] = [
  { src: cesLogo, alt: 'CES logo', width: 'w-[3.875rem]' },
  { src: combinatorLogo, alt: 'Combinator Logo', width: 'w-40' },
  { src: forbesLogo, alt: 'Forbes Logo', width: 'w-23' },
  { src: kickstarterLogo, alt: 'kick Starter Logo', width: 'w-48' },
  { src: productHuntLogo, alt: 'Product Hunt Logo', width: 'w-30' },
  { src: techStarsLogo, alt: 'Tech Stars Logo', width: 'w-30' },
  {
    src: theNewYorkTimesLogo,
    alt: 'The New York Times Logo',
    width: 'w-[12.25rem]',
  },
  { src: webSummitLogo, alt: 'Web Summit Logo', width: 'w-[4.625rem]' },
];

const SwiperItemLogo = ({ partner }: { partner: SwiperItem }) => (
  <div className="flex items-center h-full px-6 md:px-10 shrink-0">
    <Image
      src={partner.src}
      alt={partner.alt}
      className={`${partner.width} h-auto object-contain`}
      priority={false}
    />
  </div>
);

interface SwiperBoxProps {
  className?: string;
}

const SwiperBox = ({ className = '' }: SwiperBoxProps) => {
  const duplicatedPartners = [...partners, ...partners];

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden',
        'mask-x-from-70% mask-x-to-90%',
        className,
      )}
    >
      <div className="flex w-max items-center h-20 md:h-24 animate-marquee will-change-transform">
        {duplicatedPartners.map((partner, index) => (
          <div
            key={`${partner.alt}-${index}`}
            className="flex items-center h-full shrink-0"
            aria-hidden={index >= partners.length}
          >
            <SwiperItemLogo partner={partner} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SwiperBox;
