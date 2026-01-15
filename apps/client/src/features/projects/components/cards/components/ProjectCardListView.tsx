import { motion } from 'framer-motion';
import { FolderKanban } from 'lucide-react';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Progress } from '@/shared/components/ui/progress';
import { cn } from '@/lib/utils';
import { ProjectStats } from './ProjectStats';
import { ProjectQuickActions } from './ProjectQuickActions';

import type { LucideIcon } from 'lucide-react';
import type { EnhancedProject } from '../ProjectCard';

interface ProjectCardListViewProps {
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

export function ProjectCardListView({
    project,
    status,
    priority,
    totalTasks,
    totalIdeas,
    totalDocs,
    onAction,
    showQuickActions,
    className
}: ProjectCardListViewProps) {
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

                            <ProjectStats
                                totalTasks={totalTasks}
                                totalIdeas={totalIdeas}
                                totalDocs={totalDocs}
                                variant="compact"
                            />
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

                            {showQuickActions && (
                                <ProjectQuickActions
                                    onAction={onAction}
                                    triggerClassName="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 h-9 w-9"
                                />
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
