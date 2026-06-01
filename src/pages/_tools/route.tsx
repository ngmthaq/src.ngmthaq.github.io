import { createFileRoute, Outlet } from '@tanstack/react-router';

import { AppShell } from '../../components/AppShell';

export const Route = createFileRoute('/_tools')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
