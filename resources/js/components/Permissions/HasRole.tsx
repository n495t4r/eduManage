import React from 'react';
import { usePermissions } from '@/Utils/permissions';

interface HasRoleProps {
  role: string | string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function HasRole({ role, children, fallback = null }: HasRoleProps) {
  const { hasRole } = usePermissions();

  return hasRole(role) ? <>{children}</> : <>{fallback}</>;
}
