import { Suspense, type ReactNode } from 'react';
import Sidebar from './Sidebar';
import { MobileNav } from './mobile-view/MobileNav';
import { useIsMobile } from '@/shared/hooks/use-responsive';
import { cn } from '@/lib/utils';
import { TopBar } from './NavBar';
import { Fallback } from '../components/Fallback';

interface MainLayoutProps {
  children: ReactNode;
}

export function Layout({ children }: MainLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      {/* Desktop/Tablet Sidebar */}
      {!isMobile && <Sidebar />}

      {/* Mobile Navigation */}
      {isMobile && <MobileNav />}

      <main
        className={cn(
          'min-h-screen transition-all duration-300 ease-in-out',
          // Desktop/Tablet layout - fixed sidebar width
          !isMobile && 'ml-60',
          // Mobile layout - no margin, full width
          isMobile && 'ml-0 pb-20', // Add bottom padding for mobile nav
          // Responsive padding
          'px-4 sm:px-6 lg:px-8'
        )}
      >
        <Suspense fallback={<Fallback />}>{children}</Suspense>
      </main>
    </div>
  );
}
