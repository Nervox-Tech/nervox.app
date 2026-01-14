import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/shared/stores/appStore';
import { isToday, isFuture } from 'date-fns';
import type { Project, ProjectStatus } from '@/shared/stores/appStore';
import { colorOptions } from '@/features/projects/components/create/ProjectColorPicker';
import { ProjectSidePanelHeader, ProjectDetailsForm, ProjectDetailsView, ProjectSidePanelFooter } from './components/index';
import { useProjectMetrics } from '@/features/projects/hooks/useProjectMetrics';

interface ProjectSidePanelProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
    initialMode?: 'view' | 'edit' | 'create';
}

export function ProjectSidePanel({
    project,
    isOpen,
    onClose,
    initialMode = 'view'
}: ProjectSidePanelProps) {
    const { updateProject, addProject } = useAppStore();
    const [mode, setMode] = useState<'view' | 'edit' | 'create'>(initialMode);

    // Form state
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState(colorOptions[0]);
    const [status, setStatus] = useState<ProjectStatus>('active');
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const [hasBeenManuallyStatused, setHasBeenManuallyStatused] = useState(false);

    // Prev project state for syncing
    const [prevProjectId, setPrevProjectId] = useState<string | null>(project?.id ?? null);
    const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

    // Sync state if project or open status changes (Render phase sync)
    if (isOpen !== prevIsOpen || project?.id !== prevProjectId) {
        setPrevIsOpen(isOpen);
        setPrevProjectId(project?.id ?? null);

        const nextMode = project ? initialMode : 'create';
        setMode(nextMode);

        if (project && initialMode !== 'create') {
            setName(project.name);
            setDescription(project.description);
            setColor(project.color);
            setStatus(project.status);
            setStartDate(project.startDate);
            setEndDate(project.endDate);
            setHasBeenManuallyStatused(true);
        } else {
            setName('');
            setDescription('');
            setColor(colorOptions[0]);
            setStatus('active');
            setStartDate(undefined);
            setEndDate(undefined);
            setHasBeenManuallyStatused(false);
        }
    }

    // Auto-status logic (Render phase sync)
    if (mode === 'create' && !hasBeenManuallyStatused && startDate) {
        const autoStatus = isToday(startDate) ? 'active' : isFuture(startDate) ? 'upcoming' : 'active';
        if (autoStatus !== status) {
            setStatus(autoStatus);
        }
    }

    // Metrics calculation
    const metrics = useProjectMetrics(project);
    const { projectTasks, totalTasks, progress, inProgressTasks } = useMemo(() => {
        const pTasks = project ? metrics.projectTasks : [];
        const inProgress = pTasks.filter(t => t.status === 'today').length;
        return { ...metrics, projectTasks: pTasks, totalTasks: pTasks.length, inProgressTasks: inProgress };
    }, [project, metrics]);

    const handleSave = () => {
        if (mode === 'create') {
            if (!name.trim()) return;
            addProject({ name, description, color, status, startDate, endDate });
            onClose();
        } else if (project) {
            updateProject(project.id, { name, description, color, status, startDate, endDate });
            setMode('view');
        }
    };

    const isDirty = mode === 'create' ? !!name.trim() : true;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full sm:w-120 bg-background border-l border-border z-50 flex flex-col shadow-2xl"
                    >
                        <ProjectSidePanelHeader
                            mode={mode}
                            project={project}
                            color={color}
                            setMode={setMode}
                            onClose={onClose}
                        />

                        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                            {mode !== 'view' ? (
                                <ProjectDetailsForm
                                    name={name} setName={setName}
                                    description={description} setDescription={setDescription}
                                    status={status} setStatus={setStatus}
                                    color={color} setColor={setColor}
                                    startDate={startDate} setStartDate={setStartDate}
                                    endDate={endDate} setEndDate={setEndDate}
                                    setHasBeenManuallyStatused={setHasBeenManuallyStatused}
                                />
                            ) : (
                                <ProjectDetailsView
                                    project={project}
                                    totalTasks={totalTasks}
                                    inProgressTasks={inProgressTasks}
                                    progress={progress}
                                    projectTasks={projectTasks}
                                />
                            )}
                        </div>

                        <ProjectSidePanelFooter
                            mode={mode}
                            isDirty={isDirty}
                            onClose={onClose}
                            setMode={setMode}
                            handleSave={handleSave}
                        />
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
