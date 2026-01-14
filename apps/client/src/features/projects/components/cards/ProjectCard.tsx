import { motion } from 'framer-motion';
import {
  FolderKanban,
  CheckSquare,
  FileText,
  Lightbulb,
  Calendar,
  MoreHorizontal,
  Edit,
  Archive,
  Eye,
  AlertTriangle,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Progress } from '@/shared/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { useAppStore } from '@/shared/stores/appStore';
import { cn } from '@/lib/utils';

interface EnhancedProject {
  id: string;
  name: string;
  description: string;
  color: string;
  createdAt: Date;
  updatedAt?: Date;
  aiRisk?: string;
  progress: number;
  status: 'active' | 'completed' | 'on-hold';
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

  // Calculate related items
  const projectTasks = tasks.filter((t) => t.projectId === project.id);
  const projectIdeas = ideas.filter((i) => i.projectId === project.id);
  const projectDocs = externalDocuments.filter((d) => d.projectId === project.id);

  // Use actual counts or fallback to deterministic demo data based on name length
  const totalTasks = projectTasks.length || project.taskCount;
  const totalIdeas = projectIdeas.length || ((project.name.length + 5) % 5) + 1;
  const totalDocs = projectDocs.length || ((project.description.length + 3) % 3) + 1;

  const getStatusBadge = () => {
    switch (project.status) {
      case 'completed':
        return {
          label: 'Completed',
          className: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
        };
      case 'on-hold':
        return {
          label: 'On Hold',
          className: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
        };
      default:
        return {
          label: 'Active',
          className: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
        };
    }
  };

  const getPriorityIndicator = () => {
    if (project.aiRisk) {
      return {
        icon: AlertTriangle,
        color: 'text-red-600 dark:text-red-400',
        tooltip: project.aiRisk,
      };
    }
    if (project.progress > 75) {
      return {
        icon: TrendingUp,
        color: 'text-emerald-600 dark:text-emerald-400',
        tooltip: 'On track',
      };
    }
    return {
      icon: Clock,
      color: 'text-amber-600 dark:text-amber-400',
      tooltip: 'In progress',
    };
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'edit':
        setSelectedProject(project);
        break;
      case 'archive':
        deleteProject(project.id);
        break;
      case 'view':
        setSelectedProject(project);
        break;
    }
  };

  const status = getStatusBadge();
  const priority = getPriorityIndicator();

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ y: -1, scale: 1.001 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className={className}
      >
        <Card className="group hover:border-primary/40 hover:shadow-md transition-all duration-200">
          <CardContent className="p-3 sm:p-4 lg:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              {/* Project Icon */}
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
                style={{ backgroundColor: `${project.color}15` }}
              >
                <FolderKanban className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: project.color }} />
              </div>

              {/* Project Info */}
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-start sm:items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-base sm:text-lg text-foreground truncate max-w-full sm:max-w-md">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge variant="outline" className={cn('text-xs font-medium', status.className)}>
                      {status.label}
                    </Badge>
                    <span title={priority.tooltip} className="flex items-center justify-center">
                      <priority.icon className={cn('w-4 h-4', priority.color)} />
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1 sm:line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CheckSquare className="w-3.5 h-3.5" />
                    <span className="font-medium">{totalTasks}</span> tasks
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span className="font-medium">{totalIdeas}</span> ideas
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span className="font-medium">{totalDocs}</span> docs
                  </span>
                </div>
              </div>

              {/* Progress & Actions */}
              <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0 w-full sm:w-auto">
                <div className="flex-1 sm:flex-initial sm:w-28 lg:w-32">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold text-foreground">{Math.round(project.progress)}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                {/* Quick Actions */}
                {showQuickActions && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex-shrink-0"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => handleQuickAction('view')}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleQuickAction('edit')}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Project
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleQuickAction('archive')}
                        className="text-red-600 dark:text-red-400"
                      >
                        <Archive className="w-4 h-4 mr-2" />
                        Archive
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Grid and Masonry view
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn('w-full', className)}
    >
      <Card className="group h-full hover:border-primary/40 hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden">
        <CardHeader className="p-4 sm:p-5 pb-3 sm:pb-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
                style={{ backgroundColor: `${project.color}15` }}
              >
                <FolderKanban className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: project.color }} />
              </div>
              <div className="min-w-0 flex-1">
                <CardTitle className="text-base sm:text-lg font-semibold truncate leading-tight">
                  {project.name}
                </CardTitle>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
                  <Calendar className="w-3 h-3 flex-shrink-0" />
                  {new Date(project.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 flex-shrink-0">
              <Badge
                variant="outline"
                className={cn('text-xs font-medium px-2 py-0.5', status.className)}
              >
                {status.label}
              </Badge>
              {showQuickActions && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => handleQuickAction('view')}>
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleQuickAction('edit')}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Project
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleQuickAction('archive')}
                      className="text-red-600 dark:text-red-400"
                    >
                      <Archive className="w-4 h-4 mr-2" />
                      Archive
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 p-4 sm:p-5 pt-0">
          {/* Description */}
          {project.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          )}

          {/* AI Risk Alert */}
          {project.aiRisk && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 dark:bg-red-950/30 dark:border-red-900/40">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-red-700 dark:text-red-300 leading-relaxed">
                  {project.aiRisk}
                </p>
              </div>
            </div>
          )}

          {/* Progress with Priority Indicator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Progress</span>
                <span title={priority.tooltip} className="flex items-center justify-center">
                  <priority.icon className={cn('w-3.5 h-3.5', priority.color)} />
                </span>
              </div>
              <span className="font-semibold text-sm text-foreground">{Math.round(project.progress)}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="text-center p-2.5 sm:p-3 rounded-lg bg-gradient-to-br from-secondary/60 to-secondary/40 border border-border/60 hover:border-border transition-colors">
              <CheckSquare className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
              <p className="text-lg sm:text-xl font-bold text-foreground">{totalTasks}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">Tasks</p>
            </div>
            <div className="text-center p-2.5 sm:p-3 rounded-lg bg-gradient-to-br from-secondary/60 to-secondary/40 border border-border/60 hover:border-border transition-colors">
              <Lightbulb className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
              <p className="text-lg sm:text-xl font-bold text-foreground">{totalIdeas}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">Ideas</p>
            </div>
            <div className="text-center p-2.5 sm:p-3 rounded-lg bg-gradient-to-br from-secondary/60 to-secondary/40 border border-border/60 hover:border-border transition-colors">
              <FileText className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
              <p className="text-lg sm:text-xl font-bold text-foreground">{totalDocs}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">Docs</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}