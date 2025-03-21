<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Services\PermissionRegistry;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Get permissions from registry
        $permissionRegistry = app(PermissionRegistry::class);
        $allPermissions = $permissionRegistry->getAllPermissions();

        // Create permissions
        foreach ($allPermissions as $permission) {
            Permission::findOrCreate($permission);
        }

        // Create roles with permissions
        $roles = [
            'super-admin' => $allPermissions,
            'admin' => $allPermissions,
            'editor' => [
                'view posts', 'create posts', 'edit posts',
                'view users'
            ],
            'user' => [
                'view posts'
            ]
        ];

        foreach ($roles as $roleName => $permissions) {
            $role = Role::findOrCreate($roleName);
            $role->syncPermissions($permissions);
        }
    }
}
