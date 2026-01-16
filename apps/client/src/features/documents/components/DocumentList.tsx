import { FileText, Plus } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { useAppStore } from '@/shared/stores/appStore';
import { DocumentCard } from './DocumentCard';
import type { ExternalDocument } from '../types';

interface DocumentListProps {
    onImportClick: () => void;
}

export function DocumentList({ onImportClick }: DocumentListProps) {
    const { externalDocuments, updateExternalDocument, deleteExternalDocument } = useAppStore();

    const handleSync = (id: string) => {
        updateExternalDocument(id, { lastSynced: new Date() });
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this document?')) {
            deleteExternalDocument(id);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Imported Documents</h2>
                <Badge variant="secondary">
                    {(externalDocuments as ExternalDocument[]).length} documents
                </Badge>
            </div>

            {(externalDocuments as ExternalDocument[]).length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <div className="p-4 bg-muted rounded-full mb-4">
                            <FileText className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">No documents imported yet</h3>
                        <p className="text-muted-foreground text-center mb-4">
                            Start by importing documents from Notion, Google Docs, or adding external links
                        </p>
                        <Button onClick={onImportClick}>
                            <Plus className="w-4 h-4 mr-2" />
                            Import First Document
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {(externalDocuments as ExternalDocument[]).map((doc) => (
                        <DocumentCard
                            key={doc.id}
                            doc={doc}
                            onSync={handleSync}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
