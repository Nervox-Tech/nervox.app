import { AlertTriangle, Clock, TrendingUp } from 'lucide-react';
import { useAppStore } from '@/shared/stores/appStore';
import { ProjectCardListView } from './components/ProjectCardListView';
import { ProjectCardGridView } from './components/ProjectCardGridView';
import type { ProjectStatus } from '@/shared/stores/appStore';

export interface EnhancedProject {
  id: string;
  name: string;
  description: string;
  color: string;
  createdAt: Date;
  updatedAt?: Date;
  aiRisk?: string;
  progress: number;
  status: ProjectStatus;
  taskCount: number;
  completedTaskCount: number;
}

interface ProjectCardProps {
  project: EnhancedProject;
  viewMode?: 'grid' | 'list';
  showQuickActions?: boolean;
  className?: string;
}

export function ProjectCard({
  project,
  viewMode = 'grid',
  showQuickActions = true,
  className,
}: ProjectCardProps) {
  const { tasks, ideas, externalDocuments, deleteProject, setSelectedProject } = useAppStore();

  const projectTasks = tasks.filter((t) => t.projectId === project.id);
  const projectIdeas = ideas.filter((i) => i.projectId === project.id);
  const projectDocs = externalDocuments.filter((d) => d.projectId === project.id);

  const totalTasks = projectTasks.length || project.taskCount;
  const totalIdeas = projectIdeas.length || ((project.name.length + 5) % 5) + 1;
  const totalDocs = projectDocs.length || ((project.description.length + 3) % 3) + 1;

  const getStatusBadge = () => {
    const statuses: Record<ProjectStatus, { label: string; className: string }> = {
      completed: { label: 'Completed', className: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20' },
      upcoming: { label: 'Upcoming', className: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20' },
      'on-hold': { label: 'On Hold', className: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20' },
      active: { label: 'Active', className: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20' }
    };
    return statuses[project.status];
  };

  const getPriorityIndicator = () => {
    if (project.aiRisk) return { icon: AlertTriangle, color: 'text-red-600 dark:text-red-400', tooltip: project.aiRisk };
    if (project.progress > 75) return { icon: TrendingUp, color: 'text-emerald-600 dark:text-emerald-400', tooltip: 'On track' };
    return { icon: Clock, color: 'text-amber-600 dark:text-amber-400', tooltip: 'In progress' };
  };

  const handleAction = (action: 'view' | 'edit' | 'archive') => {
    switch (action) {
      case 'edit': setSelectedProject(project); break;
      case 'archive': deleteProject(project.id); break;
      case 'view': setSelectedProject(project); break;
    }
  };

  const commonProps = {
    project,
    status: getStatusBadge(),
    priority: getPriorityIndicator(),
    totalTasks,
    totalIdeas,
    totalDocs,
    onAction: handleAction,
    showQuickActions,
    className
  };

  return viewMode === 'list'
    ? <ProjectCardListView {...commonProps} />
    : <ProjectCardGridView {...commonProps} />;
}