import { Plus } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogTrigger } from '@/shared/components/ui/dialog';
import { ImportDialog } from './ImportDialog';

interface DocumentHeaderProps {
    showImportDialog: boolean;
    setShowImportDialog: (show: boolean) => void;
}

export function DocumentHeader({ showImportDialog, setShowImportDialog }: DocumentHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold">Import Documents</h1>
                <p className="text-muted-foreground mt-2">
                    Connect and sync documents from Notion, Google Docs, and other external sources
                </p>
            </div>

            <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
                <DialogTrigger asChild>
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Import Document
                    </Button>
                </DialogTrigger>
                <ImportDialog onClose={() => setShowImportDialog(false)} />
            </Dialog>
        </div>
    );
}
