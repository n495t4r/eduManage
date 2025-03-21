import React, { useState } from 'react';
import { Link, useForm, router, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { BreadcrumbItem, Role } from '@/types';
import { MoreHorizontal, Plus } from 'lucide-react';
import Can from '@/components/Permissions/Can';
import PageHeader from '@/components/PageHeader';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface RolesIndexProps {
    roles: Role[];
    filters?: {
        search: string;
        type?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles Management',
        href: '/roles',
    },
];

export default function RolesIndex({ roles, filters = { search: '' } }: RolesIndexProps) {
    const [isDeleting, setIsDeleting] = useState<number | null>(null);

    const { data, setData, get, processing } = useForm({
        search: filters.search || '',
        type: filters.type || 'all',
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        get(route('roles.index'), {
            preserveState: true,
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this role?')) {
            setIsDeleting(id);
            router.delete(route('roles.destroy', id), {
                onFinish: () => setIsDeleting(null),
            });
        }
    };

    const handleFilterClick = () => {
        // Implement filter dialog or dropdown
        console.log('Filter clicked');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles Management" />
                <PageHeader
                    title="Roles"
                    actionButton={{
                        label: "New Role",
                        icon: <Plus className="mr-2 h-4 w-4" />,
                        href: route('roles.create'),
                        permission: "create roles"
                    }}
                    // search={{
                    //     value: data.search,
                    //     onChange: e => setData('search', e.target.value),
                    //     onSubmit: handleSearch,
                    //     placeholder: "Search roles...",
                    //     processing: processing
                    // }}
                    // showFilter={true}
                    // onFilterClick={handleFilterClick}
                >
                </PageHeader>
                <Tabs
                    defaultValue={data.type}
                    className="mb-6"
                    onValueChange={(value) => {
                        setData('type', value);
                        get(route('roles.index'), {
                            preserveState: true,
                        });
                    }}
                >
                    <TabsList>
                        <TabsTrigger value="all">All Roles</TabsTrigger>
                        <TabsTrigger value="system">System Roles</TabsTrigger>
                        <TabsTrigger value="custom">Custom Roles</TabsTrigger>
                    </TabsList>
                </Tabs>

                <Card>
                    <CardHeader>
                        {/* <CardTitle>Roles</CardTitle> */}
                        <CardDescription>Manage roles and their permissions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Permissions</TableHead>
                                    <TableHead className="w-[100px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {roles.map(role => (
                                    <TableRow key={role.id}>
                                        <TableCell className="font-medium">{role.name}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {role.permissions && role.permissions.length > 0 ? (
                                                    <>
                                                        {role.permissions.slice(0, 5).map((permission, index) => (
                                                            <Badge key={index} variant="outline">
                                                                {typeof permission === 'string'
                                                                    ? permission
                                                                    : permission.name}
                                                            </Badge>
                                                        ))}
                                                        {role.permissions.length > 5 && (
                                                            <Badge variant="outline">
                                                                +{role.permissions.length - 5} more
                                                            </Badge>
                                                        )}
                                                    </>
                                                ) : (
                                                    <span className="text-muted-foreground text-sm">No permissions</span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Open menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('roles.show', role.id)}>
                                                            View
                                                        </Link>
                                                    </DropdownMenuItem>

                                                    <Can permission="edit roles">
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('roles.edit', role.id)}>
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                    </Can>

                                                    <Can permission="delete roles">
                                                        <DropdownMenuItem
                                                            onClick={() => handleDelete(role.id)}
                                                            disabled={isDeleting === role.id}
                                                            className="text-red-600"
                                                        >
                                                            {isDeleting === role.id ? 'Deleting...' : 'Delete'}
                                                        </DropdownMenuItem>
                                                    </Can>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {roles.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                                            No roles found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
        </AppLayout>
    );
}
