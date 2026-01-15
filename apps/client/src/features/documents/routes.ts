import { lazy } from 'react';
import type { IRouteConfig } from '@/shared/types/route.type';
import ROUTE_PATH from '@/shared/constant/route';

const Documents = lazy(() => import('./').then((module) => ({ default: module.Documents })));

const DOCUMENTS_ROUTE_CONFIG: IRouteConfig[] = [
  {
    path: ROUTE_PATH.DOCUMENTS,
    element: Documents,
    title: 'Documents',
    description: 'Organize your Documents',
  },
];

export default DOCUMENTS_ROUTE_CONFIG;