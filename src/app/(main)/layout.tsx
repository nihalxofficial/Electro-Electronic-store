import TopHeader from '@/components/shared/TopHeader';
import Navbar from '@/components/shared/Navbar';
import { LayoutProps } from '@/types';
import Footer from '@/components/shared/Footer';
import NewsletterBanner from '@/components/homepage/Newsletter';

// This layout wraps all public-facing (main) pages.
// Dashboard or other route groups get their own layout without these.

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <>
      {/* Full-width chrome — background spans edge-to-edge */}
      <TopHeader />
      <Navbar />

      {/* Page content — equal x-axis padding matching ThemeSwitcher gap */}
      <div className="md:px-14">
        {children}
      </div>
      <NewsletterBanner/>
      <Footer/>
    </>
  );
};

export default MainLayout;