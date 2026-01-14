// sidebar-items.ts
import { Inbox, CheckSquare, FileText, FolderKanban, Settings, Grid } from 'lucide-react';
import type { SidebarItem } from '@/shared/types/sidebar.types';

export const navItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Grid,
  },
  {
    id: 'inbox',
    label: 'Inbox',
    icon: Inbox,
  },
  {
    id: 'tasks',
    label: 'Tasks',
    icon: CheckSquare,
    children: [
      {
        id: 'my-tasks',
        label: 'My Tasks',
        icon: CheckSquare,
      },
      {
        id: 'team-tasks',
        label: 'Team Tasks',
        icon: CheckSquare,
        children: [
          {
            id: 'pending',
            label: 'Pending',
            icon: CheckSquare,
          },
          {
            id: 'completed',
            label: 'Completed',
            icon: CheckSquare,
          },
        ],
      },
    ],
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: FolderKanban,
  },
  {
    id: 'documents',
    label: 'Documents',
    icon: FileText,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
  },
];
