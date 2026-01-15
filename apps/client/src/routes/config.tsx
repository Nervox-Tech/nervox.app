/**
 * Routes Configuration
 * Centralized routing configuration for the application
 * Add or modify routes here instead of in App.tsx
 */

import { lazy } from 'react';
import type { IRouteConfig } from '@/shared/types/route.type';
import INBOX_ROUTE_CONFIG from '@/features/inbox/routes';
import DASHBOARD_ROUTE_CONFIG from '@/features/dashboard/routes';
import PROJECT_ROUTE_CONFIG from '@/features/projects/routes';
import PROFILE_SETTINGS_CONFIG from '@/features/settings/routes';

/**
 * Not Found Page
 */
const NotFound = lazy(() =>
  import('@/features/NotFound').then((module) => ({ default: module.Notfound }))
);

/**
 * Main application routes
 */
export const appRoutes: IRouteConfig[] = [
  ...DASHBOARD_ROUTE_CONFIG,
  ...INBOX_ROUTE_CONFIG,
  ...PROJECT_ROUTE_CONFIG,
  ...PROFILE_SETTINGS_CONFIG,
  {
    path: '*',
    element: NotFound,
    title: 'Page Not Found',
    description: '404 - Page not found',
  },
];

/**
 * Protected routes that require authentication
 * Add authentication-required routes here
 */
export const protectedRoutes: IRouteConfig[] = [
  // Example:
  // {
  //   path: '/dashboard',
  //   element: Dashboard,
  //   title: 'Dashboard',
  //   protected: true,
  // },
];

/**
 * Public routes that don't require authentication
 */
export const publicRoutes: IRouteConfig[] = [
  // Example:
  // {
  //   path: '/login',
  //   element: Login,
  //   title: 'Login',
  // },
];

/**
 * All routes combined
 */
export const routes: IRouteConfig[] = [...appRoutes, ...protectedRoutes, ...publicRoutes];

export default routes;
