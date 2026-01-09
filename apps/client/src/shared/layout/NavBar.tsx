import { Bell, Sparkles, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/shared/components/common/theme-provider';
import { useAppStore } from '@/shared/stores/appStore';
import { motion } from 'framer-motion';
import { MobileSidebar } from './mobile-view/MobileSidebar';

interface TopBarProps {
  title?: string;
  subtitle?: string;
}

export function TopBar({ title, subtitle }: TopBarProps) {
  const { theme, setTheme } = useTheme();
  const { setCommandMenuOpen } = useAppStore();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-4 sm:px-6 bg-background/80 backdrop-blur-xs sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <MobileSidebar />
        <div>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">{title}</h1>
          {subtitle && (
            <p className="text-xs sm:text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">

        {/* AI Quick Action */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCommandMenuOpen(true)}
          className="p-2 rounded-lg bg-ai-gradient text-primary-foreground ai-glow touch-manipulation"
        >
          <Sparkles className="w-5 h-5" />
        </motion.button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-secondary transition-colors touch-manipulation"
        >
          {theme === 'dark' ? (
            <Moon className="w-5 h-5 text-muted-foreground" />
          ) : (
            <Sun className="w-5 h-5 text-muted-foreground" />
          )}
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors touch-manipulation">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
        </button>

        {/* User Avatar */}
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-linear-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-medium text-sm">
          U
        </div>
      </div>
    </header>
  );
}
