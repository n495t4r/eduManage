<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use App\Services\PermissionRegistry;
use App\Services\RoleRegistry;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => function () use ($request) {
                $user = $request->user();

                return [
                    'user' => $user ? [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'roles' => $user->roles->pluck('name'),
                        'permissions' => $user->all_permissions,
                    ] : null,
                ];
            },
            'permissions' => function () use ($request) {
                if ($request->user()) {
                    // Share the permission registry with the frontend
                    $registry = app(PermissionRegistry::class);
                    return [
                        'modules' => $registry->getPermissionsByModule(),
                        'all' => $registry->getAllPermissions(),
                    ];
                }
                return null;
            },

            'abilities' => $this->getAbilities($request),

            'flash' => function () use ($request) {
                return [
                    'success' => $request->session()->get('success'),
                    'error' => $request->session()->get('error'),
                ];
            },
            'ziggy' => fn(): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ]
        ];
    }


    protected function getAbilities(Request $request)
    {
        if (!$request->user()) {
            return [];
        }

        $abilities = [];
        $models = ['user', 'role', 'permission']; // Add all your model types
        $actions = ['viewAny', 'view', 'create', 'update', 'delete']; // Standard policy actions

        foreach ($models as $model) {
            $modelClass = 'App\\Models\\' . ucfirst($model);

            foreach ($actions as $action) {
                $key = $model . ':' . $action;

                // For viewAny, we need to check against the class
                if ($action === 'viewAny') {
                    $abilities[$key] = $request->user()->can($action, $modelClass);
                } else {
                    // For other actions, we'll just check the general ability
                    $abilities[$key] = $request->user()->can($action, $modelClass);
                }
            }
        }

        return $abilities;
    }
}
