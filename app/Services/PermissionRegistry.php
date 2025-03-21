<?php

namespace App\Services;

use Spatie\Permission\Models\Permission;

class PermissionRegistry
{
    // Define all permissions by module
    private $permissions = [
        'users' => [
            'view users',
            'create users',
            'edit users',
            'delete users',
        ],
        'roles' => [
            'view roles',
            'create roles',
            'edit roles',
            'delete roles',
        ],
        'posts' => [
            'view posts',
            'create posts',
            'edit posts',
            'delete posts',
        ],
        // Add more modules as needed
    ];

    /**
     * Get all permissions grouped dynamically by the second word.
     */
    public function getGroupedPermissions(): array
    {
        return Permission::all()
            ->mapToGroups(function ($permission) {
                $parts = explode(' ', $permission->name);
                $group = $parts[1] ?? 'others'; // Fallback for invalid permissions
                return [$group => $permission->name];
            })
            ->toArray();
    }

    // Get all permissions as a flat array
    public function getAllPermissions(): array
    {
        return collect( $this->getGroupedPermissions())
            ->flatten()
            ->toArray();
    }

    // Get permissions grouped by module
    public function getPermissionsByModule(): array
    {
        return $this->getGroupedPermissions();
    }

    // Get permissions for a specific module
    public function getModulePermissions(string $module): array
    {
        return $this->getGroupedPermissions[$module] ?? [];
    }

    // Check if a permission exists
    public function exists(string $permission): bool
    {
        return in_array($permission, $this->getAllPermissions());
    }
}
