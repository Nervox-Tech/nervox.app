import { Filter } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

interface ProjectGridEmptyStateProps {
    searchQuery: string;
    filterBy: string;
    onClear: () => void;
}

export function ProjectGridEmptyState({
    searchQuery,
    filterBy,
    onClear
}: ProjectGridEmptyStateProps) {
    return (
        <div className="text-center py-20 bg-secondary/10 rounded-3xl border-2 border-dashed border-border/50">
            <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Filter className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">Mmm, nothing matches your search</h3>
            <p className="text-muted-foreground max-w-sm mx-auto mb-8 font-medium">
                Try adjusting your filters or search terms to find what you're looking for.
            </p>
            {(searchQuery || filterBy !== 'all') && (
                <Button
                    variant="outline"
                    onClick={onClear}
                    className="h-11 px-8 rounded-xl border-border hover:bg-background transition-all"
                >
                    Clear all filters
                </Button>
            )}
        </div>
    );
}
