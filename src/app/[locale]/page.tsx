import { setRequestLocale } from 'next-intl/server';
import HeroSection from '@/components/hero-section/HeroSection';
import SwiperBox from '@/components/hero-section/SwiperBox';
import WhyBigBrowser from '@/components/why-big-browser-section/WhyBigBrowser';
import StepByStepProcess from '@/components/steps-section/StepByStepProcess';
import VideoShowcase from '@/components/video-section/VideoShowcase';
import BrowseLatest from '@/components/browse-latest-section/BrowseLatest';
import PricingSection from '@/components/pricing-section/PricingSection';
import Testimonials from '@/components/testimonials-section/Testimonials';
import TeamSection from '@/components/team-section/TeamSection';
import Footer from '@/components/footer-section/Footer';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-col">
      <HeroSection />
      <div className="flex items-end h-26 bg-transparent">
        <SwiperBox className="inline xl:hidden" />
      </div>
      <WhyBigBrowser />
      <StepByStepProcess />
      <VideoShowcase />
      <BrowseLatest />
      <PricingSection />
      <Testimonials className="lg:block hidden" />
      <TeamSection />
      <Footer />
    </main>
  );
}
