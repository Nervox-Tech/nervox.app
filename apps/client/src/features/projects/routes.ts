import { lazy } from 'react';
import type { IRouteConfig } from '@/shared/types/route.type';
import ROUTE_PATH from '@/shared/constant/route';

const ProjectsView = lazy(() => import('./').then((module) => ({ default: module.ProjectsView })));

const PROJECT_ROUTE_CONFIG: IRouteConfig[] = [
  {
    path: ROUTE_PATH.PROJECTS,
    element: ProjectsView,
    title: 'Projects',
    description: 'List and manage Projects',
  },
];

export default PROJECT_ROUTE_CONFIG;
