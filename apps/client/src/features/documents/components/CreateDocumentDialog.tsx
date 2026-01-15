import { FileText, FileUp, Link2, ExternalLink } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import type { DocumentSource } from '../types';

interface CreateDocumentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedDocSource: DocumentSource;
    onSourceSelect: (source: DocumentSource) => void;
    externalLink: string;
    onExternalLinkChange: (link: string) => void;
    onExternalLinkSubmit: () => void;
    onEditorOpen: () => void;
}

export function CreateDocumentDialog({
    open,
    onOpenChange,
    selectedDocSource,
    onSourceSelect,
    externalLink,
    onExternalLinkChange,
    onExternalLinkSubmit,
    onEditorOpen,
}: CreateDocumentDialogProps) {
    const handleSourceSelect = (source: DocumentSource) => {
        onSourceSelect(source);
        if (source === 'blank') {
            onOpenChange(false);
            onEditorOpen();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Create New Document</DialogTitle>
                </DialogHeader>

                {!selectedDocSource ? (
                    <div className="grid grid-cols-1 gap-3 pt-4">
                        <button
                            onClick={() => handleSourceSelect('blank')}
                            className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-secondary/50 hover:border-primary/30 transition-all text-left group"
                        >
                            <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <FileText className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground">Blank Document</h4>
                                <p className="text-sm text-muted-foreground">Start from scratch with a new document</p>
                            </div>
                        </button>

                        <button
                            onClick={() => handleSourceSelect('notion')}
                            className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-secondary/50 hover:border-primary/30 transition-all text-left group"
                        >
                            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                <FileUp className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground">Sync from Notion</h4>
                                <p className="text-sm text-muted-foreground">Import and sync a Notion document</p>
                            </div>
                        </button>

                        <button
                            onClick={() => handleSourceSelect('link')}
                            className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-secondary/50 hover:border-primary/30 transition-all text-left group"
                        >
                            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <Link2 className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground">Add External Link</h4>
                                <p className="text-sm text-muted-foreground">Link to Google Docs, Dropbox, or any URL</p>
                            </div>
                        </button>
                    </div>
                ) : selectedDocSource === 'notion' ? (
                    <div className="space-y-4 pt-4">
                        <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                            <div className="flex items-center gap-3 mb-3">
                                <FileUp className="w-5 h-5 text-purple-500" />
                                <h4 className="font-semibold text-foreground">Connect Notion</h4>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                                Connect your Notion workspace to sync documents automatically.
                            </p>
                            <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                Connect Notion Account
                            </Button>
                        </div>
                        <Button variant="ghost" onClick={() => onSourceSelect(null)} className="w-full">
                            Back to options
                        </Button>
                    </div>
                ) : selectedDocSource === 'link' ? (
                    <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Document URL</label>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="https://docs.google.com/..."
                                    value={externalLink}
                                    onChange={(e) => onExternalLinkChange(e.target.value)}
                                    className="flex-1"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Paste a link to Google Docs, Dropbox, Figma, or any external document
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="ghost" onClick={() => onSourceSelect(null)} className="flex-1">
                                Back
                            </Button>
                            <Button onClick={onExternalLinkSubmit} className="flex-1" disabled={!externalLink.trim()}>
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Add Link
                            </Button>
                        </div>
                    </div>
                ) : null}
            </DialogContent>
        </Dialog>
    );
}
