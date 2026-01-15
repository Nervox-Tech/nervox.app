import type { LucideIcon } from 'lucide-react';

export type DocumentSource = 'blank' | 'notion' | 'link' | null;

export interface Folder {
    id: number;
    name: string;
    files: number;
    color: string;
    icon: LucideIcon;
    members: number[];
}

export interface FileData {
    id: number;
    name: string;
    size: string;
    date: string;
    icon: LucideIcon;
    color: string;
}
