import { ExternalLink, RefreshCw, Calendar, Trash2, FileUp, FileText, Globe } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type { ExternalDocument } from '../types';

interface DocumentCardProps {
    doc: ExternalDocument;
    onSync: (id: string) => void;
    onDelete: (id: string) => void;
}

const SOURCE_CONFIG = {
    notion: {
        icon: FileUp,
        color: 'bg-purple-500/10 text-purple-600 border-purple-200',
        label: 'Notion'
    },
    'google-docs': {
        icon: FileText,
        color: 'bg-blue-500/10 text-blue-600 border-blue-200',
        label: 'Google Docs'
    },
    external: {
        icon: Globe,
        color: 'bg-gray-500/10 text-gray-600 border-gray-200',
        label: 'External'
    }
};

export function DocumentCard({ doc, onSync, onDelete }: DocumentCardProps) {
    const config = SOURCE_CONFIG[doc.source];
    const Icon = config.icon;

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                        <div className="p-2 bg-secondary rounded-lg">
                            <Icon className="w-4 h-4" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold truncate">{doc.title}</h3>
                                <Badge
                                    variant="outline"
                                    className={cn("text-xs font-normal", config.color)}
                                >
                                    {config.label}
                                </Badge>
                            </div>

                            <p className="text-sm text-muted-foreground truncate mb-2">
                                {doc.url}
                            </p>

                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    Added {format(doc.createdAt, 'MMM d, yyyy')}
                                </div>
                                {doc.lastSynced && (
                                    <div className="flex items-center gap-1">
                                        <RefreshCw className="w-3 h-3" />
                                        Synced {format(doc.lastSynced, 'MMM d, h:mm a')}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onSync(doc.id)}
                        >
                            <RefreshCw className="w-3 h-3 mr-1" />
                            Sync
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(doc.url, '_blank')}
                        >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Open
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onDelete(doc.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                            <Trash2 className="w-3 h-3" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
