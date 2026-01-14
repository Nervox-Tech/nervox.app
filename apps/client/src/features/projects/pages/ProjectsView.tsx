import { useState } from 'react';
import { FolderKanban, Plus } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { ProjectGrid } from '@/features/projects/components/grid/ProjectGrid';
import { ProjectSidePanel } from '@/features/projects/components/side-panel/ProjectDetailsSidePanel';
import { useAppStore } from '@/shared/stores/appStore';
import type { Project } from '@/shared/stores/appStore';

export default function ProjectsView() {
  const {
    projects,
    selectedProject,
    setSelectedProject
  } = useAppStore();

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [panelMode, setPanelMode] = useState<'view' | 'create'>('view');

  const handleNewProject = () => {
    setSelectedProject(null);
    setPanelMode('create');
    setIsSidePanelOpen(true);
  };

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setPanelMode('view');
    setIsSidePanelOpen(true);
  };

  return (
    <div className="flex flex-col h-full ">
      {/* Header section */}
      <div className="flex items-center justify-between p-6 bg-background/40 backdrop-blur-sm border-b border-border/50 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-2xl">
            <FolderKanban className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-medium text-foreground">Projects</h1>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{projects.length} Total Initiatives</p>
          </div>
        </div>
        <Button onClick={handleNewProject} className="gap-2 rounded-xl h-12 px-6 shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
          <Plus className="w-5 h-5 font-black" />
          <span className="font-bold">New Project</span>
        </Button>
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar">
        <div className="p-6 md:p-8 max-w-(--breakpoint-2xl) mx-auto w-full">
          <ProjectGrid onProjectSelect={handleProjectSelect} />
        </div>
      </div>

      <ProjectSidePanel
        isOpen={isSidePanelOpen}
        onClose={() => setIsSidePanelOpen(false)}
        project={selectedProject}
        initialMode={panelMode}
      />
    </div>
  );
}