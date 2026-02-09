import { motion } from 'framer-motion';
import { ArrowRight, ListTodo, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { SimplifiedTaskCreation } from './SimplifiedTaskCreation';
import { EmptyState } from '@/shared/components/ui/empty-state';
import { cn } from '@/lib/utils';
import ROUTE_PATH from '@/shared/constant/route';

interface Task {
    id: string;
    title: string;
    status: string;
    priority: 'high' | 'medium' | 'low';
    dueDate?: string | Date; // Adjusted to match potential types
}

interface DashboardTasksProps {
    tasks: Task[];
    onViewAll: () => void;
    onCreateTask: () => void;
}

export function DashboardTasks({ tasks, onViewAll, onCreateTask }: DashboardTasksProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="xl:col-span-2"
        >
            <Card className="h-full">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                        <ListTodo className="w-5 h-5 text-primary" />
                        Today's Tasks
                    </CardTitle>
                    <Link to={ROUTE_PATH.TASKS}>
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
                <CardContent className="space-y-3">
                    {/* Simplified Task Creation */}
                    <SimplifiedTaskCreation
                        placeholder="Add a new task..."
                        className="mb-4"
                    />

                    {/* Task List */}
                    {tasks.length > 0 ? (
                        <div className="space-y-2">
                            {tasks.map((task, i) => (
                                <motion.div
                                    key={task.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-colors group"
                                >
                                    <div className={cn(
                                        "w-2 h-2 rounded-full shrink-0",
                                        task.priority === 'high' && "bg-red-500",
                                        task.priority === 'medium' && "bg-orange-500",
                                        task.priority === 'low' && "bg-blue-500"
                                    )} />
                                    <span className="flex-1 text-sm text-foreground truncate">{task.title}</span>
                                    {task.dueDate && (
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </span>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            icon={ListTodo}
                            title="All caught up!"
                            description="You have no tasks scheduled for today. Create one to get started."
                            action={{
                                label: "Create Task",
                                onClick: onCreateTask
                            }}
                            className="py-10"
                        />
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}
