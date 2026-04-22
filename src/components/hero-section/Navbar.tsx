'use client';

import React from 'react';
import Image from 'next/image';
import { logo } from '../../../public';
import CustomButton from '@/components/custom/CustomButton';
import { Link as I18nLink, usePathname, useRouter } from '@/i18n/navigation';
import { useRouter as useNextRouter } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Globe, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { logEvent } from '@/lib/analytics';
import { useTranslations, useLocale } from 'next-intl';

const NAVBAR_LINKS = [
  { key: 'services', tKey: 'services' as const, href: '#services' },
  { key: 'process', tKey: 'process' as const, href: '#process' },
  { key: 'portfolio', tKey: 'portfolio' as const, href: '#portfolio' },
  { key: 'offer', tKey: 'pricing' as const, href: '#pricing' },
] as const;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLangOpen, setIsLangOpen] = React.useState(false);
  const langRef = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const nextRouter = useNextRouter();
  const t = useTranslations('navbar');
  const locale = useLocale();

  React.useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => {
    if (path.startsWith('#')) return false;
    return pathname === path;
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    href: string,
  ) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      scrollToSection(href);
      setIsMenuOpen(false);
    }
  };

  const scrollToSection = (href: string) => {
    if (pathname !== '/') {
      nextRouter.push(`/${href}`);
      return;
    }

    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }

    window.history.pushState(null, '', href);
    setIsMenuOpen(false);
  };

  const switchLocale = (newLocale: 'en' | 'fr') => {
    router.replace(pathname, { locale: newLocale });
    setIsLangOpen(false);
  };

  return (
    <nav className=" flex items-center justify-between gap-2.5 xl:px-0 px-5">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <I18nLink href="/">
          <Image
            src={logo}
            alt={t('logoAlt')}
            className="h-10 lg:h-17.5 w-auto object-contain object-center"
          />
        </I18nLink>
      </motion.div>

      <motion.div
        className="hidden lg:flex items-center gap-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
      >
        {NAVBAR_LINKS.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
          >
            <div
              className={cn(
                'outline-none ring-0 bg-transparent text-white text-lg leading-[150%] uppercase transition-all duration-300 ease-out',
                'hover:bg-[#E9D9FF] hover:text-[#230849] border-none rounded-[0.5rem] px-3.5 py-0.5',
                'shadow-none hover:[box-shadow:-6px_6px_0px_0px_rgb(35,8,73)]!',
              )}
            >
              {t(link.tKey)}
            </div>
          </Link>
        ))}
      </motion.div>

      <motion.div
        className="hidden lg:flex items-center gap-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
      >
        <div className="relative" ref={langRef}>
          <button
            onClick={() => setIsLangOpen((prev) => !prev)}
            className="flex items-center gap-1.5 text-white text-sm font-neue-montreal font-medium uppercase px-3 py-1.5 rounded-full border border-white/30 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <Globe className="size-4" />
            {locale === 'en' ? 'EN' : 'FR'}
          </button>
          <AnimatePresence>
            {isLangOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 min-w-[7rem]"
              >
                <button
                  onClick={() => switchLocale('en')}
                  className={cn(
                    'flex items-center justify-between gap-3 w-full px-4 py-2.5 text-sm font-neue-montreal font-medium text-[#230849] hover:bg-[#F4ECFF] transition-colors cursor-pointer',
                    locale === 'en' && 'bg-[#F4ECFF]',
                  )}
                >
                  English
                  {locale === 'en' && (
                    <Check className="size-3.5 text-[#9342FD]" />
                  )}
                </button>
                <button
                  onClick={() => switchLocale('fr')}
                  className={cn(
                    'flex items-center justify-between gap-3 w-full px-4 py-2.5 text-sm font-neue-montreal font-medium text-[#230849] hover:bg-[#F4ECFF] transition-colors cursor-pointer',
                    locale === 'fr' && 'bg-[#F4ECFF]',
                  )}
                >
                  Français
                  {locale === 'fr' && (
                    <Check className="size-3.5 text-[#9342FD]" />
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <CustomButton
          className="uppercase rounded-full text-lg"
          onClick={() => {
            scrollToSection('#pricing');
            logEvent('cta_click', {
              button_name: 'view_pricing',
              location: 'navbar',
            });
          }}
        >
          {t('viewPricing')}
        </CustomButton>
      </motion.div>

      <button
        className="flex lg:hidden p-2 rounded-full hover:bg-white/20 cursor-pointer"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
      >
        <Menu className="text-white" />
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              aria-label="Close menu"
              className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-white/20 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(false);
              }}
            >
              <X className="size-6 text-white" />
            </button>

            <motion.div
              className="flex flex-col items-center gap-6 pt-16"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {NAVBAR_LINKS.map((route) => (
                <Link
                  key={route.key}
                  href={route.href}
                  onClick={(e) => handleNavClick(e, route.href)}
                  className={cn(
                    'text-[1rem] leading-[160%] cursor-pointer transition-colors duration-300',
                    isActive(route.href)
                      ? 'text-white'
                      : 'text-white hover:text-white/80 hover:underline',
                  )}
                >
                  {t(route.tKey)}
                </Link>
              ))}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => switchLocale('en')}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-sm font-neue-montreal font-medium transition-colors cursor-pointer',
                    locale === 'en'
                      ? 'bg-white text-[#230849]'
                      : 'text-white border border-white/30 hover:bg-white/10',
                  )}
                >
                  EN
                </button>
                <button
                  onClick={() => switchLocale('fr')}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-sm font-neue-montreal font-medium transition-colors cursor-pointer',
                    locale === 'fr'
                      ? 'bg-white text-[#230849]'
                      : 'text-white border border-white/30 hover:bg-white/10',
                  )}
                >
                  FR
                </button>
              </div>

              <CustomButton
                className="uppercase rounded-full text-lg"
                onClick={() => {
                  scrollToSection('#pricing');
                  logEvent('cta_click', {
                    button_name: 'view_pricing',
                    location: 'navbar_mobile',
                  });
                }}
              >
                {t('viewPricing')}
              </CustomButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
