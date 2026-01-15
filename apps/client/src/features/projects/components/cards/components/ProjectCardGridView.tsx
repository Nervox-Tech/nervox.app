import { motion } from 'framer-motion';
import { FolderKanban, Calendar, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Progress } from '@/shared/components/ui/progress';
import { cn } from '@/lib/utils';
import { ProjectStats } from './ProjectStats';
import { ProjectQuickActions } from './ProjectQuickActions';

import type { LucideIcon } from 'lucide-react';
import type { EnhancedProject } from '../ProjectCard';

interface ProjectCardGridViewProps {
    project: EnhancedProject;
    status: { label: string; className: string };
    priority: { icon: LucideIcon; color: string; tooltip: string };
    totalTasks: number;
    totalIdeas: number;
    totalDocs: number;
    onAction: (action: 'view' | 'edit' | 'archive') => void;
    showQuickActions: boolean;
    className?: string;
}

export function ProjectCardGridView({
    project,
    status,
    priority,
    totalTasks,
    totalIdeas,
    totalDocs,
    onAction,
    showQuickActions,
    className
}: ProjectCardGridViewProps) {
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
                                <ProjectQuickActions
                                    onAction={onAction}
                                    triggerClassName="opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                                />
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

                    <ProjectStats
                        totalTasks={totalTasks}
                        totalIdeas={totalIdeas}
                        totalDocs={totalDocs}
                    />
                </CardContent>
            </Card>
        </motion.div>
    );
}
