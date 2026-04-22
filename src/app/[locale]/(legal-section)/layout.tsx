import React from 'react';
import Footer from '@/components/footer-section/Footer';
import Navbar from '@/components/hero-section/Navbar';
import ScrollToTop from '@/components/shared/ScrollToTop';

const LegalSectionLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col bg-linear-to-b from-[#4787FE] to-white to-30% pt-4 xl:pt-9.25">
      <ScrollToTop />
      <div className="w-full max-w-310 mx-auto h-full">
        <Navbar />
        {children}
      </div>

      <Footer />
    </main>
  );
};

export default LegalSectionLayout;
