import React from 'react';
import { usePermissions } from '@/Utils/permissions';

interface CanProps {
  permission: string | string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function Can({ permission, children, fallback = null }: CanProps) {
  const { can } = usePermissions();

  return can(permission) ? <>{children}</> : <>{fallback}</>;
}
