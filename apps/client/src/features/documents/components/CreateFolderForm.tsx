import { X } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

interface CreateFolderFormProps {
    isVisible: boolean;
    folderName: string;
    onFolderNameChange: (name: string) => void;
    onCancel: () => void;
    onSubmit: () => void;
}

export function CreateFolderForm({
    isVisible,
    folderName,
    onFolderNameChange,
    onCancel,
    onSubmit,
}: CreateFolderFormProps) {
    if (!isVisible) return null;

    return (
        <div className="bg-background rounded-2xl p-6 border border-border shadow-sm max-w-md animate-in fade-in slide-in-from-top-4">
            <h3 className="font-bold mb-4">New Folder</h3>
            <div className="flex gap-2">
                <input
                    autoFocus
                    type="text"
                    value={folderName}
                    onChange={(e) => onFolderNameChange(e.target.value)}
                    placeholder="Folder Name (e.g. Project X)..."
                    className="flex-1 bg-secondary/30 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
                />
                <Button size="sm" onClick={onSubmit}>Create</Button>
                <Button size="icon" variant="ghost" onClick={onCancel}><X className="w-4 h-4" /></Button>
            </div>
        </div>
    );
}
