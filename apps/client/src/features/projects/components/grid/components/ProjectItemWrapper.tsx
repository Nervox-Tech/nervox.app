import { motion } from 'framer-motion';
import { useProjectMetrics } from '@/features/projects/hooks/useProjectMetrics';
import { ProjectCard } from '@/features/projects/components/cards/ProjectCard';
import type { Project } from '@/shared/stores/appStore';
import type { ViewMode } from '../ProjectGrid';

import type { EnhancedProject } from '@/features/projects/components/cards/ProjectCard';

interface ProjectItemWrapperProps {
    project: Project;
    index: number;
    viewMode: ViewMode;
    onSelect?: (project: Project) => void;
}

export function ProjectItemWrapper({
    project,
    index,
    viewMode,
    onSelect
}: ProjectItemWrapperProps) {
    const metrics = useProjectMetrics(project);

    const enrichedProject: EnhancedProject = {
        ...project,
        ...metrics,
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="break-inside-avoid h-full"
            onClick={() => onSelect?.(project)}
        >
            <ProjectCard
                project={enrichedProject}
                viewMode={viewMode}
                showQuickActions={true}
                className="h-full"
            />
        </motion.div>
    );
}
