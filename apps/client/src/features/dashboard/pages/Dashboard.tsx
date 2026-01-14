import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    CheckCircle2,
    Clock,
    Sparkles,
    ArrowRight,
    Send,
    Calendar,
    FolderKanban,
    ListTodo,
    Lightbulb,
    Mail,
    MessageSquare,
    TrendingUp,
    BarChart3,
    FileText,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useIsMobile } from '@/shared/hooks/use-responsive';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import AuthStatus from '@/features/auth/components/AuthStatus';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { SimplifiedTaskCreation } from '../components/SimplifiedTaskCreation';
import { EmptyState } from '@/shared/components/ui/empty-state';
import { Button } from '@/shared/components/ui/button';

export function Dashboard() {
    const { tasks, messages, ideas, documents, projects, setActiveView, setCreateTaskOpen } = useAppStore();
    const { logout } = useAuthStore();
    const isMobile = useIsMobile();
    // const isTablet = useIsTablet();
    const [commandInput, setCommandInput] = useState('');

    // Calculate real stats
    const todayTasks = tasks.filter(t => t.status === 'today');
    const completedTasks = tasks.filter(t => t.status === 'done').length;
    const pendingMessages = messages.filter(m => m.status === 'unread' || m.status === 'pending').length;
    const totalTasks = tasks.length;

    // Get greeting
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 17) return 'Good afternoon';
        return 'Good evening';
    };

    // Get upcoming tasks (next 3)
    const upcomingTasks = todayTasks.slice(0, 3);

    const handleCommandSubmit = async () => {
        if (!commandInput.trim()) return;

        // Navigate to chat view
        setActiveView('chat');

        // Send the message to chat
        /* 
        * This logic is tightly coupled with
        * @/services/aiService.ts, @/stores/chatStore.ts
        * in git@github.com:sys-dev-ac/your-ai-navigator.git repo
        * TODO: graceful handle of service integration to frontend 
        * after finalized implemention of the required backend
        
        try {
            await sendExternalMessage(commandInput.trim());
        } catch (error) {
            console.error('Failed to send message to chat:', error);
        } 
        */

        setCommandInput('');
    };

    const stats = [
        { label: 'Tasks', value: totalTasks, icon: ListTodo, color: 'text-primary', bg: 'bg-primary/10' },
        { label: 'Completed', value: completedTasks, icon: CheckCircle2, color: 'text-status-success', bg: 'bg-status-success/10' },
        { label: 'Messages', value: pendingMessages, icon: Mail, color: 'text-status-warning', bg: 'bg-status-warning/10' },
        { label: 'Ideas', value: ideas.length, icon: Lightbulb, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 pb-28 md:pb-8 max-w-7xl mx-auto w-full">

                {/* Authentication Status - for debugging */}
                <div className="flex justify-between items-center">
                    <div></div>
                    <div className="flex items-center space-x-2">
                        <AuthStatus />
                        <Button
                            variant="outline"
                            size={isMobile ? "sm" : "default"}
                            onClick={() => logout()}
                        >
                            Logout
                        </Button>
                    </div>
                </div>

                {/* Header with Greeting */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-4"
                >
                    <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                            {getGreeting()}, <span className="text-gradient">Creator</span>
                        </h1>
                        <p className="text-muted-foreground text-sm sm:text-base mt-1">
                            Here's what's happening today
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                            <Calendar className="w-4 h-4" />
                            <span className="hidden sm:inline">
                                {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                            </span>
                            <span className="sm:hidden">
                                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                        </Button>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
                >
                    {stats.map((stat, _i) => (
                        <Card key={stat.label} className="border-border/50 hover:border-primary/30 transition-colors">
                            <CardContent className="p-3 sm:p-4">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className={cn("p-2 sm:p-2.5 rounded-xl", stat.bg)}>
                                        <stat.icon className={cn("w-4 h-4 sm:w-5 sm:h-5", stat.color)} />
                                    </div>
                                    <div>
                                        <p className="text-xl sm:text-2xl font-bold text-foreground">{stat.value}</p>
                                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </motion.div>

                {/* AI Command Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                >
                    <Card className="border-primary/20 bg-linear-to-r from-primary/5 via-transparent to-transparent">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-primary/20 rounded-lg">
                                    <Sparkles className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">AI Assistant</h3>
                                    <p className="text-xs text-muted-foreground">Ask anything or give a command</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={commandInput}
                                        onChange={(e) => setCommandInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleCommandSubmit()}
                                        placeholder={isMobile ? "Ask AI..." : "Try: 'Create a task for...' or 'Summarize my week'"}
                                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 min-h-[44px] touch-manipulation"
                                    />
                                </div>
                                <Button onClick={handleCommandSubmit} className="gap-2 shrink-0 min-h-[44px] touch-manipulation">
                                    <Send className="w-4 h-4" />
                                    <span className="hidden sm:inline">Send</span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                    {/* Today's Tasks */}
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
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="gap-1 text-muted-foreground hover:text-foreground"
                                    onClick={() => setActiveView('tasks')}
                                >
                                    <span className="hidden sm:inline">View all</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {/* Simplified Task Creation */}
                                <SimplifiedTaskCreation
                                    placeholder="Add a new task..."
                                    className="mb-4"
                                />

                                {/* Task List */}
                                {upcomingTasks.length > 0 ? (
                                    <div className="space-y-2">
                                        {upcomingTasks.map((task, i) => (
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
                                            onClick: () => setCreateTaskOpen(true)
                                        }}
                                        className="py-10"
                                    />
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                    >
                        <Card className="h-full">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-base font-semibold">Quick Access</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {[
                                    { icon: FolderKanban, label: 'Projects', count: projects.length, view: 'projects' as const, color: 'text-blue-500 bg-blue-500/10' },
                                    { icon: Mail, label: 'Inbox', count: pendingMessages, view: 'inbox' as const, color: 'text-green-500 bg-green-500/10' },
                                    { icon: Lightbulb, label: 'Ideas', count: ideas.length, view: 'ideas' as const, color: 'text-amber-500 bg-amber-500/10' },
                                    { icon: FileText, label: 'Documents', count: documents.length, view: 'documents' as const, color: 'text-purple-500 bg-purple-500/10' },
                                ].map((item) => (
                                    <button
                                        key={item.label}
                                        onClick={() => setActiveView(item.view)}
                                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors group text-left"
                                    >
                                        <div className={cn("p-2 rounded-lg", item.color.split(' ')[1])}>
                                            <item.icon className={cn("w-4 h-4", item.color.split(' ')[0])} />
                                        </div>
                                        <span className="flex-1 text-sm text-foreground font-medium">{item.label}</span>
                                        <span className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md">
                                            {item.count}
                                        </span>
                                        <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </button>
                                ))}
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Recent Activity & Projects */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Recent Activity */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-4">
                                <CardTitle className="text-base font-semibold flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-primary" />
                                    Activity
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        { action: 'Task completed', item: 'Review Q4 roadmap', time: '2h ago', icon: CheckCircle2, color: 'text-status-success' },
                                        { action: 'New message', item: 'from Killan James', time: '3h ago', icon: MessageSquare, color: 'text-status-info' },
                                        { action: 'Idea captured', item: 'Mobile app feature', time: '5h ago', icon: Lightbulb, color: 'text-amber-500' },
                                    ].map((activity, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className={cn("p-1.5 rounded-lg bg-secondary/50", activity.color)}>
                                                <activity.icon className="w-3.5 h-3.5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-foreground">{activity.action}</p>
                                                <p className="text-xs text-muted-foreground truncate">{activity.item}</p>
                                            </div>
                                            <span className="text-xs text-muted-foreground shrink-0">{activity.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Projects Overview */}
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
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="gap-1 text-muted-foreground hover:text-foreground"
                                    onClick={() => setActiveView('projects')}
                                >
                                    <span className="hidden sm:inline">View all</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
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
                                                    onClick: () => setActiveView('projects'),
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
                </div>
            </div>
        </div>
    );
}
