import { ThemeSwitch } from '@/components/shared/Switcher';
import { LayoutProps } from '@/types';

// Define the Props type for the layout

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <ThemeSwitch />
      {children}
    </div>
  );
};

export default MainLayout;