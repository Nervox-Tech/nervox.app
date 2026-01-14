import { lazy } from 'react';
import type { IRouteConfig } from '@/shared/types/route.type';
import ROUTE_PATH from '@/shared/constant/route';

const ProjectIndex = lazy(() => import('./').then((module) => ({ default: module.ProjectIndex })));

const PROJECT_ROUTE_CONFIG: IRouteConfig[] = [
  {
    path: ROUTE_PATH.PROJECTS,
    element: ProjectIndex,
    title: 'Projects',
    description: 'List and manage Projects',
  },
];

export default PROJECT_ROUTE_CONFIG;
