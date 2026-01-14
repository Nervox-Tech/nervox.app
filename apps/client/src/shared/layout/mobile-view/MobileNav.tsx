import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAppStore } from '@/shared/stores/appStore';
import { useIsMobile } from '@/shared/hooks/use-responsive';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Grid,
  Inbox,
  CheckSquare,
  FolderKanban,
  FileText,
  Settings,
  MessageSquare,
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Grid },
  { id: 'inbox', label: 'Inbox', icon: Inbox },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'chat', label: 'AI Chat', icon: MessageSquare },
  { id: 'profile', label: 'Settings', icon: Settings },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { activeView, setActiveView, messages } = useAppStore();
  const isMobile = useIsMobile();
  const unreadCount = messages.filter((m) => m.status === 'unread').length;

  const handleNavigate = (id: string) => {
    setActiveView(id);
    setIsOpen(false);
  };

  // Don't render on desktop
  if (!isMobile) return null;

  return (
    <>
      {/* Mobile Menu Button - Fixed at bottom */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-60 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-xs z-55"
            />

            {/* Navigation Panel */}
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-56 bg-card border-t border-border rounded-t-3xl p-6 pb-24 max-h-[80vh] overflow-y-auto"
            >
              <div className="w-12 h-1 bg-border rounded-full mx-auto mb-6" />

              <div className="grid grid-cols-3 gap-4">
                {navItems.map((item) => {
                  const isActive = activeView === item.id;
                  const badgeCount = item.id === 'inbox' ? unreadCount : undefined;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      className={cn(
                        'flex flex-col items-center gap-2 p-4 rounded-xl transition-all touch-manipulation',
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-secondary active:bg-secondary/80'
                      )}
                    >
                      <div className="relative">
                        <item.icon className="w-6 h-6" />
                        {badgeCount && badgeCount > 0 && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
                            {badgeCount}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-medium text-center">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
