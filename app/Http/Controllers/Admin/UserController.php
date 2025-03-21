<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    use AuthorizesRequests;
    /**
     * Create a new controller instance.
     */
    /**
     * Display a listing of the users.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny',arguments: User::class);

        $users = User::query()
            ->when($request->search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->with('roles')
            ->latest()
            ->paginate(10)
            ->through(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'is_active' => $user->is_active,
                    'permissions' => $user->getAllPermissions()->pluck('name'),
                    'roles' => $user->roles->pluck('name')->toArray(), // Convert to array of strings
                    'initials' => $this->getInitials($user->name),
                    'avatar' => $user->profile_photo_url ?? null,
                ];
        });

        $roles = Role::all()->map(function ($role) {
            return [
                'id' => $role->id,
                'name' => $role->name,
            ];
        });

        $permissions = Permission::all()->map(function ($permission) {
            return [
                'id' => $permission->id,
                'name' => $permission->name,
            ];
        });

        return Inertia::render('admin/users/index', props: [
            'users' => $users,
            'filters' => $request->only(['search']),
            'roles' => $roles,
            'permissions' => $permissions,
        ]);
    }

    /**
     * Show the form for creating a new user.
     */
    public function create()
    {
        $roles = Role::all();

        return Inertia::render('admin/users/create', [
            'roles' => $roles,
        ]);
    }

    /**
     * Store a newly created user in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', Password::defaults()],
            'roles' => ['sometimes', 'array'],
            'roles.*' => ['string', 'exists:roles,name'],
            'is_active' => ['boolean'],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'is_active' => $validated['is_active'] ?? true,
        ]);

        if (isset($validated['roles'])) {
            $user->syncRoles($validated['roles']);
        }

        return redirect()->route(route: 'users.index')
            ->with('success', 'User created successfully.');
    }

    /**
     * Display the specified user.
     */
    public function show(User $user)
    {
        $user->load('roles');
        $user->roles = $user->roles->pluck('name')->toArray();

        return Inertia::render('admin/users/show', [
            'user' => $user,
        ]);
    }

    /**
     * Show the form for editing the specified user.
     */
    public function edit(User $user)
    {
        $user->load('roles');
        $user->roles = $user->roles->pluck('name')->toArray();
        $roles = Role::all()->map(function ($role) {
            return [
                'id' => $role->id,
                'name' => $role->name,
            ];
        });

        return Inertia::render('admin/users/edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'is_active' => $user->is_active,
                'roles' => $user->roles->pluck('name'),
                'initials' => $this->getInitials($user->name),
                'avatar' => $user->profile_photo_url ?? null,
            ],
            'roles' => $roles,
        ]);
    }

    /**
     * Update the specified user in storage.
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'password' => ['nullable', Password::defaults()],
            'roles' => ['sometimes', 'array'],
            'roles.*' => ['string', 'exists:roles,name'],
            'is_active' => ['boolean'],
        ]);

        $userData = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'is_active' => $validated['is_active'] ?? $user->is_active,
        ];

        if (!empty($validated['password'])) {
            $userData['password'] = Hash::make($validated['password']);
        }

        $user->update($userData);

        if (isset($validated['roles'])) {
            $user->syncRoles($validated['roles']);
        }

        return redirect()->route(route: 'users.index')
            ->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroy(User $user)
    {
        // Prevent deleting yourself
        if ($user->id === auth()->id()) {
            return redirect()->route('users.index')
                ->with('error', 'You cannot delete your own account.');
        }

        $user->delete();

        return redirect()->route('users.index')
            ->with('success', 'User deleted successfully.');
    }

    /**
     * Bulk action on users.
     */
    public function bulkAction(Request $request)
    {
        $validated = $request->validate([
            'action' => ['required', 'string', 'in:delete,assign_role,remove_role'],
            'users' => ['required', 'array'],
            'users.*' => ['integer', 'exists:users,id'],
            'role' => ['required_if:action,assign_role,remove_role', 'string', 'exists:roles,name'],
        ]);

        // Don't allow actions on your own account
        if (in_array(auth()->id(), $validated['users'])) {
            return redirect()->route('users.index')
                ->with('error', 'You cannot perform bulk actions on your own account.');
        }

        $users = User::whereIn('id', $validated['users'])->get();

        switch ($validated['action']) {
            case 'delete':
                $this->bulkDelete($users);
                $message = count($users) . ' users deleted successfully.';
                break;
            case 'assign_role':
                $this->bulkAssignRole($users, $validated['role']);
                $message = 'Role assigned to ' . count($users) . ' users successfully.';
                break;
            case 'remove_role':
                $this->bulkRemoveRole($users, $validated['role']);
                $message = 'Role removed from ' . count($users) . ' users successfully.';
                break;
        }

        return redirect()->route('users.index')
            ->with('success', $message);
    }

    /**
     * Bulk delete users.
     */
    private function bulkDelete($users)
    {
        foreach ($users as $user) {
            $user->delete();
        }
    }

    /**
     * Bulk assign role to users.
     */
    private function bulkAssignRole($users, $roleName)
    {
        foreach ($users as $user) {
            $user->assignRole($roleName);
        }
    }

    /**
     * Bulk remove role from users.
     */
    private function bulkRemoveRole($users, $roleName)
    {
        foreach ($users as $user) {
            $user->removeRole($roleName);
        }
    }

    /**
     * Toggle user active status.
     */
    public function toggleActive(User $user)
    {
        // Prevent deactivating yourself
        if ($user->id === auth()->id()) {
            return redirect()->route('users.index')
                ->with('error', 'You cannot deactivate your own account.');
        }

        $user->update(['is_active' => !$user->is_active]);

        $status = $user->is_active ? 'activated' : 'deactivated';

        return redirect()->route('users.index')
            ->with('success', "User {$status} successfully.");
    }

    // public function updateRoles(Request $request, User $user)
    // {

    //     dd('here');
    //     $validated = $request->validate([
    //         'roles' => 'array',
    //         'roles.*' => 'string|exists:roles,name',
    //     ]);

    //     $user->syncRoles($validated['roles'] ?? []);

    //     return back()->with('success', 'User roles updated successfully.');
    // }

    // public function updatePermissions(Request $request, User $user)
    // {

    //     $validated = $request->validate([
    //         'permissions' => 'array',
    //         'permissions.*' => 'string|exists:permissions,name',
    //     ]);

    //     $user->syncPermissions($validated['permissions'] ?? []);

    //     return back()->with('success', 'User permissions updated successfully.');
    // }


    private function getInitials($name)
    {
        $nameParts = explode(' ', $name);
        $initials = '';

        if (count($nameParts) >= 2) {
            $initials = strtoupper(substr($nameParts[0], 0, 1) . substr(end($nameParts), 0, 1));
        } else {
            $initials = strtoupper(substr($name, 0, 2));
        }

        return $initials;
    }
}
