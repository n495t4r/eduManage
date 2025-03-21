<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Routing\Controllers\HasMiddleware;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;

class UserRoleController extends Controller
{

    use AuthorizesRequests;
    public function edit(User $user)
    {

        $this->authorize('update', $user);

        $roles = Role::all();

        return Inertia::render('admin/users/roles', [
            'user' => $user->only('id', 'name', 'email', 'roles'),
            'roles' => $roles,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $this->authorize('update', $user);

        $validated = $request->validate([
            'roles' => 'required|array',
            'roles.*' => 'string|exists:roles,name',
        ]);

        $user->syncRoles($validated['roles']);

        // Clear permission cache
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        return redirect()->route('users.index')
            ->with('success', 'User roles updated successfully.');
    }

    public function updatePermissions(Request $request, User $user)
    {
        $this->authorize('update', $user);

        $validated = $request->validate([
            'permissions' => 'array',
            'permissions.*' => 'string|exists:permissions,name',
        ]);

        $user->syncPermissions($validated['permissions'] ?? []);

        return back()->with('success', 'User permissions updated successfully.');
    }
}
