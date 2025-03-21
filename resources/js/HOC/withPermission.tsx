import React from 'react';
import { Link } from '@inertiajs/react';
import { usePermissions } from '@/Utils/permissions';
import ForbiddenPage from '@/pages/errors/forbidden';

interface WithPermissionOptions {
  permission?: string | string[];
  role?: string | string[];
  redirectTo?: string;
  showForbidden?: boolean;
}

export default function withPermission(
  Component: React.ComponentType<any>,
  options: WithPermissionOptions = {}
) {
  return function PermissionGuard(props: any) {
    const { hasPermission, hasRole } = usePermissions();

    const hasAccess = (
      !options.permission || hasPermission(options.permission)
    ) && (
      !options.role || hasRole(options.role)
    );

    if (!hasAccess) {
      if (options.showForbidden) {
        return <ForbiddenPage />;
      }

      if (options.redirectTo) {
        return <Link href={options.redirectTo} />;
      }

      return <Link href={route('dashboard')} />;
    }

    return <Component {...props} />;
  };
}
