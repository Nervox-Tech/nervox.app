import { useState } from 'react';
import { Plus, RefreshCw, FileUp, FileText, Globe } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import { useAppStore } from '@/shared/stores/appStore';
import { cn } from '@/lib/utils';
import type { ImportSource } from '../types';

interface ImportDialogProps {
    onClose: () => void;
    initialSource?: ImportSource;
}

export function ImportDialog({ onClose, initialSource = 'notion' }: ImportDialogProps) {
    const { addExternalDocument } = useAppStore();
    const [importSource, setImportSource] = useState<ImportSource>(initialSource);
    const [documentUrl, setDocumentUrl] = useState('');
    const [documentTitle, setDocumentTitle] = useState('');
    const [isImporting, setIsImporting] = useState(false);

    const handleImportDocument = async () => {
        if (!documentUrl.trim() || !documentTitle.trim()) return;

        setIsImporting(true);

        // Simulate import process
        await new Promise(resolve => setTimeout(resolve, 1500));

        addExternalDocument({
            title: documentTitle,
            url: documentUrl,
            source: importSource,
            lastSynced: new Date()
        });

        setDocumentUrl('');
        setDocumentTitle('');
        setIsImporting(false);
        onClose();
    };

    return (
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Import External Document</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
                {/* Source Selection */}
                <div className="space-y-2">
                    <Label>Document Source</Label>
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            { id: 'notion' as const, icon: FileUp, label: 'Notion', color: 'purple' },
                            { id: 'google-docs' as const, icon: FileText, label: 'Google Docs', color: 'blue' },
                            { id: 'external' as const, icon: Globe, label: 'External', color: 'gray' },
                        ].map((source) => (
                            <button
                                key={source.id}
                                onClick={() => setImportSource(source.id)}
                                className={cn(
                                    "flex flex-col items-center gap-2 p-3 rounded-lg border transition-colors",
                                    importSource === source.id
                                        ? `border-${source.color}-500 bg-${source.color}-500/10 text-${source.color}-600`
                                        : "border-border hover:bg-secondary/50"
                                )}
                            >
                                <source.icon className="w-5 h-5" />
                                <span className="text-xs font-medium">{source.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Document Details */}
                <div className="space-y-3">
                    <div className="space-y-2">
                        <Label htmlFor="doc-title">Document Title</Label>
                        <Input
                            id="doc-title"
                            placeholder="Enter document title"
                            value={documentTitle}
                            onChange={(e) => setDocumentTitle(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="doc-url">Document URL</Label>
                        <Input
                            id="doc-url"
                            placeholder={
                                importSource === 'notion'
                                    ? "https://www.notion.so/..."
                                    : importSource === 'google-docs'
                                        ? "https://docs.google.com/..."
                                        : "https://..."
                            }
                            value={documentUrl}
                            onChange={(e) => setDocumentUrl(e.target.value)}
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="flex-1"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleImportDocument}
                        disabled={!documentUrl.trim() || !documentTitle.trim() || isImporting}
                        className="flex-1"
                    >
                        {isImporting ? (
                            <>
                                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                Importing...
                            </>
                        ) : (
                            <>
                                <Plus className="w-4 h-4 mr-2" />
                                Import
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </DialogContent>
    );
}
