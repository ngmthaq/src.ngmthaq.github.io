import { createHashHistory, createRouter } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';

const hashHistory = createHashHistory();

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
  history: hashHistory,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default router;
