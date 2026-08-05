import TopHeader from '@/components/shared/TopHeader';
import Navbar from '@/components/shared/Navbar';
import { LayoutProps } from '@/types';

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
    </>
  );
};

export default MainLayout;