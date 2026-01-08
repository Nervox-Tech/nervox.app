// This file contains all route path strings

const ROUTE_PATH = {
    Dashboard: '/',
    INBOX: {
      INDEX: '/inbox',
      CREATE: '/inbox/create',
      DETAILS: '/inbox/:id',
      EDIT: '/inbox/:id/edit'
    },
    NOT_FOUND: '/not-found'
}

export default ROUTE_PATH;
