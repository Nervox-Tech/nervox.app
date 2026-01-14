import { describe, it, expect } from 'vitest';
import { calculateProjectMetrics } from './useProjectMetrics';
import type { Project, Task } from '@/shared/stores/appStore';

describe('calculateProjectMetrics', () => {
    const mockProject = {
        id: '1',
        name: 'Test Project',
        description: 'Test Description',
        color: '#ff0000',
        status: 'active' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const mockTasks: Task[] = [
        { id: 't1', projectId: '1', status: 'completed' } as Task,
        { id: 't2', projectId: '1', status: 'later' } as Task,
        { id: 't3', projectId: '2', status: 'completed' } as Task, // Different project
    ];

    it('should return default metrics when project is null', () => {
        const result = calculateProjectMetrics(null, []);

        expect(result.totalTasks).toBe(0);
        expect(result.progress).toBe(0);
        expect(result.status).toBe('on-hold');
    });

    it('should calculate correct metrics for a project', () => {
        const result = calculateProjectMetrics(mockProject as Project, mockTasks);

        expect(result.totalTasks).toBe(2);
        expect(result.completedTasks).toBe(1);
        expect(result.progress).toBe(50);
        expect(result.status).toBe('active');
    });

    it('should respect explicit project status', () => {
        const completedProject = { ...mockProject, status: 'completed' as const };
        const result = calculateProjectMetrics(completedProject as Project, mockTasks);

        expect(result.status).toBe('completed');
    });

    it('should fall back to completed status when progress is 100%', () => {
        const tasks: Task[] = [
            { id: 't1', projectId: '1', status: 'completed' } as Task,
        ];
        // Project status is missing (legacy) or undefined
        const legacyProject = { id: '1', name: 'Legacy' };
        const result = calculateProjectMetrics(legacyProject as Project, tasks);

        expect(result.progress).toBe(100);
        expect(result.status).toBe('completed');
    });
});
