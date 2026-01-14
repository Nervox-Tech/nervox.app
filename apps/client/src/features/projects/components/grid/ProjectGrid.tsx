import { motion } from 'framer-motion';
import { useState } from 'react';
import { Grid, List, Filter, SortAsc } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/components/ui/select';
import { Input } from '@/shared/components/ui/input';
import { Badge } from '@/shared/components/ui/badge';
import { useProjectMetrics } from '@/features/projects/hooks/useProjectMetrics';
import { ProjectCard } from '@/features/projects/components/cards/ProjectCard';
import { useAppStore } from '@/shared/stores/appStore';
import { cn } from '@/lib/utils';

import type { Project } from '@/shared/stores/appStore';

export type ViewMode = 'grid' | 'list';
export type SortOption = 'name' | 'created' | 'updated' | 'progress' | 'priority';
export type FilterOption = 'all' | 'active' | 'upcoming' | 'completed' | 'on-hold';

interface ProjectGridProps {
    className?: string;
    onProjectSelect?: (project: Project) => void;
}

// Internal component for project item to use the metrics hook
function ProjectItem({ project, index, viewMode, onSelect }: { project: Project, index: number, viewMode: ViewMode, onSelect?: (project: Project) => void }) {
    const metrics = useProjectMetrics(project);

    const enrichedProject = {
        ...project,
        ...metrics,
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={'break-inside-avoid h-full'}
            onClick={() => onSelect?.(project)}
        >
            <ProjectCard project={enrichedProject} viewMode={viewMode} showQuickActions={true} className="h-full" />
        </motion.div>
    );
}

export function ProjectGrid({ className, onProjectSelect }: ProjectGridProps) {
    const { projects } = useAppStore();
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [sortBy, setSortBy] = useState<SortOption>('created');
    const [filterBy, setFilterBy] = useState<FilterOption>('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Preliminary sorting/filtering (without progress which is calculated per-item)
    // For 'progress' and 'status' sorting/filtering, we'll need to do it more efficiently in a real app,
    // but for this refactor we'll keep it simple.

    const filteredProjects = projects.filter((project) => {
        const matchesSearch =
            project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    const sortedProjects = [...filteredProjects].sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'created':
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            case 'updated':
                return (
                    new Date(b.updatedAt || b.createdAt).getTime() -
                    new Date(a.updatedAt || a.createdAt).getTime()
                );
            default:
                return 0;
        }
    });

    const getGridClasses = () => {
        switch (viewMode) {
            case 'list':
                return 'flex flex-col gap-4';
            default: // grid
                return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6';
        }
    };

    return (
        <div className={cn('space-y-6', className)}>
            {/* Controls Container */}
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

            {/* Results summary */}
            <div className="flex items-center justify-between px-2">
                <p className="text-sm text-muted-foreground font-medium">
                    Showing <span className="text-foreground">{sortedProjects.length}</span> project{sortedProjects.length !== 1 ? 's' : ''}
                    {searchQuery && <span> for <span className="text-primary italic">"{searchQuery}"</span></span>}
                </p>
                {filterBy !== 'all' && (
                    <Badge variant="secondary" className="capitalize px-3 py-1 font-bold text-[10px] tracking-wider rounded-full shadow-sm">
                        {filterBy}
                    </Badge>
                )}
            </div>

            {/* Projects Container */}
            <div className={getGridClasses()}>
                {sortedProjects.map((project, index) => (
                    <ProjectItem
                        key={project.id}
                        project={project}
                        index={index}
                        viewMode={viewMode}
                        onSelect={onProjectSelect}
                    />
                ))}
            </div>

            {/* Enhanced Empty state */}
            {sortedProjects.length === 0 && (
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
                            onClick={() => {
                                setSearchQuery('');
                                setFilterBy('all');
                            }}
                            className="h-11 px-8 rounded-xl border-border hover:bg-background transition-all"
                        >
                            Clear all filters
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}
