import TopHeader from '@/components/shared/TopHeader';
import Navbar from '@/components/shared/Navbar';
import { LayoutProps } from '@/types';
import Footer from '@/components/shared/Footer';
import NewsletterBanner from '@/components/homepage/Newsletter';
import { ThemeSwitch } from '@/components/shared/Switcher';

// This layout wraps all public-facing (main) pages.
// Dashboard or other route groups get their own layout without these.

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <ThemeSwitch />
      {/* Full-width chrome — background spans edge-to-edge */}
      <TopHeader />
      <Navbar />

      {/* Centered page content with balanced side padding across all screen sizes */}
      <main className="w-full max-w-[1536px] mx-auto px-3.5 sm:px-6 md:px-10 lg:px-14">
        {children}
      </main>
      <NewsletterBanner />
      <Footer />
    </>
  );
};

export default MainLayout;