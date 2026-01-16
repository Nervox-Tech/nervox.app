import type { LucideIcon } from 'lucide-react';

export type ImportSource = 'notion' | 'google-docs' | 'external';

export interface ExternalDocument {
    id: string;
    title: string;
    url: string;
    source: ImportSource;
    lastSynced?: Date;
    createdAt: Date;
    projectId?: string;
}

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
