import type { LucideIcon } from "lucide-react";

export interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;
  badge?: number;
  children?: SidebarItem[];
}