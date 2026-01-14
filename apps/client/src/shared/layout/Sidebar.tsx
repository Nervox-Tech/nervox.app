import { Inbox, CheckSquare, FileText, FolderKanban, Settings, Grid } from 'lucide-react';
import { useAppStore } from '@/shared/stores/appStore';
import { useIsMobile } from '@/shared/hooks/use-responsive';
import { SidebarNavItem } from '../components/Layout/SidebarNavItem';
import ROUTE_PATH from '../constant/route';
import { Images } from '../assets';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Grid, href: ROUTE_PATH.DASHBOARD },
  { id: 'inbox', label: 'Inbox', icon: Inbox, badge: 2, href: ROUTE_PATH.INBOX.INDEX },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare, href: ROUTE_PATH.TASKS },
  { id: 'projects', label: 'Projects', icon: FolderKanban, href: ROUTE_PATH.PROJECTS },
  { id: 'documents', label: 'Documents', icon: FileText, href: ROUTE_PATH.DOCUMENTS },
  { id: 'profile', label: 'Settings', icon: Settings, href: ROUTE_PATH.SETTINGS },
];

export default function Sidebar() {
  const isMobile = useIsMobile();
  const { activeView, setActiveView, messages } = useAppStore();
  const unreadCount = messages.filter((m) => m.status === 'unread').length;

  // Don't render sidebar on mobile - use MobileNav instead
  if (isMobile) return null;

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 z-50 border-r border-border bg-background">
      {/* <SidebarContent /> */}
      <div className="h-full flex flex-col py-6 bg-background border-r border-border">
        {/* Logo */}
        <div className="mb-8 px-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl shrink-0">
            <img src={Images.LOGO} alt="" />
          </div>
          <span className="font-bold text-lg whitespace-nowrap overflow-hidden">Nervox</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-2 w-full px-3">
          {navItems.map((item) => {
            return (
              <SidebarNavItem
                key={item.id}
                item={item}
                activeView={activeView}
                setActiveView={setActiveView}
                unreadCount={unreadCount}
                expanded={[]}
                toggleExpand={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
