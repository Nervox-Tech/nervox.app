import { Save } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

interface ProjectSidePanelFooterProps {
    mode: 'view' | 'edit' | 'create';
    isDirty: boolean;
    onClose: () => void;
    setMode: (mode: 'view' | 'edit' | 'create') => void;
    handleSave: () => void;
}

export function ProjectSidePanelFooter({
    mode,
    isDirty,
    onClose,
    setMode,
    handleSave
}: ProjectSidePanelFooterProps) {
    return (
        <div className="p-6 border-t border-border bg-background/80 backdrop-blur-md sticky bottom-0 z-10">
            {mode !== 'view' ? (
                <div className="flex gap-3">
                    <Button
                        variant="ghost"
                        onClick={() => mode === 'create' ? onClose() : setMode('view')}
                        className="flex-1 h-12 rounded-xl font-medium"
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={!isDirty}
                        onClick={handleSave}
                        className="flex-[2] h-12 rounded-xl font-medium"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        {mode === 'create' ? 'Create Project' : 'Save Changes'}
                    </Button>
                </div>
            ) : (
                <Button variant="secondary" onClick={onClose} className="w-full h-12 rounded-xl font-bold border-border/50">
                    Close Panel
                </Button>
            )}
        </div>
    );
}
