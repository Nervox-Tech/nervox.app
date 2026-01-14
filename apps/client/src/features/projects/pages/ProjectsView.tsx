import { CheckSquare, FileText, Lightbulb, BarChart3, FolderKanban } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/shared/stores/appStore';
import { cn } from '@/lib/utils';
import { CreateProjectDialog } from '../components/dialog/CreateProjectDialog'; 
import { ProjectGrid } from '../components/ProjectGrid';
import { ProjectSidePanel } from '../components/ProjectDetailsSidePanel';
import { Card, CardContent } from '@/shared/components/ui/card';

function ProjectsView() {
  const { projects, tasks, ideas, externalDocuments, selectedProject, setSelectedProject } =
    useAppStore();

  // Dynamic stats
  const totalTasks = tasks.length;
  const inProgressTasks = tasks.filter((t) => t.status === 'today').length;
  const activeIdeas = ideas.length;
  const totalDocs = externalDocuments.length;

  const stats = [
    {
      label: 'Total Tasks',
      value: totalTasks,
      icon: CheckSquare,
      color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/20',
    },
    {
      label: 'In Progress',
      value: inProgressTasks,
      icon: BarChart3,
      color: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20',
    },
    {
      label: 'Active Ideas',
      value: activeIdeas,
      icon: Lightbulb,
      color: 'text-purple-500 bg-purple-100 dark:bg-purple-900/20',
    },
    {
      label: 'Documents',
      value: totalDocs,
      icon: FileText,
      color: 'text-green-500 bg-green-100 dark:bg-green-900/20',
    },
  ];

  return (
    <div className="h-screen flex flex-col bg-background">
      <div className="flex-1 p-4 md:p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="hover:border-primary/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={cn('p-2.5 rounded-xl', stat.color.split(' ')[1])}>
                      <stat.icon className={cn('w-5 h-5', stat.color.split(' ')[0])} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground"> {stat.value} </p>
                      <p className="text-xs text-muted-foreground"> {stat.label} </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Header with Create Button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground"> All Projects </h2>
          <div className="flex gap-2">
            <CreateProjectDialog />
          </div>
        </div>

        {/* Enhanced Project Grid */}
        {projects.length > 0 ? (
          <ProjectGrid />
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <FolderKanban className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2"> No projects yet </h3>
            <p className="text-sm text-muted-foreground mb-6">
              {' '}
              Create your first project to start organizing your work{' '}
            </p>
            <div className="flex gap-2 justify-center">
              <CreateProjectDialog />
            </div>
          </div>
        )}
      </div>

      {/* Project Side Panel */}
      <ProjectSidePanel
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}


export default ProjectsView;