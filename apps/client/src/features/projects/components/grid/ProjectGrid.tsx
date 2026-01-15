import { useState } from 'react';
import { Badge } from '@/shared/components/ui/badge';
import { useAppStore } from '@/shared/stores/appStore';
import { cn } from '@/lib/utils';
import { ProjectGridControls } from './components/ProjectGridControls';
import { ProjectGridEmptyState } from './components/ProjectGridEmptyState';
import { ProjectItemWrapper } from './components/ProjectItemWrapper';
import type { Project } from '@/shared/stores/appStore';

export type ViewMode = 'grid' | 'list';
export type SortOption = 'name' | 'created' | 'updated' | 'progress' | 'priority';
export type FilterOption = 'all' | 'active' | 'upcoming' | 'completed' | 'on-hold';

interface ProjectGridProps {
    className?: string;
    onProjectSelect?: (project: Project) => void;
}

export function ProjectGrid({ className, onProjectSelect }: ProjectGridProps) {
    const { projects } = useAppStore();
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [sortBy, setSortBy] = useState<SortOption>('created');
    const [filterBy, setFilterBy] = useState<FilterOption>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProjects = projects.filter((project) => {
        const matchesSearch =
            project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterBy === 'all' || project.status === filterBy;
        return matchesSearch && matchesFilter;
    });

    const sortedProjects = [...filteredProjects].sort((a, b) => {
        switch (sortBy) {
            case 'name': return a.name.localeCompare(b.name);
            case 'created': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            case 'updated': return new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime();
            default: return 0;
        }
    });

    return (
        <div className={cn('space-y-6', className)}>
            <ProjectGridControls
                searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                filterBy={filterBy} setFilterBy={setFilterBy}
                sortBy={sortBy} setSortBy={setSortBy}
                viewMode={viewMode} setViewMode={setViewMode}
            />

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

            <div className={cn(
                viewMode === 'list' ? 'flex flex-col gap-4' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6'
            )}>
                {sortedProjects.map((project, index) => (
                    <ProjectItemWrapper
                        key={project.id}
                        project={project}
                        index={index}
                        viewMode={viewMode}
                        onSelect={onProjectSelect}
                    />
                ))}
            </div>

            {sortedProjects.length === 0 && (
                <ProjectGridEmptyState
                    searchQuery={searchQuery}
                    filterBy={filterBy}
                    onClear={() => { setSearchQuery(''); setFilterBy('all'); }}
                />
            )}
        </div>
    );
}
