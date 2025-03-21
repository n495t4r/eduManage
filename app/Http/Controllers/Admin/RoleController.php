<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;


class RoleController extends Controller implements HasMiddleware
{

    use AuthorizesRequests;

    public static function middleware(): array
    {
        return [
            // 'permissions:view roles',
        //     'permissions:create roles',
        //     'permissions:edit roles',
        //     'permissions:delete roles'
        ];
    }


    public function index()
    {
        $this->authorize('viewAny',Role::class);

        $roles = Role::with('permissions')->get();

         // Transform the roles data to include permissions as an array of names
         $roles->transform(function ($role) {
            $role->permissions = $role->permissions->pluck('name')->toArray();
            return $role;
        });

        return Inertia::render('admin/roles/page', [
            'roles' => $roles,
        ]);
    }

    public function create()
    {
        $this->authorize('create', Role::class);
        return Inertia::render('admin/roles/create');
    }

    public function store(Request $request)
    {
        $this->authorize('create', Role::class);
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'permissions' => 'required|array',
            'permissions.*' => 'string|exists:permissions,name',
        ]);

        $role = Role::create(['name' => $validated['name']]);
        $role->syncPermissions($validated['permissions']);

        return redirect()->route(route: 'roles.index')
            ->with('success', 'Role created successfully.');
    }

    public function edit(Role $role)
    {
        $this->authorize('update', Role::class);
        $role->load('permissions');
         // Make sure permissions is always an array of strings (permission names)
        $role->permissions = $role->permissions->pluck('name')->toArray();
        return Inertia::render('admin/roles/edit', [
            'role' => $role,
        ]);
    }

    public function update(Request $request, Role $role)
    {
        $this->authorize('update', Role::class);
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $role->id,
            'permissions' => 'required|array',
            'permissions.*' =>$role->id,
            'permissions' => 'required|array',
            'permissions.*' => 'string|exists:permissions,name',
        ]);

        $role->update(['name' => $validated['name']]);
        $role->syncPermissions($validated['permissions']);

        // Clear permission cache
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        return redirect()->route(route: 'roles.index')
            ->with('success', 'Role updated successfully.');
    }

    public function destroy(Role $role)
    {
        $this->authorize('delete', Role::class);
        // Prevent deleting super-admin role
        if ($role->name === 'super-admin') {
            return redirect()->route(route: 'roles.page')
                ->with('error', 'Cannot delete the super-admin role.');
        }

        $role->delete();

        return redirect()->route('roles.page')
            ->with('success', 'Role deleted successfully.');
    }
}
