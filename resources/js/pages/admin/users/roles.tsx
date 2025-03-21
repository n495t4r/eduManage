import React from 'react';
import AppLayout from '@/layouts/app-layout';
import UserRoleAssignment from '@/components/Permissions/UserRoleAssignment';
import { usePermissions } from '@/Utils/permissions';
import { Role, User } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface UserRolesProps {
  user: User;
  roles: Role[];
}

export default function UserRoles({ user, roles }: UserRolesProps) {
  const { can } = usePermissions();

  // Redirect if user doesn't have permission
  if (!can('edit users')) {
    return <Link href={route('users.index')} />;
  }

  return (
    <AppLayout >
        <Head title={`Manage Roles: ${user.name}`} />
      <UserRoleAssignment
        user={user}
        roles={roles}
      />
    </AppLayout>
  );
}
