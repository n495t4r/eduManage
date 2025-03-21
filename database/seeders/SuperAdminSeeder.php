<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Log;

class SuperAdminSeeder extends Seeder
{
    /**
     * Assign super-admin role to user with ID 1.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Find user with ID 1
        $user = User::find(1);

        if (!$user) {
            $this->command->warn('User with ID 1 not found. Super admin role not assigned.');
            return;
        }

        // Check if super-admin role exists
        $superAdminRole = Role::where('name', 'super-admin')->first();

        if (!$superAdminRole) {
            $this->command->info('Super admin role not found. Creating it now...');
            $superAdminRole = Role::create(['name' => 'super-admin']);

            // Give all permissions to super-admin
            $superAdminRole->givePermissionTo(\Spatie\Permission\Models\Permission::all());
        }

        // Assign super-admin role to user
        $user->assignRole($superAdminRole);

        $this->command->info("Super admin role assigned to user: {$user->name} (ID: {$user->id})");
    }
}
