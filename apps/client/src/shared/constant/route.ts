// This file contains all route path strings

const ROUTE_PATH = {
    DASHBOARD: '/',
    INBOX: {
      INDEX: '/inbox',
      CREATE: '/inbox/create',
      DETAILS: '/inbox/:id',
      EDIT: '/inbox/:id/edit'
    },
    TASKS: '/tasks',
    PROJECTS: '/projects',
    DOCUMENTS: '/documents',
    SETTINGS: '/settings',
    NOT_FOUND: '/not-found'
}

export default ROUTE_PATH;

