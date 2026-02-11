import { motion } from 'framer-motion';
import { BarChart3, FolderKanban, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { EmptyState } from '@/shared/components/ui/empty-state';
import ROUTE_PATH from '@/shared/constant/route';

interface Project {
    id: string;
    name: string;
    color: string;
}

interface Task {
    projectId?: string;
    status: string;
}

interface DashboardProjectsProps {
    projects: Project[];
    tasks: Task[];
    onViewAll: () => void;
}

export function DashboardProjects({ projects, tasks, onViewAll }: DashboardProjectsProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
        >
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-primary" />
                        Projects
                    </CardTitle>
                    <Link to={ROUTE_PATH.PROJECTS}>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1 text-muted-foreground hover:text-foreground"
                            onClick={onViewAll}
                        >
                            <span className="hidden sm:inline">View all</span>
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {projects.slice(0, 3).map((project) => {
                            const projectTasks = tasks.filter(t => t.projectId === project.id);
                            const completed = projectTasks.filter(t => t.status === 'done').length;
                            const total = projectTasks.length || 1;
                            const progress = (completed / total) * 100;

                            return (
                                <div key={project.id} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{ backgroundColor: project.color }}
                                            />
                                            <span className="text-sm font-medium text-foreground truncate max-w-[150px] sm:max-w-[200px]">
                                                {project.name}
                                            </span>
                                        </div>
                                        <span className="text-xs text-muted-foreground">
                                            {Math.round(progress)}%
                                        </span>
                                    </div>
                                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-500"
                                            style={{ width: `${progress}%`, backgroundColor: project.color }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                        {projects.length === 0 && (
                            <div className="py-6">
                                <EmptyState
                                    icon={FolderKanban}
                                    title="No projects yet"
                                    description="Organize your tasks into projects for better tracking."
                                    action={{
                                        label: "Create Project",
                                        onClick: onViewAll,
                                        variant: "outline"
                                    }}
                                    className="p-0 border-none"
                                    iconClassName="w-10 h-10 p-2 mb-2"
                                />
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
