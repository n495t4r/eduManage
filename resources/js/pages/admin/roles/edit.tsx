import React from 'react';
import RoleForm from '@/components/Permissions/RoleForm';
import { usePermissions } from '@/Utils/permissions';
import { BreadcrumbItem, Role } from '@/types';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import PageHeader from '@/components/PageHeader';
import { ArrowLeft } from 'lucide-react';

interface EditRoleProps {
    role: Role;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Role',
        href: '/roles/{role.id}/edit',
    },
];

export default function EditRole({ role }: EditRoleProps) {
    const { can } = usePermissions();

    // Redirect if user doesn't have permission
    if (!can('edit roles')) {
        return <Link href={route('roles.index')} />;
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Role: ${role.name}`} />

            <PageHeader
                title={`Edit Role: ${role.name}`}
                actionButton={{
                    label: 'Back',
                    icon: <ArrowLeft />,
                    onClick: () => window.history.back(),
                }}
            />
            <RoleForm
                role={role}
                onCancel={() => window.history.back()}
            />
        </AppLayout>
    );
}
