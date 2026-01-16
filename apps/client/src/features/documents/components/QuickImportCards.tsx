import { FileUp, FileText, Globe } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import type { ImportSource } from '../types';

interface QuickImportCardsProps {
    onImport: (source: ImportSource) => void;
}

const IMPORT_OPTIONS = [
    {
        source: 'notion' as const,
        title: 'Notion',
        description: 'Import and sync documents from your Notion workspace',
        icon: FileUp,
        color: 'purple',
        buttonLabel: 'Connect Notion'
    },
    {
        source: 'google-docs' as const,
        title: 'Google Docs',
        description: 'Link Google Docs and keep them synchronized',
        icon: FileText,
        color: 'blue',
        buttonLabel: 'Connect Google Docs'
    },
    {
        source: 'external' as const,
        title: 'External Links',
        description: 'Add links to any external documents or resources',
        icon: Globe,
        color: 'gray',
        buttonLabel: 'Add External Link'
    }
];

export function QuickImportCards({ onImport }: QuickImportCardsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {IMPORT_OPTIONS.map((option) => (
                <Card
                    key={option.source}
                    className={`hover:shadow-md transition-shadow cursor-pointer border-${option.color}-200 bg-${option.color}-50/50`}
                >
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 bg-${option.color}-500/10 rounded-lg`}>
                                <option.icon className={`w-5 h-5 text-${option.color}-600`} />
                            </div>
                            <CardTitle className="text-lg">{option.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="mb-4">
                            {option.description}
                        </CardDescription>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onImport(option.source)}
                            className="w-full"
                        >
                            {option.buttonLabel}
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
