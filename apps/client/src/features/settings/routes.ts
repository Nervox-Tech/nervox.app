import { lazy } from 'react';
import type { IRouteConfig } from '@/shared/types/route.type';
import ROUTE_PATH from '@/shared/constant/route';

const SettingsView = lazy(() => import('./').then((module) => ({ default: module.SettingsView })));

const PROFILE_SETTINGS_CONFIG: IRouteConfig[] = [
  {
    path: ROUTE_PATH.SETTINGS,
    element: SettingsView,
    title: 'Profile Settings',
    description: 'Profile Settings',
  },
];

export default PROFILE_SETTINGS_CONFIG;
