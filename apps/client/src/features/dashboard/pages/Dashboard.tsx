import { useMemo } from 'react';
import {
  CheckCircle2,
  ListTodo,
  Lightbulb,
  Mail,
  FolderKanban,
  FileText,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useIsMobile } from '@/shared/hooks/use-responsive';
import { Button } from '@/shared/components/ui/button';
import AuthStatus from '@/shared/layout/AuthStatus';
import { useAuthStore } from '@/shared/stores/authStore';
import ROUTE_PATH from '@/shared/constant/route';

// Components
import { DashboardHeader } from '../components/DashboardHeader';
import { DashboardStats } from '../components/DashboardStats';
import { DashboardTasks } from '../components/DashboardTasks';
import { DashboardQuickLinks } from '../components/DashboardQuickLinks';
import { DashboardActivity } from '../components/DashboardActivity';
import { DashboardProjects } from '../components/DashboardProjects';

export function Dashboard() {
  const { tasks, messages, ideas, documents, projects, setActiveView, setCreateTaskOpen } =
    useAppStore();
  const { logout } = useAuthStore();
  const isMobile = useIsMobile();

  // Memoize stats and derived data
  const { completedTasks, pendingMessages, totalTasks, upcomingTasks } = useMemo(() => {
    const today = tasks.filter((t) => t.status === 'today');
    const completed = tasks.filter((t) => t.status === 'done').length;
    const pending = messages.filter(
      (m) => m.status === 'unread' || m.status === 'pending'
    ).length;
    const total = tasks.length;
    const upcoming = today.slice(0, 3);

    return {
      todayTasks: today,
      completedTasks: completed,
      pendingMessages: pending,
      totalTasks: total,
      upcomingTasks: upcoming
    };
  }, [tasks, messages]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const navItems = useMemo(() => [
    { icon: FolderKanban, label: 'Projects', count: projects.length, view: 'projects', color: 'text-blue-500 bg-blue-500/10', link: ROUTE_PATH.PROJECTS },
    { icon: Mail, label: 'Inbox', count: pendingMessages, view: 'inbox', color: 'text-green-500 bg-green-500/10', link: ROUTE_PATH.INBOX.INDEX },
    { icon: FileText, label: 'Documents', count: documents.length, view: 'documents', color: 'text-purple-500 bg-purple-500/10', link: ROUTE_PATH.DOCUMENTS },
  ], [projects.length, pendingMessages, documents.length]);

  const stats = useMemo(() => [
    {
      label: 'Tasks',
      value: totalTasks,
      icon: ListTodo,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'Completed',
      value: completedTasks,
      icon: CheckCircle2,
      color: 'text-status-success',
      bg: 'bg-status-success/10',
    },
    {
      label: 'Messages',
      value: pendingMessages,
      icon: Mail,
      color: 'text-status-warning',
      bg: 'bg-status-warning/10',
    },
    {
      label: 'Ideas',
      value: ideas.length,
      icon: Lightbulb,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
    },
  ], [totalTasks, completedTasks, pendingMessages, ideas.length]);

  return (
    <>
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

          <DashboardHeader greeting={getGreeting()} />

          <DashboardStats stats={stats} />

          {/* Main Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <DashboardTasks
              tasks={upcomingTasks}
              onViewAll={() => setActiveView('tasks')}
              onCreateTask={() => setCreateTaskOpen(true)}
            />

            <DashboardQuickLinks
              items={navItems}
              onNavigate={setActiveView}
            />
          </div>

          {/* Recent Activity & Projects */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DashboardActivity />

            <DashboardProjects
              projects={projects}
              tasks={tasks}
              onViewAll={() => setActiveView('projects')}
            />
          </div>
        </div>
      </div>
    </>
  );
}
