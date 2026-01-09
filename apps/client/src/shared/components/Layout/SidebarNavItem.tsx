import { cn } from '@/lib/utils';
import type { SidebarItem } from '@/shared/types/sidebar.types';

interface Props {
    item: SidebarItem;
    activeView: string;
    setActiveView: (id: string) => void;
    unreadCount: number;
    expanded: string[];
    toggleExpand: (id: string) => void;
    depth?: number;
}

export function SidebarNavItem({
    item,
    activeView,
    setActiveView,
    unreadCount
}: Props) {
    const isActive = activeView === item.id;

    const badgeCount =
        item.id === 'inbox' && unreadCount > 0 ? unreadCount : undefined;

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
}
