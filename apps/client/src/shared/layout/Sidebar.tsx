import {
  Inbox,
  CheckSquare,
  FileText,
  FolderKanban,
  Settings,
  Grid
} from 'lucide-react';
import { useAppStore } from '@/shared/stores/appStore';
import { useIsMobile } from '@/shared/hooks/use-responsive';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Grid },
  { id: 'inbox', label: 'Inbox', icon: Inbox, badge: 2 },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'profile', label: 'Settings', icon: Settings },
];

export function SidebarContent() {
  const { activeView, setActiveView, messages } = useAppStore();
  const unreadCount = messages.filter(m => m.status === 'unread').length;

  return (
    <div className="h-full flex flex-col py-6 bg-background border-r border-border">
      {/* Logo */}
      <div className="mb-8 px-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl shrink-0">
          O
        </div>
        <span className="font-bold text-lg whitespace-nowrap overflow-hidden">
          Octom
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-2 w-full px-3">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          const badgeCount = item.id === 'inbox' ? unreadCount : undefined;

          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={cn(
                "relative flex items-center rounded-xl transition-all duration-200 group h-12 px-4 justify-start gap-4",
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span className="font-medium text-sm whitespace-nowrap overflow-hidden">{item.label}</span>

              {/* Badge */}
              {badgeCount && badgeCount > 0 && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 h-5 flex items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-background">
                  {badgeCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export function Sidebar() {
  const isMobile = useIsMobile();

  // Don't render sidebar on mobile - use MobileNav instead
  if (isMobile) return null;

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 z-50 border-r border-border bg-background">
      <SidebarContent />
    </aside>
  );
}
