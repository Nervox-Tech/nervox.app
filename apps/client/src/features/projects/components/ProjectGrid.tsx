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
import { ProjectCard } from './cards/ProjectCard';
import { useAppStore } from '@/shared/stores/appStore';
import { cn } from '@/lib/utils';

export type ViewMode = 'grid'  | 'list';
export type SortOption = 'name' | 'created' | 'updated' | 'progress' | 'priority';
export type FilterOption = 'all' | 'active' | 'completed' | 'on-hold';

interface ProjectGridProps {
  className?: string;
}

export function ProjectGrid({ className }: ProjectGridProps) {
  const { projects, tasks } = useAppStore();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('created');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate project progress and status
  const enrichedProjects = projects.map((project) => {
    const projectTasks = tasks.filter((t) => t.projectId === project.id);
    const totalTasks = projectTasks.length || tasks.length; // Fallback for demo
    const completedTasks = (projectTasks.length > 0 ? projectTasks : tasks).filter(
      (t) => t.status === 'done'
    ).length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    let status: 'active' | 'completed' | 'on-hold' = 'active';
    if (progress === 100) status = 'completed';
    else if (progress === 0) status = 'on-hold';

    return {
      ...project,
      progress,
      status,
      taskCount: totalTasks,
      completedTaskCount: completedTasks,
    };
  });

  // Filter projects
  const filteredProjects = enrichedProjects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filterBy === 'all' || project.status === filterBy;

    return matchesSearch && matchesFilter;
  });

  // Sort projects
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
      case 'progress':
        return b.progress - a.progress;
      case 'priority':
        // For now, sort by task count as a proxy for priority
        return b.taskCount - a.taskCount;
      default:
        return 0;
    }
  });

  const getGridClasses = () => {
    switch (viewMode) {
      case 'list':
        return 'flex flex-col gap-3 sm:gap-4';
      default: // grid
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6';
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Controls */}
      <div className="flex flex-col gap-4">
        {/* Search and Filter Row */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64"
          />
          <Select value={filterBy} onValueChange={(value: FilterOption) => setFilterBy(value)}>
            <SelectTrigger className="w-full sm:w-32 bg-background border-border">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border shadow-lg z-50">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort and View Toggle Row */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
            <SelectTrigger className="w-full sm:w-40 bg-background border-border">
              <SortAsc className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border shadow-lg z-50">
              <SelectItem value="created">Created Date</SelectItem>
              <SelectItem value="updated">Updated Date</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="progress">Progress</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center border border-border rounded-lg p-1 self-end">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="h-8 w-8 p-0"
            >
              <Grid className="w-4 h-4" />
            </Button>

            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="h-8 w-8 p-0"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {sortedProjects.length} project{sortedProjects.length !== 1 ? 's' : ''}
          {searchQuery && ` matching "${searchQuery}"`}
        </p>
        {filterBy !== 'all' && (
          <Badge variant="secondary" className="capitalize">
            {filterBy}
          </Badge>
        )}
      </div>

      {/* Projects Grid */}
      <div className={getGridClasses()}>
        {sortedProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={'break-inside-avoid'}
          >
            <ProjectCard project={project} viewMode={viewMode} showQuickActions={true} />
          </motion.div>
        ))}
      </div>

      {/* Empty state */}
      {sortedProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Filter className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No projects found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {searchQuery
              ? `No projects match "${searchQuery}"`
              : `No ${filterBy === 'all' ? '' : filterBy + ' '} projects found`}
          </p>
          {(searchQuery || filterBy !== 'all') && (
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setFilterBy('all');
              }}
            >
              Clear filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
