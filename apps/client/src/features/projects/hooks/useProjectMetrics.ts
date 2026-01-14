import { useAppStore } from '@/shared/stores/appStore';
import type { Project, Task } from '@/shared/stores/appStore';

export function calculateProjectMetrics(project: Project | null, tasks: Task[]) {
    // If project is null, project?.id will be undefined, so filter will return an empty array.
    // This matches the original logic: `project ? tasks.filter(...) : []`
    const projectTasks = tasks.filter((t) => t.projectId === project?.id);

    // totalTasks will be 0 if projectTasks is empty, so || 0 is not strictly needed but harmless.
    const totalTasks = projectTasks.length;
    // Note: The original code used 'done', the instruction snippet uses 'completed'.
    // Following the instruction snippet's explicit change for 'completed'.
    const completedTasks = projectTasks.filter((t) => t.status === 'completed').length;

    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    // The status logic remains the same as the original, using the new completedTasks count.
    const status = project?.status || (progress === 100 && totalTasks > 0 ? 'completed' : progress === 0 && (totalTasks === 0 || !project) ? 'on-hold' : 'active');

    return {
        projectTasks,
        totalTasks,
        completedTasks,
        progress,
        status,
        taskCount: totalTasks,
        completedTaskCount: completedTasks,
    };
}

export function useProjectMetrics(project: Project | null) {
    const { tasks } = useAppStore();
    return calculateProjectMetrics(project, tasks);
}
