// import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { usePermissions } from '@/Utils/permissions';
import PermissionGroup from './PermissionGroup';
import { Role } from '@/types';

interface RoleFormProps {
  role?: Role;
  onCancel: () => void;
}

export default function RoleForm({ role, onCancel }: RoleFormProps) {
  const { availablePermissions } = usePermissions();
  const { data, setData, post, put, processing, errors } = useForm({
    name: role?.name || '',
    permissions: role?.permissions || [],

  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (role) {
      put(route('roles.update', role.id));
    } else {
      post(route('roles.store'));
    }
  };

  const handlePermissionChange = (permission: string, checked: boolean) => {
    const updatedPermissions = checked
      ? [...data.permissions, permission]
      : data.permissions.filter(p => p !== permission);

    setData('permissions', updatedPermissions);
  };

  const handleSelectAllModule = (module: string, checked: boolean) => {
    const modulePermissions = availablePermissions.modules[module] || [];

    const updatedPermissions = checked
      ? [...new Set([...data.permissions, ...modulePermissions])]
      : data.permissions.filter(p => !modulePermissions.includes(p));

    setData('permissions', updatedPermissions);
  };

  return (
    <Card >
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6 mb-4">
          <div className="space-y-2 ">
            <Label htmlFor="name">Role Name</Label>
            <Input
              id="name"
              value={data.name}
              onChange={e => setData('name', e.target.value)}
              placeholder="Enter role name"
              className={errors.name ? 'border-red-500' : 'w-64'}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="space-y-4">
            <Label>Permissions</Label>
            {Object.entries(availablePermissions.modules).map(([module, permissions]) => (
              <PermissionGroup
                key={module}
                module={module}
                permissions={permissions}
                selectedPermissions={data.permissions}
                onChange={handlePermissionChange}
                onSelectAll={handleSelectAllModule}
              />
            ))}
            {errors.permissions && (
              <p className="text-red-500 text-sm mt-1">{errors.permissions}</p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={processing}>
            {role ? 'Update Role' : 'Create Role'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
