<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class HandlePermissions
{
    public function handle(Request $request, Closure $next, ...$permissions)
    {
        if (Auth::guest()) {
            return redirect()->route('login');
        }

        // Check if user has any of the permissions
        $hasPermission = collect($permissions)->contains(function ($permission) use ($request) {
            return $request->user()->hasPermissionTo($permission);
        });

        // if (!$hasPermission) {
        //     abort(Response::HTTP_FORBIDDEN);
        // }

        return $next($request);
    }
}
