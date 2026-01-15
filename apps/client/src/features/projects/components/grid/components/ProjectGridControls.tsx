import { Grid, List, Filter, SortAsc } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/components/ui/select';
import { cn } from '@/lib/utils';
import type { ViewMode, SortOption, FilterOption } from '../ProjectGrid';

interface ProjectGridControlsProps {
    searchQuery: string;
    setSearchQuery: (q: string) => void;
    filterBy: FilterOption;
    setFilterBy: (f: FilterOption) => void;
    sortBy: SortOption;
    setSortBy: (s: SortOption) => void;
    viewMode: ViewMode;
    setViewMode: (v: ViewMode) => void;
}

export function ProjectGridControls({
    searchQuery,
    setSearchQuery,
    filterBy,
    setFilterBy,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode
}: ProjectGridControlsProps) {
    return (
        <div className="bg-card/50 backdrop-blur-sm p-4 rounded-2xl border border-border/50 space-y-4 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className="flex flex-1 flex-col sm:flex-row gap-3">
                    <div className="relative flex-1 group">
                        <Input
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-background border-border h-11 pl-4 rounded-xl group-hover:border-primary/30 transition-all"
                        />
                    </div>
                    <Select value={filterBy} onValueChange={(value: FilterOption) => setFilterBy(value)}>
                        <SelectTrigger className="w-full sm:w-40 bg-background border-border h-11 rounded-xl">
                            <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                            <SelectValue placeholder="Filter Status" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border shadow-xl rounded-xl">
                            <SelectItem value="all">All Projects</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="upcoming">Upcoming</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="on-hold">On Hold</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                        <SelectTrigger className="w-full sm:w-48 bg-background border-border h-11 rounded-xl">
                            <SortAsc className="w-4 h-4 mr-2 text-muted-foreground" />
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border shadow-xl rounded-xl">
                            <SelectItem value="created">Created Date</SelectItem>
                            <SelectItem value="updated">Updated Date</SelectItem>
                            <SelectItem value="name">Name</SelectItem>
                            <SelectItem value="progress">Progress</SelectItem>
                            <SelectItem value="priority">Priority</SelectItem>
                        </SelectContent>
                    </Select>

                    <div className="flex items-center bg-background border border-border rounded-xl p-1 shadow-inner h-11">
                        <Button
                            variant={viewMode === 'grid' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setViewMode('grid')}
                            className={cn(
                                "h-9 w-9 p-0 rounded-lg transition-all",
                                viewMode === 'grid' && "shadow-lg shadow-primary/20"
                            )}
                        >
                            <Grid className="w-4 h-4" />
                        </Button>

                        <Button
                            variant={viewMode === 'list' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setViewMode('list')}
                            className={cn(
                                "h-9 w-9 p-0 rounded-lg transition-all",
                                viewMode === 'list' && "shadow-lg shadow-primary/20"
                            )}
                        >
                            <List className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
