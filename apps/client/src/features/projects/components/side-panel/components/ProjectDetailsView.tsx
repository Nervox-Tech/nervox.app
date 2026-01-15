import { format } from 'date-fns';
import { CheckSquare, Lightbulb, TrendingUp } from 'lucide-react';
import { Badge } from '@/shared/components/ui/badge';
import { Progress } from '@/shared/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/lib/utils';
import type { Project, ProjectStatus, Task } from '@/shared/stores/appStore';

interface ProjectDetailsViewProps {
    project: Project | null;
    totalTasks: number;
    inProgressTasks: number;
    progress: number;
    projectTasks: Task[];
}

export function ProjectDetailsView({
    project,
    totalTasks,
    inProgressTasks,
    progress,
    projectTasks
}: ProjectDetailsViewProps) {
    const getStatusInfo = (s: ProjectStatus) => {
        switch (s) {
            case 'completed':
                return { label: 'Completed', color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900/20' };
            case 'upcoming':
                return { label: 'Upcoming', color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900/20' };
            case 'on-hold':
                return { label: 'On Hold', color: 'text-orange-600', bgColor: 'bg-orange-100 dark:bg-orange-900/20' };
            default:
                return { label: 'Active', color: 'text-yellow-600', bgColor: 'bg-yellow-100 dark:bg-yellow-900/20' };
        }
    };

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    {project && (
                        <Badge
                            variant="outline"
                            className={cn(
                                'px-3 py-1 font-bold text-[10px] tracking-widest uppercase rounded-full shadow-sm border-none',
                                getStatusInfo(project.status).bgColor,
                                getStatusInfo(project.status).color
                            )}
                        >
                            {getStatusInfo(project.status).label}
                        </Badge>
                    )}
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-foreground leading-tight">
                    {project?.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {project?.description}
                </p>
            </div>

            {(project?.startDate || project?.endDate) && (
                <div className="p-4 rounded-2xl bg-secondary/20 border border-border/50 flex items-center justify-around">
                    {project.startDate && (
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">Start</span>
                            <span className="text-xs font-semibold">{format(project.startDate, 'MMM dd, yyyy')}</span>
                        </div>
                    )}
                    {project.startDate && project.endDate && (
                        <div className="w-8 h-px bg-border/50" />
                    )}
                    {project.endDate && (
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">Deadline</span>
                            <span className="text-xs font-semibold">{format(project.endDate, 'MMM dd, yyyy')}</span>
                        </div>
                    )}
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                {[
                    { label: 'Tasks', value: totalTasks, icon: CheckSquare, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                    { label: 'In Progress', value: inProgressTasks, icon: Lightbulb, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
                ].map((item) => (
                    <div key={item.label} className="p-4 rounded-2xl bg-card border border-border/50 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow group">
                        <div className={cn('w-10 h-10 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform', item.bg)}>
                            <item.icon className={cn('w-5 h-5', item.color)} />
                        </div>
                        <span className="text-lg font-bold text-foreground">{item.value}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{item.label}</span>
                    </div>
                ))}
            </div>

            <Card className="border-border/60 bg-gradient-to-br from-card to-background shadow-lg rounded-3xl overflow-hidden">
                <CardHeader className="pb-2 border-b border-border/20">
                    <CardTitle className="text-sm font-bold flex items-center justify-between">
                        <span className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-primary" />
                            Completion Progress
                        </span>
                        <span className="text-primary">{Math.round(progress)}%</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <Progress value={progress} className="h-2.5 bg-secondary rounded-full" />
                </CardContent>
            </Card>

            {projectTasks.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Recent Tasks</h4>
                        <Button variant="link" size="sm" className="h-auto p-0 text-xs font-bold text-primary">View All</Button>
                    </div>
                    <div className="space-y-2">
                        {projectTasks.slice(0, 3).map((task) => (
                            <div key={task.id} className="flex items-center gap-3 p-3 rounded-2xl bg-secondary/10 border border-border/30 hover:bg-secondary/20 transition-colors">
                                <div className={cn(
                                    'w-3 h-3 rounded-full',
                                    task.status === 'done' ? 'bg-green-500' : 'bg-primary/50'
                                )} />
                                <span className="text-sm font-semibold truncate flex-1">{task.title}</span>
                                <Badge variant="secondary" className="text-[9px] font-bold px-1.5 py-0">{task.priority}</Badge>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
