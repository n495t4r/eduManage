<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class GeneratePolicy extends Command
{
    protected $signature = 'make:full-policy {model} {--rollback}';
    protected $description = 'Create or rollback a policy and permissions for a model';

    public function handle()
    {
        $model = ucfirst($this->argument('model')); // Ensure PascalCase
        $modelClass = "App\\Models\\$model";

        if (!class_exists($modelClass)) {
            $this->error("Model $model does not exist.");
            return;
        }

        if ($this->option('rollback')) {
            $this->rollback($model);
        } else {
            $this->generate($model);
        }
    }

    private function generate($model)
    {
        $policyClass = "{$model}Policy";
        $policyPath = app_path("Policies/{$policyClass}.php");

        if (File::exists($policyPath)) {
            $this->error("Policy {$policyClass} already exists.");
            return;
        }

        // Step 1: Create Policy
        $this->call('make:policy', ['name' => $policyClass, '--model' => $model]);

        // Step 2: Define Permissions
        $permissions = [
            "view " . $this->pluralize($model),
            "edit " . $this->pluralize($model),
            "create " . $this->pluralize($model),
            "delete " . $this->pluralize($model),
        ];

        // Step 3: Register Permissions in Database
        foreach ($permissions as $permission) {
            if (!Permission::where('name', $permission)->exists()) {
                Permission::create(['name' => $permission]);
                $this->info("Permission '{$permission}' created.");
            }
        }

        // Step 4: Modify the Policy File to Include Permissions
        $this->updatePolicyFile($policyPath, $permissions);

        // Step 5: Register Policy in AuthServiceProvider
        // $this->updateAuthServiceProvider($model);

        $this->info("✅ Policy {$policyClass} created and permissions added.");
    }

    private function rollback($model)
    {
        $policyClass = "{$model}Policy";
        $policyPath = app_path("Policies/{$policyClass}.php");

        // Remove Policy File
        if (File::exists($policyPath)) {
            File::delete($policyPath);
            $this->info("🗑️ Policy {$policyClass} deleted.");
        }

        // Remove Permissions
        $permissions = [
            "view " . $this->pluralize($model),
            "edit " . $this->pluralize($model),
            "create " . $this->pluralize($model),
            "delete " . $this->pluralize($model),
        ];

        foreach ($permissions as $permission) {
            $perm = Permission::where('name', $permission)->first();
            if ($perm) {
                $perm->delete();
                $this->info("🗑️ Permission '{$permission}' deleted.");
            }
        }

        // Remove Policy Registration in AuthServiceProvider
        $this->removeFromAuthServiceProvider($model);

        $this->info("♻️ Rollback complete for model {$model}.");
    }

    private function pluralize($word)
    {
        return Str::plural(Str::lower($word));
    }

    private function updatePolicyFile($policyPath, $permissions)
    {
        if (!File::exists($policyPath)) {
            $this->error("Policy file not found: {$policyPath}");
            return;
        }

        $content = File::get($policyPath);

        // Define method updates (without modifying signatures)
        $methodUpdates = [
            'viewAny' => "return \$user->hasPermissionTo('{$permissions[0]}');",
            'view' => "return \$user->hasPermissionTo('{$permissions[0]}');",
            'create' => "return \$user->hasPermissionTo('{$permissions[2]}');",
            'update' => "return \$user->hasPermissionTo('{$permissions[1]}');",
            'delete' => "return \$user->hasPermissionTo('{$permissions[3]}');",
        ];

        foreach ($methodUpdates as $method => $logic) {
            $pattern = "/(public function {$method}\([^\)]*\)\s*:\s*bool\s*\{)([^}]*)\}/s";
            $replacement = "$1\n        {$logic}\n    }";

            if (preg_match($pattern, $content)) {
                $content = preg_replace($pattern, $replacement, $content);
            }
        }

        File::put($policyPath, $content);
        $this->info("✅ Successfully updated policy file: {$policyPath}");
    }



    private function updateAuthServiceProvider($model)
    {
        $providerPath = app_path('Providers/AuthServiceProvider.php');
        $policyEntry = "        \\App\\Models\\$model::class => \\App\\Policies\\{$model}Policy::class,\n";

        if (File::exists($providerPath)) {
            $content = File::get($providerPath);

            if (!str_contains($content, $policyEntry)) {
                $content = preg_replace('/protected \$policies = \[\n/', "protected \$policies = [\n$policyEntry", $content);
                File::put($providerPath, $content);
                $this->info("🔄 AuthServiceProvider updated for {$model}.");
            }
        }
    }

    private function removeFromAuthServiceProvider($model)
    {
        $providerPath = app_path('Providers/AuthServiceProvider.php');
        $policyEntry = "        \\App\\Models\\$model::class => \\App\\Policies\\{$model}Policy::class,\n";

        if (File::exists($providerPath)) {
            $content = File::get($providerPath);
            $newContent = str_replace($policyEntry, '', $content);
            File::put($providerPath, $newContent);
            $this->info("🗑️ Removed policy registration from AuthServiceProvider.");
        }
    }
}
