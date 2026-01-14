import { lazy } from 'react'
import type { IRouteConfig } from '@/shared/types/route.type'
import ROUTE_PATH from '@/shared/constant/route'

const Dashboard = lazy(() => import('./index').then((module) => ({ default: module.default })))

const DASHBOARD_ROUTE_CONFIG: IRouteConfig[] = [
    {
        path: ROUTE_PATH.DASHBOARD,
        element: Dashboard,
        title: 'Dashboard',
        description: 'Primary Dashboard'
    }
]

export default DASHBOARD_ROUTE_CONFIG