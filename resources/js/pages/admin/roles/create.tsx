import React from 'react';
import AppLayout from '@/layouts/app-layout';
import RoleForm from '@/components/Permissions/RoleForm';
import { usePermissions } from '@/Utils/permissions';
import { Head, Link } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import PageHeader from '@/components/PageHeader';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Role',
        href: '/roles/{role.id}/edit',
    },
];

export default function CreateRole() {
  const { can } = usePermissions();

  // Redirect if user doesn't have permission
  if (!can('create roles')) {
    return <Link href={route('roles.page')} />;
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs} >
        <Head title="Create Role" />
        <PageHeader
            title="Create Role"
            actionButton={{
                label: 'Back',
                icon: <ArrowLeft />,
                onClick: () => window.history.back(),
            }}
        />
      <RoleForm
        onCancel={() => window.history.back()}
      />
    </AppLayout>
  );
}
