import { X, Edit, FolderKanban } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { format } from 'date-fns';
import type { Project } from '@/shared/stores/appStore';

interface ProjectSidePanelHeaderProps {
    mode: 'view' | 'edit' | 'create';
    project: Project | null;
    color: string;
    setMode: (mode: 'view' | 'edit' | 'create') => void;
    onClose: () => void;
}

export function ProjectSidePanelHeader({
    mode,
    project,
    color,
    setMode,
    onClose
}: ProjectSidePanelHeaderProps) {
    return (
        <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-10">
            <div className="flex items-center gap-3">
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-inner"
                    style={{ backgroundColor: mode === 'create' ? color : (project?.color || color) + '20' }}
                >
                    <FolderKanban className="w-5 h-5" style={{ color: mode === 'create' ? 'white' : (project?.color || color) }} />
                </div>
                <div>
                    <h2 className="text-lg font-medium tracking-tight">
                        {mode === 'create' ? 'Create Project' : mode === 'edit' ? 'Edit Project' : 'Project Details'}
                    </h2>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                        {mode === 'create' ? 'New vision' : project ? `Created ${format(project.createdAt, 'MMM dd, yyyy')}` : ''}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                {mode === 'view' && (
                    <Button variant="outline" size="sm" onClick={() => setMode('edit')} className="h-9 px-4">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                    </Button>
                )}
                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-secondary/80">
                    <X className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
}
