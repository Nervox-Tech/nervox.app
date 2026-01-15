import { lazy } from 'react';
import type { IRouteConfig } from '@/shared/types/route.type';
import ROUTE_PATH from '@/shared/constant/route';

const Inbox = lazy(() => import('./').then((module) => ({ default: module.Inbox })));

const WhatsAppSetup = lazy(() =>
  import('./').then((module) => ({ default: module.WhatsAppSetup }))
);

const INBOX_ROUTE_CONFIG: IRouteConfig[] = [
  {
    path: ROUTE_PATH.INBOX.INDEX,
    element: Inbox,
    title: 'Inbox',
    description: 'List and manage Inbox items',
  },
  {
    path: ROUTE_PATH.INBOX.WHATSAPP,
    element: WhatsAppSetup,
    title: 'Inbox',
    description: 'List and manage Inbox items',
  },
];

export default INBOX_ROUTE_CONFIG;
