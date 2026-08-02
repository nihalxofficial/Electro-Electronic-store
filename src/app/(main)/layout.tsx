import Navbar from '@/components/shared/Navbar';
import { ThemeSwitch } from '@/components/shared/Switcher';
import { LayoutProps } from '@/types';

// Define the Props type for the layout

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <ThemeSwitch />
      <Navbar/>
      {children}
    </div>
  );
};

export default MainLayout;